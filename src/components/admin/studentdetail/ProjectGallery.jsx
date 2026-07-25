// import icons
import { Activity, CheckCircle2, AlertCircle, ExternalLink, Image as ImageIcon } from "lucide-react";

// import components
import Section from "../enroll/Section";

// Project Gallery component
export default function ProjectGallery({ portalData }) {
    const projects = portalData?.projects || [];

    // Helper for status badges
    const getStatusBadge = (status = "") => {
        const isSubmitted = status.toLowerCase() === "submitted";

        if (isSubmitted) {
            return {
                label: "Submitted",
                icon: <CheckCircle2 size={12} className="text-emerald-600" />,
                className: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
            };
        }

        return {
            label: status || "Not Submitted",
            icon: <AlertCircle size={12} className="text-amber-600" />,
            className: "bg-amber-50 text-amber-700 border-amber-200/60",
        };
    };

    return (
        <Section title="Project Portfolio" icon={<Activity size={16} />}>
            <div className="col-span-full">
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {projects.map((proj, idx) => {
                            const badge = getStatusBadge(proj.status);

                            return (
                                <div
                                    key={proj.id || idx}
                                    className="p-4 bg-slate-50/70 hover:bg-slate-100/50 rounded-xl border border-slate-200/60 flex 
                                    flex-col justify-between gap-3 transition-colors"
                                >
                                    {/* Header Info */}
                                    <div className="flex items-start justify-between gap-2">
                                        <h4 className="text-sm font-bold text-slate-800 leading-snug line-clamp-1">
                                            {proj.name || proj.title || "Untitled Project"}
                                        </h4>

                                        <span
                                            className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider 
                                            px-2.5 py-0.5 rounded-md border shrink-0 ${badge.className}`}
                                        >
                                            {badge.icon}
                                            {badge.label}
                                        </span>
                                    </div>

                                    {/* Screenshot Preview / Placeholder */}
                                    {proj.screenshotUrl ? (
                                        <a
                                            href={proj.screenshotUrl}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="relative h-44 rounded-lg overflow-hidden border border-slate-200/80 group cursor-pointer block"
                                        >
                                            <img
                                                src={proj.screenshotUrl}
                                                alt={proj.name || "Project screenshot"}
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                                            />

                                            {/* Hover Overlay */}
                                            <div
                                                className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center 
                                                justify-center transition-opacity duration-200"
                                            >
                                                <div
                                                    className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-lg 
                                                    border border-white/50 text-slate-800 text-xs font-semibold shadow-xs"
                                                >
                                                    <span>View Screenshot</span>
                                                    <ExternalLink size={12} />
                                                </div>
                                            </div>
                                        </a>
                                    ) : (
                                        <div
                                            className="h-44 rounded-lg bg-slate-100/60 flex flex-col items-center justify-center text-slate-400 
                                            border border-dashed border-slate-200 p-4"
                                        >
                                            <ImageIcon size={28} className="mb-2 opacity-40 text-slate-400" />
                                            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                                No Preview Available
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div className="py-8 text-center bg-slate-50/50 rounded-xl border border-dashed border-slate-200">
                        <p className="text-xs text-slate-400 font-medium italic">
                            No projects found in this portfolio.
                        </p>
                    </div>
                )}
            </div>
        </Section>
    );
}