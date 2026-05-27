// import hooks
import { useState, useEffect, useMemo, useRef } from "react";

// import icons
import { GraduationCap, Building2, MessageSquare } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import LeadsHeader from "../../components/admin/utils/LeadsHeader";
import SkeletonRow from "../../components/admin/utils/SkeletonRow";
import StatusBadge from "../../components/admin/utils/StatusBadge";
import EmptyState from "../../components/admin/utils/EmptyState";
import { recordLog } from "../../components/utils/logger";

// user context
import { useOutletContext } from "react-router-dom";

// registered students component
export default function RegisteredStudents() {
    const { user } = useOutletContext();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const hasFetched = useRef(false);

    const API_URL = "https://djs7erq5b0.execute-api.ap-south-1.amazonaws.com/register";

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchStudents();
    }, []);

    // fetch students with professional toast feedback
    const fetchStudents = async () => {
        setLoading(true);
        const tid = toast.loading("Syncing registration data...");

        try {
            const res = await fetch(API_URL, {
                headers: { Authorization: `Bearer ${localStorage.getItem("admin_token")}` }
            });

            if (!res.ok) throw new Error("Failed to sync registration data");
            const data = await res.json();

            setStudents(Array.isArray(data) ? data : []);
            toast.success("Database synced", { id: tid });
        } catch (err) {
            toast.error(err.message, { id: tid });
        } finally {
            setLoading(false);
        }
    };

    // filter students
    const filteredStudents = useMemo(() => {
        const term = searchTerm.toLowerCase();
        return students.filter(s =>
            s.fullName?.toLowerCase().includes(term) ||
            s.phone?.includes(term) ||
            s.college?.toLowerCase().includes(term) ||
            s.course?.toLowerCase().includes(term)
        );
    }, [searchTerm, students]);

    // handle export + logging
    const handleExportCSV = async () => {
        if (filteredStudents.length === 0) return toast.error("No data to export");

        try {
            const headers = ["Full Name", "Phone", "College", "Course", "Passing Year", "Registered At"];
            const rows = filteredStudents.map(s => [
                s.fullName, s.phone, s.college, s.course, s.passingYear, s.registeredAt
            ]);

            const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
            const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.setAttribute("href", url);
            link.setAttribute("download", `registrations_${new Date().toLocaleDateString()}.csv`);
            link.click();

            toast.success(`Exported ${filteredStudents.length} records`);

            // Logger for Export
            if (user.name && !user.isSuper) {
                await recordLog("DATA_EXPORT", `Exported ${filteredStudents.length} registered students to CSV`, "download");
            }
        } catch (error) {
            toast.error("Export failed");
        }
    };

    // open whatsapp + logging
    const openWhatsApp = async (phone, name) => {
        const cleanPhone = phone.replace(/\D/g, "");
        window.open(`https://wa.me/${cleanPhone}`, "_blank");

        // Logger for WhatsApp Contact
        if (user.name && !user.isSuper) {
            try {
                await recordLog("WHATSAPP_CONTACT", `Initiated contact with student: ${name} (${phone})`, "action");
            } catch (e) { /* silent fail for logger */ }
        }
    };

    return (
        <div className="w-full max-w-7xl mx-auto space-y-6 animate-in fade-in duration-700 pb-20">

            {/* HEADER */}
            <LeadsHeader
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                onExport={handleExportCSV}
            />

            {/* DATA TABLE */}
            <div className="bg-white rounded-[40px] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-slate-50/50 text-slate-400 text-[10px] uppercase tracking-[0.2em] font-black">
                            <tr>
                                <th className="px-8 py-6">Student Info</th>
                                <th className="px-8 py-6">Institution & Degree</th>
                                <th className="px-8 py-6">Passing</th>
                                <th className="px-8 py-6">Date Joined</th>
                                <th className="px-8 py-6 text-right">Connect</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                Array(5).fill(0).map((_, i) => <SkeletonRow key={i} />)
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student) => (
                                    <tr
                                        key={student.phone}
                                        className="group hover:bg-blue-50/30 transition-all"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div>
                                                    <div className="font-black text-slate-800 text-base">{student.fullName}</div>
                                                    <div className="text-slate-400 text-xs font-bold">{student.phone}</div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-5">
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2 text-slate-700 font-bold">
                                                    <Building2 size={14} className="text-slate-300" />
                                                    {student.college}
                                                </div>
                                                <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
                                                    <GraduationCap size={14} />
                                                    {student.course}
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-8 py-5">
                                            <StatusBadge year={student.passingYear} />
                                        </td>

                                        <td className="px-8 py-5 text-slate-400 text-xs font-bold uppercase tracking-tight">
                                            {new Date(student.registeredAt).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </td>

                                        <td className="px-8 py-5 text-right">
                                            <button
                                                onClick={() => openWhatsApp(student.phone, student.fullName)}
                                                className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white 
                                                transition-all transform hover:scale-110 active:scale-95 cursor-pointer"
                                            >
                                                <MessageSquare size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">
                                        <EmptyState message="No matching students found" />
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