// import hooks
import { useState, useEffect } from "react";

// import icons
import { AlertTriangle, Calendar, Clock, CheckCircle2, XCircle } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import DelayHeader from "../../components/payment/delay/DelayHeader";

// delay tracker
export default function DelayTracker() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [delayRecords, setDelayRecords] = useState([]);

    // API INTEGRATION LAYER
    useEffect(() => {
        let isMounted = true;
        const API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/delays?action=delays";

        async function fetchDelayLogs() {
            try {
                setLoading(true);
                const activeAuthToken = localStorage.getItem("admin_payment_token");

                const response = await fetch(API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": activeAuthToken ? `Bearer ${activeAuthToken}` : ""
                    }
                });

                if (!response.ok) {
                    throw new Error(`AWS Gateway Exception: Status Code ${response.status}`);
                }

                const data = await response.json();
                console.log(data);

                if (isMounted) {
                    setDelayRecords(data);
                }
            } catch (err) {
                console.error("Delay Retrieval Matrix Error:", err);
                toast.error(err.message || "Failed to resolve delay parameters with AWS.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchDelayLogs();

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter data based on search queries and selected delay aging groups
    const filteredRecords = delayRecords.filter(record => {
        const matchesSearch =
            record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.email?.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (activeFilter === "1-7") return record.daysDelayed >= 1 && record.daysDelayed <= 7;
        if (activeFilter === "8-15") return record.daysDelayed >= 8 && record.daysDelayed <= 15;
        if (activeFilter === "15-30") return record.daysDelayed > 15 && record.daysDelayed <= 30;
        if (activeFilter === "30+") return record.daysDelayed > 30;

        return true;
    });

    return (
        <div className="space-y-6 p-1">
            {/* SEARCH AND BUCKET FILTERS HEADER PANEL */}
            <DelayHeader
                activeFilter={activeFilter}
                filteredRecords={filteredRecords}
                searchQuery={searchQuery}
                setActiveFilter={setActiveFilter}
                setSearchQuery={setSearchQuery}
            />

            {/* DELAY TRACKER SYSTEM MATRIX TABLE */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col mb-6">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <AlertTriangle className="text-amber-500" size={20} />
                        Historical Delay Audit Log
                    </h3>

                    <p className="text-slate-400 text-xs font-medium">
                        Auditing systemic cashflow friction. Real-time rendering preserves chronological latency logs immutably.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-6 py-3">Student</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Days Delayed</th>
                                <th className="px-6 py-3">Paid Later?</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-20 text-center text-gray-400 italic"
                                    >
                                        Calculating metrics layer matrices...
                                    </td>
                                </tr>
                            ) : filteredRecords.length > 0 ? (
                                filteredRecords.map((record, idx) => (
                                    <tr
                                        key={idx}
                                        className="bg-white shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                                    >
                                        {/* STUDENT METADATA */}
                                        <td className="px-6 py-4 rounded-l-xl border-y border-l border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center 
                                                    font-bold text-slate-700 text-xs shrink-0"
                                                >
                                                    {record.name ? record.name.split(" ").map(n => n[0]).join("") : "U"}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">
                                                        {record.name}
                                                    </p>

                                                    <p className="text-[11px] text-gray-400">
                                                        {record.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* AMOUNT OVERDUE */}
                                        <td className="px-6 py-4 font-bold text-slate-800 text-sm tracking-tight border-y border-gray-50">
                                            ₹{Number(record.amount).toLocaleString("en-IN")}
                                        </td>

                                        {/* ORIGINAL DUE DATE */}
                                        <td className="px-6 py-4 text-gray-400 text-xs font-medium tabular-nums border-y border-gray-50">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Calendar size={13} className="text-slate-400" />

                                                {record.dueDate ? (
                                                    new Date(record.dueDate).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })
                                                ) : "—"}
                                            </div>
                                        </td>

                                        {/* IMMUTABLE OVERDUE AGE DAYS COMPONENT */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-black border 
                                                ${record.daysDelayed > 30
                                                        ? "bg-rose-50 border-rose-100 text-rose-600 animate-pulse"
                                                        : record.daysDelayed > 14
                                                            ? "bg-amber-50 border-amber-100 text-amber-600"
                                                            : "bg-slate-50 border-slate-100 text-slate-600"
                                                    }`}
                                            >
                                                <Clock size={12} />
                                                {record.daysDelayed} Days
                                            </span>
                                        </td>

                                        {/* INDEPENDENT HISTORICAL PAID FLAG DIMENSION */}
                                        <td className="px-6 py-4 rounded-r-xl border-y border-r border-gray-50">
                                            {record.paidLater === "Yes" || record.status === "Paid" ? (
                                                <span
                                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-emerald-50 border 
                                                    border-emerald-100 text-emerald-600 px-2.5 py-1 rounded-md uppercase tracking-wider"
                                                >
                                                    <CheckCircle2 size={12} /> Yes (Historical Log Kept)
                                                </span>
                                            ) : (
                                                <span
                                                    className="inline-flex items-center gap-1 text-[10px] font-extrabold bg-rose-50 border 
                                                    border-rose-100 text-rose-600 px-2.5 py-1 rounded-md uppercase tracking-wider"
                                                >
                                                    <XCircle size={12} /> Still Outstanding
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        No metrics variations resolved inside the active filtering matrix query.
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