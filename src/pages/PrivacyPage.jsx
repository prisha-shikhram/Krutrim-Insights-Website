// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import PrivacyPolicy from "../sections/Privacy/PrivacyPolicy";

// about page component
export default function PrivacyPage() {
    return (
        <>
            <Navbar />
            <PrivacyPolicy />
            <Footer />
        </>
    )
}