// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CollegeHeader from "../sections/College/CollegeHeader";
import SeminarSection from "../sections/College/SeminarSection";
import CampusImpact from "../sections/College/CampusImpact";
import HowWeWork from "../sections/College/HowWeWork";
import CollegeCTA from "../sections/College/CollegeCTA";

// college page
export default function CollegeMain() {
    return (
        <>
            <Navbar />

            <CollegeHeader />
            <SeminarSection />
            <CampusImpact />
            <HowWeWork />
            <CollegeCTA />

            <Footer />
        </>
    )
}