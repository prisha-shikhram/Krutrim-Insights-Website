// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CourseHero from "../sections/Courses/CourseHero";
import CurriculumSection from "../sections/Courses/CurriculumSection";
import CallToAction from "../sections/Courses/CallToAction";

// modules data
const modules = [
    "Business Data Foundations + Smart Excel",
    "Python (Zero to Practical)",
    "Data Visualization & Storytelling (Advanced)",
    "SQL for Business Analytics (Industry Level)",
    "AI Tools for Data Analysis (Next-Gen Skills)",
    "AI + Python (Power Combo for Analysts)",
    "Business Analytics & Decision Science",
    "Automation & AI Agents (No-Code + Low-Code)",
    "Power BI / Tableau (Professional Dashboards)",
    "Real-World AI + Data Applications"
];

// data analysis course page
export default function DataAnalysis() {
    return (
        <>
            <Navbar />

            <CourseHero
                badge="Analyse & Visualise with AI"
                title="Data Analysis Powered"
                highlight=" by Next Gen AI"
                description="Data Analysis with AI Your spreadsheet skills are about to become superpowers. Learn to analyse messy real-world data,
                generate dashboards, and automate reports using AI — all without writing a single complex formula. Turn raw CSV files into boardroom-ready
                insights in hours."
                modules="10"
                projects="20+"
                hours="50+"
            />

            <CurriculumSection modules={modules} />

            <CallToAction
                title="Turn Raw Data into Real Power"
                description="Don't just count numbers—build the systems that interpret them. Join our next cohort and master the AI-driven future of 
                business intelligence."
                secondaryText="Next cohort starting soon • Limited seats"
            />

            <Footer />
        </>
    )
}