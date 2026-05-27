// import hooks
import { Suspense } from "react";

// import navigation
import { Outlet } from "react-router-dom";

// main page component for admin dashboard
export default function Main({ getTitle, user }) {
    return (
        <main className="flex-1 overflow-y-auto">
            <header className="px-10 pt-10 pb-6">
                <p className="text-[#0189c7] text-[10px] font-black uppercase tracking-[0.2em] mb-1">
                    System Control
                </p>

                <h2 className="text-4xl font-black capitalize tracking-tight text-slate-800">
                    {getTitle()}
                </h2>
            </header>

            <div className="px-10 pb-10">
                <Suspense fallback={
                    <div className="flex items-center gap-2 text-slate-400 font-medium">
                        <div className="w-4 h-4 border-2 border-[#0189c7] border-t-transparent rounded-full animate-spin" />
                        Loading Module...
                    </div>
                }>
                    <Outlet context={{ user }} />
                </Suspense>
            </div>
        </main>
    )
}