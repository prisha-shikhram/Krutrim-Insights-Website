// Input Fields components
export default function InputFields({ form, errors, onChange, focused, setFocused, PRIMARY, labelCls, inputCls }) {
    return (
        <>
            {/* Full Name */}
            <div style={{ animation: "slideUp 0.5s .16s both" }}>
                <label
                    className={labelCls}
                    style={{ color: focused === "fullName" ? PRIMARY : "#9ca3af" }}
                >
                    Full Name
                </label>

                <input
                    name="fullName"
                    value={form.fullName}
                    onChange={onChange}
                    onFocus={() => setFocused("fullName")}
                    onBlur={() => setFocused(null)}
                    placeholder="e.g. Rahul Sharma"
                    className={inputCls}
                    style={{ borderColor: errors.fullName ? "#ef4444" : focused === "fullName" ? PRIMARY : "#e5e7eb" }}
                    required
                />

                {errors.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>}
            </div>

            {/* Contact Number */}
            <div style={{ animation: "slideUp 0.5s .22s both" }}>
                <label
                    className={labelCls}
                    style={{ color: focused === "contactNumber" ? PRIMARY : "#9ca3af" }}
                >
                    Contact Number
                </label>

                <input
                    name="contactNumber"
                    value={form.contactNumber}
                    onChange={onChange}
                    onFocus={() => setFocused("contactNumber")}
                    onBlur={() => setFocused(null)}
                    placeholder="+91 98765 43210"
                    className={inputCls}
                    style={{ borderColor: errors.contactNumber ? "#ef4444" : focused === "contactNumber" ? PRIMARY : "#e5e7eb" }}
                    required
                />

                {errors.contactNumber && <p className="text-red-500 text-xs mt-1.5">{errors.contactNumber}</p>}
            </div>

            {/* Email ID */}
            <div style={{ animation: "slideUp 0.5s .28s both" }}>
                <label
                    className={labelCls}
                    style={{ color: focused === "emailId" ? PRIMARY : "#9ca3af" }}
                >
                    Email ID
                </label>

                <input
                    name="emailId"
                    value={form.emailId}
                    onChange={onChange}
                    onFocus={() => setFocused("emailId")}
                    onBlur={() => setFocused(null)}
                    placeholder="you@example.com"
                    className={inputCls}
                    style={{ borderColor: errors.emailId ? "#ef4444" : focused === "emailId" ? PRIMARY : "#e5e7eb" }}
                    required
                />

                {errors.emailId && <p className="text-red-500 text-xs mt-1.5">{errors.emailId}</p>}
            </div>
        </>
    )
}