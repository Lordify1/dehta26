export type Domain = "futures" | "forex" | "degen";

export type Direction = "long" | "short";

export type SignalStatus = "live" | "watching" | "tp" | "stop";

export type Signal = {
  id: string;
  domain: Domain;
  symbol: string;
  market: string;
  direction: Direction;
  entry: number;
  tp: number;
  sl: number;
  confidence: number;
  timeframe: string;
  session: string;
  thesis: string;
  decimals: number;
  sizeLabel: string;
  dollarsPerUnit: number;
  notionalPerUnit: number;
  status: SignalStatus;
  ageMin: number;
  trigger: string;
};

export type DomainInfo = {
  id: Domain;
  label: string;
  armed: string;
  blurb: string;
};

export const DOMAINS: DomainInfo[] = [
  {
    id: "futures",
    label: "Futures",
    armed: "Futures armed",
    blurb: "BTC, ETH, and SOL futures. Defined stops, one attempt.",
  },
  {
    id: "forex",
    label: "Forex",
    armed: "Forex armed",
    blurb: "Majors and gold. Tight risk, timed to the session.",
  },
  {
    id: "degen",
    label: "Degen",
    armed: "Degen armed",
    blurb: "High-variance perps. Size is capped. Invalidation is close.",
  },
];

const CORE: Array<Omit<Signal, "status" | "ageMin" | "trigger">> = [
  {
    id: "btc-usd",
    domain: "futures",
    symbol: "BTC/USD",
    market: "Futures",
    direction: "long",
    entry: 84100,
    tp: 86800,
    sl: 82840,
    confidence: 74,
    timeframe: "1H",
    session: "UTC",
    thesis: "Bitcoin futures are holding the session shelf. Target the next round number. Invalid if that shelf breaks.",
    decimals: 2,
    sizeLabel: "BTC",
    dollarsPerUnit: 1,
    notionalPerUnit: 84100,
  },
  {
    id: "eth-usd",
    domain: "futures",
    symbol: "ETH/USD",
    market: "Futures",
    direction: "long",
    entry: 2668,
    tp: 2784,
    sl: 2612,
    confidence: 71,
    timeframe: "1H",
    session: "UTC",
    thesis: "Ether is bid with bitcoin. First scale at the measured move. Stop sits under the session low.",
    decimals: 2,
    sizeLabel: "ETH",
    dollarsPerUnit: 1,
    notionalPerUnit: 2668,
  },
  {
    id: "sol-usd",
    domain: "futures",
    symbol: "SOL/USD",
    market: "Futures",
    direction: "short",
    entry: 118.1,
    tp: 112.4,
    sl: 120.6,
    confidence: 68,
    timeframe: "15m",
    session: "UTC",
    thesis: "Sol failed the local high and is the weak leg. Cover into the prior shelf. Cancel if the high is reclaimed.",
    decimals: 2,
    sizeLabel: "SOL",
    dollarsPerUnit: 1,
    notionalPerUnit: 118.1,
  },
  {
    id: "eurusd-long",
    domain: "forex",
    symbol: "EURUSD",
    market: "Forex",
    direction: "long",
    entry: 1.0864,
    tp: 1.0912,
    sl: 1.08406,
    confidence: 78,
    timeframe: "4H",
    session: "London",
    thesis:
      "Bids are defending the 1.0840 shelf. 4H structure is a higher low. Target the prior week high before the New York cut.",
    decimals: 5,
    sizeLabel: "lots",
    dollarsPerUnit: 100000,
    notionalPerUnit: 108640,
  },
  {
    id: "gbpusd-short",
    domain: "forex",
    symbol: "GBPUSD",
    market: "Forex",
    direction: "short",
    entry: 1.2715,
    tp: 1.2644,
    sl: 1.2748,
    confidence: 74,
    timeframe: "1H",
    session: "New York",
    thesis:
      "Sterling failed the London high and rolled under session VWAP. Short into the Asia low. Cancel if New York reclaims the high.",
    decimals: 5,
    sizeLabel: "lots",
    dollarsPerUnit: 100000,
    notionalPerUnit: 127150,
  },
  {
    id: "usdjpy-long",
    domain: "forex",
    symbol: "USDJPY",
    market: "Forex",
    direction: "long",
    entry: 151.42,
    tp: 152.545,
    sl: 150.89,
    confidence: 77,
    timeframe: "4H",
    session: "Tokyo",
    thesis:
      "Dip was bought at the 4H demand and carry still leans long. Target the range high. Stand down around intervention headlines.",
    decimals: 3,
    sizeLabel: "lots",
    dollarsPerUnit: 660.4,
    notionalPerUnit: 100000,
  },
  {
    id: "xauusd-long",
    domain: "forex",
    symbol: "XAUUSD",
    market: "Forex",
    direction: "long",
    entry: 2654.3,
    tp: 2690.18,
    sl: 2636.8,
    confidence: 75,
    timeframe: "1H",
    session: "London",
    thesis:
      "Gold held the breakout retest and London is printing higher lows. First scale at the measured move. Stop under the retest wick.",
    decimals: 2,
    sizeLabel: "oz",
    dollarsPerUnit: 1,
    notionalPerUnit: 2654.3,
  },
  {
    id: "sol-long",
    domain: "degen",
    symbol: "SOL",
    market: "Perp",
    direction: "long",
    entry: 178.4,
    tp: 179.57,
    sl: 177.95,
    confidence: 64,
    timeframe: "15m",
    session: "UTC",
    thesis:
      "Perp range break with light open interest. Invalidation is tight on purpose — a sleeve, not a core book. No averaging down.",
    decimals: 2,
    sizeLabel: "SOL",
    dollarsPerUnit: 1,
    notionalPerUnit: 178.4,
  },
  {
    id: "wif-long",
    domain: "degen",
    symbol: "WIF",
    market: "Perp",
    direction: "long",
    entry: 1.864,
    tp: 1.878,
    sl: 1.8593,
    confidence: 61,
    timeframe: "5m",
    session: "UTC",
    thesis:
      "Momentum scalp above the local base. Funding is hot, so the stop is close and the target is modest. One attempt only.",
    decimals: 4,
    sizeLabel: "WIF",
    dollarsPerUnit: 1,
    notionalPerUnit: 1.864,
  },
  {
    id: "pepe-long",
    domain: "degen",
    symbol: "PEPE",
    market: "Perp",
    direction: "long",
    entry: 0.00000984,
    tp: 0.00000988,
    sl: 0.00000982,
    confidence: 58,
    timeframe: "5m",
    session: "UTC",
    thesis:
      "Meme impulse, not a thesis. Trade the burst or get out. Size stays inside the degen cap no matter how loud the tape gets.",
    decimals: 8,
    sizeLabel: "PEPE",
    dollarsPerUnit: 1,
    notionalPerUnit: 0.00000984,
  },
  {
    id: "doge-short",
    domain: "degen",
    symbol: "DOGE",
    market: "Perp",
    direction: "short",
    entry: 0.1642,
    tp: 0.16317,
    sl: 0.16461,
    confidence: 60,
    timeframe: "15m",
    session: "UTC",
    thesis:
      "Failed push into supply and perps are leaning long into it. Fade back to the session open. Cover fast if the high breaks.",
    decimals: 5,
    sizeLabel: "DOGE",
    dollarsPerUnit: 1,
    notionalPerUnit: 0.1642,
  },
  {
    id: "audusd-short",
    domain: "forex",
    symbol: "AUDUSD",
    market: "Forex",
    direction: "short",
    entry: 0.6628,
    tp: 0.6592,
    sl: 0.6645,
    confidence: 72,
    timeframe: "1H",
    session: "London",
    thesis: "Aussie rolled over with the commodity complex and lost the London open. Target the Asia low.",
    decimals: 5,
    sizeLabel: "lots",
    dollarsPerUnit: 100000,
    notionalPerUnit: 66280,
  },
  {
    id: "usdcad-long",
    domain: "forex",
    symbol: "USDCAD",
    market: "Forex",
    direction: "long",
    entry: 1.3586,
    tp: 1.3645,
    sl: 1.3558,
    confidence: 66,
    timeframe: "4H",
    session: "New York",
    thesis: "Higher low against the oil dip. Not triggered until price reclaims the session open.",
    decimals: 5,
    sizeLabel: "lots",
    dollarsPerUnit: 100000,
    notionalPerUnit: 100000,
  },
  {
    id: "nzdusd-long",
    domain: "forex",
    symbol: "NZDUSD",
    market: "Forex",
    direction: "long",
    entry: 0.5974,
    tp: 0.6016,
    sl: 0.5954,
    confidence: 70,
    timeframe: "1H",
    session: "Tokyo",
    thesis: "Kiwi completed the measured move off the Asia base. Target was hit. Stand aside.",
    decimals: 5,
    sizeLabel: "lots",
    dollarsPerUnit: 100000,
    notionalPerUnit: 59740,
  },
  {
    id: "sui-long",
    domain: "degen",
    symbol: "SUI",
    market: "Perp",
    direction: "long",
    entry: 2.184,
    tp: 2.1972,
    sl: 2.1785,
    confidence: 63,
    timeframe: "5m",
    session: "UTC",
    thesis: "Clean 5m break with the stop almost on top of price. One sleeve. If it hesitates, scratch it.",
    decimals: 4,
    sizeLabel: "SUI",
    dollarsPerUnit: 1,
    notionalPerUnit: 2.184,
  },
  {
    id: "bonk-short",
    domain: "degen",
    symbol: "BONK",
    market: "Perp",
    direction: "short",
    entry: 0.00002184,
    tp: 0.00002156,
    sl: 0.00002195,
    confidence: 57,
    timeframe: "5m",
    session: "UTC",
    thesis: "Offer is sitting on the local high. Not live until the ask gets hit and holds. Easy to skip.",
    decimals: 8,
    sizeLabel: "BONK",
    dollarsPerUnit: 1,
    notionalPerUnit: 0.00002184,
  },
  {
    id: "tia-short",
    domain: "degen",
    symbol: "TIA",
    market: "Perp",
    direction: "short",
    entry: 6.84,
    tp: 6.62,
    sl: 6.94,
    confidence: 55,
    timeframe: "15m",
    session: "UTC",
    thesis: "Fade failed. Price ran the stop. The call is dead — no re-entry on the same high.",
    decimals: 2,
    sizeLabel: "TIA",
    dollarsPerUnit: 1,
    notionalPerUnit: 6.84,
  },
];

