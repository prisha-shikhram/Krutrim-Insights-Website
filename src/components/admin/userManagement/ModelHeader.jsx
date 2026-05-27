// import icons
import { X, Shield } from "lucide-react";

// model header component for user management
export default function ModelHeader({ isEditing, setShowAddModal }) {
    return (
        <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-[#0189c7]">
                    <Shield size={20} />
                </div>

                <h4 className="font-bold text-gray-800 text-lg">{isEditing ? 'Update Permissions' : 'Grant New Access'}</h4>
            </div>

            <button
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-white rounded-full transition-colors cursor-pointer"
            >
                <X size={20} className="text-gray-400" />
            </button>
        </div>
    )
}