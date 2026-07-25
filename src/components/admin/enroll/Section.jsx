// section component
export default function Section({ title, icon, children }) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-6 md:p-8 space-y-6">
            {/* Header */}
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-4">
                {icon && <span className="text-slate-500">{icon}</span>}
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {title}
                </h3>
            </div>

            {/* Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {children}
            </div>
        </div>
    );
}