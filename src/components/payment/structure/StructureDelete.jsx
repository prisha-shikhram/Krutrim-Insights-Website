// import icons
import { AlertTriangle } from "lucide-react"

// structure delete component
export default function StructureDelete({ setDeleteModal, confirmDeletion, deleteModal }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                onClick={() => setDeleteModal({ isOpen: false, targetId: null, index: null })}
            />

            <div
                className="relative w-full max-w-sm bg-white rounded-3xl p-6 shadow-2xl border border-slate-100 text-center space-y-4"
                style={{ animation: "slideUp 0.3s cubic-bezier(.16,1,.3,1) both" }}
            >
                <div className="w-12 h-12 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-center mx-auto text-rose-500">
                    <AlertTriangle size={24} />
                </div>

                <div>
                    <h4 className="text-base font-black text-slate-900 tracking-tight">Remove Installment</h4>
                    <p className="text-xs text-slate-400 mt-1">
                        Are you sure you want to delete Installment #{deleteModal.index + 1}? This action will change the computed
                        balance allocation variables.
                    </p>
                </div>

                <div className="flex gap-3 pt-2">
                    <button
                        type="button"
                        onClick={() => setDeleteModal({ isOpen: false, targetId: null, index: null })}
                        className="flex-1 py-2.5 text-xs font-bold text-slate-500 border rounded-xl hover:bg-slate-50 transition-all cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={confirmDeletion}
                        className="flex-1 py-2.5 text-xs font-bold text-white bg-rose-500 rounded-xl hover:bg-rose-600 
                        shadow-md shadow-rose-200 transition-all cursor-pointer"
                    >
                        Delete Node
                    </button>
                </div>
            </div>
        </div>
    )
}