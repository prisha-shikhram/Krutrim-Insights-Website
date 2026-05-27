// import icons
import { Users, Briefcase, Code, ArrowRight } from "lucide-react";

// import Link
import { Link } from "react-router-dom";

// course card component
export default function CourseCard({ course }) {
    return (
        <div
            className="group relative flex flex-col h-155 sm:h-145 w-full overflow-hidden rounded-3xl bg-white shadow-md
            transition-all duration-500 hover:shadow-2xl"
        >
            {/* IMAGE HEADER SECTION */}
            <div className="relative h-40 sm:h-64 w-full overflow-hidden transition-all duration-500 ease-in-out sm:group-hover:h-40">
                <img
                    src={course.image}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-linear-to-t ${course.gradient} opacity-50 transition-opacity group-hover:opacity-30`} />

                {/* Icon Floating on Image */}
                <div className="absolute left-6 bottom-6 z-20 transition-transform duration-500 -translate-y-12 sm:translate-y-0 sm:group-hover:-translate-y-12">
                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 backdrop-blur-md text-white border
                        border-white/30 shadow-xl`}
                    >
                        {course.icon}
                    </div>
                </div>
            </div>

            {/* CONTENT CONTAINER (The Overlapping Part) */}
            <div
                className="absolute inset-x-0 bottom-0 z-10 flex flex-col bg-white px-6 pb-8 pt-10 transition-all duration-500 ease-in-out
                h-115 sm:h-87.5 sm:group-hover:h-115 rounded-t-4xl shadow-[0_-15px_30px_rgba(0,0,0,0.05)] sm:group-hover:shadow-[0_-20px_40px_rgba(0,0,0,0.12)]"
            >
                {/* Course Title */}
                <h3 className="mb-4 text-2xl font-extrabold leading-tight text-gray-900 transition-colors sm:group-hover:text-blue-600">
                    {course.title}
                </h3>

                {/* Badges */}
                <div className="mb-6 flex flex-wrap gap-2 text-[11px] font-bold uppercase tracking-wider">
                    <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-blue-600 border border-blue-100">{course.duration}</span>
                    <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-purple-600 border border-purple-100">{course.learningMode}</span>
                    <span className="rounded-lg bg-red-50 px-3 py-1.5 text-red-600 border border-red-100">Only {course.batchSize}</span>
                </div>

                {/* Details Section */}
                <div className="space-y-4 text-sm text-gray-600">
                    <div className="flex items-start gap-3">
                        <Users className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                        <p><span className="font-bold text-gray-800">Roles:</span> {course.roles}</p>
                    </div>

                    <div className="flex items-start gap-3">
                        <Code className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />

                        <div className="flex flex-wrap gap-1.5">
                            {course.skills.map((skill) => (
                                <span
                                    key={skill}
                                    className="bg-gray-100 px-2.5 py-1 rounded-md text-[11px] font-semibold text-gray-700"
                                >
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-start gap-3 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        <Briefcase className="mt-0.5 h-4 w-4 shrink-0 text-gray-400" />
                        <p className="text-gray-500 font-medium">{course.placement}</p>
                    </div>
                </div>

                {/* CTA Button */}
                <div className="mt-auto pt-6">
                    <Link to={course.link}>
                        <button
                            className={`flex w-full items-center justify-center gap-2 rounded-2xl bg-linear-to-r ${course.gradient} py-4 text-sm font-bold
                            text-white shadow-lg transition-all hover:scale-[1.02] active:scale-95 cursor-pointer group/btn`}
                        >
                            Explore Program <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}