// import hooks
import { useState, useEffect } from "react";

// import link
import { Link } from "react-router-dom";

// import icons
import { Users, UserCheck, DollarSign, TrendingUp, Clock, AlertTriangle, Calendar, CreditCard, BookOpen } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import StatCard from "../../components/admin/overview/StatCard";

// payment overview
export default function PaymentOverview() {
    const [loading, setLoading] = useState(true);
    const [upcomingLoading, setUpcomingLoading] = useState(true);
    const [upcomingPayments, setUpcomingPayments] = useState([]);

    // Core statistics analytical tracking states mapped to match backend response schemas
    const [liveStats, setLiveStats] = useState({
        totalStudents: 0,
        activeStudents: 0,
        totalFeesExpected: 0,
        totalFeesCollected: 0,
        pendingAmount: 0,
        overdueAmount: 0,
        paymentsDueToday: 0,
        delayedPaymentsCount: 0
    });

    // base url
    const BASE_API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment";

    // FETCH LIVE METRICS STATS OVERVIEW
    useEffect(() => {
        let isMounted = true;

        async function fetchOverviewMetrics() {
            try {
                setLoading(true);
                const activeAuthToken = localStorage.getItem("admin_payment_token");
                const targetUrl = `${BASE_API_URL}/stats?action=stats`;

                const response = await fetch(targetUrl, {
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
                    setLiveStats(data);
                }
            } catch (err) {
                console.error("Failed to compile dashboard metrics streams:", err);
                toast.error("Could not sync live balance statistics from cloud server.");
            } finally {
                if (isMounted) setLoading(false);
            }
        }

        fetchOverviewMetrics();
        return () => { isMounted = false; };
    }, []);

    // FETCH LIVE PAYMENTS DUE TODAY (GET)
    useEffect(() => {
        let isMounted = true;

        async function fetchDueTodayPayments() {
            try {
                setUpcomingLoading(true);
                const activeAuthToken = localStorage.getItem("admin_payment_token");
                const targetUrl = `${BASE_API_URL}/due-today?action=dueToday`;

                const response = await fetch(targetUrl, {
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
                    setUpcomingPayments(data);
                }
            } catch (err) {
                console.error("Failed to fetch collections hitting deadlines today:", err);
                toast.error("Could not sync installments due today from cloud server.");
            } finally {
                if (isMounted) setUpcomingLoading(false);
            }
        }

        fetchDueTodayPayments();
        return () => { isMounted = false; };
    }, []);

    // Constructing the visual array dynamically leveraging live server counts
    const statsConfigurationMatrix = [
        { title: "Total Students", count: liveStats.totalStudents.toLocaleString("en-IN"), color: "#4f46e5", icon: <Users size={20} /> },
        { title: "Active Students", count: liveStats.activeStudents.toLocaleString("en-IN"), color: "#06b6d4", icon: <UserCheck size={20} /> },
        { title: "Total Fees Expected", count: `₹${liveStats.totalFeesExpected.toLocaleString("en-IN")}`, color: "#0189c7", icon: <DollarSign size={20} /> },
        { title: "Total Fees Collected", count: `₹${liveStats.totalFeesCollected.toLocaleString("en-IN")}`, color: "#10b981", icon: <TrendingUp size={20} /> },
        { title: "Pending Amount", count: `₹${liveStats.pendingAmount.toLocaleString("en-IN")}`, color: "#f59e0b", icon: <Clock size={20} /> },
        { title: "Overdue Amount", count: `₹${liveStats.overdueAmount.toLocaleString("en-IN")}`, color: "#ef4444", icon: <AlertTriangle size={20} /> },
        {
            title: "Payments Due Today", count: `${liveStats.paymentsDueToday > 0 ? `${liveStats.paymentsDueToday.toLocaleString("en-IN")} Cases` : "0 Cases"}`,
            color: "#ec4899", icon: <Calendar size={20} />
        },
        { title: "Delayed Payments Count", count: `${liveStats.delayedPaymentsCount} Cases`, color: "#64748b", icon: <CreditCard size={20} /> }
    ];

    return (
        <div className="space-y-8 p-1">
            {/* STATS ANALYTICS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {statsConfigurationMatrix.map((stat, idx) => (
                    <StatCard
                        key={idx}
                        title={stat.title}
                        count={loading ? "..." : stat.count}
                        color={stat.color}
                        icon={stat.icon}
                        allowed={true}
                    />
                ))}
            </div>

            {/* UPCOMING PAYMENTS CONTAINER */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm mt-8">
                <div className="flex flex-col mb-6">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        Payments Due Today
                    </h3>

                    <p className="text-slate-400 text-xs font-medium">
                        Real-time student balance elements reaching their deadline markers today
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-6 py-3">Student</th>
                                <th className="px-6 py-3">Module / Course</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3 text-right">Details</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600">
                            {upcomingLoading ? (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-20 text-center text-gray-400 italic"
                                    >
                                        Synchronizing with AWS...
                                    </td>
                                </tr>
                            ) : upcomingPayments.length > 0 ? (
                                upcomingPayments.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        className="bg-white shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all group cursor-pointer"
                                    >
                                        {/* STUDENT PROFILE IDENTITY CELL */}
                                        <td className="px-6 py-4 rounded-l-xl border-y border-l border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center 
                                                    justify-center font-bold text-slate-700 text-xs shrink-0"
                                                >
                                                    {item.name ? item.name.split(" ").map(n => n[0]).join("") : "U"}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">{item.name}</p>
                                                    <p className="text-[11px] text-gray-400">{item.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* COURSE PROJECTION CELL */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <span
                                                className="inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold border 
                                                bg-blue-50 border-blue-100 text-[#0189c7]"
                                            >
                                                <BookOpen size={10} className="mr-1" /> {item.course}
                                            </span>
                                        </td>

                                        {/* MONETARY BALANCE QUANTUM */}
                                        <td className="px-6 py-4 font-bold text-slate-800 text-sm tracking-tight border-y border-gray-50">
                                            ₹{Number(item.amount || 0).toLocaleString("en-IN")}
                                        </td>

                                        {/* TIMELINE DUE DATE */}
                                        <td className="px-6 py-4 text-gray-400 text-xs font-medium tabular-nums border-y border-gray-50">
                                            <div className="flex items-center gap-1.5 text-slate-500">
                                                <Calendar size={13} className="text-slate-400" />

                                                {item.dueDate ? (
                                                    new Date(item.dueDate).toLocaleDateString("en-GB", {
                                                        day: "2-digit",
                                                        month: "short",
                                                        year: "numeric"
                                                    })
                                                ) : "—"}
                                            </div>
                                        </td>

                                        {/* LINKED ACTION CENTER ELEMENT */}
                                        <td className="px-6 py-4 text-right rounded-r-xl border-y border-r border-gray-50">
                                            <Link
                                                to="/admin/payment/dashboard/reminders"
                                                className="inline-block px-3 py-1.5 text-[11px] font-bold rounded-lg border border-gray-100 
                                                text-gray-400 hover:text-[#0189c7] hover:border-[#0189c7] hover:bg-[#0189c710] 
                                                transition-all opacity-0 group-hover:opacity-100 cursor-pointer"
                                            >
                                                View Details →
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-20 text-center text-gray-400 italic"
                                    >
                                        No outstanding milestones scheduled for today.
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