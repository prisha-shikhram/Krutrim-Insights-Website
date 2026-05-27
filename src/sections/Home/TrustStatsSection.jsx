// import icons
import { Target, Star, Wrench, Heart, Headset, FolderCheck } from 'lucide-react';

// stat data
const stats = [
    {
        label: "Net Completion Rate",
        value: "90%",
        desc: "Highest student success ratio",
        icon: <Target className="w-6 h-6 text-[#0189c7]" />,
        color: "bg-blue-50"
    },
    {
        label: "Highly Rated on Google",
        value: "4.8/5",
        desc: "Trusted by thousands of learners",
        icon: <Star className="w-6 h-6 text-amber-500" />,
        color: "bg-amber-50"
    },
    {
        label: "AI Tools Covered",
        value: "100+",
        desc: "Master the complete AI ecosystem",
        icon: <Wrench className="w-6 h-6 text-purple-600" />,
        color: "bg-purple-50"
    },
    {
        label: "Target Promoter Score",
        value: "95%",
        desc: "Exceptional learner satisfaction",
        icon: <Heart className="w-6 h-6 text-rose-600" />,
        color: "bg-rose-50"
    },
    {
        label: "Student Support",
        value: "24/7",
        desc: "Always here to help you grow",
        icon: <Headset className="w-6 h-6 text-emerald-600" />,
        color: "bg-emerald-50"
    },
    {
        label: "Industry Ready Projects",
        value: "60+",
        desc: "Real-world portfolio building",
        icon: <FolderCheck className="w-6 h-6 text-indigo-600" />,
        color: "bg-indigo-50"
    }
];

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import TrustStatsCards from '../../components/home/TrustStatsCards';

// trust stats section component
export default function TrustStatsSection() {
    return (
        <section className="bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] py-24 px-6">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <SectionHeader
                    title="Our Impact in"
                    highlight="Numbers"
                    description="Delivering excellence in AI education across the globe."
                />

                {/* Grid Layout */}
                <TrustStatsCards stats={stats} />
            </div>
        </section>
    );
}