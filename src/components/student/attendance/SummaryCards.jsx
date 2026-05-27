// import icons
import { TrendingUp, CheckCircle2, XCircle } from "lucide-react"

// summary cards component
export default function SummaryCards({ stats }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                        <TrendingUp size={24} />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Attendance Rate</p>
                        <h3 className="text-2xl font-black text-slate-800">{stats.percentage}%</h3>
                    </div>
                </div>

                <div className="mt-4 w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                        className={`h-full rounded-full transition-all duration-1000 ${stats.percentage < 75 ? 'bg-rose-500' : 'bg-indigo-600'}`}
                        style={{ width: `${stats.percentage}%` }}
                    />
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 size={24} />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Days Present</p>
                        <h3 className="text-2xl font-black text-slate-800">{stats.present} / {stats.total}</h3>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center">
                        <XCircle size={24} />
                    </div>

                    <div>
                        <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Absences</p>
                        <h3 className="text-2xl font-black text-slate-800">{stats.absent} Days</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}