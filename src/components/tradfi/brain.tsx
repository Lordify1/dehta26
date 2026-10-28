import { useEffect, useState } from "react";
import { Foot, TopBar } from "@/components/tradfi/chrome";
import { DOMAINS, type Domain } from "@/lib/tradfi/model";
import { useDesk } from "@/lib/tradfi/store";

export function BrainScreen() {
  const domain = useDesk((s) => s.domain);
  const nudge = useDesk((s) => s.nudge);
  const selectDomain = useDesk((s) => s.selectDomain);
  const start = useDesk((s) => s.start);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (nudge === 0) return;
    setShake(true);
    const id = window.setTimeout(() => setShake(false), 460);
    return () => window.clearTimeout(id);
  }, [nudge]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const map: Record<string, Domain> = { "1": "futures", "2": "forex", "3": "degen" };
      const next = map[event.key];
      if (next) {
        selectDomain(next);
        return;
      }
      if (event.key === "Enter") start();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectDomain, start]);

  const armed = DOMAINS.find((item) => item.id === domain);
  const readyClass = ["panel", "ready", domain === "degen" ? "is-degen" : "", shake ? "shake" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className="screen">
      <TopBar />
      <div className="screen-body">
        <div className="title-row">
          <span className="pill">STATE 1</span>
          <h1 className="h-display">SELECT MODE</h1>
        </div>
        <p className="lede">Choose your trading domain.</p>

        <div className="brain-stage">
          <img className="brain-photo" src="/brain.jpg" alt="" draggable={false} />
          {domain ? <span className={`bloom bloom-${domain}`} /> : null}
          {DOMAINS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`lobe lobe-${item.id}`}
              aria-pressed={domain === item.id}
              onClick={() => selectDomain(item.id)}
            >
              {item.label}
            </button>
          ))}
          <button
            type="button"
            className={domain ? "start-btn is-armed" : "start-btn"}
            onClick={start}
          >
            START
          </button>
        </div>

        <div className={readyClass}>
          <span className="dot" aria-hidden="true" />
          <div>
            <h2>{armed ? armed.armed.toUpperCase() : "READY TO LAUNCH"}</h2>
            <p>{armed ? "START opens this trade setup." : "START opens the Futures setup. Pick a mode to switch it."}</p>
          </div>
        </div>
      </div>
      <Foot />
    </div>
  );
}
