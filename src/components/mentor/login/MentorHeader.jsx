// import icons
import { GraduationCap } from "lucide-react";

// mentor header component
export default function MentorHeader({ PRIMARY }) {
    return (
        <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4"
                style={{
                    background: `linear-gradient(135deg, ${PRIMARY}, #818cf8)`,
                    boxShadow: "0 10px 30px rgba(99,102,241,0.3)"
                }}
            >
                <GraduationCap size={32} />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Mentor Login</h1>
            <p className="text-gray-400 text-sm mt-2">Manage your students & sessions</p>
        </div>
    )
}