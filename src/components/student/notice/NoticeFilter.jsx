// import icons
import { Filter, ChevronDown } from "lucide-react"

// notice filter component
export default function NoticeFilter({ filterType, setFilterType }) {
    return (
        <div className="relative group cursor-pointer">
            <div
                className="flex items-center justify-between gap-4 px-6 py-4 bg-white/60 backdrop-blur-sm border border-white rounded-3xl 
                shadow-sm hover:bg-white transition-all min-w-45"
            >
                <div className="flex items-center gap-3">
                    <Filter size={16} className="text-indigo-500" />

                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
                        {filterType === "ALL" ? "All Notices" : filterType}
                    </span>
                </div>

                <ChevronDown size={14} className="text-slate-400 group-hover:text-indigo-500 transition-colors" />

                {/* Hidden Select overlaying the div */}
                <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                >
                    <option value="ALL">All Notices</option>
                    <option value="URGENT">Urgent</option>
                    <option value="GENERAL">General</option>
                    <option value="EVENT">Event</option>
                    <option value="OTHER">Other</option>
                </select>
            </div>
        </div>
    )
}