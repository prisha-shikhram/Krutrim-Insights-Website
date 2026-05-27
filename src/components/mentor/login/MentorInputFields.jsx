// import usestate
import { useState } from "react";

// import icons
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

// input fields
export default function MentorInputFields({ credentials, handleChange, inputCls, labelCls, focused, setFocused, PRIMARY }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <>
            <div className="relative">
                <label
                    className={labelCls}
                    style={{ color: focused === "email" ? PRIMARY : "#9ca3af" }}
                >
                    Mentor Email
                </label>

                <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                    <input
                        type="email"
                        name="email"
                        required
                        className={inputCls}
                        placeholder="mentor@academy.com"
                        value={credentials.email}
                        onChange={handleChange}
                        onFocus={() => setFocused("email")}
                        onBlur={() => setFocused(null)}
                        style={{ borderColor: focused === "email" ? PRIMARY : "#e5e7eb" }}
                    />
                </div>
            </div>

            <div className="relative">
                <label
                    className={labelCls}
                    style={{ color: focused === "password" ? PRIMARY : "#9ca3af" }}
                >
                    Password
                </label>

                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        required
                        className={inputCls}
                        placeholder="••••••••"
                        value={credentials.password}
                        onChange={handleChange}
                        onFocus={() => setFocused("password")}
                        onBlur={() => setFocused(null)}
                        style={{ borderColor: focused === "password" ? PRIMARY : "#e5e7eb" }}
                    />

                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                </div>
            </div>
        </>
    )
}