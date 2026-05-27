// import icons
import { Calendar } from "lucide-react";

// import components
import Section from "../enroll/Section";

// Attendance History component
export default function AttendanceHistory({ portalData, fmt }) {
    return (
        <Section
            title="Attendance Logs"
            icon={<Calendar size={16} />}
        >
            <div className="col-span-full max-h-60 overflow-y-auto space-y-2 pr-2">
                {portalData.attendance.length > 0 ? portalData.attendance.map((att, idx) => (
                    <div
                        key={idx}
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100"
                    >
                        <span className="text-xs font-bold text-slate-600">{fmt(att.date)}</span>

                        <span
                            className={`text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg 
                            ${att.status?.toLowerCase() === 'present' ? 'bg-emerald-100 text-emerald-600' : 'bg-red-100 text-red-600'}`}
                        >
                            {att.status}
                        </span>
                    </div>
                )) : <p className="text-xs text-slate-400 italic">No attendance records found.</p>}
            </div>
        </Section>
    )
}