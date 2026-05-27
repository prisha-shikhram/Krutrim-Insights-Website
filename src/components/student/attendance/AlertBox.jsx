// import icons
import { AlertTriangle } from "lucide-react"

// alert box component
export default function AlertBox({ stats }) {
    return (
        <>
            {stats.percentage < 75 && stats.total > 0 && (
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-center gap-4 text-amber-800">
                    <AlertTriangle size={20} className="shrink-0" />

                    <p className="text-xs font-bold uppercase tracking-tight">
                        Warning: Your attendance is below 75%. Please maintain consistency to remain eligible for certification.
                    </p>
                </div>
            )}
        </>
    )
}