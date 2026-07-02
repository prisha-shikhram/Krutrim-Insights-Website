// import icons
import { School } from 'lucide-react';

// import components
import CollegeActions from '../../components/college/CollegeActions';

// college cta
export default function CollegeCTA() {
    return (
        <section
            id='CTA'
            className="py-20 px-6 bg-linear-to-br from-[#f5fbff] via-[#eaf6fc] to-[#ffffff] scroll-mt-10"
        >
            <div className="mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-4xl bg-[#0189c7] px-8 py-16 text-center shadow-2xl">
                    {/* Background Decorative Lighting */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-white opacity-20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-cyan-100 opacity-20 rounded-full blur-[80px]" />

                    {/* White Mesh Grid Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.05]
                        bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-size-[40px_40px]"
                    />

                    {/* Container */}
                    <div className="relative z-10 flex flex-col items-center justify-center">
                        {/* Animated School Icon Badge */}
                        <div
                            className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 
                            shadow-inner"
                        >
                            <School className="w-8 h-8 text-white" />
                        </div>

                        {/* Middle: Stacked Typography */}
                        <div className="space-y-4 max-w-2xl mx-auto mb-10">
                            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                                Bring this to your campus
                            </h2>

                            <p className="text-base md:text-lg text-blue-50/90 font-medium leading-relaxed">
                                Partner with us to host an industry-focused, practical AI workshop at your college and empower your student community.
                            </p>
                        </div>

                        {/* Bottom: Action Controls */}
                        <CollegeActions />
                    </div>
                </div>
            </div>
        </section>
    );
}