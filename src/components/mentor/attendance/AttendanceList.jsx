// import icons
import { Loader2, CalendarCheck } from "lucide-react"

// attendance list component
export default function AttendanceList({ loading, attendanceHistory }) {
    return (
        <>
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                    <Loader2 className="animate-spin text-indigo-600" size={40} />
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading Records...</p>
                </div>
            ) : attendanceHistory.length === 0 ? (
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
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Student Details</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Marked Date</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest">Batch Code</th>
                                    <th className="p-6 text-[10px] font-black uppercase text-slate-400 tracking-widest text-center">Status</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-slate-50">
                                {attendanceHistory.map((rec) => (
                                    <tr
                                        key={rec.attendanceId}
                                        className="hover:bg-slate-50/30 transition-colors"
                                    >
                                        <td className="p-6">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-500 
                                                    font-black text-[10px] uppercase"
                                                >
                                                    {rec.studentEmail[0]}
                                                </div>

                                                <div>
                                                    <p className="text-xs font-bold text-slate-700 leading-none">{rec.studentEmail.split('@')[0]}</p>
                                                    <p className="text-[10px] text-slate-400 mt-1">{rec.studentEmail}</p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-6 text-[11px] font-bold text-slate-600">{rec.date}</td>

                                        <td className="p-6">
                                            <span className="text-[10px] font-black bg-indigo-50 text-indigo-500 px-3 py-1 rounded-lg uppercase">
                                                {rec.batchCode}
                                            </span>
                                        </td>

                                        <td className="p-6">
                                            <div className="flex justify-center">
                                                <span
                                                    className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter 
                                                    ${rec.status === 'present' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'}`}
                                                >
                                                    {rec.status}
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </>
    )
}