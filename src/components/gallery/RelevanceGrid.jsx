// import motion
import { motion } from 'framer-motion';

// relevance grid section for gallery page
export default function RelevanceGrid({ relevanceItems }) {
    return (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relevanceItems.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group p-8 rounded-3xl border border-gray-100 bg-white/50 hover:bg-white hover:shadow-xl 
                    hover:shadow-[#0189c7]/5 transition-all duration-300"
                >
                    {/* Icon Container */}
                    <div
                        className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-sm border border-gray-100 
                        group-hover:border-[#0189c7]/30 transition-colors"
                    >
                        <item.icon className="w-7 h-7 text-[#0189c7]" />
                    </div>

                    {/* Text Content */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#0189c7] transition-colors">
                        {item.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {item.description}
                    </p>
                </motion.div>
            ))}

            {/* CTAs */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="p-8 rounded-3xl bg-[#0189c7] text-white flex flex-col justify-center items-center text-center shadow-lg"
            >
                <h3 className="text-2xl font-bold mb-2">Ready to Start?</h3>

                <p className="text-blue-50/80 text-sm mb-6">
                    The best time to build was yesterday. The second best time is now.
                </p>

                <div className="h-1 w-12 bg-white/30 rounded-full" />
            </motion.div>
        </div>
    )
}