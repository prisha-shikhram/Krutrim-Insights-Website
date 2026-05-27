// import icons
import { GraduationCap } from "lucide-react"

// student header component
export default function StudentHeader({ data, avatarColor, initials }) {
    return (
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8 flex flex-col sm:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
                <GraduationCap size={120} />
            </div>

            {data.profileImg ? (
                <img
                    src={data.profileImg}
                    alt="Profile"
                    className="w-24 h-24 rounded-3xl object-cover shadow-xl border-4 border-white ring-1 ring-slate-100"
                />
            ) : (
                <div
                    className={`w-24 h-24 rounded-3xl bg-linear-to-br 
                    ${avatarColor(data.studentId)} flex items-center justify-center text-3xl font-black text-white shadow-xl`}
                >
                    {initials(data.fullName)}
                </div>
            )}

            <div className="flex-1 text-center sm:text-left z-10">
                <h2 className="text-2xl font-black text-slate-800">{data.fullName}</h2>
                <p className="text-sm text-slate-400 font-mono tracking-tighter">{data.studentId}</p>

                <div className="flex flex-wrap justify-center sm:justify-start gap-2 mt-4">
                    <span
                        className="text-[10px] font-black px-4 py-1.5 rounded-xl border bg-blue-50 text-blue-600 border-blue-100 uppercase 
                        tracking-widest"
                    >
                        {data.batchCode}
                    </span>

                    <span
                        className="text-[10px] font-black px-4 py-1.5 rounded-xl border bg-emerald-50 text-emerald-600 border-emerald-100 
                        uppercase tracking-widest"
                    >
                        {data.status}
                    </span>

                    <span
                        className="text-[10px] font-black px-4 py-1.5 rounded-xl border bg-slate-50 text-slate-500 border-slate-100 uppercase 
                        tracking-widest"
                    >
                        {data.gender}
                    </span>
                </div>
            </div>
        </div>
    )
}