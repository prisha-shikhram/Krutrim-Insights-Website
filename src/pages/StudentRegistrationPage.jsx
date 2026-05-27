// import hooks
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// import toast
import toast, { Toaster } from 'react-hot-toast';

// import components
import Background from "../components/utils/BackgroundEffect";
import Header from "../sections/Registration/Header";
import RegistrationFields from "../sections/Registration/RegistrationFields";

// primary color
const PRIMARY = "#0189c7";

// student registration page
export default function StudentRegistration() {
    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        college: "",
        course: "",
        passingYear: ""
    });

    const [loading, setLoading] = useState(false);
    const [focused, setFocused] = useState(null);
    const navigate = useNavigate();

    // handle change in input
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // register student request
    const registerStudentRequest = async () => {
        const API_URL = "https://djs7erq5b0.execute-api.ap-south-1.amazonaws.com/register"

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout for low network

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
                signal: controller.signal
            });

            const data = await response.json();
            clearTimeout(timeoutId);

            if (!response.ok) {
                // Throwing error allows toast.promise to catch it and show error message
                throw new Error(data.message || "Registration failed");
            }

            return data;
        } catch (err) {
            if (err.name === 'AbortError') throw new Error("Request timed out. Try again.");
            throw err;
        }
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);

        toast.promise(
            registerStudentRequest(),
            {
                loading: 'Verifying details...',
                success: (data) => {
                    setLoading(false);
                    setFormData({
                        fullName: "",
                        phone: "",
                        college: "",
                        course: "",
                        passingYear: ""
                    });
                    return <b>{data.message || "Registered Successfully!"}</b>;
                },
                error: (err) => {
                    setLoading(false);
                    return <b>{err.message}</b>;
                },
            },
            {
                style: {
                    minWidth: '250px',
                    borderRadius: '16px',
                    background: '#ffffff',
                    color: PRIMARY,
                    border: `1px solid #f0f9ff`,
                    boxShadow: '0 10px 30px rgba(1, 137, 199, 0.1)',
                    padding: '16px',
                    fontSize: '14px',
                    fontWeight: '500',
                },
                success: {
                    duration: 5000,
                    iconTheme: {
                        primary: PRIMARY,
                        secondary: '#fff',
                    },
                },
                error: {
                    duration: 5000,
                    style: {
                        color: '#ef4444',
                        border: '1px solid #fee2e2'
                    },
                    iconTheme: {
                        primary: '#ef4444',
                        secondary: '#fff',
                    },
                }
            }
        );
    };

    const inputCls = "w-full bg-white border rounded-xl pl-11 pr-4 py-3 text-gray-800 placeholder-gray-400 outline-none transition-all duration-200 text-sm appearance-none";
    const labelCls = "block text-xs font-semibold uppercase tracking-widest mb-2 transition-colors duration-200";

    return (
        <div
            className="min-h-screen w-full bg-white flex items-center justify-center relative py-12 px-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
        >
            {/* toaster container */}
            <Toaster position="top-center" reverseOrder={false} />

            {/* background component */}
            <Background />

            <div className="relative z-10 w-full max-w-lg animate-in fade-in slide-in-from-bottom-4 duration-700">
                <Header PRIMARY={PRIMARY} />

                <form
                    onSubmit={handleSubmit}
                    className="rounded-3xl p-8 flex flex-col gap-5 bg-white shadow-2xl border border-blue-50"
                    style={{ boxShadow: "0 0 60px rgba(1,137,199,0.05), 0 20px 50px rgba(0,0,0,0.04)" }}
                >
                    <RegistrationFields
                        labelCls={labelCls}
                        inputCls={inputCls}
                        formData={formData}
                        handleChange={handleChange}
                        focused={focused}
                        setFocused={setFocused}
                        PRIMARY={PRIMARY}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 rounded-xl text-white font-bold text-xs tracking-widest transition-all duration-300 active:scale-[0.98] 
                        mt-4 uppercase cursor-pointer disabled:cursor-not-allowed"
                        style={{
                            background: `linear-gradient(90deg, ${PRIMARY}, #00c6ff)`,
                            boxShadow: "0 8px 25px rgba(1,137,199,0.25)",
                            opacity: loading ? 0.7 : 1
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p className="text-center text-gray-400 text-[10px] mt-8 uppercase tracking-[2px]">
                    LMS v3.0 — Student Registration
                </p>
            </div>
        </div>
    );
}