// import motion
import { motion } from 'framer-motion';

// import components
import SectionHeader from '../../components/utils/SectionHeader';
import ContentList from '../../components/about/ContentList';

// usps data
const usps = [
    {
        title: "Build-first learning approach",
        desc: "Stop watching, start shipping. Master AI by getting your hands dirty from day one."
    },
    {
        title: "Real-world projects & workflows",
        desc: "Solve industry bottlenecks using production-grade environments and data."
    },
    {
        title: "Industry-relevant tools",
        desc: "Get fluent in the actual stack used by OpenAI, Anthropic, and leading AI labs."
    },
    {
        title: "Outcome-focused training",
        desc: "We measure success by your ability to deploy solutions, not just pass a test."
    }
];

// why krutrim section component
export default function WhyKrutrim() {
    // handle scroll
    const handleScroll = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById("what-makes-us-different");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section
            id='why-krutrim'
            className="py-24 px-6 bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] overflow-hidden scroll-mt-5"
        >
            <div className="max-w-5xl mx-auto">
                {/* Section header */}
                <SectionHeader
                    title="Why"
                    highlight="Krutrim?"
                />

                {/* The Problem Statement */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <p className="text-[20px] sm:text-2xl -mt-10 text-gray-400 font-light leading-relaxed max-w-4xl mx-auto">
                        “Most AI courses focus on <span className="text-gray-900 font-medium">concepts</span>, but
                        learners struggle to <span className="text-[#0189c7] font-medium italic">apply them</span> in real-world scenarios.”
                    </p>

                    <div className="mt-8 w-1 h-12 bg-linear-to-b from-[#0189c7] to-transparent mx-auto hidden md:block" />
                </motion.div>

                {/* Content List */}
                <ContentList usps={usps} />

                {/* Final Narrative Closer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-10 sm:mt-20 pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6"
                >
                    <p className="text-gray-600 max-w-2xl text-center md:text-left">
                        We don't just teach you how AI works; we show you how to build with it confidently.
                        Join a community of builders, not just observers.
                    </p>

                    <a
                        href="#what-makes-us-different"
                        onClick={handleScroll}
                    >
                        <button
                            className="px-8 py-3 bg-[#0189c7] text-white font-semibold rounded-lg hover:bg-[#0077ae] transition-colors shadow-lg 
                            shadow-sky-100 whitespace-nowrap cursor-pointer"
                        >
                            Explore Our Approach
                        </button>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}