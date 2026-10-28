export type Quote = {
  symbol: string;
  price: number;
  changePct: number | null;
  kind: "crypto" | "forex";
};

const ALIAS: Record<string, string> = {
  BTC: "BTC/USD",
  BTCUSD: "BTC/USD",
  "BTC/USD": "BTC/USD",
  ETH: "ETH/USD",
  ETHUSD: "ETH/USD",
  "ETH/USD": "ETH/USD",
  SOL: "SOL/USD",
  SOLUSD: "SOL/USD",
  "SOL/USD": "SOL/USD",
  EURUSD: "EUR/USD",
  "EUR/USD": "EUR/USD",
  GBPUSD: "GBP/USD",
  "GBP/USD": "GBP/USD",
  USDJPY: "USD/JPY",
  "USD/JPY": "USD/JPY",
  AUDUSD: "AUD/USD",
  "AUD/USD": "AUD/USD",
  USDCAD: "USD/CAD",
  "USD/CAD": "USD/CAD",
  NZDUSD: "NZD/USD",
  "NZD/USD": "NZD/USD",
  XAUUSD: "XAU/USD",
  "XAU/USD": "XAU/USD",
};

export function quoteSymbol(symbol: string) {
  return ALIAS[symbol.toUpperCase().replace(/\s/g, "")] ?? null;
}

export function findQuote(symbol: string, quotes: Quote[]) {
  const key = quoteSymbol(symbol);
  if (!key) return undefined;
  return quotes.find((quote) => quote.symbol === key);
}

export function formatQuote(price: number, symbol: string) {
  if (symbol.includes("JPY")) return price.toFixed(3);
  if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
  if (price >= 10) return price.toFixed(2);
  return price.toFixed(5);
}
