import { useMarketData } from "../hooks/useMarketData";

const SYMBOLS = [
  "BTC/USD", "ETH/USD", "EUR/USD", "XAU/USD", "AAPL",
  "TSLA", "NIFTY 50", "WTI CRUDE", "S&P 500", "GBP/USD",
];

const FALLBACK_CHANGE: Record<string, number> = {
  "XAU/USD": -0.58, "AAPL": 1.86, "TSLA": -3.24,
  "NIFTY 50": 0.92, "WTI CRUDE": -1.75, "S&P 500": 0.61,
};

function TickerItem({ sym, changePct }: { sym: string; changePct: number }) {
  const up = changePct >= 0;
  return (
    <div className="ticker-item">
      <span className="ticker-sym">{sym}</span>
      <span className={`ticker-chg ${up ? "up" : "down"}`}>
        {up ? "+" : ""}{changePct.toFixed(2)}%
      </span>
      <span className="ticker-dot" />
    </div>
  );
}

export default function Ticker() {
  const quotes = useMarketData();

  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {[0, 1].map((pass) =>
          SYMBOLS.map((sym) => {
            const changePct = quotes[sym]?.changePct ?? FALLBACK_CHANGE[sym] ?? 0;
            return <TickerItem key={`${pass}-${sym}`} sym={sym} changePct={changePct} />;
          })
        )}
      </div>
    </div>
  );
}
