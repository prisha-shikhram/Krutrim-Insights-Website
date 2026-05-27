// import icons
import { Bell, Plus } from "lucide-react"

// notice header component
export default function NoticeHeader({ setShowModal, user }) {
    return (
        <div className="flex items-center justify-between bg-white px-8 py-5 rounded-2xl border border-slate-100 shadow-sm">
            <div className="flex items-center gap-5">
                <div className="p-3.5 bg-blue-50/50 text-[#0189c7] rounded-full">
                    <Bell size={22} />
                </div>

                <div className="space-y-0.5">
                    <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Notice Board</h2>
                    <p className="text-xs text-slate-400 font-medium">Official announcements and updates</p>
                </div>
            </div>

            {!user.isSuper && (
                <button
                    onClick={() => setShowModal(true)}
                    className="flex items-center gap-2 bg-[#0189c7] text-white px-7 py-3 rounded-2xl font-bold text-sm cursor-pointer 
                    hover:bg-[#0178ae] transition-all shadow-lg shadow-blue-100"
                >
                    <Plus size={18} /> Create Notice
                </button>
            )}
        </div>
    )
}