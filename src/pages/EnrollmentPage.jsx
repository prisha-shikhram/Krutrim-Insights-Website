// import usestate
import { useState } from 'react';

// import framer motion
import { motion, AnimatePresence } from 'framer-motion';

// import icons
import { Lock, ShieldAlert, ChevronRight, Loader2, ArrowLeft } from 'lucide-react';

// import components
import StudentEnrollment from "../sections/Student/StudentEnrollment";
import Background from '../components/utils/BackgroundEffect';
import BackToHome from '../components/admin/login/BackToHome';

// enrollment page
export default function EnrollmentPage() {
    const [isGateOpen, setIsGateOpen] = useState(false);
    const [gatePass, setGatePass] = useState("");
    const [error, setError] = useState(false);
    const [verifying, setVerifying] = useState(false);

    const handleGateCheck = (e) => {
        e.preventDefault();
        setVerifying(true);
        setError(false);

        const studentGateKey = import.meta.env.VITE_ADMIN_GATE_KEY;

        setTimeout(() => {
            if (gatePass === studentGateKey) {
                setIsGateOpen(true);
            } else {
                setError(true);
                setVerifying(false);
            }
        }, 800);
    };

    return (
        <div className="relative min-h-screen bg-white flex items-center justify-center p-6 overflow-hidden">
            {/* Consistent Grid Background */}
            <Background />

            {/* Back Navigation */}
            <BackToHome />

            <AnimatePresence mode="wait">
                {!isGateOpen ? (
                    <motion.div
                        key="gate"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                        className="relative z-10 w-full max-w-md bg-white/70 backdrop-blur-2xl p-10 rounded-[48px] border border-slate-200 
                        shadow-2xl shadow-blue-900/10 text-center"
                    >
                        {/* Security Pulse Icon */}
                        <div className="relative w-24 h-24 mx-auto mb-8">
                            <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-[#0189c7] rounded-full blur-2xl opacity-20"
                            />

                            <div className="relative w-full h-full bg-white rounded-full flex items-center justify-center border border-slate-100 shadow-inner">
                                <Lock className="text-[#0189c7]" size={36} />
                            </div>
                        </div>

                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Student Gateway</h2>
                        <p className="text-slate-500 text-sm mt-2 mb-10 font-medium">
                            Please enter the enrollment access key provided to you.
                        </p>

                        <form
                            onSubmit={handleGateCheck}
                            className="space-y-4"
                        >
                            <div className="relative group">
                                <Lock
                                    className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#0189c7] transition-colors"
                                    size={20}
                                />

                                <input
                                    required
                                    autoFocus
                                    type="password"
                                    placeholder="ACCESS KEY"
                                    className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-3xl text-slate-900 
                                    text-center tracking-[0.6em] outline-none focus:border-[#0189c7] focus:ring-8 focus:ring-[#0189c7]/5 
                                    transition-all font-bold text-sm"
                                    onChange={(e) => setGatePass(e.target.value)}
                                />
                            </div>

                            {error && (
                                <motion.p
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-red-500 text-[10px] font-black uppercase tracking-widest pt-2"
                                >
                                    Access Denied: Invalid Enrollment Key
                                </motion.p>
                            )}

                            <button
                                disabled={verifying}
                                className="w-full py-4 bg-slate-900 text-white font-bold rounded-3xl hover:bg-[#0189c7] transition-all 
                                flex items-center justify-center gap-2 mt-6 cursor-pointer shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50"
                            >
                                {verifying ? <Loader2 className="animate-spin" /> : <>Verify & Proceed <ChevronRight size={20} /></>}
                            </button>
                        </form>
                    </motion.div>
                ) : (
                    <motion.div
                        key="enrollment"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="relative z-10 w-full"
                    >
                        <StudentEnrollment />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}