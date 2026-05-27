// status badge component
export default function StatusBadge({ year }) {
    return (
        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[11px] font-black border border-blue-100">
            CLASS OF {year}
        </span>
    );
}