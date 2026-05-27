// import icons
import { Plus } from "lucide-react"

// batch header component
export default function BatchHeader({ setShowCreateModal, batches }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-8 rounded-4xl border border-slate-100 shadow-sm gap-4">
            <div className="text-center md:text-left">
                <h2 className="text-3xl font-black text-slate-800 tracking-tight">Batch Management</h2>

                <div className="flex items-center gap-2 mt-1 justify-center md:justify-start">
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <p className="text-xs text-slate-400 font-bold uppercase">System Online • {batches.length} Batches</p>
                </div>
            </div>

            <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-bold text-sm hover:bg-blue-700 
                hover:shadow-blue-200 hover:shadow-lg transition-all active:scale-95 cursor-pointer"
            >
                <Plus size={18} strokeWidth={3} /> Create New Batch
            </button>
        </div>
    )
}