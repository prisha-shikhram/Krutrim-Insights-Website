// import commponents
import TravellingDot from "./TravellingDot";

// import framer motion
import { motion } from 'framer-motion';

// animation of bezier curves with travelling dots
export default function Animation({ leftTools, rightTools, VIZ_W, VIZ_H, drawLine, getBezierPoints, buildPathD }) {
    return (
        <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox={`0 0 ${VIZ_W} ${VIZ_H}`}
            preserveAspectRatio="xMidYMid meet"
        >
            {/* Base lines — left */}
            {leftTools.map((_, i) => {
                const pts = getBezierPoints(true, i, leftTools.length);
                return (
                    <motion.path key={`lb-${i}`} d={buildPathD(pts)}
                        fill="none" stroke="#0189c7" strokeWidth="1" strokeOpacity="0.2"
                        variants={drawLine} initial="hidden"
                        whileInView="visible" viewport={{ once: true }} custom={i}
                    />
                );
            })}

            {/* Base lines — right */}
            {rightTools.map((_, i) => {
                const pts = getBezierPoints(false, i, rightTools.length);
                return (
                    <motion.path key={`rb-${i}`} d={buildPathD(pts)}
                        fill="none" stroke="#0189c7" strokeWidth="1" strokeOpacity="0.2"
                        variants={drawLine} initial="hidden"
                        whileInView="visible" viewport={{ once: true }} custom={i + leftTools.length}
                    />
                );
            })}

            {/* Travelling dots — left */}
            {leftTools.map((_, i) => {
                const pts = getBezierPoints(true, i, leftTools.length);
                return (
                    <TravellingDot key={`ld-${i}`}
                        p0={pts.p0} p1={pts.p1} p2={pts.p2} p3={pts.p3}
                        delay={i * 0.5} duration={2.4}
                    />
                );
            })}

            {/* Travelling dots — right */}
            {rightTools.map((_, i) => {
                const pts = getBezierPoints(false, i, rightTools.length);
                return (
                    <TravellingDot key={`rd-${i}`}
                        p0={pts.p0} p1={pts.p1} p2={pts.p2} p3={pts.p3}
                        delay={(i + leftTools.length) * 0.5} duration={2.4}
                    />
                );
            })}
        </svg>
    )
}