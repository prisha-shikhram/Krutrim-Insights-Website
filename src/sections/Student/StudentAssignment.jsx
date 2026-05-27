// import hooks
import { useState, useEffect, useMemo } from "react";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import icons
import { Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// api urls
const ASSIGNMENT_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/assignments";
const S3_UPLOAD_API = "https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url";

// import components
import Stats from "../../components/student/assignment/Stats";
import AssignmentList from "../../components/student/assignment/AssignmentList";
import SubmissionModal from "../../components/student/assignment/SubmissionModal";

// student assignment page
export default function StudentAssignment() {
    const { student } = useOutletContext();
    const [assignments, setAssignments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeAssignment, setActiveAssignment] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // New state for file upload
    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        fetchAssignments();
    }, [student.email]);

    // fetch assignments
    const fetchAssignments = async () => {
        if (!student?.email) return;
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                email: student.email.toLowerCase(),
                type: "assignments",
                batch: (student.batchCode || "").trim()
            });

            const res = await fetch(`${ASSIGNMENT_API}?${queryParams.toString()}`);
            const data = await res.json();

            const rawItems = Array.isArray(data) ? data : (data.Items || []);

            // DYNAMIC STATUS LOGIC: Compute "Deadline Passed" if not submitted
            const processedAssignments = rawItems.map(asm => {
                const now = new Date();
                const deadlineDate = new Date(asm.deadline);

                let currentStatus = asm.status || "Pending";

                // If not submitted and now > deadline, override status
                if (currentStatus !== "Submitted" && now > deadlineDate) {
                    currentStatus = "Deadline Passed";
                }

                return {
                    ...asm,
                    status: currentStatus
                };
            }).sort((a, b) => new Date(a.deadline) - new Date(b.deadline));

            setAssignments(processedAssignments);
        } catch (err) {
            console.error(err);
            toast.error("Failed to load assignments");
        } finally {
            setLoading(false);
        }
    };

    // stats
    const stats = useMemo(() => {
        const completed = assignments.filter(a => a.status === "Submitted").length;
        // Total minus completed (includes Pending and Deadline Passed)
        const pending = assignments.length - completed;
        return { completed, pending };
    }, [assignments]);

    // Handle file change logic
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type === "application/pdf") {
            setSelectedFile(file);
            toast.success(`${file.name} ready for submission`);
        } else {
            toast.error("Please select a valid PDF file");
            e.target.value = null;
        }
    };

    // open submit modal
    const openSubmitModal = (assignment) => {
        // Block interaction if status is Deadline Passed
        if (assignment.status === "Deadline Passed") {
            return toast.error("Submission closed: Deadline has passed.");
        }

        if (assignment.status === "Submitted") {
            return toast.info("Assignment already submitted.");
        }

        setActiveAssignment(assignment);
        setSelectedFile(null);
        setIsModalOpen(true);
    };

    // Consolidated Upload and Save logic
    const handleFinalSubmit = async () => {
        if (!selectedFile) return toast.error("Please upload the assignment PDF");

        setIsSubmitting(true);
        const tid = toast.loading("Uploading solution to secure storage...");

        try {
            const urlRes = await fetch(S3_UPLOAD_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: `submission_${student.email}_${Date.now()}_${selectedFile.name.replace(/\s/g, '_')}`,
                    fileType: "application/pdf",
                    uploadType: "assignments"
                })
            });

            if (!urlRes.ok) throw new Error("Failed to get upload authorization");
            const { uploadUrl, fileUrl } = await urlRes.json();

            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": "application/pdf" },
                body: selectedFile
            });

            if (!uploadRes.ok) throw new Error("S3 Upload Failed");

            toast.loading("Finalizing submission in database...", { id: tid });
            const saveRes = await fetch(ASSIGNMENT_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "submitAssignment",
                    studentEmail: student.email.toLowerCase(),
                    assignmentId: activeAssignment.assignmentId,
                    title: activeAssignment.title,
                    submissionUrl: fileUrl,
                })
            });

            if (!saveRes.ok) throw new Error("Failed to save submission record");

            toast.success("Assignment submitted successfully!", { id: tid });
            setIsModalOpen(false);
            fetchAssignments();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "An error occurred", { id: tid });
        } finally {
            setIsSubmitting(false);
        }
    };

    // loading
    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Syncing Assignments...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* STATS SUMMARY */}
            <Stats
                stats={stats}
            />

            {/* ASSIGNMENT LIST */}
            <AssignmentList
                assignments={assignments}
                openSubmitModal={openSubmitModal}
            />

            {/* SUBMISSION MODAL */}
            {isModalOpen && (
                <SubmissionModal
                    setIsModalOpen={setIsModalOpen}
                    isSubmitting={isSubmitting}
                    activeAssignment={activeAssignment}
                    selectedFile={selectedFile}
                    handleFileChange={handleFileChange}
                    handleFinalSubmit={handleFinalSubmit}
                />
            )}
        </div>
    );
}