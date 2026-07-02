// import icons
import { Code2, CheckCircle2 } from 'lucide-react';

// import components
import ProjectCTA from '../../components/gallery/ProjectCTA';

// final CTA section component for Project Gallery
export default function ProjectGalleryCTA() {
    return (
        <section className="py-20 px-6 bg-gray-50">
            <div className="mx-auto max-w-5xl">
                <div className="relative overflow-hidden rounded-4xl bg-[#0189c7] px-8 py-12 md:py-16 text-center shadow-2xl">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-125 h-125 bg-white opacity-20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-72 h-72 bg-cyan-100 opacity-20 rounded-full blur-[80px]" />

                    {/* White Mesh Grid Overlay */}
                    <div
                        className="absolute inset-0 opacity-[0.05]
                        bg-[linear-gradient(white_1px,transparent_1px),linear-gradient(90deg,white_1px,transparent_1px)] bg-size-[40px_40px]"
                    />

                    <div className="relative z-10 flex flex-col items-center">
                        {/* Decorative Icon */}
                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
                            <Code2 className="w-6 h-6 text-white" />
                        </div>

                        {/* Heading */}
                        <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
                            Learn With Us. <span className="opacity-90 italic">Build</span> <br />
                            This Yourself
                        </h2>

                        {/* Description Area */}
                        <div className="max-w-3xl space-y-6">
                            <p className="text-lg md:text-xl font-semibold text-blue-50">
                                Turn inspiration into implementation with our expert-led curriculum.
                            </p>

                            <p className="text-sm md:text-base text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
                                Don't just watch from the sidelines. Master the architecture and engineering behind these projects and start building
                                your own AI-powered future.
                            </p>
                        </div>

                        {/* CTA Buttons Container */}
                        <ProjectCTA />
                    </div>
                </div>
            </div>
        </section>
    );
}