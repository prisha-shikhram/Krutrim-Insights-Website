// import icons
import { Users, Plus, Edit3, ArrowUpRight } from "lucide-react";

// batches grid component
export default function BatchesGrid({ batches = [], setShowAssignModal, setSearchTerm, setShowManageModal, setShowEditModal }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {batches.map((batch) => (
                <div
                    key={batch.batchCode || batch.id}
                    className="bg-white p-6 md:p-8 rounded-2xl border border-slate-200/80 shadow-xs 
                    hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-200
                    group flex flex-col h-full relative overflow-hidden transition-all duration-300"
                >
                    {/* Background Glow */}
                    <div
                        className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500 pointer-events-none"
                    />

                    {/* Header Row */}
                    <div className="flex justify-between items-start mb-6 relative z-10">
                        <div
                            className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center 
                            group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300 shadow-xs shrink-0"
                        >
                            <Users size={24} />
                        </div>

                        <div className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                <p className="text-2xl font-black text-slate-800 tracking-tight tabular-nums">
                                    {String(batch.students?.length || 0).padStart(2, "0")}
                                </p>

                                <ArrowUpRight
                                    size={14}
                                    className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                />
                            </div>

                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                Students
                            </p>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="mb-8 flex-1 relative z-10">
                        <h3 className="text-lg font-bold text-slate-800 leading-snug group-hover:text-indigo-600 transition-colors mb-2">
                            {batch.batchName || "Unnamed Batch"}
                        </h3>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse shrink-0" />

                            <p
                                className="text-[10px] font-mono font-bold text-slate-600 uppercase tracking-widest bg-slate-100/80
                                px-2.5 py-1 rounded-md border border-slate-200/60 w-fit"
                            >
                                {batch.batchCode || "NO CODE"}
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 relative z-10 pt-2 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => {
                                setShowAssignModal?.(batch.batchCode);
                                setSearchTerm?.("");
                            }}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 
                            font-bold text-xs rounded-lg hover:bg-indigo-600 hover:border-indigo-600 hover:text-white transition-all duration-200 cursor-pointer"
                        >
                            <Plus size={14} /> Assign
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowManageModal?.(batch)}
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 
                            font-bold text-xs rounded-lg hover:bg-emerald-600 hover:border-emerald-600 hover:text-white transition-all duration-200 cursor-pointer"
                        >
                            <Users size={14} /> Manage
                        </button>

                        <button
                            type="button"
                            onClick={() => setShowEditModal({
                                ...batch,
                                originalBatchCode: batch.batchCode
                            })}
                            title="Edit Batch Details"
                            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 bg-slate-50 border border-slate-200/70 text-slate-700 
                            font-bold text-xs rounded-lg hover:bg-slate-800 hover:border-slate-800 hover:text-white transition-all duration-200 cursor-pointer"
                        >
                            <Edit3 size={14} /> Edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}