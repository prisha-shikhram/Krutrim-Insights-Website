// import icons
import { Mail, BookOpen, School, FolderKanban } from "lucide-react";

// navigation
import { useNavigate } from "react-router-dom";

// source metadata config
const SOURCE_META = {
    contact: {
        label: "Contact",
        icon: <Mail size={10} />,
        className: "text-[#0189c7] bg-[#0189c715] border-[#0189c730]",
        route: "/admin/dashboard/contact"
    },
    brochure: {
        label: "Brochure",
        icon: <BookOpen size={10} />,
        className: "text-sky-500 bg-sky-100 border-sky-200",
        route: "/admin/dashboard/brochure"
    },
    colleges: {
        label: "College",
        icon: <School size={10} />,
        className: "text-purple-500 bg-purple-100 border-purple-200",
        route: "/admin/dashboard/colleges"
    },
    project: {
        label: "Project",
        icon: <FolderKanban size={10} />,
        className: "text-emerald-600 bg-emerald-100 border-emerald-200",
        route: "/admin/dashboard/project"
    }
};

// activity table component
export default function ActivityTable({ data, onNavigate }) {
    const navigate = useNavigate();

    // use sourceKey
    const getSourceMeta = (item) => {
        return SOURCE_META[item.sourceKey] || SOURCE_META.contact;
    };

    // get user initial
    const getInitial = (item) => {
        const name = item.name || item.fullName || item.email || "U";
        return name.charAt(0).toUpperCase();
    };

    // handle row click to navigate to details page
    const handleRedirect = (item) => {
        const source = getSourceMeta(item);

        if (item.id) {
            navigate(`${source.route}?id=${item.id}`);
        } else {
            navigate(source.route);
        }
    };

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-separate border-spacing-y-2">
                {/* HEADER */}
                <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                    <tr>
                        <th className="px-6 py-3">User</th>
                        <th className="px-6 py-3">Module</th>
                        <th className="px-6 py-3">Date</th>
                        <th className="px-6 py-3 text-right">Details</th>
                    </tr>
                </thead>

                <tbody className="text-sm text-gray-600">
                    {data.loading ? (
                        <tr>
                            <td colSpan="4" className="py-20 text-center text-gray-400 italic">
                                Synchronizing with AWS...
                            </td>
                        </tr>
                    ) : data.recent?.length > 0 ? (
                        data.recent.map((item, idx) => {
                            const source = getSourceMeta(item);

                            return (
                                <tr
                                    key={idx}
                                    className="bg-white shadow-sm border border-gray-100 rounded-xl 
                                    hover:shadow-md transition-all group cursor-pointer"
                                    onClick={() => {
                                        onNavigate?.(`Viewed ${item.type || "activity"} → ${item.email || "unknown"}`);
                                        handleRedirect(item);
                                    }}
                                >
                                    {/* USER */}
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center font-bold text-gray-600 text-xs">
                                                {getInitial(item)}
                                            </div>

                                            <div>
                                                <p className="font-semibold text-gray-800 text-sm">
                                                    {item.name || item.fullName || item.email || "Unknown User"}
                                                </p>

                                                <p className="text-[11px] text-gray-400">
                                                    {item.email || "No email"}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* MODULE */}
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-bold border ${source.className}`}>
                                            {source.icon}
                                            {item.sourceLabel || source.label}
                                        </span>
                                    </td>

                                    {/* DATE */}
                                    <td className="px-6 py-4 text-gray-400 text-xs font-medium tabular-nums">
                                        {item.createdAt || item.date ? (
                                            new Date(item.createdAt || item.date).toLocaleDateString("en-GB", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })
                                        ) : "—"}
                                    </td>

                                    {/* DETAILS BUTTON */}
                                    <td className="px-6 py-4 text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation(); // prevent row click
                                                handleRedirect(item);
                                            }}
                                            className="px-3 py-1.5 text-[11px] font-bold rounded-lg border border-gray-100 text-gray-400 
                                            hover:text-[#0189c7] hover:border-[#0189c7] hover:bg-[#0189c710] transition-all opacity-0 
                                            group-hover:opacity-100 cursor-pointer"
                                        >
                                            View Details →
                                        </button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="4" className="py-20 text-center text-gray-400 italic">
                                No recent activity found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}