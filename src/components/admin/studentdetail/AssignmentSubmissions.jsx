// import icons
import { FileText, ExternalLink, CheckCircle2, Clock, AlertCircle } from "lucide-react";

// import components
import Section from "../enroll/Section";

// Assignment Submissions component
export default function AssignmentSubmissions({ portalData }) {
    const assignments = portalData?.assignments || [];

    // Helper to get status colors and icons
    const getStatusConfig = (status = "") => {
        const normalized = status.toLowerCase();

        switch (normalized) {
            case "submitted":
                return {
                    icon: <CheckCircle2 size={16} className="text-emerald-600" />,
                    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
                    avatarBg: "bg-emerald-50 text-emerald-600 border-emerald-100",
                };
            case "pending":
                return {
                    icon: <Clock size={16} className="text-amber-600" />,
                    badge: "bg-amber-50 text-amber-700 border-amber-200/60",
                    avatarBg: "bg-amber-50 text-amber-600 border-amber-100",
                };
            case "late":
            case "overdue":
                return {
                    icon: <AlertCircle size={16} className="text-rose-600" />,
                    badge: "bg-rose-50 text-rose-700 border-rose-200/60",
                    avatarBg: "bg-rose-50 text-rose-600 border-rose-100",
                };
            default:
                return {
                    icon: <FileText size={16} className="text-slate-500" />,
                    badge: "bg-slate-50 text-slate-600 border-slate-200/60",
                    avatarBg: "bg-slate-100 text-slate-500 border-slate-200",
                };
        }
    };

    return (
        <Section title="Assignment Details" icon={<FileText size={16} />}>
            <div className="col-span-full space-y-2.5">
                {assignments.length > 0 ? (
                    assignments.map((asm, idx) => {
                        const config = getStatusConfig(asm.status);

                        return (
                            <div
                                key={asm.id || idx}
                                className="p-4 bg-slate-50/70 hover:bg-slate-100/60 border border-slate-200/60 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
                            >
                                {/* Left Info Group */}
                                <div className="flex items-center gap-3.5">
                                    <div
                                        className={`w-10 h-10 rounded-lg border flex items-center justify-center shrink-0 ${config.avatarBg}`}
                                    >
                                        <FileText size={18} />
                                    </div>

                                    <div className="space-y-1">
                                        <p className="text-sm font-bold text-slate-800 leading-snug">
                                            {asm.title || "Untitled Assignment"}
                                        </p>

                                        <div className="flex items-center gap-2">
                                            <span
                                                className={`inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2.5 
                                                py-0.5 rounded-md border ${config.badge}`}
                                            >
                                                {config.icon}
                                                {asm.status || "Pending"}
                                            </span>

                                            {asm.dueDate && (
                                                <span className="text-xs text-slate-400 font-medium tabular-nums">
                                                    Due: {asm.dueDate}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Action Link */}
                                {asm.submissionUrl && (
                                    <a
                                        href={asm.submissionUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-white hover:bg-blue-50/50 
                                        border border-slate-200 hover:border-blue-200/80 rounded-lg text-blue-600 text-xs font-semibold 
                                        shadow-xs transition-all shrink-0 self-start sm:self-center"
                                    >
                                        <span>View Work</span>
                                        <ExternalLink size={12} />
                                    </a>
                                )}
                            </div>
                        );
                    })
                ) : (
                    <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-medium italic">
                            No assignment submissions found.
                        </p>
                    </div>
                )}
            </div>
        </Section>
    );
}