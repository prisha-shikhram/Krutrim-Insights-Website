// import hooks
import { useState, useEffect } from "react";

// import icons
import {
    Calendar as CalendarIcon, Video, Plus, Users, CheckCircle2, Clock, PlayCircle, AlertCircle, X, Lock, Unlock, Sparkles, Search, Check, UserX, Loader2
} from "lucide-react";

// API CONFIG
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";
const ATTENDANCE_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/attendance";
const CLASSES_API = "https://sfaq2skk4c.execute-api.us-east-1.amazonaws.com/schedule/class";

// MOCK DATA
const INITIAL_STUDENTS = [
    { id: "S1", name: "Aarav Sharma", email: "aarav.sharma@example.com" },
    { id: "S2", name: "Ananya Verma", email: "ananya.v@example.com" },
    { id: "S3", name: "Rohan Gupta", email: "rohan.g@example.com" },
    { id: "S4", name: "Priya Patel", email: "priya.p@example.com" },
    { id: "S5", name: "Kabir Mehta", email: "kabir.m@example.com" },
    { id: "S6", name: "Diya Singh", email: "diya.s@example.com" },
];

// initial classes
const INITIAL_CLASSES = [
    {
        id: "cls-1",
        batchCode: "KI-DA-2026",
        classNo: "05",
        classId: "KI-DA-2026—05",
        date: "2026-08-10",
        meetUrl: "https://meet.google.com/abc-defg-hij",
        recordingStatus: "processing", // pending | processing | available | expired
        recordingUploadedAt: null,
        recordingToggledOnAt: null,
        recordingExpiresAt: null,
        absentStudentIds: ["S2", "S5"], // Default absent students
        accessEnabled: false,
    },
    {
        id: "cls-2",
        batchCode: "KI-AI-2026",
        classNo: "12",
        classId: "KI-AI-2026—12",
        date: "2026-08-08",
        meetUrl: "https://meet.google.com/xyz-pqrs-tuv",
        recordingStatus: "available",
        recordingUploadedAt: "2026-08-08T15:30:00Z",
        recordingToggledOnAt: null,
        recordingExpiresAt: null,
        absentStudentIds: ["S1", "S3", "S6"],
        accessEnabled: false,
    },
    {
        id: "cls-3",
        batchCode: "KI-FS-2026",
        classNo: "02",
        classId: "KI-FS-2026—02",
        date: "2026-08-11",
        meetUrl: "https://meet.google.com/mno-pjkl-qrs",
        recordingStatus: "pending",
        recordingUploadedAt: null,
        recordingToggledOnAt: null,
        recordingExpiresAt: null,
        absentStudentIds: [],
        accessEnabled: false,
    }
];

