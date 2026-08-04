// import icons
import { Layers, CheckCircle2, XCircle } from "lucide-react";

// class stats component
export default function ClassStats({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
            <div className="bg-white border border-slate-200/80 rounded-xl p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Total Classes
                    </p>

                    <div className="p-2 bg-slate-50 text-slate-600 rounded-lg">
                        <Layers size={16} />
                    </div>
                </div>

                <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-black text-slate-800 tracking-tight tabular-nums">
                        {stats.total}
                    </p>

                    <span className="text-xs font-semibold text-slate-400">Class Items</span>
                </div>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-xl p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                        Conducted
                    </p>

                    <div className="p-2 bg-emerald-100/80 text-emerald-700 rounded-lg">
                        <CheckCircle2 size={16} />
                    </div>
                </div>

                <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-black text-emerald-700 tracking-tight tabular-nums">
                        {stats.conducted}
                    </p>

                    <span className="text-xs font-bold text-emerald-600/80 tabular-nums">
                        {stats.total > 0 ? Math.round((stats.conducted / stats.total) * 100) : 0}% Ratio
                    </span>
                </div>
            </div>

            <div className="bg-rose-50/40 border border-rose-100 rounded-xl p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-700">
                        Cancelled
                    </p>

                    <div className="p-2 bg-rose-100/80 text-rose-700 rounded-lg">
                        <XCircle size={16} />
                    </div>
                </div>

                <div className="flex items-baseline justify-between">
                    <p className="text-3xl font-black text-rose-700 tracking-tight tabular-nums">
                        {stats.cancelled}
                    </p>

                    <span className="text-xs font-bold text-rose-600/80 tabular-nums">
                        {stats.total > 0 ? Math.round((stats.cancelled / stats.total) * 100) : 0}% Ratio
                    </span>
                </div>
            </div>
        </div>
    )
}