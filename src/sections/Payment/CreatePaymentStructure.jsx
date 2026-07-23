// import hooks
import { useState, useEffect, useRef } from "react";

// import icons
import {
    Plus, Trash2, Save, Calendar, IndianRupee, Clock, CheckCircle2, ChevronDown, CreditCard, ShieldCheck, AlertTriangle, Calculator, ArrowLeft
} from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import custom logs hook
import { usePaymentLogs } from "../../components/utils/usePaymentLogs";

// create payment structure
export default function CreatePaymentStructure({
    student = { name: "Rahul Verma", email: "rahul.verma@gmail.com", course: "Full Stack Development" },
    onBack
}) {
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [initialHasStructure, setInitialHasStructure] = useState(false);

    // Reference to hold initial loaded state for field-by-field diff comparison
    const initialStructureRef = useRef(null);

    // Logging hook
    const { logAction } = usePaymentLogs();

    // State to handle custom delete modal overlay
    const [deleteModal, setDeleteModal] = useState({ isOpen: false, targetId: null, index: null });

    // Core payment structure state matrix (registrationDueDate removed)
    const [structure, setStructure] = useState({
        totalFees: "",
        registrationAmount: "",
        registrationIsPaid: "Pending", // "Pending" | "Paid"
        registrationPaidDate: "",
        registrationPaymentMode: "UPI", // "Cash" | "UPI" | "Cheque" | "Other"
        registrationReferenceId: "",
        registrationOtherModeText: "",
        installments: [
            {
                id: Date.now(),
                amount: "",
                dueDate: "",
                paidStatus: "Pending", // Pending | Paid
                paidDate: "",
                modeOfPayment: "UPI", // Cash | UPI | Cheque | Other
                referenceId: "",
                otherModeText: ""
            }
        ]
    });

    // SEPARATED ENDPOINT TOPOLOGY CONFIGURATION
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

                if (isMounted && data) {
                    setInitialHasStructure(Boolean(data.hasStructure));

                    const loadedStructure = {
                        totalFees: data.totalFees || "",
                        registrationAmount: data.registrationAmount || "",
                        registrationIsPaid: data.registrationIsPaid ? "Paid" : "Pending",
                        registrationPaidDate: data.registrationPaidDate || "",
                        registrationPaymentMode: data.registrationPaymentMode || "UPI",
                        registrationReferenceId: data.registrationReferenceId || "",
                        registrationOtherModeText: data.registrationOtherModeText || "",
                        installments: data.installments && data.installments.length > 0
                            ? data.installments.map(ins => ({
                                id: ins.id || (Date.now() + Math.random()),
                                amount: ins.amount || "",
                                dueDate: ins.dueDate || "",
                                paidStatus: ins.paidStatus || "Pending",
                                paidDate: ins.paidDate || "",
                                modeOfPayment: ins.modeOfPayment || "UPI",
                                referenceId: ins.referenceId || "",
                                otherModeText: ins.otherModeText || ""
                            }))
                            : [
                                {
                                    id: Date.now(),
                                    amount: "",
                                    dueDate: "",
                                    paidStatus: "Pending",
                                    paidDate: "",
                                    modeOfPayment: "UPI",
                                    referenceId: "",
                                    otherModeText: ""
                                }
                            ]
                    };

                    setStructure(loadedStructure);
                    // Store deep copy for mutation comparisons on submit
                    initialStructureRef.current = JSON.parse(JSON.stringify(loadedStructure));
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
        setStructure(prev => {
            const updated = { ...prev, [field]: value };
            if (field === "registrationIsPaid" && value === "Pending") {
                updated.registrationPaidDate = "";
                updated.registrationReferenceId = "";
                updated.registrationOtherModeText = "";
            }
            return updated;
        });
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
                    modeOfPayment: "UPI",
                    referenceId: "",
                    otherModeText: ""
                }
            ]
        }));
    };

    // Trigger the custom modal overlay instead of standard browser prompt
    const triggerDeleteModal = (id, index) => {
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
                    updated.referenceId = "";
                    updated.otherModeText = "";
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

        let compareDate = new Date();
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

    // Save and transmit clean computed state schemas to network routing endpoints with automated logging
    const handleSaveStructure = async (e) => {
        e.preventDefault();

        // 1. Mandatory Top-level Checks
        if (!structure.totalFees) {
            toast.error("Total Fees Amount is mandatory.");
            return;
        }

        if (!structure.registrationAmount) {
            toast.error("Registration Amount is mandatory.");
            return;
        }

        // 2. Registration Row Strict Validation if Paid
        if (structure.registrationIsPaid === "Paid") {
            if (!structure.registrationPaidDate) {
                toast.error("Registration Paid Date is mandatory when status is Paid.");
                return;
            }

            if (
                (structure.registrationPaymentMode === "UPI" || structure.registrationPaymentMode === "Cheque") &&
                !structure.registrationReferenceId.trim()
            ) {
                toast.error(
                    `Reference / ${structure.registrationPaymentMode === "Cheque" ? "Cheque Number" : "Transaction ID"} is mandatory for Registration.`
                );
                return;
            }

            if (structure.registrationPaymentMode === "Other" && !structure.registrationOtherModeText.trim()) {
                toast.error("Please specify the mode description for 'Other' on Registration.");
                return;
            }
        }

        // 3. Installments Row Strict Validation
        for (let i = 0; i < structure.installments.length; i++) {
            const ins = structure.installments[i];

            if (!ins.amount || Number(ins.amount) <= 0) {
                toast.error(`Amount is mandatory for Installment #${i + 1}.`);
                return;
            }

            if (!ins.dueDate) {
                toast.error(`Due Date is mandatory for Installment #${i + 1}.`);
                return;
            }

            if (ins.paidStatus === "Paid") {
                if (!ins.paidDate) {
                    toast.error(`Paid Date is mandatory for Installment #${i + 1}.`);
                    return;
                }

                if (
                    (ins.modeOfPayment === "UPI" || ins.modeOfPayment === "Cheque") &&
                    !ins.referenceId.trim()
                ) {
                    toast.error(
                        `Reference / ${ins.modeOfPayment === "Cheque" ? "Cheque Number" : "Transaction ID"} is mandatory for Installment #${i + 1}.`
                    );
                    return;
                }

                if (ins.modeOfPayment === "Other" && !ins.otherModeText.trim()) {
                    toast.error(`Please specify mode description for 'Other' on Installment #${i + 1}.`);
                    return;
                }
            }
        }

        setLoading(true);
        const tid = toast.loading("Syncing structural matrices to AWS runtime...");

        try {
            const activeAuthToken = localStorage.getItem("admin_payment_token");
            const adminName = localStorage.getItem("admin_payment_name") || "Admin User";
            const isRegPaid = structure.registrationIsPaid === "Paid";

            const finalPayload = {
                email: student.email,
                totalFees: String(structure.totalFees),
                registrationAmount: String(structure.registrationAmount),
                registrationIsPaid: isRegPaid,
                registrationPaidDate: isRegPaid ? structure.registrationPaidDate : "",
                registrationPaymentMode: isRegPaid ? structure.registrationPaymentMode : "",
                registrationReferenceId: isRegPaid ? structure.registrationReferenceId : "",
                registrationOtherModeText: isRegPaid ? structure.registrationOtherModeText : "",
                isCreated: true,
                installments: structure.installments.map(ins => {
                    const isInsPaid = ins.paidStatus === "Paid";
                    return {
                        id: String(ins.id),
                        amount: String(ins.amount),
                        dueDate: ins.dueDate,
                        paidStatus: ins.paidStatus,
                        paidDate: isInsPaid ? ins.paidDate : "",
                        modeOfPayment: isInsPaid ? ins.modeOfPayment : "",
                        referenceId: isInsPaid ? ins.referenceId : "",
                        otherModeText: isInsPaid ? ins.otherModeText : ""
                    };
                })
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

            // --- DYNAMODB AUDIT LOGGING ---
            if (!initialHasStructure) {
                // Log First-time Creation
                await logAction({
                    action: "STRUCTURE_CREATED",
                    adminName,
                    target: `Initialized payment structure for student ${student.name} (${student.email}) with Total Fees: ₹${structure.totalFees}`,
                    type: "SUCCESS"
                });
            } else {
                // Determine what changed for modified updates
                const oldData = initialStructureRef.current || {};
                const changes = [];

                if (oldData.totalFees !== structure.totalFees) changes.push(`Total Fees (${oldData.totalFees} -> ${structure.totalFees})`);
                if (oldData.registrationAmount !== structure.registrationAmount) changes.push(`Reg Amount (${oldData.registrationAmount} -> ${structure.registrationAmount})`);
                if (oldData.registrationIsPaid !== structure.registrationIsPaid) changes.push(`Reg Status (${oldData.registrationIsPaid} -> ${structure.registrationIsPaid})`);
                if (oldData.installments?.length !== structure.installments?.length) {
                    changes.push(`Installment count updated (${oldData.installments?.length} -> ${structure.installments?.length})`);
                }

                const changeDescription = changes.length > 0 ? changes.join(", ") : "Updated financial parameters/installments";

                await logAction({
                    action: "STRUCTURE_UPDATED",
                    adminName,
                    target: `Modified payment structure for student ${student.name} (${student.email}): ${changeDescription}`,
                    type: "WARNING"
                });
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
                        Primary Parameters & Registration Setup
                    </h3>

                    {/* ROW 1: TOTAL FEES, REG AMOUNT, REGISTRATION STATUS IN SAME ROW */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-end">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Total Fees Amount *</label>

                            <div className="relative">
                                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                <input
                                    required
                                    placeholder="Total target fees"
                                    value={structure.totalFees}
                                    onChange={(e) => handleFieldChange("totalFees", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl 
                                    text-slate-800 placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Registration Amount *</label>

                            <div className="relative">
                                <IndianRupee className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                <input
                                    required
                                    placeholder="Registration element"
                                    value={structure.registrationAmount}
                                    onChange={(e) => handleFieldChange("registrationAmount", e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl 
                                    text-slate-800 placeholder-slate-400 outline-none text-sm transition-all focus:border-[#0189c7] focus:bg-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Registration Status (isPaid)</label>

                            <div className="relative">
                                <ShieldCheck className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />

                                <select
                                    value={structure.registrationIsPaid}
                                    onChange={(e) => handleFieldChange("registrationIsPaid", e.target.value)}
                                    className={`w-full pl-10 pr-8 py-2.5 border rounded-xl font-bold text-sm outline-none appearance-none transition-all 
                                        ${structure.registrationIsPaid === "Paid"
                                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                                            : "bg-slate-50 border-slate-100 text-slate-700"
                                        }`}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Paid">Paid</option>
                                </select>

                                <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* EXPANDED REGISTRATION DETAILS IF PAID */}
                    {structure.registrationIsPaid === "Paid" && (
                        <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-2xl space-y-4 animate-in fade-in duration-200">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                                        Registration Paid Date *
                                    </label>

                                    <div className="relative">
                                        <Calendar className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" size={16} />
                                        <input
                                            type="date"
                                            value={structure.registrationPaidDate}
                                            onChange={(e) => handleFieldChange("registrationPaidDate", e.target.value)}
                                            className="w-full pl-10 pr-3.5 py-2 bg-white border border-emerald-200 rounded-xl text-slate-800 
                                            text-sm font-semibold outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                                        Payment Mode *
                                    </label>

                                    <div className="relative">
                                        <CreditCard className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" size={16} />

                                        <select
                                            value={structure.registrationPaymentMode}
                                            onChange={(e) => handleFieldChange("registrationPaymentMode", e.target.value)}
                                            className="w-full pl-10 pr-8 py-2 bg-white border border-emerald-200 rounded-xl text-slate-800 
                                            text-sm font-bold outline-none appearance-none focus:border-emerald-500"
                                        >
                                            <option value="Cash">Cash</option>
                                            <option value="UPI">UPI</option>
                                            <option value="Cheque">Cheque</option>
                                            <option value="Other">Other</option>
                                        </select>

                                        <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none" size={16} />
                                    </div>
                                </div>

                                {/* Dynamic Reference Field */}
                                {(structure.registrationPaymentMode === "UPI" || structure.registrationPaymentMode === "Cheque") && (
                                    <div>
                                        <label className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                                            {structure.registrationPaymentMode === "Cheque" ? "Cheque Number *" : "UPI Reference / Txn ID *"}
                                        </label>

                                        <input
                                            type="text"
                                            placeholder={structure.registrationPaymentMode === "Cheque" ? "Enter cheque no." : "Enter txn reference no."}
                                            value={structure.registrationReferenceId}
                                            onChange={(e) => handleFieldChange("registrationReferenceId", e.target.value)}
                                            className="w-full px-3.5 py-2 bg-white border border-emerald-200 rounded-xl text-slate-800 
                                            text-sm font-medium outline-none focus:border-emerald-500"
                                        />
                                    </div>
                                )}

                                {structure.registrationPaymentMode === "Other" && (
                                    <>
                                        <div>
                                            <label className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                                                Describe Payment Mode *
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="e.g. Bank Transfer / NEFT"
                                                value={structure.registrationOtherModeText}
                                                onChange={(e) => handleFieldChange("registrationOtherModeText", e.target.value)}
                                                className="w-full px-3.5 py-2 bg-white border border-emerald-200 rounded-xl text-slate-800 
                                                text-sm font-medium outline-none focus:border-emerald-500"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-[11px] font-bold text-emerald-800 uppercase tracking-wider mb-1.5">
                                                Reference ID (Optional)
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Enter reference no. if available"
                                                value={structure.registrationReferenceId}
                                                onChange={(e) => handleFieldChange("registrationReferenceId", e.target.value)}
                                                className="w-full px-3.5 py-2 bg-white border border-emerald-200 rounded-xl text-slate-800 
                                                text-sm font-medium outline-none focus:border-emerald-500"
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
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
                                    className="p-5 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-5 relative transition-all 
                                    hover:border-slate-200"
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

                                    {/* ROW 1: AMOUNT, DUE DATE, STATUS CLEARANCE */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Amount *</label>

                                            <div className="relative">
                                                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                <input
                                                    required
                                                    placeholder="Installment amount"
                                                    value={ins.amount}
                                                    onChange={(e) => handleInstallmentChange(ins.id, "amount", e.target.value)}
                                                    className="w-full bg-white border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm 
                                                    outline-none focus:border-[#0189c7]"
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-1">
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Due Date *</label>

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
                                            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Status Clearance</label>

                                            <div className="relative">
                                                <ShieldCheck className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />

                                                <select
                                                    value={ins.paidStatus}
                                                    onChange={(e) => handleInstallmentChange(ins.id, "paidStatus", e.target.value)}
                                                    className={`w-full bg-white border rounded-xl pl-9 pr-8 py-2 text-sm font-bold 
                                                    outline-none appearance-none focus:border-[#0189c7] 
                                                    ${ins.paidStatus === "Paid"
                                                            ? "text-emerald-600 bg-emerald-50/50"
                                                            : "text-slate-700"
                                                        }`}
                                                >
                                                    <option value="Pending">Pending</option>
                                                    <option value="Paid">Paid</option>
                                                </select>

                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                                            </div>
                                        </div>
                                    </div>

                                    {/* ROW 2: CONDITIONAL PAID DETAILS FOR INSTALLMENTS */}
                                    {ins.paidStatus === "Paid" && (
                                        <div className="p-3.5 bg-emerald-50/60 border border-emerald-100 rounded-xl space-y-3 animate-in fade-in duration-200">
                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                                <div>
                                                    <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1">
                                                        Paid Date *
                                                    </label>

                                                    <div className="relative">
                                                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" size={14} />

                                                        <input
                                                            type="date"
                                                            value={ins.paidDate}
                                                            onChange={(e) => handleInstallmentChange(ins.id, "paidDate", e.target.value)}
                                                            className="w-full pl-9 pr-3 py-1.5 bg-white border border-emerald-200 rounded-lg text-slate-800 
                                                            text-xs font-semibold outline-none focus:border-emerald-500"
                                                        />
                                                    </div>
                                                </div>

                                                <div>
                                                    <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1">
                                                        Payment Mode *
                                                    </label>

                                                    <div className="relative">
                                                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600" size={14} />

                                                        <select
                                                            value={ins.modeOfPayment}
                                                            onChange={(e) => handleInstallmentChange(ins.id, "modeOfPayment", e.target.value)}
                                                            className="w-full pl-9 pr-7 py-1.5 bg-white border border-emerald-200 rounded-lg text-slate-800 
                                                            text-xs font-bold outline-none appearance-none focus:border-emerald-500"
                                                        >
                                                            <option value="Cash">Cash</option>
                                                            <option value="UPI">UPI</option>
                                                            <option value="Cheque">Cheque</option>
                                                            <option value="Other">Other</option>
                                                        </select>

                                                        <ChevronDown
                                                            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-emerald-600 pointer-events-none"
                                                            size={12}
                                                        />
                                                    </div>
                                                </div>

                                                {/* Dynamic Reference Field */}
                                                {(ins.modeOfPayment === "UPI" || ins.modeOfPayment === "Cheque") && (
                                                    <div>
                                                        <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1">
                                                            {ins.modeOfPayment === "Cheque" ? "Cheque Number *" : "UPI Reference / Txn ID *"}
                                                        </label>

                                                        <input
                                                            type="text"
                                                            placeholder={ins.modeOfPayment === "Cheque" ? "Enter cheque no." : "Enter reference ID"}
                                                            value={ins.referenceId}
                                                            onChange={(e) => handleInstallmentChange(ins.id, "referenceId", e.target.value)}
                                                            className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg 
                                                            text-slate-800 text-xs font-medium outline-none focus:border-emerald-500"
                                                        />
                                                    </div>
                                                )}

                                                {ins.modeOfPayment === "Other" && (
                                                    <>
                                                        <div>
                                                            <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1">
                                                                Describe Mode *
                                                            </label>

                                                            <input
                                                                type="text"
                                                                placeholder="e.g. Bank Transfer"
                                                                value={ins.otherModeText}
                                                                onChange={(e) => handleInstallmentChange(ins.id, "otherModeText", e.target.value)}
                                                                className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg 
                                                                text-slate-800 text-xs font-medium outline-none focus:border-emerald-500"
                                                            />
                                                        </div>

                                                        <div>
                                                            <label className="block text-[10px] font-bold text-emerald-800 uppercase mb-1">
                                                                Reference ID (Optional)
                                                            </label>

                                                            <input
                                                                type="text"
                                                                placeholder="Optional reference"
                                                                value={ins.referenceId}
                                                                onChange={(e) => handleInstallmentChange(ins.id, "referenceId", e.target.value)}
                                                                className="w-full px-3 py-1.5 bg-white border border-emerald-200 rounded-lg 
                                                                text-slate-800 text-xs font-medium outline-none focus:border-emerald-500"
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    )}

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
                            : `Unallocated balance: ₹${Math.abs(unallocatedAmount)}`
                        }
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
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
            )}
        </div>
    );
}