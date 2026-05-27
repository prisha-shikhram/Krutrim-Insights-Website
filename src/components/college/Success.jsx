// import framer motion
import { motion } from 'framer-motion';

// import icons
import { Send } from 'lucide-react';

// success UI
export default function Success({ collegeName }) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
        >
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Send size={32} className="animate-pulse" />
            </div>

            <h3 className="text-2xl font-black text-slate-900">Application Sent!</h3>
            <p className="text-slate-500 mt-2">Thank you for applying. Our team will verify your details with {collegeName} and contact you shortly.</p>
        </motion.div>
    )
}