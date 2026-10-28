import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { founderSidebar } from "@/data/founderSidebarData";
import { LoadingDiv, classMap } from "@/components/Tools/Misc";
import { FaEdit, FaEye } from "react-icons/fa";
import CheckInCalendar from "@/components/Advisor/CheckInCalendar";
import AchievementPanel from "@/components/Advisor/Achievements";
import LensActivity from "@/components/Advisor/LensActivity";
import { Helmet } from "react-helmet-async";
import { appName, appUrl } from "@/dapp";
import { useUser } from "@/context/UserContext";
import TrendBetDB from "../../../components/Advisor/TrendBetDB";
import { Link } from "react-router-dom";
import QuestDB from "../../../components/Advisor/QuestDB";
import { EmailVerifyGuard } from "../../../components/Tools/Misc";

const FounderDashboard = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  const hasProject = user?.project?.name ? true : false;

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Dashboard - {appName}</title>
      </Helmet>
      {isLoading ? (
        <DashboardLayout sidebarDataType="founder" sidebarData={founderSidebar}>
          <LoadingDiv layout={[[1], [1], [1], [3, 3, 3]]} height="h-40" />
        </DashboardLayout>
      ) : (
        <DashboardLayout sidebarDataType="founder" sidebarData={founderSidebar}>
          <div className="">
            {/* Welcome Banner */}
            <h1 className="text-2xl lg:text-4xl mb-3">
              GM, {user?.username} 👋
            </h1>
            <div className="mb-4 flex flex-col items-center gap-2 sm:flex-row sm:items-center sm:gap-6">
              <div className="lens-stage relative flex h-36 w-36 items-center justify-center">
                <img
                  src="/assets/ui/lens.png"
                  alt="Lens"
                  className="lens-dancer w-24"
                />
              </div>
              <p className="earnfi-explain text-2xl tracking-wide">
                Make more lens swap to usd
              </p>
            </div>

            <section
              className={
                hasProject
                  ? `grid grid-cols-1 ${user?.email_verified_at ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-3 mt-4`
                  : `hidden`
              }
            >
              {hasProject &&
                (user?.email_verified_at ? (
                  <>
                    <Link
                      to={"/edit-project"}
                      className={`${classMap.dehtaCard()} p-3 text-sm lg:text-lg mt-2 mb-2 w-full flex flex-row items-center justify-between`}
                    >
                      <span className="opacity-100">
                        Edit your Project {user?.project?.name}
                      </span>
                      <FaEdit className="text-2xl" />
                    </Link>
                    <Link
                      to={`/project/${user?.project?.id}/${user?.project?.slug}`}
                      className={`${classMap.dehtaCard()} p-3 text-sm lg:text-lg mt-2 mb-2 w-full flex flex-row items-center justify-between`}
                    >
                      <span className="opacity-100">View Project</span>
                      <FaEye className="text-2xl" />
                    </Link>
                  </>
                ) : (
                  <EmailVerifyGuard
                    height={`min-h-10 w-full`}
                    message={`Verify your Email to Continue`}
                  />
                ))}
            </section>

            {/* DB Quest  */}
            <QuestDB />

            {/* Check-in Calendar */}
            <section
              className={`grid grid-cols-1 lg:grid-cols-2 items-center justify-center mb-4 gap-4`}
            >
              <CheckInCalendar
                lens={() => {}}
                streak={() => {}}
                checkins={user?.checkins[0]}
                transactions={() => {}}
                history={user?.checkinhistory}
              />
              <TrendBetDB />
            </section>
          </div>
          {/* Achievements */}
        </DashboardLayout>
      )}
    </>
  );
};

export default FounderDashboard;
