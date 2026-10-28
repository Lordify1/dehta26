import { Link } from "react-router-dom";
import { ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { Foot, TopBar } from "@/components/tradfi/chrome";
import {
  DOMAINS,
  formatPct,
  formatRr,
  formatUnits,
  formatUsd,
  getSignal,
  impliedLeverage,
  notionalUsd,
  rankSignals,
  rewardRisk,
  riskCash,
  signalsFor,
  unitSize,
  type Domain,
} from "@/lib/tradfi/model";
import { useCurrentUserState } from "@/lib/tradfi/session";
import { myDashboard, releaseTake, takeSignal } from "@/lib/tradfi/api";
import { useDesk } from "@/lib/tradfi/store";

export function SetupScreen() {
  const signalId = useDesk((s) => s.signalId);
  const equity = useDesk((s) => s.equity);
  const riskPct = useDesk((s) => s.riskPct);
  const caps = useDesk((s) => s.caps);
  const dailyStopPct = useDesk((s) => s.dailyStopPct);
  const openSignal = useDesk((s) => s.openSignal);
  const selectDomain = useDesk((s) => s.selectDomain);
  const setRiskPct = useDesk((s) => s.setRiskPct);
  const go = useDesk((s) => s.go);
  const bookRev = useDesk((s) => s.bookRev);
  const { user } = useCurrentUserState();
  const [openTake, setOpenTake] = useState<string | null>(null);
  const [takeNote, setTakeNote] = useState("");

  const signal = getSignal(signalId);

  useEffect(() => {
    if (!signal) go("brain");
  }, [signal, go]);

  useEffect(() => {
    if (!signal) return;
    const list = signalsFor(signal.domain);
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      const index = list.findIndex((item) => item.id === signal.id);
      if (event.key === "ArrowRight") {
        openSignal(list[(index + 1) % list.length]!.id);
      } else if (event.key === "ArrowLeft") {
        openSignal(list[(index - 1 + list.length) % list.length]!.id);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [signal, openSignal]);

  useEffect(() => {
    if (!user || !signal) {
      setOpenTake(null);
      return;
    }
    let stop = false;
    void myDashboard()
      .then((dash) => {
        if (stop) return;
        const row = dash.rows.find((item) => item.signalId === signal.id && item.outcome == null);
        setOpenTake(row?.id ?? null);
      })
      .catch(() => undefined);
    return () => {
      stop = true;
    };
  }, [user, signal, bookRev]);

  if (!signal) return null;

  const cap = caps[signal.domain];
  const applied = Math.min(riskPct, cap);
  const capped = riskPct - cap > 0.001;
  const rr = rewardRisk(signal);
  const units = unitSize(signal, equity, applied);
  const cash = riskCash(equity, applied);
  const notional = notionalUsd(signal, units);
  const leverage = impliedLeverage(notional, equity);
  const existing = openTake;
  const closed = signal.status === "tp" || signal.status === "stop";
  const book = signalsFor(signal.domain);
  const stopTight = applied > dailyStopPct + 0.001;

  return (
    <div className="screen">
      <TopBar />
      <div className="screen-body wide">
        <div className="title-row">
          <span className="pill">STATE 2</span>
          <h1 className="h-display">TRADE SETUP</h1>
        </div>
        <p className="lede">Configure your risk. Trade with precision.</p>

        <div className="setup-grid">
          <div className="area-radar">
            <Radar />
          </div>

          <article className="panel instrument area-instrument">
            <div>
              <h2>{signal.symbol}</h2>
              <p className="pair-sub">{DOMAINS.find((item) => item.id === signal.domain)?.label}</p>
            </div>
            <DomainMark domain={signal.domain} />
          </article>

          <div className="area-stats">
            <div className="panel stats">
              <div className="stat-row">
                <span>RISK / REWARD</span>
                <b>{formatRr(rr)}</b>
              </div>
              <div className="stat-row">
                <span>POSITION SIZE</span>
                <b>{formatPct(applied)}</b>
              </div>
              <div className="stat-row">
                <span>CONFIDENCE</span>
                <b>{signal.confidence}%</b>
              </div>
            </div>

            <label className="slider-label">
              Risk allocation
              <input
                className="slider"
                type="range"
                min={0.25}
                max={cap}
                step={0.05}
                value={applied}
                aria-valuetext={formatPct(applied)}
                onChange={(event) => setRiskPct(Number(event.target.value))}
              />
            </label>
            <p className="size-line">
              <span>
                Size <strong>{formatUnits(units)} {signal.sizeLabel}</strong>
              </span>
              <span>
                Risk <strong>{formatUsd(cash)}</strong>
              </span>
              <span>
                Notional <strong>{formatUsd(notional)}</strong>
              </span>
              {signal.domain === "degen" ? (
                <span>
                  Implied <strong>{leverage.toFixed(1)}×</strong>
                </span>
              ) : null}
            </p>
            {capped ? (
              <p className="cap-note">
                {signal.market} cap {formatPct(cap)} is binding.
              </p>
            ) : null}
            {stopTight ? (
              <p className="cap-note">This ticket pushes today past the {formatPct(dailyStopPct)} daily stop.</p>
            ) : null}
          </div>
        </div>

        {closed ? (
          <div className="lock" role="status">
            <ShieldCheck className="lock-ico" strokeWidth={1.5} aria-hidden="true" />
            <div className="lock-copy">
              <strong>{signal.status === "tp" ? "TARGET HIT" : "STOPPED OUT"}</strong>
              <p>This call is closed. It stays on the tape as a record.</p>
            </div>
          </div>
        ) : existing ? (
          <div className="lock" role="status">
            <ShieldCheck className="lock-ico" strokeWidth={1.5} aria-hidden="true" />
            <div className="lock-copy">
              <strong>SETUP LOCKED IN</strong>
              <p>Manage risk. Protect capital. Stay disciplined.</p>
            </div>
            <button type="button" className="release" onClick={() => {
              void releaseTake({ data: existing }).then(() => setOpenTake(null));
            }}>
              Release
            </button>
          </div>
        ) : user ? (
          <button
            type="button"
            className="lock"
            onClick={() => {
              setTakeNote("");
              void takeSignal({ data: { signalId: signal.id, riskPct: applied, equity } })
                .then((row) => setOpenTake(row.id))
                .catch((error: unknown) => setTakeNote(error instanceof Error ? error.message : "Could not take this signal"));
            }}
          >
            <ShieldCheck className="lock-ico" strokeWidth={1.5} aria-hidden="true" />
            <div className="lock-copy">
              <strong>LOCK SETUP</strong>
              <p>{takeNote || "Manage risk. Protect capital. Stay disciplined."}</p>
            </div>
          </button>
        ) : (
          <Link to="/login" className="lock">
            <ShieldCheck className="lock-ico" strokeWidth={1.5} aria-hidden="true" />
            <div className="lock-copy">
              <strong>SIGN IN TO TAKE IT</strong>
              <p>Your dashboard records the take and marks profit or loss from the live price.</p>
            </div>
          </Link>
        )}

        <div className="tape" role="tablist" aria-label="Signal domain">
          {DOMAINS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              aria-selected={item.id === signal.domain}
              aria-pressed={item.id === signal.domain}
              onClick={() => openDomain(item.id)}
            >
              <span className="sym">{item.label}</span>
            </button>
          ))}
        </div>

        <div className="tape" role="listbox" aria-label={`${signal.market} signals`}>
          {book.map((item) => (
            <button
              key={item.id}
              type="button"
              className="chip"
              role="option"
              aria-selected={item.id === signal.id}
              aria-pressed={item.id === signal.id}
              onClick={() => openSignal(item.id)}
            >
              <span className="sym">{item.symbol}</span>
              <span className={item.direction === "long" ? "dir dir-long" : "dir dir-short"}>
                {item.direction === "long" ? "LONG" : "SHORT"}
              </span>
            </button>
          ))}
        </div>
      </div>
      <Foot />
    </div>
  );

  function openDomain(id: Domain) {
    const first = rankSignals(signalsFor(id))[0];
    if (first) openSignal(first.id);
    else selectDomain(id);
  }
}

function Radar() {
  return (
    <div className="radar-wrap">
      <div className="radar-visual">
        <div className="radar-disc">
          <div className="sweep" />
        </div>
        <span className="ring ring-a" />
        <span className="ring ring-b" />
        <span className="ring ring-c" />
        <span className="spoke spoke-tp" />
        <span className="spoke spoke-sl" />
        <span className="node node-tp">
          <ArrowUp />
        </span>
        <span className="node node-sl">
          <ArrowDown />
        </span>
        <div className="entry-node">
          <span className="entry-kicker">ENTRY</span>
        </div>
        <article className="panel mini-card float-tp">
          <p className="mini-kicker tp">TP</p>
          <p className="mini-name">TAKE PROFIT</p>
        </article>
        <article className="panel mini-card float-sl">
          <p className="mini-kicker sl">SL</p>
          <p className="mini-name">STOP LOSS</p>
        </article>
      </div>
    </div>
  );
}

function DomainMark({ domain }: { domain: "futures" | "forex" | "degen" }) {
  if (domain === "forex") {
    return (
      <svg className="mark-icon" viewBox="0 0 48 32" aria-hidden="true">
        <circle cx="18" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="30" cy="16" r="10" fill="none" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (domain === "futures") {
    return (
      <svg className="mark-icon" viewBox="0 0 48 32" aria-hidden="true">
        <path d="M10 22V14" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M10 16h5v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M22 22V8" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M17 10h5v8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M34 22V12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M34 14h5v6" fill="none" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    );
  }
  return (
    <svg className="mark-icon" viewBox="0 0 48 32" aria-hidden="true">
      <path
        d="M24 3.5 28.2 14H38l-8 6.1 3 10.4L24 24.6 15 30.5l3-10.4-8-6.1h9.8L24 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowUp() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 18V6M12 6l-5 5M12 6l5 5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ArrowDown() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 6v12M12 18l-5-5M12 18l5-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

