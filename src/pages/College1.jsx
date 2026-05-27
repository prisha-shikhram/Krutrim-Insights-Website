// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import CollegeApplicationForm from "../sections/College/CollegeApplicationForm";

// college page
export default function College1() {
    return (
        <>
            <Navbar />
            <CollegeApplicationForm collegeName="Tecnia Institute" />
            <Footer />
        </>
    )
}