// import icons
import { Bell, Plus } from "lucide-react"

// notice header
export default function NoticeHeader({ setShowModal }) {
    return (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-5">
                <div className="p-3.5 bg-indigo-50 text-indigo-600 rounded-full">
                    <Bell size={22} />
                </div>

                <div className="space-y-0.5">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Notice Board</h2>
                    <p className="text-xs text-slate-400 font-medium">Broadcast updates to all students</p>
                </div>
            </div>

            <button
                onClick={() => setShowModal(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-7 py-3 rounded-2xl font-bold text-sm cursor-pointer 
                hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
            >
                <Plus size={18} /> New Announcement
            </button>
        </div>
    )
}