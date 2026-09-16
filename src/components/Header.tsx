import { useState } from "react";
import Logo from "./Logo";

export default function Header() {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header>
      <div className="brand">
        <Logo size={46} />
        <div className="brand-copy">
          <div className="brand-name">VAULT1</div>
          <div className="brand-sub">WEALTH OS</div>
        </div>
      </div>

      <nav
        className="links"
        style={
          navOpen
            ? {
                display: "flex",
                position: "fixed",
                top: 78,
                right: 20,
                flexDirection: "column",
                background: "var(--navy-mid)",
                border: "1px solid var(--glass-border)",
                borderRadius: 12,
                padding: 18,
                gap: 16,
                zIndex: 20,
              }
            : undefined
        }
      >
        <a href="#solution" onClick={() => setNavOpen(false)}>How it works</a>
        <a href="#experiences" onClick={() => setNavOpen(false)}>Platform</a>
        <a href="#calculator" onClick={() => setNavOpen(false)}>Calculator</a>
      </nav>

      <div className="header-actions">
        <div className="nav-toggle" onClick={() => setNavOpen((v) => !v)}>
          <span />
        </div>
      </div>
    </header>
  );
}
