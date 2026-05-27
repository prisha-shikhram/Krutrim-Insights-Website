// import framer motion
import { motion } from 'framer-motion';

// social bar fixed right middle
export default function SocialBar({ socialLinks }) {
    return (
        <div className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-30 flex-col items-center gap-1">
            {/* Vertical line top */}
            <div className="w-px h-12 bg-linear-to-b from-transparent to-slate-300" />

            {/* Social Links */}
            {socialLinks.map((s, i) => (
                <motion.a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className={`w-10 h-10 flex items-center justify-center rounded-full text-slate-400 border border-slate-200 bg-white/80
                    backdrop-blur-sm shadow-sm transition-all duration-200 ${s.color} hover:border-current hover:shadow-md hover:-translate-x-0.5`}
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + i * 0.1 }}
                >
                    {s.icon}
                </motion.a>
            ))}

            {/* Vertical line bottom */}
            <div className="w-px h-12 bg-linear-to-t from-transparent to-slate-300" />
        </div>
    )
}