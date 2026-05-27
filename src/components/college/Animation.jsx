// import components
import VisualAnchor from '../utils/VisualAnchor';

// import framer motion
import { motion } from 'framer-motion';

// import icons
import { Sparkles, Target, Building2 } from 'lucide-react';

// animation component for form
export default function Animation() {
    return (
        <div className="hidden lg:flex bg-slate-50/80 p-12 flex-col justify-center items-center relative overflow-hidden border-l border-slate-100">
            {/* BRAND GRADIENT OVERLAY */}
            <div className="absolute inset-0 opacity-15 pointer-events-none bg-linear-to-br from-[#0189c7] via-transparent to-[#0189c7]" />

            {/* SUBTLE MESH GRID */}
            <div
                className="absolute inset-0 opacity-[0.03] 
                bg-[linear-gradient(to_right,#0189c7_1px,transparent_1px),linear-gradient(to_bottom,#0189c7_1px,transparent_1px)] 
                bg-size-[40px_40px]"
            />

            {/* The Connected Nodes Container */}
            <div className="relative z-10 w-full max-w-md mt-10">
                {/* Animated Connection Line */}
                <div className="absolute inset-0 z-0 flex items-center justify-center px-10">
                    <div className="relative w-full h-0.5 bg-slate-200 overflow-hidden">
                        {/* Traveling Pulse Effect */}
                        <motion.div
                            animate={{ x: ['-100%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            className="absolute top-0 w-24 h-full bg-linear-to-r from-transparent via-[#0189c7]/40 to-transparent"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 items-center">
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center gap-3 p-4 bg-white/80 backdrop-blur-md rounded-[28px] border 
                        border-white shadow-xl shadow-slate-200/50"
                    >
                        <div className="p-2.5 bg-[#0189c7]/5 rounded-xl text-[#0189c7]">
                            <Building2 size={18} />
                        </div>

                        <div className="text-center">
                            <span className="text-[9px] font-black uppercase tracking-tighter text-[#0189c7] opacity-60">Phase 1</span>
                            <h5 className="text-[11px] font-bold text-slate-900 leading-tight">COLLEGE</h5>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-20 flex flex-col items-center gap-3 p-5 bg-white rounded-4xl border-2 border-[#0189c7] 
                        shadow-2xl shadow-[#0189c7]/20 scale-110"
                    >
                        <div className="p-3 bg-slate-900 rounded-2xl text-white z-10 shadow-lg">
                            <Sparkles size={20} className="animate-pulse" />
                        </div>

                        <div className="text-center z-10">
                            <span className="text-[9px] font-black uppercase tracking-widest text-[#0189c7]">Phase 2</span>
                            <h5 className="text-xs font-black text-slate-900 mt-1">Krutrim AI</h5>
                        </div>
                    </motion.div>

                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                        className="relative z-10 flex flex-col items-center gap-3 p-4 bg-white/80 backdrop-blur-md rounded-[28px] border
                        border-white shadow-xl shadow-slate-200/50"
                    >
                        <div className="p-2.5 bg-lime-50 rounded-xl text-lime-600">
                            <Target size={18} />
                        </div>

                        <div className="text-center">
                            <span className="text-[9px] font-black uppercase tracking-tighter text-lime-600/60 opacity-60">Phase 3</span>
                            <h5 className="text-[11px] font-bold text-slate-900 leading-tight">CAREER</h5>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Text Lockup */}
            <div className="mt-16 text-center relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="space-y-2"
                >
                    <h4 className="text-xl font-black text-slate-900 tracking-tight">Future-Proof Your Career</h4>
                    <p className="text-slate-500 text-sm font-medium max-w-60 mx-auto leading-relaxed">
                        Get access to our industry-vetted roadmap and project list.
                    </p>
                </motion.div>

                {/* Visual anchor */}
                <VisualAnchor />
            </div>
        </div>
    )
}