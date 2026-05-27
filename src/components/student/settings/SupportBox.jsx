// import icons
import { Mail, HeadphonesIcon, User } from "lucide-react";

// support box
export default function SupportBox({ student, }) {
    return (
        <section className="space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" /> Support Team
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Support Text */}
                <div className="bg-indigo-50/50 p-6 rounded-4xl border border-indigo-100 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">
                        <HeadphonesIcon size={22} />
                    </div>

                    <p className="text-xs text-slate-500 font-medium leading-relaxed">
                        Need help with your account or dashboard? Contact our admins.
                    </p>
                </div>

                {/* Prisha */}
                <a
                    href={`mailto:bhavesh.tyagi@krutriminsights.com?subject=Support Needed - ${student.name}`}
                    className="flex items-center justify-between p-6 rounded-4xl bg-white/60 backdrop-blur-md border border-white 
                    hover:bg-white transition-all shadow-sm group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center 
                            group-hover:scale-110 transition-transform">
                            <User size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-700 leading-none">Bhavesh Tyagi</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">Admin Support</p>
                        </div>
                    </div>

                    <Mail size={18} className="text-slate-300 group-hover:text-blue-500" />
                </a>

                {/* Garv */}
                <a
                    href={`mailto:garv.aggarwal@krutriminsights.com?subject=Help Needed - ${student.name}`}
                    className="flex items-center justify-between p-6 rounded-4xl bg-white/60 backdrop-blur-md border border-white 
                    hover:bg-white transition-all shadow-sm group"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center 
                            group-hover:scale-110 transition-transform">
                            <User size={18} />
                        </div>

                        <div>
                            <p className="text-sm font-bold text-slate-700 leading-none">Garv Aggarwal</p>
                            <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tight">Technical Admin</p>
                        </div>
                    </div>

                    <Mail size={18} className="text-slate-300 group-hover:text-emerald-500" />
                </a>
            </div>
        </section>
    )
}