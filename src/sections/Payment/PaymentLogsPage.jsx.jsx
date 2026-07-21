// import hooks
import { useState, useEffect } from "react";

// import icons
import { Search, ShieldCheck, RefreshCw, Activity, User, FileText, CheckCircle2, AlertTriangle, Info, XCircle, Calendar, Layers, Clock } from "lucide-react";

// import payment logs component
import { usePaymentLogs } from "../../components/utils/usePaymentLogs";

// payment logs page
export default function PaymentLogsPage() {
    const { logs, loading, fetchLogs } = usePaymentLogs();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTypeFilter, setSelectedTypeFilter] = useState("ALL");

    useEffect(() => {
        fetchLogs();
    }, [fetchLogs]);

    // Dynamic status badge renderer
    const renderTypeBadge = (type) => {
        const formattedType = (type || "INFO").toUpperCase();
        switch (formattedType) {
            case "SUCCESS":
                return (
                    <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-emerald-50 border 
                        border-emerald-100 text-emerald-600 uppercase tracking-wider"
                    >
                        <CheckCircle2 size={10} /> Success
                    </span>
                );
            case "WARNING":
                return (
                    <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-amber-50 border 
                        border-amber-100 text-amber-600 uppercase tracking-wider"
                    >
                        <AlertTriangle size={10} /> Warning
                    </span>
                );
            case "ERROR":
                return (
                    <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-rose-50 border 
                        border-rose-100 text-rose-600 uppercase tracking-wider"
                    >
                        <XCircle size={10} /> Error
                    </span>
                );
            default:
                return (
                    <span
                        className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold bg-blue-50 border 
                        border-blue-100 text-[#0189c7] uppercase tracking-wider"
                    >
                        <Info size={10} /> Info
                    </span>
                );
        }
    };

    // Filter logs by search input and dropdown filter
    const filteredLogs = logs.filter((log) => {
        const matchesSearch =
            log.action?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.adminName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.target?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            log.logId?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType =
            selectedTypeFilter === "ALL" ||
            log.type?.toUpperCase() === selectedTypeFilter;

        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6 p-1 max-w-7xl mx-auto">
            {/* HEADER & SUMMARY METRICS */}
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

            {/* CONTROLS & FILTER BAR */}
            <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Search Input */}
                <div className="relative flex-1 w-full max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                    <input
                        type="text"
                        placeholder="Search by Admin, Action, Log ID, or Description..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 
                        placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                    />
                </div>

                {/* Type Filter Buttons */}
                <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {["ALL", "SUCCESS", "WARNING", "INFO", "ERROR"].map((type) => (
                        <button
                            key={type}
                            onClick={() => setSelectedTypeFilter(type)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer shrink-0 
                                ${selectedTypeFilter === type
                                    ? "bg-[#0189c7] text-white shadow-sm"
                                    : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                                }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
            </div>

            {/* LOGS TABLE CONTAINER */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-6 py-3">Log ID & Timestamp</th>
                                <th className="px-6 py-3">Admin</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Target Description</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        <div className="flex flex-col items-center gap-2">
                                            <RefreshCw size={20} className="animate-spin text-[#0189c7]" />
                                            <span>Fetching historical log records from DynamoDB...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : filteredLogs.length > 0 ? (
                                filteredLogs.map((log, idx) => (
                                    <tr
                                        key={log.logId || idx}
                                        className="bg-white shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                                    >
                                        {/* LOG ID & TIMESTAMP */}
                                        <td className="px-6 py-4 rounded-l-xl border-y border-l border-gray-50">
                                            <div className="flex flex-col">
                                                <span className="font-mono text-xs text-slate-800 font-bold tracking-tight">
                                                    {log.logId || `LOG-${idx}`}
                                                </span>

                                                <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                                                    <Calendar size={11} className="text-slate-400" />

                                                    {log.timestamp ? (
                                                        new Date(log.timestamp).toLocaleString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                            second: "2-digit"
                                                        })
                                                    ) : (
                                                        "—"
                                                    )}
                                                </div>
                                            </div>
                                        </td>

                                        {/* ADMIN NAME */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <div className="flex items-center gap-2.5">
                                                <div
                                                    className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center 
                                                    font-bold text-slate-700 text-xs shrink-0"
                                                >
                                                    <User size={14} className="text-slate-500" />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 text-xs">
                                                        {log.adminName || "System Automated"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* ACTION BADGE */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <span
                                                className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-md font-mono 
                                                text-[11px] font-bold text-slate-700"
                                            >
                                                {log.action}
                                            </span>
                                        </td>

                                        {/* TYPE */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            {renderTypeBadge(log.type)}
                                        </td>

                                        {/* TARGET DESCRIPTION */}
                                        <td className="px-6 py-4 rounded-r-xl border-y border-r border-gray-50 text-xs text-slate-600 max-w-md">
                                            <div className="flex items-start gap-2">
                                                <FileText size={14} className="text-slate-400 shrink-0 mt-0.5" />
                                                <span className="leading-relaxed">{log.target || "N/A"}</span>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        <div className="flex flex-col items-center gap-2">
                                            <Layers size={24} className="text-slate-300" />
                                            <span>No matching audit log records found in system memory.</span>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}