// import components
import { FieldError } from "./FieldError";

// import icons
import { User, Calendar, Droplets, CircleDot, Phone, Mail, MapPin, ChevronDown } from "lucide-react";

// personal input section
export default function PersonalSection({ sectionTitleCls, PRIMARY, labelCls, labelStyle, inputCls, errors, formData, selectCls, fp }) {
    return (
        <section>
            <h2
                className={sectionTitleCls}
                style={{ color: PRIMARY }}
            >
                <User size={20} /> Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Full Name */}
                <div className="lg:col-span-2">
                    <label
                        className={labelCls}
                        style={labelStyle("fullName")}
                    >
                        Full Name (as per ID)
                    </label>

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("fullName")}
                            required
                            className={`${inputCls} ${errors.fullName ? "field-error" : ""}`}
                            placeholder="Enter your full name"
                            value={formData.fullName}
                        />
                    </div>

                    <FieldError msg={errors.fullName} />
                </div>

                {/* Date of Birth */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("dob")}
                    >
                        Date of Birth
                    </label>

                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("dob")}
                            type="date"
                            required
                            className={inputCls}
                            value={formData.dob}
                            max={new Date().toISOString().split("T")[0]}
                        />
                    </div>

                    <FieldError msg={errors.dob} />
                </div>

                {/* Gender */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("gender")}
                    >
                        Gender
                    </label>

                    <div className="relative select-group">
                        <CircleDot className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("gender")}
                            className={selectCls}
                            value={formData.gender}
                        >
                            <option value="">Select</option>
                            <option>Male</option>
                            <option>Female</option>
                            <option>Other</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 
                            pointer-events-none transition-transform duration-200"
                        />
                    </div>

                    <FieldError msg={errors.gender} />
                </div>

                {/* Phone */}
                <div className="lg:col-span-2">
                    <label
                        className={labelCls}
                        style={labelStyle("studentPhone")}
                    >
                        Phone Number
                    </label>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("studentPhone")}
                            type="tel"
                            required
                            maxLength={10}
                            className={inputCls}
                            placeholder="10-digit mobile number"
                            value={formData.studentPhone}
                        />
                    </div>

                    <FieldError msg={errors.studentPhone} />
                </div>

                {/* Address */}
                <div className="lg:col-span-2">
                    <label
                        className={labelCls}
                        style={labelStyle("address")}
                    >
                        Residential Address
                    </label>

                    <div className="relative">
                        <MapPin className="absolute left-4 top-3 text-gray-400" size={18} />

                        <textarea
                            {...fp("address")}
                            required
                            className={`${inputCls} pl-11 h-12 pt-3`}
                            placeholder="Full address..."
                            value={formData.address}
                        />
                    </div>

                    <FieldError msg={errors.address} />
                </div>

                {/* Email */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("studentEmail")}
                    >
                        Email ID
                    </label>

                    <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("studentEmail")}
                            type="email"
                            required
                            className={inputCls}
                            placeholder="name@email.com"
                            value={formData.studentEmail}
                        />
                    </div>

                    <FieldError msg={errors.studentEmail} />
                </div>
            </div>
        </section>
    )
}