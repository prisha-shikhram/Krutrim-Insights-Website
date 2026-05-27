// import icons
import { FileText, ExternalLink } from "lucide-react";

// import components
import Section from "../enroll/Section";

// Assignment Submissions component
export default function AssignmentSubmissions({ portalData }) {
    return (
        <Section
            title="Assignment Details"
            icon={<FileText size={16} />}
        >
            <div className="col-span-full space-y-3">
                {portalData.assignments.length > 0 ? portalData.assignments.map((asm, idx) => (
                    <div
                        key={idx}
                        className="p-4 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-between hover:bg-white 
                        transition-colors group"
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={`p-2 rounded-xl
                                ${asm.status === 'Submitted' ? 'bg-emerald-50 text-emerald-500' : 'bg-amber-50 text-amber-500'}`}
                            >
                                <FileText size={18} />
                            </div>

                            <div>
                                <p className="text-sm font-bold text-slate-700">{asm.title}</p>

                                <span
                                    className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md border 
                                    ${asm.status === 'Submitted' ? 'border-emerald-100 text-emerald-500 bg-emerald-50/50'
                                            : 'border-amber-100 text-amber-500 bg-amber-50/50'}`}
                                >
                                    {asm.status || 'Pending'}
                                </span>
                            </div>
                        </div>

                        {asm.submissionUrl && (
                            <a
                                href={asm.submissionUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-xl text-blue-500 
                                text-[10px] font-black uppercase tracking-widest shadow-xs hover:border-blue-200 transition-all"
                            >
                                View Work <ExternalLink size={12} />
                            </a>
                        )}
                    </div>
                )) : <p className="text-xs text-slate-400 italic">No assignments found.</p>}
            </div>
        </Section>
    )
}