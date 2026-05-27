// import framer motion
import { motion } from 'framer-motion';

// card components
export default function Cards({ leftTools, rightTools, VIZ_W, VIZ_H, leftAnchors, rightAnchors, getY, floatVariants }) {
    return (
        <div>
            {/* ── Left Cards ── */}
            {leftTools.map((item, i) => {
                const { x: svgX } = leftAnchors[i];
                const svgY = getY(i, leftTools.length);

                return (
                    <motion.div
                        key={`left-${i}`}
                        className="hidden md:flex absolute z-30 items-center gap-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl border
                        border-slate-100 shadow-md"
                        style={{
                            left: `${(svgX / VIZ_W) * 100}%`,
                            top: `${(svgY / VIZ_H) * 95}%`,
                            transform: "translate(-100%, -50%)",
                        }}
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        animate="animate"
                        variants={floatVariants(i)}
                    >
                        <div className="rounded-md overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.label}
                                className="w-6 h-6 object-contain shrink-0"
                            />
                        </div>

                        <span className="text-[16px] font-bold text-slate-700 whitespace-nowrap">
                            {item.label}
                        </span>
                    </motion.div>
                );
            })}

            {/* ── Right Cards ── */}
            {rightTools.map((item, i) => {
                const { x: svgX } = rightAnchors[i];
                const svgY = getY(i, rightTools.length);
                return (
                    <motion.div
                        key={`right-${i}`}
                        className="hidden md:flex absolute z-30 items-center gap-4 px-4 py-2 bg-white/90 backdrop-blur-md rounded-xl border
                        border-slate-100 shadow-md"
                        style={{
                            left: `${(svgX / VIZ_W) * 95}%`,
                            top: `${(svgY / VIZ_H) * 92}%`,
                            transform: 'translate(0%, -50%)',
                        }}
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                        animate="animate"
                        variants={floatVariants(i + 1)}
                    >
                        <div className="rounded-md overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.label}
                                className="w-6 h-6 object-contain shrink-0"
                            />
                        </div>

                        <span className="text-[16px] font-bold text-slate-700 whitespace-nowrap">{item.label}</span>
                    </motion.div>
                );
            })}
        </div>
    )
}