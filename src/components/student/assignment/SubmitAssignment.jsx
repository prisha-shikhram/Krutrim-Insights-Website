// import icons
import { UploadCloud, X, FileType } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// assignment submission modal
export default function SubmitAssignmentModal({ setIsModalOpen, activeAssignment }) {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-4xl p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={() => setIsModalOpen(false)}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                        <FileType size={20} />
                    </div>

                    <div>
                        <h3 className="text-xl font-black text-slate-800">Submit Work</h3>
                        <p className="text-xs text-slate-500">Assignment {activeAssignment?.number}: {activeAssignment?.name}</p>
                    </div>
                </div>

                {/* DROPZONE */}
                <label
                    className="group relative border-2 border-dashed border-slate-200 rounded-3xl p-10 flex flex-col items-center 
                    justify-center gap-4 hover:border-indigo-400 hover:bg-indigo-50/30 transition-all cursor-pointer"
                >
                    <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx"
                    />

                    <div
                        className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center 
                        group-hover:text-indigo-500 group-hover:bg-white transition-all shadow-sm"
                    >
                        <UploadCloud size={32} />
                    </div>

                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-700">Click or drag your file here</p>
                        <p className="text-xs text-slate-400 mt-1">PDF or DOCX (Max 10MB)</p>
                    </div>
                </label>

                <div className="mt-8 flex gap-3">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={() => {
                            toast.success("Assignment Uploaded!");
                            setIsModalOpen(false);
                        }}
                        className="flex-1 py-4 rounded-2xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-700 transition-all 
                        shadow-lg shadow-indigo-100"
                    >
                        Finalize Submission
                    </button>
                </div>
            </div>
        </div>
    )
}