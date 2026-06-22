// import icons
import { FileText, ExternalLink, Calendar } from "lucide-react";

// student notes item component
export default function StudentNotesItem({ note, formatDate }) {
    return (
        <div
            key={note.notesId || note.id}
            className="bg-white border border-slate-100 rounded-xl p-5 shadow-xs flex flex-col md:flex-row md:items-center 
            justify-between transition hover:border-indigo-100 hover:shadow-xs group w-full gap-4"
        >
            {/* Left Side: Meta Description Panel */}
            <div className="flex items-start gap-4 flex-1">
                <div
                    className="p-3 bg-slate-50 text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-500 
                    transition rounded-xl shrink-0 mt-0.5"
                >
                    <FileText size={22} />
                </div>

                <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-bold text-slate-800 text-base leading-snug">
                            {note.title}
                        </h3>

                        <span
                            className="text-[10px] font-semibold tracking-wider uppercase bg-slate-100 text-slate-600 px-2 py-0.5 
                            rounded-md border border-slate-200/40"
                        >
                            {note.subject || "Reference"}
                        </span>
                    </div>

                    <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
                        Simply open the file to access notes
                    </p>

                    {/* Upload Date Info */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400 pt-0.5 font-medium">
                        <Calendar size={13} />
                        <span>Posted on {formatDate(note.createdAt)}</span>
                    </div>
                </div>
            </div>

            {/* Right Side: Primary Execution Trigger Button */}
            <div className="shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-slate-100 flex justify-end">
                <a
                    href={note.pdfUrl || note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-xs font-semibold bg-slate-900 hover:bg-slate-800 
                    text-white group-hover:bg-indigo-600 group-hover:hover:bg-indigo-700 px-4 py-2.5 rounded-lg shadow-xs 
                    transition-all w-full md:w-auto cursor-pointer"
                >
                    <span>View PDF</span>
                    <ExternalLink size={14} />
                </a>
            </div>
        </div>
    )
}