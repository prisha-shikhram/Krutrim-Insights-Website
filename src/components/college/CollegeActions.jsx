// import icons
import { Mail, ArrowRight, FileText } from "lucide-react";

// import link
import { Link } from 'react-router-dom';

// college actions component
export default function CollegeActions() {
    return (
        <div className="flex flex-col min-[750px]:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            <Link
                to="/contact#send-message"
                className="w-full min-[750px]:w-auto"
            >
                <button
                    className="group flex items-center gap-2 px-8 py-4 bg-white text-[#0189c7] font-bold rounded-xl shadow-lg 
                    transition-all hover:scale-105 active:scale-95 cursor-pointer w-full sm:w-auto justify-center"
                >
                    <Mail className="max-md:hidden w-4 h-4 transition-transform group-hover:rotate-12" />
                    Bring this to your campus
                    <ArrowRight className="max-md:hidden w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>

            <a
                href="/proposal/ProjectBuilding.pdf"
                download
                className="w-full min-[750px]:w-auto"
            >
                <button
                    className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold rounded-xl 
                    backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white active:scale-95 cursor-pointer w-full 
                    min-[750px]:w-auto justify-center"
                >
                    <FileText className=" max-md:hiddenw-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    Download Proposal
                    <ArrowRight className="max-md:hidden w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </a>
        </div>
    )
}