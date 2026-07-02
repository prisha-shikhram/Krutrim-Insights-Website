// import icons
import { ArrowRight } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// course cta component
export default function CourseCTA({ scrollToCurriculum }) {
    return (
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <Link
                to="/contact#send-message"
                className="w-full"
            >
                <button
                    className="group flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-3.5 bg-[#0189c7] text-white
                    font-bold rounded-xl shadow-lg hover:shadow-[#0189c7]/20 transition-all active:scale-95 cursor-pointer text-[16px]"
                >
                    Contact Us
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>

            <button
                onClick={scrollToCurriculum}
                className="group flex w-full sm:w-auto items-center justify-center gap-2 px-10 py-3.5 bg-white text-[#0189c7]
                font-bold rounded-xl border border-[#0189c7]/20 hover:border-[#0189c7] transition-all active:scale-95 cursor-pointer text-[16px]"
            >
                Curriculum
                <ArrowRight className="w-4 h-4 transition-transform group-hover:rotate-90" />
            </button>
        </div>
    )
}