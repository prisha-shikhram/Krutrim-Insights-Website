// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CourseHero from "../sections/Courses/CourseHero";
import CurriculumSection from "../sections/Courses/CurriculumSection";
import CallToAction from "../sections/Courses/CallToAction";

// modules data
const modules = [
    "Introduction to AI",
    "Understanding Data in Business",
    "Business Applications of AI",
    "Introduction to Generative AI",
    "AI Productivity Tools",
    "Prompt Engineering for Business",
    "Data Analysis using AI",
    "AI for Business Dashboard",
    "Forecasting and Predictive Analytics",
    "AI in Digital Marketing",
    "Customer Intelligence & Personalization",
    "AI for Sales Optimization",
    "AI in Business Operations",
    "AI for Strategic Decision Makin",
    "AI in Financial Management",
    "Business Process Automation",
    "AI Agents for Business",
    "AI Governance in Organizations"
];

// AI for business course page
export default function BusinessAI() {
    return (
        <>
            <Navbar />

            <CourseHero
                badge="AI in HR, Sales & Marketing"
                title="AI for Buisness"
                highlight="and Management"
                description="AI for Business AI isn't just for engineers. This course teaches business students, managers, and non-technical professionals
                how to use AI tools to automate workflows, make smarter decisions, and actually get ahead at work — before everyone else figures it out."
                modules="10"
                projects="20+"
                hours="50+"
            />

            <CurriculumSection modules={modules} />

            <CallToAction
                title="Lead the AI Transformation"
                description="Don't just watch AI change your industry—lead the change. Join our cohort to master workflow automation and decision-making
                tools that make you 10x more effective."
                secondaryText="Designed for Managers, HR, Sales & Marketing Professionals"
            />

            <Footer />
        </>
    )
}