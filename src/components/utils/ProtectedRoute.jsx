// import routers
import { Navigate, Outlet } from "react-router-dom";

// protected route handling admin, student, and mentor
export const ProtectedRoute = ({ userType = "admin" }) => {
    // 1. Map configurations for the guard
    const config = {
        admin: {
            tokenKey: "admin_token",
            loginPath: "/admin/login"
        },
        student: {
            tokenKey: "student_token",
            loginPath: "/student/login"
        },
        mentor: {
            tokenKey: "mentor_token",
            loginPath: "/mentor/login"
        }
    };

    const { tokenKey, loginPath } = config[userType] || config.admin;
    const token = localStorage.getItem(tokenKey);

    try {
        // If no token exists, redirect to the specific login page
        if (!token) return <Navigate to={loginPath} replace />;

        // Decode JWT payload
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Check if token is expired
        if (payload.exp * 1000 < Date.now()) {
            // Only clear the specific token to avoid cross-portal logouts
            localStorage.removeItem(tokenKey);
            return <Navigate to={loginPath} replace />;
        }

        // If authorized, render the dashboard content
        return <Outlet />;
    } catch (e) {
        // If token is corrupt, clear and redirect
        localStorage.removeItem(tokenKey);
        return <Navigate to={loginPath} replace />;
    }
};