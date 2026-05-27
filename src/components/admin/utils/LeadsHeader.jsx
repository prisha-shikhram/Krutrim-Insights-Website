// import icons
import { Search, Filter, Download } from "lucide-react";

// leads header component
export default function LeadsHeader({
    searchTerm, setSearchTerm, showCollegeFilter = false, selectedCollege, setSelectedCollege, colleges = [], collegeStats = {}, onExport
}) {
    return (
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-6 rounded-4xl border border-gray-100 shadow-sm">
            <div className="flex flex-1 gap-4 max-w-2xl">
                {/* SEARCH */}
                <div className="relative flex-1">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                        size={18}
                    />

                    <input
                        type="text"
                        placeholder="Search name, email, roll..."
                        className="w-full pl-12 pr-4 py-3 bg-gray-50 rounded-2xl text-sm outline-none focus:ring-2 ring-[#0189c720]"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                {/* COLLEGE FILTER */}
                {showCollegeFilter && (
                    <div className="relative min-w-55">
                        <Filter
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            size={16}
                        />

                        <select
                            value={selectedCollege}
                            onChange={(e) => setSelectedCollege(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-gray-50 rounded-2xl text-sm outline-none appearance-none cursor-pointer"
                        >
                            {colleges.map((c) => (
                                <option
                                    key={c}
                                    value={c}
                                >
                                    {c}{" "}
                                    {c !== "All Colleges" &&
                                        `(${collegeStats?.[c] || 0})`}
                                </option>
                            ))}
                        </select>
                    </div>
                )}
            </div>

            {/* EXPORT */}
            <button
                onClick={onExport}
                className="flex items-center gap-2 px-6 py-3 bg-[#0189c7] text-white rounded-2xl text-sm font-bold hover:opacity-90 cursor-pointer"
            >
                <Download size={18} />
                Export All
            </button>
        </div>
    );
}