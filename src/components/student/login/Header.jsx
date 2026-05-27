// import icons
import { GraduationCap } from "lucide-react";

// header component
export default function Header({ PRIMARY }) {
    return (
        <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-4"
                style={{
                    background: `linear-gradient(135deg, ${PRIMARY}, #00c6ff)`,
                    boxShadow: "0 10px 30px rgba(1,137,199,0.3)"
                }}>

                <GraduationCap size={32} />
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">Student Login</h1>
            <p className="text-gray-400 text-sm mt-2">Enter your details to access your batch</p>
        </div>
    )
}