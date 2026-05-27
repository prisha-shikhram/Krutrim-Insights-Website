// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import HeroSection from "../sections/Home/Home";
import CoursesSection from "../sections/Home/CoursesSection";
import AdvantageSection from "../sections/Home/AdvantageSection";
import BenefitsSection from "../sections/Home/BenefitsSection";
import TrustStatsSection from "../sections/Home/TrustStatsSection";
import FAQ from "../sections/Home/FAQ";

// home page component
export default function HomePage() {
    return (
        <>
            <Navbar />

            <HeroSection />
            <CoursesSection />
            <AdvantageSection />
            <BenefitsSection />
            <TrustStatsSection />
            <FAQ />

            <Footer />
        </>
    )
}