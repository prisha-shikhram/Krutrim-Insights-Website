// import hooks
import { useState } from "react";

// import icons
import { X, FolderPlus, AlignLeft, Layout, Loader2, Sparkles } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// create project modal
export default function CreateProjectModal({ onClose, refresh, mentor, PROJECT_API }) {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({ name: "", description: "" });

    const handleCreate = async () => {
        // Guard clause for mentor data
        if (!mentor || !mentor.email) {
            return toast.error("Authentication error: Mentor session not found");
        }

        if (!form.name.trim() || !form.description.trim()) {
            return toast.error("Please fill in all fields");
        }

        setLoading(true);
        const tid = toast.loading("Initializing project workspace...");

        try {
            const res = await fetch(PROJECT_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "createProject",
                    ...form,
                    createdBy: mentor.email,
                    createdAt: Date.now()
                })
            });

            if (res.ok) {
                toast.success("Project workspace created!", { id: tid });
                refresh();
                onClose();
            } else {
                throw new Error();
            }
        } catch (err) {
            toast.error("Failed to create project", { id: tid });
        } finally {
            setLoading(false);
        }
    };

    const labelCls = "text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 ml-1 mb-2 block";
    const inputCls = "w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all font-bold text-sm text-slate-700 placeholder:text-slate-300 placeholder:font-medium";

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-lg rounded-[3.5rem] p-10 shadow-2xl shadow-indigo-900/20 relative overflow-hidden">
                {/* Decorative background glow */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-50 rounded-full blur-3xl opacity-50" />

                <div className="relative z-10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-10">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                                <FolderPlus size={22} />
                            </div>

                            <div>
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">New Project</h3>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Setup Workspace</p>
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="p-3 hover:bg-slate-50 text-slate-400 hover:text-slate-800 rounded-full transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Form */}
                    <div className="space-y-6">
                        <div>
                            <label className={labelCls}>Project Name</label>

                            <div className="relative">
                                <Layout className="absolute left-4 top-4 text-slate-300" size={18} />

                                <input
                                    type="text"
                                    placeholder="e.g., E-Commerce Dashboard"
                                    className={`${inputCls} pl-12`}
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div>
                            <label className={labelCls}>Description & Objectives</label>

                            <div className="relative">
                                <AlignLeft className="absolute left-4 top-4 text-slate-300" size={18} />

                                <textarea
                                    placeholder="Outline the core goals and tech stack..."
                                    rows={4}
                                    className={`${inputCls} pl-12 resize-none`}
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <button
                                onClick={handleCreate}
                                disabled={loading}
                                className="w-full py-5 bg-slate-900 text-white rounded-4xl font-black uppercase text-[10px] tracking-[0.2em] 
                                shadow-xl hover:bg-indigo-600 hover:shadow-indigo-200 active:scale-[0.98] transition-all disabled:opacity-50 
                                flex items-center justify-center gap-3 cursor-pointer"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin" size={18} />
                                ) : (
                                    <Sparkles size={16} className="text-indigo-400" />
                                )}
                                {loading ? "Creating..." : "Initialize Workspace"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}