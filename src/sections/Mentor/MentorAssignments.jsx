// import hooks
import { useState, useEffect } from "react";

// import icons
import { Plus, FileText, Share2, Calendar, Clock, Search, Loader2, X } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import components
import AssignmentHeader from "../../components/mentor/assignments/AssignmentHeader";
import AssignmentList from "../../components/mentor/assignments/AssignmentList";
import CreateAssignmentModal from "../../components/mentor/assignments/CreateAssignmentModal";
import ShareAssignmentModal from "../../components/mentor/assignments/ShareAssignmentModal";

// api urls
const ASSIGNMENT_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/assignments";
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";

// Helper for Authorization Headers using mentor_token
const getAuthHeaders = () => {
    const token = localStorage.getItem("mentor_token");
    return {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
};

// mentor assignments
export default function MentorAssignments() {
    const context = useOutletContext();
    const mentor = context?.mentor;

    const [assignments, setAssignments] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);

    // Modal States
    const [showCreate, setShowCreate] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [activeAssignment, setActiveAssignment] = useState(null);

    // Fetch initial data when mentor context is ready
    useEffect(() => {
        fetchInitialData();
    }, [mentor?.email]);

    // Fetch batches & assignments data
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            const authHeaders = getAuthHeaders();

            // 1. Fetch Batches
            const batchRes = await fetch(BATCH_API, {
                method: "GET",
                headers: authHeaders,
            });
            const batchData = await batchRes.json();

            const actualBatches = Array.isArray(batchData)
                ? batchData
                : (batchData.Items || []);

            setBatches(actualBatches);

            // 2. Fetch Mentor Assignments
            const assignRes = await fetch(ASSIGNMENT_API, {
                method: "POST",
                headers: authHeaders,
                body: JSON.stringify({
                    action: "listAssignments",
                    createdBy: mentor?.email || ""
                })
            });

            const assignData = await assignRes.json();
            const actualAssignments = Array.isArray(assignData)
                ? assignData
                : (assignData.Items || []);

            setAssignments(actualAssignments);

        } catch (err) {
            console.error("Mentor Assignments Fetch Error:", err);
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
                    batches={batches}
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