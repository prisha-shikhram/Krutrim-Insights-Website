// import components
import { FieldError } from "./FieldError";

// import icons
import { CreditCard, Calendar, Hash, IndianRupee, Layers, UserCheck, ChevronDown, FileText, Plus, Trash2, Calculator, AlertCircle } from "lucide-react";

export default function PaymentStructureSection({ sectionTitleCls, PRIMARY, labelCls, labelStyle, inputCls, errors, formData, selectCls, fp, setFormData }) {
    // Dynamic Installment Handlers
    const installments = formData.installments || [{ id: Date.now(), amount: "", dueDate: "" }];

    // add installment node
    const addInstallmentNode = () => {
        const next = [...installments, { id: Date.now() + Math.random(), amount: "", dueDate: "" }];
        setFormData(prev => ({
            ...prev,
            installments: next,
            numberOfInstallments: String(next.length)
        }));
    };

    // remove installment node
    const removeInstallmentNode = (id) => {
        if (installments.length <= 1) return;
        const next = installments.filter(ins => ins.id !== id);
        setFormData(prev => ({
            ...prev,
            installments: next,
            numberOfInstallments: String(next.length)
        }));
    };

    // update installment
    const updateInstallmentField = (id, field, value) => {
        const next = installments.map(ins => ins.id === id ? { ...ins, [field]: value } : ins);
        setFormData(prev => ({ ...prev, installments: next }));
    };

    // Live Math Summary Metrics
    const totalAgreed = Number(formData.totalFeeAgreed) || 0;
    const regFee = Number(formData.registrationFees) || 0;
    const netTargetBalance = Math.max(0, totalAgreed - regFee);

    // total sum
    const totalInstallmentsSum = installments.reduce(
        (sum, item) => sum + (Number(item.amount) || 0),
        0
    );
    // unallocated sum
    const unallocatedBalance = netTargetBalance - totalInstallmentsSum;

    return (
        <section className="space-y-6">
            <h2 className={sectionTitleCls} style={{ color: PRIMARY }}>
                <CreditCard size={20} /> Payment Structure
            </h2>

            {/* TOP PRIMARY PARAMETERS GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Batch Enrolled In */}
                <div>
                    <label className={labelCls} style={labelStyle("batchEnrolledIn")}>
                        Batch Code (Enrolled In)
                    </label>

                    <div className="relative">
                        <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("batchEnrolledIn")}
                            required
                            className={inputCls}
                            placeholder="e.g. KRUT-2026-ABCD-123"
                            value={formData.batchEnrolledIn || ""}
                        />
                    </div>

                    <FieldError msg={errors.batchEnrolledIn} />
                </div>

                {/* Enrollment Date */}
                <div>
                    <label className={labelCls} style={labelStyle("enrollmentDate")}>
                        Enrollment Date
                    </label>

                    <div className="relative">
                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("enrollmentDate")}
                            type="date"
                            required
                            className={inputCls}
                            value={formData.enrollmentDate || ""}
                        />
                    </div>

                    <FieldError msg={errors.enrollmentDate} />
                </div>

                {/* Total Fee Amount Agreed */}
                <div>
                    <label className={labelCls} style={labelStyle("totalFeeAgreed")}>
                        Total Fee Amount Agreed (₹)
                    </label>

                    <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("totalFeeAgreed")}
                            type="number"
                            required
                            className={inputCls}
                            placeholder="e.g. 50000"
                            value={formData.totalFeeAgreed || ""}
                        />
                    </div>

                    <FieldError msg={errors.totalFeeAgreed} />
                </div>

                {/* Registration Fees */}
                <div>
                    <label className={labelCls} style={labelStyle("registrationFees")}>
                        Registration Fees (₹)
                    </label>

                    <div className="relative">
                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <input
                            {...fp("registrationFees")}
                            type="number"
                            required
                            className={inputCls}
                            placeholder="e.g. 5000"
                            value={formData.registrationFees || ""}
                        />
                    </div>

                    <FieldError msg={errors.registrationFees} />
                </div>

                {/* Assigned Counsellor (Moved to Left of Payment Plan) */}
                <div>
                    <label className={labelCls} style={labelStyle("assignedCounsellor")}>
                        Assigned Counsellor
                    </label>

                    <div className="relative select-group">
                        <UserCheck className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />

                        <select
                            {...fp("assignedCounsellor")}
                            className={selectCls}
                            required
                            value={formData.assignedCounsellor || ""}
                        >
                            <option value="">Select Assigned Counsellor</option>
                            <option value="Garv Aggarwal">Garv Aggarwal</option>
                            <option value="Pooja Gupta">Pooja Gupta</option>
                        </select>

                        <ChevronDown
                            size={16}
                            className="select-chevron absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none transition-transform duration-200"
                        />
                    </div>

                    <FieldError msg={errors.assignedCounsellor} />
                </div>
            </div>

            {/* DYNAMIC INSTALLMENT SCHEDULE MATRIX SECTION */}
            <div className="mt-8 pt-6 border-t border-gray-100 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                            <Layers size={16} style={{ color: PRIMARY }} /> Installment Schedule Allocation
                        </h3>

                        <p className="text-xs text-slate-400 mt-0.5">
                            Add custom installment nodes until total target fees balance is fully satisfied.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={addInstallmentNode}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer 
                        border shadow-sm self-start sm:self-auto"
                        style={{
                            backgroundColor: `${PRIMARY}0d`,
                            color: PRIMARY,
                            borderColor: `${PRIMARY}33`
                        }}
                    >
                        <Plus size={14} /> Add Installment Field
                    </button>
                </div>

                {/* BALANCE RECONCILIATION SUMMARY BAR */}
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                        <Calculator size={16} className="text-slate-400" />
                        <span>Net Installment Target: <strong>₹{netTargetBalance.toLocaleString("en-IN")}</strong></span>
                    </div>

                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                        <span>Allocated: <strong>₹{totalInstallmentsSum.toLocaleString("en-IN")}</strong></span>
                    </div>

                    <div className={`flex items-center gap-1.5 font-bold px-3 py-1 rounded-lg border ${unallocatedBalance === 0
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : unallocatedBalance < 0
                            ? "bg-rose-50 text-rose-700 border-rose-200"
                            : "bg-amber-50 text-amber-700 border-amber-200"
                        }`}>
                        <AlertCircle size={14} />

                        <span>
                            {unallocatedBalance === 0
                                ? "Fees Balance Satisfied"
                                : unallocatedBalance < 0
                                    ? `Over-allocated by ₹${Math.abs(unallocatedBalance).toLocaleString("en-IN")}`
                                    : `Unallocated: ₹${unallocatedBalance.toLocaleString("en-IN")}`}
                        </span>
                    </div>
                </div>

                {/* DYNAMIC INSTALLMENT ROW FIELDS */}
                <div className="space-y-4">
                    {installments.map((ins, index) => (
                        <div
                            key={ins.id}
                            className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row items-stretch 
                            md:items-center gap-4 relative group"
                        >
                            <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 shrink-0 w-24">
                                Installment #{index + 1}
                            </span>

                            {/* Amount Input */}
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Installment Amount (₹) *
                                </label>

                                <div className="relative">
                                    <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

                                    <input
                                        required
                                        placeholder="e.g. 15000"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm outline-none 
                                        focus:border-[#0189c7] transition-all"
                                        value={ins.amount}
                                        onChange={(e) => updateInstallmentField(ins.id, "amount", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Due Date Input */}
                            <div className="flex-1">
                                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                                    Due Date *
                                </label>

                                <div className="relative">
                                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />

                                    <input
                                        type="date"
                                        required
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-sm outline-none 
                                        focus:border-[#0189c7] transition-all"
                                        value={ins.dueDate}
                                        onChange={(e) => updateInstallmentField(ins.id, "dueDate", e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* Remove Node Button */}
                            {installments.length > 1 && (
                                <button
                                    type="button"
                                    onClick={() => removeInstallmentNode(ins.id)}
                                    className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all self-end 
                                    md:self-center cursor-pointer mt-2 md:mt-4"
                                    title="Remove row"
                                >
                                    <Trash2 size={18} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}