// import icons
import { Eye, EyeOff, X, User, Mail, Lock, ShieldCheck, Loader2 } from "lucide-react";

// mentor modal
export default function MentorModal({
    setShowMentorModal, handleCreateMentor, mentorData, setMentorData, showMentorPassword, setShowMentorPassword, mentorSubmitting
}) {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-100 animate-in zoom-in-95 duration-300">
                {/* Header Section */}
                <div className="relative p-8 bg-linear-to-br from-emerald-500 to-teal-600 text-white overflow-hidden">
                    {/* Decorative Background Element */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />

                    <div className="flex justify-between items-start relative z-10">
                        <div>
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4 border border-white/30">
                                <ShieldCheck size={24} className="text-white" />
                            </div>

                            <h3 className="text-2xl font-black tracking-tight">New Mentor</h3>
                            <p className="text-[10px] uppercase font-bold tracking-[0.2em] opacity-80 mt-1">Access Control & Management</p>
                        </div>

                        <button
                            onClick={() => setShowMentorModal(false)}
                            className="p-2 bg-black/10 hover:bg-black/20 rounded-xl transition-all cursor-pointer group"
                        >
                            <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                        </button>
                    </div>
                </div>

                {/* Form Section */}
                <form
                    onSubmit={handleCreateMentor}
                    className="p-8 space-y-6 bg-white"
                >
                    {/* Mentor Name */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <User size={12} className="text-emerald-500" /> Mentor Name
                        </label>

                        <input
                            required
                            type="text"
                            placeholder="John Doe"
                            value={mentorData.name}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 
                            placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                            onChange={(e) => setMentorData({ ...mentorData, name: e.target.value })}
                        />
                    </div>

                    {/* Email Address */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Mail size={12} className="text-emerald-500" /> Email Address
                        </label>

                        <input
                            required
                            type="email"
                            placeholder="mentor@krutrim.com"
                            value={mentorData.email}
                            className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-bold text-slate-700 
                            placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-500/5 outline-none transition-all"
                            onChange={(e) => setMentorData({ ...mentorData, email: e.target.value })}
                        />
                    </div>

                    {/* Security Password */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                            <Lock size={12} className="text-emerald-500" /> Security Password
                        </label>

                        <div className="relative">
                            <input
                                required
                                type={showMentorPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={mentorData.password}
                                className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm font-mono font-bold text-slate-700 
                                placeholder:text-slate-300 focus:border-emerald-500 focus:bg-white focus:ring-4 
                                focus:ring-emerald-500/5 outline-none transition-all"
                                onChange={(e) => setMentorData({ ...mentorData, password: e.target.value })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowMentorPassword(!showMentorPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 hover:text-emerald-500 cursor-pointer transition-colors"
                            >
                                {showMentorPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2">
                        <button
                            disabled={mentorSubmitting}
                            className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black text-[10px] uppercase tracking-[0.2em] 
                            cursor-pointer shadow-xl shadow-slate-200 hover:bg-emerald-600 hover:shadow-emerald-100 transition-all active:scale-[0.98] 
                            disabled:opacity-50 flex items-center justify-center gap-3"
                        >
                            {mentorSubmitting ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    <span>Syncing...</span>
                                </>
                            ) : (
                                "Create Mentor Account"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}