// import hooks
import { useState } from "react";

// import icons
import { X, Upload, FileText, Loader2, Send } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// create notes modal
export default function CreateNotesModal({ onClose, refresh, mentor }) {
    const [submitting, setSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        file: null
    });

    // allowed types
    const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    // handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && allowedTypes.includes(file.type)) {
            setFormData({ ...formData, file });
        } else {
            toast.error("Please select a valid PDF or DOCX file");
            e.target.value = null;
        }
    };

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // validation error message
        if (!formData.file) return toast.error("Please upload the notes file");

        // Ensure mentor data exists before proceeding
        if (!mentor || !mentor.email) {
            console.error("Mentor data missing in CreateNotesModal");
            return toast.error("Authentication error: Mentor session not found.");
        }

        setSubmitting(true);
        const tid = toast.loading("Processing study notes...");

        try {
            // GET SIGNED URL FOR S3
            const urlRes = await fetch("https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: `notes_${Date.now()}_${formData.file.name.replace(/\s/g, '_')}`,
                    fileType: formData.file.type,
                    uploadType: "assignments"
                })
            });

            if (!urlRes.ok) throw new Error("Failed to get upload authorization");
            const { uploadUrl, fileUrl } = await urlRes.json();

            // 2. UPLOAD TO S3
            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": formData.file.type },
                body: formData.file
            });

            if (!uploadRes.ok) throw new Error("S3 Upload Failed");

            // CREATE DYNAMODB RECOD
            const saveRes = await fetch("https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "createNotes",
                    title: formData.title,
                    pdfUrl: fileUrl,
                    createdBy: mentor.email || "Unknown Mentor"
                })
            });

            if (!saveRes.ok) throw new Error("Failed to save notes record");

            toast.success("Study notes uploaded successfully!", { id: tid });
            refresh();
            onClose();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "An error occurred", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="px-8 pt-8 pb-4 flex justify-between items-center">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Upload Notes</h3>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="p-8 space-y-6"
                >
                    {/* Title Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Document Title</label>

                        <div className="relative">
                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />

                            <input
                                required
                                type="text"
                                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 
                                focus:ring-indigo-100 focus:border-indigo-300 transition-all font-medium"
                                placeholder="e.g., Chapter 3: Advanced React Hooks"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* File Upload Area */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Notes Document</label>

                        <label
                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-4xl transition-all cursor-pointer 
                            ${formData.file ? 'border-indigo-400 bg-indigo-50/30' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'}`}
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                {formData.file ? (
                                    <>
                                        <FileText className="text-indigo-500 mb-2" size={24} />
                                        <p className="text-xs font-bold text-indigo-600 truncate max-w-62.5">{formData.file.name}</p>
                                    </>
                                ) : (
                                    <>
                                        <Upload className="text-slate-300 mb-2" size={24} />
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select PDF or DOCX Document</p>
                                    </>
                                )}
                            </div>

                            <input
                                type="file"
                                className="hidden"
                                accept="application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                onChange={handleFileChange}
                            />
                        </label>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={submitting}
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-sm cursor-pointer shadow-xl 
                        hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                        {submitting ? "Uploading..." : "Publish Study Notes"}
                    </button>
                </form>
            </div>
        </div>
    );
}