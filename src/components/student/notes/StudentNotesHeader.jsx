// import icons
import { BookOpen } from "lucide-react";

// Student notes header component
export default function StudentNotesHeader() {
    return (
        <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-xs flex flex-row items-center gap-4 w-full">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-lg shrink-0">
                <BookOpen size={24} />
            </div>

            <div>
                <h2 className="text-xl font-bold text-slate-800">Class Notes & Handouts</h2>
                <p className="text-xs text-slate-500 mt-0.5">Access verified textbook modules, slide decks, and reference sheets assigned to your batch.</p>
            </div>
        </div>
    )
}