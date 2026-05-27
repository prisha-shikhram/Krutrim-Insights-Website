// import hooks
import { useState, useEffect, useMemo } from "react";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import icons
import { Loader2 } from "lucide-react";

// import toast
import toast from "react-hot-toast";

// api urls
const PROJECT_API = "https://hnhefbqnzc.execute-api.ap-south-1.amazonaws.com/student/projects";
const S3_UPLOAD_API = "https://ixov8eynl3.execute-api.ap-south-1.amazonaws.com/get-upload-url";

// import components
import Stats from "../../components/student/projects/Stats";
import ProjectList from "../../components/student/projects/ProjectList";
import UploadModal from "../../components/student/projects/UploadModal";

// student projects page
export default function StudentProjects() {
    const { student } = useOutletContext();
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeProject, setActiveProject] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // Re-fetch when identification or batch info updates
    useEffect(() => {
        if (student?.email) {
            fetchProjects();
        }
    }, [student?.email, student?.batchCode]);

    // fetch projects
    const fetchProjects = async () => {
        setLoading(true);
        try {
            const queryParams = new URLSearchParams({
                email: student.email.toLowerCase(),
                batch: (student.batchCode || "").trim(),
                type: "projects"
            });

            const res = await fetch(`${PROJECT_API}?${queryParams.toString()}`);
            const data = await res.json();

            const items = Array.isArray(data) ? data : (data.Items || []);
            const sortedProjects = items.sort((a, b) =>
                new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
            );

            setProjects(sortedProjects);
        } catch (err) {
            console.error("Fetch Error:", err);
            toast.error("Failed to load project board");
        } finally {
            setLoading(false);
        }
    };

    // stats
    const stats = useMemo(() => {
        const completed = projects.filter(p => p.status === "Submitted").length;
        const pending = projects.length - completed;
        return { completed, pending };
    }, [projects]);

    // handle file change
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith("image/")) {
            setSelectedFile(file);
            if (previewUrl) URL.revokeObjectURL(previewUrl);
            setPreviewUrl(URL.createObjectURL(file));
        } else {
            toast.error("Please upload a valid PNG or JPG image");
        }
    };

    // open submission modal
    const openSubmitModal = (project) => {
        setActiveProject(project);
        setSelectedFile(null);
        setPreviewUrl(null);
        setIsModalOpen(true);
    };

    // handle file submission
    const handleFinalSubmit = async () => {
        if (!selectedFile || !activeProject) return;

        setIsSubmitting(true);
        const tid = toast.loading("Uploading proof...");

        try {
            // 1. Get Signed URL (Force uploadType to 'assignments' as requested)
            const urlRes = await fetch(S3_UPLOAD_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    fileName: `projects/${activeProject.projectId}/${student.email.split('@')[0]}_${Date.now()}.png`,
                    fileType: selectedFile.type,
                    uploadType: "assignments"
                })
            });

            if (!urlRes.ok) throw new Error("Authorization failed");
            const { uploadUrl, fileUrl } = await urlRes.json();

            // 2. Direct S3 Transmission
            const uploadRes = await fetch(uploadUrl, {
                method: "PUT",
                headers: { "Content-Type": selectedFile.type },
                body: selectedFile
            });

            if (!uploadRes.ok) throw new Error("S3 Upload failed");

            // 3. Update Project Registry & Portal
            const saveRes = await fetch(PROJECT_API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    action: "submitProject",
                    studentEmail: student.email.toLowerCase(),
                    projectId: activeProject.projectId,
                    title: activeProject.name,
                    screenshotUrl: fileUrl,
                })
            });

            if (!saveRes.ok) throw new Error("Database synchronization failed");

            toast.success("Project submitted successfully!", { id: tid });
            setIsModalOpen(false);
            fetchProjects();
        } catch (err) {
            toast.error(err.message, { id: tid });
        } finally {
            setIsSubmitting(false);
        }
    };

    // loading
    if (loading) return (
        <div className="flex flex-col items-center justify-center py-40 gap-4">
            <Loader2 className="animate-spin text-indigo-600" size={40} />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-[0.3em]">Syncing Projects...</p>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* STATS SUMMARY */}
            <Stats
                stats={stats}
                projects={projects}
            />

            {/* PROJECT LISTING */}
            <ProjectList
                projects={projects}
                openSubmitModal={openSubmitModal}
            />

            {/* UPLOAD MODAL */}
            {isModalOpen && (
                <UploadModal
                    setIsModalOpen={setIsModalOpen}
                    isSubmitting={isSubmitting}
                    activeProject={activeProject}
                    handleFileChange={handleFileChange}
                    previewUrl={previewUrl}
                    handleFinalSubmit={handleFinalSubmit}
                    selectedFile={selectedFile}
                />
            )}
        </div>
    );
}