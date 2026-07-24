// import hooks
import { useState, useEffect } from "react";

// import icons
import { Check, Loader2, X, UserCheck, CalendarCheck, Users, Sparkles } from "lucide-react";

// import Custom select component
import CustomSelect from "./CustomSelect";

// import toast
import toast from "react-hot-toast";

// create attendance modal
export default function CreateAttendanceModal({ onClose, batches, mentor, ATTENDANCE_API }) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const years = ["2026", "2027", "2028", "2029", "2030"];
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

    // Initialize with live current date dynamically
    const [dateConfig, setDateConfig] = useState(() => {
        const now = new Date();
        return {
            year: now.getFullYear().toString(),
            month: months[now.getMonth()],
            day: now.getDate().toString()
        };
    });

    const [selectedBatches, setSelectedBatches] = useState([]);
    const [presentStudents, setPresentStudents] = useState([]);
    const [existingAttendance, setExistingAttendance] = useState([]);
    const [fetchingStatus, setFetchingStatus] = useState(false);
    const [saving, setSaving] = useState(false);

    const formattedDate = `${dateConfig.day}-${dateConfig.month}-${dateConfig.year}`;

    // Sync UI with existing database records
    useEffect(() => {
        if (selectedBatches.length > 0) {
            checkExistingAttendance();
        } else {
            setExistingAttendance([]);
            setPresentStudents([]);
        }
    }, [dateConfig, selectedBatches]);

    // existing attendance
    const checkExistingAttendance = async () => {
        setFetchingStatus(true);
        try {
            const res = await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "getAttendanceByDate",
                    date: formattedDate,
                    batchCodes: selectedBatches
                })
            });

            const data = await res.json();

            // Extract array from data.Items if necessary
            const actualData = Array.isArray(data) ? data : (data.Items || []);
            setExistingAttendance(actualData);

            // Auto-load present students
            const alreadyPresent = actualData
                .filter(r => r.status === 'present')
                .map(r => r.studentEmail);
            setPresentStudents(alreadyPresent);
        } catch (err) {
            console.error("Sync error:", err);
        } finally {
            setFetchingStatus(false);
        }
    };

    // toggle batch
    const toggleBatch = (code) => {
        setSelectedBatches(prev => prev.includes(code) ? prev.filter(c => c !== code) : [...prev, code]);
    };

    // all students listing
    const allStudents = batches
        .filter(b => selectedBatches.includes(b.batchCode))
        .flatMap(b => (b.students || []).map(email => ({ email, batchCode: b.batchCode })));

    // quick selection helpers
    const selectAllStudents = () => {
        setPresentStudents(allStudents.map(s => s.email));
    };

    const deselectAllStudents = () => {
        setPresentStudents([]);
    };

    // handle save
    const handleSave = async () => {
        if (selectedBatches.length === 0) return toast.error("Select a batch");
        setSaving(true);
        const tid = toast.loading("Syncing records...");

        const attendanceData = allStudents.map(({ email, batchCode }) => ({
            date: formattedDate,
            batchCode,
            studentEmail: email,
            status: presentStudents.includes(email) ? "present" : "absent",
            markedBy: mentor.email
        }));

        try {
            const res = await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "saveAttendance", data: attendanceData })
            });

            if (!res.ok) throw new Error();
            toast.success("Logs updated successfully", { id: tid });
            onClose();
        } catch (err) {
            toast.error("Failed to sync", { id: tid });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 transition-all">
            <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-100">
                {/* HEADER */}
                <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/80">
                    <div className="flex items-center gap-3">
                        <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl border border-indigo-100">
                            <CalendarCheck size={22} />
                        </div>

                        <div>
                            <h3 className="text-lg font-bold text-slate-900 tracking-tight">Batch Attendance Sync</h3>

                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                                    <span className={`w-2 h-2 rounded-full ${fetchingStatus ? "bg-amber-400 animate-ping" : "bg-emerald-500"}`} />
                                    {fetchingStatus ? "Fetching DB Records..." : "Database Ready"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-full transition-all cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* BODY CONTENT */}
                <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                    {/* DATE SELECTORS */}
                    <div className="bg-slate-50/60 p-5 rounded-2xl border border-slate-100/80">
                        <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider block mb-3">Target Date Configuration</label>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <CustomSelect label="Year" value={dateConfig.year} options={years} onChange={(v) => setDateConfig({ ...dateConfig, year: v })} />
                            <CustomSelect label="Month" value={dateConfig.month} options={months} onChange={(v) => setDateConfig({ ...dateConfig, month: v })} />
                            <CustomSelect label="Date" value={dateConfig.day} options={days} onChange={(v) => setDateConfig({ ...dateConfig, day: v })} />
                        </div>
                    </div>

                    {/* BATCH SELECTION */}
                    <section>
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                                <Users size={14} className="text-indigo-500" /> Target Batches
                            </label>

                            <span className="text-[11px] font-semibold text-slate-400">
                                {selectedBatches.length} selected
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-2.5">
                            {batches.map(b => {
                                const isSelected = selectedBatches.includes(b.batchCode);

                                return (
                                    <button
                                        key={b.batchCode}
                                        onClick={() => toggleBatch(b.batchCode)}
                                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer flex items-center gap-2
                                        ${isSelected
                                                ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-100 scale-[1.01]"
                                                : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300 hover:bg-slate-50"
                                            }`
                                        }
                                    >
                                        <span>{b.batchName || b.batchCode}</span>
                                        {isSelected && <Check size={14} strokeWidth={3} />}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* STUDENT GRID */}
                    <section>
                        <div className="flex items-center justify-between mb-3 px-1">
                            <div className="flex items-center gap-2">
                                <label className="text-[11px] font-black uppercase text-slate-400 tracking-wider">
                                    Attendance Checklist
                                </label>

                                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                    {presentStudents.length} Present
                                </span>
                            </div>

                            {allStudents.length > 0 && (
                                <div className="flex items-center gap-3 text-xs font-bold">
                                    <button
                                        type="button"
                                        onClick={selectAllStudents}
                                        className="text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer"
                                    >
                                        Mark All Present
                                    </button>

                                    <span className="text-slate-300">|</span>

                                    <button
                                        type="button"
                                        onClick={deselectAllStudents}
                                        className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                                    >
                                        Clear All
                                    </button>

                                    {fetchingStatus && <Loader2 size={16} className="animate-spin text-indigo-500 ml-1" />}
                                </div>
                            )}
                        </div>

                        <div className="bg-slate-50/70 p-6 rounded-2xl border border-slate-100 min-h-55 flex flex-col justify-center">
                            {allStudents.length === 0 ? (
                                <div className="py-12 text-center my-auto">
                                    <UserCheck className="mx-auto text-slate-300 mb-3" size={36} />
                                    <p className="text-xs font-bold text-slate-400 tracking-wide">No batches selected</p>
                                    <p className="text-[11px] text-slate-400 mt-1">Select one or more batches above to display students.</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                                    {allStudents.map(({ email, batchCode }) => {
                                        const isMarked = existingAttendance.find(r => r.studentEmail === email);
                                        const isCurrentlyPresent = presentStudents.includes(email);

                                        return (
                                            <div
                                                key={email}
                                                onClick={() => setPresentStudents(prev => isCurrentlyPresent ? prev.filter(e => e !== email) : [...prev, email])}
                                                className={`group flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer select-none
                                                ${isCurrentlyPresent
                                                        ? "bg-white border-emerald-300 shadow-sm shadow-emerald-50 ring-1 ring-emerald-300"
                                                        : "bg-white border-slate-200/80 hover:border-indigo-200 hover:shadow-sm"
                                                    }`
                                                }
                                            >
                                                <div className="truncate pr-3">
                                                    <div className="flex items-center gap-2 mb-0.5">
                                                        <p className="text-xs font-bold text-slate-800 truncate">{email.split('@')[0]}</p>

                                                        {isMarked && (
                                                            <span
                                                                className="text-[9px] bg-slate-100 text-slate-600 border border-slate-200 
                                                                px-1.5 py-0.2 rounded font-bold uppercase tracking-wider"
                                                            >
                                                                In DB
                                                            </span>
                                                        )}
                                                    </div>

                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-semibold text-slate-400 truncate">{email}</span>

                                                        <span
                                                            className="text-[9px] font-bold text-indigo-500 bg-indigo-50 px-1.5 py-0.2 rounded 
                                                            border border-indigo-100 uppercase"
                                                        >
                                                            {batchCode}
                                                        </span>
                                                    </div>
                                                </div>

                                                <div
                                                    className={`w-7 h-7 rounded-lg border-2 flex items-center justify-center transition-all shrink-0
                                                    ${isCurrentlyPresent
                                                            ? "bg-emerald-500 border-emerald-500 text-white shadow-sm shadow-emerald-200"
                                                            : "border-slate-200 bg-slate-50 group-hover:border-indigo-300"
                                                        }`
                                                    }
                                                >
                                                    {isCurrentlyPresent && <Check size={14} strokeWidth={3} />}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </section>
                </div>

                {/* FOOTER */}
                <div className="p-6 bg-slate-50/80 border-t border-slate-100 flex items-center justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-3 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-200/60 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        disabled={saving || selectedBatches.length === 0}
                        onClick={handleSave}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 
                        hover:bg-black transition-all shadow-lg shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {saving ? <Loader2 className="animate-spin" size={16} /> : <Sparkles size={16} />}
                        Sync Attendance ({allStudents.length} Students)
                    </button>
                </div>
            </div>
        </div>
    );
}