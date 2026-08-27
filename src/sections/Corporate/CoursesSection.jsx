// import usestate
import { useState } from 'react';

// import icons
import { Sparkles, Users, Wrench, Target, Table, BrainCircuit, Megaphone, TrendingUp, ArrowRight, CheckCircle2, GraduationCap, Sparkle } from 'lucide-react';

// course categories
const courseCategories = [
    { id: 'all', label: 'All Programs' },
    { id: 'productivity', label: 'Workplace Productivity', icon: Sparkles },
    { id: 'leadership', label: 'Leadership & Strategy', icon: Users },
    { id: 'tools', label: 'AI + Business Tools', icon: Wrench },
    { id: 'functional', label: 'Function-Specific', icon: Target },
];

// courses data
const courses = [
    {
        category: 'productivity',
        categoryLabel: 'Workplace Productivity',
        badgeColor: 'bg-sky-50 text-sky-700 border-sky-200/60',
        accentColor: '#1089c7',
        title: 'Generative AI for Workplace Productivity',
        description:
            'Master prompt engineering, workflow automations, meeting syntheses, and document generations to dramatically cut everyday busywork.',
        bestFor: 'All employees & cross-functional teams',
        icon: Sparkles,
        highlights: ['Prompt Engineering & Workflows', 'Automated Summaries & Action Items', 'Slide & Document Co-creation'],
    },
    {
        category: 'leadership',
        categoryLabel: 'Leadership & Management',
        badgeColor: 'bg-amber-50 text-amber-700 border-amber-200/60',
        accentColor: '#d97706',
        title: 'AI for Management & Strategy',
        description:
            'Equip decision-makers to spot high-ROI AI initiatives, evaluate vendor tooling, audit operational bottlenecks, and lead AI transformation.',
        bestFor: 'Managers, team leads & business leaders',
        icon: Users,
        highlights: ['Strategic AI Roadmap Creation', 'Agentic Delegation Frameworks', 'Workflow Automation Audits'],
    },
    {
        category: 'tools',
        categoryLabel: 'AI + Business Tools',
        badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        accentColor: '#059669',
        title: 'AI with Excel & Spreadsheet Automation',
        description:
            'Supercharge spreadsheets with AI—generate complex nested formulas, automate messy data sanitation, and produce instant executive dashboards.',
        bestFor: 'Finance, Ops, HR, Sales & Analysts',
        icon: Table,
        highlights: ['Automated Formula Generation', 'Instant Data Cleansing Pipelines', 'Predictive Charting & Summaries'],
    },
    {
        category: 'tools',
        categoryLabel: 'AI + Business Tools',
        badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200/60',
        accentColor: '#4f46e5',
        title: 'AI for Research & Decision Intelligence',
        description:
            'Harness LLMs to accelerate competitive intelligence, extract cross-document facts, compare scenario models, and synthesize market data.',
        bestFor: 'Analysts, Strategists & Knowledge Workers',
        icon: BrainCircuit,
        highlights: ['Multi-Source Fact Extraction', 'Competitive Benchmark Synthesis', 'Data-Backed Scenario Modeling'],
    },
    {
        category: 'functional',
        categoryLabel: 'Function-Specific Training',
        badgeColor: 'bg-rose-50 text-rose-700 border-rose-200/60',
        accentColor: '#e11d48',
        title: 'AI in Marketing & Growth Operations',
        description:
            'Build end-to-end multi-channel content engines, scale personalized outreach, automate ad creative variations, and analyze performance cohorts.',
        bestFor: 'Marketing, Content & Growth Teams',
        icon: Megaphone,
        highlights: ['Scalable Multichannel Content Engines', 'Automated Campaign Variation Testing', 'Audience Segmentation & Copy Personalization'],
    },
    {
        category: 'functional',
        categoryLabel: 'Function-Specific Training',
        badgeColor: 'bg-teal-50 text-teal-700 border-teal-200/60',
        accentColor: '#0d9488',
        title: 'AI for Finance & Business Analytics',
        description:
            'Streamline financial variance models, automate reconciliation checks, summarize ledger movements, and forecast key operational metrics.',
        bestFor: 'Finance, Accounting & FP&A Teams',
        icon: TrendingUp,
        highlights: ['Financial Variance Analysis Models', 'Predictive Cash Flow Forecasting', 'Automated Ledger Reconciliation'],
    },
];

