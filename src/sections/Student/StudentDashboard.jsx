// import hooks
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// import icons
import { LayoutDashboard, CalendarCheck, FileEdit, FolderGit2, LogOut, ChevronLeft, ChevronRight, GraduationCap, Bell, Settings } from "lucide-react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// import components
import StudentProfile from "../../components/student/dashboard/StudentProfile";
import StudentMenu from "../../components/student/dashboard/StudentMenu";
import StudentMain from "../../components/student/dashboard/StudentMain";

// primary
const PRIMARY = "#0189c7";

// student dashboard coding
export default function StudentDashboard() {
    const navigate = useNavigate();
    const location = useLocation();
    const [collapsed, setCollapsed] = useState(false);

    // Dynamic Student State
    const [student, setStudent] = useState({
        name: "",
        email: "",
        profileImg: null,
        status: "",
        batchCode: ""
    });

    // AUTH & DATA INITIALIZATION
    useEffect(() => {
        const token = localStorage.getItem("student_token");
        const storedData = localStorage.getItem("student_data");

        if (!token || !storedData) {
            navigate("/student/login");
            return;
        }

        try {
            // Check token expiration
            const payload = JSON.parse(atob(token.split(".")[1]));

            if (payload.exp * 1000 < Date.now()) {
                throw new Error("Session Expired");
            }

            const parsedData = JSON.parse(storedData);

            setStudent({
                name: parsedData.fullName || "Student",
                email: parsedData.email,
                profileImg: parsedData.profileImg || null,
                status: parsedData.status,
                batchCode: parsedData.batchCode || "UNASSIGNED"
            });
        } catch (err) {
            localStorage.removeItem("student_token");
            localStorage.removeItem("student_data");
            navigate("/student/login");
        }
    }, [navigate]);

    // title mapping
    const TITLE_MAP = {
        overview: "My Overview",
        attendance: "Attendance Record",
        assignments: "My Assignments",
        projects: "Project Submissions",
        notices: "Notice Board",
        settings: "Account Settings",
    };

    // get title
    const getTitle = () => {
        const path = location.pathname.split("/").pop();
        if (!path || path === "dashboard") return "Dashboard";
        return TITLE_MAP[path] || path.replace("-", " ");
    };

    // handle navigation
    const handleNav = (id) => {
        navigate(id === "overview" ? "/student/dashboard" : `/student/dashboard/${id}`);
    };

    // active tabs
    const isActive = (id) => {
        if (id === "overview") return location.pathname === "/student/dashboard";
        return location.pathname.includes(`/student/dashboard/${id}`);
    };

    // logout
    const handleLogout = () => {
        localStorage.removeItem("student_token");
        localStorage.removeItem("student_data");
        toast.success("Successfully signed out");
        setTimeout(() => navigate("/student/login"), 1000);
    };

    // menu items
    const menuItems = [
        { id: "overview", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
        { id: "attendance", label: "Attendance", icon: <CalendarCheck size={20} /> },
        { id: "assignments", label: "Assignments", icon: <FileEdit size={20} /> },
        { id: "projects", label: "Projects", icon: <FolderGit2 size={20} /> },
        { id: "notices", label: "Notice Board", icon: <Bell size={20} /> },
        { id: "settings", label: "Settings", icon: <Settings size={20} /> },
    ];

    // handle profile image upload for students
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        const extension = file.name.split(".").pop();

        if (!file.type.startsWith("image/")) {
            toast.error("Please upload an image file");
            return;
        }

        const tid = toast.loading("Updating profile picture...");

        try {
            // =========================
            // GET SIGNED URL
            // =========================
            const response = await fetch(
                "https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        fileName: `student_${student.email.split("@")[0]}_${Date.now()}.${extension}`,
                        fileType: file.type,
                        uploadType: "student_profiles"
                    })
                }
            );

            if (!response.ok) {
                throw new Error("Failed to get upload URL");
            }

            const { uploadUrl, fileUrl } = await response.json();

            // =========================
            // UPLOAD TO S3
            // =========================
            const uploadRes = await fetch(
                uploadUrl,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": file.type
                    },
                    body: file
                }
            );

            if (!uploadRes.ok) {
                throw new Error("S3 upload failed");
            }

            // =========================
            // SAVE IMAGE URL IN DB
            // =========================
            const saveRes = await fetch(
                "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/update-profile-image",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: student.email,
                        profileImg: fileUrl
                    })
                }
            );

            if (!saveRes.ok) {
                throw new Error("Failed to save image");
            }

            // =========================
            // UPDATE STATE
            // =========================
            setStudent((prev) => ({
                ...prev,
                profileImg: fileUrl
            }));

            // =========================
            // UPDATE LOCAL STORAGE
            // =========================
            const existingData = JSON.parse(
                localStorage.getItem("student_data") || "{}"
            );

            localStorage.setItem(
                "student_data",

                JSON.stringify({
                    ...existingData,
                    profileImg: fileUrl
                })
            );

            toast.success(
                "Profile photo updated!",
                {
                    id: tid
                }
            );

        } catch (err) {
            console.error(err);

            toast.error(
                "Upload failed. Please try again.",
                {
                    id: tid
                }
            );
        }
    };

    return (
        <div className="flex h-screen overflow-hidden bg-[#fcfdfe] text-slate-900">
            {/* toaster */}
            <Toaster
                position="top-right"
                toastOptions={{
                    className: 'text-sm font-medium rounded-2xl shadow-lg border border-slate-100',
                    style: { background: '#fff', color: '#334155' }
                }}
            />

            {/* SIDEBAR */}
            <aside
                className={`${collapsed ? "w-20" : "w-72"} 
                h-screen transition-all duration-300 bg-white border-r border-slate-200 flex flex-col shadow-sm relative z-20`}
            >
                <div className="px-6 pt-2 py-6 flex flex-col h-full overflow-hidden">
                    {/* COLLAPSE BTN */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="mb-6 p-2 rounded-lg hover:bg-slate-50 text-slate-400 self-end transition-colors cursor-pointer"
                    >
                        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                    </button>

                    {/* BRAND */}
                    <div className={`flex items-center gap-3 mb-8 -mt-6 ${collapsed ? "justify-center" : ""}`}>
                        <div className="p-2 rounded-xl bg-blue-50 text-[#0189c7]">
                            <GraduationCap size={24} />
                        </div>

                        {!collapsed && (
                            <span className="font-black text-xl tracking-tight text-slate-800 uppercase">
                                Student Hub
                            </span>
                        )}
                    </div>

                    {!collapsed &&
                        <StudentProfile
                            student={student}
                            onImageUpload={handleImageUpload}
                        />
                    }

                    <StudentMenu
                        menuItems={menuItems}
                        collapsed={collapsed}
                        handleNav={handleNav}
                        isActive={isActive}
                    />

                    {/* LOGOUT */}
                    <button
                        onClick={handleLogout}
                        className={`text-rose-500 text-sm mt-4 flex items-center gap-2 px-4 py-3 rounded-xl hover:bg-rose-50 transition-colors font-bold
                        cursor-pointer ${collapsed ? "justify-center" : ""}`}
                    >
                        <LogOut size={18} />
                        {!collapsed && "Sign Out"}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <StudentMain
                getTitle={getTitle}
                student={student}
                setStudent={setStudent}
                handleImageUpload={handleImageUpload}
            />
        </div>
    );
}