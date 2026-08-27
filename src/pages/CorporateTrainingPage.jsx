// import navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CorporateTrainingHero from "../sections/Corporate/CorporateTrainingHero";
import CoursesSection from "../sections/Corporate/CoursesSection";
import HowItWorksSection from "../sections/Corporate/HowItWorksSection";
import TeamSection from "../sections/Corporate/TeamSection";
import CTASection from "../sections/Corporate/CTASection";

// corporate training page
export default function CorporateTrainingPage() {
    return (
        <>
            <Navbar />
            <CorporateTrainingHero />
            <CoursesSection />
            <HowItWorksSection />
            <TeamSection />
            <CTASection />
            <Footer />
        </>
    )
}