// courses section
export default function CoursesSection() {
    const [activeTab, setActiveTab] = useState('all');

    // filter courses
    const filteredCourses = activeTab === 'all'
        ? courses
        : courses.filter(course => course.category === activeTab);

    return (
        <section
            id="courses"
            className="py-24 sm:py-32 bg-slate-50/70 text-slate-900 antialiased relative overflow-hidden"
        >
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div
                        className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full border border-[#1089c7]/20 
                        bg-[#1089c7]/10 mb-4"
                        style={{ color: '#1089c7' }}
                    >
                        <Sparkle className="w-3.5 h-3.5 fill-current" />
                        <span>Targeted Curriculum</span>
                    </div>

                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">
                        Specialized AI Tracks for <span style={{ color: '#1089c7' }}>Every Team Tier</span>
                    </h2>

                    <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
                        Practical, zero-fluff training designed to eliminate operational friction and deliver measurable workforce velocity.
                    </p>
                </div>

                {/* Segmented Category Filter Bar */}
                <div className="flex justify-center mb-16">
                    <div
                        className="inline-flex flex-wrap items-center justify-center p-1.5 bg-white border border-slate-200/80 rounded-2xl shadow-xs 
                        gap-1 max-w-full"
                    >
                        {courseCategories.map((tab) => {
                            const Icon = tab.icon;
                            const isActive = activeTab === tab.id;

                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 
                                    cursor-pointer 
                                        ${isActive
                                            ? 'bg-[#1089c7] text-white shadow-md shadow-[#1089c7]/30'
                                            : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/60'
                                        }`}
                                >
                                    {Icon && <Icon className="w-4 h-4" />}
                                    <span>{tab.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Course Cards Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
                    {filteredCourses.map((course, index) => {
                        const IconComponent = course.icon;
                        const inquirySubject = encodeURIComponent(`Training Inquiry: ${course.title}`);

                        return (
                            <div
                                key={index}
                                className="group relative bg-white rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-2xl hover:border-[#1089c7]/40 
                                hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between overflow-hidden"
                            >
                                {/* Top Accent Stripe on Hover */}
                                <div
                                    className="absolute inset-x-0 top-0 h-1 w-0 group-hover:w-full transition-all duration-500"
                                    style={{ backgroundColor: '#1089c7' }}
                                />

                                <div className="p-8 sm:p-9 flex-1 flex flex-col">
                                    {/* Card Header: Icon + Category Badge */}
                                    <div className="flex items-start justify-between gap-4 mb-6">
                                        <div
                                            className="w-13 h-13 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-105
                                            shadow-xs"
                                            style={{
                                                backgroundColor: '#1089c715',
                                                color: '#1089c7'
                                            }}
                                        >
                                            <IconComponent className="w-6 h-6 stroke-2" />
                                        </div>

                                        <span className={`text-[11px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full border ${course.badgeColor}`}>
                                            {course.categoryLabel}
                                        </span>
                                    </div>

                                    {/* Title & Description */}
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-[#1089c7] transition-colors mb-3 leading-snug">
                                        {course.title}
                                    </h3>

                                    <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed mb-6">
                                        {course.description}
                                    </p>

                                    {/* Curriculum Highlights */}
                                    <div className="mt-auto pt-6 border-t border-slate-100">
                                        <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3">
                                            What Teams Learn to Build:
                                        </p>

                                        <div className="space-y-2.5">
                                            {course.highlights.map((point, idx) => (
                                                <div
                                                    key={idx}
                                                    className="flex items-start gap-2.5 text-xs sm:text-sm font-medium text-slate-700"
                                                >
                                                    <CheckCircle2 className="w-4 h-4 text-[#1089c7] shrink-0 mt-0.5" />
                                                    <span>{point}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Footer Section */}
                                <div
                                    className="px-8 sm:px-9 py-5 bg-slate-50/80 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center 
                                    justify-between gap-4"
                                >
                                    <div className="flex items-center gap-2.5">
                                        <div className="w-7 h-7 rounded-lg bg-slate-200/70 flex items-center justify-center text-slate-600 shrink-0">
                                            <GraduationCap className="w-4 h-4" />
                                        </div>

                                        <div className="text-xs">
                                            <span className="font-bold text-slate-900 block">Best For:</span>
                                            <span className="text-slate-600">{course.bestFor}</span>
                                        </div>
                                    </div>

                                    <a
                                        href={`mailto:corporatetraining@krutriminsights.com?subject=${inquirySubject}`}
                                        className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm 
                                        hover:opacity-95 active:scale-95 transition-all shrink-0"
                                        style={{ backgroundColor: '#1089c7' }}
                                    >
                                        <span>Request Details</span>
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}