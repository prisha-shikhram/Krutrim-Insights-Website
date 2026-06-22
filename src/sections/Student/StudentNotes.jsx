// import hooks
import { useState, useEffect } from "react";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import icons
import { Loader2, FileText } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// api url
const NOTES_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/notes";

// import components
import StudentNotesHeader from "../../components/student/notes/StudentNotesHeader";
import StudentNotesItem from "../../components/student/notes/StudentNotesItem";

// student notes component
export default function StudentNotes() {
    const { student } = useOutletContext();
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchNotes();
    }, [student?.email]);

    // fetch notes
    const fetchNotes = async () => {
        if (!student?.email) return;
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                email: student.email.toLowerCase(),
                type: "notes",
                batch: (student.batchCode || "").trim()
            });

            const res = await fetch(`${NOTES_API}?${queryParams.toString()}`);
            const data = await res.json();

            const rawItems = Array.isArray(data) ? data : (data.Items || []);

            // Sort by creation date descending (latest notes first)
            const processedNotes = rawItems.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));

            setNotes(processedNotes);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load study notes");
        } finally {
            setLoading(false);
        }
    };

    // Format dates cleanly
    const formatDate = (dateString) => {
        if (!dateString) return "Recent";
        return new Date(dateString).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    };

    // loading state
    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Syncing Study Notes...</p>
        </div>
    );

    return (
        <div className="space-y-6 w-full animate-in fade-in duration-500">
            {/* Notes header */}
            <StudentNotesHeader />

            {/* NOTES CONTAINER */}
            {notes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 bg-white border border-dashed border-slate-200 rounded-xl w-full">
                    <FileText className="text-slate-300 mb-3" size={36} />
                    <p className="text-sm font-medium text-slate-500">No study materials published for this class module yet.</p>
                </div>
            ) : (
                <div className="flex flex-col gap-4 w-full">
                    {notes.map((note, idx) => (
                        <StudentNotesItem
                            key={idx}
                            note={note}
                            formatDate={formatDate}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}