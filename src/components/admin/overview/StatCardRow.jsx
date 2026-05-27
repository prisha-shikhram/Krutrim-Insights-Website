// import components
import StatCard from "./StatCard";

// import icons
import { Mail, BookOpen, School, FolderKanban } from "lucide-react";

// navigation
import { useNavigate } from "react-router-dom";

// stat card row component
export default function StatCardRow({ data, PRIMARY, user, onNavigate }) {
    const navigate = useNavigate();
    const stats = data?.stats || {};

    // Central config
    const CARDS = [
        {
            key: "contact",
            title: "Contact Leads",
            color: PRIMARY,
            icon: <Mail size={18} />,
            route: "/admin/dashboard/contact"
        },
        {
            key: "brochure",
            title: "Brochure Req.",
            color: "#00c6ff",
            icon: <BookOpen size={18} />,
            route: "/admin/dashboard/brochure"
        },
        {
            key: "colleges",
            title: "College Forms",
            color: "#7c3aed",
            icon: <School size={18} />,
            route: "/admin/dashboard/colleges"
        },
        {
            key: "project",
            title: "Projects",
            color: "#059669",
            icon: <FolderKanban size={18} />,
            route: "/admin/dashboard/project"
        }
    ];

    // handle redirect
    const handleRedirect = (card, allowed) => {
        if (!allowed) return; // block if not allowed
        navigate(card.route);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map((card) => {
                const allowed = user.isSuper || user.permissions?.includes(card.key);

                return (
                    <div
                        key={card.key}
                        onClick={() => {
                            onNavigate("Contact Leads");
                            navigate("/admin/dashboard/contact");
                        }}
                        className={`transition-all duration-300
                            ${allowed
                                ? "cursor-pointer hover:scale-[1.02]"
                                : "cursor-not-allowed opacity-80"
                            }`}
                    >
                        {/* stat card */}
                        <StatCard
                            title={card.title}
                            count={stats[card.key]}
                            color={card.color}
                            icon={card.icon}
                            trend={data?.trends?.[card.key]}
                            allowed={allowed}
                        />
                    </div>
                );
            })}
        </div>
    );
}