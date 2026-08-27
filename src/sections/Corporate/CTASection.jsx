// import icons
import { ArrowRight, Mail, Sparkles } from 'lucide-react';

// cta section
export default function CTASection() {
    const emailSubject = encodeURIComponent(
        'Inquiry: AI-Ready Workforce Training Program'
    );

    const emailBody = encodeURIComponent(
        "Hi Krutrim Insights Team,\n\nWe'd like to discuss a customized AI training program for our organization.\n\nCompany / Organization:\nTeam Size:\nKey Goals & Challenges:\nExpected Timeline:"
    );

    const emailLink = `mailto:corporatetraining@krutriminsights.com?subject=${emailSubject}&body=${emailBody}`;

    return (
        <section className="relative overflow-hidden bg-white py-20 text-slate-900 antialiased sm:py-28">
            {/* Subtle background glow */}
            <div
                className="pointer-events-none absolute left-1/2 top-1/2 h-105 w-175 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[120px]"
                style={{ backgroundColor: '#1089c7' }}
            />

            <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div
                    className="relative overflow-hidden rounded-[28px] border border-slate-200 bg-slate-50/70 px-6 py-12 sm:px-10 sm:py-16 lg:px-16 lg:py-20"
                >
                    {/* Decorative corner glow */}
                    <div
                        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full opacity-[0.08] blur-3xl"
                        style={{ backgroundColor: '#1089c7' }}
                    />

                    {/* Decorative grid */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.025]"
                        style={{
                            backgroundImage:
                                'linear-gradient(#1089c7 1px, transparent 1px), linear-gradient(90deg, #1089c7 1px, transparent 1px)',
                            backgroundSize: '32px 32px',
                        }}
                    />

                    <div className="relative mx-auto max-w-3xl text-center">
                        {/* Badge */}
                        <div
                            className="mb-6 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em]"
                            style={{
                                color: '#1089c7',
                                borderColor: '#1089c730',
                                backgroundColor: '#1089c70a',
                            }}
                        >
                            <Sparkles className="h-3.5 w-3.5" />
                            <span>Get Started</span>
                        </div>

                        {/* Heading */}
                        <h2 className=" text-3xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                            Build a Workforce That’s <br />
                            <span style={{ color: '#1089c7' }}>
                                Ready for AI.
                            </span>
                        </h2>

                        {/* Description */}
                        <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
                            Tell us where your teams are today and where you want them to go. We'll help design a practical training program around your people, tools, and business goals.
                        </p>

                        {/* CTA */}
                        <div className="mt-9">
                            <a
                                href={emailLink}
                                className="group inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-7 py-3.5 text-sm font-semibold text-white 
                                shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0 sm:w-auto"
                                style={{
                                    backgroundColor: '#1089c7',
                                    boxShadow:
                                        '0 12px 30px -12px rgba(16,137,199,0.45)',
                                }}
                            >
                                <Mail className="h-4 w-4" />
                                <span>Talk to Our Training Team</span>

                                <ArrowRight
                                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                                />
                            </a>
                        </div>

                        {/* Email */}
                        <div className="mt-6 flex flex-col items-center justify-center gap-1.5 text-xs sm:flex-row sm:gap-2">
                            <span className="text-slate-400">
                                Or email us directly
                            </span>

                            <a
                                href={emailLink}
                                className="font-medium transition-colors hover:text-slate-900"
                                style={{ color: '#1089c7' }}
                            >
                                corporatetraining@krutriminsights.com
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}