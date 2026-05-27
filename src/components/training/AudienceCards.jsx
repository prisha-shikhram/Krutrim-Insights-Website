// audience cards component
export default function AudienceCards({ targets }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {targets.map((target, idx) => (
                <div
                    key={idx}
                    className="group relative flex flex-col p-8 rounded-4xl border border-gray-100 bg-white shadow-sm transition-all
                    duration-500 hover:shadow-xl hover:-translate-y-2"
                >
                    {/* Icon Container */}
                    <div
                        className={`mb-8 flex h-14 w-14 items-center justify-center rounded-2xl
                        ${target.bg} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
                    >
                        {target.icon}
                    </div>

                    {/* Text Content */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-900">{target.title}</h3>
                            <p className={`text-sm font-black uppercase tracking-tighter mt-1 ${target.textColor}`}>
                                {target.subtitle}
                            </p>
                        </div>

                        <p className="text-gray-500 leading-relaxed">
                            {target.desc}
                        </p>
                    </div>

                    {/* PILL TAGS */}
                    <div className="mt-6 flex flex-wrap gap-2">
                        {target.tags?.map((tag, tagIdx) => (
                            <span
                                key={tagIdx}
                                className={`px-3 py-1 rounded-full text-xs font-semibold border ${target.bg} ${target.textColor} ${target.borderColor}`}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}