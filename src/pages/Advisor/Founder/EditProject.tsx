import { Helmet } from "react-helmet-async"
import { ProjectFormManual } from "../../../components/Advisor/Founder/ProjectForm"
import DashboardLayout from "../../../layouts/Advisor/DashboardLayout"
import { appName } from "../../../App"
import { useUser } from "@/context/UserContext";
import { useMisc } from "@/context/MiscContext";
import { useEffect } from "react";


const EditProject = () => {
    const {user, role, sidebarData} = useUser();
    const {userProject,getUserProject} = useMisc();

    useEffect(() => {
        getUserProject()
    }, [])

    return(
        <DashboardLayout
        user={user}
        sidebarData={sidebarData}
        sidebarDataType={`${role}`}        
        >
            <Helmet>
                <title>{userProject ? (`Edit Project`) : (`Create Project`)} - {appName}</title>
            </Helmet>
            <div className="flex flex-col overflow-x-scroll">
                <h1 className="text-4xl lg:text-5xl mb-2">
                    {userProject ? (`Edit Project`) : (`Create Project`)}
                </h1>
                <ProjectFormManual
                project={userProject}
                isUpdate={userProject ? true : false}
                />
            </div>
        </DashboardLayout>
    )
}


export default EditProject