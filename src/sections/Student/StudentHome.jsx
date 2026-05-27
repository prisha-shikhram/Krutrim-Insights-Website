// import hooks
import { useState, useEffect, useCallback } from "react";

// import outlet context and use navigate
import { useOutletContext, useNavigate } from "react-router-dom";

// import icons
import { UserCheck, FileText, FolderGit2, Loader2 } from "lucide-react";

// import toast
import { toast } from "react-hot-toast";

// api urls
const STATS_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/stats";
const NOTICE_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/notice";
const ASSIGNMENT_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/assignments";
const PROJECT_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/projects";

// import components
import Banner from "../../components/student/home/Banner";
import StatGrid from "../../components/student/home/StatsGrid";
import TaskList from "../../components/student/home/TaskList";
import NoticeList from "../../components/student/home/NoticeList";

// student home page
export default function StudentHome() {
    const { student } = useOutletContext();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [dashboardData, setDashboardData] = useState({
        stats: { attendance: { pct: 0 }, assignments: { submitted: 0, total: 0 }, projects: { submitted: 0, total: 0 } },
        pendingTasks: [],
        notices: []
    });

    // fetch data
    const fetchAllData = useCallback(async () => {
        if (!student?.email) return;
        setLoading(true);

        const queryParams = new URLSearchParams({
            email: student.email.toLowerCase(),
            batch: (student.batchCode || "").trim()
        }).toString();

        try {
            const results = await Promise.allSettled([
                fetch(`${STATS_API}?${queryParams}&type=stats`).then(res => res.ok ? res.json() : Promise.reject()),
                fetch(NOTICE_API).then(res => res.ok ? res.json() : Promise.reject()),
                fetch(`${ASSIGNMENT_API}?${queryParams}&type=assignments`).then(res => res.ok ? res.json() : Promise.reject()),
                fetch(`${PROJECT_API}?${queryParams}&type=projects`).then(res => res.ok ? res.json() : Promise.reject())
            ]);

            const statsData = results[0].status === 'fulfilled' ? results[0].value : dashboardData.stats;
            const noticesData = results[1].status === 'fulfilled' ? results[1].value : [];
            const asmData = results[2].status === 'fulfilled' ? results[2].value : [];
            const projData = results[3].status === 'fulfilled' ? results[3].value : [];

            const combinedTasks = [
                ...(Array.isArray(asmData) ? asmData : []).map(a => ({
                    ...a,
                    displayTitle: a.title,
                    taskType: 'Assignment',
                    date: a.deadline,
                    link: '/student/dashboard/assignments'
                })),
                ...(Array.isArray(projData) ? projData : []).map(p => ({
                    ...p,
                    displayTitle: p.name,
                    taskType: 'Project',
                    date: p.createdAt,
                    link: '/student/dashboard/projects'
                }))
            ]
                .filter(task => task.status !== "Submitted")
                .sort((a, b) => new Date(a.date) - new Date(b.date))
                .slice(0, 3);

            setDashboardData({
                stats: statsData,
                pendingTasks: combinedTasks,
                notices: (Array.isArray(noticesData) ? noticesData : (noticesData.Items || []))
                    .filter(n => n.approved)
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .slice(0, 3)
            });
        } catch (err) {
            console.error(err);
            toast.error("Cloud sync issue. Some data might be missing.");
        } finally {
            setLoading(false);
        }
    }, [student]);

    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    // stat cards
    const statCards = [
        {
            label: "Attendance", value: `${dashboardData.stats.attendance?.pct || 0}%`,
            icon: <UserCheck size={20} />, color: "text-blue-600", bg: "bg-blue-50"
        },
        {
            label: "Assignments", value: `${dashboardData.stats.assignments?.submitted || 0}/${dashboardData.stats.assignments?.total || 0}`,
            icon: <FileText size={20} />, color: "text-indigo-600", bg: "bg-indigo-50"
        },
        {
            label: "Projects Done", value: `${dashboardData.stats.projects?.submitted || 0}/${dashboardData.stats.projects?.total || 0}`,
            icon: <FolderGit2 size={20} />, color: "text-emerald-600", bg: "bg-emerald-50"
        },
    ];

    // laoding
    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center gap-4">
            <Loader2 className="animate-spin text-blue-600" size={40} />
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Syncing Portal...</p>
        </div>
    );

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* WELCOME BANNER */}
            <Banner
                student={student}
            />

            {/* STATS GRID */}
            <StatGrid
                statCards={statCards}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* task list */}
                <TaskList
                    dashboardData={dashboardData}
                    navigate={navigate}
                />

                {/* notice list */}
                <NoticeList
                    dashboardData={dashboardData}
                    navigate={navigate}
                />
            </div>
        </div>
    );
}