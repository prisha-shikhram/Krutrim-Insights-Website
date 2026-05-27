// import hooks
import { useState } from "react";
import { useOutletContext } from "react-router-dom";

// import toast
import toast from "react-hot-toast";

// import components
import ProfileBox from "../../components/student/settings/ProfileBox";
import SecurityBox from "../../components/student/settings/SecurityBox";
import SupportBox from "../../components/student/settings/SupportBox";

// student settings page
export default function StudentSettings() {
    // context
    const { student, handleImageUpload } = useOutletContext();

    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);

    // password state
    const [passwords, setPasswords] = useState({
        current: "",
        new: "",
        confirm: ""
    });

    // update password logic
    const handlePasswordUpdate = async (e) => {
        e.preventDefault();
        if (passwords.new !== passwords.confirm) return toast.error("New passwords do not match");
        if (passwords.new.length < 8) return toast.error("Password must be at least 8 characters");

        setLoading(true);
        const tid = toast.loading("Updating security credentials...");

        try {
            const response = await fetch(
                "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/update-password",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("student_token")}`
                    },
                    body: JSON.stringify({
                        email: student.email,
                        oldPassword: passwords.current,
                        newPassword: passwords.new
                    })
                }
            );

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Failed to update password");

            toast.success("Password updated successfully!", { id: tid });
            setPasswords({ current: "", new: "", confirm: "" });
        } catch (err) {
            toast.error(err.message || "Update failed", { id: tid });
        } finally {
            setLoading(false);
        }
    };

    const inputCls = "w-full bg-white/60 border border-white py-3 px-4 rounded-2xl outline-none focus:bg-white focus:border-blue-100 transition-all text-sm shadow-sm";
    const labelCls = "text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1 block";

    return (
        <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
            {/* IDENTITY & SECURITY */}
            <div className="flex flex-col lg:flex-row gap-10 items-stretch">
                {/* PROFILE BOX */}
                <ProfileBox
                    student={student}
                    handleImageUpload={handleImageUpload}
                />

                {/* SECURITY BOX */}
                <SecurityBox
                    handlePasswordUpdate={handlePasswordUpdate}
                    labelCls={labelCls}
                    inputCls={inputCls}
                    passwords={passwords}
                    setPasswords={setPasswords}
                    showPass={showPass}
                    setShowPass={setShowPass}
                    loading={loading}
                />
            </div>

            {/* SUPPORT */}
            <SupportBox student={student} />
        </div>
    );
}