// mentor schedule classes
export default function MentorScheduleClasses() {
    const [classes, setClasses] = useState(INITIAL_CLASSES);
    const [students] = useState(INITIAL_STUDENTS);

    // Batches state
    const [batches, setBatches] = useState([]);
    const [loadingBatches, setLoadingBatches] = useState(false);

    // Modal States
    const [isScheduleOpen, setIsScheduleOpen] = useState(false);
    const [activeAbsentModalClass, setActiveAbsentModalClass] = useState(null);

    // New Class Form State
    const [newClass, setNewClass] = useState({
        date: "",
        batchCode: "",
        classNo: ""
    });

    // Fetch batch codes from BATCH_API
    useEffect(() => {
        fetchBatches();
    }, []);

    // fetch batches
    const fetchBatches = async () => {
        try {
            setLoadingBatches(true);
            const res = await fetch(BATCH_API);
            if (!res.ok) throw new Error("Failed to fetch batches");
            const data = await res.json();

            // Normalize data (handles array of strings or array of objects with batchCode)
            const batchList = Array.isArray(data)
                ? data.map(b => (typeof b === "string" ? b : b.batchCode)).filter(Boolean)
                : [];

            setBatches(batchList);
        } catch (err) {
            console.error("Error fetching batches:", err);
        } finally {
            setLoadingBatches(false);
        }
    };

    // Schedule New Class Handler
    const handleScheduleSubmit = (e) => {
        e.preventDefault();
        if (!newClass.date || !newClass.batchCode || !newClass.classNo) return;

        const classId = `${newClass.batchCode}—${newClass.classNo.padStart(2, '0')}`;
        const createdClass = {
            id: `cls-${Date.now()}`,
            batchCode: newClass.batchCode,
            classNo: newClass.classNo.padStart(2, '0'),
            classId,
            date: newClass.date,
            meetUrl: `https://meet.google.com/ki-${Math.random().toString(36).substr(2, 6)}`,
            recordingStatus: "pending",
            recordingUploadedAt: null,
            recordingToggledOnAt: null,
            recordingExpiresAt: null,
            absentStudentIds: [],
            accessEnabled: false
        };

        setClasses([createdClass, ...classes]);
        setNewClass({ date: "", batchCode: "", classNo: "" });
        setIsScheduleOpen(false);
    };

    // Toggle Absence for Student
    const handleToggleStudentAbsent = (classId, studentId) => {
        setClasses(prev => prev.map(cls => {
            if (cls.id !== classId) return cls;
            const exists = cls.absentStudentIds.includes(studentId);
            const updated = exists
                ? cls.absentStudentIds.filter(id => id !== studentId)
                : [...cls.absentStudentIds, studentId];
            return { ...cls, absentStudentIds: updated };
        }));
    };

    // Enable Recording Access Flow (Sets 15-day expiration window)
    const handleEnableAccess = (classId) => {
        const now = new Date();
        const expires = new Date();
        expires.setDate(now.getDate() + 15);

        setClasses(prev => prev.map(cls => {
            if (cls.id !== classId) return cls;
            return {
                ...cls,
                accessEnabled: true,
                recordingToggledOnAt: now.toISOString(),
                recordingExpiresAt: expires.toISOString()
            };
        }));
    };

    return (
        <div className="min-h-screen bg-slate-50/50 py-6 md:py-10 space-y-8">
            {/* HEADER SECTION */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                        <Video className="text-[#0189c7]" size={28} />
                        Class Schedule & Recordings
                    </h1>

                    <p className="text-xs font-medium text-slate-400 mt-1">
                        Manage live Meet sessions, automated n8n ingest processing, and student recording access permissions.
                    </p>
                </div>

                <button
                    onClick={() => setIsScheduleOpen(true)}
                    className="inline-flex items-center gap-2 px-5 py-3 bg-[#0189c7] hover:bg-[#0177ad] text-white rounded-2xl text-xs font-bold 
                    transition-all shadow-md shadow-sky-500/10 cursor-pointer self-start sm:self-auto shrink-0"
                >
                    <Plus size={16} />
                    Schedule Live Class
                </button>
            </div>

            {/* CLASSES GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {classes.map((item) => {
                    const isUploaded = item.recordingStatus === "available";
                    const isProcessing = item.recordingStatus === "processing";

                    return (
                        <div
                            key={item.id}
                            className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all flex flex-col 
                            justify-between space-y-5"
                        >
                            {/* TOP CARD BAR */}
                            <div className="space-y-3">
                                <div className="flex items-center justify-between gap-2">
                                    <span
                                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider 
                                        bg-slate-100 text-slate-600"
                                    >
                                        <CalendarIcon size={12} />
                                        {new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                                    </span>

                                    {/* Status Badges */}
                                    {isUploaded && (
                                        <span
                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider 
                                            bg-emerald-50 text-emerald-600 border border-emerald-100"
                                        >
                                            <CheckCircle2 size={10} /> Ready
                                        </span>
                                    )}

                                    {isProcessing && (
                                        <span
                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider 
                                            bg-amber-50 text-amber-600 border border-amber-100 animate-pulse"
                                        >
                                            <Clock size={10} /> Ingesting
                                        </span>
                                    )}

                                    {!isUploaded && !isProcessing && (
                                        <span
                                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider 
                                            bg-slate-50 text-slate-400 border border-slate-100"
                                        >
                                            Pending
                                        </span>
                                    )}
                                </div>

                                {/* Class Identifiers */}
                                <div>
                                    <h3 className="text-xl font-black text-slate-800 tracking-tight">
                                        {item.classId}
                                    </h3>

                                    <p className="text-xs font-semibold text-slate-400 mt-0.5">
                                        Batch: <span className="text-slate-600">{item.batchCode}</span> • Session #{item.classNo}
                                    </p>
                                </div>
                            </div>

                            {/* DYNAMIC MIDDLE SECTION */}
                            <div className="pt-2 border-t border-slate-50">
                                {isUploaded ? (
                                    /* UPLOAD CONFIRMED RECORDING PANEL */
                                    <div className="space-y-4 bg-slate-50/70 p-4 rounded-2xl border border-slate-100">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="font-semibold text-slate-500">Ingested At:</span>

                                            <span className="font-bold text-slate-700">
                                                {item.recordingUploadedAt
                                                    ? new Date(item.recordingUploadedAt).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit' })
                                                    : "Today"}
                                            </span>
                                        </div>

                                        {/* Absent Checklist Trigger */}
                                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-100">
                                            <div className="flex items-center gap-2">
                                                <UserX size={16} className="text-rose-500" />
                                                <span className="text-xs font-bold text-slate-700">Marked Absent</span>
                                            </div>

                                            <button
                                                onClick={() => setActiveAbsentModalClass(item)}
                                                className="px-2.5 py-1 text-[11px] font-black text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg 
                                                transition-colors cursor-pointer"
                                            >
                                                {item.absentStudentIds.length} Students
                                            </button>
                                        </div>

                                        {/* Expiry / Access status info */}
                                        {item.accessEnabled ? (
                                            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                                                <p className="text-[11px] font-bold text-emerald-700 flex items-center gap-1">
                                                    <Unlock size={12} /> Access Granted
                                                </p>

                                                <p className="text-[10px] text-emerald-600 font-medium">
                                                    Expires: {new Date(item.recordingExpiresAt).toLocaleDateString("en-IN")}
                                                </p>
                                            </div>
                                        ) : (
                                            <button
                                                onClick={() => handleEnableAccess(item.id)}
                                                disabled={item.absentStudentIds.length === 0}
                                                className={`w-full py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all 
                                                    cursor-pointer 
                                                    ${item.absentStudentIds.length === 0
                                                        ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                                                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/10"
                                                    }`}
                                            >
                                                <Lock size={14} /> Enable Recording Access
                                            </button>
                                        )}
                                    </div>
                                ) : (
                                    /* LIVE MEET CALL ACTION PANEL */
                                    <div className="space-y-3">
                                        <p className="text-[11px] font-medium text-slate-400">
                                            Record live session using Google Meet. Ensure recording title starts with{" "}
                                            <code className="text-slate-700 font-bold bg-slate-100 px-1 py-0.5 rounded">{item.classId}</code>.
                                        </p>

                                        <a
                                            href={item.meetUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full py-3 bg-[#0189c7]/10 hover:bg-[#0189c7]/20 text-[#0189c7] font-bold text-xs rounded-2xl 
                                            flex items-center justify-center gap-2 transition-colors cursor-pointer"
                                        >
                                            <Video size={16} /> Join Live Meet & Record
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* MODAL 1: SCHEDULE CLASS MODAL */}
            {isScheduleOpen && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                            <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
                                <Sparkles size={18} className="text-[#0189c7]" /> Schedule New Class
                            </h3>

                            <button
                                onClick={() => setIsScheduleOpen(false)}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleScheduleSubmit}
                            className="space-y-4"
                        >
                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Class Date
                                </label>

                                <input
                                    type="date"
                                    required
                                    value={newClass.date}
                                    onChange={(e) => setNewClass({ ...newClass, date: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#0189c7] 
                                    focus:bg-white transition-all font-medium text-slate-700"
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Batch Code
                                </label>

                                <div className="relative">
                                    <select
                                        required
                                        value={newClass.batchCode}
                                        onChange={(e) => setNewClass({ ...newClass, batchCode: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none 
                                        focus:border-[#0189c7] focus:bg-white transition-all font-medium text-slate-700 appearance-none cursor-pointer"
                                    >
                                        <option value="" disabled>Select Batch Code...</option>

                                        {batches.map((code) => (
                                            <option
                                                key={code}
                                                value={code}
                                            >
                                                {code}
                                            </option>
                                        ))}
                                    </select>

                                    {loadingBatches && (
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <Loader2 size={16} className="animate-spin text-slate-400" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div>
                                <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Class Number
                                </label>

                                <input
                                    type="number"
                                    placeholder="e.g. 5"
                                    min="1"
                                    required
                                    value={newClass.classNo}
                                    onChange={(e) => setNewClass({ ...newClass, classNo: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none 
                                    focus:border-[#0189c7] focus:bg-white transition-all font-medium text-slate-700"
                                />
                            </div>

                            <div className="pt-2 flex gap-3">
                                <button
                                    type="button"
                                    onClick={() => setIsScheduleOpen(false)}
                                    className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors 
                                    cursor-pointer"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="flex-1 py-2.5 bg-[#0189c7] hover:bg-[#0177ad] text-white font-bold text-xs rounded-xl shadow-md 
                                    transition-colors cursor-pointer"
                                >
                                    Create Schedule
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* MODAL 2: EDIT ABSENT STUDENTS CHECKLIST */}
            {activeAbsentModalClass && (
                <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-xl border border-slate-100 animate-in fade-in zoom-in-95 duration-200 space-y-5">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                            <div>
                                <h3 className="text-lg font-black text-slate-800">
                                    Manage Absent Students
                                </h3>

                                <p className="text-xs font-semibold text-slate-400">
                                    Class ID: {activeAbsentModalClass.classId}
                                </p>
                            </div>

                            <button
                                onClick={() => setActiveAbsentModalClass(null)}
                                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg transition-colors cursor-pointer"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <p className="text-xs text-slate-500 font-medium">
                            Check/uncheck students who were absent. Enabling access will grant recording viewing permissions strictly to checked students.
                        </p>

                        <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                            {students.map((student) => {
                                const isAbsent = activeAbsentModalClass.absentStudentIds.includes(student.id);

                                return (
                                    <div
                                        key={student.id}
                                        onClick={() => handleToggleStudentAbsent(activeAbsentModalClass.id, student.id)}
                                        className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition-all 
                                            ${isAbsent
                                                ? "bg-rose-50/50 border-rose-200 text-rose-900"
                                                : "bg-slate-50 border-slate-100 text-slate-600 hover:bg-slate-100/70"
                                            }`}
                                    >
                                        <div>
                                            <p className="text-xs font-bold">{student.name}</p>
                                            <p className="text-[10px] text-slate-400">{student.email}</p>
                                        </div>

                                        <div
                                            className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all 
                                            ${isAbsent
                                                    ? "bg-rose-500 border-rose-500 text-white"
                                                    : "border-slate-300 bg-white"
                                                }`}
                                        >
                                            {isAbsent && <Check size={12} strokeWidth={3} />}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={() => setActiveAbsentModalClass(null)}
                                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-all cursor-pointer"
                            >
                                Done ({activeAbsentModalClass.absentStudentIds.length} Marked)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}