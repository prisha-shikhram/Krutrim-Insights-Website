// import icons
import { IndianRupee, Calendar, ChevronDown, CreditCard, Plus, Trash2, Clock, Save, CheckCircle2, ShieldCheck } from "lucide-react";

// structure form component
export default function StructureForm({
    handleSaveStructure, structure, handleFieldChange, addInstallment, calculateDelayMetrics, triggerDeleteModal,
    handleInstallmentChange, loading, unallocatedAmount
}) {
    return (
        <form
            onSubmit={handleSaveStructure}
            className="space-y-6"
        >
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
    )
}