const FRAGMENTS = [
  { who: "YOUR BROKER", knows: "Knows your trades" },
  { who: "YOUR BANK", knows: "Knows your cash" },
  { who: "YOUR SPREADSHEET", knows: "Knows your calculations" },
  { who: "YOUR JOURNAL", knows: "Knows your mistakes" },
  { who: "YOUR COMMUNITY", knows: "Knows your ideas" },
];

export default function Problem() {
  return (
    <div className="wrap" id="problem">
      <section className="tight">
        <div className="section-eyebrow">THE PROBLEM</div>
        <div className="section-title">Your wealth is scattered across too many systems</div>
        <div className="section-body">Each one knows a piece of the picture. None of them know the whole thing.</div>
        <div className="fragment-row">
          {FRAGMENTS.map((f) => (
            <div className="fragment-card" key={f.who}>
              <div className="who">{f.who}</div>
              <div className="knows">{f.knows}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
