// routing imports
import { Link } from "react-router-dom";

// import icons
import { ArrowLeft } from "lucide-react";

// back to home button for admin login page
export default function BackToHome() {
    return (
        <Link
            to="/"
            className="absolute top-8 left-8 z-20 flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-[#0189c7] transition-all 
            duration-200 group"
        >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
        </Link>
    )
}