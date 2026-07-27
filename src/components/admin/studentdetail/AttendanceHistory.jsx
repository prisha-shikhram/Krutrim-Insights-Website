// import icons
import { Calendar, CheckCircle2, XCircle, Clock, AlertCircle } from "lucide-react";

// import components
import Section from "../enroll/Section";

// Attendance History component
export default function AttendanceHistory({ portalData, fmt }) {
    const rawLogs = portalData?.attendance || [];

    // Sort attendance logs newest first
    const attendanceLogs = [...rawLogs].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    // Helper for formatting date safely
    const formatDate = (date) => {
        if (typeof fmt === "function") return fmt(date);
        if (!date) return "—";
        return new Date(date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    // Helper to render badge styles based on attendance status
    const getStatusBadge = (status = "") => {
        const normalized = status.toLowerCase();

        switch (normalized) {
            case "present":
                return {
                    className: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
                    icon: <CheckCircle2 size={12} className="text-emerald-600" />,
                };
            case "leave":
                return {
                    className: "bg-amber-50 text-amber-700 border-amber-200/60",
                    icon: <Clock size={12} className="text-amber-600" />,
                };
            case "absent":
                return {
                    className: "bg-rose-50 text-rose-700 border-rose-200/60",
                    icon: <XCircle size={12} className="text-rose-600" />,
                };
            default:
                return {
                    className: "bg-slate-50 text-slate-600 border-slate-200/60",
                    icon: <AlertCircle size={12} className="text-slate-400" />,
                };
        }
    };

    return (
        <Section title="Attendance Logs" icon={<Calendar size={16} />}>
            <div className="col-span-full">
                {attendanceLogs.length > 0 ? (
                    <div className="max-h-64 overflow-y-auto space-y-2 pr-1.5 scrollbar-thin scrollbar-thumb-slate-200 hover:scrollbar-thumb-slate-300">
                        {attendanceLogs.map((att, idx) => {
                            const badge = getStatusBadge(att.status);

                            return (
                                <div
                                    key={att.id || idx}
                                    className="flex items-center justify-between px-4 py-3 bg-slate-50/70 hover:bg-slate-100/60 rounded-xl
                                    border border-slate-200/60 transition-colors"
                                >
                                    <span className="text-xs font-semibold text-slate-700 tabular-nums">
                                        {formatDate(att.date)}
                                    </span>

                                    <span
                                        className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider 
                                        px-2.5 py-1 rounded-md border ${badge.className}`}
                                    >
                                        {badge.icon}
                                        {att.status || "Unknown"}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-medium italic">
                            No attendance records found.
                        </p>
                    </div>
                )}
            </div>
        </Section>
    );
}