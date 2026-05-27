// import motion
import { motion } from 'framer-motion';

// approach cards component
export default function ApproachCards({ approachItems }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-12 mb-24">
            {approachItems.map((item, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex flex-col items-center text-center group"
                >
                    <div
                        className="w-16 h-16 bg-[#0189c7]/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#0189c7]/10 
                        transition-colors duration-300"
                    >
                        {item.icon}
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>

                    <p className="text-gray-500 text-sm md:text-base leading-relaxed px-4">
                        {item.desc}
                    </p>
                </motion.div>
            ))}
        </div>
    )
}