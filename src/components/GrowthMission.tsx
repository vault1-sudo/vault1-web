import { useMemo } from "react";

function buildPaths() {
  const w = 400, h = 140, pad = 6;
  const points = 24;
  const expected: number[] = [];
  const actual: number[] = [];

  for (let i = 0; i <= points; i++) {
    const t = i / points;
    const base = 500 * Math.pow(19000 / 500, t);
    expected.push(base);
    const wobble = 1 + Math.sin(i * 1.3) * 0.06 * t;
    actual.push(base * wobble * (t < 1 ? 0.94 + t * 0.06 : 1));
  }

  const max = Math.max(...expected, ...actual);
  const min = Math.min(...expected, ...actual);
  const range = max - min || 1;

  const toPath = (series: number[]) =>
    series
      .map((v, i) => {
        const x = pad + (i / (series.length - 1)) * (w - pad * 2);
        const y = h - pad - ((v - min) / range) * (h - pad * 2);
        return (i === 0 ? "M" : "L") + x.toFixed(1) + "," + y.toFixed(1);
      })
      .join(" ");

  return { expectedPath: toPath(expected), actualPath: toPath(actual) };
}

export default function GrowthMission() {
  const { expectedPath, actualPath } = useMemo(buildPaths, []);

  return (
    <div className="wrap" id="missions">
      <section className="tight">
        <div className="mission-card">
          <div>
            <div className="mission-label">SIGNATURE FEATURE — GROWTH MISSIONS</div>
            <div className="mission-figures">
              <span className="from">₹500</span>
              <span className="arrow">→</span>
              <span className="to">₹19,000</span>
            </div>
            <p>
              Set a starting capital, a target capital and a duration. Vault1
              works out the compounding trajectory required to get there, and
              tracks your actual progress against it — day by day, trade by trade.
            </p>
          </div>
          <div>
            <div className="mission-chart">
              <svg viewBox="0 0 400 140" preserveAspectRatio="none">
                <path d={expectedPath} fill="none" stroke="#8592A6" strokeWidth={1.6} strokeDasharray="4,4" />
                <path d={actualPath} fill="none" stroke="#0FBE7A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <div className="mission-legend">
              <div className="item"><span className="sw" style={{ background: "var(--muted)" }} /> Expected trajectory</div>
              <div className="item"><span className="sw" style={{ background: "var(--bull)" }} /> Actual progress</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
