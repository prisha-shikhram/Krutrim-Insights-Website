// import hooks
import { useState, useEffect } from "react";

// import icons
import { Check, Loader2, X, UserCheck, CalendarCheck } from "lucide-react";

// import Custom select component
import CustomSelect from "./CustomSelect";

// import toast
import toast from "react-hot-toast";

// create atttendance modal
export default function CreateAttendanceModal({ onClose, batches, mentor, ATTENDANCE_API }) {
    const [dateConfig, setDateConfig] = useState({
        year: "2026",
        month: "May",
        day: "4"
    });

    const [selectedBatches, setSelectedBatches] = useState([]);
    const [presentStudents, setPresentStudents] = useState([]);
    const [existingAttendance, setExistingAttendance] = useState([]);
    const [fetchingStatus, setFetchingStatus] = useState(false);
    const [saving, setSaving] = useState(false);

    const years = ["2026", "2027", "2028", "2029", "2030"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());

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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-4xl rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* header */}
                <div className="p-10 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-800">Batch Attendance Sync</h3>

                        <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest mt-1">
                            Status: {fetchingStatus ? "Fetching DB..." : "Ready"}
                        </p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-3 hover:bg-white rounded-full cursor-pointer transition-all border border-transparent hover:border-slate-100 shadow-sm"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-10 overflow-y-auto space-y-10 custom-scrollbar">
                    {/* DATE SELECTORS */}
                    <div className="grid grid-cols-3 gap-6">
                        <CustomSelect label="Year" value={dateConfig.year} options={years} onChange={(v) => setDateConfig({ ...dateConfig, year: v })} />
                        <CustomSelect label="Month" value={dateConfig.month} options={months} onChange={(v) => setDateConfig({ ...dateConfig, month: v })} />
                        <CustomSelect label="Date" value={dateConfig.day} options={days} onChange={(v) => setDateConfig({ ...dateConfig, day: v })} />
                    </div>

                    {/* BATCH TABS */}
                    <section>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">Select Target Batches</label>

                        <div className="flex flex-wrap gap-2">
                            {batches.map(b => (
                                <button
                                    key={b.batchCode}
                                    onClick={() => toggleBatch(b.batchCode)}
                                    className={`px-5 py-2.5 rounded-2xl text-xs font-bold transition-all border cursor-pointer 
                                    ${selectedBatches.includes(b.batchCode) ? "bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-100"
                                            : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200"}`}
                                >
                                    {b.batchName || b.batchCode}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* STUDENT GRID */}
                    <section>
                        <div className="flex items-center justify-between mb-4 px-2">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                Attendance Checklist ({presentStudents.length} Present)
                            </label>

                            {fetchingStatus && <Loader2 size={16} className="animate-spin text-indigo-500" />}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-50/50 p-8 rounded-[2.5rem] border border-slate-100">
                            {allStudents.length === 0 ? (
                                <div className="col-span-full py-16 text-center">
                                    <UserCheck className="mx-auto text-slate-200 mb-4" size={32} />
                                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Select batches to manage students</p>
                                </div>
                            ) : (
                                allStudents.map(({ email, batchCode }) => {
                                    const isMarked = existingAttendance.find(r => r.studentEmail === email);
                                    const isCurrentlyPresent = presentStudents.includes(email);

                                    return (
                                        <div
                                            key={email}
                                            onClick={() => setPresentStudents(prev => isCurrentlyPresent ? prev.filter(e => e !== email) : [...prev, email])}
                                            className={`group flex items-center justify-between p-4 bg-white rounded-2xl border transition-all cursor-pointer 
                                            hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-0.5 
                                            ${isCurrentlyPresent ? "border-emerald-200" : "border-slate-100"}`}
                                        >
                                            <div className="truncate pr-2">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <p className="text-xs font-bold text-slate-700 truncate">{email.split('@')[0]}</p>

                                                    {isMarked && (
                                                        <span className="text-[7px] bg-slate-900 text-white px-1.5 py-0.5 rounded-md font-black 
                                                        uppercase tracking-tighter">In DB</span>
                                                    )}
                                                </div>

                                                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{batchCode}</p>
                                            </div>

                                            <div
                                                className={`w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all 
                                                ${isCurrentlyPresent ? "bg-emerald-500 border-emerald-500 text-white shadow-lg shadow-emerald-100"
                                                        : "border-slate-100 bg-slate-50 group-hover:border-indigo-200"}`}
                                            >
                                                {isCurrentlyPresent && <Check size={16} strokeWidth={4} />}
                                            </div>
                                        </div>
                                    );
                                })
                            )}
                        </div>
                    </section>
                </div>

                {/* FOOTER */}
                <div className="p-10 bg-slate-50/50 border-t border-slate-100">
                    <button
                        disabled={saving || selectedBatches.length === 0}
                        onClick={handleSave}
                        className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-xs uppercase flex items-center justify-center gap-3 
                        hover:bg-black transition-all shadow-2xl shadow-slate-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {saving ? <Loader2 className="animate-spin" size={18} /> : <CalendarCheck size={18} />}
                        Sync Attendance for {allStudents.length} Students
                    </button>
                </div>
            </div>
        </div>
    );
}