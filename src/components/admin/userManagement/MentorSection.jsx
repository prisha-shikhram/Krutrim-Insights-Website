// import icons
import { Loader2, GraduationCap } from "lucide-react";

// mentor section component
export default function MentorSection({ loading, mentors }) {
    return (
        <div className="space-y-4 pt-4">
            <div className="flex items-center gap-2 px-4">
                <GraduationCap size={20} className="text-emerald-500" />
                <h2 className="text-lg font-bold text-gray-700">Academic Mentors</h2>
            </div>

            <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                        <tr>
                            <th className="px-8 py-5">Mentor Profile</th>
                            <th className="px-8 py-5">Role</th>
                            <th className="px-8 py-5 text-right whitespace-nowrap">Access Status</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="py-20 text-center"
                                >
                                    <Loader2 className="animate-spin mx-auto text-emerald-500" />
                                </td>
                            </tr>
                        ) : mentors.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="py-10 text-center text-gray-400 text-sm italic"
                                >
                                    No mentors found in directory
                                </td>
                            </tr>
                        ) : mentors.map((mentor) => (
                            <tr
                                key={mentor.email}
                                className="hover:bg-gray-50/50 transition-colors"
                            >
                                <td className="px-8 py-5 font-bold text-gray-700">
                                    {mentor.name} <br />
                                    <span className="text-xs font-normal text-gray-400 font-mono">{mentor.email}</span>
                                </td>

                                <td className="px-8 py-5">
                                    <span
                                        className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border 
                                        border-emerald-100 uppercase"
                                    >
                                        Mentor
                                    </span>
                                </td>

                                <td className="px-8 py-5 text-right">
                                    <span className="text-green-500 text-xs font-bold flex items-center justify-end gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}