// import framer motion
import { motion } from 'framer-motion';

// import usestate
import { useState } from 'react';

// import react hot toast
import { Toaster } from 'react-hot-toast';

// import components
import Background from '../../components/utils/BackgroundEffect';
import SocialBar from '../../components/home/SocialBar';
import Animation from '../../components/home/Animation';
import Cards from '../../components/home/Cards';
import BrochureModal from './BrochureModal';

// import Link
import { Link } from 'react-router-dom';

// import icons
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

// hero section
export default function HeroSection() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // left tools
    const leftTools = [
        { label: "GPT-4o", image: "/images/logos/gpt.jpg" },
        { label: "Claude 3.7", image: "/images/logos/claude.jpg" },
        { label: "Llama 3.3", image: "/images/logos/llama.png" },
        { label: "Gemini 2.0", image: "/images/logos/gemini.jpg" },
    ];

    // right tools
    const rightTools = [
        { label: "Perplexity", image: "/images/logos/perplexity.webp" },
        { label: "Antigravity", image: "/images/logos/antigravity.jpg" },
        { label: "Runaway AI", image: "/images/logos/runaway.png" },
        { label: "Cursor AI", image: "/images/logos/cursor.png" },
    ];

    // social links
    const socialLinks = [
        { icon: <FaLinkedin size={20} />, label: "LinkedIn", href: "https://www.linkedin.com/company/krutrim-insights/", color: "hover:text-blue-600" },
        { icon: <FaWhatsapp size={20} />, label: "WhatsApp", href: "https://wa.me/918882129654", color: "hover:text-green-500" },
    ];

    // The SVG's logical coordinate system.
    const VIZ_W = 1440;
    const VIZ_H = 400;
    const cx = VIZ_W / 2;
    const cy = VIZ_H / 2;

    // ── Card anchor points (SVG coords) ──
    const leftAnchors = [{ x: 220 }, { x: 125 }, { x: 195 }, { x: 100 },];

    const rightAnchors = [
        { x: VIZ_W - 330 },
        { x: VIZ_W - 200 },
        { x: VIZ_W - 280 },
        { x: VIZ_W - 200 },
    ];

    // Controls vertical spacing of cards.
    const V_PAD = 42;
    // evenly distributes all cards between the top padding and bottom padding
    const getY = (i, total) =>
        total === 1 ? VIZ_H / 2 : V_PAD + (i * (VIZ_H - V_PAD * 2)) / (total - 1);

    // Builds the 4 control points for each curved line:
    const getBezierPoints = (isLeft, i, total) => {
        const anchor = isLeft ? leftAnchors[i] : rightAnchors[i];
        const tx = anchor.x;
        const ty = getY(i, total);
        // cp1 close to center, cp2 close to target — creates natural fan
        const cp1x = isLeft ? cx - 210 : cx + 140;
        const cp2x = isLeft ? tx + 240 : tx - 140;
        return {
            p0: { x: cx, y: cy },
            p1: { x: cp1x, y: cy },
            p2: { x: cp2x, y: ty },
            p3: { x: tx, y: ty },
        };
    };

    // Converts the 4 bezier points into an SVG path string
    const buildPathD = (pts) =>
        `M ${pts.p0.x} ${pts.p0.y} C ${pts.p1.x} ${pts.p1.y}, ${pts.p2.x} ${pts.p2.y}, ${pts.p3.x} ${pts.p3.y}`;

    // variants Framer Motion animation config. When a line comes into view, it draws itself from 0 to full length
    const drawLine = {
        hidden: { pathLength: 0, opacity: 0 },
        visible: (i) => ({
            pathLength: 1, opacity: 1,
            transition: {
                pathLength: { delay: i * 0.1, type: 'spring', duration: 1.6, bounce: 0 },
                opacity: { delay: i * 0.1, duration: 0.15 },
            },
        }),
    };

    // Makes cards gently bob up and down forever.
    const floatVariants = (i) => ({
        animate: {
            y: [0, i % 2 === 0 ? -5 : 5, 0],
            transition: { duration: 2.8 + i * 0.35, repeat: Infinity, ease: 'easeInOut' },
        },
    });

    return (
        <section
            className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden"
            style={{ minHeight: '100vh', background: 'white' }}
        >
            {/* Toast Container */}
            <Toaster
                position="top-center"
                reverseOrder={false}
            />

            {/* Background pattern */}
            <Background />

            {/* Social bar */}
            <SocialBar socialLinks={socialLinks} />

            {/* Top heading */}
            <div className="flex flex-col justify-center items-center w-full mt-16 -mb-16">
                <motion.h1
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl lg:text-[50px] font-black tracking-tight leading-tight"
                >
                    <span className="text-slate-900">Amplify Your Future </span>
                    <span className="text-[#0189c7]">with AI.</span>
                </motion.h1>

                <motion.p
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15 }}
                    className="text-xs sm:text-sm font-bold text-slate-400 mt-2 tracking-widest uppercase"
                >
                    Any Background. Every Career. AI-Enabled.
                </motion.p>
            </div>

            {/* ── Visualization ── */}
            <div className="relative w-full max-[950px]:mt-5 min-[950px]:mt-10 h-70 sm:h-80 md:h-100">
                {/* SVG lines */}
                <Animation
                    leftTools={leftTools}
                    rightTools={rightTools}
                    VIZ_W={VIZ_W}
                    VIZ_H={VIZ_H}
                    drawLine={drawLine}
                    getBezierPoints={getBezierPoints}
                    buildPathD={buildPathD}
                />

                {/* Central AI Head */}
                <motion.div
                    className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{ width: 280, height: 280 }}
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1 }}
                >
                    <div className="absolute inset-0 bg-sky-400 rounded-full blur-3xl opacity-10 sm:opacity-25 animate-pulse" />

                    <img
                        src="/images/other/brain-ai.png"
                        alt="AI Human Profile"
                        className="absolute z-20 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 sm:w-50 sm:h-50 md:w-70 md:h-70"
                    />
                </motion.div>

                {/* Cards */}
                <Cards
                    leftTools={leftTools}
                    rightTools={rightTools}
                    VIZ_W={VIZ_W}
                    VIZ_H={VIZ_H}
                    leftAnchors={leftAnchors}
                    rightAnchors={rightAnchors}
                    getY={getY}
                    floatVariants={floatVariants}
                />
            </div>

            {/* Mobile simplified tools */}
            <div className="flex md:hidden flex-wrap justify-center gap-2 mt-6 px-4">
                {[...leftTools, ...rightTools].map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 px-3 py-1.5 bg-white rounded-lg border shadow-sm"
                    >
                        <div className="rounded-md overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.label}
                                className="w-6 h-6 object-contain shrink-0"
                            />
                        </div>

                        <span className="text-xs font-semibold text-slate-700">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

            {/* ── Text Content ── */}
            <div className="text-center px-6 z-40 mt-10 md:-mt-10">
                <motion.div
                    initial={{ y: 16, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-6"
                >
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-7 py-3 bg-[#0189c7] text-white text-[16px] font-bold rounded-full hover:bg-sky-600 transition-all shadow-lg
                        shadow-sky-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer max-sm:w-full"
                    >
                        Get Brochure
                    </button>

                    <Link to="/training">
                        <button
                            className="px-7 py-3 bg-transparent text-[#0189c7] border-2 border-[#0189c7] text-[16px] font-bold rounded-full
                            hover:bg-sky-50 transition-all hover:-translate-y-0.5 active:translate-y-0 cursor-pointer max-sm:w-full"
                        >
                            Explore Training Programs
                        </button>
                    </Link>
                </motion.div>

                {/* Modal Component */}
                <BrochureModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                />
            </div>
        </section>
    );
}