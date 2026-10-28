import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { LoadingDiv, classMap } from "@/components/Tools/Misc";
import CheckInCalendar from "@/components/Advisor/CheckInCalendar";
import { Helmet } from "react-helmet-async";
import { appName, appUrl } from "@/dapp";
import { useUser } from "@/context/UserContext";
import TrendBetDB from "../../../components/Advisor/TrendBetDB";
import { investorSidebar } from "@/data/investorSidebarData";
import QuestDB from "../../../components/Advisor/QuestDB";

const InvestorDashboard = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [lens, setLens] = useState(user?.total_lens || 0);
  const [glasses, setGlasses] = useState(user?.total_glasses || 0);
  const [streak, setStreak] = useState(6);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  return (
    <>
      <Helmet>
        <title>Dashboard - {appName}</title>
      </Helmet>
      {isLoading ? (
        <DashboardLayout
          sidebarDataType="investor"
          sidebarData={investorSidebar}
        >
          <LoadingDiv layout={[[1], [1], [1], [3, 3, 3]]} height="h-40" />
        </DashboardLayout>
      ) : (
        <DashboardLayout
          sidebarDataType="investor"
          sidebarData={investorSidebar}
        >
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

            {/* DB Quests  */}
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
        </DashboardLayout>
      )}
    </>
  );
};

export default InvestorDashboard;
