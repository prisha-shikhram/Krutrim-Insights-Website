// import gradient background
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";
import TrainingCTA from "../../components/training/TrainingCTA";

// training page header
export default function TrainingHeader() {
    // handle smooth scroll to courses section
    const handleScroll = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById("courses");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative w-full min-h-[90vh] flex items-center justify-center px-6 overflow-hidden pt-20">
            {/* Gradient Background */}
            <Gradient />

            {/* CONTENT CONTAINER */}
            <div className="relative z-10 mx-auto max-w-5xl text-center py-10">
                {/* Badge */}
                <div className="inline-block px-4 py-1 mb-6 rounded-full bg-[#0189c7]/10 border border-[#0189c7]/20">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0189c7]">
                        Industry-First Pedagogy
                    </p>
                </div>

                {/* MAIN HEADING */}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl leading-[1.3]">
                    Beyond Theory.<br />
                    <span className="text-[#0189c7]">Project-Driven
                        <span className="text-gray-900"> AI Mastery</span></span>
                </h1>

                {/* SUB-TEXT */}
                <div className="mx-auto mt-4 max-w-3xl">
                    <p className="text-lg text-gray-600 leading-relaxed">
                        Our training programs combine <b>lecture + slides</b> with
                        <b> live project-building sessions</b> on
                        <b> real AI pipelines, automation workflows, and data tools.</b>
                    </p>
                </div>

                {/* Visual Anchor - Placed above the final CTA sentence */}
                <div className="mb-6 -mt-4 flex justify-center">
                    <VisualAnchor />
                </div>

                <p className="text-lg font-medium text-gray-900 mb-10">
                    Every program includes a <span className="text-[#0189c7] font-bold">guaranteed paid internship.</span>
                </p>

                {/* CTA BUTTONS */}
                <TrainingCTA handleScroll={handleScroll} />
            </div>
        </section>
    );
}