// import icons
import { ArrowUpRight } from 'lucide-react';

// cosultation CTA section component
export default function ConsultationCTA() {
    return (
        <div className="w-full max-w-7xl mx-auto px-6 py-12 max-[900px]:py-16 my-10">
            <div
                className="flex flex-col min-[900px]:flex-row items-center justify-between gap-6 py-10 px-8 md:p-12 rounded-3xl 
                bg-linear-to-br from-[#f0f9ff] via-[#f8fdff] to-white border border-blue-50 shadow-sm"
            >
                {/* Left Content */}
                <div className="space-y-2 text-center min-[900px]:text-left">
                    <h3 className="text-2xl font-bold text-gray-900 mb-5">
                        Still not sure where to start?
                    </h3>

                    <p className="text-gray-600 text-[16px] max-w-2xl">
                        Talk to an advisor — free 20-min call. We'll match you to the right program based on your goals and background.
                    </p>
                </div>

                {/* Right Action */}
                <div className="shrink-0">
                    <a
                        href="mailto:prisha@krutriminsights.com?subject=Booking%20a%20Free%20Consultation%20Call"
                        className="block"
                    >
                        <button
                            className="group flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-[#0189c7] hover:text-[#0189c7] 
                            font-bold text-lg transition-all bg-[#0189c7] hover:bg-transparent text-white cursor-pointer shadow-sm hover:shadow-md w-full md:w-auto"
                        >
                            Book a free call
                            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </button>
                    </a>
                </div>
            </div>
        </div>
    );
}