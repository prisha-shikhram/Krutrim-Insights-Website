// import icons
import { ArrowRight, Building2, Calendar } from 'lucide-react';

// import link
import { Link } from 'react-router-dom';

// about cta buttons
export default function AboutCTA() {
    return (
        <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-4 w-full">
            <Link
                to="/training"
                className='max-md:w-full'
            >
                <button
                    className="group flex items-center gap-2 px-8 py-4 bg-white text-[#0189c7] font-bold rounded-xl shadow-lg 
                    transition-all hover:scale-105 active:scale-95 cursor-pointer max-md:w-full justify-center"
                >
                    <Building2 className="w-4 h-4 max-md:hidden" />
                    Explore Programs for Your Team
                    <ArrowRight className="max-md:hidden w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>

            <Link
                to="/contact#send-message"
                className='max-md:w-full'
            >
                <button
                    className="group flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white/30 text-white font-bold 
                    rounded-xl backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white active:scale-95 cursor-pointer max-md:w-full justify-center"
                >
                    <Calendar className="w-4 h-4 max-md:hidden" />
                    Book a Free Consultation
                    <ArrowRight className="max-md:hidden w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
            </Link>
        </div>
    )
}