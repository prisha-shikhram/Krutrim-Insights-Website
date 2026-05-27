// import motion
import { motion } from 'framer-motion';

// visual card component
export default function VisualCard({ diffs }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
            {diffs.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#0189c7]/40 
                    transition-all duration-300 group"
                >
                    {/* Icon Container */}
                    <div
                        className="w-14 h-14 bg-gray-50 rounded-xl flex items-center justify-center text-gray-700 
                        group-hover:bg-[#0189c7]/10 group-hover:text-[#0189c7] transition-colors duration-300 mb-6"
                    >
                        {item.icon}
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                    </h3>

                    <p className="text-gray-500 text-sm leading-relaxed">
                        {item.desc}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}