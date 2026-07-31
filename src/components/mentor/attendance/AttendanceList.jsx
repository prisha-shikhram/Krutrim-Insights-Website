// import hooks
import { useState, useMemo } from "react";

// import icons
import { Loader2, CalendarCheck, ExternalLink } from "lucide-react";

// import AttendanceDetail component
import AttendanceDetail from "./AttendenceDetail";

// attendance list component
export default function AttendanceList({ loading, attendanceHistory }) {
    // Local state to track selected student (null = show table view)
    const [selectedStudentEmail, setSelectedStudentEmail] = useState(null);

    // Group logs per student and compute stats
    const aggregatedStudents = useMemo(() => {
        if (!attendanceHistory || attendanceHistory.length === 0) return [];

        const studentMap = {};

        attendanceHistory.forEach((rec) => {
            const key = rec.studentEmail;

            if (!studentMap[key]) {
                studentMap[key] = {
                    studentEmail: rec.studentEmail,
                    batchCode: rec.batchCode,
                    latestDate: rec.date,
                    totalPresents: 0,
                    totalAbsents: 0,
                    totalDays: 0,
                    logs: []
                };
            }

            studentMap[key].logs.push(rec);
            studentMap[key].totalDays += 1;

            if (rec.status === "present") {
                studentMap[key].totalPresents += 1;
            } else {
                studentMap[key].totalAbsents += 1;
            }
        });

        return Object.values(studentMap).map((student) => {
            const sortedLogs = [...student.logs].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );

            return {
                ...student,
                latestDate: sortedLogs[0]?.date || student.latestDate,
                logs: sortedLogs
            };
        });
    }, [attendanceHistory]);

    // If a student is selected, render AttendanceDetail view
    if (selectedStudentEmail) {
        return (
            <AttendanceDetail
                studentEmail={selectedStudentEmail}
                attendanceHistory={attendanceHistory}
                onBack={() => setSelectedStudentEmail(null)}
            />
        );
    }

    return (
        <>
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-indigo-600" size={40} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        Loading Records...
                    </p>
                </div>
            ) : aggregatedStudents.length === 0 ? (
                <div className="bg-white border border-slate-100 rounded-[3rem] p-20 text-center shadow-sm">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-200">
                        <CalendarCheck size={40} />
                    </div>

                    <h3 className="text-slate-800 font-black text-xl">No logs found</h3>
                    <p className="text-slate-400 text-sm mt-2">Start by creating a new attendance entry.</p>
                </div>
            ) : (
                <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm shadow-slate-100">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                        Student Details
                                    </th>

                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                        Recent Marked Date
                                    </th>

                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">
                                        Batch Code
                                    </th>

                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                                        Presents / Total
                                    </th>

                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">
                                        Total Absents
                                    </th>

                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-right">
                                        Logs
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-50">
                                {aggregatedStudents.map((student) => (
                                    <tr
                                        key={student.studentEmail}
                                        className="hover:bg-slate-50/30 transition-colors"
                                    >
                                        {/* STUDENT DETAILS */}
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center 
                                                    justify-center text-indigo-600 font-black text-xs uppercase"
                                                >
                                                    {student.studentEmail[0]}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 leading-none">
                                                        {student.studentEmail.split("@")[0]}
                                                    </p>

                                                    <p className="text-[12px] text-slate-400 mt-1">
                                                        {student.studentEmail}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* RECENT MARKED DATE */}
                                        <td className="p-6 text-[12px] font-bold text-slate-600">
                                            {student.latestDate}
                                        </td>

                                        {/* BATCH CODE */}
                                        <td className="p-6">
                                            <span className="text-[11px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg uppercase">
                                                {student.batchCode}
                                            </span>
                                        </td>

                                        {/* PRESENTS / TOTAL DAYS */}
                                        <td className="p-6 text-center">
                                            <span
                                                className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-emerald-50 
                                                text-emerald-700 px-3 py-1 rounded-full border border-emerald-100"
                                            >
                                                {student.totalPresents} / {student.totalDays} Days
                                            </span>
                                        </td>

                                        {/* ABSENT COUNT */}
                                        <td className="p-6 text-center">
                                            <span
                                                className="inline-flex items-center gap-1.5 text-xs font-extrabold bg-rose-50 
                                                text-rose-600 px-3 py-1 rounded-full border border-rose-100"
                                            >
                                                {student.totalAbsents} Absents
                                            </span>
                                        </td>

                                        {/* ICON-ONLY BUTTON TO OPEN DETAIL */}
                                        <td className="p-6 text-right">
                                            <button
                                                onClick={() => setSelectedStudentEmail(student.studentEmail)}
                                                className="p-2.5 rounded-xl text-slate-500 bg-slate-100 hover:bg-indigo-600 
                                                hover:text-white transition-all cursor-pointer inline-flex items-center justify-center"
                                                title="View Student Attendance Logs"
                                            >
                                                <ExternalLink size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    );
}