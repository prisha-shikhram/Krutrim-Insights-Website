// import motion
import { motion } from 'framer-motion';

// import icons
import { UserPlus, BookOpen, Briefcase, Rocket, ArrowRight } from 'lucide-react';

// import link
import { Link } from 'react-router-dom';

// import components
import SectionHeader from '../../components/utils/SectionHeader';
import LearningSteps from '../../components/about/LearningSteps';

// learning journey steps data
const steps = [
    {
        number: "1",
        title: "Enroll",
        desc: "Register and get access to curated learning paths tailored for you.",
        icon: <UserPlus size={32} className="text-[#0189c7]" />
    },
    {
        number: "2",
        title: "Learn",
        desc: "Explore expert-led courses, concepts, and tools at your own pace.",
        icon: <BookOpen size={32} className="text-[#0189c7]" />
    },
    {
        number: "3",
        title: "Apply",
        desc: "Work on real projects and use industry-ready templates to build your skills.",
        icon: <Briefcase size={32} className="text-[#0189c7]" />
    },
    {
        number: "4",
        title: "Transform",
        desc: "Become AI-ready and drive measurable impact in your organization.",
        icon: <Rocket size={32} className="text-[#0189c7]" />
    }
];

// learning journey section component
export default function LearningJourney() {
    return (
        <section className="py-24 px-6 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Heading */}
                <SectionHeader
                    title="Your Learning"
                    highlight="Journey"
                    description="A simple 4-step path to build AI readiness and drive real impact."
                />

                {/* Learning Steps Component */}
                <LearningSteps steps={steps} />

                {/* CTA Button */}
                <Link to="/training">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mt-20 flex justify-center"
                    >
                        <button
                            className="flex items-center gap-2 px-8 py-3 bg-[#0189c7] text-white font-semibold rounded-lg hover:bg-[#0077ae] 
                            transition-all duration-300 shadow-lg shadow-sky-100 group cursor-pointer"
                        >
                            Explore Programs
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </Link>
            </div>
        </section>
    );
}