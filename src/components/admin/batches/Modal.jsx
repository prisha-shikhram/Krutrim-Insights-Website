// import icons
import { X } from "lucide-react";

// model component
export default function Modal({ isOpen, onClose, title, subtitle, children, footer }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-100 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-xl rounded-4xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white">
                    <div>
                        <h3 className="text-xl font-black text-slate-800">{title}</h3>
                        {subtitle && <p className="text-[11px] text-blue-600 font-bold uppercase tracking-wider">{subtitle}</p>}
                    </div>

                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors cursor-pointer"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto flex-1">{children}</div>

                {footer && <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">{footer}</div>}
            </div>
        </div>
    );
}