// import icons
import { ExternalLink } from "lucide-react";

// field component
export default function Field({ label, value, icon, mono, link }) {
    return (
        <div className="space-y-1.5">
            {/* Label */}
            <p className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {icon && <span className="text-slate-400">{icon}</span>}
                <span>{label}</span>
            </p>

            {/* Value / Link */}
            {link && value ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 
                    bg-blue-50 hover:bg-blue-100/70 border border-blue-200/60 px-2.5 py-1 rounded-md transition-colors w-fit"
                >
                    <span>View Document</span>
                    <ExternalLink size={12} />
                </a>
            ) : (
                <p
                    className={`text-sm font-semibold text-slate-800 leading-snug wrap-break-word 
                    ${mono ? "font-mono tracking-wide text-xs bg-slate-50 border border-slate-100 px-2 py-1 rounded-md w-fit" : ""}`}
                >
                    {value || <span className="text-slate-400 font-normal italic">Not provided</span>}
                </p>
            )}
        </div>
    );
}