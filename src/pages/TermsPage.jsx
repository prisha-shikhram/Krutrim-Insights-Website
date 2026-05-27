// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import TermsOfUse from "../sections/Terms/TermsOfUse";

// about page component
export default function TermsPage() {
    return (
        <>
            <Navbar />
            <TermsOfUse />
            <Footer />
        </>
    )
}