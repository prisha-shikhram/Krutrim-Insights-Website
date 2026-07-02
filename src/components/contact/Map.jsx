// import icons
import { FaLinkedinIn, FaInstagram, FaWhatsapp } from "react-icons/fa";

// map component
export default function Map() {
    // Data for links and social media
    const socialLinks = [
        { icon: <FaLinkedinIn className="w-6 h-6" />, href: "https://www.linkedin.com/company/krutrim-insights/", label: "LinkedIn" },
        { icon: <FaWhatsapp className="w-6 h-6" />, href: "https://wa.me/918882129654", label: "WhatsApp" },
    ];

    return (
        <div className="space-y-8">
            {/* embedded map */}
            <div className="w-full h-100 rounded-[40px] overflow-hidden border border-slate-100 shadow-sm group">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.7070408274353!2d77.1517988!3d28.6932931!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d032fb37dbe2b%3A0xce7d6a4e3a3f079e!2sKrutrim%20Insights!5e1!3m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    className="sm:grayscale group-hover:grayscale-0 transition-all duration-700"
                />
            </div>

            {/* social links */}
            <div className="flex gap-4">
                {socialLinks.map((social, idx) => (
                    <a
                        key={idx}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-600
                        hover:bg-[#0189c7] hover:text-white transition cursor-pointer"
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </div>
    )
}