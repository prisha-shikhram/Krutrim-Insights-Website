// import hooks
import { useState, useEffect } from "react";

// import toast
import toast from "react-hot-toast";

// import outlet context
import { useOutletContext } from "react-router-dom";

// import components
import ProjectsHeader from "../../components/mentor/projects/ProjectsHeader";
import ProjectList from "../../components/mentor/projects/ProjectList";
import CreateProjectModal from "../../components/mentor/projects/CreateProjectModal";
import ShareProjectModal from "../../components/mentor/projects/ShareProjectModal";

// api urls
const PROJECT_API = "https://2dsr6yh6rc.execute-api.ap-south-1.amazonaws.com/mentor/projects";
const BATCH_API = "https://6p7z2hkjxc.execute-api.ap-south-1.amazonaws.com/student/batches";

// mentor projects page
export default function MentorProjects() {
    const { mentor } = useOutletContext();
    const [projects, setProjects] = useState([]);
    const [batches, setBatches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCreate, setShowCreate] = useState(false);
    const [showShare, setShowShare] = useState(false);
    const [activeProject, setActiveProject] = useState(null);

    useEffect(() => { fetchInitialData(); }, []);

    const fetchInitialData = async () => {
        // 1. Prevent execution if mentor data isn't ready yet
        if (!mentor?.email) return;

        setLoading(true);
        try {
            const [pRes, bRes] = await Promise.all([
                fetch(PROJECT_API, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        action: "listProjects",
                        createdBy: mentor.email
                    })
                }),
                fetch(BATCH_API)
            ]);

            const pData = await pRes.json();
            const bData = await bRes.json();

            // 2. Safety check: Ensure pData is an array before setting state
            if (pRes.ok) {
                setProjects(Array.isArray(pData) ? pData : (pData.Items || []));
            } else {
                console.error("Server Error Logic:", pData);
                setProjects([]); // Fallback to empty array
                toast.error(pData.error || "Failed to load projects");
            }

            setBatches(Array.isArray(bData) ? bData : (bData.Items || []));
        } catch (err) {
            console.error("Fetch Error:", err);
            setProjects([]); // Prevent .map crash
            toast.error("Sync failed");
        } finally {
            setLoading(false);
        }
    };

    // 3. Update useEffect to depend on mentor.email
    useEffect(() => {
        fetchInitialData();
    }, [mentor?.email]);

    return (
        <div className="space-y-8 py-6">
            {/* header */}
            <ProjectsHeader
                setShowCreate={setShowCreate}
            />

            {/* project list */}
            <ProjectList
                loading={loading}
                projects={projects}
                setActiveProject={setActiveProject}
                setShowShare={setShowShare}
            />

            {/* create project modal */}
            {showCreate && <CreateProjectModal
                onClose={() => setShowCreate(false)}
                refresh={fetchInitialData} mentor={mentor}
                PROJECT_API={PROJECT_API}
            />}

            {/* share project modal */}
            {showShare && <ShareProjectModal
                project={activeProject}
                batches={batches}
                onClose={() => setShowShare(false)}
                refresh={fetchInitialData}
            />}
        </div>
    );
}