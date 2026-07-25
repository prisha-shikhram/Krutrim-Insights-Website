// portal stat component
export default function PortalStat({ label, value, total, color = "blue" }) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;

    // Color Configurations with fallback
    const config = {
        blue: { bar: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50/50", border: "border-blue-100", track: "bg-blue-100/60" },
        emerald: { bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50/50", border: "border-emerald-100", track: "bg-emerald-100/60" },
        violet: { bar: "bg-violet-500", text: "text-violet-600", bg: "bg-violet-50/50", border: "border-violet-100", track: "bg-violet-100/60" },
    }[color] || {
        bar: "bg-slate-500", text: "text-slate-600", bg: "bg-slate-50", border: "border-slate-200", track: "bg-slate-200"
    };

    return (
        <div className={`${config.bg} border ${config.border} rounded-xl p-5 space-y-3.5 shadow-2xs`}>
            {/* Label */}
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {label}
            </p>

            {/* Values */}
            <div className="flex items-baseline justify-between gap-2">
                <p className={`text-2xl font-black ${config.text} leading-none tracking-tight tabular-nums`}>
                    {value}
                    <span className="text-sm font-medium text-slate-400 ml-0.5">/{total}</span>
                </p>

                <p className={`text-xs font-bold ${config.text} tabular-nums`}>
                    {pct}%
                </p>
            </div>

            {/* Progress Bar Track */}
            <div className={`h-2 ${config.track} rounded-full overflow-hidden`}>
                <div
                    className={`h-full ${config.bar} rounded-full transition-all duration-500 ease-out`}
                    style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
                />
            </div>
        </div>
    );
}