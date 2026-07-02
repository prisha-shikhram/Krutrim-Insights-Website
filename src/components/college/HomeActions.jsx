// import icons
import { School, ArrowRight } from "lucide-react";

// home actions component
export default function HomeActions({ handleScroll, handleScrollCTA }) {
    return (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 max-sm:w-full">
            {/* Primary Button */}
            <button
                onClick={handleScrollCTA}
                className="group flex items-center gap-3 px-8 py-4 bg-[#0189c7] text-white font-bold rounded-2xl shadow-xl shadow-[#0189c7]/20 
                transition-all cursor-pointer max-sm:w-full max-sm:justify-center"
            >
                Get This In Your Campus
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            {/* Secondary Button */}
            <button
                onClick={handleScroll}
                className="group flex items-center gap-2 px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl 
                backdrop-blur-sm transition-all hover:bg-white hover:border-[#0189c7]/30 cursor-pointer max-sm:w-full max-sm:justify-center"
            >
                Learn More
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
        </div>
    )
}