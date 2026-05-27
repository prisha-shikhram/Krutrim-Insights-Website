// import components
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";
import HomeActions from "../../components/college/HomeActions";

// college page header
export default function CollegeHeader() {
    // scroll function for know more cta
    const handleScroll = () => {
        const element = document.getElementById('seminar');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // scroll function for proposal cta
    const handleScrollCTA = () => {
        const element = document.getElementById('CTA');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="relative w-full h-[95vh] sm:h-[85vh] pt-20 sm:pt-40 pb-6 sm:pb-24 flex items-center justify-center px-6 overflow-hidden">
            {/* Gradient Background */}
            <Gradient />

            <div className="relative z-10 mx-auto max-w-5xl text-center">
                {/* Badge: On Campus */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full bg-[#0189c7]/5 border border-[#0189c7]/10 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0189c7] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0189c7]"></span>
                    </span>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0189c7]">
                        On Campus
                    </p>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    AI Learning <br />
                    <span className="text-[#0189c7]">For Every Campus</span>
                </h1>

                {/* Subtext */}
                <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                    We bring industry-relevant AI seminars and workshops to colleges
                    and student communities—empowering learners with practical skills
                    and real-world exposure.
                </p>

                {/* Action Buttons */}
                <HomeActions
                    handleScroll={handleScroll}
                    handleScrollCTA={handleScrollCTA}
                />

                {/* Visual Anchor */}
                <VisualAnchor />
            </div>
        </section>
    );
}