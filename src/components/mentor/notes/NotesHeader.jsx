// import icons
import { Plus } from "lucide-react";

// Notes header component
export default function NotesHeader({ setShowCreate }) {
    return (
        <div className="flex items-center justify-between bg-white px-8 py-6 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <div>
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Study Notes</h2>
                <p className="text-xs text-slate-400 font-medium">Upload and manage learning resources for student batches</p>
            </div>

            <button
                onClick={() => setShowCreate(true)}
                className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl 
                font-bold transition-all shadow-lg shadow-indigo-100 cursor-pointer"
            >
                <Plus size={20} />
                Upload New Notes
            </button>
        </div>
    );
}