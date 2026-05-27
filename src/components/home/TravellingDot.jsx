// import useeffect, useref and usestate
import { useEffect, useRef, useState } from 'react';

// Calculates the exact X,Y position on a curved line at any given moment
// Used by the travelling dot to know where to draw itself.
function cubicBezierPoint(p0, p1, p2, p3, t) {
    const mt = 1 - t;
    return {
        x: mt * mt * mt * p0.x + 3 * mt * mt * t * p1.x + 3 * mt * t * t * p2.x + t * t * t * p3.x,
        y: mt * mt * mt * p0.y + 3 * mt * mt * t * p1.y + 3 * mt * t * t * p2.y + t * t * t * p3.y,
    };
}

// A glowing dot that moves along a line.
export default function TravellingDot({ p0, p1, p2, p3, delay, duration = 2.4, color = '#0189c7' }) {
    const [t, setT] = useState(0);
    const [visible, setVisible] = useState(false);
    const rafRef = useRef(null);
    const startRef = useRef(null);

    useEffect(() => {
        let cancelled = false;
        const startTimeout = setTimeout(() => {
            if (cancelled) return;
            const loop = (timestamp) => {
                if (cancelled) return;
                if (!startRef.current) startRef.current = timestamp;
                const elapsed = (timestamp - startRef.current) / 1000;
                const progress = (elapsed % duration) / duration;
                setT(progress);
                setVisible(true);
                rafRef.current = requestAnimationFrame(loop);
            };
            rafRef.current = requestAnimationFrame(loop);
        }, delay * 1000);
        return () => {
            cancelled = true;
            clearTimeout(startTimeout);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [delay, duration]);

    if (!visible) return null;

    const opacity = t < 0.08 ? t / 0.08 : t > 0.88 ? (1 - t) / 0.12 : 1;
    const pt = cubicBezierPoint(p0, p1, p2, p3, t);

    return (
        <g>
            <circle cx={pt.x} cy={pt.y} r={6} fill={color} opacity={opacity * 0.15} />
            <circle cx={pt.x} cy={pt.y} r={3} fill={color} opacity={opacity * 0.4} />
            <circle cx={pt.x} cy={pt.y} r={2} fill={color} opacity={opacity} />
            <circle cx={pt.x} cy={pt.y} r={0.8} fill="white" opacity={opacity * 0.95} />
        </g>
    );
}