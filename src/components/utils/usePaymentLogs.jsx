// impoort hooks
import { useState, useCallback } from "react";

// import toast
import toast from "react-hot-toast";

// aws url for logs
const LOGS_API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/logs";

// usepayment logs
export function usePaymentLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [posting, setPosting] = useState(false);

    // Fetch all logs
    const fetchLogs = useCallback(async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("admin_payment_token");

            const response = await fetch(`${LOGS_API_URL}?action=getLogs`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
            });

            if (!response.ok) {
                throw new Error(`Failed to fetch logs (Status: ${response.status})`);
            }

            const data = await response.json();
            setLogs(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Fetch Logs Error:", err);
            toast.error(err.message || "Failed to load audit logs.");
        } finally {
            setLoading(false);
        }
    }, []);

    // Dispatch a new log entry
    const logAction = useCallback(async ({ action, adminName, target, type }) => {
        try {
            setPosting(true);
            const token = localStorage.getItem("admin_payment_token");

            const payload = {
                action,              // e.g., "SENT_REMINDER"
                adminName,           // e.g., "Garv Aggarwal"
                target,              // Description of what was modified/acted upon
                type: type || "INFO" // Category: INFO, WARNING, SUCCESS, ERROR
            };

            const response = await fetch(`${LOGS_API_URL}?action=addLog`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token ? `Bearer ${token}` : "",
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || `Failed to record log (Status: ${response.status})`);
            }

            const newLog = await response.json();

            // Prepend the new log locally for real-time updates
            setLogs((prev) => [newLog, ...prev]);
            return newLog;
        } catch (err) {
            console.error("Log Dispatch Error:", err);
            toast.error(err.message || "Failed to persist log entry.");
            throw err;
        } finally {
            setPosting(false);
        }
    }, []);

    return { logs, loading, posting, fetchLogs, logAction };
}