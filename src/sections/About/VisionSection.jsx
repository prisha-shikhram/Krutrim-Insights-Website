// founder and co-founder notes data
const notes = [
    {
        tag: "FOUNDER'S NOTE",
        name: "Pooja Gupta",
        role: "Founder, Krutrim Insights",
        image: "/images/other/Founder.jpeg",
        content: "While exploring AI and technology training, we noticed a clear gap—most courses focused on concepts, not on how to actually build and work on real-world systems. That gap led to Krutrim Insights.",
        subContent: "Built on 15+ months of research, our programs focus on industry-relevant skills, hands-on building, and long-term career growth—not just course completion. We believe education should go beyond job entry.",
        accent: "from-blue-600 to-indigo-600"
    },
    {
        tag: "CO-FOUNDER'S NOTE",
        name: "Garv",
        role: "Co-Founder, Krutrim Insights",
        image: "/images/other/Co-Founder.jpeg",
        content: "In 5+ years in the industry, I've seen one common gap—knowing concepts but struggling to apply them. At Krutrim Insights, the focus is simple: learn by building.",
        subContent: "We help you work on real problems, understand tools in context, and develop an industry mindset—not just complete courses. If you’re here to move beyond theory, you’re in the right place.",
        accent: "from-indigo-600 to-purple-600"
    }
];

// import components
import SectionHeader from "../../components/utils/SectionHeader";
import VisionCard from "../../components/about/VisionCards";

// vision section component
export default function VisionSection() {
    return (
        <section className="bg-white py-24 px-6 overflow-hidden">
            <div className="mx-auto max-w-7xl">
                {/* Section Header */}
                <SectionHeader
                    title="Building Skills for an"
                    highlight="AI Driven Future"
                    description="A message from our leadership on our mission to empower the next generation of practical AI builders."
                />

                {/* Vision Cards */}
                <VisionCard notes={notes} />

                {/* Closing Statement */}
                <div className="mt-16 text-center">
                    <p className="text-gray-500 font-medium italic">
                        "Krutrim Insights is for those who want to build skills that stay relevant over time."
                    </p>
                </div>
            </div>
        </section>
    );
}