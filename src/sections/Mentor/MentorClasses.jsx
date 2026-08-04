// import hooks
import { useState, useEffect, useMemo } from "react";

// import icons
import { Video, Plus, CheckCircle2, XCircle, Search, X, Layers, ChevronDown, Loader2, Filter } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import context
import { useOutletContext } from "react-router-dom";

// API Endpoints
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";
const ATTENDANCE_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/attendance";
const MENTOR_CLASSES_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/classes";

// month map
const MONTH_MAP = {
    january: "01", feb: "02", february: "02", mar: "03", march: "03", apr: "04", april: "04",
    may: "05", jun: "06", june: "06", jul: "07", july: "07", aug: "08", august: "08",
    sep: "09", september: "09", oct: "10", october: "10", nov: "11", november: "11", dec: "12", december: "12"
};

// import components
import Classesheader from "../../components/mentor/classes/ClassesHeader";
import BatchFilter from "../../components/mentor/classes/BatchFilter";
import ClassStats from "../../components/mentor/classes/ClassStats";
import CreateClassModel from "../../components/mentor/classes/CreateClassModel";

// mentor classes
export default function MentorClasses() {
    const context = useOutletContext();
    const mentor = context?.mentor;

    const [batches, setBatches] = useState([]);
    const [classList, setClassList] = useState([]);
    const [attendanceLookup, setAttendanceLookup] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showCreateModal, setShowCreateModal] = useState(false);

    // Filter States
    const [selectedBatchFilter, setSelectedBatchFilter] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("ALL");

    // Form State
    const [formData, setFormData] = useState({
        date: "",
        day: "",
        topic: "",
        status: "Conducted",
        batchCode: "",
    });

    useEffect(() => {
        fetchInitialData();
    }, []);

    // Helper: Get Day Name from YYYY-MM-DD
    const getDayName = (dateStr) => {
        if (!dateStr) return "";
        const dateObj = new Date(dateStr);
        return isNaN(dateObj.getTime())
            ? ""
            : dateObj.toLocaleDateString("en-US", { weekday: "long" });
    };

    // Explicit Date Normalizer: Converts ANY date format ("31-July-2026", "2026-07-31", ISO) to "YYYY-MM-DD"
    const normalizeDateKey = (raw) => {
        if (!raw) return "";
        const str = String(raw).trim();

        // 1. Check if format is "DD-Month-YYYY" (e.g., "31-July-2026" or "31-Jul-2026")
        const dashParts = str.split("-");
        if (dashParts.length === 3) {
            const day = dashParts[0].padStart(2, "0");
            const monthStr = dashParts[1].toLowerCase();
            const year = dashParts[2];

            if (MONTH_MAP[monthStr]) {
                return `${year}-${MONTH_MAP[monthStr]}-${day}`;
            }
        }

        // 2. Check if already "YYYY-MM-DD"
        if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
            return str;
        }

        // 3. Fallback standard Date parse
        try {
            const parsed = new Date(str);
            if (!isNaN(parsed.getTime())) {
                return parsed.toISOString().split("T")[0];
            }
        } catch (e) { }

        return str;
    };

    // Helper: Extract student emails array safely
    const extractStudentEmails = (studentsList = []) => {
        return studentsList.map((s) => (typeof s === "object" ? s.S : s));
    };

    // 1. Fetch Batches, Saved Classes & Attendance Lookup Data
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            // Fetch Batches
            const bRes = await fetch(BATCH_API);
            const bData = await bRes.json();
            const actualBatches = Array.isArray(bData) ? bData : bData.Items || [];
            setBatches(actualBatches);

            if (actualBatches.length > 0 && !formData.batchCode) {
                setFormData((prev) => ({ ...prev, batchCode: actualBatches[0].batchCode }));
            }

            // Fetch Attendance Logs
            const aRes = await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "listAllAttendance" }),
            });
            const aData = await aRes.json();
            const rawAttendance = Array.isArray(aData) ? aData : aData.Items || [];
            setAttendanceLookup(rawAttendance);

            // Fetch Saved Class Items
            const cRes = await fetch(MENTOR_CLASSES_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "listClasses",
                    createdBy: mentor?.email || "",
                }),
            });

            const cData = await cRes.json();
            const rawClasses = Array.isArray(cData) ? cData : cData.Items || [];

            // Debug Logs in Browser Console
            console.log("=== DEBUG: Raw Batches ===", actualBatches);
            console.log("=== DEBUG: Raw Attendance Logs ===", rawAttendance);
            console.log("=== DEBUG: Raw Class Items ===", rawClasses);

            // Synthesize Class items with attendance lookup
            const parsedClasses = rawClasses.map((item) => {
                const batchObj = actualBatches.find(
                    (b) =>
                        b.batchCode?.toLowerCase().trim() === item.batchCode?.toLowerCase().trim() ||
                        b.batchName?.toLowerCase().trim() === item.batchName?.toLowerCase().trim()
                );

                const totalBatchStudents = extractStudentEmails(batchObj?.students || []).length;
                const normalizedClassDate = normalizeDateKey(item.date);

                // Find matching attendance records for this class
                const matchingAttendanceRecords = rawAttendance.filter((att) => {
                    const attBatch = String(att.batchCode || "").toLowerCase().trim();
                    const itemBatchCode = String(item.batchCode || "").toLowerCase().trim();
                    const itemBatchName = String(item.batchName || "").toLowerCase().trim();

                    const isBatchMatch = attBatch === itemBatchCode || attBatch === itemBatchName;
                    const isDateMatch = normalizeDateKey(att.date) === normalizedClassDate;

                    return isBatchMatch && isDateMatch;
                });

                // Count Present Students
                const presentCount = matchingAttendanceRecords.filter((att) => {
                    const st = String(att.status || "").toLowerCase().trim();
                    return st === "present" || st === "p";
                }).length;

                console.log(`[Class ${item.classId}] Date: ${item.date} (${normalizedClassDate}), Batch: ${item.batchCode} | Matching Logs Found:`, matchingAttendanceRecords.length, "Present Count:", presentCount);

                return {
                    id: item.classId || item.id,
                    date: item.date || "",
                    day: item.day || getDayName(item.date),
                    topic: item.topic || "General Session",
                    status: item.status || "Conducted",
                    presentCount: item.status === "Cancelled" ? 0 : presentCount,
                    totalStudents: totalBatchStudents || item.totalStudentsCount || 0,
                    batchName: item.batchName || batchObj?.batchName || item.batchCode || "Batch",
                    batchCode: item.batchCode || batchObj?.batchCode || "",
                };
            });

            setClassList(parsedClasses);
        } catch (err) {
            console.error("Fetch Error:", err);
            toast.error("Failed to sync initial class data");
        } finally {
            setLoading(false);
        }
    };

    // selected batch details
    const selectedBatchDetails = useMemo(() => {
        return batches.find((b) => b.batchCode === formData.batchCode);
    }, [batches, formData.batchCode]);

    // handle data change
    const handleDateChange = (e) => {
        const dateVal = e.target.value;
        setFormData((prev) => ({
            ...prev,
            date: dateVal,
            day: getDayName(dateVal),
        }));
    };

    // handle create class
    const handleCreateClass = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const tid = toast.loading("Saving class entry...");

        try {
            const payload = {
                action: "createClassItem",
                batchCode: formData.batchCode,
                batchName: selectedBatchDetails?.batchName || formData.batchCode,
                date: formData.date,
                day: formData.day,
                topic: formData.topic,
                status: formData.status,
                mentorName: mentor?.name || "Mentor",
                createdBy: mentor?.email || "",
            };

            const res = await fetch(MENTOR_CLASSES_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                toast.success("Class entry created successfully", { id: tid });
                setShowCreateModal(false);

                setFormData({
                    date: "",
                    day: "",
                    topic: "",
                    status: "Conducted",
                    batchCode: batches[0]?.batchCode || "",
                });

                fetchInitialData();
            } else {
                throw new Error();
            }
        } catch (err) {
            console.error("Create Error:", err);
            toast.error("Failed to create class entry", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    // batch filtered class
    const batchFilteredClasses = useMemo(() => {
        if (selectedBatchFilter === "ALL") return classList;
        return classList.filter((c) => c.batchCode === selectedBatchFilter);
    }, [classList, selectedBatchFilter]);

    // stats
    const stats = useMemo(() => {
        const totalClasses = batchFilteredClasses.length;
        const conductedClasses = batchFilteredClasses.filter((c) => c.status === "Conducted").length;
        const cancelledClasses = batchFilteredClasses.filter((c) => c.status === "Cancelled").length;
        return { total: totalClasses, conducted: conductedClasses, cancelled: cancelledClasses };
    }, [batchFilteredClasses]);

    // filtered classes
    const filteredClasses = useMemo(() => {
        return batchFilteredClasses.filter((item) => {
            const matchesSearch =
                item.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.batchName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.batchCode.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus =
                statusFilter === "ALL" || item.status.toLowerCase() === statusFilter.toLowerCase();

            return matchesSearch && matchesStatus;
        });
    }, [batchFilteredClasses, searchTerm, statusFilter]);

    // loading
    if (loading) {
        return (
            <div className="h-96 flex flex-col items-center justify-center gap-3 text-slate-400">
                <Loader2 className="animate-spin text-indigo-600" size={38} />
                <p className="text-xs font-bold uppercase tracking-widest">Synchronizing Class Logs...</p>
            </div>
        );
    }

    return (
        <div className="w-full space-y-8 animate-in fade-in duration-500 pb-20">
            {/* HEADER */}
            <Classesheader setShowCreateModal={setShowCreateModal} />

            {/* BATCH FILTER SELECTOR */}
            <BatchFilter
                batches={batches}
                classList={classList}
                selectedBatchFilter={selectedBatchFilter}
                setSelectedBatchFilter={setSelectedBatchFilter}
            />

            {/* STAT CARDS */}
            <ClassStats stats={stats} />

            {/* TABLE */}
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-2 border-b border-slate-100">
                    <div className="relative w-full sm:w-80">
                        <Search
                            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                            size={16}
                        />

                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search topic or batch..."
                            className="w-full bg-slate-50 border border-slate-200/80 rounded-xl pl-10 pr-4 py-2 text-xs 
                            font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-500 transition-all"
                        />
                    </div>

                    <div className="flex items-center gap-1.5 bg-slate-100/80 p-1 rounded-xl w-full sm:w-auto">
                        {["ALL", "Conducted", "Cancelled"].map((st) => (
                            <button
                                key={st}
                                onClick={() => setStatusFilter(st)}
                                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer 
                                ${statusFilter === st
                                        ? "bg-white text-slate-800 shadow-2xs"
                                        : "text-slate-500 hover:text-slate-800"
                                    }`}
                            >
                                {st === "ALL" ? "All Statuses" : st}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead>
                            <tr className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">
                                <th className="px-4 py-2">Date & Day</th>
                                <th className="px-4 py-2">Batch</th>
                                <th className="px-4 py-2">Topic Covered</th>
                                <th className="px-4 py-2">Status</th>
                                <th className="px-4 py-2 text-right">Present Students</th>
                            </tr>
                        </thead>

                        <tbody className="text-xs text-slate-600">
                            {filteredClasses.length > 0 ? (
                                filteredClasses.map((cls) => {
                                    const isConducted = cls.status === "Conducted";

                                    return (
                                        <tr
                                            key={cls.id}
                                            className="bg-white hover:bg-slate-50/80 border border-slate-200/70 rounded-xl shadow-2xs transition-colors"
                                        >
                                            <td className="px-4 py-3.5 rounded-l-xl">
                                                <div className="space-y-0.5">
                                                    <p className="font-semibold text-slate-800 tabular-nums">
                                                        {cls.date
                                                            ? new Date(cls.date).toLocaleDateString("en-GB", {
                                                                day: "2-digit",
                                                                month: "short",
                                                                year: "numeric",
                                                            })
                                                            : "—"}
                                                    </p>

                                                    <span className="inline-block text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                                        {cls.day || "—"}
                                                    </span>
                                                </div>
                                            </td>

                                            <td className="px-4 py-3.5">
                                                <div className="space-y-1">
                                                    <p className="font-bold text-slate-800 line-clamp-1">
                                                        {cls.batchName}
                                                    </p>

                                                    {cls.batchCode && (
                                                        <span
                                                            className="inline-block text-[9px] font-mono font-bold text-slate-500 bg-slate-100 
                                                            px-2 py-0.5 rounded border border-slate-200/60"
                                                        >
                                                            {cls.batchCode}
                                                        </span>
                                                    )}
                                                </div>
                                            </td>

                                            <td className="px-4 py-3.5 max-w-xs">
                                                <p className="font-semibold text-slate-800 leading-snug line-clamp-2">
                                                    {cls.topic}
                                                </p>
                                            </td>

                                            <td className="px-4 py-3.5">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold 
                                                        uppercase tracking-wider border 
                                                        ${isConducted
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                                                            : "bg-rose-50 text-rose-700 border-rose-200/60"
                                                        }`}
                                                >
                                                    {isConducted ? (
                                                        <CheckCircle2 size={12} className="text-emerald-600" />
                                                    ) : (
                                                        <XCircle size={12} className="text-rose-600" />
                                                    )}
                                                    {cls.status}
                                                </span>
                                            </td>

                                            <td className="px-4 py-3.5 text-right rounded-r-xl">
                                                {isConducted ? (
                                                    <div className="inline-flex flex-col items-end">
                                                        <span className="font-bold text-slate-800 tabular-nums text-xs">
                                                            {cls.presentCount}{" "}
                                                            <span className="text-slate-400 font-medium">
                                                                / {cls.totalStudents}
                                                            </span>
                                                        </span>
                                                        {cls.totalStudents > 0 && (
                                                            <span className="text-[10px] font-semibold text-emerald-600 tabular-nums">
                                                                {Math.round((cls.presentCount / cls.totalStudents) * 100)}%
                                                                Present
                                                            </span>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <span className="text-slate-400 font-medium italic text-[11px]">
                                                        N/A (Cancelled)
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="py-12 text-center text-slate-400 italic bg-slate-50/50 rounded-xl border border-dashed border-slate-200"
                                    >
                                        No class entries found matching criteria.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* CREATE MODAL */}
            {showCreateModal && (
                <CreateClassModel
                    formData={formData}
                    handleCreateClass={handleCreateClass}
                    handleDateChange={handleDateChange}
                    setFormData={setFormData}
                    setShowCreateModal={setShowCreateModal}
                    submitting={submitting}
                />
            )}
        </div>
    );
}