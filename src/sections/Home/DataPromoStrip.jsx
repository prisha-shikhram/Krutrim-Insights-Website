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
                    className="absolute top-20 max-sm:top-18 w-full text-white z-49 overflow-hidden shadow-md"
                    style={{ backgroundColor: '#0189c7' }}
                >
                    <div className="max-w-7xl mx-auto px-4 py-2.5 sm:py-3 flex flex-col md:flex-row items-center justify-between gap-3 text-xs md:text-sm">
                        
                        {/* Text and Tag Container */}
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left w-full md:w-auto">
                            <span className="bg-orange-500 font-black px-2.5 py-1.5 max-sm:py-0.5 rounded text-[9px] uppercase tracking-wider animate-pulse shrink-0">
                                Limited Seats
                            </span>

                            <span className="font-medium tracking-wide leading-relaxed">
                                Rapid Data Analysis & Agentic AI Program (2 Months) — <strong className="font-extrabold text-amber-300">Guaranteed Stipend Internship</strong>
                            </span>
                        </div>

                        {/* Interactive Buttons Container */}
                        <div className="flex items-center justify-center gap-4 shrink-0 w-full md:w-auto border-t border-white/10 pt-2 md:pt-0 md:border-none">
                            <button
                                onClick={onOpenModal}
                                className="bg-white text-[#0189c7] font-black px-5 py-1.5 rounded-full text-[11px] uppercase tracking-wider 
                                hover:bg-orange-500 hover:text-white transition-all transform active:scale-95 shadow-sm cursor-pointer whitespace-nowrap"
                            >
                                Learn More
                            </button>

                            <button
                                onClick={() => setIsVisible(false)}
                                className="text-white/70 hover:text-white font-bold text-2xl focus:outline-none px-1 cursor-pointer transition-colors"
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