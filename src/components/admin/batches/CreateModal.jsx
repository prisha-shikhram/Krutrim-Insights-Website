// import components
import Modal from "./Modal";

// import icons
import { Loader2 } from "lucide-react";

// create modal component
export default function CreateModal({ showCreateModal, setShowCreateModal, submitting, handleCreateBatch, newBatch, setNewBatch, }) {
    return (
        <Modal
            isOpen={showCreateModal}
            onClose={() => setShowCreateModal(false)}
            title="Create New Cohort"
            subtitle="Batch Configuration"
            footer={
                <>
                    <button
                        onClick={() => setShowCreateModal(false)}
                        className="flex-1 py-4 font-bold text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        form="create-batch-form"
                        type="submit"
                        disabled={submitting}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm flex items-center justify-center cursor-pointer"
                    >
                        {submitting ? <Loader2 className="animate-spin" /> : "Create Batch"}
                    </button>
                </>
            }
        >
            <form
                id="create-batch-form"
                onSubmit={handleCreateBatch}
                className="space-y-4"
            >
                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Batch Name</label>

                    <input
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 
                        ring-blue-100 outline-none transition-all"
                        placeholder="e.g. Fullstack Web Dev"
                        value={newBatch.batchName}
                        onChange={e => setNewBatch({ ...newBatch, batchName: e.target.value })}
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-[10px] font-black uppercase text-slate-400 ml-2">Internal Code</label>

                    <input
                        required
                        className="w-full bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-sm focus:ring-2 ring-blue-100 outline-none 
                        transition-all uppercase"
                        placeholder="e.g. FS-2024"
                        value={newBatch.batchCode}
                        onChange={e => setNewBatch({ ...newBatch, batchCode: e.target.value.toUpperCase() })}
                    />
                </div>
            </form>
        </Modal>
    )
}