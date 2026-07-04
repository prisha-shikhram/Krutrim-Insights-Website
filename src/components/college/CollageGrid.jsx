// import React state
import { useState } from 'react';

// import motion
import { motion } from 'framer-motion';

// collage grid component
export default function CollageGrid({ seminarImages }) {
    // Track active image index for mobile toggle behavior
    const [activeIndex, setActiveIndex] = useState(null);

    // handle click on mobile devices
    const handleImageClick = (idx) => {
        if (window.innerWidth < 768) {
            setActiveIndex(activeIndex === idx ? null : idx);
        }
    };

    return (
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
            {seminarImages.map((img, idx) => {
                const isActive = activeIndex === idx;

                return (
                    <motion.div
                        key={idx}
                        onClick={() => handleImageClick(idx)}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 0.6, delay: idx * 0.05, ease: "easeOut" }}
                        className={`relative ${img.span} rounded-3xl overflow-hidden shadow-md border border-gray-100 group transition-all 
                        duration-500 cursor-pointer md:cursor-default`}
                    >
                        {/* Image Element */}
                        <img
                            src={img.src}
                            alt={img.tagline}
                            className={`w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-102 
                                ${isActive ? "scale-102"
                                    : ""
                                }`}
                            loading="lazy"
                        />

                        {/* Tint Overlay */}
                        <div
                            className={`absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10 transition-opacity 
                                duration-300 flex flex-col justify-end p-6 md:p-8 
                                ${isActive
                                    ? "opacity-100"
                                    : "opacity-0 md:group-hover:opacity-100"
                                }`}
                        />

                        {/* Emerging Hover Text Content */}
                        <div
                            className={`absolute inset-0 flex flex-col justify-end p-6 md:p-8 z-10 transition-all duration-300 pointer-events-none 
                                ${isActive
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-4 md:translate-y-4 opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100"
                                }`}
                        >
                            <p className="text-gray-300 text-xs md:text-sm max-w-md font-medium leading-relaxed">
                                {img.sub}
                            </p>
                        </div>

                        {/* Geometric Frame */}
                        <div
                            className={`absolute inset-4 rounded-2xl border transition-all duration-300 pointer-events-none z-20
                                ${isActive
                                    ? "border-white/20"
                                    : "border-white/0 md:group-hover:border-white/20"
                                }`}
                        />
                    </motion.div>
                );
            })}
        </div>
    );
}