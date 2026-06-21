// import hooks
import { useState, useEffect } from "react";

// import icons
import { Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import components
import NotesHeader from "../../components/mentor/notes/NotesHeader";
import NotesList from "../../components/mentor/notes/NotesList";
import CreateNotesModal from "../../components/mentor/notes/CreateNotesModal";
import ShareNotesModal from "../../components/mentor/notes/ShareNotesModal";

// api urls
const NOTES_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/notes";
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";

// mentor notes page
export default function MentorNotes() {
    const { mentor } = useOutletContext();
    const [notes, setNotes] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showCreate, setShowCreate] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [activeNotes, setActiveNotes] = useState(null);

    // mentor to the dependency array
    useEffect(() => {
        if (mentor && mentor.email) {
            fetchInitialData();
        }
    }, [mentor]); // Runs whenever mentor data becomes available

    // fetch data
    const fetchInitialData = async () => {
        if (!mentor || !mentor.email) return;

        setLoading(true);
        try {
            // 1. Fetch Batches
            const batchRes = await fetch(BATCH_API);
            const batchData = await batchRes.json();

            const actualBatches = Array.isArray(batchData)
                ? batchData
                : (batchData.Items || []);

            setBatches(actualBatches);

            // 2. Fetch Notes
            const notesRes = await fetch(NOTES_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "listNotes", // Updated action code block mapping
                    createdBy: mentor.email
                })
            });

            const notesData = await notesRes.json();
            const actualNotes = Array.isArray(notesData)
                ? notesData
                : (notesData.Items || []);

            setNotes(actualNotes);

        } catch (err) {
            console.error(err);
            toast.error("Failed to sync study materials library");
        } finally {
            setLoading(false);
        }
    };

    // handle share modal open
    const handleOpenShare = (targetNotes) => {
        setActiveNotes(targetNotes);
        setShowShare(true);
    };

    return (
        <div className="space-y-8 py-6">
            {/* HEADER */}
            <NotesHeader
                setShowCreate={setShowCreate}
            />

            {/* NOTES LIST */}
            <NotesList
                loading={loading}
                notes={notes}
                handleOpenShare={handleOpenShare}
            />

            {/* MODALS */}
            {showCreate && (
                <CreateNotesModal
                    onClose={() => setShowCreate(false)}
                    refresh={fetchInitialData}
                    mentor={mentor}
                />
            )}

            {showShare && (
                <ShareNotesModal
                    onClose={() => setShowShare(false)}
                    notes={activeNotes}
                    batches={batches}
                />
            )}
        </div>
    );
}