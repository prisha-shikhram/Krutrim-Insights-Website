// import hooks
import { useState, useMemo } from "react";

// import icons
import { X, Loader2, Check, Send } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// share project modal
export default function ShareProjectModal({ project, batches, onClose, refresh }) {
    const [selectedBatches, setSelectedBatches] = useState([]);
    const [selectedStudents, setSelectedStudents] = useState([]);
    const [sharing, setSharing] = useState(false);

    // Filter logic: Only show batches not fully shared yet
    const filteredBatches = useMemo(() => {
        return batches.filter(b => !project.sharedBatches?.includes(b.batchCode));
    }, [batches, project]);

    // UI Logic: All students from "Available Batches" to be shown in the list
    const allAvailableStudents = useMemo(() => {
        const students = [];
        filteredBatches.forEach(batch => {
            batch.students.forEach(email => {
                // Only include if not already shared individually
                if (!project.sharedStudents?.includes(email)) {
                    students.push({ email, batchCode: batch.batchCode });
                }
            });
        });
        return students;
    }, [filteredBatches, project.sharedStudents]);

    // toggle batches
    const toggleBatch = (batch) => {
        const batchCode = batch.batchCode;
        const batchStudents = batch.students.filter(s => !project.sharedStudents?.includes(s));

        if (selectedBatches.includes(batchCode)) {
            // Remove batch and its students
            setSelectedBatches(prev => prev.filter(b => b !== batchCode));
            setSelectedStudents(prev => prev.filter(email => !batchStudents.includes(email)));
        } else {
            // Add batch and all its eligible students
            setSelectedBatches(prev => [...prev, batchCode]);
            setSelectedStudents(prev => [...new Set([...prev, ...batchStudents])]);
        }
    };

    // toggle submission
    const toggleStudent = (email) => {
        setSelectedStudents(prev =>
            prev.includes(email) ? prev.filter(s => s !== email) : [...prev, email]
        );
    };

    // handle share
    const handleShare = async () => {
        setSharing(true);
        try {
            const batchesToStore = [];
            const individualStudentsToStore = [...selectedStudents];

            // Core Logic: Check every batch to see if it's "Complete" in the selection
            batches.forEach(batch => {
                const batchStudents = batch.students.filter(s => !project.sharedStudents?.includes(s));
                if (batchStudents.length === 0) return;

                const isEveryStudentSelected = batchStudents.every(s => selectedStudents.includes(s));

                if (isEveryStudentSelected) {
                    batchesToStore.push(batch.batchCode);
                    // Remove these students from individual list so they aren't stored twice
                    batchStudents.forEach(s => {
                        const idx = individualStudentsToStore.indexOf(s);
                        if (idx > -1) individualStudentsToStore.splice(idx, 1);
                    });
                }
            });

            await fetch("https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/projects", {
                method: "POST",
                body: JSON.stringify({
                    action: "shareProject",
                    projectId: project.projectId,
                    sharedBatches: batchesToStore,
                    sharedStudents: individualStudentsToStore
                })
            });

            toast.success("Project shared successfully");
            refresh();
            onClose();
        } catch (err) {
            toast.error("Sharing failed");
        } finally {
            setSharing(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
            <div className="bg-white w-full max-w-2xl rounded-[3rem] overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-xl font-black text-slate-800 uppercase">Share Project</h3>

                    <button
                        onClick={onClose}
                        className="cursor-pointer text-slate-400 hover:text-slate-600"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto space-y-8">
                    {/* BATCH SELECTION */}
                    <section>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">Select Entire Batches</label>

                        <div className="flex flex-wrap gap-2">
                            {filteredBatches.map(b => (
                                <button
                                    key={b.batchCode}
                                    onClick={() => toggleBatch(b)}
                                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer 
                                    ${selectedBatches.includes(b.batchCode) ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-slate-500 border-slate-100 hover:border-indigo-200"}`}
                                >
                                    {b.batchName || b.batchCode}
                                </button>
                            ))}
                        </div>
                    </section>

                    {/* STUDENT SELECTION */}
                    <section>
                        <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-4">
                            Individual Students ({selectedStudents.length})
                        </label>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-3xl max-h-72 overflow-y-auto border border-slate-100">
                            {allAvailableStudents.map(({ email, batchCode }) => (
                                <div
                                    key={email}
                                    onClick={() => toggleStudent(email)}
                                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer group 
                                    ${selectedStudents.includes(email) ? "bg-white border-indigo-200 shadow-sm"
                                            : "bg-transparent border-transparent hover:bg-white/50"}`}
                                >
                                    <div className="flex flex-col min-w-0">
                                        <span className={`text-[10px] font-bold truncate ${selectedStudents.includes(email) ? "text-indigo-600" : "text-slate-600"}`}>
                                            {email}
                                        </span>

                                        <span className="text-[8px] uppercase text-slate-400 font-bold">{batchCode}</span>
                                    </div>

                                    <div
                                        className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors 
                                        ${selectedStudents.includes(email) ? "bg-indigo-600 border-indigo-600"
                                                : "bg-white border-slate-200 group-hover:border-indigo-300"}`}
                                    >
                                        {selectedStudents.includes(email) && <Check size={12} className="text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                <div className="p-8 bg-slate-50 border-t border-slate-100">
                    <button
                        onClick={handleShare}
                        disabled={sharing || selectedStudents.length === 0}
                        className="w-full py-4 bg-indigo-600 disabled:bg-slate-300 text-white cursor-pointer rounded-2xl font-black uppercase text-xs 
                        flex items-center justify-center gap-2 transition-all hover:bg-indigo-700"
                    >
                        {sharing ? <Loader2 className="animate-spin" /> : <Send size={16} />} Distribute Project
                    </button>
                </div>
            </div>
        </div>
    );
}