// import icons
import { ShieldCheck, Activity, RefreshCw } from "lucide-react";

// logs header component
export default function LogsHeader({ logs, fetchLogs, loading }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0189c7] bg-blue-50 px-2.5 py-1 rounded-md">
                    Audit Trail Ledger
                </span>

                <h2 className="text-xl font-black text-slate-900 tracking-tight mt-2 flex items-center gap-2">
                    <ShieldCheck className="text-[#0189c7]" size={22} />
                    System Administrative Logs
                </h2>

                <p className="text-slate-400 text-xs font-medium">
                    Immutable system logs recording payment structure creations, updates, and reminder dispatches.
                </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-auto">
                <div
                    className="flex items-center gap-2 text-[11px] font-bold text-slate-600 uppercase tracking-wider px-3.5 py-2 
                    bg-slate-50 rounded-xl border border-slate-100"
                >
                    <Activity size={14} className="text-[#0189c7]" />
                    Total Logs: <strong className="text-slate-900">{logs.length}</strong>
                </div>

                <button
                    onClick={fetchLogs}
                    disabled={loading}
                    className="p-2.5 bg-slate-50 border border-slate-100 hover:bg-slate-100 rounded-xl text-slate-600 
                    transition-all active:scale-95 cursor-pointer disabled:opacity-50"
                    title="Refresh Logs Queue"
                >
                    <RefreshCw size={16} className={loading ? "animate-spin text-[#0189c7]" : ""} />
                </button>
            </div>
        </div>
    )
}