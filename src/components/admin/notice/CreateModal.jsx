// import icons
import { Send, X, Loader2, Users } from "lucide-react";

// create modal
export default function CreateModal({ setShowModal, handleCreateNotice, setFormData, formData, NOTICE_TYPES, submitting, batches = [] }) {
    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden">
                <div className="bg-white px-8 pt-8 pb-4 flex justify-between items-center">
                    <h3 className="text-2xl font-black text-slate-800 tracking-tight">Create Announcement</h3>

                    <button
                        onClick={() => setShowModal(false)}
                        className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <form
                    onSubmit={handleCreateNotice}
                    className="p-8 space-y-6"
                >
                    {/* Priority Selector */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Select Priority</label>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                            {Object.entries(NOTICE_TYPES).map(([key, value]) => (
                                <button
                                    key={key}
                                    type="button"
                                    onClick={() => setFormData({ ...formData, type: key })}
                                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border text-[10px] font-black cursor-pointer 
                                        uppercase transition-all ${formData.type === key
                                            ? "border-[#0189c7] bg-blue-50 text-[#0189c7]"
                                            : "border-slate-100 bg-slate-50 text-slate-400 hover:border-slate-200"
                                        }`}
                                >
                                    {value.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* TARGET BATCH DROPDOWN (INTEGRATED HERE) */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Target Batch / Audience</label>

                        <div className="relative">
                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />

                            <select
                                required
                                className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 
                                focus:border-blue-300 transition-all font-medium text-slate-800 appearance-none cursor-pointer"
                                value={formData.targetBatch || ""}
                                onChange={e => setFormData({ ...formData, targetBatch: e.target.value })}
                            >
                                <option value="" disabled>Select a batch...</option>
                                <option value="all">All Batches (General Broadcast)</option>

                                {batches.map((batch) => (
                                    <option
                                        key={batch.id || batch.batchId}
                                        value={batch.name || batch.batchName}
                                    >
                                        {batch.name || batch.batchName}
                                    </option>
                                ))}
                            </select>

                            {/* Custom native dropdown arrow icon replacement overlay wrapper */}
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Heading Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Heading</label>

                        <input
                            required
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 
                            focus:border-blue-300 transition-all font-medium text-slate-800"
                            placeholder="e.g. Exam Schedule Update"
                            value={formData.title}
                            onChange={e => setFormData({ ...formData, title: e.target.value })}
                        />
                    </div>

                    {/* Content Input */}
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase text-slate-400 ml-1">Content</label>

                        <textarea
                            required
                            rows={4}
                            className="w-full bg-slate-50 border border-slate-100 p-4 rounded-2xl outline-none focus:ring-2 focus:ring-blue-100 
                            focus:border-blue-300 transition-all font-medium text-slate-800 resize-none"
                            placeholder="Write your announcement message here..."
                            value={formData.content}
                            onChange={e => setFormData({ ...formData, content: e.target.value })}
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={submitting}
                        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-sm cursor-pointer shadow-xl 
                        hover:bg-slate-800 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {submitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                        {submitting ? "Sending..." : "Submit for Approval"}
                    </button>
                </form>
            </div>
        </div>
    )
}