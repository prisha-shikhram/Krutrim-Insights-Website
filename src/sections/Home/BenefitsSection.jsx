// import icons
import { ShieldCheck, Zap, MonitorPlay, Briefcase } from "lucide-react";

// Benefits data array
const benefits = [
    {
        title: "Industry Recognized Certification",
        description: "Validate your expertise with a digital certificate recognized by top-tier tech firms.",
        icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
    },
    {
        title: "Live Industry Curriculum",
        description: "Get lifetime access to curriculum updates that evolve as fast as the AI industry does.",
        icon: <Zap className="w-6 h-6 text-purple-600" />,
    },
    {
        title: "Autonomous AI Job Portal",
        description: "Access your private portal to apply for jobs using AI-driven matching with zero human intervention.",
        icon: <Briefcase className="w-6 h-6 text-emerald-600" />,
    },
    {
        title: "On-Demand Learning Vault",
        description: "Never miss a beat with high-definition recorded lectures available for your entire validity period.",
        icon: <MonitorPlay className="w-6 h-6 text-rose-600" />,
    },
];

// import components
import LeftContent from "../../components/home/LeftContent";
import Certificate from "../../components/home/Certificate";
import SectionHeader from "../../components/utils/SectionHeader";

// BenefitsSection Component
export default function BenefitsSection() {
    return (
        <section className="bg-gray-50 pb-24 pt-10 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <div className="flex justify-center items-center flex-col sm:mb-5">
                    <SectionHeader
                        title="More benefits at"
                        highlight="no extra cost"
                        description="Everything you need to stay AI-ready, without hidden add-ons or surprise fees."
                    />
                </div>

                <div className="flex flex-col max-lg:items-start lg:flex-row items-center gap-16">
                    {/* LEFT CONTENT */}
                    <LeftContent benefits={benefits} />

                    {/* RIGHT VISUAL (Certificate Placeholder) */}
                    <Certificate />
                </div>
            </div>
        </section>
    );
}