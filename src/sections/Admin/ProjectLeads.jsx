// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { Search, Mail, Phone, Calendar, Image as ImageIcon, ExternalLink, CheckCircle, } from "lucide-react";

// import toast icons
import toast from "react-hot-toast";

// import componenets
import SkeletonRow from "../../components/admin/utils/SkeletonRow";
import LeadsHeader from "../../components/admin/utils/LeadsHeader";
import { recordLog } from "../../components/utils/logger";

// project leads page
export default function ProjectLeads() {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const hasFetched = useRef(false);

    const API_URL = "https://pgid77jz9h.execute-api.ap-south-1.amazonaws.com/submit";

    // --- FETCH DATA ---
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchLeads = async () => {
            const tid = toast.loading("Syncing project submissions...");

            try {
                const res = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch project submissions");

                const data = await res.json();
                const leadsData = Array.isArray(data) ? data : [];

                setLeads(leadsData);
                setFilteredLeads(leadsData);

                toast.success("Submissions updated", { id: tid });
            } catch (err) {
                toast.error(err.message, { id: tid });
            } finally {
                setLoading(false);
            }
        };

        fetchLeads();
    }, []);

    // --- SEARCH ---
    useEffect(() => {
        const results = leads.filter((lead) =>
            (lead.fullName?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
            (lead.emailId?.toLowerCase() || "").includes(searchTerm.toLowerCase())
        );
        setFilteredLeads(results);
    }, [searchTerm, leads]);

    // --- EXPORT ---
    const handleExportCSV = async () => {
        const tid = toast.loading("Generating Export...");
        const isSuper = localStorage.getItem("is_super") === "true";

        try {
            if (!isSuper) {
                await recordLog(
                    "PROJECT_EXPORT",
                    "Exported Project Submissions CSV",
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
            a.download = `project_submissions_${new Date().toISOString().split("T")[0]}.csv`;
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Download started", { id: tid });
        } catch (err) {
            toast.error(err.message, { id: tid });
        }
    };

    // --- CONTACT LOGGING & REDIRECT ---
    const handleActionClick = (type, studentName, value) => {
        const isSuper = localStorage.getItem("is_super") === "true";

        if (!isSuper) {
            let actionName = "";
            switch (type) {
                case 'email': actionName = "EMAIL_CONTACT"; break;
                case 'whatsapp': actionName = "WHATSAPP_CONTACT"; break;
                case 'view': actionName = "VIEW_PROJECT_FILE"; break;
                default: actionName = "PROJECT_INTERACTION";
            }

            recordLog(
                actionName,
                `${actionName.replace("_", " ")}: Student ${studentName} (${value})`,
                "data"
            );
        }

        // Action Feedback Toast
        const actionLabel = type === 'view' ? 'Opening file' : `Opening ${type}`;
        toast.success(`${actionLabel}...`, {
            id: "project-action",
            duration: 2000
        });

        // Handle Redirects
        const url = type === "whatsapp"
            ? `https://wa.me/${value.replace(/\D/g, "")}`
            : type === "email"
                ? `mailto:${value}`
                : value; // for imageUrl

        window.open(url, "_blank");
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-700">
            {/* HEADER */}
            <LeadsHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onExport={handleExportCSV}
            />

            {/* TABLE */}
            <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-8 py-5">Student Identity</th>
                                <th className="px-8 py-5">Contact Details</th>
                                <th className="px-8 py-5">Project Submission</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Submission Date</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredLeads.map((lead) => (
                                <tr
                                    key={lead.submissionId || lead.emailId}
                                    className="hover:bg-gray-50/80 group transition"
                                >
                                    {/* NAME */}
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-gray-800">{lead.fullName || "Anonymous"}</div>
                                        <div className="text-[10px] text-gray-400 uppercase">ID: {lead.submissionId?.split("-")[0]}</div>
                                    </td>

                                    {/* CONTACT */}
                                    <td className="px-8 py-5 space-y-2">
                                        <button
                                            onClick={() => handleActionClick('email', lead.fullName, lead.emailId)}
                                            className="flex items-center gap-2 text-slate-600 hover:text-[#0189c7] group/link transition cursor-pointer"
                                        >
                                            <Mail size={14} className="text-[#0189c7]" />

                                            <span>{lead.emailId || "N/A"}</span>

                                            <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition" />
                                        </button>

                                        <button
                                            onClick={() => handleActionClick('whatsapp', lead.fullName, lead.contactNumber)}
                                            className="flex items-center gap-2 text-slate-600 hover:text-green-600 group/link transition cursor-pointer"
                                        >
                                            <Phone size={14} className="text-green-500" />

                                            <span>{lead.contactNumber || "N/A"}</span>

                                            <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition" />
                                        </button>
                                    </td>

                                    {/* PROJECT LINK */}
                                    <td className="px-8 py-5">
                                        {lead.imageUrl ? (
                                            <button
                                                onClick={() => handleActionClick('view', lead.fullName, lead.imageUrl)}
                                                className="flex items-center gap-2 text-gray-500 hover:text-[#0189c7] group/link transition cursor-pointer"
                                            >
                                                <ImageIcon size={14} />

                                                <span className="text-xs font-medium">View Submission</span>

                                                <ExternalLink size={14} className="opacity-0 group-hover/link:opacity-100 transition" />
                                            </button>
                                        ) : (
                                            <span className="text-gray-300 italic flex items-center gap-1">
                                                <ImageIcon size={14} /> No link available
                                            </span>
                                        )}
                                    </td>

                                    {/* STATUS */}
                                    <td className="px-8 py-5">
                                        <span
                                            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 text-green-600 
                                            text-[10px] font-bold border border-green-100 uppercase"
                                        >
                                            <CheckCircle size={10} /> {lead.status || "Submitted"}
                                        </span>
                                    </td>

                                    {/* DATE */}
                                    <td className="px-8 py-5 text-right text-gray-400">
                                        <div className="flex items-center justify-end gap-2 text-xs font-medium">
                                            <Calendar size={14} /> {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-GB", {
                                                day: "2-digit", month: "short", year: "numeric"
                                            }) : "N/A"}
                                        </div>
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