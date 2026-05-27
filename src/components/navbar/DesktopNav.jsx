// import icons
import { FiChevronDown } from "react-icons/fi";

// import link
import { Link } from "react-router-dom";

// desktop navelements
export default function DesktopNav({ navlinks }) {
    return (
        <div className="hidden xl:flex flex-row items-center gap-10">
            <ul className="flex flex-row gap-8 items-center">
                {navlinks.map((navlink, idx) => (
                    <div
                        key={idx}
                        className="relative group"
                    >
                        {navlink.dropdown ? (
                            <>
                                <Link
                                    to={navlink.link}
                                    className="flex items-center gap-1 text-[#0189c7] text-xl font-medium hover:text-slate-500 font-[Montserrat]"
                                >
                                    {navlink.label}
                                    <FiChevronDown className="transition-transform group-hover:rotate-180" />
                                </Link>

                                {/* Dropdown Menu */}
                                <div className="absolute top-full left-0 pt-4 hidden group-hover:block w-72">
                                    <ul className="bg-white border border-slate-100 shadow-xl rounded-2xl overflow-hidden p-2">
                                        {navlink.dropdown.map((sub, sIdx) => (
                                            <Link
                                                key={sIdx}
                                                to={sub.link}
                                            >
                                                <li
                                                    className="px-4 py-3 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-[#0189c7]
                                                    rounded-xl transition-colors"
                                                >
                                                    {sub.name}
                                                </li>
                                            </Link>
                                        ))}
                                    </ul>
                                </div>
                            </>
                        ) : (
                            <Link to={navlink.link}>
                                <li className="text-[#0189c7] text-xl font-medium cursor-pointer hover:text-[#808080] font-[Montserrat]">
                                    {navlink.label}
                                </li>
                            </Link>
                        )}
                    </div>
                ))}
            </ul>

            <Link to="/student/login">
                <button className="bg-[#0189c7] px-6 py-2 text-xl rounded-lg text-white font-medium cursor-pointer font-[Montserrat]">
                    Student Portal
                </button>
            </Link>
        </div>
    )
}