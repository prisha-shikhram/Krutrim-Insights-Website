// import icons
import { Search, Target, Sliders, Laptop, BarChart3, ArrowRight, Workflow, } from 'lucide-react';

// steps data
const steps = [
    {
        number: '01',
        title: 'Understand',
        description:
            'We learn about your business, teams, workflows, and specific operational challenges.',
        icon: Search,
    },
    {
        number: '02',
        title: 'Identify',
        description:
            'We pinpoint high-leverage areas where AI and digital tools create immediate business impact.',
        icon: Target,
    },
    {
        number: '03',
        title: 'Customize',
        description:
            'We tailor the curriculum around your actual tech stack, proprietary use cases, and skill levels.',
        icon: Sliders,
    },
    {
        number: '04',
        title: 'Train',
        description:
            'Interactive, hands-on workshops using real-world enterprise scenarios and live debugging.',
        icon: Laptop,
    },
    {
        number: '05',
        title: 'Measure',
        description:
            'Track adoption rates, team velocity metrics, learning outcomes, and on-the-job application.',
        icon: BarChart3,
    },
];

// how it works section
export default function HowItWorksSection() {
    const emailSubject = encodeURIComponent(
        'Custom Training Consultation Request'
    );

    return (
        <section className="relative overflow-hidden bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] py-20 text-slate-900 antialiased sm:py-28">
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mx-auto mb-14 max-w-3xl text-center sm:mb-20">
                    <div
                        className="mb-4 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider"
                        style={{
                            color: '#1089c7',
                            borderColor: '#1089c725',
                            backgroundColor: '#1089c710',
                        }}
                    >
                        <Workflow className="h-3.5 w-3.5" />
                        <span>Our Methodology</span>
                    </div>

                    <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                        How Custom Training{' '}
                        <span style={{ color: '#1089c7' }}>Works</span>
                    </h2>

                    <p className="mt-4 text-base leading-relaxed text-slate-600 sm:text-lg">
                        We do not believe in one-size-fits-all corporate training. Before designing a program, we evaluate your industry, business processes,
                        existing tools, employee skill levels, and the exact bottlenecks your teams face.
                    </p>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-12">
                    {steps.map((step, index) => {
                        const IconComponent = step.icon;
                        const cardSpan =
                            index < 2 ? 'lg:col-span-6' : 'lg:col-span-4';

                        return (
                            <div
                                key={step.number}
                                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-7 
                                sm:p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#1089c7]/30 hover:shadow-xl ${cardSpan}`}
                            >
                                {/* Top Header: Icon & Step Badge */}
                                <div className="relative z-10 flex items-center justify-between">
                                    <div
                                        className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                                        style={{
                                            color: '#1089c7',
                                            backgroundColor: '#1089c715',
                                        }}
                                    >
                                        <IconComponent
                                            className="h-6 w-6"
                                            strokeWidth={2}
                                        />
                                    </div>

                                    <span
                                        className="font-mono text-sm font-bold tracking-wider"
                                        style={{ color: '#1089c7' }}
                                    >
                                        {step.number}
                                    </span>
                                </div>

                                {/* Body Content */}
                                <div className="relative z-10 mt-10">
                                    <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-[#1089c7]">
                                        {step.title}
                                    </h3>

                                    <p className="mt-2.5 text-sm leading-relaxed text-slate-600">
                                        {step.description}
                                    </p>
                                </div>

                                {/* Bottom Accent Stripe */}
                                <div
                                    className="absolute inset-x-0 bottom-0 h-1 w-0 rounded-b transition-all duration-300 group-hover:w-full"
                                    style={{ backgroundColor: '#1089c7' }}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* CTA / Callout */}
                <div className="mt-16 text-center sm:mt-20">
                    <p className="mb-3 text-sm text-slate-600">
                        Need a tailored skills audit before getting started?
                    </p>

                    <a
                        href={`mailto:corporatetraining@krutriminsights.com?subject=${emailSubject}`}
                        className="inline-flex items-center gap-2 text-sm font-bold transition-all hover:opacity-85"
                        style={{ color: '#1089c7' }}
                    >
                        <span>Schedule a 15-Minute Discovery Call</span>
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                    </a>
                </div>
            </div>
        </section>
    );
}