// banner component
export default function Banner({ student }) {
    return (
        <div className="relative overflow-hidden rounded-[40px] p-10 border border-white bg-white/40 backdrop-blur-md shadow-sm">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black text-slate-800 mb-3 tracking-tight">
                        Hey, {student.name?.split(' ')[0]}!
                    </h1>

                    <p className="text-slate-500 text-sm font-medium leading-relaxed">
                        Welcome back! It's great to see you. Ready to pick up where you left off and <span className="text-blue-600 font-bold">
                            keep building your future?
                        </span>
                    </p>
                </div>
            </div>

            {/* Decorative background element */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
        </div>
    )
}