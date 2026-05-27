// import icons
import { Camera } from "lucide-react";

// student profile component
export default function StudentProfile({ student, onImageUpload }) {
    return (
        <div className="mb-5 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-20 h-20 mb-3">
                    {student.profileImg ? (
                        <img
                            src={student.profileImg}
                            className="w-full h-full rounded-2xl object-cover shadow-md border-2 border-white"
                            alt="Student"
                        />
                    ) : (
                        <>
                            <div
                                className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-2xl font-black text-indigo-600 
                                border border-indigo-100"
                            >
                                {student.name[0]}
                            </div>

                            {/* Camera icon only appears when there is NO profileImg */}
                            <label
                                className="absolute -bottom-1 -right-1 p-1.5 bg-white rounded-lg shadow-sm border border-slate-100 
                                cursor-pointer hover:text-indigo-600 transition-colors"
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

                <h3 className="font-bold text-slate-800 text-sm leading-tight">{student.name}</h3>
                <p className="text-[10px] text-slate-500 font-medium mt-1">{student.batchcode}</p>

                <span
                    className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-2 bg-white text-indigo-600 
                    border border-indigo-100"
                >
                    {student.course}
                </span>
            </div>
        </div>
    );
}