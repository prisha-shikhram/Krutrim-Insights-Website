// import icons
import { ArrowRight, Sparkles } from 'lucide-react';

// import link
import { Link } from 'react-router-dom';

// cta for courses
export default function CallToAction({
    title = "Ready to start building?",
    description = "Join the next cohort and go from user to AI builder in 12 weeks.",
    buttonText = "Contact Us",
    onButtonClick,
    secondaryText = "Limited seats available for the next batch"
}) {
    return (
        <section className="relative py-20 px-6 overflow-hidden bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff]">
            <div className="mx-auto max-w-5xl">
                {/* Main Card Container */}
                <div className="relative overflow-hidden rounded-[40px] bg-[#0189c7] px-8 py-16 md:px-16 text-center shadow-2xl">
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-white opacity-20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-cyan-100 opacity-20 rounded-full blur-[80px]" />

                    {/* White Mesh Grid Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.05]
                        bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-size-[40px_40px]"
                    />

                    {/* CONTENT */}
                    <div className="relative z-10 flex flex-col items-center">
                        {/* Decorative Icon */}
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
                            {title}
                        </h2>

                        {/* Description */}
                        <p className="max-w-2xl text-lg md:text-xl text-blue-50 leading-relaxed mb-10">
                            {description}
                        </p>

                        {/* Primary Button */}
                        <Link to="/contact#send-message">
                            <button
                                onClick={onButtonClick}
                                className="group relative flex items-center gap-3 px-10 py-4 bg-white text-[#0189c7] font-extrabold text-lg
                                rounded-2xl shadow-xl transition-all duration-300 hover:bg-blue-50 active:scale-95 cursor-pointer"
                            >
                                {buttonText}
                                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />

                                {/* Inner Shine Effect */}
                                <div
                                    className="absolute inset-0 rounded-2xl bg-linear-to-tr from-[#0189c7]/10 to-transparent opacity-0
                                    group-hover:opacity-100 transition-opacity"
                                />
                            </button>
                        </Link>

                        {/* Secondary Text */}
                        {secondaryText && (
                            <p className="mt-8 text-xs font-bold uppercase tracking-[0.3em] text-white/50">
                                {secondaryText}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}