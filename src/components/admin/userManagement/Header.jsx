// import icons
import { UserPlus } from "lucide-react";

// header component for user management page
export default function Header({ setShowAddModal, setShowMentorModal, PRIMARY, resetForm }) {
    return (
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded-4xl border border-gray-100 shadow-sm gap-4">
            <div>
                <h3 className="text-xl font-bold text-gray-800">Directory Management</h3>
                <p className="text-gray-400 text-sm">Manage administrative and mentoring access</p>
            </div>

            {/* Button Group Container */}
            <div className="flex items-center gap-3">
                {/* Mentor Button */}
                <button
                    onClick={() => setShowMentorModal(true)}
                    className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl 
                    font-semibold text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer shadow-lg shadow-emerald-100"
                >
                    <UserPlus size={18} />
                    Create Mentor
                </button>

                {/* Admin Button */}
                <button
                    onClick={() => { resetForm(); setShowAddModal(true); }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all 
                    hover:scale-105 active:scale-95 cursor-pointer"
                    style={{
                        background: `linear-gradient(135deg, ${PRIMARY}, #00c6ff)`,
                        boxShadow: "0 10px 20px rgba(1,137,199,0.2)"
                    }}
                >
                    <UserPlus size={18} />
                    Create New Admin
                </button>
            </div>
        </div>
    )
}