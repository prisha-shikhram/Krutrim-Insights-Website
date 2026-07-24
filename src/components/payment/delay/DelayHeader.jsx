// import icons
import { UserCheck, Search } from "lucide-react";

// delay header component
export default function DelayHeader({ searchQuery, setSearchQuery, filteredRecords, setActiveFilter, activeFilter }) {
    return (
        <div className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Search Bar Input */}
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                    <input
                        type="text"
                        placeholder="Search delayed accounts by name or email..."
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
                    <UserCheck size={14} className="text-amber-500" /> Exceptions Flagged: {filteredRecords.length}
                </div>
            </div>

            {/* Aging Duration Filter Group Bar */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-2">Delay Buckets:</span>
                {[
                    { id: "all", label: "All Delays" },
                    { id: "1-7", label: "1-7 Days" },
                    { id: "8-15", label: "8-15 Days" },
                    { id: "15-30", label: "15-30 Days" },
                    { id: "30+", label: "30+ Days Overdue" }
                ].map(bucket => (
                    <button
                        key={bucket.id}
                        onClick={() => setActiveFilter(bucket.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer 
                            ${activeFilter === bucket.id
                                ? "bg-[#0189c7] border-[#0189c7] text-white shadow-md shadow-blue-500/10"
                                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        {bucket.label}
                    </button>
                ))}
            </div>
        </div>
    )
}