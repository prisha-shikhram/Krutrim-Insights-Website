// import motion
import { motion } from 'framer-motion';

// import icons
import { Check } from 'lucide-react';

// content list component
export default function ContentList({ usps }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {usps.map((usp, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex gap-5"
                >
                    {/* Simple Check Icon Accent */}
                    <div className="mt-1 shrink-0">
                        <div className="w-6 h-6 rounded-full bg-[#0189c7]/10 flex items-center justify-center">
                            <Check className="text-[#0189c7]" size={14} strokeWidth={3} />
                        </div>
                    </div>

                    {/* Text Content */}
                    <div className="space-y-2">
                        <h3 className="text-xl font-bold text-gray-900">
                            {usp.title}
                        </h3>

                        <p className="text-gray-500 leading-relaxed text-sm md:text-base">
                            {usp.desc}
                        </p>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}