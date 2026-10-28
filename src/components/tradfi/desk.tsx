import { useEffect } from "react";
import { AdminScreen } from "@/components/tradfi/admin";
import { BrainScreen } from "@/components/tradfi/brain";
import { DashboardScreen } from "@/components/tradfi/dashboard";
import { SetupScreen } from "@/components/tradfi/setup";
import { SignalsScreen } from "@/components/tradfi/signals";
import { listSignals } from "@/lib/tradfi/api";
import { useDesk } from "@/lib/tradfi/store";

export function Desk() {
  const view = useDesk((s) => s.view);
  const setBook = useDesk((s) => s.setBook);

  useEffect(() => {
    void useDesk.persist.rehydrate();
  }, []);

  useEffect(() => {
    let stop = false;
    const load = () => {
      void listSignals()
        .then((rows) => {
          if (!stop) setBook(rows);
        })
        .catch(() => undefined);
    };
    load();
    const id = window.setInterval(load, 12000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [setBook]);

  return (
    <div className="app-root">
      {view === "brain" && <BrainScreen />}
      {view === "signals" && <SignalsScreen />}
      {view === "setup" && <SetupScreen />}
      {view === "dashboard" && <DashboardScreen />}
      {view === "admin" && <AdminScreen />}
    </div>
  );
}
