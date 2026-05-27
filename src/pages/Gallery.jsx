// import Navbar and footer
import Navbar from "../components/navbar/Navbar";
import Footer from "../components/Footer";

// import sections
import GalleryHeader from "../sections/Gallery/GalleryHeader";
import ProjectCollageSection from "../sections/Gallery/ProjectCollageSection";
import IndustryRelevance from "../sections/Gallery/IndustryRelevance";
import ProjectGalleryCTA from "../sections/Gallery/ProjectGalleryCTA";

// Project gallery page component
export default function Gallery() {
    return (
        <>
            <Navbar />

            <GalleryHeader />
            <ProjectCollageSection />
            <IndustryRelevance />
            <ProjectGalleryCTA />

            <Footer />
        </>
    )
}