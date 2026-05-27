// import gradient background
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";

// about section header component
export default function AboutUsHeader() {
    return (
        <section className="relative w-full min-h-[60vh] flex items-center justify-center px-6 overflow-hidden pt-20">
            {/* Gradient Background */}
            <Gradient />

            {/* CONTENT CONTAINER */}
            <div className="relative z-10 mx-auto max-w-4xl text-center py-10">
                {/* Badge */}
                <div className="inline-block px-4 py-1 mb-6 rounded-full bg-[#0189c7]/10 border border-[#0189c7]/20">
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0189c7]">
                        Our Mission
                    </p>
                </div>

                {/* COMPACT MAIN HEADING */}
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-[1.1]">
                    Empowering the{" "}
                    <span className="text-[#0189c7] block sm:inline">
                        Next Generation
                    </span>
                    <span className="max-sm:hidden"><br /></span>
                    of AI Innovators
                </h1>

                {/* SUB-TEXT */}
                <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 md:text-xl leading-relaxed font-medium">
                    Making AI education
                    <span className="text-gray-900 px-1 italic underline decoration-[#0189c7] decoration-2 underline-offset-4">accessible</span>,
                    <span className="text-gray-900 px-1 italic underline decoration-[#0189c7] decoration-2 underline-offset-4">affordable</span>, and
                    <span className="text-gray-900 px-1 italic underline decoration-[#0189c7] decoration-2 underline-offset-4">practical</span> for the world.
                </p>

                {/* Visual Anchor */}
                <VisualAnchor />
            </div>
        </section>
    );
}