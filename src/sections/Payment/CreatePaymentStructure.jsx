// import hooks
import { useState, useEffect, useRef } from "react";

// import toast
import toast from "react-hot-toast";

// import custom logs hook
import { usePaymentLogs } from "../../components/utils/usePaymentLogs";

// import components
import StructureHeader from "../../components/payment/structure/StructureHeader";
import StructureTracking from "../../components/payment/structure/StructureTracking";
import StructureForm from "../../components/payment/structure/StructureForm";
import StructureDelete from "../../components/payment/structure/StructureDelete";

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
            <StructureHeader
                onBack={onBack}
                student={student}
            />

            {/* LIVE FINANCIAL TRACKING HUD COCKPIT */}
            <StructureTracking
                allocatedInstallmentsSum={allocatedInstallmentsSum}
                remainingBalance={remainingBalance}
                unallocatedAmount={unallocatedAmount}
            />

            {/* form container */}
            <StructureForm
                addInstallment={addInstallment}
                calculateDelayMetrics={calculateDelayMetrics}
                handleFieldChange={handleFieldChange}
                handleInstallmentChange={handleInstallmentChange}
                handleSaveStructure={handleSaveStructure}
                loading={loading}
                structure={structure}
                triggerDeleteModal={triggerDeleteModal}
                unallocatedAmount={unallocatedAmount}
            />

            {/* CUSTOM DELETION MODAL OVERLAY */}
            {deleteModal.isOpen && (
                <StructureDelete
                    confirmDeletion={confirmDeletion}
                    deleteModal={deleteModal}
                    setDeleteModal={setDeleteModal}
                />
            )}
        </div>
    );
}