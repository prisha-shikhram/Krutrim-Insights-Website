// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import { AlertTriangle, Calendar, Info, Layers, Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import omponents
import NoticeHeader from "../../components/mentor/notice/MentorNoticeHeader";
import NoticeList from "../../components/mentor/notice/MentorNoticeList";
import CreateModal from "../../components/admin/notice/CreateModal";

// api url
const PORTAL_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/portal";

// mentor notice page
export default function MentorNoticePage() {
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const { mentor } = useOutletContext();
    const hasFetched = useRef(false);

    // dynamic form states
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        type: "general",
    });

    // types of notices
    const NOTICE_TYPES = {
        urgent: { label: "URGENT", color: "bg-rose-50 text-rose-600 border-rose-100", icon: <AlertTriangle size={12} /> },
        general: { label: "GENERAL", color: "bg-indigo-50 text-indigo-600 border-indigo-100", icon: <Info size={12} /> },
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
        if (!silent) setLoading(true);

        try {
            const res = await fetch(PORTAL_API, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    action: "getAllNotices",
                    role: "Mentor"
                })
            });

            if (!res.ok) throw new Error("Server error");

            const data = await res.json();

            setNotices(Array.isArray(data) ? data : []);

        } catch (err) {
            console.error("Fetch Notices Error:", err);
            toast.error("Notice board sync failed");
        } finally {
            setLoading(false);
        }
    };

    // handle notice creation
    const handleCreateNotice = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        const tid = toast.loading("Sending to Admin for approval...");

        try {
            const res = await fetch(PORTAL_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "createNotice",
                    title: formData.title,
                    content: formData.content,
                    noticeType: formData.type,
                    createdBy: mentor.name,
                    role: "Mentor"
                })
            });

            if (!res.ok) throw new Error();
            toast.success("Notice sent for approval!", { id: tid });
            setFormData({ title: "", content: "", type: "general" });
            setShowModal(false);
            fetchNotices(true);
        } catch (err) {
            toast.error("Failed to submit notice", { id: tid });
        } finally {
            setSubmitting(false);
        }
    };

    // loading
    if (loading) return (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <Loader2 className="animate-spin mb-2 text-[#6366f1]" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Syncing Board...</p>
        </div>
    );

    return (
        <div className="space-y-10 py-6">
            {/* notice header */}
            <NoticeHeader setShowModal={setShowModal} />

            {/* notice list */}
            <NoticeList
                notices={notices}
                NOTICE_TYPES={NOTICE_TYPES}
                mentor={mentor}
            />

            {/* create modal */}
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