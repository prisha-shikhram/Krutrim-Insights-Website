// import icons
import { Loader2, Briefcase, Share2, Calendar, ChevronRight, Layers } from "lucide-react";

// project list component
export default function ProjectList({ loading, projects, setActiveProject, setShowShare }) {
    // Formatting helper
    const formatDate = (ts) => {
        return new Date(ts).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
        });
    };

    return (
        <div className="w-full">
            {loading ? (
                <div className="py-24 flex flex-col items-center justify-center gap-4">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Loading Workspaces...</p>
                </div>
            ) : projects.length === 0 ? (
                <div
                    className="bg-white/40 backdrop-blur-md p-20 rounded-[3rem] border-2 border-dashed border-slate-100 text-center animate-in fade-in 
                    zoom-in-95 duration-500"
                >
                    <div className="w-20 h-20 bg-indigo-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-indigo-200">
                        <Layers size={40} />
                    </div>

                    <h3 className="text-slate-800 font-black text-lg uppercase tracking-tight">No Active Projects</h3>
                    <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto font-medium">
                        You haven't initialized any project workspaces yet. Launch a new project to start tracking student progress.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {projects.map((project) => (
                        <div
                            key={project.projectId}
                            className="group relative bg-white p-10 rounded-[3.5rem] border border-slate-100 shadow-sm hover:shadow-2xl 
                            hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full overflow-hidden"
                        >
                            {/* Accent Glow */}
                            <div
                                className="absolute top-0 right-0 w-32 h-32 bg-indigo-50/50 rounded-full blur-3xl -mr-16 -mt-16 
                                group-hover:bg-indigo-100/60 transition-colors"
                            />

                            {/* Header Section */}
                            <div className="flex justify-between items-start mb-8 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div
                                        className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center shadow-lg 
                                        group-hover:bg-indigo-600 transition-colors duration-300"
                                    >
                                        <Briefcase size={24} />
                                    </div>

                                    <div>
                                        <span className="text-[9px] font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full uppercase tracking-widest">
                                            Project Workspace
                                        </span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setActiveProject(project);
                                        setShowShare(true);
                                    }}
                                    className="p-4 bg-slate-50 text-slate-400 hover:text-indigo-600 hover:bg-white hover:shadow-md rounded-2xl 
                                    transition-all cursor-pointer group/btn"
                                    title="Share with Batch"
                                >
                                    <Share2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                                </button>
                            </div>

                            {/* Content Section */}
                            <div className="grow mb-8 relative z-10">
                                <h3 className="text-xl font-black text-slate-800 leading-tight mb-3 group-hover:text-indigo-600 transition-colors">
                                    {project.name}
                                </h3>

                                <p className="text-sm text-slate-400 font-medium leading-relaxed line-clamp-3">
                                    {project.description}
                                </p>
                            </div>

                            {/* Footer Section */}
                            <div className="flex items-center justify-between mt-auto pt-8 border-t border-slate-50 relative z-10">
                                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-[0.15em]">
                                    <Calendar size={12} className="text-indigo-300" />
                                    Created at: {formatDate(project.createdAt)}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}