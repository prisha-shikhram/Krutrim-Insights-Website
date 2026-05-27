// import hooks
import { useState, useEffect } from "react";

// import icons
import { Plus, FileText, Share2, Calendar, Clock, Search, Loader2, X } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import omponents
import AssignmentHeader from "../../components/mentor/assignments/AssignmentHeader";
import AssignmentList from "../../components/mentor/assignments/AssignmentList";
import CreateAssignmentModal from "../../components/mentor/assignments/CreateAssignmentModal";
import ShareAssignmentModal from "../../components/mentor/assignments/ShareAssignmentModal";

// api urls
const ASSIGNMENT_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/assignments";
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";

// mentor assignments
export default function MentorAssignments() {
    const { mentor } = useOutletContext();
    const [assignments, setAssignments] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showCreate, setShowCreate] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [activeAssignment, setActiveAssignment] = useState(null);

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
            const batchRes = await fetch(BATCH_API);
            const batchData = await batchRes.json();

            const actualBatches = Array.isArray(batchData)
                ? batchData
                : (batchData.Items || []);

            setBatches(actualBatches);

            const assignRes = await fetch(ASSIGNMENT_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "listAssignments",
                    createdBy: mentor.email
                })
            });

            const assignData = await assignRes.json();
            const actualAssignments = Array.isArray(assignData)
                ? assignData
                : (assignData.Items || []);

            setAssignments(actualAssignments);

        } catch (err) {
            console.error(err);
            toast.error("Failed to sync assignment data");
        } finally {
            setLoading(false);
        }
    };

    // handle share modal open
    const handleOpenShare = (assignment) => {
        setActiveAssignment(assignment);
        setShowShare(true);
    };

    return (
        <div className="space-y-8 py-6">
            {/* HEADER */}
            <AssignmentHeader
                setShowCreate={setShowCreate}
            />

            {/* ASSIGNMENT LIST */}
            <AssignmentList
                loading={loading}
                assignments={assignments}
                handleOpenShare={handleOpenShare}
            />

            {/* MODALS */}
            {showCreate && (
                <CreateAssignmentModal
                    onClose={() => setShowCreate(false)}
                    refresh={fetchInitialData}
                    mentor={mentor}
                />
            )}

            {showShare && (
                <ShareAssignmentModal
                    onClose={() => setShowShare(false)}
                    assignment={activeAssignment}
                    batches={batches}
                />
            )}
        </div>
    );
}