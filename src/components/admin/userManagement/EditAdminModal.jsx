// import icons
import { Check, Eye, EyeOff } from "lucide-react";

// edit admin modal
export default function EditAdminModal({
    isEditing, setShowAddModal, handleAction, newAdmin, setNewAdmin, permissionOptions, togglePermission, showPassword, setShowPassword, generatePassword, PRIMARY }) {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                {/* Model header */}
                <ModelHeader
                    isEditing={isEditing}
                    setShowAddModal={setShowAddModal}
                />

                <form
                    onSubmit={handleAction}
                    className="p-8 space-y-6"
                >
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Full Name</label>

                            <input
                                required
                                type="text"
                                value={newAdmin.name}
                                placeholder="e.g. Rahul Singh"
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none 
                                focus:border-[#0189c7] transition-all"
                                onChange={(e) => setNewAdmin({ ...newAdmin, name: e.target.value })}
                            />
                        </div>

                        <div>
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2">Login Email</label>

                            <input
                                required
                                type="email"
                                value={newAdmin.email}
                                placeholder="admin@domain.com"
                                disabled={isEditing}
                                className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm focus:outline-none 
                                focus:border-[#0189c7] transition-all disabled:opacity-50"
                                onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                            />
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Define Access Permissions</label>

                        <div className="grid grid-cols-2 gap-3">
                            {permissionOptions.map((opt) => {
                                const isSelected = newAdmin.permissions.includes(opt.id);

                                return (
                                    <div
                                        key={opt.id}
                                        onClick={() => togglePermission(opt.id)}
                                        className={`cursor-pointer p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3
                                        ${isSelected ? "border-[#0189c7] bg-[#0189c708]" : "border-gray-100 hover:border-gray-200"}`}
                                    >
                                        <div className={`mt-0.5 w-5 h-5 rounded-md border flex items-center justify-center transition-all 
                                            ${isSelected ? "bg-[#0189c7] border-[#0189c7]" : "bg-white border-gray-200"}`}>
                                            {isSelected && <Check size={14} className="text-white" />}
                                        </div>

                                        <div>
                                            <p className={`text-sm font-bold ${isSelected ? "text-[#0189c7]" : "text-gray-700"}`}>{opt.label}</p>
                                            <p className="text-[10px] text-gray-400 leading-tight">{opt.desc}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    <div className="space-y-3 pt-2">
                        <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Account Security</label>

                        <div className="flex gap-2">
                            <div className="relative flex-1">
                                <input
                                    required={!isEditing}
                                    type={showPassword ? "text" : "password"}
                                    value={newAdmin.password}
                                    placeholder={isEditing ? "Leave blank to keep current" : "Temporary Password"}
                                    className="w-full bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-sm font-mono 
                                    focus:outline-none focus:border-[#0189c7]"
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#0189c7] cursor-pointer"
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>

                            {!isEditing && (
                                <button
                                    type="button"
                                    onClick={generatePassword}
                                    className="px-4 py-2 border border-[#0189c7] text-[#0189c7] rounded-xl text-xs font-bold 
                                    hover:bg-blue-50 transition-colors"
                                >
                                    AUTO-GENERATE
                                </button>
                            )}
                        </div>

                        <p className="text-[10px] text-gray-400 italic">
                            {isEditing ? "* Only fill if you want to reset their password." : "* Admin will be prompted to change this upon first login."}
                        </p>
                    </div>

                    <button
                        className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-wide transition-all 
                        cursor-pointer active:scale-[0.98] shadow-lg shadow-blue-200"
                        style={{ background: `linear-gradient(90deg, ${PRIMARY}, #00c6ff)` }}
                    >
                        {isEditing ? 'UPDATE SUB-ADMIN' : 'GENERATE ADMIN ACCOUNT'}
                    </button>
                </form>
            </div>
        </div>
    )
}