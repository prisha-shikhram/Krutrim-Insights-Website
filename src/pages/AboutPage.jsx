// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import AboutUsHeader from "../sections/About/AboutUsHeader";
import WhyKrutrim from "../sections/About/WhyKrutrim";
import VisionSection from "../sections/About/VisionSection";
import WhatMakesUsDifferent from "../sections/About/WhatMakesUsDifferent";
import IndustryStats from "../sections/About/IndustryStats";
import LearningJourney from "../sections/About/LearningJourney";
import CollegeOutreach from "../sections/About/CollegeOutreach";
import CTA from "../sections/About/FinalCTA";

// about page component
export default function AboutPage() {
    return (
        <>
            <Navbar />
            
            <AboutUsHeader />
            <IndustryStats />
            <WhyKrutrim />
            <VisionSection />
            <WhatMakesUsDifferent />
            <LearningJourney />
            <CollegeOutreach />
            <CTA />

            <Footer />
        </>
    )
}