// import icons
import { Bell, CircleDot } from "lucide-react"

// new notices component
export default function NewNotices() {
    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white shadow-sm flex flex-col">
            <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Bell size={18} />
                </div>

                <h3 className="text-xl font-black text-slate-800">Notices</h3>
            </div>

            <div className="space-y-8 flex-1">
                <div className="relative pl-6">
                    <CircleDot size={12} className="absolute left-0 top-1 text-blue-500" />
                    <p className="text-[10px] text-blue-600/50 font-black uppercase tracking-widest mb-1">Campus News</p>
                    <p className="text-sm font-bold text-slate-700 leading-snug">Final project submission deadline extended to Dec 15th.</p>
                </div>

                <div className="relative pl-6">
                    <CircleDot size={12} className="absolute left-0 top-1 text-slate-300" />
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1">Workshop</p>
                    <p className="text-sm font-bold text-slate-700 leading-snug">Guest lecture on AI/ML by Google Engineers this Friday.</p>
                </div>
            </div>

            <button
                className="w-full mt-10 py-4 bg-white border border-slate-100 rounded-3xl font-black text-[10px] uppercase 
                tracking-[0.2em] text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shadow-sm"
            >
                View All Notices
            </button>
        </div>
    )
}