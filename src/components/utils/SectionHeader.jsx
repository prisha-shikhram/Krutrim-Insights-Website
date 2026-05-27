// section header component
export default function SectionHeader({ title, highlight, description, subheading }) {
    return (
        <div className="mb-12 md:mb-16 px-4 flex justify-center items-center flex-col">
            {/* Main Title */}
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 md:text-5xl leading-tight text-center">
                {title}{" "}
                <span className="text-[#0189c7] inline-block">
                    {highlight}
                </span>
            </h2>

            {/* Description */}
            {description && (
                <p className="mt-3 max-w-2xl text-base md:text-lg text-gray-500 leading-relaxed text-center">
                    {subheading && (
                        <>
                            <span className="font-semibold text-gray-900 text-lg sm:text-xl block mb-1">
                                {subheading}
                            </span>
                        </>
                    )}
                    {description}
                </p>
            )}
        </div>
    );
}