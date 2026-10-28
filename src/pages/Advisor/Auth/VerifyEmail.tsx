import React, { useEffect, useState } from "react";
import SendRequest from "@/components/Tools/SendRequest";
import { IoMailUnreadOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { appName } from "@/dapp";
import { useUser } from "@/context/UserContext";
import { classMap } from "../../../components/Tools/Misc";

const COOLDOWN = 180;
const STORAGE_KEY = "verify_email_timer_expiry";

export default function VerifyEmail({ message }: any) {
  const [timer, setTimer] = useState<number>(0);
  const { user } = useUser();

  // Show initial server message once
  useEffect(() => {
    if (message) toast.success(message);
  }, []);

  // Restore timer from localStorage
  useEffect(() => {
    const savedExpiry = localStorage.getItem(STORAGE_KEY);
    if (!savedExpiry) return;

    const remaining = parseInt(savedExpiry, 10) - Math.floor(Date.now() / 1000);

    if (remaining > 0) {
      setTimer(remaining);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  // Countdown
  useEffect(() => {
    if (timer <= 0) return;

    const interval = setInterval(() => {
      setTimer((t) => {
        if (t <= 1) {
          localStorage.removeItem(STORAGE_KEY);
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // Resend handler
  const handleResend = () => {
    toast.success("Verification link sent again! Check your inbox ✨");

    const expiry = Math.floor(Date.now() / 1000) + COOLDOWN;

    localStorage.setItem(STORAGE_KEY, expiry.toString());
    setTimer(COOLDOWN);
  };

  return (
    <>
      <Helmet>
        <title>Verify Email - {appName}</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center bg-[#0f0f0f] text-white px-4">
        <div className="max-w-lg w-full bg-[#1c1c1c] p-8 rounded-xl shadow-lg text-center space-y-6">
          <IoMailUnreadOutline className="mx-auto text-6xl text-[var(--owner)]" />

          <h1 className="text-3xl font-bold text-[var(--owner)]">
            Email Verification
          </h1>

          {user?.email_verified_at ? (
            <div className="space-y-3">
              <p className="text-green-400">Your email is already verified.</p>
              <a href="/dashboard" className={`${classMap.button()}`}>
                Go to Dashboard
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <p>
                A verification link was sent to:
                <strong className="block mt-1">{user?.email}</strong>
              </p>

              <p className="text-sm text-gray-400">Didn’t receive the email?</p>

              {timer === 0 ? (
                <SendRequest
                  url="/email/verification-notification"
                  method="post"
                  className="w-full"
                  text="Send Email"
                  onResponse={handleResend}
                />
              ) : (
                <button
                  disabled
                  className="w-full bg-gray-700 text-gray-400 px-5 py-2 rounded cursor-not-allowed"
                >
                  Resend in {timer}s
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
