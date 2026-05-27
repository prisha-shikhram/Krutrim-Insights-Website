// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { Search, ExternalLink, FolderOpen, Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import StudentDetailPage from "./StudentDetailPage";
import { recordLog } from "../../components/utils/logger";
import { useOutletContext } from "react-router-dom";

// API CONFIG
const API_URL = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/enroll";

// HELPERS
const fmt = (iso) => iso ? new Date(iso).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";
const initials = (name) => name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
const avatarColors = ["#ef4444", "#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ec4899", "#06b6d4", "#f97316"];
const avatarColor = (id) => avatarColors[(id?.charCodeAt(4) || 0) % avatarColors.length];

// enrolled students
export default function EnrolledStudents() {
    const { user, mentor } = useOutletContext();
    const [view, setView] = useState("list");
    const [students, setStudents] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [batchFilter, setBatchFilter] = useState("All");
    const hasFetched = useRef(false);

    const activeProfile = user || mentor;

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchStudents();
    }, []);

    // fetch students
    const fetchStudents = async () => {
        setLoading(true);
        const tid = toast.loading("Syncing student directory...");

        try {
            const res = await fetch(API_URL);
            if (!res.ok) throw new Error("Network error");
            const data = await res.json();
            setStudents(Array.isArray(data) ? data : []);
            toast.success("Directory synchronized", { id: tid });
        } catch (err) {
            toast.error("Failed to sync student directory", { id: tid });
        } finally {
            setLoading(false);
        }
    };

    // Logging for Detail Access
    const handleViewDetails = async (stu) => {
        setSelectedEmail(stu.email);
        setView("detail");

        if (activeProfile?.name && !activeProfile?.isSuper) {
            try {
                await recordLog(
                    "STUDENT_DETAIL_VIEW",
                    `Viewed full profile of ${stu.fullName} (${stu.email})`,
                    "view"
                );
            } catch (e) { /* silent fail */ }
        }
    };

    // filters
    const filtered = students.filter(s => {
        const q = searchTerm.toLowerCase();
        const name = s.fullName?.toLowerCase() || "";
        const email = s.email?.toLowerCase() || "";
        const matchSearch = email.includes(q) || name.includes(q);
        const matchBatch = batchFilter === "All" || s.batchCode === batchFilter;
        return matchSearch && matchBatch;
    });

    // details page
    if (view === "detail") return <StudentDetailPage
        email={selectedEmail}
        onBack={() => setView("list")}
        API_URL={API_URL}
        loading={loading}
        setLoading={setLoading}
        fmt={fmt}
        initials={initials}
        avatarColor={avatarColor}
    />;

    return (
        <div className="space-y-6 animate-in fade-in duration-300 pb-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-8 rounded-4xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-slate-800">Student Directory</h2>
                    <p className="text-xs text-slate-400 font-medium">Real-time sync with AWS DynamoDB</p>
                </div>

                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={16} />

                        <input
                            type="text"
                            placeholder="Filter by name or email..."
                            className="bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-2.5 text-sm outline-none focus:bg-white w-64 transition-all"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <select
                        className="bg-slate-50 border border-slate-100 rounded-2xl px-4 py-2.5 text-sm font-bold text-slate-600 outline-none cursor-pointer"
                        value={batchFilter}
                        onChange={e => setBatchFilter(e.target.value)}
                    >
                        <option value="All">All Batches</option>
                        <option value="UNASSIGNED">Unassigned</option>
                        <option value="ACTIVE">Active</option>
                    </select>
                </div>
            </div>

            <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
                {loading ? (
                    <div className="p-20 flex justify-center">
                        <Loader2 className="animate-spin text-slate-200" size={40} />
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left whitespace-nowrap">
                            <thead className="bg-slate-50/50">
                                <tr>
                                    {["Student Profile", "Enrolled At", "Batch Code", "Program", "Phone", ""].map(h => (
                                        <th
                                            key={h}
                                            className="px-6 py-5 text-[9px] font-black uppercase tracking-widest text-slate-300"
                                        >
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-50">
                                {filtered.length > 0 ? filtered.map(stu => (
                                    <tr
                                        key={stu.email}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-6 py-5">
                                            <div className="flex items-center gap-3">
                                                <div>
                                                    <p className="text-sm font-bold text-slate-700 leading-none">{stu.fullName}</p>
                                                    <p className="text-[10px] text-slate-400 font-medium mt-1">{stu.email}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-6 py-5 text-sm font-medium text-slate-500">{fmt(stu.createdAt)}</td>

                                        <td className="px-6 py-5">
                                            <span className={`text-[9px] font-black px-3 py-1 rounded-full border uppercase 
                                                ${stu.batchCode === "UNASSIGNED" ? "bg-amber-50 text-amber-500 border-amber-100"
                                                    : "bg-blue-50 text-blue-500 border-blue-100"}`}
                                            >
                                                {stu.batchCode}
                                            </span>
                                        </td>

                                        <td className="px-6 py-5 text-sm font-semibold text-slate-600 max-w-50 truncate">{stu.enrollingFor}</td>
                                        <td className="px-6 py-5 text-sm font-medium text-slate-500 tabular-nums">{stu.studentPhone}</td>

                                        <td className="px-6 py-5 text-right">
                                            <button
                                                onClick={() => handleViewDetails(stu)}
                                                className="p-2 text-slate-300 hover:text-blue-500 hover:bg-blue-50 rounded-xl transition-all cursor-pointer"
                                                title="View Full Profile"
                                            >
                                                <ExternalLink size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-24 text-center">
                                            <div className="flex flex-col items-center gap-2 text-slate-300">
                                                <FolderOpen size={40} strokeWidth={1} />
                                                <p className="text-xs font-bold uppercase tracking-widest">No matching records</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}