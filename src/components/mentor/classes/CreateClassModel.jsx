// import icons
import { Video, X, ChevronDown, Loader2 } from "lucide-react";

// Create Class Modal Component
export default function CreateClassModel({ setShowCreateModal, handleCreateClass, formData, setFormData, handleDateChange, submitting, batches }) {
    return (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div
                className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-md w-full p-6 md:p-8 
                space-y-5 my-8 animate-in zoom-in-95 duration-200"
            >
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                            <Video size={18} />
                        </div>

                        <h3 className="text-base font-bold text-slate-800">Add Class Entry</h3>
                    </div>

                    <button
                        type="button"
                        onClick={() => setShowCreateModal(false)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-lg transition-colors cursor-pointer"
                    >
                        <X size={18} />
                    </button>
                </div>

                <form
                    onSubmit={handleCreateClass}
                    className="space-y-4"
                >
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Select Batch
                        </label>

                        <div className="relative">
                            <select
                                required
                                value={formData.batchCode}
                                onChange={(e) =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        batchCode: e.target.value,
                                    }))
                                }
                                className="w-full appearance-none pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                                text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
                            >
                                {batches.map((b) => (
                                    <option
                                        key={b.batchCode || b.id}
                                        value={b.batchCode}
                                    >
                                        {b.batchName} ({b.batchCode})
                                    </option>
                                ))}
                            </select>

                            <ChevronDown
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Class Date
                            </label>

                            <input
                                type="date"
                                required
                                value={formData.date}
                                onChange={handleDateChange}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold 
                                text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Day (Auto)
                            </label>

                            <input
                                type="text"
                                readOnly
                                placeholder="e.g. Monday"
                                value={formData.day}
                                className="w-full px-3 py-2 bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-bold 
                                text-slate-500 outline-none cursor-not-allowed"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Topic Covered
                        </label>

                        <input
                            type="text"
                            required
                            value={formData.topic}
                            onChange={(e) =>
                                setFormData((prev) => ({ ...prev, topic: e.target.value }))
                            }
                            placeholder="e.g. Redux Toolkit Async Thunks"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold 
                            text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all"
                        />
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Class Status
                        </label>

                        <div className="relative">
                            <select
                                value={formData.status}
                                onChange={(e) =>
                                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                                }
                                className="w-full appearance-none pl-3.5 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl 
                                text-xs font-semibold text-slate-800 outline-none focus:border-indigo-500 focus:bg-white transition-all cursor-pointer"
                            >
                                <option value="Conducted">Conducted</option>
                                <option value="Cancelled">Cancelled</option>
                            </select>

                            <ChevronDown
                                size={16}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                            />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 pt-3 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => setShowCreateModal(false)}
                            className="flex-1 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl 
                            shadow-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                        >
                            {submitting ? (
                                <>
                                    <Loader2 size={14} className="animate-spin" /> Saving...
                                </>
                            ) : (
                                "Save Entry"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}