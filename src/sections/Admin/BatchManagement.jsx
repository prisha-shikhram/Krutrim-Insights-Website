// import hooks
import { useState, useEffect, useMemo, useRef } from "react";

// import icons
import { Plus, Users, Loader2, X, Search, Edit3, UserMinus, AlertTriangle, CheckCircle2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// api url
const API_URL = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/enroll";

// import components
import Modal from "../../components/admin/batches/Modal";
import BatchHeader from "../../components/admin/batches/BatchHeader";
import BatchesGrid from "../../components/admin/batches/BatchesGrid";
import CreateModal from "../../components/admin/batches/CreateModal";
import AssignModal from "../../components/admin/batches/AssignModal";
import ManageModal from "../../components/admin/batches/ManageModal";
import ConfirmRemove from "../../components/admin/batches/ConfirmRemove";

// batch mangement page
export default function BatchManagement() {
    const [batches, setBatches] = useState([]);
    const [unassignedStudents, setUnassignedStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const hasFetched = useRef(false);

    // Modal States
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showAssignModal, setShowAssignModal] = useState(null);
    const [showManageModal, setShowManageModal] = useState(null);
    const [confirmRemove, setConfirmRemove] = useState(null);

    const [selectedStudents, setSelectedStudents] = useState([]);
    const [submitting, setSubmitting] = useState(false);
    const [newBatch, setNewBatch] = useState({ batchName: "", batchCode: "" });

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchInitialData();
    }, []);

    // Fetch data with toast feedback
    const fetchInitialData = async (silent = false) => {
        let tid;
        if (!silent) setLoading(true);
        else tid = toast.loading("Syncing latest data...");

        try {
            const [bRes, sRes] = await Promise.all([
                fetch(`${API_URL}?type=batches`),
                fetch(API_URL)
            ]);

            const bData = await bRes.json();
            const sData = await sRes.json();

            setBatches(Array.isArray(bData) ? bData : []);
            setUnassignedStudents(sData.filter(s => s.batchCode === "UNASSIGNED"));

            if (silent) toast.success("Data synchronized", { id: tid });
        } catch (err) {
            toast.error("Error loading data", { id: tid });
        } finally {
            setLoading(false);
        }
    };

    // handle batch creation
    const handleCreateBatch = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const tid = toast.loading("Creating new batch...");

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({ ...newBatch, action: "createBatch" })
            });

            if (res.ok) {
                toast.success("Batch created successfully", { id: tid });
                setShowCreateModal(false);
                setNewBatch({ batchName: "", batchCode: "" });
                fetchInitialData(true); // Silent sync
            } else {
                throw new Error();
            }
        } catch (err) {
            toast.error("Failed to create batch", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    // handle student addition
    const handleConfirmAssignment = async () => {
        setSubmitting(true);
        const tid = toast.loading(`Assigning ${selectedStudents.length} students...`);

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({
                    action: "assignStudents",
                    batchCode: showAssignModal,
                    studentEmails: selectedStudents
                })
            });

            if (res.ok) {
                toast.success("Students assigned successfully", { id: tid });
                setShowAssignModal(null);
                setSelectedStudents([]);
                fetchInitialData(true);
            } else {
                throw new Error();
            }
        } catch (err) {
            toast.error("Assignment failed", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    // handle student removal
    const handleRemoveStudent = async () => {
        setSubmitting(true);
        const tid = toast.loading("Removing student from batch...");

        try {
            const res = await fetch(API_URL, {
                method: "POST",
                body: JSON.stringify({
                    action: "removeStudent",
                    batchCode: confirmRemove.batchCode,
                    studentEmail: confirmRemove.email
                })
            });

            if (res.ok) {
                toast.success("Student removed", { id: tid });
                const updatedStudents = showManageModal.students.filter(e => e !== confirmRemove.email);
                setShowManageModal({ ...showManageModal, students: updatedStudents });
                setConfirmRemove(null);
                fetchInitialData(true);
            } else {
                throw new Error();
            }
        } catch (err) {
            toast.error("Removal failed", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    // filter
    const filteredUnassigned = useMemo(() => {
        return unassignedStudents.filter(s =>
            s.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            s.email?.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [unassignedStudents, searchTerm]);

    // loading
    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="animate-spin" size={40} />
            <p className="text-xs font-bold uppercase tracking-[0.2em]">Synchronizing Data...</p>
        </div>
    );

    return (
        <div className="w-full space-y-6 animate-in fade-in duration-700 pb-20">
            {/* Header Section */}
            <BatchHeader
                setShowCreateModal={setShowCreateModal}
                batches={batches}
            />

            {/* Batches Grid */}
            <BatchesGrid
                batches={batches}
                setShowAssignModal={setShowAssignModal}
                setSearchTerm={setSearchTerm}
                setShowManageModal={setShowManageModal}
            />

            {/* CREATE MODAL */}
            <CreateModal
                showCreateModal={showCreateModal}
                setShowCreateModal={setShowCreateModal}
                submitting={submitting}
                handleCreateBatch={handleCreateBatch}
                newBatch={newBatch}
                setNewBatch={setNewBatch}
            />

            {/* ASSIGN STUDENTS MODAL */}
            <AssignModal
                showAssignModal={showAssignModal}
                setShowAssignModal={setShowAssignModal}
                selectedStudents={selectedStudents}
                setSelectedStudents={setSelectedStudents}
                handleConfirmAssignment={handleConfirmAssignment}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                filteredUnassigned={filteredUnassigned}
                submitting={submitting}
            />

            {/* MANAGE MODAL */}
            <ManageModal
                showManageModal={showManageModal}
                setShowManageModal={setShowManageModal}
                setConfirmRemove={setConfirmRemove}
            />

            {/* DELETE CONFIRMATION */}
            {confirmRemove && (
                <ConfirmRemove
                    confirmRemove={confirmRemove}
                    setConfirmRemove={setConfirmRemove}
                    handleRemoveStudent={handleRemoveStudent}
                    submitting={submitting}
                />
            )}
        </div>
    );
}