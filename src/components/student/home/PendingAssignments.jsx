// import icons
import { ArrowUpRight, Calendar } from "lucide-react"

// Pending Assignments component
export default function PendingAssignments() {
    return (
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-[40px] border border-white p-10 shadow-sm">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-xl font-black text-slate-800">Pending Tasks</h3>
                    <p className="text-xs text-slate-400 font-medium mt-1">Items requiring your attention</p>
                </div>

                <button
                    className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 
                    hover:border-blue-100 transition-all cursor-pointer"
                >
                    <ArrowUpRight size={20} />
                </button>
            </div>

            <div className="space-y-3">
                {[
                    { title: "Database Normalization", date: "Oct 24", tag: "Logic", color: "text-blue-500 bg-blue-50" },
                    { title: "React Hooks Implementation", date: "Oct 26", tag: "UI/UX", color: "text-indigo-500 bg-indigo-50" },
                    { title: "System Design Basics", date: "Nov 02", tag: "Architecture", color: "text-slate-500 bg-slate-50" },
                ].map((task, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-5 rounded-3xl border border-transparent hover:border-white 
                        hover:bg-white/80 transition-all duration-300 cursor-pointer group"
                    >
                        <div className="flex items-center gap-5">
                            <div
                                className="w-12 h-12 rounded-2xl bg-white border border-slate-50 flex items-center justify-center 
                                text-slate-300 group-hover:text-blue-500 transition-colors"
                            >
                                <Calendar size={18} />
                            </div>

                            <div>
                                <p className="font-bold text-slate-700 text-sm">{task.title}</p>
                                <p className="text-[11px] text-slate-400 font-medium">Deadline: {task.date}</p>
                            </div>
                        </div>

                        <span className={`text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest ${task.color} border border-transparent`}>
                            {task.tag}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    )
}