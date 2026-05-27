// import icons
import { Users, Plus, Edit3, ArrowUpRight } from "lucide-react";

// batches grid component
export default function BatchesGrid({ batches, setShowAssignModal, setSearchTerm, setShowManageModal }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {batches.map(batch => (
                <div
                    key={batch.batchCode}
                    className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-indigo-500/5 
                    hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300 group flex flex-col h-full relative overflow-hidden"
                >
                    {/* Decorative Background Glow */}
                    <div
                        className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-0 group-hover:opacity-100 
                        transition-opacity duration-500"
                    />

                    <div className="flex justify-between items-start mb-8 relative z-10">
                        <div
                            className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center 
                            group-hover:bg-indigo-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500 shadow-inner"
                        >
                            <Users size={28} />
                        </div>

                        <div className="text-right">
                            <div className="flex items-center justify-end gap-1">
                                <p className="text-3xl font-black text-slate-900 tracking-tighter">
                                    {String(batch.students?.length || 0).padStart(2, '0')}
                                </p>

                                <ArrowUpRight size={14} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Students</p>
                        </div>
                    </div>

                    <div className="mb-10 flex-1 relative z-10">
                        <h3 className="text-xl font-black text-slate-800 leading-tight group-hover:text-indigo-600 transition-colors">
                            {batch.batchName}
                        </h3>

                        <div className="flex items-center gap-2 mt-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />

                            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] bg-slate-100 px-3 py-1 rounded-full">
                                {batch.batchCode}
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-3 relative z-10">
                        <button
                            onClick={() => { setShowAssignModal(batch.batchCode); setSearchTerm(""); }}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 text-slate-600 
                            font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-indigo-600 hover:border-indigo-600 
                            hover:text-white hover:shadow-lg hover:shadow-indigo-200 transition-all duration-300 cursor-pointer"
                        >
                            <Plus size={16} /> Assign
                        </button>

                        <button
                            onClick={() => setShowManageModal(batch)}
                            className="flex-1 flex items-center justify-center gap-2 py-4 bg-white border border-slate-100 text-slate-600 
                            font-black text-[10px] uppercase tracking-widest rounded-2xl hover:bg-emerald-600 hover:border-emerald-600 
                            hover:text-white hover:shadow-lg hover:shadow-emerald-200 transition-all duration-300 cursor-pointer"
                        >
                            <Edit3 size={16} /> Manage
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}