// import icons
import { TrendingUp, Users, Zap, Globe, Briefcase } from 'lucide-react';

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import RelevanceGrid from '../../components/gallery/RelevanceGrid';

// Data for industry relevance section
const relevanceItems = [
    {
        title: "High Growth Industry",
        description: "AI and automation are expanding across all sectors, from finance to healthcare.",
        icon: TrendingUp,
    },
    {
        title: "Diverse Career Opportunities",
        description: "Roles for both technical and non-technical backgrounds are emerging daily.",
        icon: Users,
    },
    {
        title: "Future-Ready Skills",
        description: "Stay relevant and competitive in a rapidly evolving global job market.",
        icon: Zap,
    },
    {
        title: "Real-World Impact",
        description: "Work on solutions that solve meaningful problems and drive actual business value.",
        icon: Globe,
    },
    {
        title: "Career Advancement",
        description: "Strong market demand leads to better growth opportunities and leadership roles.",
        icon: Briefcase,
    },
];

// industry relevance section
export default function IndustryRelevance() {
    return (
        <section className="py-24 px-6 bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Reusable Section Header */}
                <SectionHeader
                    title="Industry"
                    highlight="Relevance"
                    description="Understand why these skills matter today and how they translate into your professional future, regardless of your background."
                />

                {/* Relevance Grid */}
                <RelevanceGrid
                    relevanceItems={relevanceItems}
                />
            </div>
        </section>
    );
}