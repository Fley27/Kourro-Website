import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow, Marquee } from "../components/core";
import { PhoneMock, TableMock, DesktopMock, DashboardMock } from "../components/mockups";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div>
          <Reveal>
            <span className="hero-kicker">
              <span className="dot" /> Kourro - Engineered for you. Built to deliver.
            </span>
          </Reveal>
          <Reveal delay={80}>
            <h1 className="display">
              Every gourde <em className="hx">tracked</em>. Every cent <em className="hx">accounted </em> for.
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead hero-sub">
              The power of a professional point-of-sale, in the palm of your staff's hand. 
              Flawless performance, <strong>online or offline</strong>. Absolute transparency.
              Real-time visibility into <strong>your daily, weekly, and monthly profits.</strong> 
              Built for the Haitian market, support also available in Creole.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="hero-ctas">
              <Link to="/pricing" className="btn btn-ember">
                Start with Kourro — 30 days risk-free <Ic name="arrow" size={15} />
              </Link>
              <Link to="/features" className="btn btn-ghost">
                How it works
              </Link>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="hero-note">
              ✓ Works with or withoutinternet &nbsp;·&nbsp; ✓ Your data stays yours &nbsp;·&nbsp;
              ✓ Support in Creole
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} dir="right">
          <div className="hero-visual">
            <div className="hero-stage" aria-hidden="true" />
            <div className="cycle">
              <div className="cycle-slot">
                <div className="slot-inner">
                  <PhoneMock />
                  <div className="slot-card">
                    <DashboardMock variant="phone" />
                  </div>
                </div>
              </div>
              <div className="cycle-slot">
                <div className="slot-inner">
                  <TableMock />
                  <div className="slot-card">
                    <DashboardMock variant="tablet" />
                  </div>
                </div>
              </div>
              <div className="cycle-slot">
                <div className="slot-inner">
                  <DesktopMock />
                  <div className="slot-card">
                    <DashboardMock variant="desktop" />
                  </div>
                </div>
              </div>
            </div>
            <div className="cycle-dots">
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The way it works today — story of a normal Wednesday                */
/* ------------------------------------------------------------------ */
function Story() {
  return (
    <section className="section" id="story">
      <div className="wrap story-grid">
        <div>
          <Reveal>
            <Eyebrow>The cost of guessing.</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4.4vw, 56px)", marginTop: 18 }}>
              The traditional way of running a store is <em>fragmented.</em>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p className="lead" style={{ marginTop: 22 }}>
              Sales are split between notebooks and memory. Credit is a conversation where 
              the customer remembers <em> the price differently </em>than the owner does. By the time 
              the doors close, <em>the discrepancy</em> between the cash in the drawer 
              and the sales on the page is an <em>unsolved mystery</em>.
            </p>
          </Reveal>
          <Reveal delay={200}>
            <p className="prob-punch">
              This lack of visibility isn't a tradition, it's a <em>liability</em>. It’s a leak in 
              your profit. When you stop <em>recording the truth</em>, you stop growing.
              It's time to replace the notebook with a system that never forgets.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <p className="prob-punch" style={{ marginTop: 22 }}>
               It's time for <strong><em>KOURRO.</em></strong>
            </p>
          </Reveal>
          <Reveal delay={280}>
            <Link to="/about" className="btn btn-ink" style={{ marginTop: 30 }}>
              Why we built Kourro <Ic name="arrow" size={15} />
            </Link>
          </Reveal>
        </div>
        <div className="prob-list">
          {[
            { n: "01", t: "Fragile Records: Paper ledgers that are easily lost, altered, or incomplete." },
            { n: "02", t: "Cash Leakage: Discrepancies in the drawer with no digital trail to explain the loss." },
            { n: "03", t: "Credit Conflict: Handshake agreements that lead to disagreements over totals." },
            { n: "04", t: "The Cloud Illusion: Software that requires a connection you can't always trust." },
          ].map((r, i) => (
            <Reveal key={r.n} delay={i * 70}>
              <div className="prob-row">
                <span className="n">{r.n}</span>
                <p>{r.t}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The change — two apps, one system                                   */
/* ------------------------------------------------------------------ */
function Change() {
  return (
    <section className="onink section" id="change">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <Eyebrow>The Kourro Effect.</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.4vw, 54px)", marginTop: 18 }}>
              Same store, same team. <em style={{ color: "var(--gold)" }}>Higher profits. Better results.</em>
            </h2>
          </div>
        </Reveal>
        <div className="apps">
          <Reveal dir="left">
            <div className="app-card cap">
              <span className="cap-line" />
              <div className="a-ic"><Ic name="phone" size={24} /></div>
              <div className="tag">Mobile app</div>
              <h3 style={{ color: "var(--gold)" }}>Every sale, recorded the second it happens</h3>
              <p>
                  It’s simple: the cashier taps, the receipt prints, and the sale is saved—immediately. 
                  No internet? No problem. Kourro keeps working so you never miss a single gourde.
              </p>
              <Link to="/features#apps" className="btn btn-ink">How the register works <Ic name="arrow" size={15} /></Link>
            </div>
          </Reveal>
          <Reveal dir="right" delay={120}>
            <div className="app-card web" style={{ background: "var(--gold)", borderColor: "var(--gold)" }}>
              <span className="cap-line" style={{ background: "var(--ink)" }} />
              <div className="a-ic" style={{ background: "var(--ink)", color: "var(--gold)" }}><Ic name="laptop" size={24} /></div>
              <div className="tag" style={{ color: "var(--ink)" }}>Web portal</div>
              <h3>See everything from your phone, tablet and computer.</h3>
              <p>
                  Whether you are at home or in another country, you can see your daily sales, 
                  check who owes you money, and track your cashiers. You don't have to wait until 
                  the end of the month to know how your business is doing.
              </p>
              <Link to="/features#apps" className="btn btn-light">See the command center <Ic name="arrow" size={15} /></Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* What changes — outcomes                                              */
/* ------------------------------------------------------------------ */
function Outcomes() {
  const items = [
    { ic: "shield", t: "The drawer adds up", d: "Counted and closed under supervision. If it doesn't match, there's a decision — on record." },
    { ic: "card", t: "Credit gets collected", d: "Limits, balances, receipts. New credit stops when a customer owes too much." },
    { ic: "chart", t: "You know the real profit", d: "Revenue, costs, margins — live. Not what the cashier remembers, what the system counted." },
    { ic: "people", t: "Trust replaces suspicion", d: "Your staff works with facts. Cashiers are protected by the record too." },
  ];
  return (
    <section className="section" id="outcomes">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 90}>
              <div className="feat">
                <span className="f-ic"><Ic name={it.ic} size={18} /></span>
                <h5>{it.t}</h5>
                <p>{it.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delay={200}>
          <div className="quote-strip">
            <blockquote>
              "In 4 months our store deficit went from 5% to zero. When I close the books now,
              the money is there. Every gourde has a name."
            </blockquote>
            <p className="quote-who">Marie Claire — owner of 2 stores, Port-au-Prince</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Plans teaser                                                        */
/* ------------------------------------------------------------------ */
function Plans() {
  return (
    <section className="onink section" id="plans">
      <div className="wrap">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <Reveal>
            <Eyebrow>Tailored for Every Stage.</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4vw, 50px)", marginTop: 18 }}>
              From your first register to <em style={{ color: "var(--gold)" }}>a multi-store enterprise.</em>
            </h2>
            <p className="lead" style={{ marginTop: 18, color: "rgba(246,241,228,0.7)" }}>
                Whether you're managing one location or scaling a retail chain, <em>Kourro</em> has a path for you. 
                Start with a single store and unlock the power of credit tracking and multi-store analytics 
                as your business expands.
            </p>
            <Link to="/pricing" className="btn btn-ember" style={{ marginTop: 28 }}>
              Compare plans & pricing <Ic name="arrow" size={15} />
            </Link>
          </Reveal>
          <div style={{ display: "grid", gap: 12 }}>
            {[
              { t: "Foundation", d: "One location, 5 users. Every gourde is accounted for.", p: "from $199/year" },
              { t: "Pro", d: "Up to 3 locations, 10 users per store, Better Credits management", p: "from $399/year" },
              { t: "Signature", d: "We build it around your business, franchises, multi-owner.", p: "custom quote" },
            ].map((r, i) => (
              <Reveal key={r.t} delay={i * 80}>
                <Link to="/pricing" style={{ textDecoration: "none", display: "block" }}>
                  <div className="plan-strip">
                    <span className="ps-t">{r.t}</span>
                    <span className="ps-d">{r.d}</span>
                    <span className="ps-p">{r.p}</span>
                    <Ic name="arrow" size={16} />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Final CTA                                                           */
/* ------------------------------------------------------------------ */
function FinalCta() {
  return (
    <section className="section" id="start">
      <div className="wrap cta-final">
        <Reveal>
          <div className="big-title display">
            The truth about <em>your profit,</em> <br/> delivered every single night.
          </div>
        </Reveal>
        <Reveal delay={100}>
          <p className="lead" style={{ margin: "22px auto 36px", maxWidth: 500 }}>
              Our plans are billed annually to provide you with uninterrupted service. 
              We provide a 7-day window for full refunds to ensure our system meets your expectations. 
              As always, your data remains your property.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/pricing" className="btn btn-ember">Choose your plan <Ic name="arrow" size={15} /></Link>
            <Link to="/contact" className="btn btn-ghost">Talk to us first</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function HomePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Hero />
      <Marquee items={[
        "No Internet? No Problem", 
        "Everything in Creole", 
        "Easy Digital Payments", 
        "Control All Your Businesses", 
        "No More Missing Money",
        "See Your Sales Instantly", 
        "Easy Credit Tracking", 
        "Know Your Customers", 
        "Automatic Credits On Sales Alerts"
      ]}/>
      <Story />
      <Change />
      <Outcomes />
      <Plans />
      <FinalCta />
    </>
  );
}