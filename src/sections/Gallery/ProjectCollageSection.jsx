// import components
import SectionHeader from "../../components/utils/SectionHeader";
import ProjectCard from "../../components/gallery/ProjectCard";

// projects data
const projects = [
  {
    title: "Auto Apply Job Agent",
    type: "n8n Automation",
    img: "/images/projects/1.png",
    description: "An intelligent automation workflow that streamlines the job application process end-to-end using n8n. It scrapes job listings, filters them based on relevance, and customizes resumes dynamically for each role."
  },
  {
    title: "Travel Kro – Voice Agent",
    type: "Voice AI",
    img: "/images/projects/2.png",
    description: "A smart voice-enabled assistant that helps users plan their vacations effortlessly through natural conversation. It understands user preferences like budget and destination to generate personalized travel plans."
  },
  {
    title: "Jarvis AI Assistant",
    type: "Personal LLM",
    img: "/images/projects/3.png",
    description: "A powerful AI assistant designed to automate everyday tasks through voice and commands. It can open applications, perform system operations, and answer queries in real time with a futuristic UI."
  },
  {
    title: "AI Automation Sales Dashboard",
    type: "Data Science",
    img: "/images/projects/4.png",
    description: "An intelligent analytics dashboard that leverages AI to transform raw CSV data into structured JSON and visualize it through interactive charts, highlighting revenue trends and business metrics."
  },
  {
    title: "ATS Resume Checker",
    type: "NLP / HR-Tech",
    img: "/images/projects/5.png",
    description: "An AI-powered tool that evaluates resumes for compatibility with Applicant Tracking Systems (ATS), analyzing keywords and formatting to provide actionable suggestions for career optimization."
  },
  {
    title: "Smart Traffic Monitoring",
    type: "Computer Vision",
    img: "/images/projects/6.png",
    description: "An interactive, game-inspired system that uses AI to optimize signal flow in real time. It analyzes vehicle density and prioritizes traffic flow to reduce congestion in a simulated environment."
  },
  {
    title: "Nexus AI – Multi-LLM Router",
    type: "Model Merging",
    img: "/images/projects/7.png",
    description: "A unified platform that integrates multiple LLMs and intelligently routes queries to the most suitable model based on user intent, enhancing efficiency and accuracy across different AI strengths."
  },
  {
    title: "Emotion AI – Gesture Recognition",
    type: "Computer Vision",
    img: "/images/projects/8.png",
    description: "An AI system that detects facial expressions and hand gestures in real time. It recognizes movements to trigger specific responses, creating a natural and touch-free human-computer interaction."
  },
  {
    title: "MediBot – AI Healthcare Chatbot",
    type: "Healthcare AI",
    img: "/images/projects/9.png",
    description: "An AI-powered healthcare assistant providing medical information and guidance. It helps users understand symptoms and general health-related queries through accessible conversational interaction."
  },
  {
    title: "Email AI Agent",
    type: "Workflow Auto",
    img: "/images/projects/10.png",
    description: "An intelligent system that fetches and analyzes emails in real time. It classifies intent, detects fraud, and assigns priority levels to help users streamline their inbox management."
  },
  {
    title: "Financial Education Assistant",
    type: "FinTech AI",
    img: "/images/projects/11.png",
    description: "An AI chatbot designed to provide clear insights on financial concepts like budgeting and investments, making money-related knowledge interactive and accessible to everyone."
  },
  {
    title: "Blood Group Compatibility",
    type: "Medical Logic",
    img: "/images/projects/12.png",
    description: "An interactive educational tool that visually explains blood group compatibility for donations. The dynamic interface makes complex medical transfusion concepts easy to understand at a glance."
  }
];

// project collage section
export default function ProjectCollageSection() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section header */}
        <SectionHeader
          title="Project"
          highlight="Showcase"
          description="Explore our full collection of 12 industry-aligned AI projects, built to solve real-world problems."
        />

        {/* Grid layout */}
        <ProjectCard projects={projects} />
      </div>
    </section>
  );
}