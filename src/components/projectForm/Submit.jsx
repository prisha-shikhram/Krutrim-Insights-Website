// submit button component for project form
export default function Submit({ onSubmit, loading, disabled, PRIMARY }) {
    return (
        <div style={{ animation: "slideUp 0.5s .40s both" }}>
            <button
                onClick={onSubmit}
                disabled={disabled}
                className="relative w-full py-4 rounded-xl font-bold text-sm tracking-widest uppercase text-white transition-all
                duration-200 overflow-hidden"
                style={{
                    background: loading ? "rgba(1,137,199,0.5)" : `linear-gradient(135deg, ${PRIMARY} 0%, #00c6ff 100%)`,
                    boxShadow: loading ? "none" : "0 4px 22px rgba(1,137,199,0.42)",
                    cursor: loading ? "not-allowed" : "pointer",
                    transform: loading ? "scale(0.99)" : "scale(1)",
                }}
            >
                {!loading && (
                    <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                            background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
                            backgroundSize: "200% auto",
                            animation: "shimmer 2.5s linear infinite",
                        }}
                    />
                )}

                {loading ? (
                    <span className="flex items-center justify-center gap-3">
                        <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <circle
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="rgba(255,255,255,0.35)"
                                strokeWidth="3"
                            />

                            <path
                                d="M12 2a10 10 0 0 1 10 10"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                            />
                        </svg>
                        Submitting…
                    </span>
                ) : (
                    "Submit Project →"
                )}
            </button>
        </div>
    )
}