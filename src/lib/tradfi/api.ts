import { SIGNALS, type Domain, type Direction, type Signal, type SignalStatus } from "@/lib/tradfi/model";
import { quoteSymbol, type Quote } from "@/lib/tradfi/quotes";

export type TakeView = {
  id: string;
  signalId: string;
  symbol: string;
  domain: Domain;
  direction: Direction;
  entry: number;
  tp: number;
  sl: number;
  decimals: number;
  riskPct: number;
  equity: number;
  takenAt: string;
  outcome: "win" | "loss" | null;
  exitPrice: number | null;
  pnlUsd: number;
  mark: number | null;
};

export type Dashboard = {
  taken: number;
  open: number;
  wins: number;
  losses: number;
  winRate: number;
  netPnl: number;
  rows: TakeView[];
};

export type SignalDraft = {
  id?: string;
  domain: Domain;
  symbol: string;
  direction: Direction;
  entry: number;
  tp: number;
  sl: number;
  confidence: number;
  timeframe: string;
  thesis: string;
  status: SignalStatus;
};

const FUTURES = ["BTC/USD", "ETH/USD", "SOL/USD"] as const;
const BOOK_KEY = "dehta-tradfi-book";
const TAKE_KEY = "dehta-tradfi-takes";
const ADMIN_KEY = "dehta-tradfi-admin";

type TakeRow = {
  id: string;
  userId: string;
  signalId: string;
  symbol: string;
  domain: Domain;
  direction: Direction;
  entry: number;
  tp: number;
  sl: number;
  decimals: number;
  riskPct: number;
  equity: number;
  dollarsPerUnit: number;
  takenAt: string;
  outcome: "win" | "loss" | null;
  exitPrice: number | null;
};

