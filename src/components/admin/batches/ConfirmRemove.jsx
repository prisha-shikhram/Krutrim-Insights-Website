// import icons
import { AlertTriangle, Loader2 } from "lucide-react"

// confirm remove component
export default function ConfirmRemove({ confirmRemove, setConfirmRemove, handleRemoveStudent, submitting }) {
    return (
        <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm z-110 flex items-center justify-center p-4">
            <div className="bg-white w-full max-w-sm rounded-4xl p-8 text-center animate-in zoom-in-95">
                <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
                    <AlertTriangle size={40} />
                </div>

                <h3 className="text-2xl font-black text-slate-800">Remove Student?</h3>

                <p className="text-sm text-slate-500 mt-2 mb-8 leading-relaxed">
                    This will remove <b>{confirmRemove.email}</b> from the batch and move them to unassigned.
                </p>

                <div className="flex gap-3">
                    <button
                        onClick={() => setConfirmRemove(null)}
                        className="flex-1 py-4 font-bold text-slate-400 hover:bg-slate-50 rounded-2xl transition-all cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleRemoveStudent}
                        disabled={submitting}
                        className="flex-1 bg-red-500 text-white py-4 rounded-2xl font-bold hover:bg-red-600 shadow-lg 
                        shadow-red-100 transition-all flex items-center justify-center cursor-pointer"
                    >
                        {submitting ? <Loader2 className="animate-spin" /> : "Confirm"}
                    </button>
                </div>
            </div>
        </div>
    )
}