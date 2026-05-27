// import icons
import { Trash2, Edit2, Loader2, UserPlus } from "lucide-react";

// admin section component
export default function AdminSection({ loading, admins, openEditModal, handleDelete, }) {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2 px-4">
                <UserPlus size={20} className="text-[#0189c7]" />
                <h2 className="text-lg font-bold text-gray-700">Administrative Officers</h2>
            </div>

            <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                        <tr>
                            <th className="px-8 py-5">Admin Identity</th>
                            <th className="px-8 py-5">Access Rights</th>
                            <th className="px-8 py-5 text-right">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-50">
                        {loading ? (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="py-20 text-center"
                                >
                                    <Loader2 className="animate-spin mx-auto text-[#0189c7]" />
                                </td>
                            </tr>
                        ) : admins.map((admin) => (
                            <tr
                                key={admin.email}
                                className="hover:bg-gray-50/50 transition-colors group"
                            >
                                <td className="px-8 py-5 font-bold">
                                    <div className="text-gray-800">{admin.name}</div>
                                    <div className="text-xs font-normal text-gray-400 font-mono">{admin.email}</div>
                                </td>

                                <td className="px-8 py-5">
                                    <div className="flex flex-wrap gap-2">
                                        {admin.permissions?.map(p => (
                                            <span
                                                key={p}
                                                className="px-2 py-1 bg-blue-50 text-[#0189c7] text-[9px] font-bold rounded-md border 
                                                border-blue-100"
                                            >
                                                {p.toUpperCase()}
                                            </span>
                                        ))}
                                    </div>
                                </td>

                                <td className="px-8 py-5 text-right">
                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => openEditModal(admin)}
                                            className="p-2 text-gray-300 hover:text-blue-500 transition-colors cursor-pointer"
                                        >
                                            <Edit2 size={18} />
                                        </button>

                                        <button
                                            onClick={() => handleDelete(admin.email)}
                                            className="p-2 text-gray-300 hover:text-red-500 transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}