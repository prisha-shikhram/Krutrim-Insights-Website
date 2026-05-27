// student menu component
export default function StudentMenu({ menuItems, collapsed, handleNav, isActive }) {
    return (
        <nav className="space-y-1 flex-1">
            {menuItems.map(item => {
                const active = isActive(item.id);

                return (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center ${collapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl transition-all group cursor-pointer
                        ${active
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                                : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"}`}
                    >
                        <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-slate-600"}`}>
                            {item.icon}
                        </span>

                        {!collapsed && <span className="text-sm font-bold tracking-tight">{item.label}</span>}
                    </button>
                );
            })}
        </nav>
    );
}