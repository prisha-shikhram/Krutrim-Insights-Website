// import icons
import { Search } from "lucide-react";

// payment filter component
export default function PaymentFilter({ searchQuery, setSearchQuery, selectedTypeFilter, setSelectedTypeFilter }) {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 w-full max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                    type="text"
                    placeholder="Search by Admin, Action, Log ID, or Description..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-800 
                    placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                />
            </div>

            {/* Type Filter Buttons */}
            <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                {["ALL", "SUCCESS", "WARNING", "INFO", "ERROR"].map((type) => (
                    <button
                        key={type}
                        onClick={() => setSelectedTypeFilter(type)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all uppercase tracking-wider cursor-pointer shrink-0 
                            ${selectedTypeFilter === type
                                ? "bg-[#0189c7] text-white shadow-sm"
                                : "bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100"
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>
        </div>
    )
}