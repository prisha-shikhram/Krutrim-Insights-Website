// import usememo
import { useMemo } from "react";

// import icons
import { ArrowLeft, CheckCircle2, XCircle, Calendar } from "lucide-react";

// attendance detail page
export default function AttendanceDetail({ studentEmail, attendanceHistory, onBack }) {
    const decodedEmail = decodeURIComponent(studentEmail || "");

    // Filter and compute stats specifically for this student
    const studentData = useMemo(() => {
        if (!attendanceHistory || !decodedEmail) return null;

        const studentLogs = attendanceHistory
            .filter((rec) => rec.studentEmail.toLowerCase() === decodedEmail.toLowerCase())
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

        if (studentLogs.length === 0) return null;

        let totalPresents = 0;
        let totalAbsents = 0;

        studentLogs.forEach((rec) => {
            if (rec.status === "present") totalPresents++;
            else totalAbsents++;
        });

        return {
            studentEmail: studentLogs[0].studentEmail,
            batchCode: studentLogs[0].batchCode,
            totalDays: studentLogs.length,
            totalPresents,
            totalAbsents,
            logs: studentLogs
        };
    }, [attendanceHistory, decodedEmail]);

    // if attendance is not present
    if (!studentData) {
        return (
            <div className="w-full p-8 text-center">
                <p className="text-slate-500 font-bold mb-4">No attendance records found for this student.</p>
                <button
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl cursor-pointer"
                >
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        );
    }

    // stat cards
    const statCards = [
        {
            label: "Total Days",
            value: studentData.totalDays,
            icon: <Calendar size={22} />,
            bg: "bg-slate-50",
            textColor: "text-slate-600",
            valueColor: "text-slate-800"
        },
        {
            label: "Presents",
            value: studentData.totalPresents,
            icon: <CheckCircle2 size={22} />,
            bg: "bg-emerald-50",
            textColor: "text-emerald-600",
            valueColor: "text-emerald-600"
        },
        {
            label: "Absents",
            value: studentData.totalAbsents,
            icon: <XCircle size={22} />,
            bg: "bg-rose-50",
            textColor: "text-rose-600",
            valueColor: "text-rose-600"
        }
    ];

    return (
        <div className="w-full space-y-8">
            {/* BACK BUTTON & HEADER */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={onBack}
                        className="p-3 bg-white border border-slate-200 text-slate-600 rounded-2xl hover:bg-slate-100 transition-all cursor-pointer shadow-sm"
                    >
                        <ArrowLeft size={20} />
                    </button>

                    <div>
                        <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                            {studentData.studentEmail.split("@")[0]}
                        </h1>

                        <p className="text-xs font-bold text-slate-400 mt-0.5">
                            {studentData.studentEmail} • <span className="text-indigo-600">{studentData.batchCode}</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* OVERVIEW STATS CARDS */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {statCards.map((stat, idx) => (
                    <div
                        key={idx}
                        className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-2xl ${stat.bg} ${stat.textColor}`}>
                            {stat.icon}
                        </div>

                        <div>
                            <p className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                {stat.label}
                            </p>

                            <p className={`text-xl font-black mt-0.5 ${stat.valueColor}`}>
                                {stat.value}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* DAY-WISE LOGS TABLE PAGE SECTION */}
            <div className="bg-white border border-slate-100 rounded-3xl p-8 shadow-sm">
                <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-6">
                    Day-Wise Attendance History
                </h3>

                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/80 border-b border-slate-100">
                                <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                    Date
                                </th>

                                <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                    Batch Code
                                </th>

                                <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-wider">
                                    Marked By
                                </th>

                                <th className="p-4 text-[10px] font-black uppercase text-slate-400 tracking-wider text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-100">
                            {studentData.logs.map((log, idx) => (
                                <tr key={log.attendanceId || idx} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="p-4 text-xs font-bold text-slate-700">
                                        {log.date}
                                    </td>

                                    <td className="p-4 text-xs font-bold text-slate-500">
                                        <span className="bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase">
                                            {log.batchCode}
                                        </span>
                                    </td>

                                    <td className="p-4 text-xs text-slate-500">
                                        {log.markedBy || "System"}
                                    </td>

                                    <td className="p-4 text-center">
                                        {log.status === "present" ? (
                                            <span
                                                className="inline-flex items-center gap-1.5 text-[10px] font-extrabold bg-emerald-50 
                                                text-emerald-600 px-3 py-1 rounded-full border border-emerald-100 uppercase"
                                            >
                                                <CheckCircle2 size={12} /> Present
                                            </span>
                                        ) : (
                                            <span
                                                className="inline-flex items-center gap-1.5 text-[10px] font-extrabold bg-rose-50 
                                                text-rose-600 px-3 py-1 rounded-full border border-rose-100 uppercase"
                                            >
                                                <XCircle size={12} /> Absent
                                            </span>
                                        )}
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