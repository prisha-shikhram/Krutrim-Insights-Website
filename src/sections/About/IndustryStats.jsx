// import motion
import { motion } from 'framer-motion';

// import icons
import { TrendingUp, Users, AlertCircle, ArrowRight } from 'lucide-react';

// import components
import SectionHeader from '../../components/utils/SectionHeader';
import StatsGrid from '../../components/about/StatsGrid';

// Industry stats data
const stats = [
    {
        value: "45%",
        context: "The current AI skill gap in India's tech workforce.",
        source: "NASSCOM",
        icon: <AlertCircle className="text-red-500" size={24} />
    },
    {
        value: "3x",
        context: "The speed at which AI job demand is outstripping local talent.",
        source: "LinkedIn Industry Report",
        icon: <TrendingUp className="text-[#0189c7]" size={24} />
    },
    {
        value: "60%",
        context: "Enterprises struggling to find deployment-ready AI engineers.",
        source: "World Economic Forum",
        icon: <Users className="text-[#0189c7]" size={24} />
    }
];

// IndustryStats section component
export default function IndustryStats() {
    // handle scroll
    const handleScroll = (e) => {
        e.preventDefault();
        const targetElement = document.getElementById("why-krutrim");
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header Component */}
                <SectionHeader
                    title="The Problem is"
                    highlight="Real"
                    description="We aren't just another course platform. We are closing the actual AI skills gap in India with data-backed evidence."
                />

                {/* Stats Grid */}
                <StatsGrid stats={stats} />

                {/* Closing Bridge Line */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    className="mt-20 text-center"
                >
                    <div
                        className="inline-flex flex-col md:flex-row items-center gap-4 bg-[#0189c7]/5 px-8 py-4 rounded-3xl 
                        md:rounded-full border border-[#0189c7]/10"
                    >
                        <p className="text-[#222222] font-medium text-lg">
                            That's the gap <span className="text-[#0189c7] font-bold">Krutrim Insights</span> was built to close.
                        </p>

                        <div className="h-4 w-px bg-gray-300 hidden md:block" />

                        <a
                            href="#why-krutrim"
                            onClick={handleScroll}
                        >
                            <button className="flex items-center gap-2 text-[#0189c7] font-bold group cursor-pointer">
                                Our Solution <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}