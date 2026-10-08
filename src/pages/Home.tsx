import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow, Marquee, useMediaQuery } from "../components/core";
import { PhoneMock, TableMock, DashboardMock } from "../components/mockups";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */
function Hero() {
  const desktop = useMediaQuery("(min-width: 768px)");
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
              Every gourde <em className="hx">tracked</em>. Every cent <em className="hx">accounted</em> for.
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
                Start with Kourro — 7 days risk-free <Ic name="arrow" size={15} />
              </Link>
              <Link to="/features" className="btn btn-ghost">
                How it works
              </Link>
            </div>
          </Reveal>
          <Reveal delay={300}>
            <p className="hero-note">
              ✓ Works with or without internet &nbsp;·&nbsp; ✓ Your data stays yours &nbsp;·&nbsp;
              ✓ Support in Creole
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} dir="right">
          <div className="hero-visual">
            <div className="hero-stage" aria-hidden="true" />
            {desktop ? (
              /* desktop+tablet: 2-device cycle (phone with companion card + standalone tablet) */
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
                  <div className="slot-inner slot-inner-tablet">
                    <TableMock />
                  </div>
                </div>
              </div>
            ) : (
              /* mobile: single lightweight phone mock, no cycle */
              <div className="cycle cycle-mobile">
                <div className="cycle-slot">
                  <div className="slot-inner">
                    <PhoneMock />
                  </div>
                </div>
              </div>
            )}
            <div className="cycle-dots" aria-hidden="true">
              <span />
              <span />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Premium Keynote Storytelling: A Day in the Life                    */
