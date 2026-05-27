// import icons
import { Clock, CheckCircle } from "lucide-react"

// Assignment Stats component
export default function AssignmentStats() {
    return (
        <div className="flex gap-4 mb-8">
            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                    <Clock size={20} />
                </div>

                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Pending</p>
                    <h4 className="text-lg font-black text-slate-800">02</h4>
                </div>
            </div>

            <div className="bg-white px-6 py-4 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} />
                </div>

                <div>
                    <p className="text-[10px] font-black uppercase text-slate-400">Completed</p>
                    <h4 className="text-lg font-black text-slate-800">01</h4>
                </div>
            </div>
        </div>
    )
}