function num(value: unknown) {
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function uid() {
  return localStorage.getItem("dehta-tradfi-uid") || "";
}

function readBook(): Signal[] {
  const rows = readJson<Signal[] | null>(BOOK_KEY, null);
  return rows && rows.length ? rows : SIGNALS.map((row) => ({ ...row }));
}

function writeBook(rows: Signal[]) {
  localStorage.setItem(BOOK_KEY, JSON.stringify(rows));
}

function readTakes(): TakeRow[] {
  return readJson<TakeRow[]>(TAKE_KEY, []);
}

function writeTakes(rows: TakeRow[]) {
  localStorage.setItem(TAKE_KEY, JSON.stringify(rows));
}

function specFor(domain: Domain, symbol: string, entry: number) {
  const known: Record<string, { decimals: number; dollarsPerUnit: number; sizeLabel: string; market: string; notional: number }> = {
    "BTC/USD": { decimals: 2, dollarsPerUnit: 1, sizeLabel: "BTC", market: "Futures", notional: entry },
    "ETH/USD": { decimals: 2, dollarsPerUnit: 1, sizeLabel: "ETH", market: "Futures", notional: entry },
    "SOL/USD": { decimals: 2, dollarsPerUnit: 1, sizeLabel: "SOL", market: "Futures", notional: entry },
    EURUSD: { decimals: 5, dollarsPerUnit: 100000, sizeLabel: "lots", market: "Forex", notional: 100000 * entry },
    GBPUSD: { decimals: 5, dollarsPerUnit: 100000, sizeLabel: "lots", market: "Forex", notional: 100000 * entry },
    AUDUSD: { decimals: 5, dollarsPerUnit: 100000, sizeLabel: "lots", market: "Forex", notional: 100000 * entry },
    NZDUSD: { decimals: 5, dollarsPerUnit: 100000, sizeLabel: "lots", market: "Forex", notional: 100000 * entry },
    USDJPY: { decimals: 3, dollarsPerUnit: 100000 / Math.max(entry, 1), sizeLabel: "lots", market: "Forex", notional: 100000 },
    USDCAD: { decimals: 5, dollarsPerUnit: 100000, sizeLabel: "lots", market: "Forex", notional: 100000 },
    XAUUSD: { decimals: 2, dollarsPerUnit: 1, sizeLabel: "oz", market: "Forex", notional: entry },
  };
  const hit = known[symbol];
  if (hit) return hit;
  if (domain === "futures") throw new Error("Futures signals are only BTC/USD, ETH/USD, and SOL/USD.");
  const decimals = entry >= 100 ? 2 : entry >= 1 ? 4 : 8;
  return { decimals, dollarsPerUnit: 1, sizeLabel: symbol, market: domain === "forex" ? "Forex" : "Perp", notional: entry };
}

function parseDraft(input: unknown): SignalDraft {
  if (!input || typeof input !== "object") throw new Error("Missing signal");
  const row = input as Record<string, unknown>;
  const domain = row.domain;
  const direction = row.direction;
  const status = row.status;
  if (domain !== "futures" && domain !== "forex" && domain !== "degen") throw new Error("Pick a domain");
  if (direction !== "long" && direction !== "short") throw new Error("Pick a direction");
  if (status !== "live" && status !== "watching" && status !== "tp" && status !== "stop") throw new Error("Pick a status");
  const symbol = String(row.symbol ?? "").trim().toUpperCase().replace(/\s/g, "");
  if (!symbol) throw new Error("Symbol is required");
  if (domain === "futures" && !FUTURES.includes(symbol as (typeof FUTURES)[number])) {
    throw new Error("Futures signals are only BTC/USD, ETH/USD, and SOL/USD.");
  }
  const entry = num(row.entry);
  const tp = num(row.tp);
  const sl = num(row.sl);
  const confidence = Math.round(num(row.confidence));
  if (entry <= 0 || tp <= 0 || sl <= 0) throw new Error("Entry, target, and stop must be prices");
  if (Math.abs(entry - sl) === 0) throw new Error("Stop cannot sit on the entry");
  if (confidence < 1 || confidence > 99) throw new Error("Confidence is 1 to 99");
  const thesis = String(row.thesis ?? "").trim();
  if (thesis.length < 8) throw new Error("Add a short note so the desk knows why");
  return {
    id: typeof row.id === "string" && row.id ? row.id : undefined,
    domain,
    symbol,
    direction,
    entry,
    tp,
    sl,
    confidence,
    timeframe: String(row.timeframe ?? "1H").trim() || "1H",
    thesis,
    status,
  };
}

let cachedQuotes: Quote[] = [];
let cachedAt = 0;
const sessionOpen = new Map<string, number>();

function stamp(rows: Quote[]) {
  return rows.map((row) => {
    if (row.changePct != null) return row;
    const open = sessionOpen.get(row.symbol);
    if (open == null) {
      sessionOpen.set(row.symbol, row.price);
      return { ...row, changePct: 0 };
    }
    return { ...row, changePct: ((row.price - open) / open) * 100 };
  });
}

async function krakenCrypto(): Promise<Quote[]> {
  const res = await fetch("https://api.kraken.com/0/public/Ticker?pair=XBTUSD,ETHUSD,SOLUSD");
  if (!res.ok) throw new Error("crypto feed down");
  const body = (await res.json()) as { result?: Record<string, { c?: string[]; o?: string }> };
  const result = body.result ?? {};
  const want = [
    { symbol: "BTC/USD", test: (key: string) => key.includes("XBT") },
    { symbol: "ETH/USD", test: (key: string) => key.includes("ETH") },
    { symbol: "SOL/USD", test: (key: string) => key.includes("SOL") },
  ];
  const out: Quote[] = [];
  for (const item of want) {
    const key = Object.keys(result).find(item.test);
    if (!key) continue;
    const last = num(result[key]?.c?.[0]);
    const open = num(result[key]?.o);
    if (last <= 0) continue;
    out.push({
      symbol: item.symbol,
      price: last,
      changePct: open > 0 ? ((last - open) / open) * 100 : null,
      kind: "crypto",
    });
  }
  return out;
}

async function forexQuotes(): Promise<Quote[]> {
  const res = await fetch("https://api.frankfurter.dev/v1/latest?from=USD&to=EUR,GBP,JPY,AUD,CAD,NZD");
  if (!res.ok) return [];
  const body = (await res.json()) as { rates?: Record<string, number> };
  const rates = body.rates ?? {};
  const out: Quote[] = [];
  const push = (symbol: string, price: number) => {
    if (price > 0) out.push({ symbol, price, changePct: null, kind: "forex" });
  };
  if (rates.EUR) push("EUR/USD", 1 / rates.EUR);
  if (rates.GBP) push("GBP/USD", 1 / rates.GBP);
  if (rates.JPY) push("USD/JPY", rates.JPY);
  if (rates.AUD) push("AUD/USD", 1 / rates.AUD);
  if (rates.CAD) push("USD/CAD", rates.CAD);
  if (rates.NZD) push("NZD/USD", 1 / rates.NZD);
  return out;
}

async function loadQuotes() {
  if (Date.now() - cachedAt < 5000 && cachedQuotes.length > 0) return cachedQuotes;
  const [crypto, forex] = await Promise.allSettled([krakenCrypto(), forexQuotes()]);
  const rows = [
    ...(crypto.status === "fulfilled" ? crypto.value : []),
    ...(forex.status === "fulfilled" ? forex.value : []),
  ];
  if (rows.length > 0) {
    cachedQuotes = stamp(rows);
    cachedAt = Date.now();
  }
  return cachedQuotes;
}

function markOf(symbol: string, quotes: Quote[]) {
  const key = quoteSymbol(symbol);
  if (!key) return null;
  return quotes.find((quote) => quote.symbol === key)?.price ?? null;
}

function unitsOf(entry: number, sl: number, equity: number, riskPct: number, dollarsPerUnit: number) {
  const stop = Math.abs(entry - sl);
  if (stop === 0 || dollarsPerUnit === 0) return 0;
  return (equity * (riskPct / 100)) / (stop * dollarsPerUnit);
}

function pnlOf(direction: Direction, entry: number, exit: number, units: number, dollarsPerUnit: number) {
  const move = direction === "long" ? exit - entry : entry - exit;
  return move * dollarsPerUnit * units;
}

function present(row: TakeRow, mark: number | null): TakeView {
  const units = unitsOf(row.entry, row.sl, row.equity, row.riskPct, row.dollarsPerUnit);
  const exitPrice = row.exitPrice;
  const pnl =
    row.outcome && exitPrice != null
      ? pnlOf(row.direction, row.entry, exitPrice, units, row.dollarsPerUnit)
      : mark != null
        ? pnlOf(row.direction, row.entry, mark, units, row.dollarsPerUnit)
        : 0;
  return {
    id: row.id,
    signalId: row.signalId,
    symbol: row.symbol,
    domain: row.domain,
    direction: row.direction,
    entry: row.entry,
    tp: row.tp,
    sl: row.sl,
    decimals: row.decimals,
    riskPct: row.riskPct,
    equity: row.equity,
    takenAt: row.takenAt,
    outcome: row.outcome,
    exitPrice,
    pnlUsd: pnl,
    mark,
  };
}

function requireUser() {
  const id = uid();
  if (!id) throw new Error("Sign in to use the desk");
  return id;
}

export async function getQuotes() {
  return loadQuotes();
}

export async function listSignals() {
  return readBook();
}

export async function deskAccess() {
  const me = uid();
  const admin = localStorage.getItem(ADMIN_KEY);
  return { admin: Boolean(me) && admin === me, openSeat: !admin };
}

export async function claimAdmin() {
  const me = requireUser();
  const admin = localStorage.getItem(ADMIN_KEY);
  if (admin && admin !== me) throw new Error("This desk already has an operator");
  localStorage.setItem(ADMIN_KEY, me);
  return { admin: true };
}

export async function saveSignal(input: SignalDraft) {
  const me = requireUser();
  if (localStorage.getItem(ADMIN_KEY) !== me) throw new Error("Only the operator can post signals");
  const data = parseDraft(input);
  const spec = specFor(data.domain, data.symbol, data.entry);
  const id = data.id ?? `${data.domain}-${data.symbol.toLowerCase().replace(/[^a-z0-9]+/g, "")}-${Date.now().toString(36)}`;
  const book = readBook().filter((row) => row.id !== id);
  const next: Signal = {
    id,
    domain: data.domain,
    symbol: data.symbol,
    market: spec.market,
    direction: data.direction,
    entry: data.entry,
    tp: data.tp,
    sl: data.sl,
    confidence: data.confidence,
    timeframe: data.timeframe,
    session: "UTC",
    thesis: data.thesis,
    decimals: spec.decimals,
    sizeLabel: spec.sizeLabel,
    dollarsPerUnit: spec.dollarsPerUnit,
    notionalPerUnit: spec.notional,
    status: data.status,
    ageMin: 0,
    trigger: "Manual",
  };
  writeBook([next, ...book]);
  return { id };
}

export async function retireSignal(id: string) {
  const me = requireUser();
  if (!id) throw new Error("Missing signal");
  if (localStorage.getItem(ADMIN_KEY) !== me) throw new Error("Only the operator can pull a signal");
  writeBook(readBook().filter((row) => row.id !== id));
  return { id };
}

export async function takeSignal(input: { signalId: string; riskPct: number; equity: number }) {
  const me = requireUser();
  const signal = readBook().find((row) => row.id === input.signalId);
  if (!signal) throw new Error("That signal is no longer on the desk");
  if (signal.status === "tp" || signal.status === "stop") throw new Error("That call is already closed");
  const riskPct = num(input.riskPct);
  const equity = num(input.equity);
  if (riskPct <= 0 || equity <= 0) throw new Error("Set equity and risk before you take it");
  const takes = readTakes();
  const open = takes.find((row) => row.userId === me && row.signalId === signal.id && row.outcome == null);
  if (open) return { id: open.id };
  const id = crypto.randomUUID();
  takes.unshift({
    id,
    userId: me,
    signalId: signal.id,
    symbol: signal.symbol,
    domain: signal.domain,
    direction: signal.direction,
    entry: signal.entry,
    tp: signal.tp,
    sl: signal.sl,
    decimals: signal.decimals,
    riskPct,
    equity,
    dollarsPerUnit: signal.dollarsPerUnit,
    takenAt: new Date().toISOString(),
    outcome: null,
    exitPrice: null,
  });
  writeTakes(takes);
  return { id };
}

export async function releaseTake(id: string) {
  const me = requireUser();
  if (!id) throw new Error("Missing take");
  writeTakes(readTakes().filter((row) => !(row.id === id && row.userId === me && row.outcome == null)));
  return { id };
}

export async function myDashboard(): Promise<Dashboard> {
  const me = requireUser();
  const quotes = await loadQuotes();
  const takes = readTakes();
  for (const row of takes) {
    if (row.userId !== me || row.outcome) continue;
    const mark = markOf(row.symbol, quotes);
    if (mark == null) continue;
    const hitTp = row.direction === "long" ? mark >= row.tp : mark <= row.tp;
    const hitSl = row.direction === "long" ? mark <= row.sl : mark >= row.sl;
    if (!hitTp && !hitSl) continue;
    row.outcome = hitTp ? "win" : "loss";
    row.exitPrice = hitTp ? row.tp : row.sl;
  }
  writeTakes(takes);
  const mine = takes.filter((row) => row.userId === me).map((row) => present(row, markOf(row.symbol, quotes)));
  const wins = mine.filter((row) => row.outcome === "win").length;
  const losses = mine.filter((row) => row.outcome === "loss").length;
  const closed = wins + losses;
  return {
    taken: mine.length,
    open: mine.filter((row) => row.outcome == null).length,
    wins,
    losses,
    winRate: closed ? (wins / closed) * 100 : 0,
    netPnl: mine.reduce((sum, row) => sum + row.pnlUsd, 0),
    rows: mine,
  };
}
