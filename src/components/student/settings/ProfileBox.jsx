// import icons
import { Camera } from "lucide-react";

// profile box component
export default function ProfileBox({ student, handleImageUpload }) {
    return (
        <div className="w-full lg:w-1/3 flex flex-col">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-800 mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> Identity
            </h3>

            <div
                className="bg-white/40 backdrop-blur-md rounded-[40px] p-8 border border-white shadow-sm flex flex-col items-center text-center 
                grow justify-center"
            >
                <div className="relative group mb-6">
                    <div className="w-32 h-32 rounded-[40px] overflow-hidden border-4 border-white shadow-xl bg-slate-50">
                        {student.profileImg ? (
                            <img
                                src={student.profileImg}
                                className="w-full h-full object-cover"
                                alt="Profile"
                            />
                        ) : (
                            <div
                                className="w-full h-full bg-linear-to-br from-blue-500 to-indigo-600 flex items-center justify-center 
                                text-4xl font-black text-white"
                            >
                                {student.name ? student.name[0] : "S"}
                            </div>
                        )}
                    </div>

                    <label
                        className="absolute -bottom-2 -right-2 p-3 bg-white rounded-2xl shadow-lg border border-slate-100
                        cursor-pointer text-blue-600 hover:scale-110 transition-transform active:scale-95"
                    >
                        <Camera size={20} />

                        <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />
                    </label>
                </div>

                <h4 className="text-xl font-black text-slate-800">{student.name}</h4>
                <p className="text-xs font-medium text-slate-400 mt-1 lowercase">{student.email}</p>

                <div className="mt-8 pt-6 border-t border-white/40 w-full">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-2">Registration Status</p>

                    <p className="text-sm font-bold text-slate-600 flex items-center justify-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        {student.status || "Active Student"}
                    </p>
                </div>
            </div>
        </div>
    )
}