/* ------------------------------------------------------------------ */
function Story() {
  const storyActs = [
    {
      time: "08:30 AM",
      phase: "Morning Opening",
      title: "Where did the ledger go?",
      narrative: "A torn page or spilled coffee shouldn't erase six months of customer balances. Kourro seals every single sale into an immutable digital record the second it is tapped.",
      visual: (
        <div className="art">
          <div className="art-head">
            <span className="art-label">Immutable Record</span>
            <span className="art-status"><span className="art-dot" />Synced</span>
          </div>
          <div className="art-figure">G 2,450.00</div>
          <div className="art-sub">TX #0842 · French Flour 50kg · Paid in full</div>
        </div>
      ),
      metric: "100% Tamper-Proof Trail",
    },
    {
      time: "01:15 PM",
      phase: "Midday Blackout",
      title: "When the power cuts, sales flow.",
      narrative: "When city power cuts, traditional cloud cashiers freeze and lines stall. Kourro runs 100% locally with zero latency, printing receipts and scanning items without internet.",
      visual: (
        <div className="art">
          <div className="art-head">
            <span className="art-label">Local Engine</span>
            <span className="art-status live"><span className="art-dot" />Active</span>
          </div>
          <div className="art-figure">0ms<span className="art-fig-unit">Latency</span></div>
          <div className="art-bar"><i /></div>
          <div className="art-caption">100% Offline Transaction Buffer</div>
        </div>
      ),
      metric: "Zero-Downtime Guarantee",
    },
    {
      time: "06:45 PM",
      phase: "Evening Shift Close",
      title: "Zero mystery deficits at closing.",
      narrative: "No more guessing where the missing cash went. The physical drawer is counted and matched against registered sales in seconds, ending end-of-day finger-pointing forever.",
      visual: (
        <div className="art">
          <div className="art-head">
            <span className="art-label">Shift Close</span>
            <span className="art-status"><span className="art-dot" />Matched</span>
          </div>
          <div className="art-rows">
            <div className="art-row">
              <span>Expected in Drawer</span>
              <strong>G 54,120</strong>
            </div>
            <div className="art-row">
              <span>Counted Physical Cash</span>
              <strong className="ok">G 54,120 ✓</strong>
            </div>
            <div className="art-row total">
              <span>Discrepancy</span>
              <strong className="ok">0.00 Perfect</strong>
            </div>
          </div>
        </div>
      ),
      metric: "100% Drawer Accuracy",
    },
  ];

  return (
    <section className="section apple-story-section" id="story">
      <div className="wrap">
        {/* Cinematic Section Header with Generous Breathing Room */}
        <div className="apple-story-head">
          <Reveal>
            <Eyebrow>A Day in the Life · The Cost of Guessing</Eyebrow>
            <h2 className="display display-md mt-lg">
              The traditional way of running a store is <em>fragmented.</em>
            </h2>
            <p className="lead mt-lg apple-story-lead">
              Sales split between paper ledgers and memory. Handshake credit remembered differently across the counter.
              By closing time, the missing gourdes in the drawer become an unsolved mystery.
            </p>
          </Reveal>
        </div>

        {/* Editorial 3-column day grid — hairline rules, no cards */}
        <div className="day-grid">
          {storyActs.map((act, i) => (
            <Reveal key={act.time} delay={i * 120} className="day-col">
              <span className="day-tick" aria-hidden="true" />
              <span className="day-time">{act.time}</span>
              <span className="day-phase">{act.phase}</span>
              <span className="day-rule" aria-hidden="true" />

              <h3 className="day-title">{act.title}</h3>

              {act.visual}

              <p className="day-narrative">{act.narrative}</p>

              <span className="day-metric">
                <Ic name="check" size={12} /> {act.metric}
              </span>
            </Reveal>
          ))}
        </div>

        {/* Minimalist Floating Banner */}
        <Reveal delay={180}>
          <div className="apple-story-banner">
            <div className="as-banner-content">
              <span className="as-banner-eyebrow">The Kourro Standard</span>
              <h3 className="as-banner-title">
                This lack of visibility isn't tradition. <em>It's a profit leak.</em>
              </h3>
              <p className="as-banner-desc">
                When you stop recording the truth, you stop growing. Replace the fragile notebook with an operating system engineered to protect every gourde.
              </p>
            </div>
            <div className="as-banner-actions">
              <Link to="/about" className="btn btn-primary">
                Why we built Kourro <Ic name="arrow" size={15} />
              </Link>
              <Link to="/features" className="btn btn-outline">
                Explore the platform
              </Link>
            </div>
          </div>
        </Reveal>
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
            <h2 className="display display-md mt-lg">
              Same store, same team. <em style={{ color: "var(--gold)" }}>Higher profits. Better results.</em>
            </h2>
          </div>
        </Reveal>
        <div className="apps">
          <Reveal dir="left">
            <div className="app-col">
              <div className="app-meta">
                <span className="a-ic"><Ic name="phone" size={20} /></span>
                <span className="tag">Mobile app</span>
              </div>
              <h3>Every sale, recorded the second it happens</h3>
              <p>
                  It’s simple: the cashier taps, the receipt prints, and the sale is saved—immediately. 
                  No internet? No problem. Kourro keeps working so you never miss a single gourde.
              </p>
              <Link to="/features#top" className="app-link">How the register works <Ic name="arrow" size={15} /></Link>
            </div>
          </Reveal>
          <Reveal dir="right" delay={120}>
            <div className="app-col accent">
              <div className="app-meta">
                <span className="a-ic"><Ic name="laptop" size={20} /></span>
                <span className="tag">Web portal</span>
              </div>
              <h3>See everything from your phone, tablet and computer.</h3>
              <p>
                  Whether you are at home or in another country, you can see your daily sales, 
                  check who owes you money, and track your cashiers. You don't have to wait until 
                  the end of the month to know how your business is doing.
              </p>
              <Link to="/features#compare" className="app-link">See the command center <Ic name="arrow" size={15} /></Link>
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
        <div className="outcome-grid">
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
        <div className="plans-teaser">
          <Reveal>
            <Eyebrow>Tailored for Every Stage.</Eyebrow>
            <h2 className="display display-md mt-lg">
              From your first register to <em style={{ color: "var(--gold)" }}>a multi-store enterprise.</em>
            </h2>
            <p className="lead mt-md" style={{ color: "var(--paper)" }}>
                Whether you're managing one location or scaling a retail chain, <em>Kourro</em> has a path for you. 
                Start with a single store and unlock the power of credit tracking and multi-store analytics 
                as your business expands.
            </p>
            <Link to="/pricing" className="btn btn-ember mt-lg">
              Compare plans & pricing <Ic name="arrow" size={15} />
            </Link>
          </Reveal>
          <div className="plans-strips">
            {[
              { t: "Foundation", d: "One location, 5 users. Every gourde is accounted for.", p: "from $199/year" },
              { t: "Pro", d: "Up to 3 locations, 10 users per store, better credit management", p: "from $399/year" },
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
          <p className="lead" style={{ margin: "var(--s-6) auto var(--s-7)", maxWidth: 500 }}>
              Our plans are billed annually to provide you with uninterrupted service. 
              We provide a 7-day window for full refunds to ensure our system meets your expectations. 
              As always, your data remains your property.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: "var(--s-4)", justifyContent: "center", flexWrap: "wrap" }}>
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