const META: Record<string, Pick<Signal, "status" | "ageMin" | "trigger">> = {
  "btc-usd": { status: "live", ageMin: 18, trigger: "Shelf hold" },
  "eth-usd": { status: "live", ageMin: 22, trigger: "Measured bid" },
  "sol-usd": { status: "live", ageMin: 11, trigger: "Failed high" },
  "eurusd-long": { status: "live", ageMin: 22, trigger: "Shelf bid" },
  "gbpusd-short": { status: "live", ageMin: 41, trigger: "London fail" },
  "usdjpy-long": { status: "live", ageMin: 55, trigger: "Demand hold" },
  "xauusd-long": { status: "watching", ageMin: 80, trigger: "Retest hold" },
  "audusd-short": { status: "live", ageMin: 18, trigger: "Session roll" },
  "usdcad-long": { status: "watching", ageMin: 95, trigger: "Asia base" },
  "nzdusd-long": { status: "tp", ageMin: 240, trigger: "Measured move" },
  "sol-long": { status: "live", ageMin: 6, trigger: "Range break" },
  "wif-long": { status: "live", ageMin: 4, trigger: "Hot funding" },
  "pepe-long": { status: "watching", ageMin: 11, trigger: "Impulse" },
  "doge-short": { status: "live", ageMin: 8, trigger: "Supply fade" },
  "sui-long": { status: "live", ageMin: 3, trigger: "Sleeve break" },
  "bonk-short": { status: "watching", ageMin: 15, trigger: "Local offer" },
  "tia-short": { status: "stop", ageMin: 50, trigger: "Failed fade" },
};

