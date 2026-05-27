// import hooks
import { useState, useEffect } from "react";

// import toast
import toast from "react-hot-toast";

// import outlet context
import { useOutletContext } from "react-router-dom";

// api urls
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";
const ATTENDANCE_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/attendance";

// import components
import AttendanceHeader from "../../components/mentor/attendance/AttendanceHeader";
import AttendanceList from "../../components/mentor/attendance/AttendanceList";
import CreateAttendanceModal from "../../components/mentor/attendance/CreateAttendanceModal";

// mentor attendace page
export default function MentorAttendance() {
    const { mentor } = useOutletContext();
    const [batches, setBatches] = useState([]);
    const [attendanceHistory, setAttendanceHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);

    useEffect(() => {
        fetchInitialData();
    }, []);

    // fetch data
    const fetchInitialData = async () => {
        setLoading(true);
        try {
            // 1. Fetch Batches
            const bRes = await fetch(BATCH_API);
            const bData = await bRes.json();
            const actualBatches = Array.isArray(bData) ? bData : (bData.Items || []);
            setBatches(actualBatches);

            // 2. Fetch Attendance List
            const aRes = await fetch(ATTENDANCE_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ action: "listAllAttendance" })
            });

            const aData = await aRes.json();

            const historyArray = Array.isArray(aData) ? aData : (aData.Items || []);
            setAttendanceHistory(historyArray);

        } catch (err) {
            console.error("Fetch Error:", err);
            toast.error("Failed to sync attendance history");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 py-6">
            {/* HEADER */}
            <AttendanceHeader
                setShowCreate={setShowCreate}
            />

            {/* ATTENDANCE LIST TABLE */}
            <AttendanceList
                loading={loading}
                attendanceHistory={attendanceHistory}
                ATTENDANCE_API={ATTENDANCE_API}
            />

            {/* MODAL */}
            {showCreate && (
                <CreateAttendanceModal
                    onClose={() => { setShowCreate(false); fetchInitialData(); }}
                    batches={batches}
                    mentor={mentor}
                    ATTENDANCE_API={ATTENDANCE_API}
                />
            )}
        </div>
    );
}