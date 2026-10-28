import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Foot, TopBar } from "@/components/tradfi/chrome";
import { useCurrentUserState } from "@/lib/tradfi/session";
import { claimAdmin, deskAccess, myDashboard, type Dashboard } from "@/lib/tradfi/api";
import { formatQuote } from "@/lib/tradfi/quotes";
import { formatUsd } from "@/lib/tradfi/model";

const EMPTY: Dashboard = { taken: 0, open: 0, wins: 0, losses: 0, winRate: 0, netPnl: 0, rows: [] };

export function DashboardScreen() {
  const { user, isPending } = useCurrentUserState();
  const [data, setData] = useState<Dashboard>(EMPTY);
  const [note, setNote] = useState("");
  const [openSeat, setOpenSeat] = useState(false);
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    if (!user) return;
    let stop = false;
    const load = () => {
      void myDashboard()
        .then((next) => {
          if (!stop) setData(next);
        })
        .catch((error: unknown) => {
          if (!stop) setNote(error instanceof Error ? error.message : "Dashboard unavailable");
        });
      void deskAccess()
        .then((access) => {
          if (stop) return;
          setAdmin(access.admin);
          setOpenSeat(access.openSeat);
        })
        .catch(() => undefined);
    };
    load();
    const id = window.setInterval(load, 12000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [user]);

  return (
    <div className="screen">
      <TopBar />
      <div className="screen-body wide">
        <div className="title-row">
          <span className="pill">PERFORMANCE</span>
          <h1 className="h-display">DASHBOARD</h1>
        </div>
        <p className="lede">Every take is yours. The live tape closes it when price tags the target or the stop.</p>

        {isPending ? <p className="lede">Checking your desk…</p> : null}
        {!isPending && !user ? (
          <div className="panel ready">
            <div>
              <h2>SIGN IN TO TRACK</h2>
              <p>Signals you take stay on your account. Win, loss, and open P&L are marked from the live price.</p>
              <Link to="/login" className="nav-link is-active">
                Sign in
              </Link>
            </div>
          </div>
        ) : null}

        {user && openSeat && !admin ? (
          <button
            type="button"
            className="lock"
            onClick={() => {
              void claimAdmin()
                .then(() => {
                  setAdmin(true);
                  setOpenSeat(false);
                  setNote("You are the operator. Post signals from Admin.");
                })
                .catch((error: unknown) => setNote(error instanceof Error ? error.message : "Could not claim the desk"));
            }}
          >
            <span className="lock-copy">
              <strong>CLAIM THE DESK</strong>
              <p>No operator yet. Claiming lets you post signals for everyone.</p>
            </span>
          </button>
        ) : null}

        {user ? (
          <>
            <div className="dash-stats">
              <Stat label="TAKEN" value={String(data.taken)} />
              <Stat label="OPEN" value={String(data.open)} />
              <Stat label="WINS" value={String(data.wins)} />
              <Stat label="LOSSES" value={String(data.losses)} />
              <Stat label="WIN RATE" value={`${data.winRate.toFixed(0)}%`} />
              <Stat label="NET P&L" value={formatUsd(data.netPnl)} tone={data.netPnl >= 0 ? "up" : "dn"} />
            </div>
            {note ? <p className="cap-note">{note}</p> : null}
            <div className="take-list">
              {data.rows.length === 0 ? <p className="lede">No signals taken yet. Lock one on the setup screen.</p> : null}
              {data.rows.map((row) => (
                <article key={row.id} className="panel take-row">
                  <div>
                    <strong>{row.symbol}</strong>
                    <p>
                      {row.direction.toUpperCase()} · {row.domain}
                    </p>
                  </div>
                  <div>
                    <span>ENTRY</span>
                    <b>{formatQuote(row.entry, row.symbol)}</b>
                  </div>
                  <div>
                    <span>{row.outcome ? "EXIT" : "MARK"}</span>
                    <b>{formatQuote(row.outcome ? (row.exitPrice ?? row.entry) : (row.mark ?? row.entry), row.symbol)}</b>
                  </div>
                  <div>
                    <span>P&L</span>
                    <b className={row.pnlUsd >= 0 ? "quote-up" : "quote-dn"}>{formatUsd(row.pnlUsd)}</b>
                  </div>
                  <span className={row.outcome === "win" ? "pill" : row.outcome === "loss" ? "pill is-stop" : "pill"}>
                    {row.outcome === "win" ? "PROFIT" : row.outcome === "loss" ? "LOSS" : "OPEN"}
                  </span>
                </article>
              ))}
            </div>
          </>
        ) : null}
      </div>
      <Foot />
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "up" | "dn" }) {
  return (
    <div className="panel dash-stat">
      <span>{label}</span>
      <b className={tone === "up" ? "quote-up" : tone === "dn" ? "quote-dn" : undefined}>{value}</b>
    </div>
  );
}
