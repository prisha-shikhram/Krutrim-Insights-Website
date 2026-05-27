// import icons
import { BarChart3, Laptop, Settings, UserCheck } from 'lucide-react';

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import ImpactGrid from '../../components/college/ImpactGrid';

// impact data
const impactItems = [
    {
        title: "Industry-Relevant Content",
        description: "Sessions designed entirely around production-grade, real-world applications.",
        icon: BarChart3,
    },
    {
        title: "Hands-on Learning",
        description: "Live functional demos and interactive problem-solving built for active engagement.",
        icon: Laptop,
    },
    {
        title: "Skill Development",
        description: "Deep focus on the exact software tools and engineering concepts currently used in the industry.",
        icon: Settings,
    },
    {
        title: "Career Awareness",
        description: "Helping student communities clearly understand emerging market opportunities and professional pathways.",
        icon: UserCheck,
    },
];

// campus impact section
export default function CampusImpact() {
    return (
        <section className="py-24 px-6 bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <SectionHeader
                    title="How We Create"
                    highlight="Campus Impact"
                    description="A dedicated framework designed to highlight and deliver measurable value in every single academic session."
                />

                {/* Impact Grid layout */}
                <ImpactGrid impactItems={impactItems} />
            </div>
        </section>
    );
}