import { useMemo } from "react";

// Demo feed only. Swap this for a real market-data source before launch.
const SYMBOLS = [
  "BTC/USD", "ETH/USD", "EUR/USD", "XAU/USD", "AAPL",
  "TSLA", "NIFTY 50", "WTI CRUDE", "S&P 500", "GBP/USD",
];

function TickerItem({ sym }: { sym: string }) {
  const chg = useMemo(() => (Math.random() * 4 - 1.4).toFixed(2), [sym]);
  const up = Number(chg) >= 0;
  return (
    <div className="ticker-item">
      <span className="ticker-sym">{sym}</span>
      <span className={`ticker-chg ${up ? "up" : "down"}`}>
        {up ? "+" : ""}{chg}%
      </span>
      <span className="ticker-dot" />
    </div>
  );
}

export default function Ticker() {
  return (
    <div className="ticker-bar">
      <div className="ticker-track">
        {[0, 1].map((pass) =>
          SYMBOLS.map((sym) => <TickerItem key={`${pass}-${sym}`} sym={sym} />)
        )}
      </div>
    </div>
  );
}
