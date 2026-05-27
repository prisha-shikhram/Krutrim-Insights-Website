// import icons
import { Lock } from "lucide-react";

// stat card component
export default function StatCard({ title, count, color, icon, trend, allowed }) {
    return (
        <div
            className="relative bg-white p-6 rounded-3xl border border-gray-100 shadow-sm overflow-hidden group transition-all 
            duration-300 hover:shadow-lg hover:-translate-y-1"
        >
            {/* TOP ROW */}
            <div className="flex items-center justify-between mb-4">
                <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[2px]">
                    {title}
                </p>

                <div
                    className="p-2 rounded-xl"
                    style={{ background: `${color}15`, color }}
                >
                    {icon}
                </div>
            </div>

            {/* MAIN VALUE */}
            <div className={`transition-all ${!allowed && "blur-[2px] opacity-40"}`}>
                <h4
                    className="text-4xl font-black tracking-tight"
                    style={{ color }}
                >
                    {count ?? 0}
                </h4>

                {/* TREND */}
                {trend && (
                    <p className={`text-xs font-semibold mt-2 ${trend > 0 ? "text-green-500" : "text-red-400"}`}>
                        {trend > 0 ? "↑" : "↓"} {Math.abs(trend)}% this week
                    </p>
                )}
            </div>

            {/* LOCK OVERLAY */}
            {!allowed && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <div
                        className="flex items-center gap-2 text-gray-400 text-xs font-bold uppercase tracking-wider bg-white/80 
                        backdrop-blur px-3 py-1 rounded-full border"
                    >
                        <Lock size={12} /> Restricted
                    </div>
                </div>
            )}

            {/* BACKGROUND GLOW */}
            <div
                className="absolute -right-10 -bottom-10 w-32 h-32 rounded-full opacity-10 blur-2xl group-hover:scale-125 transition-transform"
                style={{ background: color }}
            />
        </div>
    );
}