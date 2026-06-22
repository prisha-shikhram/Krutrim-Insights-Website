// import hooks
import { useState, useRef } from "react";

// primary color
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
    const [form, setForm] = useState({
        fullName: "",
        contactNumber: "",
        emailId: "",
        submissionType: "image",
        projectUrl: "", 
        screenshot: null
    });
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

        // Dynamic Submission Branch Field Validation
        if (form.submissionType === "link") {
            const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/;
            if (!form.projectUrl.trim()) {
                e.projectUrl = "Project deployment URL link is required";
            } else if (!urlRegex.test(form.projectUrl.trim())) {
                e.projectUrl = "Enter a valid URL address link";
            }
        } else {
            if (!form.screenshot) e.screenshot = "Please upload a project screenshot";
        }

        return e;
    };

    // handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(f => ({ ...f, [name]: value }));
        if (errors[name]) setErrors(er => ({ ...er, [name]: undefined }));
    };

    // handle image file (Updated to accept all image formats cleanly)
    const handleFile = (file) => {
        if (!file) return;

        // Check for 10MB limit
        if (file.size > 10 * 1024 * 1024) {
            toast.error("File is too large. Please upload an image under 10MB.");
            return;
        }

        // Relaxed fallback screening checks matching any native generic image configuration patterns
        const validImageExtensions = /\.(jpg|jpeg|png|webp|gif|svg|bmp|tiff|jfif)$/i;
        if (!file.type.startsWith("image/") && !validImageExtensions.test(file.name)) {
            setErrors(e => ({ ...e, screenshot: "Only valid image format files are accepted" }));
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
            let finalizedSubmissionUrl = "";

            // Only upload via S3 if an image method is configured
            if (form.submissionType === "image") {
                const file = form.screenshot;

                // Get S3 presigned authorization link upload target
                const urlRes = await fetch("https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        fileName: file.name,
                        fileType: file.type || "application/octet-stream",
                        uploadType: "projects",
                    }),
                });

                if (!urlRes.ok) throw new Error("Could not get upload link from server");
                const { uploadUrl, fileUrl } = await urlRes.json();
                finalizedSubmissionUrl = fileUrl;

                // Push binary stream up directly to S3
                toast.loading("Uploading image to secure storage...", { id: loadingToast });
                const s3Res = await fetch(uploadUrl, {
                    method: "PUT",
                    headers: {
                        "Content-Type": file.type || "application/octet-stream"
                    },
                    body: file,
                });

                if (!s3Res.ok) throw new Error("Image asset push down storage layer upload failed.");
            } else {
                // If link method is active, bypass cloud storage block completely
                finalizedSubmissionUrl = form.projectUrl.trim();
            }

            // Final data logging configuration update sync down to primary Database
            toast.loading("Finalizing submission mapping record...", { id: loadingToast });

            const res = await fetch("https://pgid77jz9h.execute-api.ap-south-1.amazonaws.com/submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fullName: form.fullName.trim(),
                    contactNumber: form.contactNumber.trim(),
                    emailId: form.emailId.trim().toLowerCase(),
                    submissionType: form.submissionType,
                    imageUrl: finalizedSubmissionUrl,
                }),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.error || "Final database submission sync failed");
            }

            toast.success("Project submission logged successfully!", { id: loadingToast });

            setTimeout(() => {
                setSubmitted(true);
            }, 800);

        } catch (err) {
            console.error("Submission Execution Error Trace:", err);
            toast.error(`Submission structural fail: ${err.message}`, { id: loadingToast });
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
            <Toaster position="top-center" reverseOrder={false} />

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

                    {/* Screenshot Upload / Conditional Link box */}
                    <Upload
                        submissionType={form.submissionType}
                        form={form}
                        onChange={handleChange}
                        errors={errors}
                        preview={preview}
                        error={errors.screenshot}
                        dragOver={dragOver}
                        setDragOver={setDragOver}
                        onDrop={handleDrop}
                        onFileSelect={handleFile}
                        fileRef={fileRef}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        inputCls={inputCls}
                        focused={focused}
                        setFocused={setFocused}
                        text={"Project Attachment Verification"}
                    />

                    {/* Divider */}
                    <div
                        className="h-px"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(1,137,199,0.22), transparent)" }}
                    />

                    {/* Submit Button component handling interaction state */}
                    <Submit
                        onSubmit={handleSubmit}
                        loading={loading}
                        disabled={loading}
                        PRIMARY={PRIMARY}
                    />
                </div>

                {/* Footer contextual notice */}
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