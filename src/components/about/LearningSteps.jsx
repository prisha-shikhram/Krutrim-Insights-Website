// import motion
import { motion } from 'framer-motion';

// learning steps component
export default function LearningSteps({ steps }) {
    return (
        <div className="relative mt-20">
            {/* Horizontal Dashed Line */}
            <div className="hidden lg:block absolute top-4 left-[10%] right-[10%] h-0.5 border-t-2 border-dashed border-gray-200 z-0" />

            {/* Steps Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 relative z-10">
                {steps.map((step, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 }}
                        className="flex flex-col items-center text-center group"
                    >
                        {/* Step Number Circle */}
                        <div
                            className="w-8 h-8 rounded-full bg-[#0189c7] text-white flex items-center justify-center font-bold text-sm mb-6 
                            shadow-lg shadow-sky-100 group-hover:scale-110 transition-transform duration-300"
                        >
                            {step.number}
                        </div>

                        {/* Icon Container */}
                        <div
                            className="w-20 h-20 bg-gray-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0189c7]/10 
                            transition-colors duration-300"
                        >
                            {step.icon}
                        </div>

                        {/* Text Content */}
                        <div className="space-y-3">
                            <h3 className="text-xl font-bold text-gray-900">
                                {step.title}
                            </h3>

                            <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4">
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}