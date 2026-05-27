// import icons
import { BookOpen, Mail } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// training cta
export default function TrainingCTA({ handleScroll }) {
    return (
        <div className="flex sm:flex-row flex-col items-center justify-center gap-4">
            <a
                href="#courses"
                onClick={handleScroll}
                className="max-sm:w-full"
            >
                <button
                    className="flex items-center gap-2 px-8 py-3 bg-[#0189c7] text-white rounded-lg font-semibold 
                    hover:bg-[#0178af] transition-all shadow-md cursor-pointer max-sm:w-full justify-center"
                >
                    <BookOpen size={20} />
                    Explore Courses
                </button>
            </a>

            <Link
                to="/contact#send-message"
                className="max-sm:w-full"
            >
                <button
                    className="flex items-center gap-2 px-8 py-3 bg-white text-gray-900 border border-gray-200 rounded-lg font-semibold 
                    hover:bg-gray-50 transition-all shadow-sm cursor-pointer max-sm:w-full justify-center"
                >
                    <Mail size={20} />
                    Contact Us
                </button>
            </Link>
        </div>
    )
}