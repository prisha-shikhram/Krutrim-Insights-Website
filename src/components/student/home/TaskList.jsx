// import icons
import { Calendar, ArrowRight } from "lucide-react";

// task list component
export default function TaskList({ dashboardData, navigate }) {
    return (
        <div className="lg:col-span-2 bg-white/60 backdrop-blur-sm rounded-[40px] border border-white p-10 shadow-sm">
            <h3 className="text-xl font-black text-slate-800 mb-8">New Tasks</h3>

            <div className="space-y-4">
                {dashboardData.pendingTasks.length > 0 ? dashboardData.pendingTasks.map((task, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between p-6 rounded-3xl border border-transparent hover:border-white 
                        hover:bg-white/80 transition-all group"
                    >
                        <div className="flex items-center gap-5 flex-1 overflow-hidden">
                            <div
                                className="w-12 h-12 rounded-2xl bg-white border border-slate-50 flex items-center justify-center 
                                text-slate-300 shrink-0"
                            >
                                <Calendar size={18} />
                            </div>

                            <div className="overflow-hidden">
                                <p className="font-bold text-slate-700 text-sm truncate">{task.displayTitle}</p>

                                <p className="text-[11px] text-slate-400 font-medium truncate">
                                    {task.description ? `${task.description.substring(0, 60)}...` : "No description provided..."}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate(task.link)}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-100 rounded-2xl text-[10px] cursor-pointer
                            font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all shrink-0 ml-4"
                        >
                            View <ArrowRight size={14} />
                        </button>
                    </div>
                )) : (
                    <div className="text-center py-10 text-slate-400 text-sm font-medium italic">All caught up!</div>
                )}
            </div>
        </div>
    )
}