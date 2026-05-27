// visual anchor for page headers
export default function VisualAnchor() {
    return (
        <div className="mt-10 flex justify-center gap-1.5">
            <div className="h-1 w-12 rounded-full bg-[#0189c7]" />
            <div className="h-1 w-3 rounded-full bg-[#0189c7]/40" />
            <div className="h-1 w-1 rounded-full bg-[#0189c7]/20" />
        </div>
    )
}