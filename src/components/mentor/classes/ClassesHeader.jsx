// import icons
import { Video, Plus } from "lucide-react";

// header component
export default function Classesheader({ setShowCreateModal }) {
    return (
        <div
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 md:p-8 rounded-2xl 
            border border-slate-200/80 shadow-xs"
        >
            <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                    <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                        <Video size={22} />
                    </div>

                    <h1 className="text-xl md:text-2xl font-bold text-slate-800 tracking-tight">
                        Mentor Classes
                    </h1>
                </div>

                <p className="text-xs text-slate-500 font-medium pl-11">
                    Log class topics, view class counts, and check auto-calculated attendance ratios.
                </p>
            </div>

            <button
                type="button"
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 
                text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer shrink-0"
            >
                <Plus size={16} />
                <span>Add Class Entry</span>
            </button>
        </div>
    )
}