// import components
import Background from "../utils/BackgroundEffect";

// import link
import { Link } from "react-router-dom";

// success screen
export default function Success({ PRIMARY, form }) {
    return (
        <div className="min-h-screen w-full bg-white flex items-center justify-center relative px-4">
            {/* background effect */}
            <Background />

            <div
                className="relative z-10 flex flex-col items-center gap-5 px-8 py-12 rounded-3xl max-w-md w-full text-center"
                style={{
                    background: "white",
                    border: "1px solid rgba(1,137,199,0.18)",
                    boxShadow: "0 0 40px rgba(1,137,199,0.1), 0 20px 60px rgba(0,0,0,0.07)",
                    animation: "slideUp 0.7s cubic-bezier(.16,1,.3,1) both",
                }}
            >
                <div
                    className="w-20 h-20 rounded-full flex items-center justify-center text-3xl text-white"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY}, #00c6ff)`, boxShadow: "0 0 30px rgba(1,137,199,0.4)" }}
                >
                    ✓
                </div>

                <h2 className="text-2xl font-bold text-gray-800">Project Submitted!</h2>

                <p className="text-gray-500 text-sm leading-relaxed">
                    Thank you, <span style={{ color: PRIMARY, fontWeight: 600 }}>{form.fullName}</span>.<br />
                    Your project has been received and is under review.
                </p>

                <div
                    className="w-full h-px"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(1,137,199,0.25), transparent)" }}
                />

                <div className="w-full flex flex-col">
                    {[["Name", form.fullName], ["Email", form.emailId], ["Contact", form.contactNumber]].map(([k, v]) => (
                        <div
                            key={k}
                            className="flex justify-between text-xs py-2 border-b border-gray-100 last:border-0"
                        >
                            <span className="text-gray-400 font-medium">{k}</span>
                            <span className="text-gray-700 font-semibold">{v}</span>
                        </div>
                    ))}
                </div>

                <Link
                    to="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white text-center transition-all duration-200 hover:opacity-85
                    active:scale-95 cursor-pointer"
                    style={{
                        display: "block",
                        background: `linear-gradient(135deg, ${PRIMARY}, #00c6ff)`,
                        boxShadow: "0 4px 16px rgba(1,137,199,0.35)"
                    }}
                >
                    Visit our website →
                </Link>
            </div>
        </div>
    )
}