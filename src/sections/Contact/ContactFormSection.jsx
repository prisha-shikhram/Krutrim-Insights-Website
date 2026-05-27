// import usestate
import { useState } from 'react';

// components
import SectionHeader from "../../components/utils/SectionHeader";
import Map from '../../components/contact/Map';
import SuccessUI from '../../components/contact/SuccessUI';

// import icons
import { Send, Phone, Mail, User, BookOpen, Loader2 } from 'lucide-react';
import { FiChevronDown } from "react-icons/fi";

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// contact form section
export default function ContactFormSection() {
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    // form state
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        course: "Agentic AI with Data Analysis"
    });

    // handle submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Sanitize Data
        const sanitizedData = {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim().toLowerCase(),
            course: formData.course
        };

        // Client-side Validation
        if (!sanitizedData.name || !sanitizedData.phone || !sanitizedData.email) {
            return toast.error("Please fill in all fields correctly.");
        }

        setLoading(true);

        // Use toast.promise for better UX
        const submission = fetch("https://faqqb54ivb.execute-api.ap-south-1.amazonaws.com/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(sanitizedData)
        }).then(async (res) => {
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || "Something went wrong");
            return data;
        });

        toast.promise(submission, {
            loading: 'Sending your message...',
            success: () => {
                setSubmitted(true);
                setFormData({
                    name: "",
                    phone: "",
                    email: "",
                    course: "Agentic AI with Data Analysis"
                });
                return "Message sent successfully! 🚀";
            },
            error: (err) => `Error: ${err.message}`,
        });

        try {
            await submission;
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section
            id="send-message"
            className="bg-white py-24 px-6 scroll-mt-10"
        >
            {/* Toast Container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="mx-auto max-w-7xl">
                {/* Section header */}
                <SectionHeader
                    title="Send us a"
                    highlight="Message"
                    description="Have questions about our training programs or AI solutions? Fill out the form below and our team will contact you shortly."
                />

                {/* Form container */}
                <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* FORM */}
                    <div className="relative p-8 md:p-10 rounded-[40px] bg-slate-50 border border-slate-100 shadow-sm">
                        {!submitted ? (
                            <form
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                {/* Name + Phone */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>

                                        <div className="relative">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                            <input
                                                required
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                placeholder="Rahul Sharma"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#0189c7]
                                                focus:ring-4 focus:ring-[#0189c7]/5 outline-none"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Phone Number</label>

                                        <div className="relative">
                                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                            <input
                                                required
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+91 00000 00000"
                                                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#0189c7]
                                                focus:ring-4 focus:ring-[#0189c7]/5 outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>

                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                                        <input
                                            required
                                            type="email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            placeholder="example@gmail.com"
                                            className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#0189c7]
                                            focus:ring-4 focus:ring-[#0189c7]/5 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Course */}
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">
                                        Course Interested In
                                    </label>

                                    <div className="relative group">
                                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />

                                        <select
                                            value={formData.course}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            onChange={(e) => {
                                                setFormData({ ...formData, course: e.target.value });
                                                e.target.blur();
                                            }}
                                            className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 
                                            focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 
                                            outline-none bg-white cursor-pointer appearance-none transition-all"
                                        >
                                            <option>Agentic AI with Data Analysis</option>
                                            <option>Data Analysis powered by Next GenAI</option>
                                            <option>Web Development with AI</option>
                                            <option>AI for Business and Management</option>
                                        </select>

                                        <div
                                            className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 
                                            transition-transform duration-300 ease-in-out
                                            ${isFocused ? 'rotate-180 text-[#0189c7]' : 'rotate-0'}`}
                                        >
                                            <FiChevronDown size={20} />
                                        </div>
                                    </div>
                                </div>

                                {/* Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all text-white cursor-pointer
                                    ${loading ? "bg-slate-400 cursor-not-allowed" :
                                            "bg-[#0189c7] hover:scale-[1.02] active:scale-95text-white shadow-xl shadow-blue-100"}`}
                                >
                                    {loading ? (
                                        <>
                                            Sending...
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        </>
                                    ) : (
                                        <>
                                            Send Message <Send className="w-5 h-5" />
                                        </>
                                    )}
                                </button>

                                <p className="text-center text-xs text-slate-400">Our team will contact you shortly.</p>
                            </form>
                        ) : (
                            /* SUCCESS UI */
                            <SuccessUI setSubmitted={setSubmitted} />
                        )}
                    </div>

                    {/* RIGHT SIDE */}
                    <Map />
                </div>
            </div>
        </section>
    );
}