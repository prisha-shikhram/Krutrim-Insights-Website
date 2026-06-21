// import icons
import { FileText, Share2, Loader2, Calendar, ExternalLink, Library } from "lucide-react";

// notes list component
export default function NotesList({ loading, notes = [], handleOpenShare }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {loading ? (
                <div className="col-span-full py-32 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Syncing study notes...</p>
                </div>
            ) : notes.length === 0 ? (
                <div className="col-span-full bg-white/40 backdrop-blur-md p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                        <Library className="text-slate-200" size={40} />
                    </div>

                    <h3 className="text-slate-800 font-black text-lg">No notes uploaded yet</h3>
                    <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">
                        Your library is empty. Click the upload button to start sharing reading materials with your student batches.
                    </p>
                </div>
            ) : (
                notes.map((item) => {
                    // Count how many batches this note is shared with
                    const sharedBatchCount = Array.isArray(item.sharedBatches) ? item.sharedBatches.length : 0;

                    return (
                        <div
                            key={item.notesId}
                            className="group relative bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm hover:shadow-xl 
                            hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            {/* Icon and Resource Hash */}
                            <div className="flex justify-between items-center mb-8">
                                <div
                                    className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center 
                                    group-hover:scale-110 transition-transform duration-300"
                                >
                                    <FileText size={24} />
                                </div>

                                <span className="px-3 py-1 bg-slate-50 rounded-full text-[9px] font-black text-slate-400 uppercase tracking-tighter">
                                    {item.notesId ? item.notesId.split('_').pop() : "DOC"}
                                </span>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="font-black text-slate-800 text-xl mb-3 leading-tight group-hover:text-indigo-600 transition-colors">
                                    {item.title}
                                </h3>

                                <div className="flex flex-wrap gap-3 mb-8">
                                    {/* Shared Batches Count Status Badge */}
                                    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border 
                                        ${sharedBatchCount > 0
                                            ? 'bg-emerald-50 border-emerald-100 text-emerald-600'
                                            : 'bg-amber-50 border-amber-100 text-amber-600'}`}
                                    >
                                        <Library size={12} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">
                                            {sharedBatchCount > 0 ? `Shared with ${sharedBatchCount} Batches` : 'Not Shared'}
                                        </span>
                                    </div>

                                    {/* Uploaded Timestamp Date Badge */}
                                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500">
                                        <Calendar size={12} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">
                                            {item.createdAt
                                                ? new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
                                                : 'Recent'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions Footer Layout */}
                            <div className="grid grid-cols-2 gap-3 pt-6 border-t border-slate-50">
                                <a
                                    href={item.fileUrl || item.pdfUrl}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-2xl text-[10px] 
                                    font-black uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                                >
                                    View Note <ExternalLink size={12} />
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