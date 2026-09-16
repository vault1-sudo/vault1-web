// Real market data sources.
//
// CRYPTO (CoinGecko) and FOREX (Frankfurter/ECB) are free, keyless, and
// CORS-friendly from the browser — these are live with zero setup.
//
// STOCKS / INDICES / COMMODITIES need a Twelve Data API key (free tier,
// no credit card) — see README for setup. Without a key, those specific
// figures quietly keep their last static baseline instead of breaking.

export type Quote = {
  symbol: string;
  price: number;
  changePct: number;
};

const TWELVE_DATA_KEY = import.meta.env.VITE_TWELVE_DATA_KEY as string | undefined;

function isoDaysAgo(n: number) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().slice(0, 10);
}

export async function fetchCryptoQuotes(): Promise<Quote[]> {
  const res = await fetch(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd&include_24hr_change=true"
  );
  if (!res.ok) throw new Error("CoinGecko request failed");
  const data = await res.json();
  return [
    { symbol: "BTC/USD", price: data.bitcoin.usd, changePct: data.bitcoin.usd_24h_change ?? 0 },
    { symbol: "ETH/USD", price: data.ethereum.usd, changePct: data.ethereum.usd_24h_change ?? 0 },
  ];
}

export async function fetchForexQuotes(): Promise<Quote[]> {
  const [latestRes, prevRes] = await Promise.all([
    fetch("https://api.frankfurter.app/latest?from=USD&to=EUR,GBP"),
    fetch(`https://api.frankfurter.app/${isoDaysAgo(1)}?from=USD&to=EUR,GBP`),
  ]);
  if (!latestRes.ok || !prevRes.ok) throw new Error("Frankfurter request failed");
  const latest = await latestRes.json();
  const prev = await prevRes.json();

  const eurUsd = 1 / latest.rates.EUR;
  const eurUsdPrev = 1 / prev.rates.EUR;
  const gbpUsd = 1 / latest.rates.GBP;
  const gbpUsdPrev = 1 / prev.rates.GBP;

  return [
    { symbol: "EUR/USD", price: eurUsd, changePct: ((eurUsd - eurUsdPrev) / eurUsdPrev) * 100 },
    { symbol: "GBP/USD", price: gbpUsd, changePct: ((gbpUsd - gbpUsdPrev) / gbpUsdPrev) * 100 },
  ];
}

const TD_SYMBOL_MAP: Record<string, string> = {
  "AAPL": "AAPL",
  "TSLA": "TSLA",
  "XAU/USD": "XAU/USD",
  "WTI CRUDE": "WTI/USD",
  "S&P 500": "SPX",
  "NIFTY 50": "NSEI",
};

export async function fetchTwelveDataQuotes(): Promise<Quote[] | null> {
  if (!TWELVE_DATA_KEY) return null;

  const tdSymbols = Object.values(TD_SYMBOL_MAP).join(",");
  const res = await fetch(
    `https://api.twelvedata.com/quote?symbol=${encodeURIComponent(tdSymbols)}&apikey=${TWELVE_DATA_KEY}`
  );
  if (!res.ok) throw new Error("Twelve Data request failed");
  const data = await res.json();

  const quotes: Quote[] = [];
  for (const [displaySymbol, tdSymbol] of Object.entries(TD_SYMBOL_MAP)) {
    const entry = tdSymbols.split(",").length === 1 ? data : data[tdSymbol];
    if (!entry || entry.status === "error" || entry.close == null) continue;
    quotes.push({
      symbol: displaySymbol,
      price: parseFloat(entry.close),
      changePct: parseFloat(entry.percent_change ?? 0),
    });
  }
  return quotes;
}
