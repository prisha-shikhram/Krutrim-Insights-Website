// import icons
import { FileText, Share2, Loader2, Clock, Calendar, ExternalLink, AlertCircle } from "lucide-react";

// assignment list
export default function AssignmentList({ loading, assignments, handleOpenShare }) {

    // Helper to check if deadline has passed
    const isOverdue = (deadline) => new Date(deadline) < new Date();

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading ? (
                <div className="col-span-full py-32 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing assignments...</p>
                </div>
            ) : assignments.length === 0 ? (
                <div className="col-span-full bg-white/40 backdrop-blur-md p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <FileText className="text-slate-200" size={40} />
                    </div>

                    <h3 className="text-slate-800 font-black text-lg">No assignments yet</h3>
                    <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
                        Your workspace is clear. Click the create button to start sharing tasks with your batches.
                    </p>
                </div>
            ) : (
                assignments.map((item) => {
                    const overdue = isOverdue(item.deadline);

                    return (
                        <div
                            key={item.assignmentId}
                            className="group relative bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm hover:shadow-xl 
                            hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            {/* Icon and ID */}
                            <div className="flex justify-between items-center mb-8">
                                <div
                                    className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center 
                                    group-hover:scale-110 transition-transform duration-300"
                                >
                                    <FileText size={24} />
                                </div>

                                <span className="px-3 py-1 bg-slate-50 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                    {item.assignmentId.split('_').pop()}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-xl mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                                    {item.title}
                                </h3>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border 
                                        ${overdue ? 'bg-rose-50 border-rose-100 text-rose-500'
                                            : 'bg-emerald-50 border-emerald-100 text-emerald-600'}`}
                                    >
                                        <Clock size={12} />

                                        <span className="text-[10px] font-black uppercase tracking-wider">
                                            {overdue ? 'Deadline Passed' : 'Active Task'}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                                        <Calendar size={12} />

                                        <span className="text-[10px] font-black uppercase tracking-wider">
                                            {new Date(item.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                                <a
                                    href={item.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-2xl text-[10px] 
                                    font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                                >
                                    Review <ExternalLink size={12} />
                                </a>

                                <button
                                    onClick={() => handleOpenShare(item)}
                                    className="flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-2xl text-[10px] 
                                    font-black uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 
                                    transition-all cursor-pointer"
                                >
                                    Share <Share2 size={12} />
                                </button>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}