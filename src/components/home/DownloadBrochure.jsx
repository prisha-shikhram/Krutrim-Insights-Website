// import framer motion
import { motion } from 'framer-motion';

// import icons
import { Download, CheckCircle2 } from 'lucide-react';

// Download Brochure component
export default function DownloadBrochure({ BROCHURE_LINKS, formData }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
        >
            <div
                className="w-20 h-20 bg-blue-50 text-[#0189c7] rounded-full flex items-center justify-center mx-auto mb-8 
                shadow-inner ring-8 ring-blue-50/50 animate-bounce"
            >
                <CheckCircle2 size={40} />
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900">PDF Ready</h3>
            <p className="text-slate-500 mt-2 text-lg">Hi {formData.name.split(' ')[0]}, your curriculum is generated.</p>

            <a
                href={BROCHURE_LINKS[formData.course]}
                download
                className="inline-flex items-center gap-3 mt-10 px-12 py-4 bg-[#0189c7] text-white font-black rounded-2xl 
                hover:bg-sky-600 hover:shadow-2xl hover:shadow-[#0189c7]/40 transition-all active:scale-95"
            >
                Download Now <Download size={20} />
            </a>
        </motion.div>
    )
}