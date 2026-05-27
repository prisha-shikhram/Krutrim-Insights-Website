// import motion
import { motion } from 'framer-motion';

// step grid component
export default function StepGrid({ steps }) {
    return (
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group flex flex-col bg-white p-8 rounded-4xl border border-gray-100 shadow-sm hover:shadow-xl 
                    hover:border-[#0189c7]/20 transition-all duration-300"
                >
                    {/* Step Number Badge */}
                    <div className="flex justify-between items-center mb-6">
                        <div
                            className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-gray-100 shadow-inner 
                            group-hover:bg-[#0189c7]/5 group-hover:border-[#0189c7]/20 transition-all duration-300"
                        >
                            <step.icon className="w-7 h-7 text-[#0189c7]" />
                        </div>

                        <span className="text-4xl font-black text-slate-100 group-hover:text-[#0189c7]/10 select-none transition-colors duration-300">
                            0{idx + 1}
                        </span>
                    </div>

                    {/* Step Text Content */}
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0189c7] transition-colors duration-300">
                        {step.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed font-medium">
                        {step.description}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}