export const SIGNALS: Signal[] = CORE.map((row) => {
  const meta = META[row.id];
  if (!meta) throw new Error(`Missing signal meta for ${row.id}`);
  return { ...row, ...meta };
});

export const BOOKS: Record<Domain, { title: string; bias: string }> = {
  futures: {
    title: "FUTURES SIGNALS",
    bias: "Crypto futures only: Bitcoin, Ether, Solana. Stops stay outside the session spike.",
  },
  forex: {
    title: "FOREX SIGNALS",
    bias: "London is leading. Euro and yen are the clean structures. Sterling only if the high stays rejected.",
  },
  degen: {
    title: "DEGEN SIGNALS",
    bias: "Heat is elevated. These are sleeves with the invalidation close. One attempt, then the call is done.",
  },
};

const STATUS_RANK: Record<SignalStatus, number> = { live: 0, watching: 1, tp: 2, stop: 3 };

export function rankSignals(list: Signal[]) {
  return [...list].sort(
    (a, b) => STATUS_RANK[a.status] - STATUS_RANK[b.status] || b.confidence - a.confidence,
  );
}

export function isOpen(signal: Signal) {
  return signal.status === "live" || signal.status === "watching";
}

export function entrySplit(signal: Signal) {
  const risk = Math.abs(signal.entry - signal.sl);
  const reward = Math.abs(signal.tp - signal.entry);
  const total = risk + reward;
  if (total === 0) return 50;
  return (risk / total) * 100;
}

