// import usestate
import { useState } from "react";

// import link
import { Link } from "react-router-dom";

// import icons
import { FiMenu } from "react-icons/fi";

// navlinks
const navlinks = [
    { label: "Home", link: "/" },
    { label: "About Us", link: "/about" },
    {
        label: "Programs",
        dropdown: [
            { name: "Our Courses", link: "/training" },
            { name: "Agentic AI with Data Analysis", link: "/courses/agentic-ai" },
            { name: "Data Analysis powered by Next GenAI", link: "/courses/data-analysis" },
            { name: "Web Development with AI", link: "/courses/web-development" },
            { name: "AI for business and management", link: "/courses/ai-for-business" },
        ]
    },
    {
        label: "Campus",
        dropdown: [
            { name: "College Collaborations", link: "/college/home" },
            { name: "Tecnia Institute of Advanced Studies", link: "/college/Tecnia" },
            { name: "SGTBIMIT", link: "/college/SGTBIMIT" },
        ]
    },
    {
        label: "Explore",
        dropdown: [
            { name: "Project Gallery", link: "/project-gallery" },
            // { name: "AI Lab", link: "" },
        ]
    },
    { label: "Contact Us", link: "/contact#send-message" },
];

// import components
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

// navbar component
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);

    return (
        <div className="flex flex-row justify-between items-center pl-3 pr-6 xl:px-12 py-4 shadow-sm fixed top-0 left-0 w-full z-50 bg-white">
            {/* Logo */}
            <Link to="/">
                <div className="flex flex-row items-center gap-3 -mt-1">
                    <img
                        src="/favicon/logo.svg"
                        alt="logo"
                        className="h-10 w-10 sm:h-13 sm:w-13 xl:-ml-3"
                    />

                    <div className="flex flex-col cursor-pointer font-[Times-New-Roman] leading-3">
                        <h3 className="text-black text-2xl sm:text-3xl sm:font-semibold">Krutrim Insights</h3>
                        <h5 className="text-[#0189c7] text-[12px] min-[500px]:text-[14px] font-medium">
                            Don't Compete with AI. Collaborate with it.
                        </h5>
                    </div>
                </div>
            </Link>

            {/* Desktop Nav */}
            <DesktopNav navlinks={navlinks} />

            {/* Hamburger Button */}
            <div className="xl:hidden flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-slate-900"
                >
                    <FiMenu size={28} />
                </button>
            </div>

            {/* Mobile Sidebar/Dropdown */}
            {isOpen && (
                <MobileNav
                    navlinks={navlinks}
                    activeDropdown={activeDropdown}
                    setActiveDropdown={setActiveDropdown}
                />
            )}
        </div>
    );
}