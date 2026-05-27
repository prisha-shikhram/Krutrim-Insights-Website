// import routers
import { Navigate, Outlet } from "react-router-dom";

// public route handling admin, student, and mentor
export const PublicRoute = ({ userType = "admin" }) => {
    // 1. Map configurations based on userType
    const config = {
        admin: {
            tokenKey: "admin_token",
            path: "/admin/dashboard"
        },
        student: {
            tokenKey: "student_token",
            path: "/student/dashboard"
        },
        mentor: {
            tokenKey: "mentor_token",
            path: "/mentor/dashboard"
        }
    };

    const { tokenKey, path: dashboardPath } = config[userType] || config.admin;
    const token = localStorage.getItem(tokenKey);

    try {
        if (!token) return <Outlet />;

        // Decode JWT payload
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Check if token is expired
        if (payload.exp * 1000 < Date.now()) {
            localStorage.removeItem(tokenKey);
            return <Outlet />;
        }

        // If valid token exists, prevent access to login/signup and redirect to dashboard
        return <Navigate to={dashboardPath} replace />;
    } catch (err) {
        // Clear corrupt tokens
        localStorage.removeItem(tokenKey);
        return <Outlet />;
    }
};