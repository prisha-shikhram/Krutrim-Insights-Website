// import usestate
import { useState } from 'react';

// import framer motion
import { motion, AnimatePresence } from 'framer-motion';

// data promo strip component
export default function DataPromoStrip({ onOpenModal }) {
    const [isVisible, setIsVisible] = useState(true);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="absolute top-20 max-sm:top-13 w-full text-white z-49 overflow-hidden shadow-md"
                    style={{ backgroundColor: '#0189c7' }}
                >
                    <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-row items-center justify-between gap-3 text-[11px] sm:text-xs md:text-sm">
                        {/* Text and Tag Container (Stays on a single line) */}
                        <div className="flex flex-row items-center gap-2 min-w-0 overflow-hidden">
                            <span className="bg-orange-500 font-black px-2 py-0.5 rounded text-[9px] uppercase tracking-wider animate-pulse shrink-0">
                                <span className="inline sm:hidden">New</span>
                                <span className="hidden sm:inline">Limited Seats</span>
                            </span>

                            <span className="font-medium tracking-wide truncate">
                                Rapid Data Analysis & Agentic AI Program (2 Months) — <strong className="font-extrabold text-amber-300">
                                    Guaranteed Stipend Internship
                                </strong>
                            </span>
                        </div>

                        {/* Interactive Buttons Container (Stays on a single line) */}
                        <div className="flex items-center gap-3 shrink-0">
                            <button
                                onClick={onOpenModal}
                                className="bg-white text-[#0189c7] font-black px-3 sm:px-5 py-1 rounded-full text-[10px] sm:text-[11px] uppercase tracking-wider 
                                hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
                            >
                                Learn More
                            </button>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-white/70 hover:text-white font-bold text-xl sm:text-2xl focus:outline-none px-1 cursor-pointer transition-colors leading-none"
                                aria-label="Dismiss banner"
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}