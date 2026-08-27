// team members data
const teamMembers = [
    {
        name: 'Vijay Raghavan',
        role: 'Chief Corporate Trainer',
        image: '/images/corporate/Vijay.png',
    },
    {
        name: 'Shrey Dhingra',
        role: 'Senior Corporate Trainer',
        image: '/images/corporate/Shrey.png',
    }
];

// team section
export default function TeamSection() {
    return (
        <section className="py-20 bg-white text-slate-900 antialiased">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span
                        className="text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#1089c7]/20 bg-[#1089c7]/10"
                        style={{ color: '#1089c7' }}
                    >
                        Our Experts
                    </span>

                    <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                        Learn Directly from <span style={{ color: '#1089c7' }}>Industry Practitioners</span>
                    </h2>

                    <p className="mt-4 text-base sm:text-lg text-slate-600">
                        Our trainers are veteran engineers and architects who bring real-world enterprise problem solving straight into the classroom.
                    </p>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group bg-slate-50 rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl 
                            hover:-translate-y-1 transition-all duration-300 flex flex-col"
                        >
                            {/* Image Frame */}
                            <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-slate-200">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                                />

                                <div
                                    className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 
                                    transition-opacity duration-300"
                                />
                            </div>

                            {/* Card Body */}
                            <div className="p-6 text-center">
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-[#1089c7] transition-colors mb-1">
                                    {member.name}
                                </h3>

                                <p
                                    className="text-xs font-semibold uppercase tracking-wider"
                                    style={{ color: '#1089c7' }}
                                >
                                    {member.role}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}