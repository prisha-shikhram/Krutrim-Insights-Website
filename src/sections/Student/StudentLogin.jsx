// import hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import toast
import toast, { Toaster } from 'react-hot-toast';

// import components
import Background from "../../components/utils/BackgroundEffect";
import Header from "../../components/student/login/Header";
import InputFields from "../../components/student/login/InputFields";
import BackToHome from "../../components/admin/login/BackToHome";

// primary color
const PRIMARY = "#0189c7";

// api url
const LOGIN_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/login";

// student login component
export default function StudentLogin() {
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate();

    // handle change in input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCredentials(prev => ({ ...prev, [name]: value }));
    };

    // handle login
    const handleLogin = async (e) => {
        e.preventDefault();

        if (!credentials.email || !credentials.password) {
            toast.error("Please enter both email and password.");
            return;
        }

        setLoading(true);
        const tid = toast.loading("Verifying credentials...");

        try {
            const response = await fetch(LOGIN_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "login",
                    email: credentials.email.toLowerCase().trim(),
                    password: credentials.password
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Invalid email or password.");
            }

            // Using specific keys to prevent clashing with admin sessions
            localStorage.setItem("student_token", data.token);
            localStorage.setItem("student_data", JSON.stringify(data.student));

            toast.success("Welcome back!", { id: tid });

            // Navigate to the Dashboard Index
            setTimeout(() => navigate("/student/dashboard"), 1000);

        } catch (err) {
            toast.error(err.message, { id: tid });
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full bg-white border rounded-xl pl-11 pr-11 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 text-sm";
    const labelCls = "block text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-200";

    return (
        <div
            className="min-h-screen w-full bg-white flex items-center justify-center relative px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* toaster container */}
            <Toaster position="top-center" />

            {/* Background Component */}
            <Background />

            {/* Nack to home page */}
            <BackToHome />

            <div className="relative z-10 w-full max-w-md animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header */}
                <Header PRIMARY={PRIMARY} />

                {/* Form */}
                <form
                    onSubmit={handleLogin}
                    className="rounded-3xl p-8 flex flex-col gap-5 bg-white shadow-2xl border border-blue-50"
                    style={{ boxShadow: "0 0 60px rgba(1,137,199,0.05), 0 20px 50px rgba(0,0,0,0.04)" }}
                >
                    {/* Input fields */}
                    <InputFields
                        labelCls={labelCls}
                        inputCls={inputCls}
                        credentials={credentials}
                        handleChange={handleChange}
                        focused={focused}
                        setFocused={setFocused}
                        setShowPassword={setShowPassword}
                        showPassword={showPassword}
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
                        {loading ? "Authorizing..." : "Login to Dashboard"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-[2px]">
                    LMS v3.0 — Student Access Point
                </p>
            </div>
        </div>
    );
}