// header component for project form
export default function Header({ PRIMARY }) {
    return (
        <div
            className="mb-8 text-center"
            style={{ animation: "slideUp 0.5s .08s both" }}
        >
            <div className="flex items-center justify-center gap-3 mb-4">
                <div
                    className="h-px flex-1"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(1,137,199,0.4))" }}
                />

                <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-base font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${PRIMARY}, #00c6ff)`, boxShadow: "0 4px 18px rgba(1,137,199,0.4)" }}
                >
                    ✦
                </div>

                <div
                    className="h-px flex-1"
                    style={{ background: "linear-gradient(90deg, rgba(1,137,199,0.4), transparent)" }}
                />
            </div>

            <h1
                className="text-3xl font-extrabold tracking-tight"
                style={{ background: `linear-gradient(90deg, ${PRIMARY} 0%, #00c6ff 100%)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
                Project Submission
            </h1>

            <p className="text-gray-400 text-sm mt-2">Fill in the details below to submit your project</p>
        </div>
    )
}