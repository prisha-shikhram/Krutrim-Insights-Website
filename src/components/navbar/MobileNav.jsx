// import icons
import { FiChevronDown } from "react-icons/fi";

// import link
import { Link } from "react-router-dom";

// import framer motion
import { motion } from 'framer-motion';

// mobile navelements
export default function MobileNav({ navlinks, activeDropdown, setActiveDropdown, setIsOpen }) {
    // handle toggle of dropdown
    const handleToggle = (label) => {
        setActiveDropdown(activeDropdown === label ? null : label);
    };

    return (
        <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-slate-50 xl:hidden">
            <ul className="flex flex-col p-6 gap-4 font-[Montserrat]">
                {navlinks.map((navlink, idx) => (
                    <div key={idx}>
                        {navlink.dropdown ? (
                            <>
                                <button
                                    onClick={() => handleToggle(navlink.label)}
                                    className="flex items-center justify-between w-full text-[#0189c7] text-lg font-medium"
                                >
                                    {navlink.label}
                                    <motion.div
                                        animate={{ rotate: activeDropdown === navlink.label ? 180 : 0 }}
                                        className="text-[#0189c7]"
                                    >
                                        <FiChevronDown size={20} />
                                    </motion.div>
                                </button>

                                {activeDropdown === navlink.label && (
                                    <ul className="mt-3 ml-4 border-l-2 border-blue-50 space-y-3">
                                        {navlink.dropdown.map((sub, sIdx) => (
                                            <Link
                                                key={sIdx}
                                                to={sub.link}
                                                onClick={() => setIsOpen(false)}
                                            >
                                                <li className="pl-4 py-1 text-[16px] text-slate-600 font-medium">
                                                    {sub.name}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                )}
                            </>
                        ) : (
                            <Link
                                to={navlink.link}
                                onClick={() => setIsOpen(false)}
                            >
                                <li className="text-[#0189c7] text-lg font-medium">
                                    {navlink.label}
                                </li>
                            </Link>
                        )}
                    </div>
                ))}

                <Link
                    to="/student/login"
                    className="w-full"
                >
                    <button className="bg-[#0189c7] px-4 py-2 text-lg rounded-lg text-white font-medium cursor-pointer font-[Montserrat] w-full">
                        Student Portal
                    </button>
                </Link>
            </ul>
        </div>
    )
}