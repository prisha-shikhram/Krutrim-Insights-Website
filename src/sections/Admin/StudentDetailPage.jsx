// import icons
import {
    ArrowLeft, Calendar, Phone, MapPin, UserCircle2, GraduationCap, Users, ShieldCheck, Fingerprint, Clock, Activity, Loader2, Briefcase,
    FileText, Award, CheckCircle2, XCircle, ExternalLink, Image, AlertCircle
} from "lucide-react";

// import toast
import toast from "react-hot-toast";

// import hooks
import { useState, useEffect } from "react";

// import components
import Section from "../../components/admin/enroll/Section";
import Field from "../../components/admin/enroll/Field";
import PortalStat from "../../components/admin/enroll/PortalStat";
import StudentHeader from "../../components/admin/studentdetail/StudentHeader";
import AttendanceHistory from "../../components/admin/studentdetail/AttendanceHistory";
import AssignmentSubmissions from "../../components/admin/studentdetail/AssignmentSubmissions";
import ProjectGallery from "../../components/admin/studentdetail/ProjectGallery";

// API Config
const STATS_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/stats";
const ATTENDANCE_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/attendance";
const ASSIGNMENT_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/assignments";
const PROJECT_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/projects";

// student detail page component
export default function StudentDetailPage({ email, onBack, API_URL, loading, setLoading, fmt, initials, avatarColor }) {
    const [data, setData] = useState(null);

    const [portalData, setPortalData] = useState({
        stats: null,
        attendance: [],
        assignments: [],
        projects: []
    });

    const [portalLoading, setPortalLoading] = useState(false);

    // Fetch Base Profile
    useEffect(() => {
        const fetchDeepDetails = async () => {
            try {
                const res = await fetch(`${API_URL}?email=${encodeURIComponent(email)}`);
                if (!res.ok) throw new Error("Failed to load profile");
                const result = await res.json();
                setData(result);
            } catch (err) {
                toast.error("Error loading detailed profile");
            } finally {
                setLoading(false);
            }
        };
        fetchDeepDetails();
    }, [email]);

    // Fetch Portal Activity (Stats + Lists)
    useEffect(() => {
        if (!data?.email) return;

        const fetchPortalActivity = async () => {
            setPortalLoading(true);
            const syncToast = toast.loading("Syncing portal activity...");

            const queryParams = new URLSearchParams({
                email: data.email.toLowerCase(),
                batch: (data.batchCode || "").trim()
            }).toString();

            try {
                const [statsRes, attRes, asmRes, projRes] = await Promise.all([
                    fetch(`${STATS_API}?${queryParams}&type=stats`),
                    fetch(`${ATTENDANCE_API}?email=${data.email.toLowerCase()}&type=attendance`),
                    fetch(`${ASSIGNMENT_API}?${queryParams}&type=assignments`),
                    fetch(`${PROJECT_API}?${queryParams}&type=projects`)
                ]);

                const [stats, attendance, assignments, projects] = await Promise.all([
                    statsRes.json(), attRes.json(), asmRes.json(), projRes.json()
                ]);

                setPortalData({ stats, attendance, assignments, projects });
                toast.success("Portal data synchronized", { id: syncToast });
            } catch (err) {
                toast.error("Failed to fetch portal activity", { id: syncToast });
            } finally {
                setPortalLoading(false);
            }
        };

        fetchPortalActivity();
    }, [data]);

    // loading
    if (loading) return (
        <div className="h-96 flex flex-col items-center justify-center gap-4 text-slate-400">
            <Loader2 className="animate-spin" size={32} />
            <p className="text-xs font-bold uppercase tracking-widest">Compiling Student Data...</p>
        </div>
    );

    // not found
    if (!data) return <div className="text-center p-10">Student record not found.</div>;

    // stats
    const stats = portalData.stats || {
        attendance: { present: 0, total: 0 },
        assignments: { submitted: 0, total: 0 },
        projects: { submitted: 0, total: 0 }
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500 pb-12">
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-800 font-bold text-sm transition-colors group cursor-pointer"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Directory
            </button>

            {/* Header Card */}
            <StudentHeader
                data={data}
                avatarColor={avatarColor}
                initials={initials}
            />

            {/* Personal Section */}
            <Section title="Personal Information" icon={<UserCircle2 size={16} />}>
                <Field label="Full Name" value={data.fullName} />
                <Field label="Date of Birth" value={fmt(data.dob)} icon={<Calendar size={10} />} />
                <Field label="Phone" value={data.studentPhone} icon={<Phone size={10} />} />
                <Field label="Address" value={data.address} icon={<MapPin size={10} />} />
            </Section>

            {/* Academic Section */}
            <Section title="Academic & Program Details" icon={<GraduationCap size={16} />}>
                <Field label="College Name" value={data.collegeName} icon={<Briefcase size={10} />} />
                <Field label="Course" value={data.course === "Other" ? data.otherCourse : data.course} />
                <Field label="Current Year" value={data.year} />
                <Field label="Program Enrolled" value={data.enrollingFor} icon={<Award size={10} />} />
                <Field label="Course Duration" value={`${data.duration} Years`} />
                <Field label="Enrolled On" value={fmt(data.createdAt)} icon={<Clock size={10} />} />
            </Section>

            {/* Identity Verification Section */}
            <Section title="Identity Verification" icon={<ShieldCheck size={16} />}>
                <Field label="Identity Type" value={data.idType === "Other" ? data.otherIdType : data.idType} icon={<Fingerprint size={10} />} />
                <Field label="ID Number" value={data.idNumber} mono />
                <Field label="Verification File" value={data.idProofUrl} link icon={<FileText size={10} />} />
            </Section>

            {/* Parental Section */}
            <Section title="Parental & Emergency Contact" icon={<Users size={16} />}>
                <Field label="Parent/Guardian" value={data.parentName} />
                <Field label="Parent Phone" value={data.parentPhone} icon={<Phone size={10} />} />
                <Field label="Emergency Contact" value={data.emergencyContact} />
            </Section>

            {/* Portal Activity Overview */}
            <div className="bg-white rounded-4xl border border-slate-100 shadow-sm p-8">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-6 flex items-center gap-2">
                    <Activity size={14} /> Portal Engagement
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <PortalStat label="Attendance" value={stats.attendance.present} total={stats.attendance.total} color="blue" />
                    <PortalStat label="Assignments" value={stats.assignments.submitted} total={stats.assignments.total} color="violet" />
                    <PortalStat label="Projects" value={stats.projects.submitted} total={stats.projects.total} color="emerald" />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Attendance History */}
                <AttendanceHistory
                    portalData={portalData}
                    fmt={fmt}
                />

                {/* Assignment Submissions */}
                <AssignmentSubmissions
                    portalData={portalData}
                />

                {/* Project Gallery */}
                <ProjectGallery
                    portalData={portalData}
                />
            </div>
        </div>
    );
}