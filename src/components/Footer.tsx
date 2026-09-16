import Logo from "./Logo";
import { PORTAL_LOGIN_URL } from "../lib/constants";

export default function Footer() {
  return (
    <div className="wrap">
      <footer>
        <div className="footer-row">
          <div className="footer-brand">
            <Logo size={22} />
            <span className="name">VAULT1</span>
          </div>
          <div className="footer-links">
            <a href="#solution">How it works</a>
            <a href="#experiences">Platform</a>
            <a href="#calculator">Calculator</a>
            <a href={PORTAL_LOGIN_URL}>Portal Login</a>
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
