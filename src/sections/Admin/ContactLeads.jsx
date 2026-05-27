// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { Search, Mail, Phone, Calendar, ExternalLink, MessageSquare } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import SkeletonRow from "../../components/admin/utils/SkeletonRow";
import LeadsHeader from "../../components/admin/utils/LeadsHeader";
import { recordLog } from "../../components/utils/logger";

// contact leads page
export default function ContactLeads() {
    const [leads, setLeads] = useState([]);
    const [filteredLeads, setFilteredLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const hasFetched = useRef(false);

    const API_URL = "https://faqqb54ivb.execute-api.ap-south-1.amazonaws.com/contact";

    // --- FETCH ---
    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        const fetchLeads = async () => {
            const tid = toast.loading("Fetching latest leads...");

            try {
                const res = await fetch(API_URL, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
                    },
                });

                if (!res.ok) throw new Error("Failed to fetch leads");

                const data = await res.json();
                const safeData = Array.isArray(data) ? data : [];

                setLeads(safeData);
                setFilteredLeads(safeData);

                toast.success("Leads loaded", { id: tid });
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
        const term = searchTerm.toLowerCase();

        const results = leads.filter((lead) =>
            (lead.name?.toLowerCase() || "").includes(term) ||
            (lead.email?.toLowerCase() || "").includes(term) ||
            (lead.course?.toLowerCase() || "").includes(term)
        );

        setFilteredLeads(results);
    }, [searchTerm, leads]);

    // --- EXPORT ---
    const handleExportCSV = async () => {
        const tid = toast.loading("Generating Export...");
        const isSuper = localStorage.getItem("is_super") === "true";

        try {
            if (!isSuper) {
                recordLog(
                    "DATA_EXPORT",
                    "Exported Contact Leads CSV",
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
            a.download = `contact_leads_${new Date().toISOString().split("T")[0]}.csv`;
            a.click();

            window.URL.revokeObjectURL(url);
            toast.success("Download started", { id: tid });
        } catch (err) {
            toast.error(err.message, { id: tid });
        }
    };

    // --- CONTACT ACTION ---
    const handleContactClick = async (type, leadName, contactValue) => {
        const isSuper = localStorage.getItem("is_super") === "true";

        if (!isSuper) {
            const actionLabel = type === "whatsapp" ? "WHATSAPP_CONTACT" : "EMAIL_CONTACT";
            recordLog(
                actionLabel,
                `Contacted ${leadName} via ${type} (${contactValue})`,
                "data"
            );
        }

        const url = type === "whatsapp"
            ? `https://wa.me/${contactValue.replace(/\D/g, "")}`
            : `mailto:${contactValue}`;

        window.open(url, "_blank");
        toast.success(`Opening ${type === 'whatsapp' ? 'WhatsApp' : 'Email'}...`);
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
                                <th className="px-8 py-5">Full Name</th>
                                <th className="px-8 py-5">Contact</th>
                                <th className="px-8 py-5">Course</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600 divide-y divide-gray-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredLeads.map((lead) => (
                                <tr
                                    key={lead.id || lead.email}
                                    className="hover:bg-gray-50/80 group transition"
                                >
                                    <td className="px-8 py-5">
                                        <div className="font-bold text-gray-800">{lead.name || "Anonymous"}</div>

                                        <div className="text-[10px] text-gray-400 uppercase">
                                            ID: {lead.id?.split("-")[0] || "LEGACY"}
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 space-y-2">
                                        <div className="flex items-center gap-2 group/email">
                                            <Mail size={14} className="text-[#0189c7]" />
                                            <span className="group-hover/email:text-[#0189c7] transition">{lead.email || "N/A"}</span>
                                        </div>

                                        <div className="flex items-center gap-2 group/phone">
                                            <Phone size={14} className="text-green-500" />
                                            <span className="group-hover/phone:text-green-600 transition">{lead.phone || "N/A"}</span>
                                        </div>
                                    </td>

                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1.5 bg-blue-50 text-[#0189c7] rounded-lg text-xs font-bold border border-blue-100 uppercase">
                                            {lead.course || "N/A"}
                                        </span>
                                    </td>

                                    <td className="px-8 py-5 text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} />
                                            {lead.createdAt ? new Date(lead.createdAt).toLocaleDateString("en-GB",
                                                { day: "numeric", month: "short", year: "numeric" }) : "N/A"}
                                        </div>
                                    </td>

                                    <td className="px-8 py-5 text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                                            <button
                                                onClick={() => handleContactClick("whatsapp", lead.name, lead.phone)}
                                                disabled={!lead.phone}
                                                className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white 
                                                transition cursor-pointer"
                                            >
                                                <MessageSquare size={18} />
                                            </button>

                                            <button
                                                onClick={() => handleContactClick("email", lead.name, lead.email)}
                                                disabled={!lead.email}
                                                className="p-2.5 bg-blue-50 text-[#0189c7] rounded-xl hover:bg-[#0189c7] hover:text-white 
                                                transition cursor-pointer"
                                            >
                                                <ExternalLink size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {!loading && filteredLeads.length === 0 && (
                        <div className="py-20 text-center">
                            <Search size={32} className="mx-auto text-gray-300 mb-3" />
                            <p className="text-gray-400">No matching leads found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}