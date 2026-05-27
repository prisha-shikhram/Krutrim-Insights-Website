// import hooks
import { useState, useEffect } from "react";

// import navigation
import { useNavigate, useLocation } from "react-router-dom";

// import icons
import {
    LayoutDashboard, Users, FileText, BookOpen, School, Building2, ClipboardList, LogOut, ChevronLeft, ChevronRight, Bell, UserCheck, GraduationCap, Layers
} from "lucide-react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// import components
import { recordLog } from "../../components/utils/logger";
import Profile from "../../components/admin/dashboard/profile";
import Menu from "../../components/admin/dashboard/menu";
import Main from "../../components/admin/dashboard/main";

// primary color
const PRIMARY = "#0189c7";

// super admin profile images
const SUPER_ADMIN_IMAGES = {
    "Garv": "/images/other/Co-Founder.jpeg",
    "Pooja Ma'am": "/images/other/Founder.jpeg"
};

// admin dashboard
export default function AdminDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    const [user, setUser] = useState({
        name: "",
        email: "",
        isSuper: false,
        profileImg: null,
        permissions: []
    });

    // --- AUTH & INITIALIZATION ---
    useEffect(() => {
        const token = localStorage.getItem("admin_token");
        const storedAdminData = localStorage.getItem("admin_data");

        if (!token) {
            navigate("/admin/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            if (payload.exp * 1000 < Date.now()) {
                throw new Error("Token expired");
            }

            const name = localStorage.getItem("admin_name") || "Admin";
            const isSuper = payload.role === "super";

            // Super Admins use static images. Sub-admins use DB data, falling back to localStorage
            let profileImg = null;

            if (isSuper) {
                profileImg = SUPER_ADMIN_IMAGES[name];
            } else {
                const parsedData = storedAdminData ? JSON.parse(storedAdminData) : {};
                profileImg = parsedData.profileImg || localStorage.getItem(`profile_img_${name}`);
            }

            setUser({
                name,
                email: payload.email,
                isSuper,
                profileImg,
                permissions: payload.permissions || []
            });

        } catch (err) {
            localStorage.clear();
            navigate("/admin/login");
        }
    }, [navigate]);

    // =========================
    // IMAGE UPLOAD (UPDATED)
    // =========================
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Check for Super Admin (Usually don't want them changing static assets via UI)
        if (user.isSuper) {
            toast.error("Super Admin profiles are managed by system assets.");
            return;
        }

        const tid = toast.loading("Updating profile...");

        try {
            // 1. Get Signed URL
            const response = await fetch("https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: `admin_${user.name}_${Date.now()}.png`,
                    fileType: file.type,
                    uploadType: "admin_profiles"
                })
            });

            const { uploadUrl, fileUrl } = await response.json();

            // 2. Upload to S3
            await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file
            });

            // 3. Save to Database
            const saveRes = await fetch("https://v0g5yolmea.execute-api.ap-south-1.amazonaws.com/admin/update-profile-image", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("admin_token")}`
                },
                body: JSON.stringify({
                    email: user.email,
                    profileImg: fileUrl
                })
            });

            if (!saveRes.ok) throw new Error("DB Sync Failed");

            // 4. Update Local State & Storage
            localStorage.setItem(`profile_img_${user.name}`, fileUrl);

            // Also update the 'admin_data' object if it exists
            const existingData = JSON.parse(localStorage.getItem("admin_data") || "{}");
            localStorage.setItem("admin_data", JSON.stringify({ ...existingData, profileImg: fileUrl }));

            setUser(prev => ({ ...prev, profileImg: fileUrl }));

            toast.success("Profile photo updated!", { id: tid });
            recordLog("PROFILE_IMG_UPDATE", "Changed profile picture", "data");

        } catch (err) {
            console.error(err);
            toast.error("Upload failed", { id: tid });
        }
    };

    // --- OTHER LOGIC REMAINS SAME ---
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    // title mapping
    const TITLE_MAP = {
        contact: "Contact Leads",
        brochure: "Brochure Requests",
        colleges: "Colleges Data",
        project: "Project Submissions",
    };

    // get title
    const getTitle = () => {
        const path = location.pathname.split("/").pop();
        if (!path || path === "dashboard") return "Dashboard";
        return TITLE_MAP[path] || path.replace("-", " ");
    };

    // handle navigation
    const handleNav = (id) => {
        if (user.name && !user.isSuper) {
            recordLog("PAGE_ACCESS", `Accessed ${id} module`, "view");
        }
        navigate(id === "overview" ? "/admin/dashboard" : `/admin/dashboard/${id}`);
    };

    // active state
    const isActive = (id) => {
        if (id === "overview") return location.pathname === "/admin/dashboard";
        return location.pathname.startsWith(`/admin/dashboard/${id}`);
    };

    // handle logout
    const handleLogout = () => {
        localStorage.clear();
        window.location.replace("/admin/login");
    };

    // menu items configuration
    const menuItems = [
        { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "enrolled", label: "Enrolled Students", icon: <UserCheck size={20} />, permission: "enrolled" },
        { id: "batches", label: "Batches", icon: <Layers size={20} />, permission: "enrolled" },
        { id: "notices", label: "Notice Board", icon: <Bell size={20} />, permission: "notices" },
        { id: "contact", label: "Contact Leads", icon: <FileText size={20} />, permission: "contact" },
        { id: "brochure", label: "Brochure Requests", icon: <BookOpen size={20} />, permission: "brochure" },
        { id: "colleges", label: "Colleges Data", icon: <School size={20} />, permission: "colleges" },
        { id: "project", label: "Project Submissions", icon: <Building2 size={20} />, permission: "project" },
        { id: "registered", label: "Registered Students", icon: <GraduationCap size={20} />, permission: "registered" },
        { id: "users", label: "User Management", icon: <Users size={20} />, superOnly: true },
        { id: "logs", label: "Activity Logs", icon: <ClipboardList size={20} />, superOnly: true },
    ];

    return (
        <div className="flex h-screen overflow-hidden bg-[#f8fafc] text-slate-900">
            {/* toast container */}
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'text-sm font-medium rounded-2xl shadow-lg border border-slate-100',
                    duration: 2000,
                    style: {
                        background: '#fff',
                        color: '#334155',
                    },
                    success: {
                        iconTheme: {
                            primary: PRIMARY,
                            secondary: '#fff',
                        },
                    },
                }}
            />

            {/* SIDEBAR */}
            <aside
                className={`${collapsed ? "w-20" : "w-72"} h-screen top-0 shrink-0 transition-all duration-300 bg-white border-r 
                border-slate-200 flex flex-col relative shadow-sm`}
            >
                <div className="px-6 pt-2 py-6 flex flex-col h-full overflow-hidden">
                    {/* COLLAPSE BTN */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className={`mb-6 p-2 rounded-lg transition-colors hover:bg-slate-50 text-slate-400 cursor-pointer ${collapsed ? "mx-auto" : "self-end"}`}
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>

                    {/* BRAND */}
                    <div className={`flex items-center gap-3 mb-8 -mt-6 ${collapsed ? "justify-center" : ""}`}>
                        <img
                            src="/favicon/logo.svg"
                            alt="Logo"
                            className="h-10 w-auto"
                        />

                        {!collapsed && <span className="font-black text-xl tracking-tight text-slate-800 uppercase">Admin Panel</span>}
                    </div>

                    {!collapsed && <Profile user={user} handleImageUpload={handleImageUpload} />}

                    {/* MENU */}
                    <Menu
                        menuItems={menuItems}
                        user={user}
                        collapsed={collapsed}
                        handleNav={handleNav}
                        isActive={isActive}
                    />

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className={`text-rose-500 text-sm mt-4 flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors 
                        cursor-pointer font-bold ${collapsed ? "justify-center" : ""}`}
                    >
                        <LogOut size={18} />
                        {!collapsed && "Logout"}
                    </button>
                </div>
            </aside>

            {/* MAIN */}
            <Main
                getTitle={getTitle}
                user={user}
            />
        </div>
    );
}