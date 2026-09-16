import { useState, FormEvent } from "react";
import { PORTAL_LOGIN_URL } from "../lib/constants";

const MARKETS = ["Crypto", "Forex", "Equities", "Commodities"];

export default function Access() {
  const [submitted, setSubmitted] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  function toggleInterest(chip: string) {
    setInterests((prev) =>
      prev.includes(chip) ? prev.filter((c) => c !== chip) : [...prev, chip]
    );
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="wrap" id="access">
      <section className="tight">
        <div className="section-eyebrow">GET STARTED</div>
        <div className="section-title">Request access</div>
        <div className="section-body">
          Tell us a little about what you're managing today — we'll set up your Vault1 workspace.
        </div>

        <div className="access-panel">
          <div className="access-info">
            <div>
              <h3>What you get on approval</h3>
              <p>Every application is reviewed before a workspace is created — Vault1 is currently in early access.</p>
              <div className="access-list">
                <div className="item"><span className="tick">✓</span> One ledger across crypto, forex, equities and commodities</div>
                <div className="item"><span className="tick">✓</span> Growth Missions tied to your own capital targets</div>
                <div className="item"><span className="tick">✓</span> A trading community built into the same platform</div>
              </div>
            </div>
            <div className="login-callout">
              <span>Already an investor?</span>
              <a href={PORTAL_LOGIN_URL}>LOGIN TO PORTAL <span>→</span></a>
            </div>
          </div>

          <div className="access-form">
            {!submitted ? (
              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="field"><label>FULL NAME</label><input type="text" required placeholder="Your name" /></div>
                  <div className="field"><label>EMAIL ADDRESS</label><input type="email" required placeholder="you@example.com" /></div>
                </div>
                <div className="form-row">
                  <div className="field"><label>PHONE</label><input type="tel" placeholder="+91 00000 00000" /></div>
                  <div className="field">
                    <label>ESTIMATED ALLOCATION</label>
                    <select>
                      <option>Under ₹5,00,000</option>
                      <option>₹5,00,000 – ₹25,00,000</option>
                      <option>₹25,00,000 – ₹1,00,00,000</option>
                      <option>Above ₹1,00,00,000</option>
                    </select>
                  </div>
                </div>

                <label style={{ display: "block", fontSize: 10, fontWeight: 800, letterSpacing: 1, color: "var(--muted)", marginBottom: 10 }}>
                  MARKETS YOU TRADE
                </label>
                <div className="interest-row">
                  {MARKETS.map((m) => (
                    <div
                      key={m}
                      className={`interest-chip ${interests.includes(m) ? "on" : ""}`}
                      onClick={() => toggleInterest(m)}
                    >
                      {m}
                    </div>
                  ))}
                </div>

                <div className="field">
                  <label>ANYTHING WE SHOULD KNOW</label>
                  <textarea placeholder="Optional — current portfolio size, experience, what you're looking for" />
                </div>

                <button type="submit" className="submit-btn">SUBMIT APPLICATION <span>→</span></button>
                <div className="form-note">We'll respond within 2 business days. No spam, ever.</div>
              </form>
            ) : (
              <div className="form-success" style={{ display: "block" }}>
                <div className="check">✓</div>
                <h4>Application received</h4>
                <p>We'll be in touch shortly to set up your Vault1 workspace.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
