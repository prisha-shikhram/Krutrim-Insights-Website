// import icons
import { UploadCloud, CheckCircle } from "lucide-react";

// project list component
export default function ProjectList({ projects, openSubmitModal }) {
    return (
        <div className="grid grid-cols-1 gap-4 pb-10">
            {projects.length === 0 ? (
                <div
                    className="bg-white/40 p-20 rounded-[2.5rem] border-2 border-dashed border-slate-100 text-center text-slate-400 font-bold 
                    uppercase tracking-widest text-[10px]"
                >
                    No projects assigned to your batch
                </div>
            ) : (
                projects.map((proj, index) => (
                    <div
                        key={proj.projectId}
                        className="bg-white rounded-4xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div
                                    className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border 
                                    border-slate-100 group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors shadow-sm"
                                >
                                    <span className="text-[10px] font-black text-slate-400 group-hover:text-indigo-400 uppercase">P#</span>
                                    <span className="text-lg font-black text-slate-700 group-hover:text-indigo-600">{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">{proj.name}</h3>

                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase border 
                                            ${proj.status === 'Submitted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                : 'bg-amber-50 text-amber-600 border-amber-100'}`}
                                        >
                                            {proj.status || "Ongoing"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-slate-400 font-medium line-clamp-1 max-w-md">{proj.description}</p>
                                </div>
                            </div>

                            <div className="flex items-center">
                                <button
                                    onClick={() => openSubmitModal(proj)}
                                    disabled={proj.status === "Submitted"}
                                    className={`px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 
                                        ${proj.status === "Submitted"
                                            ? "bg-emerald-50 text-emerald-500 cursor-default"
                                            : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-100 cursor-pointer"
                                        }`}
                                >
                                    {proj.status === "Submitted" ? <CheckCircle size={16} /> : <UploadCloud size={16} />}
                                    {proj.status === "Submitted" ? "Submitted" : "Submit Work"}
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}