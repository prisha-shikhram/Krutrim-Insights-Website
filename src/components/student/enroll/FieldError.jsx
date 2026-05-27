// import icons
import { AlertCircle } from "lucide-react";

// field error component
export function FieldError({ msg }) {
    if (!msg) return null;

    return (
        <p className="flex items-center gap-1 text-red-500 text-[11px] mt-1.5 ml-1 font-medium">
            <AlertCircle size={11} />
            {msg}
        </p>
    );
}