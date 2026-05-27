// menu component for admin dashboard
export default function Menu({ menuItems, user, collapsed, handleNav, isActive }) {
    return (
        <nav className="space-y-1 flex-1 overflow-y-scroll no-scrollbar">
            {menuItems.map(item => {
                if (item.superOnly && !user.isSuper) return null;
                if (!user.isSuper && item.permission && !user.permissions.includes(item.permission)) return null;

                const active = isActive(item.id);

                return (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all                                    group cursor-pointer
                        ${active
                                ? "bg-[#0189c708] text-[#0189c7]"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                            }`}
                    >
                        <span className={`${active ? "text-[#0189c7]" : "text-slate-400 group-hover:text-slate-600"}`}>
                            {item.icon}
                        </span>

                        {!collapsed && <span className="text-sm font-bold tracking-tight">{item.label}</span>}

                        {active && !collapsed && (
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#0189c7]" />
                        )}
                    </button>
                );
            })}
        </nav>
    )
}