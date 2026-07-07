// import icons
import { Search, ChevronDown } from "lucide-react";

// filter bar component for activity logs
export default function FilterBar({ searchTerm, setSearchTerm, setFilterType }) {
    return (
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col md:flex-row gap-2">
            <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />

                <input
                    type="text"
                    placeholder="Search by admin name or specific action..."
                    className="w-full pl-12 pr-4 py-3 bg-slate-50/50 border border-transparent rounded-xl text-sm focus:bg-white 
                    focus:border-[#0189c7] transition-all outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="relative inline-block group">
                <select
                    className="px-4 py-3 rounded-xl text-sm font-bold text-slate-500 outline-none cursor-pointer focus:bg-white 
                    focus:border-[#0189c7] appearance-none bg-slate-50 border border-slate-100"
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    <option value="all">All Events</option>
                    <option value="security">Security</option>
                    <option value="system">System Updates</option>
                    <option value="data">Interactions</option>
                    <option value="view">Navigation</option>
                </select>

                <ChevronDown
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none transition-transform
                    duration-300 group-hover:rotate-180"
                    size={16}
                />
            </div>
        </div>
    )
}