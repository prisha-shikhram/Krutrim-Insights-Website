// import icons
import { Search } from "lucide-react";

// notice header component
export default function NoticeHeader({ searchTerm, setSearchTerm }) {
    return (
        <div className="relative w-full md:max-w-md group">
            <Search
                className="absolute left-5 top-1/2 -translate-y-1/2 z-20 text-slate-400 group-focus-within:text-indigo-500 transition-colors"
                size={18}
            />

            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search notices..."
                className="w-full bg-white/60 backdrop-blur-sm border border-white py-4 pl-14 pr-6 rounded-3xl outline-none 
                focus:bg-white focus:border-indigo-100 transition-all text-sm shadow-sm font-medium"
            />
        </div>
    )
}