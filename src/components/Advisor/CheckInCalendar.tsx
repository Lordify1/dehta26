import { useState, useEffect } from "react";
import {
  classMap,
  EmailVerifyGuard,
  emptyData,
  showAlert,
} from "../Tools/Misc";
import { FaCalendar, FaCheckCircle, FaHistory } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { appUrl } from "@/dapp";
import { apiUrl } from "../../App";
import { useUser } from "@/context/UserContext";

type Props = {
  lens: (e: any) => void;
  streak: (e: any) => void;
  transactions: (e: any) => void;
  checkins: any;
  history: any;
  dView: any;
};

const CheckInCalendar = ({
  lens,
  streak,
  transactions,
  checkins,
  history,
  dView,
}: Props) => {
  // Create a 30-day calendar
  const [calendar, setCalendar] = useState(Array(30).fill(false));
  const [claimedToday, setClaimedToday] = useState(false);
  const [todayIndex, setTodayIndex] = useState(1);
  const [view, setView] = useState(dView || "calendar");
  const { user } = useUser();

  useEffect(() => {
    if (checkins) {
      const { streak, last_checkin } = checkins;

      // Fill the calendar up to current streak as claimed
      const filled = Array(30)
        .fill(false)
        .map((_, i) => i < streak);

      setCalendar(filled);

      // Set today's box (next after current streak)
      const nextDay = streak >= 30 ? 30 : streak + 1;
      setTodayIndex(nextDay);

      // Determine if the user already checked in today
      const lastDate = new Date(last_checkin);
      const today = new Date();
      const sameDay =
        lastDate.getFullYear() === today.getFullYear() &&
        lastDate.getMonth() === today.getMonth() &&
        lastDate.getDate() === today.getDate();

      setClaimedToday(sameDay);
    }
  }, [checkins]);

  const handleCheckin = async (index: number) => {
    if (index !== todayIndex) return;
    if (claimedToday) return;

    try {
      const res = await axios.post(`${apiUrl}/api/checkin/create`);

      setClaimedToday(true);
      const updated = [...calendar];
      updated[index - 1] = true; // Mark today's as claimed
      setCalendar(updated);

      lens((prev: any) => prev + 200);
      streak((prev: any) => prev + 1);
      transactions((prev: any) => [
        {
          id: Date.now(),
          desc: "Daily Check-in Reward",
          amount: "+200",
          date: "Today",
        },
        ...prev,
      ]);

      showAlert(res, "success");
    } catch (error: any) {
      // console.error(error);
      showAlert(error, "error");
      setClaimedToday(false);
      // toast.error("Failed to check in. Try again later.");
    }
  };

  return (
    <section
      className={`${classMap.dehtaCard()} border-(--owner) min-h-[60vh]`}
    >
      <div className="flex flex-row items-center justify-between w-full mb-2 transition-normal">
        {view === "calendar" ? (
          <h3 className="font-bold flex text-start items-center gap-2">
            <FaCalendar className="inline" />
            Check-in Calendar
          </h3>
        ) : (
          <h3 className="font-bold flex text-start items-center gap-2">
            <FaHistory className="inline" /> Check-in History
          </h3>
        )}
      </div>
      {view === "calendar" ? (
        user?.email_verified_at ? (
          <div className="grid grid-cols-5 bg-backdrop-blur rounded-sm p-1">
            {calendar.map((checked, index) => {
              const isToday = index + 1 === todayIndex;
              const isClaimable = isToday && !claimedToday;
              const claimed = checked;

              return (
                <>
                  <div
                    key={index}
                    onClick={() => handleCheckin(index + 1)}
                    className={`w-full flex items-center justify-center  transition-normal p-2 h-15 rounded-sm mx-1 border-transparent ${
                      claimed
                        ? "bg-green-600 text-primary cursor-not-allowed"
                        : isClaimable
                          ? "bg-yellow-600 text-primary animate-pulse cursor-pointer"
                          : "bg-muted opacity-50 cursor-not-allowed"
                    } hover:scale-90`}
                    title={`Day ${index + 1}`}
                  >
                    {claimed ? (
                      <FaCheckCircle className="text-primary" />
                    ) : (
                      <div className="text-center">
                        <p>{index + 1}</p>
                        <small className="text-sm opacity-50 text-(--owner)">
                          +200
                        </small>
                      </div>
                    )}
                  </div>
                </>
              );
            })}
          </div>
        ) : (
          <EmailVerifyGuard
            height={`h-50 w-full`}
            message={`Verify your email to Checkin`}
          />
        )
      ) : (
        <div className="space-y-3 w-full overflow-y-auto max-h-[50vh]">
          {history
            ? history.map((tx: any, index: any) => (
                <div
                  key={index}
                  className={`${classMap.section} flex flex-col text-start items-start`}
                >
                  <span>{tx.streak} Streak Count</span>
                  <span className={"text-[var(--owner)]"}>
                    {tx.lens_reward}
                  </span>
                </div>
              ))
            : emptyData("No Checkin History Here")}
        </div>
      )}
      {view === "calendar" && (
        <p className="mt-1 text-sm text-gray-400 text-center">
          {claimedToday
            ? "You've already checked in today! 🎉"
            : "Click today’s box to claim your 200 Lens."}
        </p>
      )}
    </section>
  );
};

export default CheckInCalendar;
