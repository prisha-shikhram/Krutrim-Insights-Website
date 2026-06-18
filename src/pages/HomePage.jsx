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
import DataPromoStrip from "../sections/Home/DataPromoStrip";
import DataAnalysisModal from "../sections/Home/DataAnalysisModal";

// import usestate
import { useState } from "react";

// home page component
export default function HomePage() {
    const [isDataModalOpen, setIsDataModalOpen] = useState(false);

    return (
        <>
            <Navbar />

            {/* new course strip */}
            <DataPromoStrip onOpenModal={() => setIsDataModalOpen(true)} />

            {/* New Agentic AI Program Modal */}
            <DataAnalysisModal
                isOpen={isDataModalOpen}
                onClose={() => setIsDataModalOpen(false)}
            />

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