export function formatAge(min: number) {
  if (min < 60) return `${min}m`;
  const hours = Math.floor(min / 60);
  if (hours < 48) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

export function statusLabel(status: SignalStatus) {
  if (status === "live") return "LIVE";
  if (status === "watching") return "WATCH";
  if (status === "tp") return "TARGET";
  return "STOPPED";
}

export function domainInfo(id: Domain) {
  return DOMAINS.find((d) => d.id === id) ?? DOMAINS[0];
}

let activeBook: Signal[] = SIGNALS;

export function installBook(rows: Signal[]) {
  activeBook = rows;
}

export function signalsFor(domain: Domain) {
  return activeBook.filter((s) => s.domain === domain);
}

export function getSignal(id: string | null) {
  if (!id) return undefined;
  return activeBook.find((s) => s.id === id);
}

export function rewardRisk(signal: Signal) {
  const risk = Math.abs(signal.entry - signal.sl);
  const reward = Math.abs(signal.tp - signal.entry);
  if (risk === 0) return 0;
  return reward / risk;
}

export function riskCash(equity: number, riskPct: number) {
  return equity * (riskPct / 100);
}

export function unitSize(signal: Signal, equity: number, riskPct: number) {
  const stop = Math.abs(signal.entry - signal.sl);
  if (stop === 0 || signal.dollarsPerUnit === 0) return 0;
  return riskCash(equity, riskPct) / (stop * signal.dollarsPerUnit);
}

export function notionalUsd(signal: Signal, units: number) {
  return units * signal.notionalPerUnit;
}

export function impliedLeverage(notional: number, equity: number) {
  if (equity <= 0) return 0;
  return notional / equity;
}

export function formatPrice(value: number, decimals: number) {
  return value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: Math.abs(value) >= 1000,
  });
}

export function formatRr(rr: number) {
  return `${rr.toFixed(2)} : 1`;
}

export function formatPct(n: number) {
  return `${n.toFixed(2)}%`;
}

export function formatUsd(n: number) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: n >= 1000 ? 0 : 2,
  });
}

export function formatUnits(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(2)}B`;
  if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(2)}M`;
  if (abs >= 10_000) return `${(n / 1_000).toFixed(1)}k`;
  if (abs >= 100) return n.toFixed(0);
  if (abs >= 10) return n.toFixed(1);
  return n.toFixed(2);
}

export function todayRiskPct(locked: { lockedAt: number; riskPct: number }[], now = Date.now()) {
  const start = new Date(now);
  start.setHours(0, 0, 0, 0);
  return locked
    .filter((row) => row.lockedAt >= start.getTime())
    .reduce((sum, row) => sum + row.riskPct, 0);
}
