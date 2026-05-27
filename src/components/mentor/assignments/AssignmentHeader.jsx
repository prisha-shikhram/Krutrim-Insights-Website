// import icons
import { Plus } from "lucide-react"

// assignment header components
export default function AssignmentHeader({ setShowCreate }) {
    return (
        <div className="flex items-center justify-between bg-white px-8 py-6 rounded-4xl border border-slate-100 shadow-sm">
            <div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Assignment Lab</h2>
                <p className="text-xs text-slate-400 font-medium">Create and distribute tasks to your batches</p>
            </div>

            <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 
                transition-all shadow-lg shadow-indigo-100 cursor-pointer"
            >
                <Plus size={18} /> New Assignment
            </button>
        </div>
    )
}