// aws url
const AWS_LOG_URL = "https://m26dwfdo25.execute-api.ap-south-1.amazonaws.com/logs";

// function to record logs
export const recordLog = async (action, target, type = "view") => {
    try {
        const payload = {
            admin: localStorage.getItem("admin_name") || "System",
            action: action, // e.g. "SUBADMIN_CREATED"
            target: target, // e.g. "Rahul Singh"
            type: type      // e.g. "security"
        };

        await fetch(AWS_LOG_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Audit log failed:", error);
    }
};