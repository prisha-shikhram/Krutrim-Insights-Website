// import icons
import { Layers, Rocket, Users, Code2 } from 'lucide-react';

// import components
import SectionHeader from '../../components/utils/SectionHeader';
import VisualCard from '../../components/about/VisualCards';

// what makes us different data
const diffs = [
    {
        icon: <Layers size={28} />,
        title: "Build-First Learning",
        desc: "Skip the endless lectures; start coding production-grade AI from day one."
    },
    {
        icon: <Rocket size={28} />,
        title: "Real-World Projects",
        desc: "Solve actual industry bottlenecks using real datasets and enterprise workflows."
    },
    {
        icon: <Code2 size={28} />,
        title: "Modern Tech Stack",
        desc: "Master the exact tools used by top AI labs like OpenAI, Anthropic, and Meta."
    },
    {
        icon: <Users size={28} />,
        title: "Outcome Focused",
        desc: "Designed to bridge the gap between being a learner and becoming a deployer."
    }
];

// what makes us different section component
export default function WhatMakesUsDifferent() {
    return (
        <section
            id="what-makes-us-different"
            className="py-20 bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] px-6 scroll-mt-10"
        >
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <SectionHeader
                    title="What Makes Us"
                    highlight="Different"
                    description="We've engineered a learning environment that prioritizes deployment over theory."
                />

                {/* Visual Cards Grid */}
                <VisualCard diffs={diffs} />
            </div>
        </section>
    );
}