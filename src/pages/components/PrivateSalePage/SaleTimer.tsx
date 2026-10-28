import { appUrl } from "@/dapp";
import React, { useEffect, useState } from "react";
import { Navigate, Router } from "react-router-dom";
import { classMap } from "@/components/Tools/Misc";

const TARGET_DATE = new Date("2025-11-20T00:00:00");

// CET offset helper (since CET = UTC+1, ignoring DST drama)
const getCETDate = () => {
  const now = new Date();
  // convert to CET without DST complexity (client should adjust as needed)
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 3600000);
};

const SaleTimer = ({
  showText = true,
  header = false,
}: {
  showText?: boolean;
  header?: boolean;
}) => {
  const [timeLeft, setTimeLeft] = useState("");
  const [phaseTwoActive, setPhaseTwoActive] = useState(false);
  const [saleLive, setSaleLive] = useState(false);

  // Checks Mon–Fri, 12:00–23:00 CET
  const checkSaleWindow = () => {
    const now = getCETDate();
    const day = now.getDay(); // 1–5 = Mon–Fri
    const hour = now.getHours(); // 0–23

    const isWeekday = day >= 1 && day <= 5;
    const inTime = hour >= 12 && hour < 23;

    setSaleLive(isWeekday && inTime);
  };

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = TARGET_DATE.getTime() - now.getTime();

      if (diff <= 0) {
        setPhaseTwoActive(true);
        setTimeLeft("");
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    };

    updateCountdown();
    checkSaleWindow();

    const timer = setInterval(() => {
      updateCountdown();
      checkSaleWindow();
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  const goToSalePage = () => {
    // use react-router's <Navigate /> to perform an SPA navigation
    setRedirectTo(`/og/private_sale`);
  };

  if (redirectTo) {
    return <Navigate to={redirectTo} />;
  }

  return (
    <div
      className={`hidden`}
      onClick={() => {
        header ? goToSalePage() : "";
      }}
    >
      <div
        className={`text-center cursor-pointer text-sm sm:text-base text-secondary lg:flex lg:flex-row items-center justify-center mb-0 ${
          !header && "border border-border rounded-lg p-4"
        }`}
      >
        {showText ? (
          <h3 className="text-secondary  text-2xl me-2">
            {phaseTwoActive
              ? "Private Sale has ended!"
              : "Private Sale ends in:"}
          </h3>
        ) : (
          <></>
        )}

        {!phaseTwoActive && (
          <p
            className={`${header ? `text-2xl text-white animate-pulse-glow` : `text-2xl text-white animate-pulse-glow`}`}
          >
            {timeLeft}
          </p>
        )}

        {phaseTwoActive && !header && (
          <p className="text-xl mt-2 font-bold text-[var(--owner)] animate-phase-active">
            🚀 Private Sale has ended!
          </p>
        )}
      </div>

      {!phaseTwoActive && saleLive && header && (
        <span className="text-sm text-white animate-pulse">Click to Join</span>
      )}
    </div>
  );
};

export default SaleTimer;
