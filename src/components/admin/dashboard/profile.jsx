// import icons
import { Camera } from "lucide-react";

// profile section in dashboard
export default function Profile({ user, handleImageUpload }) {
    return (
        <div className="mb-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-24 h-24 mb-3">
                    {user.profileImg ? (
                        <img
                            src={user.profileImg}
                            className="w-full h-full rounded-2xl object-cover shadow-md border-2 border-white"
                            alt="Profile"
                        />
                    ) : (
                        <div
                            className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-2xl font-black 
                            text-[#0189c7] border"
                        >
                            {user.name?.[0]}
                        </div>
                    )}

                    {!user.isSuper && (
                        <label className="absolute -bottom-2 -right-2 p-2 bg-white rounded-lg shadow cursor-pointer hover:text-[#0189c7]">
                            <Camera size={14} />

                            <input
                                type="file"
                                hidden
                                onChange={handleImageUpload}
                            />
                        </label>
                    )}
                </div>

                <h3 className="font-bold text-gray-800 text-sm">{user.name}</h3>

                <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1.5 
                    ${user.isSuper
                        ? "bg-amber-100 text-amber-600"
                        : "bg-blue-100 text-[#0189c7]"}`}>
                    {user.isSuper ? "System Master" : "Operational Admin"}
                </span>
            </div>
        </div>
    )
}