// import outlet
import { Suspense } from "react";
import { Outlet } from "react-router-dom";

// mentro main component
export default function MentorMain({ getTitle, mentor, setMentor, handleImageUpload }) {
    return (
        <main className="flex-1 overflow-y-auto">
            <header className="px-10 pt-10 pb-6">
                <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 rounded-full bg-indigo-500" />

                    <p className="text-indigo-600 text-[10px] font-black uppercase tracking-[0.2em]">
                        Mentor Management Portal
                    </p>
                </div>

                <h2 className="text-4xl font-black capitalize tracking-tight text-slate-800">
                    {getTitle()}
                </h2>
            </header>

            <div className="px-10 pb-10">
                <Suspense fallback={
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" />
                        Loading Mentor Workspace...
                    </div>
                }>
                    <Outlet context={{ mentor, setMentor, handleImageUpload }} />
                </Suspense>
            </div>
        </main>
    );
}