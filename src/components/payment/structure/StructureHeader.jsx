// import icons
import { ArrowLeft } from "lucide-react";

// structure header component
export default function StructureHeader({ student, onBack }) {
    return (
        <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#0189c7] bg-blue-50 px-2.5 py-1 rounded-md">
                    {student.course}
                </span>

                <h2 className="text-xl font-black text-slate-900 tracking-tight mt-2">
                    Configure Payment Structure: {student.name}
                </h2>

                <p className="text-slate-400 text-xs font-medium">{student.email}</p>
            </div>

            {onBack && (
                <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all 
                    hover:bg-slate-50 cursor-pointer self-start sm:self-auto text-slate-600"
                >
                    <ArrowLeft size={14} /> Back to Module
                </button>
            )}
        </div>
    )
}