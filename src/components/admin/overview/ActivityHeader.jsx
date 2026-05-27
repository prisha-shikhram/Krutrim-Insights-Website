// import icons
import { Activity } from "lucide-react";

// activity header component
export default function ActivityHeader({ data }) {
    return (
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">

            <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#0189c715] text-[#0189c7]">
                    <Activity size={20} />
                </div>

                <div>
                    <h3 className="font-bold text-gray-800 text-lg">System Activity</h3>
                    <p className="text-xs text-gray-400">
                        Latest interactions across all modules
                    </p>
                </div>
            </div>

            {!data.loading && (
                <span className="text-[10px] font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full uppercase tracking-wider border border-green-100">
                    {data.recent?.length || 0} New
                </span>
            )}
        </div>
    );
}