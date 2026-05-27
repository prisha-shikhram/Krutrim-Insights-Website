// import icons
import { User, Phone, Mail, Hash, Building2, BookOpen, Calendar, Send, Loader2 } from 'lucide-react';
import { FiChevronDown } from "react-icons/fi";

// college form component
export default function CollegeForm({ handleSubmit, handleChange, formData, isCourseOpen, setIsCourseOpen, loading }) {
    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
        >
            {/* Row 1: Name & Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                    <User
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 
                        group-focus-within:text-[#0189c7] transition-colors"
                    />

                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Full Name"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                    />
                </div>

                <div className="relative group">
                    <Phone
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 
                        group-focus-within:text-[#0189c7] transition-colors"
                    />

                    <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        type="tel"
                        placeholder="Phone Number"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                    />
                </div>
            </div>

            {/* Row 2: Email & Roll Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                    <Mail
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 
                        group-focus-within:text-[#0189c7] transition-colors"
                    />

                    <input
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="Email Address"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                    />
                </div>

                <div className="relative group">
                    <Hash
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 
                        group-focus-within:text-[#0189c7] transition-colors"
                    />

                    <input
                        name="rollNumber"
                        value={formData.rollNumber}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="College Roll Number"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                    />
                </div>
            </div>

            {/* Row 3: Dept & Course */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative group">
                    <Building2
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 
                        group-focus-within:text-[#0189c7] transition-colors"
                    />

                    <input
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Department (e.g. IT)"
                        className="w-full pl-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white 
                        focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                    />
                </div>

                <div className="relative group">
                    <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />

                    <select
                        name="course"
                        value={formData.course}
                        onChange={handleChange}
                        onFocus={() => setIsCourseOpen(true)}
                        onBlur={() => setIsCourseOpen(false)}
                        className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 
                        focus:bg-white focus:border-[#0189c7] outline-none text-sm appearance-none cursor-pointer transition-all"
                    >
                        <option>BCA</option><option>MCA</option><option>BBA</option>
                        <option>MBA</option><option>BTech</option><option>MTech</option>
                    </select>

                    <FiChevronDown
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition-transform duration-300 
                        ${isCourseOpen ? 'rotate-180 text-[#0189c7]' : ''}`}
                    />
                </div>
            </div>

            {/* Year Selection */}
            <div className="relative group">
                <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 
                    group-focus-within:text-[#0189c7] transition-colors"
                />

                <input
                    name="year"
                    value={formData.year}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="Current Year (1st, 2nd, etc.)"
                    className="w-full pl-11 py-3.5 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white 
                    focus:border-[#0189c7] focus:ring-4 focus:ring-[#0189c7]/5 outline-none text-sm transition-all"
                />
            </div>

            <button
                disabled={loading}
                className="w-full py-4 bg-[#0189c7] text-white font-bold rounded-2xl shadow-xl shadow-[#0189c7]/20 
                hover:bg-sky-600 transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer disabled:opacity-70 active:scale-[0.98]"
            >
                {loading ? <Loader2 className="animate-spin" /> : <>Submit Application <Send size={18} /></>}
            </button>
        </form>
    )
}