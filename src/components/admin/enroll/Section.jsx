// section component
export default function Section({ title, icon, children }) {
    return (
        <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8 space-y-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 flex items-center gap-2 border-b border-slate-50 pb-4">
                {icon} {title}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {children}
            </div>
        </div>
    );
}