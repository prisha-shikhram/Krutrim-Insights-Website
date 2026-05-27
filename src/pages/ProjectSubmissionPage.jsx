// import hooks
import { useState, useRef } from "react";

// primary colr
const PRIMARY = "#0189c7";

// import components
import Background from "../components/utils/BackgroundEffect";
import Success from "../components/projectForm/Success";
import Header from "../components/projectForm/Header";
import Submit from "../components/projectForm/Submit";
import Upload from "../components/projectForm/Upload";
import InputFields from "../components/projectForm/InputFields";

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// project submission page
export default function ProjectSubmission() {
    const [form, setForm] = useState({ fullName: "", contactNumber: "", emailId: "", screenshot: null });
    const [errors, setErrors] = useState({});
    const [preview, setPreview] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [focused, setFocused] = useState(null);
    const fileRef = useRef();

    // validate input fields
    const validate = () => {
        const e = {};
        const trimmedEmail = form.emailId.trim().toLowerCase();

        if (!form.fullName.trim()) e.fullName = "Full name is required";

        // Better Phone Regex
        if (!/^\+?[\d\s\-]{7,15}$/.test(form.contactNumber.trim())) {
            e.contactNumber = "Enter a valid contact number";
        }

        // Better Email Regex + Trimming
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(trimmedEmail)) {
            e.emailId = "Enter a valid email address";
        }

        if (!form.screenshot) e.screenshot = "Please upload a project screenshot";
        return e;
    };

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }));
    };

    // handle image file
    const handleFile = (file) => {
        if (!file) return;

        // Check for 10MB limit (10 * 1024 * 1024 bytes)
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File is too large. Please upload an image under 10MB.");
            return;
        }

        if (!file.type.startsWith("image/")) {
            setErrors(e => ({ ...e, screenshot: "Only image files are accepted" }));
            return;
        }

        setForm(f => ({ ...f, screenshot: file }));
        setErrors(e => ({ ...e, screenshot: undefined }));
        const reader = new FileReader();
        reader.onload = ev => setPreview(ev.target.result);
        reader.readAsDataURL(file);
    };

    // handle drop
    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        handleFile(e.dataTransfer.files[0]);
    };

    // handle submission
    const handleSubmit = async () => {
        const e = validate();
        if (Object.keys(e).length) {
            setErrors(e);
            toast.error("Please fix the errors in the form.");
            return;
        }

        setLoading(true);
        const loadingToast = toast.loading("Uploading project details...");

        try {
            const file = form.screenshot;

            // Step 1: Get upload URL
            const urlRes = await fetch("https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: file.name,
                    fileType: file.type,
                    uploadType: "projects",
                }),
            });

            if (!urlRes.ok) throw new Error("Could not get upload link");
            const { uploadUrl, fileUrl } = await urlRes.json();

            // Step 2: Upload to S3
            toast.loading("Uploading image to secure storage...", { id: loadingToast });

            const s3Res = await fetch(uploadUrl, {
                method: "PUT",
                headers: {
                    "Content-Type": file.type || "application/octet-stream" // Consistency check
                },
                body: file,
            });

            if (!s3Res.ok) throw new Error("Image upload failed. Check your internet.");

            // Step 3: Final Submit with Sanitized Data
            toast.loading("Finalizing submission...", { id: loadingToast });

            const res = await fetch("https://pgid77jz9h.execute-api.ap-south-1.amazonaws.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: form.fullName.trim(),
                    contactNumber: form.contactNumber.trim(),
                    emailId: form.emailId.trim().toLowerCase(),
                    imageUrl: fileUrl,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Final submission failed");
            }

            toast.success("Project submitted successfully!", { id: loadingToast });

            setTimeout(() => {
                setSubmitted(true);
            }, 800);

        } catch (err) {
            console.error("Submission Error:", err);
            toast.error(`Submission failed: ${err.message}`, { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    // css for input fields and labels
    const inputCls = "w-full bg-white border rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 input-glow text-sm";
    const labelCls = "block text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-200";

    /* ── Success screen ── */
    if (submitted) {
        return (
            <Success
                PRIMARY={PRIMARY}
                form={form}
            />
        );
    }

    /* ── Main form ── */
    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative py-10 px-4"
            style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif" }}
        >
            {/* Toast Container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* background effect */}
            <Background />

            <div
                className="relative z-10 w-full max-w-xl"
                style={{ animation: "slideUp 0.7s cubic-bezier(.16,1,.3,1) both" }}
            >
                {/* Header */}
                <Header PRIMARY={PRIMARY} />

                {/* Form card */}
                <div
                    className="rounded-3xl p-8 flex flex-col gap-6"
                    style={{
                        background: "white",
                        border: "1px solid rgba(1,137,199,0.14)",
                        boxShadow: "0 0 60px rgba(1,137,199,0.07), 0 20px 50px rgba(0,0,0,0.06)",
                    }}
                >
                    {/* Input fields */}
                    <InputFields
                        form={form}
                        errors={errors}
                        onChange={handleChange}
                        focused={focused}
                        setFocused={setFocused}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        inputCls={inputCls}
                    />

                    {/* Screenshot Upload */}
                    <Upload
                        preview={preview}
                        error={errors.screenshot}
                        dragOver={dragOver}
                        setDragOver={setDragOver}
                        onDrop={handleDrop}
                        onFileSelect={handleFile}
                        fileRef={fileRef}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        focused={focused}
                        setFocused={setFocused}
                        text={"Project Screenshot"}
                    />

                    {/* Divider */}
                    <div
                        className="h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(1,137,199,0.22), transparent)" }}
                    />

                    {/* Submit */}
                    <Submit
                        onSubmit={handleSubmit}
                        loading={loading}
                        disabled={loading}
                        PRIMARY={PRIMARY}
                    />
                </div>

                {/* Footer */}
                <p
                    className="text-center text-gray-400 text-xs mt-5"
                    style={{ animation: "fadeIn 1s 0.7s both" }}
                >
                    Your data is secure and will only be used for review purposes
                </p>
            </div>
        </div>
    );
}