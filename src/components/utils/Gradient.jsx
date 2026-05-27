// gradient background
export default function Gradient() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            {/* Primary Vivid Linear Gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0189c7]/20 via-[#0189c7]/5 to-white" />

            {/* Top Right Blob */}
            <div
                className="absolute -top-20 -right-20 h-80 w-80 sm:-top-40 sm:-right-20 sm:h-150 sm:w-150 rounded-full bg-linear-to-br from-[#0189c7]
                to-cyan-400 opacity-30 sm:opacity-20 blur-[60px] sm:blur-[100px]"
            />

            {/* Bottom Left Blob */}
            <div
                className="absolute -bottom-20 -left-20 h-80 w-80 sm:-bottom-40 sm:-left-20 sm:h-150 sm:w-150 rounded-full bg-linear-to-tr
                from-[#0189c7] to-blue-600 opacity-25 sm:opacity-15 blur-[60px] sm:blur-[100px]"
            />

            {/* Subtle Mesh Grid */}
            <div
                className="absolute inset-0 opacity-[0.04] sm:opacity-[0.05]
                bg-[linear-gradient(#0189c7_1px,transparent_1px),linear-gradient(90deg,#0189c7_1px,transparent_1px)] bg-size-[20px_20px] sm:bg-size-[30px_30px]"
            />
        </div>
    )
}