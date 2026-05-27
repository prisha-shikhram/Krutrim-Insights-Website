// import icons
import { User, Phone, Mail, BookOpen, Briefcase, Loader2 } from 'lucide-react';
import { FiChevronDown } from "react-icons/fi";

// brochure form
export default function BrochureForm({ handleSubmit, handleInputChange, BROCHURE_LINKS, loading }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                        required
                        name="name"
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                        onChange={handleInputChange}
                    />
                </div>

                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                    <input
                        required
                        name="phone"
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                        onChange={handleInputChange}
                    />
                </div>
            </div>

            <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />

                <input
                    required
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    className="w-full pl-11 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 focus:bg-white 
                    focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                    onChange={handleInputChange}
                />
            </div>

            <div className="flex flex-col gap-4">
                <div className="relative group">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />

                    <select
                        name="role"
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-100 bg-slate-50
                        text-sm outline-none appearance-none cursor-pointer focus:border-[#0189c7] focus:bg-white transition-all"
                        onChange={handleInputChange}
                    >
                        <option>Student</option>
                        <option>Professional</option>
                    </select>

                    <FiChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 
                        group-focus-within:rotate-180 transition-transform pointer-events-none"
                    />
                </div>

                <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />

                    <select
                        name="course"
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-100 bg-slate-50 text-sm outline-none 
                        appearance-none cursor-pointer focus:border-[#0189c7] focus:bg-white transition-all"
                        onChange={handleInputChange}
                    >
                        {Object.keys(BROCHURE_LINKS).map(c => <option key={c}>{c}</option>)}
                    </select>

                    <FiChevronDown
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 
                        group-focus-within:rotate-180 transition-transform pointer-events-none"
                    />
                </div>
            </div>

            <button
                disabled={loading}
                className="w-full py-3.5 bg-[#0189c7] text-white font-bold rounded-2xl shadow-xl shadow-[#0189c7]/20 
                hover:bg-sky-600 transition-all flex items-center justify-center gap-2 cursor-pointer mt-5 active:scale-95 
                disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {loading ? <Loader2 className="animate-spin" /> : "Unlock Now"}
            </button>
        </form>
    )
}