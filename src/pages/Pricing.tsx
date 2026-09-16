import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Plans — the pricing page IS the price, no hero first                */
/* ------------------------------------------------------------------ */
const PLANS = [
  {
    tier: "Foundation", name: "Foundation",
    tl: "One location, 5 users. Every gourde counted tonight. Sales, Credit, Customers, Analytics",
    price: "$199", per: "per year",
    feats: ["Single Store Excellence: Full management of one professional location.", 
      "Unified Payment Hub: Seamlessly process Cash, MonCash, NatCash, and Credit.", 
      "Precision Shift Control: Professional open/close and cash-count workflows.", 
      "Revenue Integrity: Daily reports that instantly identify and resolve discrepancies.", 
      "Secure Continuity: Automated cloud synchronization and encrypted backups", 
      "Collaborative Access: Up to 5 secure user accounts to power your team.", 
      "Scalable Growth: Add additional team members for just $55/year.", 
      "Expert Onboarding: Complimentary virtual training to ensure a perfect start."],
    cta: "Start on Foundation",
    pop: false,
  },
  {
    tier: "Pro", name: "Pro",
    tl: "The full system: credit, team, analytics, Sales, Credit, Customers, Analytics, Several Locations",
    price: "$399", per: "per year",
    feats: ["Everything in Baz, plus:", "Up to 3 Store Locations: Manage multiple shops from one account.", 
      "Up to 10 Users Per Location: Give your team the tools they need.", 
      "Centralized Web Portal: Review your ledgers and analytics from any browser.", 
      "On-Demand Training: Professional support to get you started quickly.", 
      "Automated Credit Reminders: Send SMS/WhatsApp alerts to customers with active credits.", 
      "Customer Broadcasts: Send promotions and news to all your active clients.", 
      "Commerce, accelerated. Enable other Kourro-powered businesses to browse your catalog and place orders instantly, without ever leaving the app."
      ],
    cta: "Start on Pro",
    pop: true,
  },
  {
    tier: "Signature", name: "Signature",
    tl: "We build it around your business — franchises, multi-owners.",
    price: "Custom", per: "quote — contact us",
    feats: [
      "Everything in the Professional plan, plus:",
      "Unlimited Access: As many stores, registers, and users as you need",
      "Multi-Owner Setup: Specialized structures for partner-owned businesses",
      "Easy Setup: We handle all your data import and migration",
      "Digital Presence: Complete Website, Social Media, and Marketing plan",
      "Store Security: Professional camera installation and setup",
      "Banking Support: Help opening a US Bank account for your business",
      "Global Sales: Ability to accept international payments on your website",
      "Tailored Fit: A Kourro system customized to your exact needs"
    ],
    cta: "Request a quote",
    pop: false,
  },
];

