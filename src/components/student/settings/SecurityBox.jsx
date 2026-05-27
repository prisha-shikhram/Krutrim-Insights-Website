// import icons
import { KeyRound, ShieldCheck, Loader2, Eye, EyeOff } from "lucide-react";

// security box component
export default function SecurityBox({ handlePasswordUpdate, labelCls, inputCls, passwords, setPasswords, showPass, setShowPass, loading }) {
    return (
        <div className="w-full lg:w-2/3 flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Security Settings
            </h3>

            <div className="bg-white/60 backdrop-blur-md rounded-[40px] p-10 border border-white shadow-sm grow">
                <div className="flex items-center gap-4 mb-10">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <ShieldCheck size={24} />
                    </div>

                    <div>
                        <h4 className="text-lg font-black text-slate-800">Update Password</h4>
                        <p className="text-xs text-slate-400 font-medium">Secure your account with a unique password.</p>
                    </div>
                </div>

                <form
                    onSubmit={handlePasswordUpdate}
                    className="space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                            <label className={labelCls}>Current Password</label>

                            <input
                                type="password"
                                placeholder="••••••••"
                                className={inputCls}
                                value={passwords.current}
                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                required
                            />
                        </div>

                        <div className="relative">
                            <label className={labelCls}>New Password</label>

                            <input
                                type={showPass ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                className={inputCls}
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPass(!showPass)}
                                className="absolute right-4 bottom-3 text-slate-300 hover:text-blue-500"
                            >
                                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>

                        <div>
                            <label className={labelCls}>Confirm New Password</label>

                            <input
                                type="password"
                                placeholder="Re-type password"
                                className={inputCls}
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-4">
                        <button
                            type="submit"
                            disabled={loading}
                            className="bg-blue-600 text-white px-8 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] 
                            shadow-xl shadow-blue-100 hover:bg-blue-700 transition-all flex items-center gap-2 disabled:opacity-70 cursor-pointer"
                        >
                            {loading ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                            {loading ? "Verifying..." : "Update Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}