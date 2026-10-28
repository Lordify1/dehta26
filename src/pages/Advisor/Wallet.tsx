import React, { useState, useEffect } from "react";
import DashboardLayout from "@/layouts/Advisor/DashboardLayout";
import { founderSidebar } from "@/data/founderSidebarData";
import { LoadingDiv, classMap } from "@/components/Tools/Misc";
import { FaGlasses, FaCoins, FaTrophy, FaSyncAlt, FaSearchDollar } from "react-icons/fa";
import AchievementPanel from "@/components/Advisor/Achievements";
import LensActivity from "@/components/Advisor/LensActivity";
import { useUser } from "@/context/UserContext";

const Wallet = () => {

  const {user} = useUser();
  const [isLoading, setIsLoading] = useState(true);
  const [lens, setLens] = useState(user?.total_lens || 0);
  const [glasses, setGlasses] = useState(user?.total_glasses || 0);
  const [achievements, setAchievements] = useState(user?.achievements?.length || 0);

  useEffect(() => {
    setIsLoading(false);
  }, [user]);

  return (
    <>
      {isLoading ? (
        <DashboardLayout
          user={user}
          sidebarDataType="founder"
          sidebarData={founderSidebar}
        >
          <LoadingDiv layout={[[1], [3, 3, 3]]} height="h-40" />
        </DashboardLayout>
      ) : (
        <DashboardLayout
          sidebarDataType="founder"
          sidebarData={founderSidebar}
        >
          {/* Header: User Info */}
          <section
            className={`${classMap.userCard(3)} flex flex-row items-center justify-between mb-6`}
          >
            <div className="flex items-center">
              <img
                src={user?.avatar || "https://placehold.co/100x100"}
                alt="User Avatar"
                className="w-16 h-16 rounded-full border-border"
              />
              <div className="ml-1 flex flex-col">
                <h2 className="text-lg font-bold">{user?.username}</h2>
                <div className="flex gap-1 mt-1">
                  <span className={`${classMap.tempBtn}`}>
                    <FaSearchDollar className="inline mr-1 text-[var(--owner)]" /> {lens.toLocaleString()}
                  </span>
                  <span className={`${classMap.tempBtn}`}>
                    <FaGlasses className="inline mr-1 text-[var(--owner)]" /> {glasses}
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Wallet Summary */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
            <div
              className={`${classMap.userCard(3)} flex flex-col justify-center items-start`}
            >
              <h3 className="font-semibold text-lg mb-2">Glass Collection</h3>
              <p className="text-4xl font-bold">{glasses}</p>
              <p className="mt-2 text-sm text-primary">
                Keep collecting to unlock new styles <FaGlasses className="inline mr-1 text-[var(--owner)]"/>
              </p>
            </div>

            <div
              className={`${classMap.userCard(3)} flex flex-col justify-center items-start`}
            >
              <h3 className="font-semibold text-lg mb-2">Achievements</h3>
              <div className="flex items-center text-4xl font-bold text-yellow-400">
                <FaTrophy className="mr-2" /> {achievements}
              </div>
              <p className="mt-2 text-sm text-gray-400">
                You’ve earned {achievements} achievement
                {achievements === 1 ? "" : "s"} so far!
              </p>
            </div>
          </section>

          {/* Wallet Insights: Achievements + Lens History */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <AchievementPanel userAchievements={user?.achievements} />
            <LensActivity userTransact={user?.lens_transactions} />
          </section>
        </DashboardLayout>
      )}
    </>
  );
};

export default Wallet;