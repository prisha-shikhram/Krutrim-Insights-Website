// import icons
import { ExternalLink } from "lucide-react";

// field component
export default function Field({ label, value, icon, mono, link }) {
    return (
        <div className="space-y-1.5">
            <p className="flex items-center gap-1.5 text-[9px] font-black uppercase tracking-[0.12em] text-slate-400">
                {icon && <span className="text-slate-300">{icon}</span>}
                {label}
            </p>

            {link && value ? (
                <a
                    href={value}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                >
                    View Document <ExternalLink size={10} />
                </a>
            ) : (
                <p className={`text-sm font-semibold text-slate-700 leading-tight wrap-break-word ${mono ? "font-mono tracking-wide" : ""}`}>
                    {value || <span className="text-slate-300 font-normal italic">Not provided</span>}
                </p>
            )}
        </div>
    );
}