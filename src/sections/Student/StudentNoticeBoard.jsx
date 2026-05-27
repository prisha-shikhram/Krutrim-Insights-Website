// import hooks
import { useState, useEffect, useMemo } from "react";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import toast
import toast from "react-hot-toast";

// api url
const NOTICE_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/notice";

// import components
import NoticeHeader from "../../components/student/notice/NoticeHeader";
import NoticeFilter from "../../components/student/notice/NoticeFilter";
import NoticeList from "../../components/student/notice/NoticeList";

// notice board page
export default function StudentNoticeBoard() {
    const { student } = useOutletContext();
    const [notices, setNotices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterType, setFilterType] = useState("ALL");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchNotices();
    }, []);

    // fetcch notices
    const fetchNotices = async () => {
        setLoading(true);
        try {
            const res = await fetch(NOTICE_API);
            const data = await res.json();

            const processed = (Array.isArray(data) ? data : (data.Items || []))
                .filter(n => n.approved === true)
                .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            setNotices(processed);
        } catch (err) {
            toast.error("Failed to load notice board");
        } finally {
            setLoading(false);
        }
    };

    // filter notice
    const filteredNotices = useMemo(() => {
        return notices.filter(n => {
            const matchesType = filterType === "ALL" || n.noticetype?.toUpperCase() === filterType;
            const matchesSearch = n.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                n.content?.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesType && matchesSearch;
        });
    }, [notices, filterType, searchTerm]);

    // get type of notice style
    const getTypeStyles = (type) => {
        const t = type?.toUpperCase();
        switch (t) {
            case "URGENT": return "bg-rose-50 text-rose-600 border-rose-100";
            case "EVENT": return "bg-blue-50 text-blue-600 border-blue-100";
            case "GENERAL": return "bg-emerald-50 text-emerald-600 border-emerald-100";
            default: return "bg-slate-50 text-slate-500 border-slate-100";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* header */}
                <NoticeHeader
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                />

                {/* Filter Container */}
                <NoticeFilter
                    filterType={filterType}
                    setFilterType={setFilterType}
                />
            </div>

            {/* NOTICES LIST */}
            <NoticeList
                loading={loading}
                filteredNotices={filteredNotices}
                getTypeStyles={getTypeStyles}
            />

            <div className="py-10 text-center">
                <p className="text-slate-300 text-[10px] font-bold uppercase tracking-[0.4em]">End of Notice Board</p>
            </div>
        </div>
    );
}