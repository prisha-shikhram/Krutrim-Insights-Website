// import icons
import { Handshake, Users, TrendingUp, Building2, FileEdit, GraduationCap, BarChart3 } from 'lucide-react';

// import components
import SectionHeader from '../../components/utils/SectionHeader';
import ApproachCards from '../../components/about/ApproachCards';
import StepProcess from '../../components/about/StepProcess';
import PartnershipCTA from '../../components/about/PartnershipCTA';

// approach data
const approachItems = [
    {
        title: "Collaborate",
        desc: "Partner with us to co-create impactful AI learning programs on campus.",
        icon: <Handshake size={28} className="text-[#0189c7]" />
    },
    {
        title: "Empower",
        desc: "Equip students with real-world skills through expert-led experiences.",
        icon: <Users size={28} className="text-[#0189c7]" />
    },
    {
        title: "Elevate",
        desc: "Build future-ready campuses and industry-aligned learners.",
        icon: <TrendingUp size={28} className="text-[#0189c7]" />
    }
];

// engagement steps data
const engagementSteps = [
    {
        number: "1",
        title: "Connect",
        desc: "We connect with your institution to understand goals and opportunities.",
        icon: <Building2 size={28} className="text-[#0189c7]" />
    },
    {
        number: "2",
        title: "Co-create",
        desc: "We design customized programs, workshops, and initiatives together.",
        icon: <FileEdit size={28} className="text-[#0189c7]" />
    },
    {
        number: "3",
        title: "Deliver",
        desc: "We deliver engaging learning experiences for your students.",
        icon: <GraduationCap size={28} className="text-[#0189c7]" />
    },
    {
        number: "4",
        title: "Drive Impact",
        desc: "We measure outcomes and create long-term value together.",
        icon: <BarChart3 size={28} className="text-[#0189c7]" />
    }
];

// college outreach section component
export default function CollegeOutreach() {
    return (
        <section className="py-24 px-6 bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <SectionHeader
                    title="Our"
                    highlight="Approach"
                    description="We collaborate with institutions to bring hands-on AI learning, industry exposure, and future-ready skills to students."
                />

                {/* Approach Cards */}
                <ApproachCards approachItems={approachItems} />

                {/* Engagement Process Section Header */}
                <div className="mb-16 flex justify-center items-center flex-col">
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">How We Engage</h3>
                    <div className="w-12 h-1 bg-[#0189c7] rounded-full"></div>
                </div>

                {/* The Step-by-Step Process */}
                <StepProcess engagementSteps={engagementSteps} />

                {/* Partnership CTA Banner */}
                <PartnershipCTA />
            </div>
        </section>
    );
}