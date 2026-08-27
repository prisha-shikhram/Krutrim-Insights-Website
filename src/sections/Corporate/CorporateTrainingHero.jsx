// import icons
import { ArrowRight, BookOpen } from "lucide-react";

// import gradient background
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";

// corporate hero section
export default function CorporateTrainingHero() {
    const emailSubject = encodeURIComponent("Inquiry: Enterprise AI Training Program");
    const emailBody = encodeURIComponent("Hi Krutrim Insights Team,\n\nWe are interested in building a customized AI training program for our organization.\n\nTeam Size:\nKey Focus Areas:\nTimeline:");

    return (
        <section className="relative w-full max-sm:min-h-[70vh] min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-20">
            {/* Gradient Background */}
            <Gradient />

            {/* CONTENT CONTAINER */}
            <div className="relative z-10 mx-auto max-w-4xl text-center py-10 max-sm:-mt-6">
                {/* Badge */}
                <div className="inline-block px-4 py-1.5 mb-6 rounded-full bg-[#1089c7]/10 border border-[#1089c7]/20">
                    <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#1089c7]">
                        Custom Corporate Upskilling
                    </p>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl leading-[1.15]">
                    AI Training That <br />
                    <span
                        className="bg-clip-text text-transparent bg-linear-to-r from-[#1089c7] to-cyan-500 block sm:inline"
                    >
                        Fits Your Business
                    </span>
                </h1>

                {/* Sub-Text */}
                <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-600 md:text-xl leading-relaxed font-normal">
                    Every organization uses technology differently. We design practical AI and digital skills training around your{" "}
                    <span className="font-semibold text-slate-900">people</span>, <span className="font-semibold text-slate-900">processes</span>,{" "}
                    <span className="font-semibold text-slate-900">tools</span>, and <span className="font-semibold text-slate-900">industry</span>.
                </p>

                {/* CTA Buttons */}
                <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-4">
                    {/* Primary Button */}
                    <a
                        href={`mailto:corporatetraining@krutriminsights.com?subject=${emailSubject}&body=${emailBody}`}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white shadow-lg 
                        shadow-[#1089c7]/25 hover:opacity-95 hover:shadow-xl active:scale-95 transition-all text-sm group"
                        style={{ backgroundColor: "#1089c7" }}
                    >
                        <span>Build Your Training Program</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>

                    {/* Secondary Button */}
                    <a
                        href="#courses"
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-700 bg-white 
                        border border-slate-200 shadow-xs hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900 active:scale-95 transition-all 
                        text-sm group"
                    >
                        <BookOpen className="w-4 h-4 text-slate-500 group-hover:text-[#1089c7] transition-colors" />
                        <span>Explore Courses</span>
                    </a>
                </div>

                {/* Visual Anchor */}
                <VisualAnchor />
            </div>
        </section>
    );
}