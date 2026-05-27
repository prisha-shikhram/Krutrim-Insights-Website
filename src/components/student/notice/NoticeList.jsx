// import icons
import { User, Clock, Megaphone, Loader2, MessageSquare } from "lucide-react";

// notice list component
export default function NoticeList({ loading, filteredNotices, getTypeStyles }) {
    return (
        <div className="space-y-10">
            {loading ? (
                <div className="py-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                    <Loader2 className="animate-spin" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">Fetching Board...</p>
                </div>
            ) : filteredNotices.length === 0 ? (
                <div className="bg-white/60 backdrop-blur-md p-20 rounded-4xl border border-dashed border-slate-200 text-center text-slate-400 shadow-sm">
                    <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                    <p className="text-sm font-medium">No official announcements yet.</p>
                </div>
            ) : (
                filteredNotices.map((notice) => {
                    const dateObj = new Date(notice.createdAt);
                    const day = dateObj.toLocaleDateString("en-IN", { day: "2-digit" });
                    const month = dateObj.toLocaleDateString("en-IN", { month: "short" });

                    return (
                        <div key={notice.noticeId} className="flex gap-6 items-start group">
                            {/* Date Box */}
                            <div
                                className="flex flex-col items-center justify-center min-w-[4.2rem] h-[4.7rem] bg-white border border-slate-100 
                                rounded-3xl shadow-sm text-indigo-600 transition-transform group-hover:scale-105 duration-300"
                            >
                                <span className="text-2xl font-black leading-none">{day}</span>
                                <span className="text-[11px] font-black uppercase tracking-tight">{month}</span>
                            </div>

                            {/* Content Card */}
                            <div
                                className="flex-1 bg-white/60 backdrop-blur-md p-8 rounded-[2.5rem] border border-white shadow-sm hover:bg-white 
                                transition-all duration-300"
                            >
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-black text-slate-800 text-xl tracking-tight">{notice.title}</h4>

                                        <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border 
                                            ${getTypeStyles(notice.noticetype)}`}
                                        >
                                            {notice.noticetype || "GENERAL"}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 mb-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                    <User size={13} className="text-slate-300" />

                                    <span>
                                        {notice.createdBy}
                                        <span className="mx-2 text-slate-200">|</span>
                                        <span className="text-indigo-600">{notice.role || "Administrator"}</span>
                                    </span>
                                </div>

                                <p className="text-[15px] text-slate-500 font-medium leading-relaxed italic">
                                    "{notice.content}"
                                </p>

                                <div className="flex items-center gap-4 mt-6 pt-5 border-t border-slate-50">
                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                                        <Megaphone size={12} className="text-indigo-400" />
                                        <span>Official Broadcast</span>
                                    </div>

                                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                                        <Clock size={12} />
                                        <span>{new Date(notice.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    )
}