// import icons
import { Camera } from "lucide-react";

// mentor profile
export default function MentorProfile({ mentor, onImageUpload }) {
    return (
        <div className="mb-5 p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-3">
                    {mentor.profileImg ? (
                        <img
                            src={mentor.profileImg}
                            className="w-full h-full rounded-2xl object-cover shadow-md border-2 border-white"
                            alt="Mentor"
                        />
                    ) : (
                        <>
                            <div className="w-full h-full rounded-2xl bg-indigo-600 flex items-center justify-center text-2xl font-black text-white">
                                {mentor.name[0]}
                            </div>

                            <label
                                className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 cursor-pointer 
                                hover:text-indigo-600 transition-colors"
                            >
                                <Camera size={12} />

                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={onImageUpload}
                                />
                            </label>
                        </>
                    )}
                </div>

                <h3 className="font-bold text-slate-800 text-sm leading-tight">{mentor.name}</h3>
                <p className="text-[10px] text-slate-500 font-medium mt-1 uppercase tracking-wider">{mentor.designation}</p>

                <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-2 bg-indigo-100 text-indigo-700 
                    border border-indigo-200"
                >
                    {mentor.department}
                </span>
            </div>
        </div>
    );
}