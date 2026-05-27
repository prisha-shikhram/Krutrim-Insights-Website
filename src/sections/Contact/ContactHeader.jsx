// import gradeint background
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";

// contact header
export default function ContactHeader() {
    return (
        <section className="relative w-full h-[50vh] sm:h-[75vh] min-h-125 pt-38 pb-20 lg:pt-32 lg:pb-16 flex items-center justify-center px-6 overflow-hidden">
            {/* Gradient Background */}
            <Gradient />

            <div className="relative z-10 mx-auto max-w-5xl text-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-[#0189c7]/5 border border-[#0189c7]/10 backdrop-blur-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0189c7] opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0189c7]"></span>
                    </span>

                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0189c7]">
                        Open for Collaborations
                    </p>
                </div>

                {/* Heading */}
                <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 leading-[1.1]">
                    Let's Build the <br />
                    <span className="text-[#0189c7]">Next Big Thing</span>
                </h1>

                {/* Subtext */}
                <p className="mx-auto mt-8 max-w-2xl text-lg md:text-xl text-slate-600 leading-relaxed font-medium">
                    Have a vision for an AI-powered project or want to learn how to ship products at 10x speed? We're just a message away.
                </p>

                {/* Visual Anchor */}
                <VisualAnchor />
            </div>
        </section>
    );
}