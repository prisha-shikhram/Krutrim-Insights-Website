// import motion
import { motion } from 'framer-motion';

// step process component
export default function StepProcess({ engagementSteps }) {
    return (
        <div className="relative mb-20">
            {/* Horizontal Dashed Line */}
            <div className="hidden lg:block absolute top-4 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                {engagementSteps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className="flex flex-col items-center text-center group"
                    >
                        {/* Step Marker */}
                        <div
                            className="w-8 h-8 rounded-full bg-[#0189c7] text-white text-[10px] font-bold flex items-center justify-center 
                            mb-4 shadow-lg shadow-sky-100"
                        >
                            {step.number}
                        </div>

                        {/* Step Icon Circle */}
                        <div
                            className="w-20 h-20 bg-white border border-gray-100 shadow-sm rounded-full flex items-center justify-center
                            mb-6 group-hover:border-[#0189c7]/30 group-hover:shadow-md transition-all"
                        >
                            {step.icon}
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h4>

                        <p className="text-gray-500 text-sm md:text-base leading-relaxed px-6 md:px-2">
                            {step.desc}
                        </p>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}