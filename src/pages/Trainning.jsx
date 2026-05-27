// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import TrainingHeader from "../sections/Training/TrainingHeader";
import CoursesSection from "../sections/Home/CoursesSection";
import TargetAudience from "../sections/Training/TargetAudience";
import ConsultationCTA from "../sections/Training/ConsultationCTA";

// training page
export default function Training() {
    return (
        <>
            <Navbar />

            <TrainingHeader />
            <CoursesSection />
            <TargetAudience />
            <ConsultationCTA />

            <Footer />
        </>
    )
}