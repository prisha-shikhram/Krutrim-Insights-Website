// import icons
import { User, Phone, School, BookOpen, Calendar, ChevronDown } from "lucide-react";

// registration fields component
export default function RegistrationFields({ labelCls, inputCls, formData, handleChange, focused, setFocused, PRIMARY }) {

    const fieldStyle = (name) => ({
        borderColor: focused === name ? PRIMARY : "#e5e7eb"
    });

    const labelStyle = (name) => ({
        color: focused === name ? PRIMARY : "#9ca3af"
    });

    // Generate years from 2022 to 2031
    const passingYears = Array.from({ length: 10 }, (_, i) => 2022 + i);

    return (
        <>
            {/* Full Name */}
            <div className="relative">
                <label className={labelCls} style={labelStyle("fullName")}>Full Name</label>

                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                    <input
                        type="text"
                        name="fullName"
                        required
                        className={inputCls}
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                        onFocus={() => setFocused("fullName")}
                        onBlur={() => setFocused(null)}
                        style={fieldStyle("fullName")}
                    />
                </div>
            </div>

            {/* Phone Number */}
            <div className="relative">
                <label className={labelCls} style={labelStyle("phone")}>Phone Number</label>

                <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                    <input
                        type="tel"
                        name="phone"
                        required
                        className={inputCls}
                        placeholder="+91 00000 00000"
                        value={formData.phone}
                        onChange={handleChange}
                        onFocus={() => setFocused("phone")}
                        onBlur={() => setFocused(null)}
                        style={fieldStyle("phone")}
                    />
                </div>
            </div>

            {/* College */}
            <div className="relative">
                <label className={labelCls} style={labelStyle("college")}>College Name</label>

                <div className="relative">
                    <School className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                    <input
                        type="text"
                        name="college"
                        required
                        className={inputCls}
                        placeholder="University Name"
                        value={formData.college}
                        onChange={handleChange}
                        onFocus={() => setFocused("college")}
                        onBlur={() => setFocused(null)}
                        style={fieldStyle("college")}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Course Input (String) */}
                <div className="relative">
                    <label className={labelCls} style={labelStyle("course")}>Course</label>

                    <div className="relative">
                        <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            type="text"
                            name="course"
                            required
                            className={inputCls}
                            placeholder="Ex: BCA"
                            value={formData.course}
                            onChange={handleChange}
                            onFocus={() => setFocused("course")}
                            onBlur={() => setFocused(null)}
                            style={fieldStyle("course")}
                        />
                    </div>
                </div>

                {/* Year of Passing Select */}
                <div className="relative">
                    <label className={labelCls} style={labelStyle("passingYear")}>Passing Year</label>

                    <div className="relative group">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            name="passingYear"
                            required
                            className={inputCls}
                            value={formData.passingYear}
                            onChange={handleChange}
                            onFocus={() => setFocused("passingYear")}
                            onBlur={() => setFocused(null)}
                            style={fieldStyle("passingYear")}
                        >
                            <option value="" disabled>Select Year</option>
                            
                            {passingYears.map(year => (
                                <option
                                    key={year}
                                    value={year}
                                >
                                    {year}
                                </option>
                            ))}
                        </select>

                        <ChevronDown
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-300 
                            group-hover:rotate-180 pointer-events-none"
                            size={16}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}