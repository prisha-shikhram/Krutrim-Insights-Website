// stat grid component
export default function StatGrid({ statCards }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {statCards.map((stat, i) => (
                <div
                    key={i}
                    className="bg-white/60 backdrop-blur-sm p-8 rounded-4xl border border-white shadow-sm flex items-center justify-between 
                    group hover:bg-white transition-all duration-300"
                >
                    <div>
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-800 tracking-tighter">{stat.value}</h3>
                    </div>

                    <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>{stat.icon}</div>
                </div>
            ))}
        </div>
    )
}