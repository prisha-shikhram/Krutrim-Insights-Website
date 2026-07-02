// import components
import Gradient from "../../components/utils/Gradient";
import VisualAnchor from "../../components/utils/VisualAnchor";
import CourseStats from "../../components/courses/CourseStats";
import CourseCTA from "../../components/courses/CourseCTA";

// course hero scomponent
export default function CourseHero({ badge, title, highlight, description, modules, projects, hours }) {
    // scroll function for curriculem section
    const scrollToCurriculum = () => {
        const element = document.getElementById('curriculum');
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <section className="relative w-full h-screen min-h-150 flex items-center justify-center px-6 overflow-hidden pt-26">
            {/* Gradient background */}
            <Gradient />

            <div className="relative z-10 mx-auto max-w-5xl text-center flex flex-col items-center justify-center">
                {/* Badge*/}
                <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#0189c7]/10 border border-[#0189c7]/20">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0189c7]">
                        {badge}
                    </p>
                </div>

                {/* Main Heading */}
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-[1.1]">
                    {title} <br />
                    <span className="text-[#0189c7]">{highlight}</span>
                </h1>

                {/* Description */}
                <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                    {description}
                </p>

                {/* Course Stats */}
                <CourseStats
                    modules={modules}
                    projects={projects}
                    hours={hours}
                />

                {/* CTA Buttons */}
                <CourseCTA scrollToCurriculum={scrollToCurriculum} />

                {/* Visual Anchor Dots */}
                <VisualAnchor />
            </div>
        </section>
    );
}