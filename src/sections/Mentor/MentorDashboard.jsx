// import hooks
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import icons
import { LayoutDashboard, ClipboardCheck, BookOpen, MessageSquare, Bell, LogOut, ChevronLeft, ChevronRight, GraduationCap, FolderOpen } from "lucide-react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// Components
import MentorProfile from "../../components/mentor/dashboard/MentorProfile";
import MentorMenu from "../../components/mentor/dashboard/MentorMenu";
import MentorMain from "../../components/mentor/dashboard/MentorMain";

// primary color
const PRIMARY = "#6366f1";

// mentor dashboard
export default function MentorDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    // Dynamic Mentor State
    const [mentor, setMentor] = useState({
        name: "",
        email: "",
        profileImg: null,
        designation: "",
        department: ""
    });

    // AUTH & DATA INITIALIZATION
    useEffect(() => {
        const token = localStorage.getItem("mentor_token");
        const storedData = localStorage.getItem("mentor_data");

        if (!token || !storedData) {
            navigate("/mentor/login");
            return;
        }

        try {
            const parsedData = JSON.parse(storedData);
            setMentor({
                name: parsedData.name || "Mentor",
                email: parsedData.email,
                profileImg: parsedData.profileImg || null,
                designation: parsedData.designation || "Lead Mentor",
                department: parsedData.department || "General"
            });
        } catch (err) {
            localStorage.removeItem("mentor_token");
            localStorage.removeItem("mentor_data");
            navigate("/mentor/login");
        }
    }, [navigate]);

    // title mapping
    const TITLE_MAP = {
        overview: "Mentor Overview",
        students: "Student Directory",
        attendance: "Manage Attendance",
        assignments: "Review Assignments",
        projects: "Project Mentorship",
        notices: "Announcements",
        settings: "Profile Settings",
        notes: "Study Materials & Notes",
    };

    // get title
    const getTitle = () => {
        const path = location.pathname.split("/").pop();
        if (!path || path === "dashboard") return "Dashboard";
        return TITLE_MAP[path] || path.replace("-", " ");
    };

    // handle navigation
    const handleNav = (id) => {
        navigate(id === "overview" ? "/mentor/dashboard" : `/mentor/dashboard/${id}`);
    };

    // active state
    const isActive = (id) => {
        if (id === "overview") return location.pathname === "/mentor/dashboard";
        return location.pathname.includes(`/mentor/dashboard/${id}`);
    };

    // handle logout
    const handleLogout = () => {
        localStorage.removeItem("mentor_token");
        localStorage.removeItem("mentor_data");
        toast.success("Mentor session closed");
        setTimeout(() => navigate("/mentor/login"), 1000);
    };

    // menu items
    const menuItems = [
        { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
        { id: "attendance", label: "Attendance", icon: <ClipboardCheck size={20} /> },
        { id: "assignments", label: "Assignments", icon: <BookOpen size={20} /> },
        { id: "projects", label: "Projects", icon: <MessageSquare size={20} /> },
        { id: "notes", label: "Notes", icon: <FolderOpen size={20} /> },
        { id: "notices", label: "Notices", icon: <Bell size={20} /> },
    ];

    // API Change: Mentor Profile Image Upload
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const tid = toast.loading("Uploading image...");

        try {
            const response = await fetch("https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: `mentor_${mentor.email.split("@")[0]}_${Date.now()}`,
                    fileType: file.type,
                    uploadType: "mentor_profiles"
                })
            });

            const { uploadUrl, fileUrl } = await response.json();
            await fetch(uploadUrl, { method: "PUT", headers: { "Content-Type": file.type }, body: file });

            // Updated Database Endpoint for Mentors
            const saveRes = await fetch("https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/update-profile-image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "updateProfileImage",
                    email: mentor.email,
                    profileImg: fileUrl
                })
            });

            if (!saveRes.ok) throw new Error("Save failed");

            setMentor(prev => ({ ...prev, profileImg: fileUrl }));
            toast.success("Mentor profile updated!", { id: tid });
        } catch (err) {
            toast.error("Upload failed", { id: tid });
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
            {/* toast conainer */}
            <Toaster position="top-right" />

            <aside
                className={`${collapsed ? "w-20" : "w-72"} h-screen transition-all duration-300 bg-white border-r border-slate-200 flex flex-col 
                shadow-sm relative z-20`}
            >
                <div className="px-6 pt-2 py-6 flex flex-col h-full overflow-hidden">
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="mb-6 p-2 rounded-lg hover:bg-slate-50 text-slate-400 self-end transition-colors cursor-pointer"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>

                    <div className={`flex items-center gap-3 mb-8 -mt-6 ${collapsed ? "justify-center" : ""}`}>
                        <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
                            <GraduationCap size={24} />
                        </div>

                        {!collapsed && <span className="font-black text-xl tracking-tight text-slate-800 uppercase">Mentor Pro</span>}
                    </div>

                    {/* mentor profile */}
                    {!collapsed && <MentorProfile mentor={mentor} onImageUpload={handleImageUpload} />}

                    {/* nenu items */}
                    <MentorMenu
                        menuItems={menuItems}
                        collapsed={collapsed}
                        handleNav={handleNav}
                        isActive={isActive}
                    />

                    {/* logout button */}
                    <button
                        onClick={handleLogout}
                        className={`text-rose-500 text-sm mt-4 flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors 
                        font-bold cursor-pointer ${collapsed ? "justify-center" : ""}`}
                    >
                        <LogOut size={18} />
                        {!collapsed && "Sign Out"}
                    </button>
                </div>
            </aside>

            {/* mentor main */}
            <MentorMain
                getTitle={getTitle}
                mentor={mentor}
                setMentor={setMentor}
                handleImageUpload={handleImageUpload}
            />
        </div>
    );
}