// import icons
import { X, ImageIcon, Loader2, Briefcase } from "lucide-react";

// upload modal component
export default function UploadModal({ setIsModalOpen, isSubmitting, activeProject, handleFileChange, previewUrl, handleFinalSubmit, selectedFile }) {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[2.5rem] p-8 shadow-2xl relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={() => setIsModalOpen(false)}
                    disabled={isSubmitting}
                    className="absolute top-8 right-8 p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 cursor-pointer"
                >
                    <X size={20} />
                </button>

                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <Briefcase size={22} />
                    </div>

                    <div>
                        <h3 className="text-xl font-black text-slate-800">Project Proof</h3>
                        <p className="text-xs text-slate-500 line-clamp-1">{activeProject?.name}</p>
                    </div>
                </div>

                <label
                    className={`group relative border-2 border-dashed rounded-4xl p-4 min-h-50 flex flex-col items-center justify-center gap-4 
                    transition-all cursor-pointer
                    ${selectedFile ? 'border-emerald-400 bg-emerald-50/10' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'}`}
                >
                    <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        disabled={isSubmitting}
                        onChange={handleFileChange}
                    />

                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            className="w-full h-48 object-cover rounded-2xl shadow-md"
                            alt="Preview"
                        />
                    ) : (
                        <div className="text-center">
                            <div className="w-16 h-16 bg-slate-50 text-slate-300 rounded-2xl flex items-center justify-center mx-auto mb-4 
                            group-hover:text-indigo-400 group-hover:bg-white transition-all shadow-sm">
                                <ImageIcon size={32} />
                            </div>

                            <p className="text-sm font-bold text-slate-700">Drop screenshot here</p>
                            <p className="text-[10px] text-slate-400 uppercase font-black mt-1">PNG or JPG</p>
                        </div>
                    )}
                </label>

                <div className="mt-8 flex gap-3">
                    <button onClick={() => setIsModalOpen(false)}
                        disabled={isSubmitting}
                        className="flex-1 py-4 rounded-2xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50 transition-colors 
                        disabled:opacity-50 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleFinalSubmit}
                        disabled={isSubmitting || !selectedFile}
                        className="flex-1 py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest 
                        hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                        {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : "Submit Work"}
                    </button>
                </div>
            </div>
        </div>
    )
}