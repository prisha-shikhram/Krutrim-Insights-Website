// import icons
import { Download, UploadCloud, AlertCircle } from "lucide-react";

// assignment list
export default function AssignmentList({ assignments, openSubmitModal }) {
    return (
        <div className="grid grid-cols-1 gap-4">
            {assignments.map((asm, index) => {
                const isOverdue = new Date(asm.deadline) < new Date() && asm.status !== "Submitted";

                return (
                    <div
                        key={asm.assignmentId}
                        className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                            <div className="flex items-start gap-5">
                                <div
                                    className="w-14 h-14 bg-slate-50 rounded-2xl flex flex-col items-center justify-center border border-slate-100 
                                    group-hover:bg-indigo-50 group-hover:border-indigo-100 transition-colors"
                                >
                                    <span className="text-[10px] font-black text-slate-400 group-hover:text-indigo-400 uppercase">Task</span>
                                    <span className="text-lg font-black text-slate-800 group-hover:text-indigo-600">{String(index + 1).padStart(2, '0')}</span>
                                </div>

                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-black text-slate-800">{asm.title}</h3>

                                        <span
                                            className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-tighter border 
                                            ${asm.status === 'Submitted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : isOverdue ? 'bg-rose-50 text-rose-600 border-rose-100'
                                                        : 'bg-amber-50 text-amber-600 border-amber-100'}`}
                                        >
                                            {isOverdue ? "Closed" : (asm.status || "Pending")}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-4 mt-2 text-slate-400 text-xs">
                                        <AlertCircle size={14} className={isOverdue ? 'text-rose-500' : ''} />

                                        Due: <span className={`font-bold ${isOverdue ? 'text-rose-500' : ''}`}>
                                            {new Date(asm.deadline).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <a
                                    href={asm.pdfUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs 
                                    hover:bg-slate-50 transition-colors cursor-pointer"
                                >
                                    <Download size={16} /> View Brief
                                </a>

                                {asm.status !== "Submitted" && (
                                    <button
                                        onClick={() => openSubmitModal(asm)}
                                        disabled={isOverdue}
                                        className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg transition-all cursor-pointer
                                        ${isOverdue ? 'bg-slate-100 text-slate-400 cursor-not-allowed shadow-none'
                                                : 'bg-indigo-600 text-white shadow-indigo-100 hover:bg-indigo-700'}`}
                                    >
                                        <UploadCloud size={16} /> {isOverdue ? "Locked" : "Upload Solution"}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}