// import icons
import { GraduationCap, Code2, Briefcase } from "lucide-react";

// Data for the advantage boxes
const advantages = [
    {
        title: "Industry Relevant Curriculum",
        description: "Gain future-ready skills through a curriculum shaped according to industry needs and emerging tech trends.",
        image: "/images/advantage/Curriculum.avif",
        icon: <GraduationCap className="w-7 h-7 text-blue-600" />
    },
    {
        title: "Hands-on, Real-world Learning",
        description: "Build practical expertise through live experiential learning with immersive projects and cutting-edge tools.",
        image: "/images/advantage/Coding.avif",
        icon: <Code2 className="w-7 h-7 text-blue-600" />
    },
    {
        title: "Comprehensive Career Support",
        description: "Accelerate your career with personalized mentoring by experts, mock interviews, and resume building sessions.",
        image: "/images/advantage/Career.webp",
        icon: <Briefcase className="w-7 h-7 text-blue-600" />
    },
];

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import AdvantageBoxes from "../../components/home/AdvantageBoxes";

// advantage section
export default function AdvantageSection() {
    return (
        <section className="bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] py-24 px-6">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <SectionHeader
                    title="The Krutrim Insights'"
                    highlight="Advantage"
                    subheading="You don't just learn tools. You become AI enabled."
                    description="Krutrim Insights gives learners an unbeatable edge with future-ready programs."
                />

                {/* Grid Boxes */}
                <AdvantageBoxes advantages={advantages} />
            </div>
        </section>
    );
}