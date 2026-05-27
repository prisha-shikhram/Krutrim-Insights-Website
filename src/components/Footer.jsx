// import icons
import { FaLinkedinIn, FaWhatsapp } from "react-icons/fa";

// import Link
import { Link } from "react-router-dom";

// footer component
export default function Footer() {
    const currentYear = new Date().getFullYear();

    // Data for links and social media
    const socialLinks = [
        { icon: <FaLinkedinIn className="w-5 h-5" />, href: "https://www.linkedin.com/company/krutrim-insights/", label: "LinkedIn" },
        { icon: <FaWhatsapp className="w-5 h-5" />, href: "https://wa.me/918882129654", label: "WhatsApp" },
    ];

    // course links
    const courseLinks = [
        { name: "Agentic AI with Data Analysis", link: "/courses/agentic-ai" },
        { name: "Data Analysis powered by Next GenAI", link: "/courses/data-analysis" },
        { name: "Web Development with AI", link: "/courses/web-development" },
        { name: "AI for business and management", link: "/courses/ai-for-business" },
    ];

    // quick links
    const companyLinks = [
        { name: "About", link: "/about" },
        { name: "Our Programs", link: "/training" },
        { name: "College Collaborations", link: "/college/home" },
        { name: "Project Gallery", link: "/project-gallery" },
        { name: "Contact Us", link: "/contact#send-message" },
    ];

    // bottom bar links
    const bottomLinks = [
        { name: "Privacy Policy", link: "/privacy" },
        { name: "Terms of Use", link: "/terms" },
    ];

    return (
        <footer className="bg-[#020817] text-gray-400 py-12 md:py-20 px-6 border-t border-white/5">
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="md:col-span-5 space-y-6">
                        <div className="flex items-center gap-3">
                            <img
                                src="/favicon/logo.svg"
                                alt="Krutrim Insights Logo"
                                className="h-13 w-auto object-contain -ml-3"
                            />

                            <div className="flex flex-col justify-evenly">
                                <span className="text-xl font-semibold text-white tracking-tight">Krutrim Insights</span>
                                <h5 className="text-[#0189c7] text-[12px] min-[500px]:text-[14px] font-medium">
                                    Don't Compete with AI. Collaborate with it.
                                </h5>
                            </div>
                        </div>

                        <p className="max-w-md text-base leading-relaxed">
                            Build with AI. Not just learn about it. <br />
                            Practical AI education for India's next generation of builders.
                        </p>

                        {/* Social Links */}
                        <div className="flex items-center gap-4">
                            {socialLinks.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={social.label}
                                    className="p-3 rounded-xl bg-white/5 hover:bg-[#0189c7] hover:text-white transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Cources Links */}
                    <div className="md:col-span-4 space-y-6">
                        <h4 className="text-[16px] font-bold uppercase tracking-[0.2em] text-white/90">Our Courses</h4>

                        <ul className="space-y-4">
                            {courseLinks.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.link}
                                        className="hover:text-[#0189c7] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="md:col-span-3 space-y-6">
                        <h4 className="text-[16px] font-bold uppercase tracking-[0.2em] text-white/90">Quick Links</h4>

                        <ul className="space-y-4">
                            {companyLinks.map((item, idx) => (
                                <li key={idx}>
                                    <Link
                                        to={item.link}
                                        className="hover:text-[#0189c7] transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
                    <p>© {currentYear} Krutrim Insights. All rights reserved.</p>

                    <div className="flex gap-8">
                        {bottomLinks.map((item, idx) => (
                            <Link
                                key={idx}
                                to={item.link}
                                className="hover:text-[#0189c7] transition-colors"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}