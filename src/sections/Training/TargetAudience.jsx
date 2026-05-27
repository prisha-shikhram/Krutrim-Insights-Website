// impprt icons
import { GraduationCap, Briefcase, Rocket } from 'lucide-react';

// targets data
const targets = [
    {
        title: "College Students",
        subtitle: "BCA, BBA, BCom, B.Tech",
        desc: "For anyone who wants real, industry-grade portfolio projects before placement season hits. Stand out with AI experience that matters.",
        icon: <GraduationCap className="w-6 h-6 text-blue-600" />,
        bg: "bg-blue-50",
        textColor: "text-blue-600",
        borderColor: "border-blue-100",
        tags: ["Placement Ready", "Portfolio", "Hands-on"]
    },
    {
        title: "Working Professionals",
        subtitle: "Non-Tech & Tech Roles",
        desc: "Automate your own work, build side projects, or upskill before AI makes your current role redundant. Stay ahead of the curve.",
        icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
        bg: "bg-emerald-50",
        textColor: "text-emerald-600",
        borderColor: "border-emerald-100",
        tags: ["Upskilling", "Automation", "Future-proof"]
    },
    {
        title: "Aspiring AI Builders",
        subtitle: "Innovation Seekers",
        desc: "You've played with ChatGPT. Now you want to build the next one. This is where your journey from user to creator starts.",
        icon: <Rocket className="w-6 h-6 text-purple-600" />,
        bg: "bg-purple-50",
        textColor: "text-purple-600",
        borderColor: "border-purple-100",
        tags: ["LLM Ops", "Agentic AI", "Data Tools"]
    }
];

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import AudienceCards from '../../components/training/AudienceCards';

// target audience section
export default function TargetAudience() {
    return (
        <section className="bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] py-24 px-6">
            <div className="mx-auto max-w-7xl">
                {/* Header Section */}
                <SectionHeader
                    title="Who it's"
                    highlight="for"
                    description="Our programs are designed for those ready to move beyond theory and start building real-world AI solutions."
                />

                {/* Audience Cards */}
                <AudienceCards targets={targets} />
            </div>
        </section>
    );
}