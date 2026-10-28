import { appName } from "@/dapp";
import { ProjectFormManual } from "@/components/Advisor/Founder/ProjectForm";
import { AdminLayout } from "@/layouts/AdminLayout";
import React from "react";
import { Helmet } from "react-helmet-async";

export default function CreateProject() {
  return (
    <AdminLayout>
      <Helmet>
        <title>Create Project - {appName}</title>
      </Helmet>

      <div className="flex flex-col overflow-x-scroll">
        <ProjectFormManual adminUrl={true} />
      </div>
    </AdminLayout>
  );
}
