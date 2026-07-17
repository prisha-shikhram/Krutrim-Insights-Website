// admin payment profile
export default function AdminPaymentProfile({ user }) {
    return (
        <div className="mb-5 p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <div className="flex flex-col items-center text-center">
                <div className="relative w-28 h-28 mb-3">
                    {user.profileImg ? (
                        <img
                            src={user.profileImg}
                            className="w-full h-full rounded-2xl object-cover shadow-md border-2 border-white"
                            alt="Profile"
                        />
                    ) : (
                        <div
                            className="w-full h-full rounded-2xl bg-white flex items-center justify-center text-2xl font-black 
                            text-[#0189c7] border"
                        >
                            {user.name?.[0]}
                        </div>
                    )}
                </div>

                <h3 className="font-bold text-gray-800 text-sm">{user.name}</h3>

                <span className="text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1.5 bg-amber-100 text-amber-600">
                    Payment Super Admin
                </span>
            </div>
        </div>
    );
}