// import hooks
import { useState, useMemo } from "react";

// import icons
import { X, CheckCircle2, Send, Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// share assignment modal
export default function ShareAssignmentModal({ onClose, assignment, batches }) {
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [sharing, setSharing] = useState(false);

    // Get list of already assigned emails from the assignment prop
    const alreadyAssigned = useMemo(() => assignment.sharedWith || [], [assignment]);

    // Toggle Batch Logic
    const toggleBatch = (batchCode) => {
        const batch = batches.find(b => b.batchCode === batchCode);

        // Filter out students who already have the assignment
        const eligibleStudents = (batch?.students || []).filter(
            email => !alreadyAssigned.includes(email)
        );

        if (selectedBatches.includes(batchCode)) {
            // REMOVE BATCH
            setSelectedBatches(prev => prev.filter(b => b !== batchCode));
            setSelectedStudents(prev => prev.filter(email => !eligibleStudents.includes(email)));
        } else {
            // ADD BATCH
            if (eligibleStudents.length === 0) {
                return toast.error("All students in this batch already have this assignment.");
            }
            setSelectedBatches(prev => [...prev, batchCode]);
            setSelectedStudents(prev => [...new Set([...prev, ...eligibleStudents])]);
        }
    };

    // handle share
    const handleShare = async () => {
        if (selectedStudents.length === 0) return toast.error("Select at least one student");

        setSharing(true);
        const tid = toast.loading("Distributing assignment...");

        try {
            const res = await fetch("https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/share-assignments", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "shareAssignment",
                    assignmentId: assignment.assignmentId,
                    studentEmails: selectedStudents
                })
            });

            if (!res.ok) throw new Error();

            toast.success("Successfully shared with students!", { id: tid });
            onClose();
        } catch (err) {
            toast.error("Sharing failed. Please try again.", { id: tid });
        } finally {
            setSharing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
                {/* Header Section */}
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-black text-slate-800">Share Assignment</h3>
                        <p className="text-xs text-indigo-600 font-bold uppercase tracking-widest mt-1">{assignment.title}</p>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
                    >
                        <X size={20} className="text-slate-400" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
                    {/* BATCH SELECTION */}
                    <section>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-[2px] block mb-4">
                            Select Target Batches
                        </label>

                        <div className="flex flex-wrap gap-3">
                            {batches?.map(batch => {
                                // Visual indicator if a batch is already fully assigned
                                const isFullyAssigned = batch.students?.every(email => alreadyAssigned.includes(email));

                                return (
                                    <button
                                        key={batch.batchCode}
                                        type="button"
                                        disabled={isFullyAssigned}
                                        onClick={() => toggleBatch(batch.batchCode)}
                                        className={`px-5 py-3 rounded-2xl border text-xs font-bold transition-all cursor-pointer 
                                            ${isFullyAssigned ? "opacity-40 grayscale cursor-not-allowed" : ""}
                                            ${selectedBatches.includes(batch.batchCode)
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg shadow-indigo-100"
                                                : "bg-white border-slate-100 text-slate-500 hover:border-indigo-200"
                                            }`}
                                    >
                                        {batch.batchName || batch.batchCode}
                                        {isFullyAssigned && " (Done)"}
                                    </button>
                                );
                            })}
                        </div>
                    </section>

                    {/* STUDENT LIST */}
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <label className="text-[10px] font-black uppercase text-slate-400 tracking-[2px]">
                                Target Students ({selectedStudents.length})
                            </label>
                        </div>

                        <div className="bg-slate-50 rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto border border-slate-100">
                            {selectedBatches.length === 0 ? (
                                <div className="col-span-full py-10 text-center">
                                    <p className="text-xs font-bold text-slate-300 uppercase tracking-widest">Select an eligible batch</p>
                                </div>
                            ) : (
                                batches
                                    .filter(b => selectedBatches.includes(b.batchCode))
                                    .flatMap(b => b.students || [])
                                    // Double check filtering in the UI map
                                    .filter(email => !alreadyAssigned.includes(email))
                                    .map((email, index) => {
                                        const nameAlias = email.split('@')[0];
                                        return (
                                            <div
                                                key={email + index}
                                                className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100 shadow-sm"
                                            >
                                                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-[10px] 
                                                font-black uppercase">
                                                    {nameAlias[0]}
                                                </div>

                                                <div className="flex-1">
                                                    <p className="text-[11px] font-bold text-slate-700 leading-none truncate">{nameAlias}</p>
                                                    <p className="text-[9px] text-slate-400 truncate">{email}</p>
                                                </div>

                                                <CheckCircle2 size={16} className="text-indigo-600" />
                                            </div>
                                        );
                                    })
                            )}
                        </div>
                    </section>
                </div>

                {/* Footer Action */}
                <div className="p-8 bg-slate-50 border-t border-slate-100">
                    <button
                        disabled={sharing || selectedStudents.length === 0}
                        onClick={handleShare}
                        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-sm uppercase flex items-center  cursor-pointer
                        justify-center gap-3 hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {sharing ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                        {sharing ? "Processing..." : "Confirm Distribution"}
                    </button>
                </div>
            </div>
        </div>
    );
}