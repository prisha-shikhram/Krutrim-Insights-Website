// import components
import { FieldError } from "./FieldError";

// import icons
import { User, Phone, Users, AlertCircle } from "lucide-react";

// Guardian section component
export default function GuardianSection({ sectionTitleCls, PRIMARY, labelCls, labelStyle, inputCls, errors, formData, fp }) {
    return (
        <section>
            <h2 className={sectionTitleCls} style={{ color: PRIMARY }}>
                <Users size={20} /> Guardian Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Parent Name */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("parentName")}
                    >
                        Father / Guardian Name
                    </label>

                    <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("parentName")}
                            required
                            className={inputCls}
                            placeholder="Guardian Full Name"
                            value={formData.parentName}
                        />
                    </div>

                    <FieldError msg={errors.parentName} />
                </div>

                {/* Parent Phone */}
                <div>
                    <label
                        className={labelCls}
                        style={labelStyle("parentPhone")}
                    >
                        Guardian Phone
                    </label>

                    <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("parentPhone")}
                            type="tel"
                            required
                            maxLength={10}
                            className={inputCls}
                            placeholder="10-digit mobile number"
                            value={formData.parentPhone}
                        />
                    </div>

                    <FieldError msg={errors.parentPhone} />
                </div>

                {/* Emergency Contact */}
                <div className="md:col-span-2">
                    <label
                        className={labelCls}
                        style={labelStyle("emergencyContact")}
                    >
                        Emergency Contact
                        <span className="normal-case font-normal tracking-normal ml-1 text-gray-400">(Optional)</span>
                    </label>

                    <div className="relative">
                        <AlertCircle className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("emergencyContact")}
                            maxLength={10}
                            className={inputCls}
                            placeholder="Secondary Emergency Contact Number"
                            value={formData.emergencyContact}
                        />
                    </div>

                    <FieldError msg={errors.emergencyContact} />
                </div>
            </div>
        </section>
    );
}