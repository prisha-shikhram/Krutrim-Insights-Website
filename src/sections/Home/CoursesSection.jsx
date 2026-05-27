// import icons
import { BookOpen, Briefcase, Code, Brain } from "lucide-react";

// courses data
const courses = [
    {
        title: "Data Analytics Powered By NEXT GEN AI",
        duration: "4-6 months",
        learningMode: "Hybrid Learning",
        batchSize: "8 seats",
        roles: "Data Analyst, Risk Analyst, Research Analyst",
        skills: ["Python", "SQL", "Gen AI", "Power BI"],
        placement: "Placement assistance by Krutrim Insights",
        projects: "30+ hands-on projects",
        gradient: "from-blue-600 to-indigo-700",
        icon: <Brain className="w-6 h-6" />,
        image: "/images/programs/data-analytics.jpg",
        link: "/courses/data-analysis"
    },
    {
        title: "AI For Business & Management",
        duration: "4-6 months",
        learningMode: "Hybrid Learning",
        batchSize: "8 seats",
        roles: "AI Product Manager & Strategy Consultant",
        skills: ["Claude", "ChatGPT", "Gemini", "Excel"],
        placement: "Placement assistance by Krutrim Insights",
        projects: "20+ Industry Aligned projects",
        gradient: "from-purple-600 to-fuchsia-700",
        icon: <Briefcase className="w-6 h-6" />,
        image: "/images/programs/business-management.jpg",
        link: "/courses/ai-for-business"
    },
    {
        title: "Agentic AI with Data Analysis",
        duration: "4-6 months",
        learningMode: "Hybrid Learning",
        batchSize: "8 seats",
        roles: "AI Agent Engineer, Automation Engineer",
        skills: ["LangChain", "CrewAI", "Vector DB", "RAG"],
        placement: "Placement assistance by Krutrim Insights",
        projects: "16+ Capstone Projects",
        gradient: "from-emerald-600 to-teal-700",
        icon: <Code className="w-6 h-6" />,
        image: "/images/programs/agent-engineering.jpg",
        link: "/courses/agentic-ai"
    },
    {
        title: "Web Development with AI",
        duration: "4-6 months",
        learningMode: "Hybrid Learning",
        batchSize: "8 seats",
        roles: "Full Stack, Frontend & Backend Developer",
        skills: ["MERN Stack", "Cursor", "Antigravity", "JS"],
        placement: "Placement assistance by Krutrim Insights",
        projects: "16+ capstone projects",
        gradient: "from-pink-600 to-rose-700",
        icon: <BookOpen className="w-6 h-6" />,
        image: "/images/programs/web-development.jpg",
        link: "/courses/web-development"
    },
];

// import components
import CourseCard from "../../components/home/CourseCard";
import SectionHeader from "../../components/utils/SectionHeader";

// course section
export default function CoursesSection() {
    return (
        <section
            id="courses"
            className="bg-gray-50 py-24 px-6 scroll-mt-10"
        >
            <div className="mx-auto max-w-6xl">
                {/* Section Header */}
                <SectionHeader
                    title="Our Specialist"
                    highlight="Learning Paths"
                    description="Master the tools of tomorrow with industry-aligned curriculums and elite mentorship."
                />

                {/* Course Cards */}
                <div className="grid grid-cols-1 gap-10 min-[950px]:grid-cols-2">
                    {courses.map((course, index) => (
                        <CourseCard
                            key={index}
                            course={course}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}