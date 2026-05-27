// import icons
import { Activity, CheckCircle2, AlertCircle, Image } from "lucide-react";

// import components
import Section from "../enroll/Section";

// Project Gallery component
export default function ProjectGallery({ portalData }) {
    return (
        <Section
            title="Project Portfolio"
            icon={<Activity size={16} />}
        >
            <div className="col-span-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {portalData.projects.length > 0 ? portalData.projects.map((proj, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-3"
                    >
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-bold text-slate-700">{proj.name || proj.title}</p>

                            {proj.status === "Submitted" ? (
                                <div className="flex items-center gap-1 text-emerald-500 text-[9px] font-black uppercase tracking-widest">
                                    <CheckCircle2 size={14} /> Submitted
                                </div>
                            ) : (
                                <div className="flex items-center gap-1 text-amber-500 text-[9px] font-black uppercase tracking-widest">
                                    <AlertCircle size={14} /> Not Submitted
                                </div>
                            )}
                        </div>

                        {proj.screenshotUrl ? (
                            <a
                                href={proj.screenshotUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="relative h-40 rounded-2xl overflow-hidden group"
                            >
                                <img
                                    src={proj.screenshotUrl}
                                    alt="Project"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />

                                <div
                                    className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center 
                                    justify-center transition-opacity"
                                >
                                    <div className="bg-white/20 backdrop-blur-md p-2 rounded-full border border-white/30">
                                        <Image size={20} className="text-white" />
                                    </div>
                                </div>
                            </a>
                        ) : (
                            <div
                                className="h-40 rounded-2xl bg-slate-100/50 flex flex-col items-center justify-center text-slate-300 
                                border-2 border-dashed border-slate-200"
                            >
                                <Activity size={24} className="mb-2 opacity-20" />
                                <p className="text-[10px] font-bold uppercase tracking-widest">No Submission Received</p>
                            </div>
                        )}
                    </div>
                )) : <p className="text-xs text-slate-400 italic">No projects found.</p>}
            </div>
        </Section>
    )
}