// import icons
import { ChevronDown } from 'lucide-react';

// faq item component
export default function FAQItem({ question, answer, isOpen, onClick }) {
    return (
        <div className="mb-4 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 cursor-pointer">
            <button
                onClick={onClick}
                className={`flex w-full items-center justify-between p-6 text-left transition-colors cursor-pointer ${isOpen ? 'bg-sky-50' : 'hover:bg-gray-50'}`}
            >
                <span className="text-lg font-semibold text-gray-900">{question}</span>

                <div
                    className={`flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300
                    ${isOpen ? 'bg-sky-500text-white rotate-180' : 'bg-sky-50 text-sky-500'}`}
                >
                    <ChevronDown size={20} />
                </div>
            </button>

            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="p-6 pt-3 text-gray-600 leading-relaxed">
                        {answer}
                    </div>
                </div>
            </div>
        </div>
    );
};