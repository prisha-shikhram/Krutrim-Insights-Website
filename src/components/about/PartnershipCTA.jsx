// import motion
import { motion } from 'framer-motion';

// import link
import { Link } from 'react-router-dom';

// import icons
import { GraduationCap, ArrowRight } from 'lucide-react';

// partnership cta component
export default function PartnershipCTA() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 md:p-10 rounded-3xl bg-[#f8fbff] border border-blue-50 flex flex-col lg:flex-row items-center justify-between gap-8"
        >
            <div className="flex flex-col lg:flex-row gap-6 items-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm shrink-0 border border-blue-50">
                    <GraduationCap size={28} className="text-[#0189c7]" />
                </div>

                <div className="space-y-1">
                    <h4 className="text-2xl font-bold text-gray-900 max-lg:text-center max-lg:mb-5">Let's build the AI-ready campuses of tomorrow.</h4>
                    <p className="text-gray-500 text-md md:text-base max-lg:text-center">
                        Partner with Krutrim Insights to empower your students and elevate your institution.
                    </p>
                </div>
            </div>

            <Link to="/college/home">
                <button
                    className="flex items-center gap-2 px-8 py-3.5 lg:py-4 bg-[#0189c7] text-white font-bold rounded-xl hover:bg-[#0077ae] 
                    transition-all shadow-lg shadow-sky-100 group whitespace-nowrap cursor-pointer"
                >
                    Partner With Us
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
            </Link>
        </motion.div>
    )
}