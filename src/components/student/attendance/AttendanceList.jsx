// import icons
import { Clock, Calendar as CalendarIcon } from "lucide-react";

// attendance list component
export default function AttendanceList({ logs, getStatusStyles }) {
    return (
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="px-8 py-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-xl font-black text-slate-800">Session Logs</h3>

                <div className="flex items-center gap-2 text-slate-400 text-sm font-bold uppercase text-[10px] tracking-widest">
                    <CalendarIcon size={14} />

                    <span>Last Updated: {logs[0] ? new Date(logs[0].updatedAt).toLocaleDateString() : 'N/A'}</span>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Date</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Batch Code</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Marked Time</th>
                            <th className="px-8 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-50">
                        {logs.map((log) => (
                            <tr
                                key={log.attendanceId}
                                className="hover:bg-slate-50/50 transition-colors"
                            >
                                <td className="px-8 py-5 text-sm font-bold text-slate-700">{log.date}</td>

                                <td className="px-8 py-5">
                                    <span className="text-[10px] font-black bg-indigo-50 text-indigo-600 px-3 py-1 rounded-lg uppercase tracking-wider">
                                        {log.batchCode}
                                    </span>
                                </td>

                                <td className="px-8 py-5 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <Clock size={14} className="text-slate-300" />
                                        {new Date(log.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </td>

                                <td className="px-8 py-5">
                                    <div className="flex justify-center">
                                        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border tracking-tighter 
                                            ${getStatusStyles(log.status)}`}
                                        >
                                            {log.status}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {logs.length === 0 && (
                    <div className="py-20 text-center text-slate-400">
                        <p className="text-xs font-bold uppercase tracking-widest">No attendance records found</p>
                    </div>
                )}
            </div>
        </div>
    )
}