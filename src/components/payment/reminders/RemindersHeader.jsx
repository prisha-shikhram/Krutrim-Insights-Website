// import icons
import { Search, Bell } from "lucide-react"

// reminders header component
export default function RemindersHeader({ searchQuery, setSearchQuery, filteredReminders }) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                    type="text"
                    placeholder="Search student notification targets..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 
                    placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                />
            </div>

            <div
                className="flex items-center gap-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider px-3 py-1.5 
                bg-slate-50 rounded-lg border border-slate-100 self-start md:self-auto"
            >
                <Bell size={14} className="text-[#0189c7]" /> Active Targets: {filteredReminders.length}
            </div>
        </div>
    )
}