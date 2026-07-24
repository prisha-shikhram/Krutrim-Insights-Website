// import icons
import { Search, GraduationCap } from "lucide-react"

// payment module header
export default function PaymentModuleHeader({ searchQuery, setSearchQuery, filteredStudents }) {
    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                    type="text"
                    placeholder="Search student records, courses, or system schemas..."
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
                <GraduationCap size={14} /> Total Records: {filteredStudents.length}
            </div>
        </div>
    )
}