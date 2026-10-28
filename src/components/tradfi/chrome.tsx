import { Link } from "react-router-dom";
import { useEffect, useState, type ReactNode } from "react";
import { DeskAccount, useCurrentUserState } from "@/lib/tradfi/session";
import { getQuotes } from "@/lib/tradfi/api";
import { formatQuote, type Quote } from "@/lib/tradfi/quotes";
import { useDesk } from "@/lib/tradfi/store";

export function TopBar({ trailing }: { trailing?: ReactNode }) {
  const go = useDesk((s) => s.go);
  const view = useDesk((s) => s.view);
  const { user, isPending } = useCurrentUserState();

  return (
    <header className="topbar">
      <button type="button" className="modes-btn" onClick={() => go("brain")}>
        Modes
      </button>
      <Watchlist />
      <nav className="nav" aria-label="Desk">
        <button
          type="button"
          className={view === "dashboard" ? "nav-link is-active" : "nav-link"}
          onClick={() => go("dashboard")}
        >
          Dashboard
        </button>
        <button
          type="button"
          className={view === "admin" ? "nav-link is-active" : "nav-link"}
          onClick={() => go("admin")}
        >
          Admin
        </button>
        {trailing}
        {isPending ? <span className="acct-skel" /> : user ? <span className="account-slot"><DeskAccount /></span> : <Link to="/login" className="nav-link">Sign in</Link>}
      </nav>
    </header>
  );
}

function Watchlist() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [down, setDown] = useState(false);

  useEffect(() => {
    let stop = false;
    const load = () => {
      void getQuotes()
        .then((rows) => {
          if (stop) return;
          setQuotes(rows);
          setDown(rows.length === 0);
        })
        .catch(() => {
          if (!stop) setDown(true);
        });
    };
    load();
    const id = window.setInterval(load, 8000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="watchlist" aria-label="Live watchlist">
      {quotes.length === 0 ? (
        <span className="quote-wait">{down ? "Feed delayed" : "Connecting tape…"}</span>
      ) : (
        quotes.map((quote) => {
          const up = (quote.changePct ?? 0) >= 0;
          return (
            <span key={quote.symbol} className="quote-chip">
              <span className="quote-sym">{quote.symbol}</span>
              <span className="quote-px">
                {formatQuote(quote.price, quote.symbol)}
                {quote.changePct == null ? null : (
                  <span className={up ? "quote-up" : "quote-dn"}>
                    {" "}
                    {up ? "+" : ""}
                    {quote.changePct.toFixed(2)}%
                  </span>
                )}
              </span>
            </span>
          );
        })
      )}
    </div>
  );
}

export function Foot() {
  return (
    <footer className="foot">
      <div>
        <div className="tagline">LIVE TAPE. OPERATOR SIGNALS. YOUR P&L.</div>
        <span className="foot-rule" />
        <p className="disclaimer">
          Coin and forex prices are live. Signals are posted by the desk operator. Not financial advice.
        </p>
      </div>
    </footer>
  );
}
