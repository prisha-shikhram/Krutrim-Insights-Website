// import icons
import { Sparkles, CheckCircle2 } from 'lucide-react';

// import components
import AboutCTA from '../../components/about/AboutCTA';

// final CTA section component
export default function CTA() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="mx-auto max-w-5xl">
        <div className="relative overflow-hidden rounded-4xl bg-[#0189c7] px-8 py-12 md:py-16 text-center shadow-2xl">
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
              <Sparkles className="w-6 h-6 text-white" />
            </div>

            {/* Heading */}
            <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Upskill Your Team <span className="opacity-90 italic">with</span> <br />
              Practical AI Training
            </h2>

            {/* Description Area */}
            <div className="max-w-3xl space-y-6">
              <p className="text-lg md:text-xl font-semibold text-blue-50">
                Industry-focused programs. Hands-on learning. Real business impact.
              </p>

              <p className="text-sm md:text-base text-blue-100/90 leading-relaxed max-w-2xl mx-auto">
                From custom learning paths to on-site workshops, we help enterprises build job-ready AI skills that drive results.
              </p>
            </div>

            {/* CTA Buttons Container */}
            <AboutCTA />
          </div>
        </div>
      </div>
    </section>
  );
}