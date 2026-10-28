import React from "react";
import { headingClass, cardClass, buttonClass, badgeClass } from "@/components/Tools/Misc";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { sidebarData } from "@/data/sidebarData";
import ProjectCard from "@/components/Ui/Advisor/ProjectCard";
import { founderSidebar } from "@/data/founderSidebarData";

const projects = [
  {
    id: 1,
    name: "FlowBoost AI",
    tagline: "AI-powered workflow optimizer",
    status: "Pending",
    stage: "Seed",
    industry: "SaaS",
    rating: 4.5,
    founder: "Adaeze Onyeka",
    description: "Uses LLMs to optimize team productivity and deliver insights via Slack.",
    image: "https://placehold.co/800x400/000000/FFF"
  },
  {
    id: 2,
    name: "MediPulse",
    tagline: "Smart diagnosis for remote clinics",
    status: "Approved",
    stage: "Series A",
    industry: "HealthTech",
    rating: 3.7,
    founder: "Kabir Musa",
    description: "Portable diagnostic AI device with real-time recommendations.",
    image: "https://placehold.co/800x400/000000/FFF",
  },
];

type Props = {
  title?:string
}

const Projects = ({title}:Props) => {
  return (
    <DashboardLayout title={title} sidebarDataType="founder" sidebarData={founderSidebar}>
      <div className="p-6">
        <h2 className={headingClass}>🚀 Submitted Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {projects.map((project) => (
             <ProjectCard
             id={project.id}
             name={project.name}
             tagline={project.tagline}
             status={project.status}
             stage={project.stage}
             industry={project.industry}
             rating={project.rating}
             founder={project.founder}
             description={project.description}
             image={project.image}
             />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Projects;