const CHAIN = [
  "Capital", "Assets", "Portfolio", "Trading", "Strategies",
  "Performance", "Risk", "Goals", "Reports", "Community",
];

export default function Solution() {
  return (
    <div className="wrap" id="solution">
      <section className="tight">
        <div className="section-eyebrow">THE SOLUTION</div>
        <div className="section-title">One operating system for your money</div>
        <div className="section-body">Every financial action feeds the same connected picture — nothing lives in isolation.</div>
        <div className="chain-row">
          {CHAIN.map((node, i) => (
            <span key={node} style={{ display: "contents" }}>
              <div className={`chain-chip ${i === 0 || i === CHAIN.length - 1 ? "hi" : ""}`}>
                {node}
              </div>
              {i < CHAIN.length - 1 && <span className="chain-arrow">→</span>}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
