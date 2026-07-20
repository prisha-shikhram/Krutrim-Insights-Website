// import hooks
import { useState, useEffect } from "react";

// import navigation
import { useNavigate, useLocation } from "react-router-dom";

// import icons
import { LayoutDashboard, Users, CreditCard, Bell, ShieldAlert, LogOut, ChevronLeft, ChevronRight, History } from "lucide-react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// import components
import AdminPaymentProfile from "../../components/payment/dashboard/AdminPaymentProfile";
import AdminPaymentMenu from "../../components/payment/dashboard/AdminPaymentMenu";
import Main from "../../components/admin/dashboard/main";

// primary color
const PRIMARY = "#0189c7";

// super admin profile images
const SUPER_ADMIN_IMAGES = {
    "Garv": "/images/other/Co-Founder.jpeg",
    "Pooja Ma'am": "/images/other/Founder.jpeg"
};

// admin payment dashboard component
export default function AdminPaymentDashboard() {
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
        const token = localStorage.getItem("admin_payment_token");
        const storedAdminData = localStorage.getItem("admin_payment_data");

        if (!token) {
            navigate("/admin/payment/login");
            return;
        }

        try {
            const payload = JSON.parse(atob(token.split(".")[1]));

            if (payload.exp * 1000 < Date.now()) {
                throw new Error("Token expired");
            }

            const name = localStorage.getItem("admin_payment_name") || "Admin";
            const isSuper = payload.role === "super";

            // Super Admins map to system assets, others fall back to stored profile properties
            let profileImg = null;
            if (isSuper) {
                profileImg = SUPER_ADMIN_IMAGES[name];
            } else {
                const parsedData = storedAdminData ? JSON.parse(storedAdminData) : {};
                profileImg = parsedData.profileImg || null;
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
            navigate("/admin/payment/login");
        }
    }, [navigate]);

    // Prevent going back in window history
    useEffect(() => {
        window.history.pushState(null, "", window.location.href);
        const handlePopState = () => window.history.pushState(null, "", window.location.href);
        window.addEventListener("popstate", handlePopState);
        return () => window.removeEventListener("popstate", handlePopState);
    }, []);

    // title mapping for payment pages
    const TITLE_MAP = {
        overview: "Overview Dashboard",
        enrolled: "Enrolled Students",
        "payment-module": "Payment Module",
        "payment-history": "Payment History",
        reminders: "Payment Reminders",
        "delay-tracker": "Delay Tracker",
    };

    // get current page title
    const getTitle = () => {
        const path = location.pathname.split("/").pop();
        if (!path || path === "dashboard") return "Overview Dashboard";
        return TITLE_MAP[path] || path.replace("-", " ");
    };

    // handle sidebar navigation routing
    const handleNav = (id) => {
        navigate(id === "overview" ? "/admin/payment/dashboard" : `/admin/payment/dashboard/${id}`);
    };

    // calculate active navigation items
    const isActive = (id) => {
        if (id === "overview") return location.pathname === "/admin/payment/dashboard";
        return location.pathname.startsWith(`/admin/payment/dashboard/${id}`);
    };

    // handle user logout
    const handleLogout = () => {
        localStorage.clear();
        window.location.replace("/admin/payment/login");
    };

    // updated menu config matching requested pages
    const menuItems = [
        { id: "overview", label: "Overview", icon: <LayoutDashboard size={20} /> },
        { id: "enrolled", label: "Enrolled Students", icon: <Users size={20} /> },
        { id: "payment-module", label: "Payment Module", icon: <CreditCard size={20} /> },
        { id: "payment-history", label: "Payment History", icon: <History size={20} /> },
        { id: "reminders", label: "Reminders", icon: <Bell size={20} /> },
        { id: "delay-tracker", label: "Delay Tracker", icon: <ShieldAlert size={20} /> }
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
                        {!collapsed && <span className="font-black text-xl tracking-tight text-slate-800 uppercase">Payments</span>}
                    </div>

                    {/* Profile component rendering directly without upload function handler */}
                    {!collapsed && <AdminPaymentProfile user={user} />}

                    {/* MENU */}
                    <AdminPaymentMenu
                        menuItems={menuItems}
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

            {/* MAIN CONTAINER */}
            <Main
                getTitle={getTitle}
                user={user}
            />
        </div>
    );
}