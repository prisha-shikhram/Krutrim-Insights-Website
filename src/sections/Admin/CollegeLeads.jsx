// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { Search, Mail, Phone, School, Hash, ExternalLink } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import SkeletonRow from "../../components/admin/utils/SkeletonRow";
import LeadsHeader from "../../components/admin/utils/LeadsHeader";
import { recordLog } from "../../components/utils/logger";

// college page
export default function CollegeLeads() {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [collegeStats, setCollegeStats] = useState({});
    const [selectedCollege, setSelectedCollege] = useState("All Colleges");
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const hasFetched = useRef(false);

    const API_URL = "https://qvkc8t5vsg.execute-api.ap-south-1.amazonaws.com/apply";

    // --- FETCH ---
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchLeads = async () => {
            const tid = toast.loading("Fetching college applications...");

            try {
                const res = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch applications");

                const data = await res.json();
                const safeData = Array.isArray(data) ? data : [];

                setLeads(safeData);
                setFilteredLeads(safeData);

                const stats = {};
                safeData.forEach((l) => {
                    const college = l.collegeName || "Unknown";
                    stats[college] = (stats[college] || 0) + 1;
                });

                setCollegeStats(stats);

                toast.success("Applications loaded successfully", { id: tid });

            } catch (err) {
                toast.error(err.message, { id: tid });
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    // --- FILTER + SEARCH ---
    useEffect(() => {
        const term = searchTerm.toLowerCase();

        let results = leads.filter((lead) =>
            (lead.name?.toLowerCase() || "").includes(term) ||
            (lead.email?.toLowerCase() || "").includes(term) ||
            (lead.rollNumber?.toLowerCase() || "").includes(term)
        );

        if (selectedCollege !== "All Colleges") {
            results = results.filter(
                (l) => (l.collegeName || "Unknown") === selectedCollege
            );
        }

        setFilteredLeads(results);
    }, [searchTerm, selectedCollege, leads]);

    // --- EXPORT ---
    const handleExportCSV = async () => {
        const tid = toast.loading("Downloading CSV...");
        const isSuper = localStorage.getItem("is_super") === "true";

        try {
            if (!isSuper) {
                await recordLog(
                    "COLLEGE_LEADS_EXPORT",
                    "Exported College Leads CSV",
                    "security"
                );
            }

            const res = await fetch(`${API_URL}?export=true`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                },
            });

            if (!res.ok) throw new Error("Export failed");

            const blob = await res.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = `college_leads_${new Date().toISOString().split("T")[0]}.csv`;
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Downloaded", { id: tid });
        } catch (err) {
            toast.error(err.message, { id: tid });
        }
    };

    // --- LOGGING & REDIRECT HANDLER ---
    const handleContactProxy = (e, type, leadName, value) => {
        const isSuper = localStorage.getItem("is_super") === "true";

        if (!isSuper) {
            const actionLabel = type === "whatsapp" ? "WHATSAPP_INITIATED" : "EMAIL_INITIATED";
            recordLog(
                actionLabel,
                `${actionLabel.replace("_", " ")}: ${leadName} (${value})`,
                "data"
            );
        }

        // Show a quick toast for the redirect
        toast.success(
            `Opening ${type === 'whatsapp' ? 'WhatsApp' : 'Mail'}...`,
            {
                id: "contact-action",
                duration: 2000,
                icon: type === 'whatsapp' ? '💬' : '📧'
            }
        );

        const url = type === "whatsapp"
            ? `https://wa.me/${value.replace(/\D/g, "")}`
            : `mailto:${value}`;

        window.open(url, "_blank");
    };

    const colleges = ["All Colleges", ...Object.keys(collegeStats)];

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* HEADER */}
            <LeadsHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                showCollegeFilter={true}
                selectedCollege={selectedCollege}
                setSelectedCollege={setSelectedCollege}
                colleges={colleges}
                collegeStats={collegeStats}
                onExport={handleExportCSV}
            />

            {/* ACTIVE FILTER INFO */}
            {selectedCollege !== "All Colleges" && (
                <div className="text-sm text-gray-500 px-2">
                    Showing results for: <span className="font-semibold text-[#0189c7]">{selectedCollege}</span>
                </div>
            )}

            {/* TABLE */}
            <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-8 py-5">Student Identity</th>
                                <th className="px-8 py-5">College Info</th>
                                <th className="px-8 py-5">Contact Details</th>
                                <th className="px-8 py-5">Course Details</th>
                                <th className="px-8 py-5 text-right">Applied Date</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredLeads.map((lead) => (
                                <tr
                                    key={lead.id || lead.email}
                                    className="hover:bg-gray-50/50 group transition"
                                >
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-gray-800">{lead.name || "Anonymous"}</div>

                                        <div className="text-[10px] text-gray-400 flex items-center gap-1 uppercase">
                                            <Hash size={10} /> {lead.rollNumber || "N/A"}
                                        </div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2 text-[#0189c7] font-bold">
                                            <School size={14} />
                                            {lead.collegeName || "Unknown"}
                                        </div>

                                        <div className="text-xs text-gray-400 font-medium">{lead.department || "General"}</div>
                                    </td>

                                    <td className="px-8 py-5 space-y-2">
                                        <button
                                            onClick={(e) => handleContactProxy(e, "email", lead.name, lead.email)}
                                            className="flex items-center gap-2 group/link text-slate-600 hover:text-[#0189c7] transition-all cursor-pointer"
                                        >
                                            <Mail size={14} className="text-[#0189c7]" />

                                            <span className="truncate max-w-37.5">{lead.email || "N/A"}</span>

                                            <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </button>

                                        <button
                                            onClick={(e) => handleContactProxy(e, "whatsapp", lead.name, lead.phone)}
                                            className="flex items-center gap-2 group/link text-slate-600 hover:text-green-600 transition-all cursor-pointer"
                                        >
                                            <Phone size={14} className="text-green-500" />

                                            <span>{lead.phone || "N/A"}</span>

                                            <ExternalLink size={10} className="opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                        </button>
                                    </td>

                                    <td className="px-8 py-5">
                                        <span className="bg-blue-50 text-[#0189c7] px-2.5 py-1 rounded-lg text-[10px] font-black uppercase border border-blue-100">
                                            {lead.course || "N/A"}
                                        </span>

                                        <div className="text-[10px] text-gray-400 mt-1 font-bold">YEAR: {lead.year || "N/A"}</div>
                                    </td>

                                    <td className="px-8 py-5 text-right text-gray-400 font-medium text-xs">
                                        {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-GB", {
                                            day: "2-digit", month: "short", year: "numeric"
                                        }) : "N/A"}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}