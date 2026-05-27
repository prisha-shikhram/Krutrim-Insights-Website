// import icons
import { Plus } from "lucide-react";

// projects header component
export default function ProjectsHeader({ setShowCreate }) {
    return (
        <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Project Lab</h2>
                <p className="text-xs text-slate-400 font-medium">Manage and assign industry projects</p>
            </div>

            <button
                onClick={() => setShowCreate(true)}
                className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-700 
                transition-all shadow-lg cursor-pointer"
            >
                <Plus size={18} /> New Project
            </button>
        </div>
    )
}