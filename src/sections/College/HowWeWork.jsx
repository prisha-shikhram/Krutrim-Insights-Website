// import icons
import { ClipboardList, CalendarDays, Presentation, TrendingUp } from 'lucide-react';

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import StepGrid from '../../components/college/StepsGrid';

// steps data
const steps = [
    {
        title: "Request a session",
        description: "Submit a request to host an AI workshop or seminar tailored to your college's specific academic tracks.",
        icon: ClipboardList,
    },
    {
        title: "Customize the seminar",
        description: "We align with your department or student club to tailor the depth, tools, and technical focus of the event.",
        icon: CalendarDays,
    },
    {
        title: "Conduct the workshop",
        description: "Our industry experts arrive on campus to deliver immersive, high-energy sessions and code walkthroughs.",
        icon: Presentation,
    },
    {
        title: "Deliver the impact",
        description: "Students walk away with job-ready frameworks, structural insights, and definitive career pathways.",
        icon: TrendingUp,
    },
];

// how we work section
export default function HowWeWork() {
    return (
        <section className="py-24 px-6 bg-slate-50/50 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <SectionHeader
                    title="Our Execution"
                    highlight="How We Work"
                    description="A seamless, end-to-end operational process that brings top-tier industry knowledge directly onto your campus."
                />

                {/* 4-Column Responsive Grid */}
                <StepGrid steps={steps} />
            </div>
        </section>
    );
}