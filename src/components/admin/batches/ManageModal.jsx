// import components
import Modal from "./Modal";

// import icons
import { UserMinus, Users, } from "lucide-react";

// manage modal component
export default function ManageModal({ showManageModal, setShowManageModal, setConfirmRemove, }) {
    return (
        <Modal
            isOpen={!!showManageModal}
            onClose={() => setShowManageModal(null)}
            title="Manage Batch"
            subtitle={showManageModal?.batchName}
        >
            <div className="space-y-2">
                {showManageModal?.students?.length > 0 ? showManageModal.students.map(email => (
                    <div
                        key={email}
                        className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-black">ST</div>
                            <p className="text-sm font-bold text-slate-700">{email}</p>
                        </div>

                        <button
                            onClick={() => setConfirmRemove({ email, batchCode: showManageModal.batchCode })}
                            className="p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                        >
                            <UserMinus size={18} />
                        </button>
                    </div>
                )) : (
                    <div className="text-center py-10">
                        <Users className="mx-auto text-slate-200 mb-2" size={40} />
                        <p className="text-slate-400 text-sm italic">This batch is currently empty.</p>
                    </div>
                )}
            </div>
        </Modal>
    )
}