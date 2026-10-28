import { useSyncExternalStore } from "react";
import { type Domain, getSignal, installBook, rankSignals, rewardRisk, signalsFor, type Signal } from "@/lib/tradfi/model";

export type LockedSetup = {
  id: string;
  signalId: string;
  domain: Domain;
  symbol: string;
  market: string;
  direction: "long" | "short";
  entry: number;
  tp: number;
  sl: number;
  decimals: number;
  rr: number;
  confidence: number;
  riskPct: number;
  equity: number;
  timeframe: string;
  thesis: string;
  lockedAt: number;
};

type View = "brain" | "signals" | "setup" | "dashboard" | "admin";

type DeskState = {
  view: View;
  domain: Domain | null;
  signalId: string | null;
  equity: number;
  riskPct: number;
  dailyStopPct: number;
  caps: Record<Domain, number>;
  locked: LockedSetup[];
  nudge: number;
  bookRev: number;
  setBook: (rows: Signal[]) => void;
  selectDomain: (domain: Domain) => void;
  start: () => void;
  openSignal: (id: string) => void;
  setRiskPct: (n: number) => void;
  setEquity: (n: number) => void;
  setDailyStop: (n: number) => void;
  setCap: (domain: Domain, n: number) => void;
  lockCurrent: () => void;
  removeLocked: (id: string) => void;
  go: (view: View) => void;
  poke: () => void;
};

const DEFAULT_CAPS: Record<Domain, number> = {
  futures: 2,
  forex: 1.5,
  degen: 0.5,
};

const KEY = "traderedge-desk";
const listeners = new Set<() => void>();

function clamp(n: number, min: number, max: number) {
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
}

function emit() {
  listeners.forEach((listener) => listener());
  try {
    const { equity, riskPct, dailyStopPct, caps, locked } = state;
    localStorage.setItem(KEY, JSON.stringify({ equity, riskPct, dailyStopPct, caps, locked }));
  } catch {
    /* private mode */
  }
}

function patch(partial: Partial<DeskState>) {
  state = { ...state, ...partial };
  emit();
}

const actions: Pick<
  DeskState,
  | "setBook"
  | "selectDomain"
  | "start"
  | "openSignal"
  | "setRiskPct"
  | "setEquity"
  | "setDailyStop"
  | "setCap"
  | "lockCurrent"
  | "removeLocked"
  | "go"
  | "poke"
> = {
  setBook: (rows) => {
    installBook(rows);
    patch({ bookRev: state.bookRev + 1 });
  },
  selectDomain: (domain) => patch({ domain }),
  poke: () => patch({ nudge: state.nudge + 1 }),
  start: () => {
    const domain = state.domain ?? "futures";
    const first = rankSignals(signalsFor(domain))[0];
    patch({ domain, view: "setup", signalId: first?.id ?? null });
  },
  openSignal: (id) => {
    const signal = getSignal(id);
    if (!signal) return;
    patch({ view: "setup", domain: signal.domain, signalId: signal.id });
  },
  setRiskPct: (n) => patch({ riskPct: clamp(n, 0.25, 3) }),
  setEquity: (n) => patch({ equity: clamp(n, 100, 100_000_000) }),
  setDailyStop: (n) => patch({ dailyStopPct: clamp(n, 0.5, 10) }),
  setCap: (domain, n) => patch({ caps: { ...state.caps, [domain]: clamp(n, 0.25, 3) } }),
  lockCurrent: () => {
    const { signalId, riskPct, equity, caps, locked } = state;
    const signal = getSignal(signalId);
    if (!signal) return;
    if (signal.status === "tp" || signal.status === "stop") return;
    if (locked.some((row) => row.signalId === signal.id)) return;
    const applied = Math.min(riskPct, caps[signal.domain]);
    const row: LockedSetup = {
      id: crypto.randomUUID(),
      signalId: signal.id,
      domain: signal.domain,
      symbol: signal.symbol,
      market: signal.market,
      direction: signal.direction,
      entry: signal.entry,
      tp: signal.tp,
      sl: signal.sl,
      decimals: signal.decimals,
      rr: rewardRisk(signal),
      confidence: signal.confidence,
      riskPct: applied,
      equity,
      timeframe: signal.timeframe,
      thesis: signal.thesis,
      lockedAt: Date.now(),
    };
    patch({ locked: [row, ...locked] });
  },
  removeLocked: (id) => patch({ locked: state.locked.filter((row) => row.id !== id) }),
  go: (view) => patch({ view }),
};

let state: DeskState = {
  view: "brain",
  domain: null,
  signalId: null,
  equity: 25000,
  riskPct: 1.25,
  dailyStopPct: 4,
  caps: DEFAULT_CAPS,
  locked: [],
  nudge: 0,
  bookRev: 0,
  ...actions,
};

function useDesk<T>(selector: (snapshot: DeskState) => T): T {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => selector(state),
    () => selector(state),
  );
}

useDesk.persist = {
  rehydrate() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<DeskState>;
      state = {
        ...state,
        equity: saved.equity ?? state.equity,
        riskPct: saved.riskPct ?? state.riskPct,
        dailyStopPct: saved.dailyStopPct ?? state.dailyStopPct,
        caps: saved.caps ?? state.caps,
        locked: saved.locked ?? state.locked,
      };
      emit();
    } catch {
      /* ignore bad cache */
    }
  },
};

export { useDesk };
