// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { AlertTriangle, Calendar, Info, Layers, Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import outlet context for passing user data
import { useOutletContext } from "react-router-dom";

// api url
const PORTAL_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/portal";

// import components
import NoticeHeader from "../../components/admin/notice/NoticeHeader";
import NoticeList from "../../components/admin/notice/NoticeList";
import CreateModal from "../../components/admin/notice/CreateModal";

// motice page
export default function NoticePage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { user } = useOutletContext();
    const hasFetched = useRef(false);

    // states of form
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: "general",
    });

    // types of notice
    const NOTICE_TYPES = {
        urgent: { label: "URGENT", color: "bg-rose-50 text-rose-600 border-rose-100", icon: <AlertTriangle size={12} /> },
        general: { label: "GENERAL", color: "bg-blue-50 text-blue-600 border-blue-100", icon: <Info size={12} /> },
        event: { label: "EVENT", color: "bg-emerald-50 text-emerald-600 border-emerald-100", icon: <Calendar size={12} /> },
        other: { label: "OTHER", color: "bg-slate-50 text-slate-600 border-slate-100", icon: <Layers size={12} /> },
    };

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;
        fetchNotices();
    }, []);

    // fetch notices
    const fetchNotices = async (silent = false) => {
        let tid;
        if (!silent) setLoading(true);
        else tid = toast.loading("Syncing latest notices...");

        try {
            const action = user.isSuper ? "getAllNotices" : "getApprovedNotices";
            const res = await fetch(PORTAL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action })
            });
            const data = await res.json();
            setNotices(Array.isArray(data) ? data : []);

            if (tid) toast.success("Notices updated", { id: tid });
        } catch (err) {
            if (tid) toast.error("Failed to sync notices", { id: tid });
            else toast.error("Failed to load notices");
        } finally {
            setLoading(false);
        }
    };

    // handle notice creation
    const handleCreateNotice = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const tid = toast.loading("Sending for approval...");

        try {
            const res = await fetch(PORTAL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "createNotice",
                    title: formData.title,
                    content: formData.content,
                    noticeType: formData.type,
                    createdBy: user.name,
                    role: "Admin"
                })
            });

            if (!res.ok) throw new Error();
            toast.success("Notice sent for approval!", { id: tid });
            setFormData({ title: "", content: "", type: "general" });
            setShowModal(false);
            fetchNotices(true); // Silent refresh
        } catch (err) {
            toast.error("Failed to create notice", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    // handle approve
    const handleApprove = async (noticeId, createdAt) => {
        const tid = toast.loading("Publishing notice...");
        try {
            const res = await fetch(PORTAL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "approveNotice",
                    noticeId,
                    createdAt
                })
            });

            if (!res.ok) throw new Error();

            toast.success("Notice published!", { id: tid });
            fetchNotices(true); // Silent refresh
        } catch (err) {
            toast.error("Approval failed", { id: tid });
        }
    };

    // loading
    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin mb-2 text-[#0189c7]" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Loading...</p>
        </div>
    );

    return (
        <div className="space-y-10 py-6">
            {/* HEADER */}
            <NoticeHeader
                setShowModal={setShowModal}
                user={user}
            />

            {/* NOTICE LIST */}
            <NoticeList
                notices={notices}
                NOTICE_TYPES={NOTICE_TYPES}
                user={user}
                handleApprove={handleApprove}
            />

            {/* CREATE MODAL */}
            {showModal && (
                <CreateModal
                    setShowModal={setShowModal}
                    handleCreateNotice={handleCreateNotice}
                    setFormData={setFormData}
                    formData={formData}
                    NOTICE_TYPES={NOTICE_TYPES}
                    submitting={submitting}
                />
            )}
        </div>
    );
}