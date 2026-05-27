// import usestate
import { useState } from 'react';

// import framer motion
import { motion, AnimatePresence } from 'framer-motion';

// import icons
import { ArrowRight, Code2 } from 'lucide-react';

// Project Card component
export default function ProjectCard({ projects }) {
    // Track which card is currently expanded
    const [expandedIdx, setExpandedIdx] = useState(null);

    const toggleExpand = (idx) => {
        setExpandedIdx(expandedIdx === idx ? null : idx);
    };

    return (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
                const isExpanded = expandedIdx === idx;

                return (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.05 }}
                        className="group relative flex flex-col bg-white rounded-[2.5rem] border border-slate-100 overflow-hidden hover:shadow-2xl 
                        hover:shadow-[#0189c7]/10 transition-all duration-500"
                    >
                        {/* Image Container */}
                        <div className="relative h-64 w-full overflow-hidden">
                            <img
                                src={project.img}
                                alt={project.title}
                                className={`w-full h-full object-cover transition-all duration-700
                                ${isExpanded ? 'scale-110 blur-sm brightness-50' : 'group-hover:scale-110'}`}
                            />

                            {/* Floating Badge */}
                            <div className="absolute top-4 left-4 z-10">
                                <span
                                    className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-[#0189c7] text-[10px] font-bold uppercase 
                                    tracking-wider shadow-sm"
                                >
                                    {project.type}
                                </span>
                            </div>

                            {/* Overlay Description (Visible only when expanded) */}
                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 p-8 flex flex-col justify-center bg-[#0189c7]/20 backdrop-blur-md"
                                    >
                                        <p className="text-white text-sm leading-relaxed font-medium">
                                            {project.description}
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Content Area */}
                        <div className="p-8 flex flex-col justify-between grow">
                            <div>
                                <h4 className={`text-xl font-bold transition-colors duration-300
                                ${isExpanded ? 'text-[#0189c7]' : 'text-slate-900'}`}>
                                    {project.title}
                                </h4>
                            </div>

                            <div
                                onClick={() => toggleExpand(idx)}
                                className="mt-4 flex items-center justify-between cursor-pointer"
                            >
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <Code2 size={16} />
                                    <span>{isExpanded ? 'Hide Details' : 'View Details'}</span>
                                </div>

                                <button
                                    onClick={() => toggleExpand(idx)}
                                    className={`h-10 w-10 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer 
                                        ${isExpanded
                                            ? 'bg-[#0189c7] text-white shadow-lg shadow-[#0189c7]/30'
                                            : 'bg-slate-50 text-slate-400 hover:bg-[#0189c7] hover:text-white'
                                        }`}
                                >
                                    <motion.div
                                        animate={{ rotate: isExpanded ? 90 : 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <ArrowRight size={20} />
                                    </motion.div>
                                </button>
                            </div>
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
}