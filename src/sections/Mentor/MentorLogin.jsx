// import hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import toast
import toast, { Toaster } from 'react-hot-toast';

// import components
import Background from "../../components/utils/BackgroundEffect";
import MentorHeader from "../../components/mentor/login/MentorHeader";
import MentorInputFields from "../../components/mentor/login/MentorInputFields";
import { recordLog } from "../../components/utils/logger";

// primary color
const PRIMARY = "#6366f1";

// mentor login
export default function MentorLogin() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);

    const navigate = useNavigate();

    // handle change in input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    // handle login
    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const loadingToast = toast.loading("Accessing Mentor Portal...");
        const userEmail = credentials.email.trim().toLowerCase();

        try {
            const API_ENDPOINT = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/login";

            const res = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "login",
                    email: userEmail,
                    password: credentials.password,
                    role: "mentor"
                }),
            });

            let data = {};
            try { data = await res.json(); } catch { data = {}; }

            if (!res.ok) {
                await recordLog("MENTOR_LOGIN_FAIL", `Email: ${userEmail}`, "security_alert");

                if (res.status === 403) {
                    throw new Error("This account does not have Mentor privileges.");
                }

                throw new Error(data?.error || "Invalid Mentor Credentials");
            }

            // SUCCESS - Using mentor specific keys
            localStorage.setItem("mentor_token", data.token);
            localStorage.setItem("mentor_name", data.user.name);
            localStorage.setItem("mentor_data", JSON.stringify(data.user));

            await recordLog("MENTOR_LOGIN_SUCCESS", `Mentor: ${data.user.name}`, "security");

            toast.success(`Welcome back, Mentor ${data.user.name.split(' ')[0]}!`, { id: loadingToast });

            setTimeout(() => {
                navigate("/mentor/dashboard", { replace: true });
            }, 500);

        } catch (err) {
            toast.error(err.message || "Connection failed", { id: loadingToast });
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 text-sm focus:ring-2 focus:ring-offset-1 focus:ring-indigo-100";
    const labelCls = "block text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-200";

    return (
        <div
            className="min-h-screen w-full bg-white flex items-center justify-center relative px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* toast container */}
            <Toaster position="top-center" />

            {/* background component */}
            <Background />

            <div
                className="relative z-10 w-full max-w-md"
                style={{ animation: "slideUp 0.7s cubic-bezier(.16,1,.3,1) both" }}
            >
                {/* header */}
                <MentorHeader PRIMARY={PRIMARY} />

                {/* form */}
                <form
                    onSubmit={handleLogin}
                    className="rounded-3xl p-8 flex flex-col gap-5 bg-white"
                    style={{
                        border: "1px solid rgba(99,102,241,0.14)",
                        boxShadow: "0 20px 50px rgba(0,0,0,0.04)"
                    }}
                >
                    {/* input fields */}
                    <MentorInputFields
                        credentials={credentials}
                        handleChange={handleChange}
                        inputCls={inputCls}
                        labelCls={labelCls}
                        focused={focused}
                        setFocused={setFocused}
                        PRIMARY={PRIMARY}
                    />

                    {/* button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl text-white font-bold text-xs tracking-widest transition-all duration-300 active:scale-[0.98] mt-4 uppercase"
                        style={{
                            background: `linear-gradient(90deg, ${PRIMARY}, #818cf8)`,
                            boxShadow: "0 8px 25px rgba(99,102,241,0.25)",
                            opacity: loading ? 0.7 : 1,
                            cursor: loading ? "not-allowed" : "pointer"
                        }}
                    >
                        {loading ? "Verifying..." : "Mentor Access"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-[2px]">
                    Mentor Portal — Empowering Education
                </p>
            </div>
        </div>
    );
}