// import hooks
import { useState, useRef, useCallback } from "react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// import icons
import {
    GraduationCap, AlertCircle, Loader2
} from "lucide-react";

// import components
import Background from "../../components/utils/BackgroundEffect";
import { validateForm } from "../../components/student/enroll/validateForm";
import { toastStyles } from "../../components/student/enroll/toastStyles";
import { showValidationErrors } from "../../components/student/enroll/showValidationErrors";
import PersonalSection from "../../components/student/enroll/PersonalSection";
import AcademicSection from "../../components/student/enroll/AcademicSection";
import IdentitySection from "../../components/student/enroll/IdentitySection";
import GuardianSection from "../../components/student/enroll/GuardianSection";

// primary color
const PRIMARY = "#0189c7";

// api url
const ENROLL_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/enroll";
const S3_URL_API = "https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url";

// Initial states (Declaration removed)
const INITIAL = {
    fullName: "", dob: "", gender: "",
    studentPhone: "", studentEmail: "", address: "",
    collegeName: "", course: "", otherCourse: "",
    enrollingFor: "", year: "", duration: "", idType: "Aadhaar Card",
    otherIdType: "", idNumber: "", parentName: "",
    parentPhone: "", emergencyContact: "",
};

// student enrollment form
export default function StudentEnrollment() {
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);
    const [formData, setFormData] = useState(INITIAL);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const fileRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [dragOver, setDragOver] = useState(false);
    const [uploadError, setUploadError] = useState("");

    // handle change (Simplified to remove checkbox logic)
    const handleChange = useCallback((e) => {
        const { name, value } = e.target;

        setFormData(prev => {
            const next = { ...prev, [name]: value };
            if (name === "idType" && value !== "Other") next.otherIdType = "";
            if (name === "course" && value !== "Other") next.otherCourse = "";
            return next;
        });

        if (submitted) {
            setErrors(prev => {
                const next = { ...prev };
                delete next[name];
                return next;
            });
        }
    }, [submitted]);

    // handle file select
    const handleFileSelect = useCallback((file) => {
        if (!file) return;

        const allowed = ["image/jpeg", "image/png", "image/webp", "image/jpg"];

        if (!allowed.includes(file.type)) {
            setUploadError("Only JPG, PNG, or WEBP images are allowed.");
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setUploadError("File too large. Maximum size is 5 MB.");
            return;
        }

        setUploadError("");
        setSelectedFile(file);
        setPreview(URL.createObjectURL(file));
        if (submitted) setErrors(prev => { const n = { ...prev }; delete n.idProof; return n; });
    }, [submitted]);

    // on drop
    const onDrop = useCallback((e) => {
        e.preventDefault();
        setDragOver(false);
        handleFileSelect(e.dataTransfer.files[0]);
    }, [handleFileSelect]);

    // S3 upload
    const uploadToS3 = async (file) => {
        const res = await fetch(S3_URL_API, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fileName: file.name, fileType: file.type, uploadType: "students" }),
        });

        if (!res.ok) throw new Error("Failed to get upload URL. Please try again.");
        const { uploadUrl, fileUrl } = await res.json();

        const s3Res = await fetch(uploadUrl, {
            method: "PUT",
            headers: { "Content-Type": file.type },
            body: file,
        });

        if (!s3Res.ok) throw new Error("Document upload failed. Please check your connection.");

        return fileUrl;
    };

    // handle enroll
    const handleEnroll = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        const errs = validateForm(formData, selectedFile);
        setErrors(errs);

        if (Object.keys(errs).length > 0) {
            showValidationErrors(errs);
            const firstKey = Object.keys(errs)[0];
            const el = document.querySelector(`[name="${firstKey}"]`);
            el?.scrollIntoView({ behavior: "smooth", block: "center" });
            return;
        }

        setLoading(true);
        const loadId = toast.loading("Uploading documents...", toastStyles.loading);

        try {
            const idProofUrl = await uploadToS3(selectedFile);
            toast.loading("Submitting enrollment...", { id: loadId, ...toastStyles.loading });

            // --- FINAL DATA PREPARATION (MERGING LOGIC) ---
            const submissionData = { ...formData };

            // 1. Merge Course
            if (submissionData.course === "Other") {
                submissionData.course = submissionData.otherCourse;
            }

            // 2. Merge ID Type
            if (submissionData.idType === "Other") {
                submissionData.idType = submissionData.otherIdType;
            }

            // 3. Clean up temporary keys
            delete submissionData.otherCourse;
            delete submissionData.otherIdType;

            const response = await fetch(ENROLL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...formData,
                    idProofUrl,
                    action: "enroll"
                }),
            });

            if (response.status === 409) {
                throw new Error("An account with this email already exists.");
            }
            if (!response.ok) {
                const body = await response.json().catch(() => ({}));
                throw new Error(body?.message || "Enrollment failed. Please try again.");
            }

            toast.success("Enrollment submitted! Check your email for credentials.", {
                id: loadId,
                ...toastStyles.success,
                duration: 6000,
            });

            setFormData(INITIAL);
            setSelectedFile(null);
            setPreview(null);
            setErrors({});
            setSubmitted(false);

        } catch (err) {
            toast.error(err.message || "Something went wrong. Please try again.", {
                id: loadId,
                ...toastStyles.error,
                duration: 6000,
            });
        } finally {
            setLoading(false);
        }
    };

    // Style helpers
    const inputCls = "w-full bg-white rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 text-sm";
    const selectCls = "w-full bg-white rounded-xl pl-11 pr-10 py-3 text-gray-800 outline-none transition-all duration-200 text-sm appearance-none cursor-pointer";
    const labelCls = "block text-[10px] font-bold uppercase tracking-widest mb-2 transition-colors duration-200 ml-1";
    const sectionTitleCls = "text-lg font-bold text-gray-800 flex items-center gap-2 mb-6 pb-2 border-b border-gray-100";

    // border style
    const borderStyle = (fieldName) => {
        const hasErr = !!errors[fieldName];
        return {
            border: `1.5px solid ${hasErr ? "#ef4444" : focused === fieldName ? PRIMARY : "#e5e7eb"}`,
            boxShadow: hasErr ? "0 0 0 3px rgba(239,68,68,0.10)" : focused === fieldName ? `0 0 0 3px rgba(1,137,199,0.12)` : "none",
        };
    };

    // label style
    const labelStyle = (fieldName) => ({
        color: errors[fieldName] ? "#ef4444" : focused === fieldName ? PRIMARY : "#9ca3af",
    });

    const fp = (name) => ({
        name,
        onChange: handleChange,
        onFocus: () => setFocused(name),
        onBlur: () => setFocused(null),
        style: borderStyle(name),
    });

    return (
        <div className="min-h-screen w-full bg-slate-50 flex items-center justify-center relative px-4 py-16">
            {/* toaster container */}
            <Toaster
                position="top-center"
                gutter={8}
                containerStyle={{ top: 20 }}
            />

            {/* background component */}
            <Background />

            <div className="relative z-10 w-full max-w-4xl">
                {/* Header */}
                <div className="flex flex-col items-center mb-12 text-center">
                    <div
                        className="w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-6 shadow-2xl animate-bounce-subtle"
                        style={{ background: `linear-gradient(135deg, ${PRIMARY}, #00c6ff)` }}
                    >
                        <GraduationCap size={40} />
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-gray-900">Program Enrollment</h1>
                    <p className="text-gray-500 mt-2 max-w-md">Krutrim Insights — Future-proofing your career with AI</p>
                </div>

                {submitted && Object.keys(errors).length > 0 && (
                    <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 rounded-2xl px-5 py-3.5">
                        <AlertCircle size={18} className="text-red-500 shrink-0" />

                        <p className="text-red-700 text-sm font-medium">
                            {Object.keys(errors).length} field{Object.keys(errors).length > 1 ? "s need" : " needs"} attention — please review and resubmit.
                        </p>
                    </div>
                )}

                <form
                    onSubmit={handleEnroll}
                    noValidate
                    className="bg-white/80 backdrop-blur-xl rounded-[40px] p-8 md:p-12 shadow-2xl border border-white flex flex-col gap-10"
                >
                    {/* ── SECTION 1: Personal Information ────────────────────── */}
                    <PersonalSection
                        sectionTitleCls={sectionTitleCls}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        labelStyle={labelStyle}
                        inputCls={inputCls}
                        errors={errors}
                        formData={formData}
                        selectCls={selectCls}
                        fp={fp}
                    />

                    {/* ── SECTION 2: Academic Details ─────────────────────────── */}
                    <AcademicSection
                        sectionTitleCls={sectionTitleCls}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        labelStyle={labelStyle}
                        inputCls={inputCls}
                        errors={errors}
                        formData={formData}
                        selectCls={selectCls}
                        fp={fp}
                    />

                    {/* ── SECTION 3: Identity Proof ───────────────────────────── */}
                    <IdentitySection
                        sectionTitleCls={sectionTitleCls}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        labelStyle={labelStyle}
                        inputCls={inputCls}
                        errors={errors}
                        formData={formData}
                        selectCls={selectCls}
                        fp={fp}
                        uploadError={uploadError}
                        preview={preview}
                        dragOver={dragOver}
                        setDragOver={setDragOver}
                        focused={focused}
                        setFocused={setFocused}
                        onDrop={onDrop}
                        handleFileSelect={handleFileSelect}
                        fileRef={fileRef}
                    />

                    {/* ── SECTION 4: Guardian & Declaration ──────────────────── */}
                    <GuardianSection
                        sectionTitleCls={sectionTitleCls}
                        PRIMARY={PRIMARY}
                        labelCls={labelCls}
                        labelStyle={labelStyle}
                        inputCls={inputCls}
                        errors={errors}
                        formData={formData}
                        fp={fp}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-5 rounded-2xl text-white font-bold text-sm tracking-[3px] uppercase transition-all duration-300 
                        active:scale-[0.98] shadow-2xl flex items-center justify-center gap-3"
                        style={{
                            background: `linear-gradient(90deg, ${PRIMARY}, #00c6ff)`,
                            boxShadow: `0 10px 30px ${PRIMARY}44`,
                            opacity: loading ? 0.75 : 1,
                            cursor: loading ? "not-allowed" : "pointer",
                        }}
                    >
                        {loading ? (
                            <>
                                <Loader2 size={18} className="animate-spin" />
                                Finalizing Enrollment...
                            </>
                        ) : (
                            "Submit Enrollment Application"
                        )}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-[9px] mt-10 uppercase tracking-[4px]">
                    Krutrim Insights — Secure Student Registration Portal v3.0
                </p>
            </div>
        </div>
    );
}