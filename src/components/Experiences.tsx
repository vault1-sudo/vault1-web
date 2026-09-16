export default function Experiences() {
  return (
    <div className="wrap" id="experiences">
      <section className="tight">
        <div className="section-eyebrow">THE PLATFORM</div>
        <div className="section-title">Two experiences, one Vault</div>
        <div className="section-body">
          Built for people growing their own capital today — and for the investors they'll manage capital for tomorrow.
        </div>

        <div className="experiences">
          <div className="exp-card">
            <div className="exp-badge live"><span>●</span> AVAILABLE NOW</div>
            <h3>Vault1 Growth</h3>
            <p>
              Your personal capital-growth and trading experience — portfolio,
              trading, Growth Missions, trade journal, strategies, performance,
              risk and goals, all on one ledger.
            </p>
            <div className="exp-chip-row">
              {["Portfolio", "Trading", "Growth Missions", "Trade Journal", "Risk", "Performance", "Goals"].map((c) => (
                <div className="exp-chip" key={c}>{c}</div>
              ))}
            </div>
          </div>

          <div className="exp-card">
            <div className="exp-badge future"><span>◐</span> FUTURE EXPERIENCE</div>
            <h3>Vault1 Investor</h3>
            <p>
              A premium private-wealth portal for invited investors —
              contributed capital, portfolio value, performance, statements,
              agreements and payouts.
            </p>
            <div className="exp-chip-row">
              {["Contributed Capital", "Statements", "Agreements", "Payouts"].map((c) => (
                <div className="exp-chip" key={c}>{c}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
