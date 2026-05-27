// mentor menu component
export default function MentorMenu({ menuItems, collapsed, handleNav, isActive }) {
    return (
        <nav className="space-y-1 flex-1 overflow-y-auto custom-scrollbar">
            {menuItems.map(item => {
                const active = isActive(item.id);

                return (
                    <button
                        key={item.id}
                        onClick={() => handleNav(item.id)}
                        className={`w-full flex items-center transition-all duration-200 group cursor-pointer
                        ${collapsed ? "justify-center px-2" : "gap-3 px-4"} py-3 rounded-xl
                        ${active
                                ? "bg-indigo-600 text-white shadow-md shadow-indigo-100"
                                : "text-slate-500 hover:bg-indigo-50 hover:text-indigo-600"}`}
                    >
                        <span className={`${active ? "text-white" : "text-slate-400 group-hover:text-indigo-500"}`}>
                            {item.icon}
                        </span>

                        {!collapsed && (
                            <span className="text-sm font-bold tracking-tight">
                                {item.label}
                            </span>
                        )}
                    </button>
                );
            })}
        </nav>
    );
}