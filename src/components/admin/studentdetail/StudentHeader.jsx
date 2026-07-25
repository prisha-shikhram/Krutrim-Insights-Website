// import icons
import { GraduationCap } from "lucide-react"

// student header component
export default function StudentHeader({ data = {}, avatarColor, initials }) {
    // Fallback helper for initials if function isn't passed
    const getInitials = (name) => {
        if (typeof initials === "function") return initials(name);
        return name ? name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2) : "U";
    };

    // Fallback helper for avatar gradient if function isn't passed
    const getAvatarGradient = (id) => {
        if (typeof avatarColor === "function") return avatarColor(id);
        return "from-blue-600 to-indigo-600";
    };

    return (
        <div
            className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 flex flex-col sm:flex-row 
            items-center gap-6 sm:gap-8 relative overflow-hidden"
        >
            {/* Background Watermark Icon */}
            <div className="absolute top-0 right-0 p-6 opacity-[0.04] pointer-events-none select-none">
                <GraduationCap size={140} className="text-slate-900" />
            </div>

            {/* Avatar / Profile Image */}
            <div className="shrink-0 z-10">
                {data.profileImg ? (
                    <img
                        src={data.profileImg}
                        alt={data.fullName || "Student Profile"}
                        className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-slate-100"
                    />
                ) : (
                    <div
                        className={`w-24 h-24 rounded-2xl bg-linear-to-br 
                        ${getAvatarGradient(
                            data.studentId
                        )} flex items-center justify-center text-2xl font-extrabold text-white shadow-md border-2 border-white ring-2 ring-slate-100`}
                    >
                        {getInitials(data.fullName)}
                    </div>
                )}
            </div>

            {/* Student Info */}
            <div className="flex-1 text-center sm:text-left z-10 space-y-1.5">
                <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
                    {data.fullName || "Student Name"}
                </h2>

                {data.studentId && (
                    <p className="text-xs font-mono font-medium text-slate-400">
                        ID: <span className="text-slate-600">{data.studentId}</span>
                    </p>
                )}

                {/* Badges / Metadata */}
                <div className="flex flex-wrap justify-center sm:justify-start gap-2 pt-2">
                    {data.batchCode && (
                        <span className="text-[10px] font-bold px-3 py-1 rounded-md border bg-blue-50 text-blue-700 border-blue-200/60 uppercase tracking-wider">
                            {data.batchCode}
                        </span>
                    )}

                    {data.status && (
                        <span
                            className="text-[10px] font-bold px-3 py-1 rounded-md border bg-emerald-50 text-emerald-700 
                            border-emerald-200/60 uppercase tracking-wider"
                        >
                            {data.status}
                        </span>
                    )}

                    {data.gender && (
                        <span
                            className="text-[10px] font-bold px-3 py-1 rounded-md border bg-slate-50 text-slate-600 
                            border-slate-200/60 uppercase tracking-wider"
                        >
                            {data.gender}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}