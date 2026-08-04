// import icons
import { ChevronDown, Filter } from "lucide-react";

// batch filter component
export default function BatchFilter({ selectedBatchFilter, setSelectedBatchFilter, batches, classList }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/80 p-4 rounded-xl border border-slate-200/60">
            <div className="flex items-center gap-2 text-slate-700 text-xs font-bold">
                <Filter size={16} className="text-indigo-600" />
                <span>Filter by Batch:</span>
            </div>

            <div className="relative w-full sm:w-72">
                <select
                    value={selectedBatchFilter}
                    onChange={(e) => setSelectedBatchFilter(e.target.value)}
                    className="w-full appearance-none pl-3.5 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-xs 
                    font-semibold text-slate-800 outline-none focus:border-indigo-500 transition-all cursor-pointer shadow-2xs"
                >
                    <option value="ALL">All Batches ({classList.length} classes)</option>

                    {batches.map((b) => {
                        const count = classList.filter((c) => c.batchCode === b.batchCode).length;

                        return (
                            <option
                                key={b.batchCode || b.id}
                                value={b.batchCode}
                            >
                                {b.batchName} ({count} classes)
                            </option>
                        );
                    })}
                </select>

                <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
            </div>
        </div>
    )
}