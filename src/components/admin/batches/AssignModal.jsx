// import components
import Modal from "./Modal";

// import icons
import { Loader2, Search } from "lucide-react";

// assign modal component
export default function AssignModal({
    showAssignModal, setShowAssignModal, selectedStudents, setSelectedStudents, handleConfirmAssignment, searchTerm, setSearchTerm, filteredUnassigned, submitting
}) {
    return (
        <Modal
            isOpen={!!showAssignModal}
            onClose={() => { setShowAssignModal(null); setSelectedStudents([]); }}
            title="Assign Students"
            subtitle={`Target Batch: ${showAssignModal}`}
            footer={
                <>
                    <button
                        onClick={() => setShowAssignModal(null)}
                        className="flex-1 py-4 font-bold text-slate-400 cursor-pointer"
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleConfirmAssignment}
                        disabled={selectedStudents.length === 0 || submitting}
                        className="flex-1 bg-blue-600 text-white py-4 rounded-2xl font-black text-sm disabled:opacity-50 transition-all cursor-pointer"
                    >
                        {submitting ? <Loader2 className="animate-spin mx-auto" /> : `Assign ${selectedStudents.length} Students`}
                    </button>
                </>
            }
        >
            <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />

                <input
                    className="w-full bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-5 py-4 text-sm outline-none focus:ring-2 ring-blue-100"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="space-y-2 min-h-50">
                {filteredUnassigned.length > 0 ? filteredUnassigned.map(s => (
                    <label
                        key={s.email}
                        className={`flex items-center gap-4 p-4 border rounded-2xl cursor-pointer transition-all 
                        ${selectedStudents.includes(s.email) ? 'bg-blue-50 border-blue-200' : 'hover:bg-slate-50 border-slate-100'}`}
                    >
                        <div className="relative flex items-center">
                            <input
                                type="checkbox"
                                className="w-5 h-5 rounded-lg border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                checked={selectedStudents.includes(s.email)}
                                onChange={(e) => e.target.checked ? setSelectedStudents([...selectedStudents, s.email])
                                    : setSelectedStudents(selectedStudents.filter(id => id !== s.email))}
                            />
                        </div>

                        <div>
                            <span className="text-sm font-bold block text-slate-700">{s.fullName}</span>
                            <span className="text-[10px] text-slate-400 font-medium">{s.email}</span>
                        </div>
                    </label>
                )) : (
                    <div className="text-center py-10">
                        <p className="text-slate-400 text-sm italic">No unassigned students found.</p>
                    </div>
                )}
            </div>
        </Modal>
    )
}