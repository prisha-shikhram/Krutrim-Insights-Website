// import hooks
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import ContactHeader from "../sections/Contact/ContactHeader";
import ContactFormSection from "../sections/Contact/ContactFormSection";

// Contact page component
export default function ContactPage() {
    const { hash } = useLocation();

    useEffect(() => {
        if (hash) {
            // Find the element with the ID matching the hash (minus the # character)
            const element = document.getElementById(hash.replace("#", ""));

            if (element) {
                // Delay slightly to ensure the DOM elements are fully painted
                setTimeout(() => {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }, 100);
            }
        }
    }, [hash]);
    
    return (
        <>
            <Navbar />
            <ContactHeader />
            <ContactFormSection />
            <Footer />
        </>
    )
}