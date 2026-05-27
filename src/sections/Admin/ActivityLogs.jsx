// import hooks
import { useState, useMemo, useEffect, useRef } from "react";

// import icons
import { Clock, Mail, MessageSquare, ShieldCheck, AlertCircle, Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// primary color
const PRIMARY = "#0189c7";

// aws url
const AWS_LOG_URL = "https://m26dwfdo25.execute-api.ap-south-1.amazonaws.com/logs";

// import components
import FilterBar from "../../components/admin/activityLogs/filterBar";

// activity logs page
export default function ActivityLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterType, setFilterType] = useState("all");
    const hasFetched = useRef(false);

    // =========================
    // FETCH FROM AWS
    // =========================
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchLogs = async () => {
            setLoading(true);

            const tid = toast.loading("Syncing audit logs from cloud...");

            try {
                const response = await fetch(AWS_LOG_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
                    }
                });

                if (!response.ok) throw new Error("Failed to fetch audit logs");

                const data = await response.json();

                const formattedData = data
                    .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // newest first
                    .slice(0, 50) // top 50 only
                    .map(log => {
                        const dt = new Date(log.timestamp);
                        return {
                            ...log,
                            id: log.logId,
                            date: dt.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
                            time: dt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
                        };
                    });

                setLogs(formattedData);

                toast.success("Logs synchronized", { id: tid });

            } catch (err) {
                console.error("Fetch error:", err);
                toast.error("Cloud Connection Error: Could not sync logs", { id: tid });
            } finally {
                setLoading(false);
            }
        };

        fetchLogs();
    }, []);

    // Filtering Logic
    const filteredLogs = useMemo(() => {
        return logs.filter(log => {
            const matchesSearch = (log.admin || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
                (log.action || "").toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = filterType === "all" || log.type === filterType;
            return matchesSearch && matchesType;
        });
    }, [searchTerm, filterType, logs]);

    // Helper functions for styling and icons
    const getActionStyle = (type) => {
        switch (type) {
            case 'system': return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case 'security': return "bg-blue-50 text-blue-600 border-blue-100";
            case 'security_alert': return "bg-rose-50 text-rose-600 border-rose-100";
            case 'data': return "bg-indigo-50 text-indigo-600 border-indigo-100";
            case 'view': return "bg-slate-50 text-slate-500 border-slate-100";
            default: return "bg-gray-50 text-gray-500 border-gray-100";
        }
    };

    // Icon based on action keywords
    const getActionIcon = (action = "") => {
        if (action.includes("LOGIN")) return <ShieldCheck size={14} />;
        if (action.includes("CONTACT")) return <MessageSquare size={14} />;
        if (action.includes("MAIL")) return <Mail size={14} />;
        if (action.includes("FAILURE")) return <AlertCircle size={14} />;
        return <Clock size={14} />;
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Filter Bar */}
            <FilterBar
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                setFilterType={setFilterType}
            />

            {/* Logs Table */}
            <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden min-h-100 relative">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50 text-[10px] uppercase tracking-[2px] font-black text-slate-400">
                            <th className="px-8 py-5">Timestamp</th>
                            <th className="px-8 py-5">Admin Entity</th>
                            <th className="px-8 py-5">Event Action</th>
                            <th className="px-8 py-5">Target Details</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="py-20 text-center">
                                    <div className="flex flex-col items-center gap-3">
                                        <Loader2 className="animate-spin text-[#0189c7]" size={32} />
                                        <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Fetching Cloud Logs...</p>
                                    </div>
                                </td>
                            </tr>
                        ) : filteredLogs.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="p-20 text-center text-slate-400 font-medium uppercase text-xs tracking-widest">
                                    No logs found matching your criteria.
                                </td>
                            </tr>
                        ) : (
                            filteredLogs.map((log) => (
                                <tr
                                    key={log.id}
                                    className="group hover:bg-[#0189c7]/5 transition-colors"
                                >
                                    <td className="px-8 py-5">
                                        <div className="text-slate-800 font-bold text-sm">{log.date}</div>
                                        <div className="text-[10px] text-slate-400 font-medium uppercase">{log.time}</div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black border
                                                ${log.admin === "Unknown" ? "bg-rose-50 text-rose-500 border-rose-100"
                                                    : "bg-slate-50 text-[#0189c7] border-slate-100"
                                                }`}>
                                                {log.admin ? log.admin[0] : "?"}
                                            </div>

                                            <span className="text-sm font-bold text-slate-700">{log.admin}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <div
                                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-black tracking-wider 
                                            uppercase ${getActionStyle(log.type)}`}
                                        >
                                            {getActionIcon(log.action)}
                                            {(log.action || "").replace(/_/g, " ")}
                                        </div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <span className="text-sm text-slate-500 font-semibold">{log.target}</span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}