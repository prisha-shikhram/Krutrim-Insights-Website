// import hooks
import { useState, useEffect } from "react";

// import icons
import { CreditCard, Calendar, BookOpen, ArrowUpRight } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import HistoryHeader from "../../components/payment/history/HistoryHeader";

// payment history
export default function PaymentHistory() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("all");
    const [paymentRecords, setPaymentRecords] = useState([]);

    const HISTORY_API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/history?action=history";

    // FETCH REALIZED REVENUE HISTORY
    useEffect(() => {
        let isMounted = true;

        async function fetchPaymentHistory() {
            try {
                setLoading(true);
                const activeAuthToken = localStorage.getItem("admin_payment_token");

                const response = await fetch(HISTORY_API_URL, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": activeAuthToken ? `Bearer ${activeAuthToken}` : ""
                    }
                });

                if (!response.ok) {
                    throw new Error(`AWS Fetch Exception: Status ${response.status}`);
                }

                const data = await response.json();
                if (isMounted) {
                    setPaymentRecords(data);
                }
            } catch (err) {
                console.error("Failed to fetch transaction histories:", err);
                toast.error("Could not load the collected revenue ledgers.");
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        fetchPaymentHistory();

        return () => {
            isMounted = false;
        };
    }, []);

    // Filter array records based on active string queries and categorical type filters
    const filteredPayments = paymentRecords.filter(record => {
        const matchesSearch =
            record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            record.course?.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesType = activeFilter === "all" || record.type?.toLowerCase() === activeFilter;

        return matchesSearch && matchesType;
    });

    return (
        <div className="space-y-6 p-1">
            {/* ACTION SEARCH PANEL HEADER */}
            <HistoryHeader
                activeFilter={activeFilter}
                filteredPayments={filteredPayments}
                searchQuery={searchQuery}
                setActiveFilter={setActiveFilter}
                setSearchQuery={setSearchQuery}
            />

            {/* TRANSACTION BALANCES DATA GRID TABLE */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col mb-6">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        Collected Revenue Ledgers
                    </h3>

                    <p className="text-slate-400 text-xs font-medium">
                        Comprehensive ledger tracking realized student tuition fee metrics and settlement timelines immutably.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-6 py-3">Student</th>
                                <th className="px-6 py-3">Enrolled In</th>
                                <th className="px-6 py-3">Payment Type</th>
                                <th className="px-6 py-3">Amount Paid</th>
                                <th className="px-6 py-3 rounded-r-xl">Paid Date</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        Loading transactional data streams...
                                    </td>
                                </tr>
                            ) : filteredPayments.length > 0 ? (
                                filteredPayments.map((record, index) => (
                                    <tr
                                        key={record.id || index}
                                        className="bg-white shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                                    >
                                        {/* STUDENT PROFILE IDENTITY CELL */}
                                        <td className="px-6 py-4 rounded-l-xl border-y border-l border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center 
                                                    justify-center font-bold text-slate-700 text-xs shrink-0"
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

                                        {/* COURSE PROJECTION ASSIGNMENT CELL */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border 
                                                bg-blue-50/50 border-blue-100/70 text-[#0189c7]"
                                            >
                                                <BookOpen size={10} /> {record.course}
                                            </span>
                                        </td>

                                        {/* TYPE ALLOCATION BADGE CELL */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <span
                                                className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold 
                                                border uppercase tracking-wider 
                                                ${record.type === "Registration"
                                                        ? "bg-purple-50 border-purple-100 text-purple-600"
                                                        : "bg-indigo-50 border-indigo-100 text-indigo-600"
                                                    }`}
                                            >
                                                <CreditCard size={10} />
                                                {record.type}
                                            </span>
                                        </td>

                                        {/* MONETARY SETTLED LEVERAGE BALANCE */}
                                        <td className="px-6 py-4 font-bold text-slate-800 text-sm tracking-tight border-y border-gray-50">
                                            <span className="text-emerald-600 inline-flex items-center gap-0.5">
                                                ₹{Number(record.amount || 0).toLocaleString("en-IN")}
                                                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </span>
                                        </td>

                                        {/* REALIZED TIME LOG ENTRY CELL */}
                                        <td className="px-6 py-4 text-gray-400 text-xs font-medium tabular-nums rounded-r-xl border-y border-r border-gray-50">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Calendar size={13} className="text-slate-400" />

                                                {record.paidDate ? (
                                                    new Date(record.paidDate).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })
                                                ) : "—"}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        No settled payment logs resolved inside the active filtering matrix query.
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