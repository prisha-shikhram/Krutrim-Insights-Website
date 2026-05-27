// import hooks
import { useState, useEffect, useRef } from "react";

// import toast
import toast from 'react-hot-toast';

// import components
import { recordLog } from "../../components/utils/logger";
import Header from "../../components/admin/userManagement/Header";
import AdminSection from "../../components/admin/userManagement/AdminSection";
import MentorSection from "../../components/admin/userManagement/MentorSection";
import MentorModal from "../../components/admin/userManagement/MentorModal";
import AdminModal from "../../components/admin/userManagement/AdminModal";

// primary color
const PRIMARY = "#0189c7";

// admin management page
export default function UserManagement() {
    const [admins, setAdmins] = useState([]);
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);

    // Mentor States
    const [showMentorModal, setShowMentorModal] = useState(false);
    const [mentorData, setMentorData] = useState({ name: "", email: "", password: "" });
    const [mentorSubmitting, setMentorSubmitting] = useState(false);
    const [showMentorPassword, setShowMentorPassword] = useState(false);

    // Admin States
    const [showPassword, setShowPassword] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [newAdmin, setNewAdmin] = useState({
        name: "",
        email: "",
        password: "",
        permissions: []
    });

    // aws api urls
    const API_URL = "https://v0g5yolmea.execute-api.ap-south-1.amazonaws.com/admins";
    const MENTOR_API_URL = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/login";

    // permission options
    const permissionOptions = [
        { id: "enrolled", label: "Enrolled Students", desc: "Manage active students & batches" },
        { id: "notices", label: "Notice Board", desc: "Post & manage announcements" },
        { id: "registered", label: "Registered Students", desc: "View portal registrations" },
        { id: "contact", label: "Contact Form", desc: "General inquiries" },
        { id: "brochure", label: "Brochure Form", desc: "Catalog downloads" },
        { id: "colleges", label: "Colleges Section", desc: "College listings" },
        { id: "project", label: "Project Building Form", desc: "Project submissions" },
    ];

    // =========================
    // SAFE FETCH WRAPPER
    // =========================
    const safeFetch = async (url, options = {}) => {
        const token = localStorage.getItem("admin_token");
        if (!token) throw new Error("Session expired. Please login again.");

        const headers = { Authorization: `Bearer ${token}` };
        if (options.body) headers["Content-Type"] = "application/json";

        const res = await fetch(url, {
            ...options,
            headers: { ...headers, ...(options.headers || {}) }
        });

        let data = {};
        try {
            const rawText = await res.text();
            data = rawText ? JSON.parse(rawText) : {};
        } catch {
            throw new Error(`Server returned invalid response (status ${res.status})`);
        }

        if (!res.ok) throw new Error(data.error || data.message || `Server error (${res.status})`);
        return data;
    };

    // fetch data
    const fetchData = async () => {
        setLoading(true);
        const tid = toast.loading("Syncing directory...");

        try {
            const adminData = await safeFetch(API_URL, { method: "GET" });
            setAdmins(Array.isArray(adminData) ? adminData : []);

            const mentorListData = await safeFetch(MENTOR_API_URL, {
                method: "POST",
                body: JSON.stringify({ action: "listMentors" })
            });
            setMentors(Array.isArray(mentorListData) ? mentorListData : []);

            toast.success("Ready", { id: tid });
        } catch (err) {
            toast.error(err.message, { id: tid });
        } finally {
            setLoading(false);
        }
    };

    const fetchedRef = useRef(false);

    useEffect(() => {
        if (fetchedRef.current) return;
        fetchedRef.current = true;
        fetchData();
    }, []);

    // generate password
    const generatePassword = () => {
        const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
        let retVal = "";
        for (let i = 0; i < 12; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setNewAdmin({ ...newAdmin, password: retVal });
        setShowPassword(true);
        toast.success("Secure password generated");
    };

    // toggle permission in form state
    const togglePermission = (id) => {
        setNewAdmin(prev => ({
            ...prev,
            permissions: prev.permissions.includes(id)
                ? prev.permissions.filter(p => p !== id)
                : [...prev.permissions, id]
        }));
    };

    // handle mentor creation
    const handleCreateMentor = async (e) => {
        e.preventDefault();
        setMentorSubmitting(true);
        const tid = toast.loading("Creating Mentor account...");

        try {
            await safeFetch(MENTOR_API_URL, {
                method: "POST",
                body: JSON.stringify({ action: "createMentor", ...mentorData })
            });
            await recordLog("MENTOR_CREATED", `New Mentor: ${mentorData.name}`, "system");
            toast.success("Mentor created successfully", { id: tid });
            setShowMentorModal(false);
            setMentorData({ name: "", email: "", password: "" });
            fetchData();
        } catch (err) {
            toast.error(err.message || "Failed to create mentor", { id: tid });
        } finally {
            setMentorSubmitting(false);
        }
    };

    // handle action
    const handleAction = async (e) => {
        e.preventDefault();
        if (!isEditing && !newAdmin.password) return toast.error("Password is required");
        const tid = toast.loading(isEditing ? "Updating..." : "Creating...");

        try {
            await safeFetch(API_URL, { method: "POST", body: JSON.stringify(newAdmin) });
            toast.success(isEditing ? "Admin updated" : "Admin created", { id: tid });
            setShowAddModal(false);
            resetForm();
            fetchData();
        } catch (err) {
            toast.error(err.message, { id: tid });
        }
    };

    // handle deletion
    const handleDelete = async (email) => {
        if (!window.confirm(`Revoke access for ${email}?`)) return;
        const tid = toast.loading("Revoking access...");
        try {
            await safeFetch(`${API_URL}?email=${encodeURIComponent(email)}`, { method: "DELETE" });
            toast.success("Access revoked", { id: tid });
            fetchData();
        } catch (err) {
            toast.error(err.message, { id: tid });
        }
    };

    // open edit modal with pre-filled data
    const openEditModal = (admin) => {
        setIsEditing(true);
        setNewAdmin({
            name: admin.name,
            email: admin.email,
            password: "",
            permissions: admin.permissions || []
        });
        setShowAddModal(true);
    };

    // reset form to initial state
    const resetForm = () => {
        setNewAdmin({ name: "", email: "", password: "", permissions: [] });
        setIsEditing(false);
        setShowPassword(false);
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* header */}
            <Header
                setShowAddModal={setShowAddModal}
                setShowMentorModal={setShowMentorModal}
                PRIMARY={PRIMARY}
                resetForm={resetForm}
            />

            {/* --- Admin Section --- */}
            <AdminSection
                loading={loading}
                admins={admins}
                openEditModal={openEditModal}
                handleDelete={handleDelete}
            />

            {/* --- Mentor Section --- */}
            <MentorSection
                loading={loading}
                mentors={mentors}
            />

            {/* Mentor Modal */}
            {showMentorModal && (
                <MentorModal
                    setShowMentorModal={setShowMentorModal}
                    handleCreateMentor={handleCreateMentor}
                    mentorData={mentorData}
                    setMentorData={setMentorData}
                    showMentorPassword={showMentorModal}
                    setShowMentorPassword={setShowMentorPassword}
                    mentorSubmitting={mentorSubmitting}
                />
            )}

            {/* Admin Modal */}
            {showAddModal && (
                <AdminModal
                    isEditing={isEditing}
                    setShowAddModal={setShowAddModal}
                    handleAction={handleAction}
                    newAdmin={newAdmin}
                    setNewAdmin={setNewAdmin}
                    permissionOptions={permissionOptions}
                    togglePermission={togglePermission}
                    showPassword={showPassword}
                    setShowPassword={setShowPassword}
                    generatePassword={generatePassword}
                    PRIMARY={PRIMARY}
                />
            )}
        </div>
    );
}