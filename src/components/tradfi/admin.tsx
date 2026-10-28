import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Foot, TopBar } from "@/components/tradfi/chrome";
import { useCurrentUserState } from "@/lib/tradfi/session";
import { claimAdmin, deskAccess, listSignals, retireSignal, saveSignal, type SignalDraft } from "@/lib/tradfi/api";
import { DOMAINS, type Domain, type Signal, type SignalStatus } from "@/lib/tradfi/model";
import { useDesk } from "@/lib/tradfi/store";

const FUTURES = ["BTC/USD", "ETH/USD", "SOL/USD"];
const FOREX = ["EURUSD", "GBPUSD", "USDJPY", "AUDUSD", "USDCAD", "NZDUSD", "XAUUSD"];

const BLANK: SignalDraft = {
  domain: "futures",
  symbol: "BTC/USD",
  direction: "long",
  entry: 0,
  tp: 0,
  sl: 0,
  confidence: 70,
  timeframe: "1H",
  thesis: "",
  status: "live",
};

export function AdminScreen() {
  const { user, isPending } = useCurrentUserState();
  const setBook = useDesk((s) => s.setBook);
  const [admin, setAdmin] = useState(false);
  const [openSeat, setOpenSeat] = useState(false);
  const [rows, setRows] = useState<Signal[]>([]);
  const [draft, setDraft] = useState<SignalDraft>(BLANK);
  const [note, setNote] = useState("");

  async function refresh() {
    const next = await listSignals();
    setRows(next);
    setBook(next);
  }

  useEffect(() => {
    if (!user) return;
    let stop = false;
    const load = () => {
      void deskAccess()
        .then((access) => {
          if (stop) return;
          setAdmin(access.admin);
          setOpenSeat(access.openSeat);
        })
        .catch(() => undefined);
      void refresh().catch(() => undefined);
    };
    load();
    const id = window.setInterval(load, 15000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, [user]);

  const symbols = draft.domain === "futures" ? FUTURES : draft.domain === "forex" ? FOREX : [];

  return (
    <div className="screen">
      <TopBar />
      <div className="screen-body wide">
        <div className="title-row">
          <span className="pill">OPERATOR</span>
          <h1 className="h-display">ADMIN</h1>
        </div>
        <p className="lede">Post a signal here. The desk picks it up on the next refresh.</p>

        {isPending ? <p className="lede">Checking access…</p> : null}
        {!isPending && !user ? (
          <div className="panel ready">
            <div>
              <h2>SIGN IN TO POST</h2>
              <p>The operator desk is per account. The first person to claim it posts the signals everyone sees.</p>
              <Link to="/login" className="nav-link is-active">
                Sign in
              </Link>
            </div>
          </div>
        ) : null}

        {user && !admin && openSeat ? (
          <button
            type="button"
            className="lock"
            onClick={() => {
              void claimAdmin()
                .then(() => {
                  setAdmin(true);
                  setOpenSeat(false);
                })
                .catch((error: unknown) => setNote(error instanceof Error ? error.message : "Could not claim"));
            }}
          >
            <span className="lock-copy">
              <strong>CLAIM THE DESK</strong>
              <p>The first operator owns signal posting.</p>
            </span>
          </button>
        ) : null}

        {user && !admin && !openSeat ? <p className="lede">This desk already has an operator.</p> : null}

        {admin ? (
          <>
            <form
              className="panel admin-form"
              onSubmit={(event) => {
                event.preventDefault();
                setNote("");
                void saveSignal({ data: draft })
                  .then(() => refresh())
                  .then(() => {
                    setDraft({ ...BLANK, domain: draft.domain, symbol: draft.domain === "futures" ? "BTC/USD" : "" });
                    setNote("Signal is live on the desk.");
                  })
                  .catch((error: unknown) => setNote(error instanceof Error ? error.message : "Could not save"));
              }}
            >
              <label className="field">
                Domain
                <select
                  value={draft.domain}
                  onChange={(event) => {
                    const domain = event.target.value as Domain;
                    const symbol = domain === "futures" ? "BTC/USD" : domain === "forex" ? "EURUSD" : "";
                    setDraft({ ...draft, domain, symbol, id: undefined });
                  }}
                >
                  {DOMAINS.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>
              <label className="field">
                Symbol
                {draft.domain === "degen" ? (
                  <input
                    value={draft.symbol}
                    onChange={(event) => setDraft({ ...draft, symbol: event.target.value.toUpperCase(), id: undefined })}
                    placeholder="PEPE"
                  />
                ) : (
                  <select
                    value={draft.symbol}
                    onChange={(event) => setDraft({ ...draft, symbol: event.target.value, id: undefined })}
                  >
                    {symbols.map((symbol) => (
                      <option key={symbol} value={symbol}>
                        {symbol}
                      </option>
                    ))}
                  </select>
                )}
              </label>
              <label className="field">
                Direction
                <select
                  value={draft.direction}
                  onChange={(event) => setDraft({ ...draft, direction: event.target.value as SignalDraft["direction"] })}
                >
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
              </label>
              <label className="field">
                Status
                <select
                  value={draft.status}
                  onChange={(event) => setDraft({ ...draft, status: event.target.value as SignalStatus })}
                >
                  <option value="live">Live</option>
                  <option value="watching">Watching</option>
                  <option value="tp">Target hit</option>
                  <option value="stop">Stopped</option>
                </select>
              </label>
              <label className="field">
                Entry
                <input
                  inputMode="decimal"
                  value={draft.entry || ""}
                  onChange={(event) => setDraft({ ...draft, entry: Number(event.target.value) })}
                />
              </label>
              <label className="field">
                Take profit
                <input
                  inputMode="decimal"
                  value={draft.tp || ""}
                  onChange={(event) => setDraft({ ...draft, tp: Number(event.target.value) })}
                />
              </label>
              <label className="field">
                Stop
                <input
                  inputMode="decimal"
                  value={draft.sl || ""}
                  onChange={(event) => setDraft({ ...draft, sl: Number(event.target.value) })}
                />
              </label>
              <label className="field">
                Confidence
                <input
                  inputMode="numeric"
                  value={draft.confidence}
                  onChange={(event) => setDraft({ ...draft, confidence: Number(event.target.value) })}
                />
              </label>
              <label className="field">
                Timeframe
                <input value={draft.timeframe} onChange={(event) => setDraft({ ...draft, timeframe: event.target.value })} />
              </label>
              <label className="field field-wide">
                Note
                <textarea
                  rows={3}
                  value={draft.thesis}
                  onChange={(event) => setDraft({ ...draft, thesis: event.target.value })}
                />
              </label>
              <button type="submit" className="lock">
                <span className="lock-copy">
                  <strong>{draft.id ? "UPDATE SIGNAL" : "POST SIGNAL"}</strong>
                  <p>It shows up on Modes as soon as the desk refreshes.</p>
                </span>
              </button>
            </form>
            {note ? <p className="cap-note">{note}</p> : null}
            <div className="take-list">
              {rows.map((row) => (
                <article key={row.id} className="panel take-row">
                  <div>
                    <strong>{row.symbol}</strong>
                    <p>
                      {row.domain} · {row.direction.toUpperCase()} · {row.status}
                    </p>
                  </div>
                  <div>
                    <span>ENTRY</span>
                    <b>{row.entry}</b>
                  </div>
                  <div>
                    <span>TP / SL</span>
                    <b>
                      {row.tp} / {row.sl}
                    </b>
                  </div>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() =>
                      setDraft({
                        id: row.id,
                        domain: row.domain,
                        symbol: row.symbol,
                        direction: row.direction,
                        entry: row.entry,
                        tp: row.tp,
                        sl: row.sl,
                        confidence: row.confidence,
                        timeframe: row.timeframe,
                        thesis: row.thesis,
                        status: row.status,
                      })
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="text-btn"
                    onClick={() => {
                      void retireSignal({ data: row.id })
                        .then(() => refresh())
                        .catch((error: unknown) => setNote(error instanceof Error ? error.message : "Could not pull"));
                    }}
                  >
                    Pull
                  </button>
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
