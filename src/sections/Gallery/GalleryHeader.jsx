// import gradient background
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";

// gallery section header
export default function GalleryHeader() {
    return (
        <section className="relative w-full h-[50vh] sm:h-[75vh] min-h-125 flex items-center justify-center px-6 overflow-hidden pt-16 sm:pt-24">
            {/* Gradient background */}
            <Gradient />

            <div className="relative z-10 mx-auto max-w-4xl text-center">
                {/* Badge */}
                <div className="inline-block px-4 py-1 mb-6 rounded-full bg-[#0189c7]/10 border border-[#0189c7]/20">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0189c7]">
                        Proof of Concept
                    </p>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl leading-[1.1]">
                    Built with <br />
                    <span className="text-[#0189c7]">Intelligence</span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-xl text-lg text-gray-600 md:text-xl leading-relaxed font-medium">
                    Explore the next generation of AI agents, automated pipelines, and full-stack applications shipped by our builders.
                </p>

                {/* Visual Anchor */}
                <VisualAnchor />
            </div>
        </section>
    );
}