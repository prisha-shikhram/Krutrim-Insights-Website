// skeleton row for loading state in tables
export default function SkeletonRow() {
    return (
        <tr className="animate-pulse">
            <td className="px-8 py-5"><div className="h-4 w-32 bg-gray-100 rounded" /></td>
            <td className="px-8 py-5"><div className="h-4 w-40 bg-gray-100 rounded" /></td>
            <td className="px-8 py-5"><div className="h-4 w-48 bg-gray-100 rounded" /></td>
            <td className="px-8 py-5"><div className="h-4 w-24 bg-gray-100 rounded" /></td>
            <td className="px-8 py-5"><div className="h-4 w-24 bg-gray-100 rounded ml-auto" /></td>
        </tr>
    )
}