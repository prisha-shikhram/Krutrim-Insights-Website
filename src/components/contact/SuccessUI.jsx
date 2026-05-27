// success UI component
export default function SuccessUI({ setSubmitted }) {
    return (
        <div className="py-16 text-center animate-in fade-in zoom-in duration-500">
            <div
                className="w-20 h-20 bg-linear-to-br from-green-100 to-green-200 text-green-600 rounded-full flex items-center
                justify-center mx-auto mb-6 shadow-md"
            >
                <svg
                    className="w-10 h-10"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M5 13l4 4L19 7"
                    />
                </svg>
            </div>

            <h3 className="text-2xl font-bold text-slate-900">
                Message Sent Successfully!
            </h3>

            <p className="text-slate-500 mt-3 max-w-md mx-auto">
                Thanks for reaching out. Our team will get back to you within <span className="font-semibold text-slate-700">24 hours</span>.
            </p>

            <button
                onClick={() => setSubmitted(false)}
                className="mt-8 px-6 py-3 bg-[#0189c7] text-white rounded-xl font-semibold hover:scale-105 transition cursor-pointer"
            >
                Send Another Message
            </button>
        </div>
    )
}