// import usestate
import { useState } from "react";

// routing imports
import { useNavigate } from "react-router-dom";

// react hot toast
import toast, { Toaster } from 'react-hot-toast';

// import components
import Background from "../../components/utils/BackgroundEffect";
import AdminHeader from "../../components/admin/login/Header";
import InputFields from "../../components/admin/login/InputFields";
import { recordLog } from "../../components/utils/logger";

// Primary color
const PRIMARY = "#0189c7";

// admin login component
export default function AdminLogin() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);

    const navigate = useNavigate();

    // handle change in form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    // handle login logic
    const handleLogin = async (e) => {
        e.preventDefault();

        let res;
        setLoading(true);

        const loadingToast = toast.loading("Verifying credentials...");
        const userEmail = credentials.email.trim().toLowerCase();

        try {
            const API_ENDPOINT = "https://v0g5yolmea.execute-api.ap-south-1.amazonaws.com/login";

            res = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: userEmail,
                    password: credentials.password
                }),
            });

            // Safe JSON parsing
            let data = {};
            try {
                data = await res.json();
            } catch {
                data = {};
            }

            console.log("LOGIN RESPONSE:", {
                status: res.status,
                data
            });

            // 403 → Not allowed
            if (res.status === 403) {
                console.error("403 ERROR:", data);

                try {
                    await recordLog("ACCESS_DENIED", `Email: ${userEmail}`, "security_alert");
                } catch { }

                throw new Error(data?.error || "Access denied (not authorized)");
            }

            // 401 → Invalid credentials
            if (res.status === 401) {
                console.error("401 ERROR:", data);

                try {
                    await recordLog("LOGIN_FAILURE", `Email: ${userEmail}`, "security_alert");
                } catch { }

                throw new Error(data?.error || "Invalid credentials");
            }

            // Other errors
            if (!res.ok) {
                console.error("UNKNOWN ERROR:", data);

                throw new Error(data?.error || "Login failed");
            }

            // SUCCESS
            localStorage.setItem("admin_token", data.token);
            localStorage.setItem("is_super", String(data.user.isSuper));
            localStorage.setItem("admin_name", data.user.name);
            localStorage.setItem("admin_data", JSON.stringify(data.user));

            try {
                await recordLog(
                    "LOGIN_SUCCESS",
                    data.user.isSuper ? "Super Admin Portal" : "Sub Admin Portal",
                    "security"
                );
            } catch { }

            toast.success(`Welcome, ${data.user.name}!`, { id: loadingToast });

            setTimeout(() => {
                navigate("/admin/dashboard", { replace: true });
            }, 500);

        } catch (err) {
            console.error("Login Error:", {
                message: err.message,
                stack: err.stack,
                responseStatus: res?.status
            });

            // Log system errors only (avoid duplicate logs for 401/403)
            if (!res || (res.status !== 401 && res.status !== 403)) {
                try {
                    await recordLog("SYSTEM_ERROR", err.message, "system");
                } catch { }
            }

            toast.error(err.message || "Something went wrong", { id: loadingToast });

        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 input-glow text-sm";
    const labelCls = "block text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-200";

    return (
        <div
            className="min-h-screen w-full bg-white flex items-center justify-center relative px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* Toast Notifications */}
            <Toaster position="top-center" />

            {/* Background Elements */}
            <Background />

            <div
                className="relative z-10 w-full max-w-md"
                style={{ animation: "slideUp 0.7s cubic-bezier(.16,1,.3,1) both" }}
            >
                {/* Admin Header */}
                <AdminHeader PRIMARY={PRIMARY} />

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="rounded-3xl p-8 flex flex-col gap-5 bg-white"
                    style={{
                        border: "1px solid rgba(1,137,199,0.14)",
                        boxShadow: "0 0 60px rgba(1,137,199,0.05), 0 20px 50px rgba(0,0,0,0.04)"
                    }}
                >
                    <InputFields
                        credentials={credentials}
                        handleChange={handleChange}
                        inputCls={inputCls}
                        labelCls={labelCls}
                        focused={focused}
                        setFocused={setFocused}
                        PRIMARY={PRIMARY}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl text-white font-bold text-xs tracking-widest transition-all duration-300 
                        active:scale-[0.98] mt-4 uppercase"
                        style={{
                            background: `linear-gradient(90deg, ${PRIMARY}, #00c6ff)`,
                            boxShadow: "0 8px 25px rgba(1,137,199,0.25)",
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Verifying..." : "Secure Login"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-[2px]">
                    Internal Systems — Secured by Admin-Auth 2.0
                </p>
            </div>
        </div>
    );
}