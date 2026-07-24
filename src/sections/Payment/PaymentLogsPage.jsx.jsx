// import hooks
import { useState, useEffect } from "react";

// import icons
import { RefreshCw, User, FileText, CheckCircle2, AlertTriangle, Info, XCircle, Calendar, Layers } from "lucide-react";

// import components
import { usePaymentLogs } from "../../components/utils/usePaymentLogs";
import LogsHeader from "../../components/payment/paymentLogs/LogsHeader";
import PaymentFilter from "../../components/payment/paymentLogs/PaymentFilters";

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
            <LogsHeader
                fetchLogs={fetchLogs}
                loading={loading}
                logs={logs}
            />

            {/* CONTROLS & FILTER BAR */}
            <PaymentFilter
                searchQuery={searchQuery}
                selectedTypeFilter={selectedTypeFilter}
                setSearchQuery={setSearchQuery}
                setSelectedTypeFilter={setSelectedTypeFilter}
            />

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