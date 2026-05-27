// import motion
import { motion } from 'framer-motion';

// stats grid component
export default function StatsGrid({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {stats.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative group p-8 rounded-3xl bg-white border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-xl 
                    transition-all duration-500"
                >
                    {/* Glassmorphism Background Decoration */}
                    <div
                        className="absolute inset-0 bg-linear-to-br from-[#0189c7]/5 to-transparent opacity-0 group-hover:opacity-100 
                        transition-opacity rounded-3xl"
                    />

                    <div className="relative z-10">
                        <div className="mb-6 w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                            {item.icon}
                        </div>

                        <div className="flex flex-col gap-2">
                            <h3 className="text-5xl font-extrabold text-[#0189c7] tracking-tight">
                                {item.value}
                            </h3>

                            <p className="text-gray-900 font-semibold text-lg leading-snug">
                                {item.context}
                            </p>

                            <span className="text-xs text-gray-400 uppercase tracking-widest mt-4">
                                Source: {item.source}
                            </span>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}