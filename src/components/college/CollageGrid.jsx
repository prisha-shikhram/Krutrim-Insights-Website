// import motion
import { motion } from 'framer-motion';

// collage grid component
export default function CollageGrid({ seminarImages }) {
    return (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {seminarImages.map((img, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                    className={`relative ${img.span} rounded-3xl overflow-hidden shadow-md border border-gray-100 group transition-all duration-500`}
                >
                    {/* Image Element */}
                    <img
                        src={img.src}
                        alt={img.tagline}
                        className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-102"
                        loading="lazy"
                    />

                    {/* Tint Overlay */}
                    <div
                        className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 opacity-0 group-hover:opacity-100 
                        transition-opacity duration-300 flex flex-col justify-end p-8"
                    />

                    {/* Emerging Hover Text Content */}
                    <div
                        className="absolute inset-0 flex flex-col justify-end p-8 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 
                        group-hover:opacity-100 transition-all duration-300 pointer-events-none"
                    >
                        <p className="text-gray-300 text-xs md:text-sm max-w-md font-medium leading-relaxed">
                            {img.sub}
                        </p>
                    </div>

                    {/* Geometric Frame */}
                    <div
                        className="absolute inset-4 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all 
                        duration-300 pointer-events-none z-20"
                    />
                </motion.div>
            ))}
        </div>
    )
}