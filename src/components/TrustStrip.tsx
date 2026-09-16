const ITEMS = [
  {
    label: "INTELLIGENCE",
    title: "Every action is connected",
    body: "A trade updates your position, your portfolio, your P&L, your performance and your risk — automatically.",
  },
  {
    label: "CONTROL",
    title: "Role-based access",
    body: "Admin, manager, viewer and investor roles, with modular permissions rather than one-size-fits-all access.",
  },
  {
    label: "SECURITY",
    title: "Full audit history",
    body: "Every change is logged — who did what, and when — across your account.",
  },
];

export default function TrustStrip() {
  return (
    <div className="wrap">
      <section className="tight">
        <div className="trust-strip">
          {ITEMS.map((item) => (
            <div className="trust-item" key={item.label}>
              <div className="t-label">{item.label}</div>
              <div className="t-title">{item.title}</div>
              <div className="t-body">{item.body}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
