import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="wrap">
      <footer>
        <div className="footer-row">
          <div className="footer-brand">
            <div className="brand-icon" style={{ width: 30, height: 30, borderRadius: 8 }}>
              <Logo size={16} />
            </div>
            <span className="name">VAULT1</span>
          </div>
          <div className="footer-links">
            <a href="#solution">How it works</a>
            <a href="#experiences">Platform</a>
            <a href="#calculator">Calculator</a>
            <a href="/login">Portal Login</a>
          </div>
        </div>
        <div className="footer-disclaimer">
          Vault1 is a financial technology platform — a wealth operating system for organizing, tracking, analyzing
          and operating your financial information. It is not a brokerage, a bank, a crypto exchange, an unregulated
          investment advisory service, or a guaranteed-return product. Nothing on this page is investment, legal or
          tax advice. Trading and investing carry risk, including loss of principal.
        </div>
      </footer>
    </div>
  );
}
