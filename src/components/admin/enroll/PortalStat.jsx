// portal stat component
export default function PortalStat({ label, value, total, color }) {
    const pct = total > 0 ? Math.round((value / total) * 100) : 0;

    const config = {
        blue: { bar: "bg-blue-500", text: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
        emerald: { bar: "bg-emerald-500", text: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
        violet: { bar: "bg-violet-500", text: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
    }[color];

    return (
        <div className={`${config.bg} border ${config.border} rounded-2xl p-5 space-y-3`}>
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-400">{label}</p>

            <div className="flex items-end justify-between">
                <p className={`text-2xl font-black ${config.text} leading-none`}>{value}
                    <span className="text-sm font-medium text-slate-400">/{total}</span>
                </p>

                <p className={`text-xs font-black ${config.text}`}>{pct}%</p>
            </div>

            <div className="h-1.5 bg-white rounded-full overflow-hidden">
                <div className={`h-full ${config.bar} rounded-full transition-all duration-700`} style={{ width: `${pct}%` }} />
            </div>
        </div>
    );
}