// import icons
import { Calculator, CheckCircle2, AlertTriangle } from "lucide-react";

// structure traking component
export default function StructureTracking({ remainingBalance, allocatedInstallmentsSum, unallocatedAmount }) {
    return (
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
    )
}