// import components
import SectionHeader from "../../components/utils/SectionHeader";
import CurriculumModule from '../../components/courses/CurriculumModule';

// import motion
import { motion } from 'framer-motion';

// curriculum section
export default function CurriculumSection({ modules }) {
    return (
        <section
            id="curriculum"
            className="relative bg-gray-50 py-24 px-6 scroll-mt-10 overflow-hidden"
        >
            {/* Decorative Gradient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl opacity-40 pointer-events-none">
                <div className="absolute inset-0 bg-radial from-[#0189c7]/20 to-transparent blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-6xl z-10">
                {/* Section Heading */}
                <SectionHeader
                    title="Comprehensive"
                    highlight="Curriculum"
                    description="From foundations to production-grade agents. A step-by-step journey designed to turn you into a specialist."
                />

                {/* Curriculum Timeline */}
                <div className="relative mt-24">
                    {modules.map((module, idx) => (
                        <CurriculumModule
                            key={idx}
                            index={idx}
                            title={module}
                            isLast={idx === modules.length - 1}
                        />
                    ))}

                    {/* Final Anchor Point */}
                    <div className="flex justify-start md:justify-center mt-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="ml-2.5 md:ml-0 px-6 py-2 rounded-full bg-white border border-[#0189c7]/20 text-[10px] font-black 
                            text-[#0189c7] uppercase tracking-[0.3em] shadow-lg shadow-[#0189c7]/5"
                        >
                            Program Completion
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}