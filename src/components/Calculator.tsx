import { useState } from "react";

type ContribMode = "none" | "deposit" | "withdraw";

const CURRENCIES = ["₹", "$", "€", "£", "¥"];

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function fmtMoney(n: number, currency: string) {
  const sign = n < 0 ? "-" : "";
  return sign + currency + Math.abs(Math.round(n)).toLocaleString("en-IN");
}

function buildAreaPath(series: number[]) {
  const w = 560, h = 200, pad = 8;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = max - min || 1;

  const points = series.map((v, i) => {
    const x = pad + (i / (series.length - 1)) * (w - pad * 2);
    const y = h - pad - ((v - min) / range) * (h - pad * 2);
    return [x, y] as const;
  });

  const linePath = points
    .map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`))
    .join(" ");
  const areaPath =
    linePath + ` L${points[points.length - 1][0]},${h} L${points[0][0]},${h} Z`;

  return { linePath, areaPath };
}

export default function Calculator() {
  const [currency, setCurrency] = useState("₹");
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(12);
  const [rateFreq, setRateFreq] = useState(12); // periods/year
  const [durYears, setDurYears] = useState(15);
  const [durMonths, setDurMonths] = useState(0);
  const [durDays, setDurDays] = useState(0);
  const [includeAllDays, setIncludeAllDays] = useState(true);
  const [reinvestRate, setReinvestRate] = useState(100);
  const [contribMode, setContribMode] = useState<ContribMode>("none");
  const [contribAmount, setContribAmount] = useState(5000);
  const [contribFreqDays, setContribFreqDays] = useState(30.44);
  const [startDate, setStartDate] = useState(todayISO());

  const [result, setResult] = useState(() => runCalc());

  function runCalc() {
    const totalDays = Math.max(1, Math.round(durYears * 365 + durMonths * 30.44 + durDays));
    const dailyRate = Math.pow(1 + rate / 100, 1 / (365 / rateFreq)) - 1;
    const reinvestPct = reinvestRate / 100;
    const amount = contribMode === "none" ? 0 : contribAmount;
    const freqDays = Math.max(1, Math.round(contribFreqDays));
    const sign = contribMode === "withdraw" ? -1 : 1;

    let balance = principal;
    let totalContrib = 0;
    let totalInterest = 0;
    const series = [balance];
    const sampleEvery = Math.max(1, Math.round(totalDays / 120));

    for (let d = 1; d <= totalDays; d++) {
      const isWeekend = d % 7 === 6 || d % 7 === 0;
      if (includeAllDays || !isWeekend) {
        const interest = balance * dailyRate;
        balance += interest * reinvestPct;
        totalInterest += interest * reinvestPct;
      }
      if (contribMode !== "none" && d % freqDays === 0) {
        const amt = amount * sign;
        balance = Math.max(0, balance + amt);
        totalContrib += amt;
      }
      if (d % sampleEvery === 0 || d === totalDays) series.push(balance);
    }

    return { balance, principal, totalContrib, totalInterest, series };
  }

  function handleCalculate() {
    setResult(runCalc());
  }

  const { linePath, areaPath } = buildAreaPath(result.series);

  return (
    <div className="wrap" id="calculator">
      <section className="tight">
        <div className="section-eyebrow">RUN THE NUMBERS</div>
        <div className="section-title">Compounding calculator</div>
        <div className="section-body">
          The same trajectory math behind Growth Missions — see what disciplined, regular investing does over time.
        </div>

        <div className="calc-panel">
          <div className="calc-grid">
            <div className="calc-inputs">

              <div className="calc-sec-label">CURRENCY</div>
              <div className="seg-row">
                {CURRENCIES.map((c) => (
                  <button
                    key={c}
                    className={`seg-btn ${currency === c ? "active" : ""}`}
                    onClick={() => setCurrency(c)}
                    type="button"
                  >
                    {c}
                  </button>
                ))}
              </div>

              <div className="calc-sec-label">PRINCIPAL AMOUNT</div>
              <div className="field-inline">
                <div className="prefix-input">
                  <span className="prefix">{currency}</span>
                  <input
                    type="number"
                    min={0}
                    value={principal}
                    onChange={(e) => setPrincipal(Number(e.target.value) || 0)}
                  />
                </div>
              </div>

              <div className="calc-sec-label">RATE</div>
              <div className="rate-row">
                <div className="prefix-input">
                  <input
                    type="number"
                    step={0.1}
                    value={rate}
                    style={{ paddingLeft: 12 }}
                    onChange={(e) => setRate(Number(e.target.value) || 0)}
                  />
                  <span className="prefix" style={{ borderRight: "none", borderLeft: "1px solid var(--glass-border)" }}>%</span>
                </div>
                <select value={rateFreq} onChange={(e) => setRateFreq(Number(e.target.value))}>
                  <option value={365}>daily</option>
                  <option value={52}>weekly</option>
                  <option value={12}>monthly</option>
                  <option value={1}>yearly</option>
                </select>
              </div>

              <div className="calc-sec-label">DURATION</div>
              <div className="ymd-row">
                <div className="ymd-field">
                  <label>Years</label>
                  <input type="number" min={0} value={durYears} onChange={(e) => setDurYears(Number(e.target.value) || 0)} />
                </div>
                <div className="ymd-field">
                  <label>Months</label>
                  <input type="number" min={0} max={11} value={durMonths} onChange={(e) => setDurMonths(Number(e.target.value) || 0)} />
                </div>
                <div className="ymd-field">
                  <label>Days</label>
                  <input type="number" min={0} max={30} value={durDays} onChange={(e) => setDurDays(Number(e.target.value) || 0)} />
                </div>
              </div>

              <div className="toggle-line">
                <span className="lbl">Include all days of week?</span>
                <div className="mini-seg">
                  <button className={includeAllDays ? "active" : ""} type="button" onClick={() => setIncludeAllDays(true)}>Yes</button>
                  <button className={!includeAllDays ? "active" : ""} type="button" onClick={() => setIncludeAllDays(false)}>No</button>
                </div>
              </div>

              <div className="calc-sec-label">DAILY REINVEST RATE</div>
              <div className="reinvest-row">
                <select value={reinvestRate} onChange={(e) => setReinvestRate(Number(e.target.value))}>
                  <option value={100}>100%</option>
                  <option value={75}>75%</option>
                  <option value={50}>50%</option>
                  <option value={25}>25%</option>
                  <option value={0}>0%</option>
                </select>
                <button
                  className="info-btn"
                  type="button"
                  title="How much of each period's interest gets added back to your balance vs. paid out."
                >
                  ?
                </button>
              </div>

              <div className="calc-sec-label">
                ADDITIONAL CONTRIBUTIONS <span style={{ color: "var(--muted)", fontWeight: 600 }}>(optional)</span>
              </div>
              <div className="mini-seg" style={{ width: "100%", marginBottom: 14 }}>
                <button className={contribMode === "none" ? "active" : ""} style={{ flex: 1 }} type="button" onClick={() => setContribMode("none")}>None</button>
                <button className={contribMode === "deposit" ? "active" : ""} style={{ flex: 1 }} type="button" onClick={() => setContribMode("deposit")}>Deposits</button>
                <button className={contribMode === "withdraw" ? "active" : ""} style={{ flex: 1 }} type="button" onClick={() => setContribMode("withdraw")}>Withdrawals</button>
              </div>
              <div className={`contrib-extra ${contribMode !== "none" ? "show" : ""}`}>
                <div className="prefix-input">
                  <span className="prefix">{currency}</span>
                  <input type="number" min={0} value={contribAmount} onChange={(e) => setContribAmount(Number(e.target.value) || 0)} />
                </div>
                <select value={contribFreqDays} onChange={(e) => setContribFreqDays(Number(e.target.value))}>
                  <option value={30.44}>Monthly</option>
                  <option value={7}>Weekly</option>
                  <option value={1}>Daily</option>
                  <option value={365}>Yearly</option>
                </select>
              </div>

              <div className="date-row">
                <div className="field">
                  <label>
                    START DATE? <a href="#" onClick={(e) => { e.preventDefault(); setStartDate(todayISO()); }}>today</a>
                  </label>
                  <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
              </div>

              <button className="calc-btn" type="button" onClick={handleCalculate}>⊞ CALCULATE</button>
            </div>

            <div className="calc-output">
              <div className="calc-headline">
                <div className="label">ENDING BALANCE</div>
                <div className="amount">{fmtMoney(result.balance, currency)}</div>
              </div>
              <div className="calc-sub-row">
                <div className="item"><div className="l">PRINCIPAL</div><div className="v">{fmtMoney(result.principal, currency)}</div></div>
                <div className="item"><div className="l">CONTRIBUTIONS</div><div className="v blue">{fmtMoney(result.totalContrib, currency)}</div></div>
                <div className="item"><div className="l">TOTAL INTEREST</div><div className="v teal">{fmtMoney(result.totalInterest, currency)}</div></div>
              </div>
              <div className="chart-wrap">
                <svg viewBox="0 0 560 200" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#0FBE7A" stopOpacity={0.35} />
                      <stop offset="100%" stopColor="#0FBE7A" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <path d={areaPath} fill="url(#areaGrad)" />
                  <path d={linePath} fill="none" stroke="#0FBE7A" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className="calc-disclaimer">
                Illustrative only — assumes a constant return, which real markets never give you. Not investment advice.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
