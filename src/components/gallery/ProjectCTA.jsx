// import icons
import { ArrowRight, Rocket, Users } from 'lucide-react';

// import link
import { Link } from 'react-router-dom';

// project gallery cta
export default function ProjectCTA() {
    return (
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <Link
                to="/training"
                className="max-md:w-full"
            >
                <button
                    className="group flex items-center gap-2 px-8 py-4 bg-white text-[#0189c7] font-bold rounded-xl shadow-lg 
                    transition-all active:scale-95 cursor-pointer max-md:w-full justify-center"
                >
                    <Rocket className="w-4 h-4 max-md:hidden" />
                    View Our Programs
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>

            <Link
                to="/contact#send-message"
                className="max-md:w-full"
            >
                <button
                    className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold 
                    rounded-xl backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white active:scale-95 cursor-pointer 
                    max-md:w-full justify-center"
                >
                    <Users className="w-4 h-4 max-md:hidden" />
                    Contact Our Team
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>
        </div>
    )
}