// import motion
import { motion } from 'framer-motion';

// impact grid component
export default function ImpactGrid({ impactItems }) {
    return (
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactItems.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group flex flex-col items-center text-center p-6 rounded-3xl border border-transparent shadow-sm 
                    bg-white/50 hover:border-gray-100 hover:bg-white/80 transition-all duration-300"
                >
                    {/* Icon Container*/}
                    <div
                        className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 border border-gray-100 shadow-inner 
                        group-hover:bg-[#0189c7]/5 group-hover:border-[#0189c7]/20 transition-all duration-300 mb-5"
                    >
                        <item.icon className="w-6 h-6 text-[#0189c7]" />
                    </div>

                    {/* Impact Text Content */}
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0189c7] transition-colors duration-300">
                        {item.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed max-w-xs font-medium">
                        {item.description}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}