// import hooks
import { useState, useEffect } from "react";

// import icons
import { Calendar, CheckCircle2, Clock, AlertCircle, Send, Loader2, Mail } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import custom logs hook
import { usePaymentLogs } from "../../components/utils/usePaymentLogs";

// import components
import RemindersHeader from "../../components/payment/reminders/RemindersHeader";

// payment reminder
export default function PaymentReminders() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [sendingId, setSendingId] = useState(null);
    const [reminderRecords, setReminderRecords] = useState([]);

    const { logAction } = usePaymentLogs();

    const REMINDERS_API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/reminders";

    // FETCH PENDING REMINDERS LAYER
    const fetchRemindersQueue = async () => {
        try {
            setLoading(true);
            const activeAuthToken = localStorage.getItem("admin_payment_token");

            // Appending action=reminders path filter condition matching the AWS lambda router
            const targetUrl = `${REMINDERS_API_URL}?action=reminders`;

            const response = await fetch(targetUrl, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": activeAuthToken ? `Bearer ${activeAuthToken}` : ""
                }
            });

            if (!response.ok) {
                throw new Error(`AWS Gateway Exception: Status ${response.status}`);
            }

            const data = await response.json();
            setReminderRecords(data);
        } catch (err) {
            console.error("API Fetch Error:", err);
            toast.error(err.message || "Failed to sync reminders queue from cloud runtime.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRemindersQueue();
    }, []);

    // DISPATCH TRANSACTION MAIL LAYER (POST)
    const handleSendReminder = async (record) => {
        // Unique composite index target key to isolate loading states on multi-row installments
        const uniqueTargetId = `${record.email}_${record.installmentId}`;
        setSendingId(uniqueTargetId);

        const tid = toast.loading(`Dispatching SES notification email to ${record.name}...`);

        try {
            const activeAuthToken = localStorage.getItem("admin_payment_token");
            const adminName = localStorage.getItem("admin_payment_name") || "Admin User";
            const targetUrl = `${REMINDERS_API_URL}?action=sendReminder`;

            const finalPayload = {
                email: record.email,
                installmentId: String(record.installmentId),
                amount: String(record.amount),
                dueDate: record.dueDate,
                name: record.name
            };

            const response = await fetch(targetUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": activeAuthToken ? `Bearer ${activeAuthToken}` : ""
                },
                body: JSON.stringify(finalPayload)
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.error || `Server Exception Status: ${response.status}`);
            }

            // Inline local mutation updating row UI flags & incrementing manual count instantly
            setReminderRecords(prev => prev.map(item => {
                if (item.email === record.email && item.installmentId === record.installmentId) {
                    return {
                        ...item,
                        status: "Sent",
                        isMailsSent: true,
                        manualRemindersSentCount: (item.manualRemindersSentCount || 0) + 1
                    };
                }
                return item;
            }));

            // --- AUDIT LOG DISPATCH ---
            await logAction({
                action: "REMINDER_SENT",
                adminName: adminName,
                target: `Dispatched manual payment reminder to ${record.name} (${record.email}) for Installment #${record.installmentId} (Amount: ₹${Number(record.amount).toLocaleString("en-IN")}, Due: ${record.dueDate})`,
                type: "INFO"
            });

            toast.success(`Reminder notification email delivered successfully!`, { id: tid });
        } catch (err) {
            console.error("Transmission Error:", err);
            toast.error(err.message || "Failed to execute automated SES routing transaction.", { id: tid });
        } finally {
            setSendingId(null);
        }
    };

    // Filter array records based on active string queries
    const filteredReminders = reminderRecords.filter(record =>
        record.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 p-1">
            {/* ACTION SEARCH PANEL HEADER */}
            <RemindersHeader
                filteredReminders={filteredReminders}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* REMINDERS INTERFACE GRID COMPONENT */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col mb-6">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                        Systemic Communication Center
                    </h3>

                    <p className="text-slate-400 text-xs font-medium">
                        Orchestrate multi-channel student balance payment reminders and monitor transmission receipt flags.
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-6 py-3">Student</th>
                                <th className="px-6 py-3">Amount Due</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Mails Sent</th>
                                <th className="px-6 py-3">Reminder Status</th>
                                <th className="px-6 py-3 text-right">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600">
                            {loading ? (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-20 text-center text-gray-400 italic"
                                    >
                                        Loading systemic transmission matrices...
                                    </td>
                                </tr>
                            ) : filteredReminders.length > 0 ? (
                                filteredReminders.map((record, idx) => {
                                    const recordUniqueId = `${record.email}_${record.installmentId}`;
                                    const autoCount = record.autoRemindersSentCount || 0;
                                    const manualCount = record.manualRemindersSentCount || 0;

                                    return (
                                        <tr
                                            key={idx}
                                            className="bg-white shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                                        >
                                            {/* STUDENT METADATA TARGETS */}
                                            <td className="px-6 py-4 rounded-l-xl border-y border-l border-gray-50">
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex 
                                                        items-center justify-center font-bold text-slate-700 text-xs shrink-0"
                                                    >
                                                        {record.name ? record.name.split(" ").map(n => n[0]).join("") : "R"}
                                                    </div>

                                                    <div>
                                                        <p className="font-semibold text-gray-800 text-sm">
                                                            {record.name}
                                                        </p>

                                                        <p className="text-[11px] text-gray-400">
                                                            {record.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            {/* TARGET FEE QUANTUM */}
                                            <td className="px-6 py-4 font-bold text-slate-800 text-sm tracking-tight border-y border-gray-50">
                                                ₹{Number(record.amount).toLocaleString("en-IN")}
                                            </td>

                                            {/* CRITICAL TIMELINE TARGET DATE */}
                                            <td className="px-6 py-4 text-gray-400 text-xs font-medium tabular-nums border-y border-gray-50 truncate">
                                                <div className="flex items-center gap-1.5 text-slate-500">
                                                    <Calendar size={13} className="text-slate-400" />

                                                    {record.dueDate ? (
                                                        new Date(record.dueDate).toLocaleDateString("en-GB", {
                                                            day: "2-digit",
                                                            month: "short",
                                                            year: "numeric"
                                                        })
                                                    ) : "—"}
                                                </div>
                                            </td>

                                            {/* DISPATCH COUNTS: AUTO & MANUAL */}
                                            <td className="px-6 py-4 border-y border-gray-50">
                                                <div className="flex items-center gap-1.5 text-xs font-semibold">
                                                    <span
                                                        title="Automated daily cron reminders sent"
                                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-100 text-slate-700 
                                                        border border-slate-200 text-[11px]"
                                                    >
                                                        <Mail size={11} className="text-slate-400" />
                                                        Auto: <strong className="text-slate-900">{autoCount}</strong>
                                                    </span>

                                                    <span
                                                        title="Manual admin reminders sent"
                                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-[#0189c7] 
                                                        border border-blue-100 text-[11px]"
                                                    >
                                                        <Send size={10} className="text-[#0189c7]" />
                                                        Manual: <strong className="text-blue-900">{manualCount}</strong>
                                                    </span>
                                                </div>
                                            </td>

                                            {/* STATUS BADGE */}
                                            <td className="px-6 py-4 border-y border-gray-50">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[10px] font-extrabold 
                                                    border uppercase tracking-wider 
                                                    ${record.status === "Sent"
                                                            ? "bg-emerald-50 border-emerald-100 text-emerald-600"
                                                            : record.status === "Overdue"
                                                                ? "bg-rose-50 border-rose-100 text-rose-600"
                                                                : record.status === "Urgent"
                                                                    ? "bg-amber-50 border-amber-100 text-amber-600"
                                                                    : "bg-blue-50 border-blue-100 text-[#0189c7]"
                                                        }`}
                                                >
                                                    {record.status === "Sent" && <CheckCircle2 size={10} />}
                                                    {record.status === "Overdue" && <AlertCircle size={10} />}
                                                    {record.status === "Standard" && <Clock size={10} />}
                                                    {record.status}
                                                </span>
                                            </td>

                                            {/* ACTION BUTTON */}
                                            <td className="px-6 py-4 text-right rounded-r-xl border-y border-r border-gray-50 truncate">
                                                <button
                                                    onClick={() => handleSendReminder(record)}
                                                    disabled={sendingId === recordUniqueId}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border 
                                                    transition-all cursor-pointer shadow-sm active:scale-95 
                                                        ${record.isMailsSent
                                                            ? "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100 hover:border-emerald-300"
                                                            : "bg-white text-slate-700 border-slate-200 hover:bg-[#0189c7] hover:text-white hover:border-[#0189c7] disabled:opacity-50"
                                                        }`}
                                                >
                                                    {sendingId === recordUniqueId ? (
                                                        <>
                                                            <Loader2 size={12} className="animate-spin" />
                                                            Sending...
                                                        </>
                                                    ) : record.isMailsSent ? (
                                                        <>
                                                            <CheckCircle2 size={12} />
                                                            Send Again
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Send size={12} />
                                                            Send Reminder
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="py-20 text-center text-gray-400 italic"
                                    >
                                        No pending reminder processing queues located.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}