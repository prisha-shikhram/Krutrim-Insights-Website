// import icons
import { CheckCircle2 } from "lucide-react";

// certificate component
export default function Certificate() {
    return (
        <div className="flex-1 relative w-full flex justify-center items-center">
            {/* Certificate Image Placeholder */}
            <div
                className="relative aspect-4/3 w-full max-w-lg overflow-hidden rounded-4xl border border-gray-100 bg-white/80 p-6
                shadow-2xl backdrop-blur-sm group hover:border-gray-200 transition-all duration-300"
            >
                {/* Certificate Image */}
                <img
                    src="/images/other/Certificate.jpeg"
                    alt="Official AI Certification Placeholder"
                    className="h-full w-full rounded-2xl object-cover"
                />

                {/* Glass overlay effect on the image */}
                <div className="absolute inset-x-6 inset-y-6 rounded-2xl bg-black/10 transition-opacity opacity-0 group-hover:opacity-100" />
            </div>

            {/* Floating Badge */}
            <div
                className="absolute -right-6 md:right-15 -bottom-6 lg:-right-4 bg-white p-2 sm:p-4 rounded-2xl shadow-xl border border-gray-50
                animate-bounce transition-all"
            >
                <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                        <CheckCircle2 className="text-emerald-600 w-6 h-6" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-400 font-bold uppercase tracking-tighter">Status</p>
                        <p className="text-sm font-bold text-gray-900">Verified Professional</p>
                    </div>
                </div>
            </div>
        </div>
    )
}