import React, { useEffect, useState } from "react";
import {
  FaLock,
  FaCheckCircle,
  FaStar,
  FaFire,
  FaRocket,
  FaAward,
} from "react-icons/fa";
import { classMap, emptyData, Loading, postData } from "../Tools/Misc";
import { appUrl } from "@/dapp";

const AchievementPanel = ({
  userAchievements,
  achievementTypes,
}: {
  userAchievements: any;
  achievementTypes: any;
}) => {
  const [achievements, setAchievements] = useState(achievementTypes || []);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    postData(`achievement/types`)
      .then((res: any) => {
        (setAchievements(res.data), setIsLoading(false));
      })
      .catch((err) => console.log(err));
  }, []);

  // const achievements = [
  //   {
  //     id: 1,
  //     name: "First Login",
  //     desc: "You logged in for the first time — welcome aboard!",
  //     icon: <FaCheckCircle className="text-green-400" />,
  //     unlocked: true,
  //     lensReward: 10,
  //   },
  //   {
  //     id: 2,
  //     name: "7-Day Streak",
  //     desc: "Checked in for 7 days straight. Keep the fire burning!",
  //     icon: <FaFire className="text-orange-400" />,
  //     unlocked: false,
  //     lensReward: 50,
  //   },
  //   {
  //     id: 3,
  //     name: "First Project Upload",
  //     desc: "You uploaded your first project — you’re going places!",
  //     icon: <FaRocket className="text-purple-400" />,
  //     unlocked: false,
  //     lensReward: 30,
  //   },
  //   {
  //     id: 4,
  //     name: "Consistency Champ",
  //     desc: "Maintained a 30-day check-in streak. Legend.",
  //     icon: <FaStar className="text-yellow-400" />,
  //     unlocked: false,
  //     lensReward: 100,
  //   },
  // ];

  return (
    <section
      className={`${classMap.dehtaCard()} border-(--owner) shadow-lg max-h-[60vh] transition-all`}
    >
      <div className="overflow-y-scroll">
        <h3 className="text-lg font-semibold text-start text-primary mb-4 flex items-center gap-2">
          <FaAward /> Achievements
        </h3>

        <div className="space-y-3 w-full overflow-y-auto min-h-80">
          {isLoading ? (
            <Loading />
          ) : achievements ? (
            achievements.map((a) => {
              let unlocked = false;
              {
                userAchievements &&
                  userAchievements.map((ac: any) => {
                    ac.achievement_type_id === a.id && (unlocked = true);
                  });
              }
              return (
                <div
                  key={a.id}
                  className={`flex items-center justify-between p-3 border rounded-xl w-full transition-all duration-300 
              ${
                unlocked
                  ? "border-border bg-[var(--ceo)] hover:bg-[var(--owner)]"
                  : "border-gray-700/50 bg-gray-800/30 hover:bg-gray-700/30"
              }
              `}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`text-2xl ${
                        unlocked ? "opacity-100" : "opacity-60"
                      }`}
                    >
                      {a.icon}
                    </div>
                    <div className="text-start">
                      <h4
                        className={`font-medium ${
                          unlocked ? "text-primary" : "text-white"
                        }`}
                      >
                        {a.name}
                      </h4>
                      <p className="text-xs text-primary">{a.description}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end text-xs text-accent">
                    <span className="font-semibold text-primary">
                      +{a.lens_reward} Lens
                    </span>
                    {!unlocked && <FaLock className="text-muted mt-1" />}
                  </div>
                </div>
              );
            })
          ) : (
            emptyData("No Achievements Yet")
          )}
        </div>
      </div>
    </section>
  );
};

export default AchievementPanel;
