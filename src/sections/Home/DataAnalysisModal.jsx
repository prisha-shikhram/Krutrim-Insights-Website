// import framer motion
import { motion, AnimatePresence } from 'framer-motion';

// import link
import { Link } from 'react-router-dom';

// tech stack
const TECH_STACK = [
    "Python", "Pandas ", "NumPy", "Matplotlib", "Seaborn", "Plotly",
    "SQL / MySQL", "MongoDB", "Power BI", "Excel",
    "AI Prompting", "Build an AI Agent"
];

// features
const FEATURES = [
    { title: "Pipeline", desc: "Training to Internship" },
    { title: "AI Built-In", desc: "Prompting + Agents" },
    { title: "Small Cohort", desc: "8 Students Only" }
];

// data analysis modal
export default function DataAnalysisModal({ isOpen, onClose }) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
                    />

                    {/* Modal Content Window */}
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 15 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 15 }}
                        transition={{ type: "spring", duration: 0.4, bounce: 0 }}
                        className="relative w-full max-w-3xl h-full max-h-[calc(100vh-2rem)] sm:max-h-[calc(100vh-4rem)] rounded-3xl 
                        overflow-hidden shadow-2xl text-white border border-white/10 flex flex-col"
                        style={{ backgroundColor: '#0189c7' }}
                    >
                        {/* Statically positioned header banner bar keeping close accessible */}
                        <div className="absolute top-0 inset-x-0 h-14 z-20 flex items-center justify-end px-4 pointer-events-none">
                            <button
                                onClick={onClose}
                                className="text-white/70 hover:text-white text-3xl font-light transition-colors cursor-pointer pointer-events-auto"
                                aria-label="Close modal"
                            >
                                &times;
                            </button>
                        </div>

                        {/* Scrollable Container Wrapper */}
                        <div className="overflow-y-auto flex-1 p-6 pt-12 md:p-10 md:pt-10 no-scrollbar">
                            {/* Badges / Header metrics */}
                            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 pr-8">
                                <span className="bg-orange-500 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full animate-pulse">
                                    Limited Seats — Summer Batch
                                </span>

                                <div className="bg-white/10 px-3 py-1.5 rounded-xl text-center border border-white/10 min-w-16">
                                    <span className="text-xl font-black text-orange-400 block leading-none">8</span>
                                    <span className="text-[8px] uppercase font-bold tracking-tight text-white/80">Seats Only</span>
                                </div>
                            </div>

                            {/* Program Title branding */}
                            <h2 className="text-2xl md:text-4xl font-black mb-2 tracking-tight leading-tight">
                                Rapid Data Analysis & <br className="hidden sm:block" />Agentic AI Program
                                <span className="text-xs md:text-sm font-medium opacity-80 block sm:inline sm:ml-2">(2 Months)</span>
                            </h2>

                            <p className="text-white/80 text-xs md:text-sm mb-6 font-medium tracking-wide">
                                Real training. Real tools. Real stipend. Walk into your internship confident.
                            </p>

                            {/* Guaranteed Stipend Accent Strip */}
                            <div
                                className="bg-amber-400 text-slate-900 font-extrabold text-center py-3 px-4 rounded-xl shadow-md uppercase tracking-wider
                                border border-white text-xs md:text-sm mb-6"
                            >
                                Guaranteed Stipend Internship Included
                            </div>

                            {/* Stack Array Matrix */}
                            <div className="mb-6">
                                <h3 className="text-[10px] uppercase font-bold tracking-widest text-orange-300 mb-3">
                                    The Core Tech Stack
                                </h3>

                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                                    {TECH_STACK.map((tech, i) => (
                                        <div
                                            key={i}
                                            className="bg-white/10 border border-white/5 rounded-xl px-3 py-2.5 text-xs font-bold hover:bg-white/20 
                                            transition-all flex items-center gap-1.5"
                                        >
                                            <span className="text-orange-400">▹</span> {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Program features section */}
                            <div className="grid grid-cols-3 gap-2 border-t border-b border-white/10 py-4 mb-6">
                                {FEATURES.map((feat, i) => (
                                    <div
                                        key={i}
                                        className="text-center"
                                    >
                                        <h4 className="text-orange-300 text-[10px] font-black uppercase mb-0.5 tracking-wider">{feat.title}</h4>
                                        <p className="text-[10px] md:text-xs opacity-80 font-medium leading-tight">{feat.desc}</p>
                                    </div>
                                ))}
                            </div>

                            {/* CTA Link Route trigger */}
                            <Link
                                to="/contact#send-message"
                                onClick={onClose}
                            >
                                <button
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-black py-4 rounded-xl shadow-lg transition-all 
                                    transform active:scale-[0.99] uppercase tracking-widest text-xs md:text-sm cursor-pointer"
                                >
                                    Contact Us & Secure Your Seat
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}