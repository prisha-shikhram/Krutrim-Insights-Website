// import hooks
import { useState, useEffect, useMemo } from "react";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import icons
import { Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// api url
const ATTENDANCE_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/attendance";

// import components
import SummaryCards from "../../components/student/attendance/SummaryCards";
import AlertBox from "../../components/student/attendance/AlertBox";
import AttendanceList from "../../components/student/attendance/AttendanceList";

// attendance page
export default function StudententAttendance() {
    const { student } = useOutletContext();
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAttendance();
    }, [student.email]);

    // Logic to sync ALL fetched records to portal_table
    const syncToPortal = async (attendanceLogs) => {
        try {
            if (attendanceLogs.length === 0) return;

            // Map all logs to the format expected by the portal table
            const syncData = attendanceLogs.map(log => ({
                studentEmail: student.email,
                activityId: `ATTENDANCE#${log.date}`, // Unique Sort Key per date
                date: log.date,
                status: log.status,
                type: "attendance",
                title: `Attendance: ${log.date}`,
                updatedAt: log.updatedAt || new Date().toISOString()
            }));

            await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "syncToPortal",
                    category: "ATT",
                    data: syncData // Sending the full array
                })
            });
        } catch (err) {
            console.error("Portal sync failed", err);
        }
    };

    // fetch attendance
    const fetchAttendance = async () => {
        setLoading(true);
        try {
            const res = await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "listAllAttendance" })
            });
            const data = await res.json();

            const studentLogs = (Array.isArray(data) ? data : (data.Items || []))
                .filter(log => log.studentEmail.toLowerCase() === student.email.toLowerCase())
                .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

            setLogs(studentLogs);

            // Sync the entire history to ensure portal stats are complete
            if (studentLogs.length > 0) {
                syncToPortal(studentLogs);
            }

        } catch (err) {
            toast.error("Failed to fetch attendance history");
        } finally {
            setLoading(false);
        }
    };

    // Dynamic Calculations
    const stats = useMemo(() => {
        const total = logs.length;
        const present = logs.filter(l => l.status === "present").length;
        const absent = logs.filter(l => l.status === "absent").length;
        const late = logs.filter(l => l.status === "late").length;
        const percentage = total > 0 ? ((present + late) / total * 100).toFixed(1) : 0;

        return { total, present, absent, late, percentage };
    }, [logs]);

    // get styles for status
    const getStatusStyles = (status) => {
        switch (status?.toLowerCase()) {
            case "present": return "text-emerald-600 bg-emerald-50 border-emerald-100";
            case "absent": return "text-rose-600 bg-rose-50 border-rose-100";
            case "late": return "text-amber-600 bg-amber-50 border-amber-100";
            default: return "text-slate-600 bg-slate-50";
        }
    };

    // loading
    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Syncing Records...</p>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* TOP SUMMARY CARDS */}
            <SummaryCards
                stats={stats}
            />

            {/* ALERT BOX */}
            <AlertBox
                stats={stats}
            />

            {/* ATTENDACE LIST */}
            <AttendanceList
                logs={logs}
                getStatusStyles={getStatusStyles}
            />
        </div>
    );
}