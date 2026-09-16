import { useMarketData } from "../hooks/useMarketData";
import { PORTAL_LOGIN_URL } from "../lib/constants";

const FALLBACK_ROWS = [
  { name: "S&P 500", symbol: "S&P 500", val: "6,481.2", chg: "+0.61%", up: true },
  { name: "Bitcoin", symbol: "BTC/USD", val: "$68,240", chg: "+2.41%", up: true },
  { name: "EUR/USD", symbol: "EUR/USD", val: "1.0862", chg: "-0.22%", up: false },
];

function formatPrice(symbol: string, price: number) {
  if (symbol === "BTC/USD") return "$" + Math.round(price).toLocaleString("en-US");
  if (symbol === "EUR/USD" || symbol === "GBP/USD") return price.toFixed(4);
  return price.toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export default function Hero() {
  const quotes = useMarketData();
  const hasLiveData = Object.keys(quotes).length > 0;

  const rows = FALLBACK_ROWS.map((fallback) => {
    const live = quotes[fallback.symbol];
    if (!live) return fallback;
    const up = live.changePct >= 0;
    return {
      name: fallback.name,
      symbol: fallback.symbol,
      val: formatPrice(live.symbol, live.price),
      chg: `${up ? "+" : ""}${live.changePct.toFixed(2)}%`,
      up,
    };
  });

  return (
    <div className="wrap">
      <section className="hero">
        <div>
          <div className="hero-eyebrow">WEALTH OPERATING SYSTEM</div>
          <h1>Your money deserves a better operating system.</h1>
          <p className="hero-body">
            Vault1 connects your capital, investing, trading, performance and
            financial life into one system — instead of a broker, a bank, a
            spreadsheet and a notes app that don't talk to each other.
          </p>
          <div className="hero-ctas">
            <a href={PORTAL_LOGIN_URL} className="btn-primary">
              REQUEST ACCESS <span>→</span>
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-item">
              <div className="label">FROM</div>
              <div className="val">Your first ₹500</div>
            </div>
            <div className="proof-item">
              <div className="label">TO</div>
              <div className="val">A multi-asset portfolio</div>
            </div>
            <div className="proof-item">
              <div className="label">STATUS</div>
              <div className="val" style={{ color: "var(--bull)" }}>Early access open</div>
            </div>
          </div>
        </div>

        <div className="terminal">
          <div className="terminal-top">
            <div className="live"><span className="pulse" /> COMMAND CENTER</div>
            <div style={{ fontSize: 9, color: "#5B6678", fontWeight: 700 }}>
              {hasLiveData ? "LIVE" : "LOADING"}
            </div>
          </div>
          <div className="terminal-body">
            <div className="term-wealth-label">TOTAL WEALTH</div>
            <div className="term-wealth-val">₹18,42,600</div>
            <div className="term-wealth-sub">
              <span className="d" /> Capital, positions and missions — one view
            </div>
            <div className="term-divider" />
            <div>
              {rows.map((r) => (
                <div className="term-row" key={r.name}>
                  <span className="term-sym">{r.name}</span>
                  <span className="term-price">{r.val}</span>
                  <span className="term-chg" style={{ color: r.up ? "var(--bull)" : "var(--bear)" }}>
                    {r.chg}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
