// import icons
import { LayoutGrid, CheckCircle } from "lucide-react"

// stats component
export default function Stats({ stats, projects }) {
    return (
        <div className="flex gap-4 mb-8">
            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
                    <LayoutGrid size={20} />
                </div>

                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Assigned</p>
                    <h4 className="text-lg font-black text-slate-800">{String(projects.length).padStart(2, '0')}</h4>
                </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} />
                </div>

                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Completed</p>
                    <h4 className="text-lg font-black text-slate-800">{String(stats.completed).padStart(2, '0')}</h4>
                </div>
            </div>
        </div>
    )
}