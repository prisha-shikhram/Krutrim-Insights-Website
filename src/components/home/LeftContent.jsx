// import icons
import { ArrowRight } from "lucide-react";

// import link
import { Link } from "react-router-dom";

// left content component
export default function LeftContent({ benefits }) {
    return (
        <div className="flex-1 space-y-10 max-lg:w-full">
            <div className="grid gap-8">
                {benefits.map((benefit, idx) => (
                    <div
                        key={idx}
                        className="group flex gap-5 items-start"
                    >
                        <div className="flex-none mt-1 p-2 rounded-2xl bg-gray-50 group-hover:bg-white group-hover:shadow-md transition-all duration-300">
                            {benefit.icon}
                        </div>

                        <div className="space-y-1">
                            <h4 className="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                {benefit.title}
                            </h4>

                            <p className="text-gray-500 leading-relaxed max-w-md max-lg:max-w-full">
                                {benefit.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            <Link to="/training">
                <button
                    className="relative group overflow-hidden bg-linear-to-r from-blue-600 to-indigo-700 px-8 py-3 rounded-2xl w-full
                    text-white font-bold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-1 active:scale-95 cursor-pointer"
                >
                    <span className="relative z-10 flex items-center justify-center gap-3">
                        I want to be AI-Ready <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                </button>
            </Link>
        </div>
    )
}