// import icons
import { Layers, PlayCircle, Clock } from "lucide-react";

// course stats component
export default function CourseStats({ modules, projects, hours }) {
    return (
        <div className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="flex items-center gap-2 group transition duration-300">
                <div className="p-1.5 rounded-lg bg-blue-50 group-hover:bg-[#0189c7] transition-colors">
                    <Layers className="w-6 h-6 text-[#0189c7] group-hover:text-white" />
                </div>

                <span className="text-gray-900 font-bold text-[16px]">{modules} Modules</span>
            </div>

            <div className="flex items-center gap-2 group duration-300">
                <div className="p-1.5 rounded-lg bg-emerald-50 group-hover:bg-emerald-600 transition-colors">
                    <PlayCircle className="w-6 h-6 text-emerald-600 group-hover:text-white" />
                </div>

                <span className="text-gray-900 font-bold text-[16px]">{projects} Projects</span>
            </div>

            <div className="flex items-center gap-2 group duration-300">
                <div className="p-1.5 rounded-lg bg-purple-50 group-hover:bg-purple-600 transition-colors">
                    <Clock className="w-6 h-6 text-purple-600 group-hover:text-white" />
                </div>

                <span className="text-gray-900 font-bold text-[16px]">{hours} Hours</span>
            </div>
        </div>
    )
}