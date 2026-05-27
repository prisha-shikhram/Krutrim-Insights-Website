// import usestate
import { useState } from 'react';

// import icons
import { Sparkles } from 'lucide-react';

// import components
import Animation from '../../components/college/Animation';
import Success from '../../components/college/Success';
import CollegeForm from '../../components/college/CollegeForm';

// import react hot toast
import toast, { Toaster } from 'react-hot-toast';

// college application form
export default function CollegeApplicationForm({ collegeName = "Our Partner College" }) {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [isCourseOpen, setIsCourseOpen] = useState(false);

    // form state for college
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        rollNumber: "",
        department: "",
        course: "BCA",
        year: ""
    });

    // handle change
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        const { name, phone, email, rollNumber, department } = formData;

        // Beautiful Error Toasts
        if (!name?.trim() || !phone?.trim() || !email?.trim() || !rollNumber?.trim() || !department?.trim()) {
            toast.error("Please fill in all required fields.");
            return;
        }

        setLoading(true);

        const sanitizedData = {
            name: name.trim(),
            phone: phone.trim(),
            email: email.trim().toLowerCase(),
            rollNumber: rollNumber.trim(),
            department: department.trim(),
            course: formData.course,
            year: formData.year?.toString().trim() || "N/A",
            collegeName: collegeName.trim()
        };

        try {
            const res = await fetch("https://qvkc8t5vsg.execute-api.ap-south-1.amazonaws.com/apply", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitizedData)
            });

            const text = await res.text();
            let data = {};
            try { data = JSON.parse(text); } catch (p) { console.error(p); }

            if (res.ok) {
                toast.success("Application submitted successfully!");
                setTimeout(() => setSubmitted(true), 800);
            } else {
                if (res.status === 429) {
                    toast.error("Server busy. Please try again in a moment.");
                } else {
                    toast.error(data.message || "Something went wrong.");
                }
            }
        } catch (err) {
            toast.error("Network error. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="bg-white py-20 px-6">
            {/* Toast Container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            <div className="mx-auto max-w-7xl bg-slate-50 rounded-[48px] overflow-hidden border border-slate-100 shadow-sm grid grid-cols-1 lg:grid-cols-2 mt-10">
                {/* LEFT: FORM SECTION */}
                <div className="py-8 px-8 md:px-12 lg:py-10 lg:px-16 flex flex-col justify-center bg-white">
                    {!submitted ? (
                        <>
                            <header className="mb-10">
                                <div
                                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0189c7]/10 text-[#0189c7] 
                                    text-[10px] font-black uppercase tracking-widest mb-4"
                                >
                                    <Sparkles size={12} /> Enrollment 2026
                                </div>

                                <h2 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">
                                    Register to build AI agents for
                                    <span className="text-[#0189c7]"> {collegeName}</span>
                                </h2>
                            </header>

                            {/* form */}
                            <CollegeForm
                                handleSubmit={handleSubmit}
                                handleChange={handleChange}
                                formData={formData}
                                isCourseOpen={isCourseOpen}
                                setIsCourseOpen={setIsCourseOpen}
                                loading={loading}
                            />
                        </>
                    ) : (
                        // Success UI
                        <Success collegeName={collegeName} />
                    )}
                </div>

                {/* RIGHT: ANIMATION SECTION */}
                <Animation />
            </div>
        </section>
    );
}