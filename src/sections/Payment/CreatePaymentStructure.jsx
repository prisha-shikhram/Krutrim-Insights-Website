// import hooks
import { useState, useEffect } from "react";

// import icons
import { Plus, Trash2, Save, Calendar, DollarSign, Clock, CheckCircle2, ChevronDown, CreditCard, ShieldCheck, AlertTriangle, Calculator, ArrowLeft } from "lucide-react";

// import toast
import toast, { Toaster } from "react-hot-toast";

// create payment structure
export default function CreatePaymentStructure({
    student = { name: "Rahul Verma", email: "rahul.verma@gmail.com", course: "Full Stack Development" },
    onBack
}) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);

    // State to handle custom delete modal overlay
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, targetId: null, index: null });

    // Core payment structure state matrix
    const [structure, setStructure] = useState({
        totalFees: "",
        registrationAmount: "",
        registrationPaidDate: "",
        installments: [
            {
                id: Date.now(),
                amount: "",
                dueDate: "",
                paidStatus: "Pending", // Pending | Paid
                paidDate: "",
                modeOfPayment: "UPI" // UPI | Cash
            }
        ]
    });

    // EPARATED ENDPOINT TOPOLOGY CONFIGURATION
    const FETCH_API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/students";
    const CREATE_API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/create";

    // AUTOMATED DATA LOOKUP RETRIEVAL LAYER (GET)
    useEffect(() => {
        let isMounted = true;

        async function fetchExistingStructure() {
            try {
                setFetching(true);
                const activeAuthToken = localStorage.getItem("admin_payment_token");
                const targetUrl = `${FETCH_API_URL}?email=${encodeURIComponent(student.email)}`;

                const response = await fetch(targetUrl, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": activeAuthToken ? `Bearer ${activeAuthToken}` : ""
                    }
                });

                if (!response.ok) {
                    throw new Error(`AWS Fetch Exception: Status ${response.status}`);
                }

                const data = await response.json();

                // If a structure configuration has already been initialized, map it directly into active state
                if (isMounted && data && data.hasStructure) {
                    setStructure({
                        totalFees: data.totalFees || "",
                        registrationAmount: data.registrationAmount || "",
                        registrationPaidDate: data.registrationPaidDate || "",
                        installments: data.installments && data.installments.length > 0
                            ? data.installments
                            : [
                                {
                                    id: Date.now(),
                                    amount: "",
                                    dueDate: "",
                                    paidStatus: "Pending",
                                    paidDate: "",
                                    modeOfPayment: "UPI"
                                }
                            ]
                    });
                }
            } catch (err) {
                console.error("Failed to parse historical structure fields:", err);
                toast.error("Could not load your previously entered payment metrics.");
            } finally {
                if (isMounted) setFetching(false);
            }
        }

        if (student?.email) {
            fetchExistingStructure();
        } else {
            setFetching(false);
        }

        return () => {
            isMounted = false;
        };
    }, [student.email]);

    // Handle primary top-level registration parameter updates
    const handleFieldChange = (field, value) => {
        setStructure(prev => ({ ...prev, [field]: value }));
    };

    // Append a new milestone structure configuration installment row
    const addInstallment = () => {
        setStructure(prev => ({
            ...prev,
            installments: [
                ...prev.installments,
                {
                    id: Date.now() + Math.random(),
                    amount: "",
                    dueDate: "",
                    paidStatus: "Pending",
                    paidDate: "",
                    modeOfPayment: "UPI"
                }
            ]
        }));
    };

    // Trigger the custom modal overlay instead of standard browser prompt
    const triggerDeleteModal = (id, index) => {
        if (structure.installments.length === 1) {
            toast.error("At least one structural milestone row configuration is required.");
            return;
        }
        setDeleteModal({ isOpen: true, targetId: id, index });
    };

    // Execute deletion from the overlay callback logic
    const confirmDeletion = () => {
        const { targetId, index } = deleteModal;
        setStructure(prev => ({
            ...prev,
            installments: prev.installments.filter(ins => ins.id !== targetId)
        }));
        toast.success(`Installment #${index + 1} removed from structure memory.`);
        setDeleteModal({ isOpen: false, targetId: null, index: null });
    };

    // Modify distinct child parameters inside dynamic installment matrices
    const handleInstallmentChange = (id, field, value) => {
        setStructure(prev => ({
            ...prev,
            installments: prev.installments.map(ins => {
                if (ins.id !== id) return ins;

                let updated = { ...ins, [field]: value };

                if (field === "paidStatus" && value === "Pending") {
                    updated.paidDate = "";
                }
                return updated;
            })
        }));
    };

    // System helper engine calculating historical architectural metrics in real-time
    const calculateDelayMetrics = (dueDateStr, paidDateStr, currentStatus) => {
        if (!dueDateStr) return { wasDelayed: "No", daysDelayed: 0 };

        const due = new Date(dueDateStr);
        due.setHours(0, 0, 0, 0);

        let compareDate = new Date("2026-07-18");
        if (currentStatus === "Paid" && paidDateStr) {
            compareDate = new Date(paidDateStr);
        }
        compareDate.setHours(0, 0, 0, 0);

        const diffTime = compareDate - due;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays > 0) {
            return { wasDelayed: "Yes", daysDelayed: diffDays };
        }
        return { wasDelayed: "No", daysDelayed: 0 };
    };

    // Dynamic Financial Calculations
    const totalFeesNum = Number(structure.totalFees) || 0;
    const registrationAmountNum = Number(structure.registrationAmount) || 0;
    const remainingBalance = Math.max(0, totalFeesNum - registrationAmountNum);

    const allocatedInstallmentsSum = structure.installments.reduce(
        (acc, curr) => acc + (Number(curr.amount) || 0), 0
    );
    const unallocatedAmount = remainingBalance - allocatedInstallmentsSum;

    // Save and transmit clean computed state schemas to network routing endpoints
    const handleSaveStructure = async (e) => {
        e.preventDefault();
        setLoading(true);
        const tid = toast.loading("Syncing structural matrices to AWS runtime...");

        if (registrationAmountNum + allocatedInstallmentsSum !== totalFeesNum) {
            toast.error(
                `Accounting mismatch: Reg (${registrationAmountNum}) + Installments (${allocatedInstallmentsSum}) must equal Total Fees (${totalFeesNum})`,
                { id: tid }
            );
            setLoading(false);
            return;
        }

        try {
            const activeAuthToken = localStorage.getItem("admin_payment_token");

            const finalPayload = {
                email: student.email,
                totalFees: String(structure.totalFees),
                registrationAmount: String(structure.registrationAmount),
                registrationPaidDate: structure.registrationPaidDate,
                isCreated: true,
                installments: structure.installments.map(ins => ({
                    id: String(ins.id),
                    amount: String(ins.amount),
                    dueDate: ins.dueDate,
                    paidStatus: ins.paidStatus,
                    paidDate: ins.paidStatus === "Paid" ? ins.paidDate : "",
                    modeOfPayment: ins.modeOfPayment
                }))
            };

            const response = await fetch(CREATE_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": activeAuthToken ? `Bearer ${activeAuthToken}` : ""
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server Exception Status Code: ${response.status}`);
            }

            toast.success("Payment architecture schema mapped successfully!", { id: tid });

            setTimeout(() => {
                if (onBack) onBack();
            }, 1000);

        } catch (err) {
            console.error("API Submission Error:", err);
            toast.error(err.message || "Cloud synchronization mapping exception occurred.", { id: tid });
        } finally {
            setLoading(false);
        }
    };

    // fetching data state
    if (fetching) {
        return (
            <div className="flex flex-col items-center justify-center py-40 space-y-4 max-w-6xl mx-auto bg-white border border-slate-100 rounded-3xl shadow-sm">
                <div className="w-10 h-10 border-4 border-slate-100 border-t-[#0189c7] rounded-full animate-spin" />
                <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Resolving payment profiles...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-1 max-w-6xl mx-auto relative">
            {/* toast container */}
            <Toaster position="top-center" />

            {/* HEADER INTERFACE FRAME */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#0189c7] bg-blue-50 px-2.5 py-1 rounded-md">
                        {student.course}
                    </span>

                    <h2 className="text-xl font-black text-slate-900 tracking-tight mt-2">
                        Configure Payment Structure: {student.name}
                    </h2>

                    <p className="text-slate-400 text-xs font-medium">{student.email}</p>
                </div>

                {onBack && (
                    <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center gap-2 px-4 py-2 border rounded-xl text-xs font-bold transition-all 
                        hover:bg-slate-50 cursor-pointer self-start sm:self-auto text-slate-600"
                    >
                        <ArrowLeft size={14} /> Back to Module
                    </button>
                )}
            </div>

            {/* LIVE FINANCIAL TRACKING HUD COCKPIT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-blue-50 text-[#0189c7]">
                        <Calculator size={20} />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Fees Target Balance</p>
                        <h4 className="text-lg font-black text-slate-800">₹{remainingBalance.toLocaleString("en-IN")}</h4>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600">
                        <CheckCircle2 size={20} />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Allocated Installments</p>
                        <h4 className="text-lg font-black text-slate-800">₹{allocatedInstallmentsSum.toLocaleString("en-IN")}</h4>
                    </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
                    <div className={`p-3 rounded-xl ${unallocatedAmount === 0 ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                        <AlertTriangle size={20} />
                    </div>

                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Remaining Unallocated</p>
                        <h4 className={`text-lg font-black ${unallocatedAmount === 0 ? "text-emerald-600" : "text-amber-600"}`}>
                            {unallocatedAmount < 0 ? "-" : ""}₹{Math.abs(unallocatedAmount).toLocaleString("en-IN")}
                        </h4>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSaveStructure} className="space-y-6">
                {/* REGISTRATION CORE CONTROLS */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 border-b pb-3 border-slate-50">
                        Primary Parameters & Registration Timeline
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fees Amount</label>

                            <div className="relative">
                                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                <input
                                    required
                                    type="number"
                                    placeholder="Total target fees"
                                    value={structure.totalFees}
                                    onChange={(e) => handleFieldChange("totalFees", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl 
                                    text-slate-800 placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Registration Amount</label>

                            <div className="relative">
                                <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                <input
                                    required
                                    type="number"
                                    placeholder="Registration element"
                                    value={structure.registrationAmount}
                                    onChange={(e) => handleFieldChange("registrationAmount", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl 
                                    text-slate-800 placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Registration Paid Date</label>

                            <div className="relative">
                                <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                <input
                                    required
                                    type="date"
                                    value={structure.registrationPaidDate}
                                    onChange={(e) => handleFieldChange("registrationPaidDate", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl 
                                    text-slate-800 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* ADAPTIVE INSTALLMENT SCHEDULING INTERFACE */}
                <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                    <div className="flex items-center justify-between border-b pb-3 border-slate-50">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">
                            Installment Scheduling Matrix
                        </h3>

                        <button
                            type="button"
                            onClick={addInstallment}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold bg-[#0189c70c] 
                            text-[#0189c7] rounded-xl hover:bg-[#0189c718] transition-all cursor-pointer"
                        >
                            <Plus size={14} /> Add Installment Node
                        </button>
                    </div>

                    <div className="space-y-6">
                        {structure.installments.map((ins, index) => {
                            const liveMetrics = calculateDelayMetrics(ins.dueDate, ins.paidDate, ins.paidStatus);

                            return (
                                <div
                                    key={ins.id}
                                    className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-5 relative transition-all hover:border-slate-200"
                                >
                                    {/* TITLE & DELETION ACTIONS ROW */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-black text-slate-600 uppercase tracking-widest">
                                            Milestone Installment #{index + 1}
                                        </span>

                                        <button
                                            type="button"
                                            onClick={() => triggerDeleteModal(ins.id, index)}
                                            className="text-slate-400 hover:text-rose-500 p-1 rounded-lg transition-colors cursor-pointer"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>

                                    {/* ROW 1: CORE DATA ATTRIBUTES ROW */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount</label>

                                            <div className="relative">
                                                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                <input
                                                    required
                                                    type="number"
                                                    placeholder="Installment amount"
                                                    value={ins.amount}
                                                    onChange={(e) => handleInstallmentChange(ins.id, "amount", e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm 
                                                    outline-none focus:border-[#0189c7]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Due Date</label>

                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                <input
                                                    required
                                                    type="date"
                                                    value={ins.dueDate}
                                                    onChange={(e) => handleInstallmentChange(ins.id, "dueDate", e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm 
                                                    outline-none focus:border-[#0189c7]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Payment Mode</label>

                                            <div className="relative">
                                                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                <select
                                                    value={ins.modeOfPayment}
                                                    onChange={(e) => handleInstallmentChange(ins.id, "modeOfPayment", e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm 
                                                    outline-none appearance-none focus:border-[#0189c7]"
                                                >
                                                    <option value="UPI">UPI Protocol</option>
                                                    <option value="Cash">Cash Ledger</option>
                                                </select>

                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROW 2: CLEAN CLEARANCE TARGET AND REACTIVE TIMELINE INPUT ROW */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 border-t border-dashed border-slate-200 items-end">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status Clearance</label>

                                            <div className="relative">
                                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                <select
                                                    value={ins.paidStatus}
                                                    onChange={(e) => handleInstallmentChange(ins.id, "paidStatus", e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-sm 
                                                    outline-none appearance-none focus:border-[#0189c7]"
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Paid">Paid</option>
                                                </select>

                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                            </div>
                                        </div>

                                        {/* Dynamic Paid Date Input Box */}
                                        {ins.paidStatus === "Paid" ? (
                                            <div className="space-y-1" style={{ animation: "fadeIn 0.2s ease-out both" }}>
                                                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Paid Date</label>

                                                <div className="relative">
                                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                    <input
                                                        required
                                                        type="date"
                                                        value={ins.paidDate}
                                                        onChange={(e) => handleInstallmentChange(ins.id, "paidDate", e.target.value)}
                                                        className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm 
                                                        outline-none focus:border-[#0189c7]"
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-9.5" />
                                        )}
                                    </div>

                                    {/* REAL-TIME DYNAMIC VISUAL BADGES */}
                                    <div className="absolute top-4 right-16 flex gap-2">
                                        {liveMetrics.wasDelayed === "Yes" && (
                                            <span
                                                className="inline-flex items-center gap-1 text-[9px] font-extrabold bg-red-100 border 
                                                border-red-200 text-red-600 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm"
                                            >
                                                <Clock size={10} /> Computed Delay Flag ({liveMetrics.daysDelayed}d)
                                            </span>
                                        )}
                                        {ins.paidStatus === "Paid" && (
                                            <span
                                                className="inline-flex items-center gap-1 text-[9px] font-extrabold bg-emerald-100 border 
                                                border-emerald-200 text-emerald-600 px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm"
                                            >
                                                <CheckCircle2 size={10} /> Cleared
                                            </span>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* CONTROL ACTION SUBMIT COMPONENT BAR */}
                <div className="bg-white p-4 rounded-3xl border border-gray-100 shadow-sm flex items-center justify-between">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-2">
                        {unallocatedAmount === 0
                            ? "Structure perfectly balanced"
                            : `Allocation skew: Target mismatch by ₹${Math.abs(unallocatedAmount)}`}
                    </div>

                    <button
                        type="submit"
                        disabled={loading || unallocatedAmount !== 0}
                        className="inline-flex cursor-pointer items-center gap-2 px-6 py-3 rounded-xl text-white font-bold text-xs 
                        tracking-widest bg-linear-to-r from-[#0189c7] to-[#00c6ff] shadow-lg shadow-blue-500/20 hover:opacity-90 
                        active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed uppercase"
                    >
                        <Save size={14} /> {loading ? "Syncing..." : "Save & Sync Structure"}
                    </button>
                </div>
            </form>

            {/* CUSTOM DELETION MODAL OVERLAY */}
            {deleteModal.isOpen && (
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
                                Are you sure you want to delete Installment #{deleteModal.index + 1}? This action will change the computed balance allocation variables.
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
            )}
        </div>
    );
}