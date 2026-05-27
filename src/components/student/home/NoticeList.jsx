// import icons
import { CircleDot } from "lucide-react"

// notice list component
export default function NoticeList({ dashboardData, navigate }) {
    return (
        <div className="bg-white/40 backdrop-blur-xl rounded-[40px] p-10 border border-white shadow-sm flex flex-col">
            <h3 className="text-xl font-black text-slate-800 mb-8">Latest Notices</h3>

            <div className="space-y-8 flex-1">
                {dashboardData.notices.map((notice, i) => (
                    <div
                        key={i}
                        className="relative pl-6"
                    >
                        <CircleDot size={12} className={`absolute left-0 top-1 ${i === 0 ? 'text-blue-500' : 'text-slate-300'}`} />
                        <p className="text-[10px] text-blue-600/50 font-black uppercase tracking-widest mb-1">{notice.noticetype || 'Update'}</p>
                        <p className="text-sm font-bold text-slate-700 leading-snug line-clamp-2">{notice.title}</p>
                    </div>
                ))}
            </div>

            <button
                onClick={() => navigate('/student/dashboard/notices')}
                className="w-full mt-10 py-4 bg-white border border-slate-100 rounded-3xl font-black text-[10px] uppercase tracking-widest 
                text-slate-400 hover:text-blue-600 transition-all cursor-pointer"
            >
                View All
            </button>
        </div>
    )
}