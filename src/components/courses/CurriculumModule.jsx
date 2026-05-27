// CurriculumModule.jsx
import { motion } from 'framer-motion';

// curriculum Module
export default function CurriculumModule({ index, title, isLast }) {
    const isEven = index % 2 === 0;

    return (
        <div className="relative flex justify-center items-stretch w-full pb-12 md:pb-16">
            {/* THE VERTICAL LINE */}
            <div className="absolute h-full w-0.5 bg-gray-200 left-5 md:left-1/2 -translate-x-1/2 top-0 z-0">
                {!isLast && (
                    <div className="h-full w-full bg-linear-to-b from-[#0189c7] to-gray-200 opacity-30" />
                )}
            </div>

            {/* THE CONTENT ROW */}
            <div
                className={`flex w-full items-start md:items-center justify-between gap-8 
                ${isEven ? "md:flex-row" : "md:flex-row-reverse"} flex-row`}
            >
                {/* CARD SIDE */}
                <motion.div
                    initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="w-full md:w-[45%] ml-14 md:ml-0"
                >
                    <div
                        className="group relative bg-white/80 backdrop-blur-sm p-6 md:p-8 rounded-4xl border border-gray-100 shadow-sm 
                        hover:shadow-xl hover:border-[#0189c7]/30 transition-all duration-500 overflow-hidden"
                    >
                        {/* Hover Glow */}
                        <div className="absolute -right-10 -top-10 w-32 h-32 bg-[#0189c7]/5 rounded-full blur-3xl group-hover:bg-[#0189c7]/10 transition-colors" />

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-3">
                                <span className="text-[#0189c7] font-black text-[10px] tracking-[0.2em] uppercase">
                                    Module {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                </span>

                                <div className="h-px w-8 bg-[#0189c7]/20" />
                            </div>

                            <h3 className="text-xl md:text-2xl font-semibold sm:font-bold text-gray-900 group-hover:text-[#0189c7] transition-colors leading-tight">
                                {title}
                            </h3>
                        </div>
                    </div>
                </motion.div>

                {/* MIDDLE NODE */}
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white border-[6px] border-gray-50 shadow-xl">
                        <div className={`h-2.5 w-2.5 rounded-full bg-[#0189c7] ${!isLast ? 'animate-pulse' : ''}`} />
                    </div>
                </div>

                {/* EMPTY SIDE FOR SPACING */}
                <div className="hidden md:block md:w-[45%]" />
            </div>
        </div>
    );
}