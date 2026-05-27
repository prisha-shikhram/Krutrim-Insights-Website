// import toast
import toast, { Toaster } from "react-hot-toast";

// import toast styles
import { toastStyles } from "./toastStyles";

// validation error component
export function showValidationErrors(errs) {
    const count = Object.keys(errs).length;
    const firstMsg = Object.values(errs)[0];

    toast.error(
        count === 1
            ? firstMsg
            : `${firstMsg} (+${count - 1} more issue${count > 2 ? "s" : ""})`,
        { ...toastStyles.error, duration: 5000 }
    );
}