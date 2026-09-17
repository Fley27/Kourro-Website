import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Plain-language terms — enforceable, but human                       */
/* ------------------------------------------------------------------ */
const SECTIONS = [
  {
    t: "The service",
    b: "Kourro is a multi-tenant distribution POS: your registers, your dashboard, and your records, running on infrastructure shared with other stores but with your data strictly isolated from theirs. What happens in your store stays in your store — other tenants cannot see it, and neither can their staff. We operate the service; you operate your business.",
  },
  {
    t: "Subscription: you pay, we deliver",
    b: "A subscription means exactly that — you pay for a service, and the service is delivered as expected: registers that sell online and offline, credit tools that collect, and a dashboard that tells the truth. Plans are billed in advance in HTG and renew until you cancel. Cancel anytime and export everything first; your data leaves with you. Refunds follow the policy stated on the Pricing page at the time of purchase.",
  },
  {
    t: "Your duties",
    b: "Give us true information when you sign up. Keep one named account per person. Sell only lawful goods. Follow the register's open–count–close routine instead of working around it. These aren't formalities — every shortcut lands in your own books, and we can't fix a record you chose not to keep.",
  },
  {
    t: "Rules that protect you from yourself",
    b: "Most of our rules exist for one reason: to stop you from accidentally hurting your own business. Shared passwords, skipped counts, backdated edits, and end-of-day 'adjustments' feel harmless in the moment — then the drawer doesn't match and nobody can prove anything. So Kourro requires approvals, roles, and signed records. The friction is the feature: it keeps you honest with yourself.",
  },
  {
    t: "Security, and why we may block you",
    b: "We watch for patterns no healthy store produces: one login selling in two towns at once, repeated failed codes, tampering with the app, or fraud-shaped credit activity. When we see them, we may temporarily freeze the account while we verify it is really you. A paused hour is better than a poisoned ledger — the block exists so your records stay true and accurate, even if the suspicious activity turns out to be yours.",
  },
  {
    t: "Fair use",
    b: "Don't use Kourro for anything illegal, don't defraud customers or lenders through it, don't resell or rent out your access, and don't attack, probe, or overload the service. Shared infrastructure means one store's abuse slows every store — we will end accounts that put the network at risk.",
  },
  {
    t: "Availability and updates",
    b: "Kourro is offline-first: your registers keep selling without internet and sync when it returns. We maintain, back up, and update the service, and we aim for it to simply always be there. Rare maintenance windows and outages outside our control (power grids, carriers) can still happen; when they do, your counters keep working and we say so plainly.",
  },
  {
    t: "Liability, changes, and contact",
    b: "Kourro is provided as a service, not an insurance policy: our responsibility is to deliver working software and honest records, and the most we can owe for anything going wrong is what you paid us. If these terms ever change, we will post the new version with a new date and tell you inside the app — continuing to use Kourro after that means you accept them. Questions about any of this? Ask a person on the Contact page, in Creole, French, or English.",
  },
];

/* ------------------------------------------------------------------ */
/* Opening                                                             */
/* ------------------------------------------------------------------ */
function Opening() {
  return (
    <section className="story-land" id="top">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Terms of service</span>
          <p className="story-land-line">
            The rules that protect you — <em>from yourself.</em>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="story-land-lead">
            A subscription means you pay for a service and the service gets delivered. These terms
            describe that exchange — and the few strict rules that keep your records true,
            your account secure, and every store on the network safe.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="story-meta">
            <span>Plain language, enforceable</span><i aria-hidden="true" />
            <span>Updated September 2026</span><i aria-hidden="true" />
            <span>5 min read</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* In short — the three sentences that matter                          */
/* ------------------------------------------------------------------ */
function InShort() {
  const keys = [
    { n: "01", t: "Pay for service, get service", s: "Registers, credit tools, dashboard — delivered as expected, every day of your subscription." },
    { n: "02", t: "Rules guard your own books", s: "Approvals, roles, and signed records stop shortcuts that would only hurt you later." },
    { n: "03", t: "Suspicion can pause you", s: "Strange activity may freeze your account until we confirm it's really you. The ledger comes first." },
  ];
  return (
    <section className="section" id="short" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <div className="terms-keys">
          {keys.map((k, i) => (
            <Reveal key={k.n} delay={i * 90}>
              <div className="terms-key">
                <span className="terms-key-n">{k.n}</span>
                <h4>{k.t}</h4>
                <p>{k.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full terms — native accordions, no JS needed                        */
/* ------------------------------------------------------------------ */
function FullTerms() {
  return (
    <section className="section" id="terms" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="section-head center">
            <Eyebrow>The fine print, in large print</Eyebrow>
            <h2 className="display display-md mt-lg">
              Eight sections. <em>No traps.</em>
            </h2>
          </div>
        </Reveal>
        <div className="terms-list">
          {SECTIONS.map((s, i) => (
            <Reveal key={s.t} delay={Math.min(i, 3) * 60}>
              <details className="terms-item" open={i === 0} name="terms">
                <summary>
                  <span className="terms-n">{String(i + 1).padStart(2, "0")}</span>
                  <span className="terms-t">{s.t}</span>
                  <span className="terms-chev" aria-hidden="true"><Ic name="chevron-right" size={16} /></span>
                </summary>
                <div className="terms-b">
                  <p>{s.b}</p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Closing ask                                                         */
/* ------------------------------------------------------------------ */
function Ask() {
  return (
    <section className="section" id="talk">
      <div className="wrap cta-final">
        <Reveal>
          <h2 className="display display-lg mt-lg">
            Disagree with a rule? <em>Tell us before you break it.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead" style={{ margin: "20px auto 34px", maxWidth: 540 }}>
            Most blocks and bans start as misunderstandings. A two-minute message
            can save your account — write to us first.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-ember">Contact the team <Ic name="arrow" size={15} /></Link>
            <Link to="/privacy" className="btn btn-ghost">Read the privacy page</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function TermsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Opening />
      <InShort />
      <FullTerms />
      <Ask />
    </>
  );
}
