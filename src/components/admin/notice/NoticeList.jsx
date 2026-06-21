// import icons
import { MessageSquare, CheckCircle, Clock, User, Users } from "lucide-react";

// notice list component
export default function NoticeList({ notices, NOTICE_TYPES, user, handleApprove }) {
    return (
        <div className="space-y-10">
            {notices.length === 0 ? (
                <div className="bg-white p-20 rounded-4xl border border-dashed border-slate-200 text-center text-slate-400">
                    <MessageSquare className="mx-auto mb-4 opacity-20" size={48} />
                    <p className="text-sm font-medium">No announcements yet.</p>
                </div>
            ) : (
                notices.map((notice) => {
                    const dateObj = new Date(notice.createdAt);
                    const day = dateObj.toLocaleDateString("en-IN", { day: "2-digit" });
                    const month = dateObj.toLocaleDateString("en-IN", { month: "short" });
                    const typeStyles = NOTICE_TYPES[notice.noticeType || "general"];

                    return (
                        <div
                            key={notice.noticeId}
                            className="flex gap-6 items-start"
                        >
                            <div
                                className="flex flex-col items-center justify-center min-w-16.5 h-18.75 bg-white border border-slate-100 
                                rounded-3xl shadow-sm text-[#0189c7]"
                            >
                                <span className="text-2xl font-black leading-none">{day}</span>
                                <span className="text-[11px] font-black uppercase tracking-tight">{month}</span>
                            </div>

                            <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                                <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                                    <div className="flex items-center gap-3">
                                        <h4 className="font-black text-slate-800 text-xl tracking-tight">
                                            {notice.title}
                                        </h4>

                                        <span
                                            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border text-[9px] font-black tracking-widest 
                                            ${typeStyles.color}`}
                                        >
                                            {typeStyles.icon} {typeStyles.label}
                                        </span>
                                    </div>

                                    {/* Safely check if user object and isSuper property exists */}
                                    {user && user.isSuper && !notice.approved && (
                                        <button
                                            onClick={() => handleApprove(notice.noticeId, notice.createdAt)}
                                            className="bg-emerald-50 text-emerald-600 px-4 py-2 rounded-xl text-[10px] font-black cursor-pointer 
                                            uppercase hover:bg-emerald-600 hover:text-white transition-all flex items-center gap-2 border 
                                            border-emerald-100 shadow-sm"
                                        >
                                            <CheckCircle size={14} /> Approve Notice
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-wrap items-center gap-2 mb-5 text-[11px] font-black text-slate-400 uppercase tracking-widest">
                                    <User size={13} />

                                    <span>
                                        {notice.createdBy}
                                        <span className="mx-2 text-slate-200">|</span>
                                        <span className="text-[#0189c7]">{notice.role || "Mentor"}</span>
                                    </span>

                                    {/* INTEGRATED: TARGET AUDIENCE BATCH DISPLAY */}
                                    <span className="mx-2 text-slate-200">|</span>
                                    <div className="flex items-center gap-1">
                                        <Users size={13} className="text-slate-400" />

                                        {notice.targetBatch === "all" || !notice.targetBatch ? (
                                            <span className="text-slate-500 bg-slate-100 px-2 py-0.5 rounded text-[10px]">All Batches</span>
                                        ) : (
                                            <span className="text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                                                Batch: {notice.targetBatch}
                                            </span>
                                        )}
                                    </div>

                                    {notice.approved === false && (
                                        <span className="flex items-center gap-1 text-amber-500 ml-auto">
                                            <Clock size={12} /> Pending Approval
                                        </span>
                                    )}
                                </div>

                                <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
                                    {notice.content}
                                </p>
                            </div>
                        </div>
                    );
                })
            )}
        </div>
    );
}