// import hooks
import { useState, useEffect, useRef } from "react";

// import components
import StatCardRow from "../../components/admin/overview/StatCardRow";
import ActivityHeader from "../../components/admin/overview/ActivityHeader";
import ActivityTable from "../../components/admin/overview/ActivityTable";
import { recordLog } from "../../components/utils/logger";

// import icons
import { RefreshCcw, Loader2 } from "lucide-react";

// Toast import
import toast from "react-hot-toast";

// user context
import { useOutletContext } from "react-router-dom";

// overview page
export default function Overview({ PRIMARY }) {
    const { user } = useOutletContext();
    const hasFetched = useRef(false);

    const [data, setData] = useState({
        stats: { contact: 0, brochure: 0, colleges: 0, project: 0 },
        recent: [],
        loading: true,
        error: null
    });

    const [refreshing, setRefreshing] = useState(false);

    const API_URL = "https://v0g5yolmea.execute-api.ap-south-1.amazonaws.com/stats";

    const fetchStats = async ({ silent = false } = {}) => {
        if (refreshing) return;

        let toastId;

        // 1. Initial Load vs Manual Refresh logic
        if (!silent) {
            setData(prev => ({ ...prev, loading: true }));
            // Start a loading toast even for the initial mount
            toastId = toast.loading("Loading dashboard overview...");
        } else {
            setRefreshing(true);
            toastId = toast.loading("Syncing latest data...");
        }

        try {
            const res = await fetch(API_URL, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin_token")}`
                }
            });

            if (!res.ok) throw new Error("Server responded with an error");

            const result = await res.json();

            // Normalize recent items
            const normalizedRecent = (Array.isArray(result?.recent) ? result.recent : []).map(item => ({
                ...item,
                email: item.email || item.emailId || item.id || "N/A",
                date: item.createdAt || item.date || null
            }));

            setData({
                stats: {
                    contact: result?.stats?.contact || 0,
                    brochure: result?.stats?.brochure || 0,
                    colleges: result?.stats?.colleges || 0,
                    project: result?.stats?.project || 0
                },
                recent: normalizedRecent,
                loading: false,
                error: null
            });

            // 2. Success Feedback
            if (toastId) {
                toast.success(silent ? "Dashboard updated" : "Dashboard ready", { id: toastId });
            }

        } catch (error) {
            console.error(error);

            setData(prev => ({
                ...prev,
                loading: false,
                error: error.message
            }));

            // 3. Error Feedback
            if (toastId) {
                toast.error(`Error: ${error.message}`, { id: toastId });
            } else {
                toast.error("Failed to load dashboard data.");
            }

        } finally {
            setRefreshing(false);
        }
    };

    // fetch stats on component mount
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        fetchStats();
    }, []);

    // handle log for page access (only for sub-admins)
    const handleLogNavigation = async (label) => {
        if (user.name && !user.isSuper) {
            try {
                await recordLog("PAGE_ACCESS", `Accessed ${label} module`, "view");
            } catch { }
        }
    };

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* HEADER ACTION */}
            <div className="flex justify-end -mt-20">
                <button
                    onClick={() => fetchStats({ silent: true })}
                    disabled={refreshing || data.loading}
                    className={`flex items-center gap-2 px-4 py-2 text-xs font-bold 
                    rounded-xl transition-all active:scale-95 cursor-pointer
                    ${refreshing || data.loading
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm"
                        }`}
                >
                    {refreshing ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            Updating...
                        </>
                    ) : (
                        <>
                            <RefreshCcw size={14} />
                            Refresh Data
                        </>
                    )}
                </button>
            </div>

            {/* ERROR STATE UI */}
            {data.error && (
                <div className="p-6 bg-red-50 border border-red-100 rounded-2xl text-red-600 text-sm font-medium">
                    {data.error}. Please try again later.
                </div>
            )}

            {/* MAIN CONTENT */}
            {data.loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 size={32} className="animate-spin text-gray-300" />
                    <p className="text-sm text-gray-400 font-medium tracking-widest uppercase">Preparing your dashboard...</p>
                </div>
            ) : (
                <>
                    {/* stat card row */}
                    <StatCardRow
                        data={data}
                        PRIMARY={PRIMARY}
                        user={user}
                        onNavigate={handleLogNavigation}
                    />

                    <div className="bg-white rounded-4xl border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
                        {/* activity header */}
                        <ActivityHeader data={data} />

                        {data.recent.length === 0 ? (
                            <div className="p-12 text-sm text-gray-400 text-center">
                                No recent activity found.
                            </div>
                        ) : (
                            // activity table
                            <ActivityTable
                                data={data}
                                onNavigate={handleLogNavigation}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
}