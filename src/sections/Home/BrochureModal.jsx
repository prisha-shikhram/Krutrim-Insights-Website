// import hooks
import { useState, useEffect } from 'react';

// import framer motion
import { motion, AnimatePresence } from 'framer-motion';

// import icons
import { X, Sparkles } from 'lucide-react';

// import react hot toast
import toast from 'react-hot-toast';

// brochure links
const BROCHURE_LINKS = {
    "Agentic AI with Data Analysis": "/brochures/agentic-ai.pdf",
    "Data Analysis powered by Next GenAI": "/brochures/data-analysis.pdf",
    "Web Development with AI": "/brochures/web-dev.pdf",
    "AI for Business and Management": "/brochures/business-ai.pdf"
};

// import components
import BrouchureAnimation from '../../components/home/BrouchureAnimation';
import DownloadBrochure from '../../components/home/DownloadBrochure';
import BrochureForm from '../../components/home/BrochureForm';

// brochure modal component
export default function BrochureModal({ isOpen, onClose }) {
    const [step, setStep] = useState('form');
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '', phone: '', email: '', course: 'Agentic AI with Data Analysis', role: 'Student'
    });

    // Reset modal state when closed
    useEffect(() => {
        if (!isOpen) {
            const timer = setTimeout(() => setStep('form'), 300);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        // Sanitize Data
        const sanitizedData = {
            name: formData.name.trim(),
            phone: formData.phone.trim(),
            email: formData.email.trim().toLowerCase(),
            course: formData.course,
            role: formData.role
        };

        // Client-side validation check
        if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.phone) {
            return toast.error("Please fill in all details.");
        }

        setLoading(true);
        const loadToast = toast.loading("Preparing your brochure...");

        try {
            const res = await fetch("https://23ft9h4js9.execute-api.ap-south-1.amazonaws.com/brochure", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(sanitizedData)
            });

            if (res.ok) {
                toast.success("Details verified! Your download is ready.", { id: loadToast });
                setStep('success');
            } else {
                const errorData = await res.json();
                toast.error(errorData.message || "Something went wrong.", { id: loadToast });
            }

        } catch (error) {
            console.error(error);
            toast.error("Network error. Please try again.", { id: loadToast });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    {/* OVERLAY */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-900/50 backdrop-blur-xl"
                    />

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-6xl bg-white rounded-[40px] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 mt-20"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            aria-label="Close modal"
                            className="absolute top-6 right-6 p-2 bg-slate-50 hover:bg-slate-200 rounded-full z-30 transition-all active:scale-90 cursor-pointer"
                        >
                            <X className="w-5 h-5 text-slate-500" />
                        </button>

                        {/* LEFT: FORM SECTION */}
                        <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                            {step === 'form' ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <header className="mb-8">
                                        <div
                                            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0189c7]/10 text-[#0189c7] 
                                            text-[10px] font-black uppercase tracking-widest mb-3"
                                        >
                                            <Sparkles size={12} className="animate-pulse" /> Curriculum Access
                                        </div>

                                        <h3 className="text-3xl font-black text-slate-900 tracking-tight">Get the Brochure</h3>
                                        <p className="text-slate-500 mt-2 text-sm font-medium">Complete your profile to unlock the full syllabus.</p>
                                    </header>

                                    {/* Form */}
                                    <BrochureForm
                                        handleSubmit={handleSubmit}
                                        handleInputChange={handleInputChange}
                                        loading={loading}
                                        BROCHURE_LINKS={BROCHURE_LINKS}
                                    />
                                </motion.div>
                            ) : (
                                // download brochure
                                <DownloadBrochure
                                    BROCHURE_LINKS={BROCHURE_LINKS}
                                    formData={formData}
                                />
                            )}
                        </div>

                        {/* RIGHT: ANIMATION SECTION */}
                        <BrouchureAnimation />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}