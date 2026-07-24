// import hooks
import { useState, useEffect } from "react";

// import icons
import { PlusCircle, Edit3, BookOpen } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import components
import CreatePaymentStructure from "./CreatePaymentStructure";
import PaymentModuleHeader from "../../components/payment/module/PaymentModuleHeader";

// payment module
export default function PaymentModule() {
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [students, setStudents] = useState([]);

    // WORKFLOW ROUTING STATES
    const [activeView, setActiveView] = useState("list"); // "list" | "structure"
    const [selectedStudent, setSelectedStudent] = useState(null);

    // API INTEGRATION LAYER WITH AUTHENTICATION
    const fetchStudentSchemas = async () => {
        try {
            setLoading(true);
            const API_URL = "https://pfbizwkb87.execute-api.ap-south-1.amazonaws.com/payment/students";
            const activeAuthToken = localStorage.getItem("admin_payment_token");

            const response = await fetch(API_URL, {
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
            setStudents(data);
        } catch (err) {
            console.error("API Fetch Error:", err);
            toast.error(err.message || "Failed to resolve sync matrices with AWS.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudentSchemas();
    }, []);

    // INTERACTION ACTION HANDLERS
    const handleCreateStructure = (student) => {
        setSelectedStudent({
            name: student.name,
            email: student.email,
            course: student.course
        });
        setActiveView("structure");
    };

    const handleUpdateStructure = (student) => {
        setSelectedStudent({
            name: student.name,
            email: student.email,
            course: student.course
        });
        setActiveView("structure");
    };

    const handleBackToList = () => {
        setActiveView("list");
        setSelectedStudent(null);
        fetchStudentSchemas(); // Hot-reload data changes upon pipeline clearance returns
    };

    // Filter array based on global standard string queries
    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.course?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Contextual Workflow conditional viewport rendering check block
    if (activeView === "structure" && selectedStudent) {
        return (
            <CreatePaymentStructure
                student={selectedStudent}
                onBack={handleBackToList}
            />
        );
    }

    return (
        <div className="space-y-6 p-1">
            {/* ACTION HEADER BAR */}
            <PaymentModuleHeader
                filteredStudents={filteredStudents}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />

            {/* DATA GRID DISPLAY INTERFACE */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
                <div className="flex flex-col mb-6">
                    <h3 className="text-lg font-black text-slate-900 tracking-tight">
                        Payment Architecture Configuration
                    </h3>

                    <p className="text-slate-400 text-xs font-medium">
                        Deploy, manage, and scale micro-payment structured milestone schedules across registered user entities
                    </p>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-separate border-spacing-y-2">
                        <thead className="text-gray-400 text-[10px] uppercase tracking-[2px] font-bold">
                            <tr>
                                <th className="px-6 py-3">Student</th>
                                <th className="px-6 py-3">Enrolled In</th>
                                <th className="px-6 py-3">Enrolled Date</th>
                                <th className="px-6 py-3">Total Course Fee</th>
                                <th className="px-6 py-3 text-right">Structure Actions</th>
                            </tr>
                        </thead>

                        <tbody className="text-sm text-gray-600">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        Synchronizing structural schemas with AWS...
                                    </td>
                                </tr>
                            ) : filteredStudents.length > 0 ? (
                                filteredStudents.map((student, idx) => (
                                    <tr
                                        key={idx}
                                        className="bg-white shadow-sm border border-gray-100 rounded-xl hover:shadow-md transition-all group"
                                    >
                                        {/* STUDENT IDENTIFIER BLOCK */}
                                        <td className="px-6 py-4 rounded-l-xl border-y border-l border-gray-50">
                                            <div className="flex items-center gap-3">
                                                <div
                                                    className="w-9 h-9 rounded-lg bg-slate-50 border border-slate-100 flex items-center 
                                                    justify-center font-bold text-slate-700 text-xs shrink-0"
                                                >
                                                    {student.name ? student.name.split(" ").map(n => n[0]).join("") : "S"}
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-gray-800 text-sm">
                                                        {student.name}
                                                    </p>

                                                    <p className="text-[11px] text-gray-400">
                                                        {student.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        {/* COURSE ENROLLMENT WRAPPER */}
                                        <td className="px-6 py-4 border-y border-gray-50">
                                            <span
                                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold border 
                                                bg-blue-50 border-blue-100 text-[#0189c7] truncate"
                                            >
                                                <BookOpen size={10} /> {student.course || "General Course"}
                                            </span>
                                        </td>

                                        {/* ENROLLED DATE COMPONENT */}
                                        <td className="px-6 py-4 text-gray-400 text-xs font-medium tabular-nums border-y border-gray-50">
                                            {student.enrolledDate ? (
                                                new Date(student.enrolledDate).toLocaleDateString("en-GB", {
                                                    day: "2-digit",
                                                    month: "short",
                                                    year: "numeric"
                                                })
                                            ) : "—"}
                                        </td>

                                        {/* MONETARY MAGNITUDE COMPONENT */}
                                        <td className="px-6 py-4 font-bold text-slate-800 text-sm tracking-tight border-y border-gray-50">
                                            <span className="inline-flex items-center text-slate-700">
                                                {student.totalAmount}
                                            </span>
                                        </td>

                                        {/* DYNAMIC OPERATION LOGIC HOOK */}
                                        <td className="px-6 py-4 text-right rounded-r-xl border-y border-r border-gray-50 truncate">
                                            {!student.hasStructure ? (
                                                <button
                                                    onClick={() => handleCreateStructure(student)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border 
                                                    border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-all cursor-pointer"
                                                >
                                                    <PlusCircle size={12} />
                                                    Create Structure
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUpdateStructure(student)}
                                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-bold rounded-lg border 
                                                    border-amber-200 bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all cursor-pointer"
                                                >
                                                    <Edit3 size={12} />
                                                    Update Structure
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="py-20 text-center text-gray-400 italic">
                                        No matching student matrices resolved.
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