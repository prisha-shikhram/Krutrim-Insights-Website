// import icons
import { Loader2 } from "lucide-react";

// import components
import Modal from "./Modal";

// Edit Modal component
export default function EditModal({ showEditModal, setShowEditModal, submitting, handleEditBatch }) {
    // Prevent rendering if modal state is falsy
    if (!showEditModal) return null;

    return (
        <Modal
            isOpen={!!showEditModal}
            onClose={() => setShowEditModal(null)}
            title="Edit Batch Details"
            subtitle={`Editing: ${showEditModal.batchCode || showEditModal.batchName || ""}`}
            footer={
                <>
                    <button
                        type="button"
                        onClick={() => setShowEditModal(null)}
                        className="flex-1 py-3 font-bold text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        form="edit-batch-form"
                        disabled={submitting}
                        className="flex-1 bg-indigo-600 text-white py-3 rounded-2xl font-black text-sm disabled:opacity-50 transition-all 
                        cursor-pointer hover:bg-indigo-700 hover:shadow-indigo-200 hover:shadow-lg flex items-center justify-center gap-2"
                    >
                        {submitting ? (
                            <Loader2 className="animate-spin" size={18} />
                        ) : (
                            "Save Changes"
                        )}
                    </button>
                </>
            }
        >
            <form
                id="edit-batch-form"
                onSubmit={handleEditBatch}
                className="space-y-4 py-2"
            >
                {/* Batch Name Input */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Batch Name
                    </label>

                    <input
                        type="text"
                        required
                        value={showEditModal.batchName || ""}
                        onChange={(e) =>
                            setShowEditModal({ ...showEditModal, batchName: e.target.value })
                        }
                        placeholder="e.g. MERN Stack Web Dev"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-sm font-semibold 
                        text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all"
                    />
                </div>

                {/* Batch Code Input */}
                <div className="space-y-1.5">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Batch Code
                    </label>

                    <input
                        type="text"
                        required
                        value={showEditModal.batchCode || ""}
                        onChange={(e) =>
                            setShowEditModal({ ...showEditModal, batchCode: e.target.value })
                        }
                        placeholder="e.g. BATCH-2026-A"
                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3.5 text-xs font-mono font-bold 
                        text-slate-800 outline-none focus:ring-2 ring-indigo-100 focus:bg-white transition-all"
                    />
                </div>
            </form>
        </Modal>
    );
}