function Plans() {
  return (
    <section className="section" id="plans" style={{ paddingTop: 190 }}>
      <div className="wrap">
        <div className="plans">
          {PLANS.map((p, i) => (
            <Reveal key={p.name} delay={i * 100}>
              <div className={"plan" + (p.pop ? " pop" : "")}>
                <div className="p-tier">{p.tier}</div>
                <div className="p-name">{p.name}</div>
                <div className="p-tagline">{p.tl}</div>
                <div className="p-price">
                  {p.price} <small>USD</small>
                </div>
                <div className="p-period">{p.per}</div>
                <ul>
                  {p.feats.map(f => (
                    <li key={f}>
                      <span className="chk"><Ic name="check" size={10} /></span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="p-cta">
                  <Link to="/contact" className={"btn " + (p.pop ? "btn-ember" : "btn-ink")} style={{ width: "100%", justifyContent: "center" }}>
                    {p.cta} <Ic name="arrow" size={15} />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Line item — the anchoring copy sits under the cards                 */
/* ------------------------------------------------------------------ */
function Anchor() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="wrap cta-final">
        <Reveal>
          <h2 className="display" style={{ fontSize: "clamp(30px, 3.6vw, 46px)" }}>
            Kourro pays for <em>itself.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead" style={{ margin: "18px auto 0", maxWidth: 560 }}>
            Automated reminders keep your clients accountable until their debt is zero. 
            Kourro alerts you and your management team in real-time, 
            so you can prioritize the right calls and get your money back faster.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Comparison table                                                    */
/* ------------------------------------------------------------------ */
function Compare() {
  const rows = [
    { f: "Managed Locations", b: "1", p: "Up to 3", s: "Unlimited" },
    { f: "Active Registers", b: "1", p: "Unlimited per store", s: "Unlimited" },
    { f: "Secure User Accounts", b: "Up to 5", p: "Up to 10 per store", s: "Unlimited" },
    { f: "Credit & Client Management", b: "✓", p: "✓", s: "✓" },
    { f: "Secure Cloud Continuity", b: "✓", p: "✓", s: "✓" },
    { f: "Executive Web Dashboard", b: "—", p: "✓", s: "✓" },
    { f: "On-demand Training", b: "-", p: "✓", s: "✓" },
    { f: "Institutional/Franchise Structure", b: "—", p: "—", s: "✓" },
    { f: "Professional Onboarding & Migration", b: "—", p: "—", s: "✓" },
    { f: "Digital Identity Suite (Web/Social)", b: "—", p: "—", s: "✓" },
    { f: "Security Infrastructure (Cameras)", b: "—", p: "—", s: "✓" },
    { f: "Global Financial Integration (US Bank)", b: "—", p: "—", s: "✓" },
  ];
  return (
    <section className="section" id="compare" style={{ background: "var(--paper-2)", paddingTop: 80 }}>
      <div className="wrap">
        <Reveal>
          <div className="section-head center">
            <Eyebrow>Side by side</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4vw, 50px)", marginTop: 18 }}>
              What each plan <em>actually includes.</em>
            </h2>
          </div>
        </Reveal>
        <div className="cmp-table">
          <div className="cmp-row-head">
            <span></span><span>Foundation</span><span className="hl">Pro</span><span>Signature</span>
          </div>
          {rows.map(r => (
            <div className="cmp-row-cell" key={r.f}>
              <span className="f">{r.f}</span>
              <span>{r.b}</span>
              <span className="hl">{r.p}</span>
              <span>{r.s}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Do the math + guarantee                                              */
/* ------------------------------------------------------------------ */
function MathAndGuarantee() {
  return (
    <section className="section" id="math">
      <div className="wrap">
        <div style={{ maxWidth: 840, margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <Eyebrow>Do the math</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(32px, 3.8vw, 46px)", marginTop: 18 }}>
              A system that pays for itself.
            </h2>
            <p className="lead" style={{ marginTop: 18 }}>
              The invisible cost of doing business is the money you don't know you're losing.
              <br />
              <strong><em>Kourro</em> </strong>is designed as a profit-recovery tool.
              If you stop losing just a little money every month, Kourro pays for itself.
              It isn&rsquo;t an expense, <strong className="display"><em>KOURRO</em></strong> the way to stop losing money.
            </p>
          </Reveal>

          <div className="fair-list" style={{ gridTemplateColumns: "1fr 1fr", textAlign: "left" }}>
            <div className="fair-card">
              <span className="f-ic" style={{ background: "var(--ember)", color: "var(--ember-ink)" }}><Ic name="gift" size={18} /></span>
              <h5>7 days, on your drawer</h5>
              <p>Test Kourro live with your team. Not convinced? Full refund, no questions.</p>
            </div>
            <div className="fair-card">
              <span className="f-ic"><Ic name="card" size={18} /></span>
              <h5>Your data stays yours</h5>
              <p>Cancel anytime. Your history and receipts export cleanly — you never lose the record.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function PricingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Plans />
      <Anchor />
      <Compare />
      <MathAndGuarantee />
    </>
  );
}