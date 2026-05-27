// import icons
import { Send, X, Loader2 } from "lucide-react";

// create modal
export default function CreateModal({ setShowModal, handleCreateNotice, setFormData, formData, NOTICE_TYPES, submitting }) {
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