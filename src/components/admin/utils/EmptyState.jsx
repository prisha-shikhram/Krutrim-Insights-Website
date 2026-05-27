// import icons
import { Search } from "lucide-react"

// empty state component
export default function EmptyState({ message }) {
    return (
        <div className="py-20 text-center animate-in fade-in zoom-in-95">
            <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <Search size={32} className="text-slate-200" />
            </div>

            <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{message}</p>
        </div>
    )
}