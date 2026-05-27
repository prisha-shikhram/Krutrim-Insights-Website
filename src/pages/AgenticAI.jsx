// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CourseHero from "../sections/Courses/CourseHero";
import CurriculumSection from "../sections/Courses/CurriculumSection";
import CallToAction from "../sections/Courses/CallToAction";

// modules data
const modules = [
    "Python For AI Builders + Data Foundations",
    "LLMs, Prompting & the AI Stack",
    "AGENTIC ARCHITECTURE & TOOL USE",
    "RAG - Retrieval Augmented Generation",
    "Data Anlaysis inside Agentic Workflows",
    "Multi-Agent Systems & Orchestration",
    "Memory, State & Personalisation",
    "External Integrations — Agents that Do Real Work",
    "Production, Deployment & Evaluation",
    "Real-World Product Sprint"
];

// agentic ai course page
export default function AgenticAI() {
    return (
        <>
            <Navbar />

            <CourseHero
                badge="Build Agentic AI systems that work"
                title="Agentic AI with"
                highlight="Data Analysis"
                description="Stop watching tutorials. Start building agents. In this Program you go from zero to shipping real multi-agent AI systems
                — pipelines, voice assistants, automation workflows — using the same tools professionals use in production. No fluff. Just build."
                modules="10"
                projects="25+"
                hours="50+"
            />

            <CurriculumSection modules={modules} />

            <CallToAction
                title="Stop Watching. Start Building."
                description="Our Agentic AI program is closing soon. Secure your guaranteed internship today."
            />

            <Footer />
        </>
    )
}