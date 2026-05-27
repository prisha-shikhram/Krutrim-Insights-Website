// import icons
import { ChevronDown } from "lucide-react";

// custom select component
export default function CustomSelect({ label, value, options, onChange }) {
    return (
        <div className="relative group">
            <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest block mb-3 px-1">{label}</label>

            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-100 px-5 py-4 rounded-2xl text-xs font-bold text-slate-700 
                    outline-none focus:border-indigo-400 focus:shadow-lg focus:shadow-indigo-50 transition-all cursor-pointer"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>

                <ChevronDown
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none group-hover:text-indigo-500 transition-colors"
                    size={16}
                />
            </div>
        </div>
    );
}