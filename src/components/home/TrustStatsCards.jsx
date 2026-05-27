// trust stat cards component
export default function TrustStatsCards({ stats }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, idx) => (
                <div
                    key={idx}
                    className="group relative p-8 rounded-4xl bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl
                    hover:-translate-y-1 overflow-hidden"
                >
                    {/* Icon Background Circle */}
                    <div className={`mb-6 flex h-14 w-14 items-center justify-center rounded-2xl ${stat.color} transition-transform duration-500 group-hover:rotate-12`}>
                        {stat.icon}
                    </div>

                    {/* Stat Content */}
                    <div className="space-y-2">
                        <h3 className="text-3xl font-black text-gray-900 tracking-tight">
                            {stat.value}
                        </h3>

                        <div className="space-y-1">
                            <p className="text-sm font-bold text-gray-800 uppercase tracking-wide">
                                {stat.label}
                            </p>

                            <p className="text-sm text-gray-500">
                                {stat.desc}
                            </p>
                        </div>
                    </div>

                    {/* Decorative Accent (appears on hover) */}
                    <div
                        className="absolute top-0 right-0 h-32 w-32 bg-linear-to-br from-gray-50 to-transparent opacity-0 group-hover:opacity-100
                        transition-opacity"
                    />
                </div>
            ))}
        </div>
    )
}