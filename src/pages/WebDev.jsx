// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CourseHero from "../sections/Courses/CourseHero";
import CurriculumSection from "../sections/Courses/CurriculumSection";
import CallToAction from "../sections/Courses/CallToAction";

// modules data
const modules = [
    "HTML & CSS",
    "JavaScript Essentials",
    "React.js",
    "Version Control & Git",
    "Node.js & Express",
    "Databases",
    "Authentication & Security",
    "API Design & Integration",
    "Prompt Engineering for Developers",
    "OpenAI & LLM APIs",
    "AI Features in Web Apps",
    "Vector Databases & RA",
    "AI Agents in Web Apps",
    "— Deployment & Production"
];

// web development course page
export default function WebDev() {
    return (
        <>
            <Navbar />

            <CourseHero
                badge="Build Webapps & SAAS with AI"
                title="Web Development"
                highlight="With AI"
                description="Web Development with AI Build full-stack web apps faster than you thought possible. Use AI as your co-developer
                — from frontend to backend to deployment. Ship real projects on Vercel, not just localhost. By the end, you have a portfolio. Not just a certificate."
                modules="10"
                projects="20+"
                hours="50+"
            />

            <CurriculumSection modules={modules} />

            <CallToAction
                title="Stop Coding. Start Shipping."
                description="Don't just learn to code—learn to build products at 10x speed. Join our cohort to master AI-assisted development
                and ship your first SaaS in weeks."
                secondaryText="Includes 1-on-1 Mentorship & Deployment Support"
            />

            <Footer />
        </>
    )
}