import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Opening — the promise in one breath                                 */
/* ------------------------------------------------------------------ */
function Opening() {
  return (
    <section className="story-land" id="top">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">Privacy</span>
          <p className="story-land-line">
            Your numbers are yours. <em>Even we can&rsquo;t see them.</em>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="story-land-lead">
            Kourro is built so your revenue, your profit, and your customers&rsquo; debts stay
            inside your business. Not on our desks, not in our reports — yours.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="story-meta">
            <span>How we protect you</span><i aria-hidden="true" />
            <span>Updated September 2026</span><i aria-hidden="true" />
            <span>3 min read</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Blind by design — what Kourro cannot see                            */
/* ------------------------------------------------------------------ */
function Blind() {
  const items = [
    { n: "01", t: "No backdoor to your numbers", s: "Your revenue and profit live in your registers — not on our screens. Our team has no hidden query, no export, no backdoor that reveals them." },
    { n: "02", t: "Records that can't be rewritten", s: "Every sale, count, and collection is written once and signed. Nobody — not your staff, not us — can quietly edit the past." },
    { n: "03", t: "Nothing to sell, nothing to leak", s: "We cannot sell, share, or surrender data we cannot read. Your business stays your business, by architecture — not by promise." },
  ];
  return (
    <section className="section onink" id="blind">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <Eyebrow>Blind by design</Eyebrow>
            <h2 className="display display-md mt-lg">
              Locked out of your books, <em style={{ color: "var(--gold)" }}>on purpose.</em>
            </h2>
          </div>
        </Reveal>
        <div className="solve-grid cols-3">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={(i % 3) * 90}>
              <div className="solve-card">
                <div className="sc-n">{it.n}</div>
                <h4>{it.t}</h4>
                <p>{it.s}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Credentials — share nothing, sign everything                        */
/* ------------------------------------------------------------------ */
function Credentials() {
  const rows = [
    { tag: "Accounts", old: "One login shared by the whole team", ko: "A named account for every person — every action signed" },
    { tag: "Codes", old: "Passwords written on paper by the register", ko: "Secret codes you can change in seconds, anytime" },
    { tag: "Trust", old: "A caller asks for your password", ko: "Kourro will never ask — hang up and report them" },
  ];
  return (
    <section className="section" id="credentials">
      <div className="wrap">
        <div className="section-head center">
          <Reveal>
            <Eyebrow>Credentials</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4vw, 50px)", marginTop: 18 }}>
              Never share your login. <em>Ever.</em>
            </h2>
            <p className="lead" style={{ marginTop: 18, maxWidth: 600 }}>
              A shared password erases the one thing that protects you: proof of who did what.
              Keep every account personal, and the record stays honest.
            </p>
          </Reveal>
        </div>
        <Reveal delay={80}>
          <div className="bx-panel">
            <div className="bx-head" aria-hidden="true">
              <span />
              <span className="bx-head-cell bad">
                <span className="bx-x"><Ic name="x" size={12} /></span>
                <span className="bx-head-tx">The risky habit<small>What breaks the record</small></span>
              </span>
              <span />
              <span className="bx-head-cell good">
                <span className="bx-check"><Ic name="check" size={12} /></span>
                <span className="bx-head-tx">The Kourro way<small>What keeps it honest</small></span>
              </span>
            </div>
            <ol className="bx-rows">
              {rows.map((r, i) => (
                <li key={r.old} className="bx-row">
                  <Reveal className="bx-rowgrid" delay={i * 70}>
                    <span className="bx-idx">{String(i + 1).padStart(2, "0")}</span>
                    <div className="bx-pain">
                      <span className="bx-micro">Risk</span>
                      <span className="bx-x"><Ic name="x" size={12} /></span>
                      <p>{r.old}</p>
                    </div>
                    <span className="bx-arrow" aria-hidden="true"><Ic name="arrow" size={14} /></span>
                    <div className="bx-gain">
                      <span className="bx-micro">Rule</span>
                      <span className="bx-check"><Ic name="check" size={12} /></span>
                      <p>{r.ko}</p>
                      <span className="bx-tag">{r.tag}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <div className="bx-foot">
              <span className="bx-verdict">Share nothing. <em>Sign everything.</em></span>
              <Link to="/contact" className="bx-link">Report a leak <Ic name="arrow" size={14} /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Leaks — zero tolerance, full investigation                          */
/* ------------------------------------------------------------------ */
function Leaks() {
  const steps = [
    { n: "01", t: "You report it", s: "Message us the moment anything looks wrong — a strange login, a photo of your screen, a rumor. We respond, not with a ticket number, but with people." },
    { n: "02", t: "We trace it", s: "Because every action in Kourro is signed and timestamped, the record itself points at the source. Investigations start from proof, not suspicion." },
    { n: "03", t: "The culprit faces justice", s: "Anyone caught leaking store or customer data — insider or outsider — is cut off immediately and pursued to the full extent of the law." },
  ];
  return (
    <section className="section" id="leaks" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="leak-panel">
            <div className="leak-head">
              <Eyebrow>Leaks</Eyebrow>
              <h2 className="display display-md mt-lg">
                A leak is a crime scene. <em>We treat it like one.</em>
              </h2>
              <p className="lead mt-md" style={{ maxWidth: 620 }}>
                Most companies ask you to trust their intentions. We ask you to look at the record:
                it shows exactly who touched what, and when. That is how culprits get found.
              </p>
            </div>
            <div className="leak-steps">
              {steps.map((st, i) => (
                <Reveal key={st.n} delay={i * 90}>
                  <div className="leak-step">
                    <span className="leak-n">{st.n}</span>
                    <h4>{st.t}</h4>
                    <p>{st.s}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Everyday practices                                                  */
/* ------------------------------------------------------------------ */
function Practices() {
  const items = [
    { n: "01", t: "Encrypted sync", s: "Everything that leaves your register travels encrypted. Interception gets an attacker noise, not numbers." },
    { n: "02", t: "Roles, not master keys", s: "Cashiers, managers, and owners each see only what their role needs. There is no single password that opens everything." },
    { n: "03", t: "Export or erase on request", s: "Your data is portable and deletable. Ask for a full export or a full erasure, and it happens — no maze, no fee." },
    { n: "04", t: "No ads, no trackers, no brokers", s: "Kourro earns from memberships, not from data. We run no ad trackers and sell nothing to anyone, ever." },
  ];
  return (
    <section className="section onink" id="practices">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <Eyebrow>Everyday protection</Eyebrow>
            <h2 className="display display-md mt-lg">
              Quiet habits, <em style={{ color: "var(--gold)" }}>strong walls.</em>
            </h2>
          </div>
        </Reveal>
        <div className="solve-grid">
          {items.map((it, i) => (
            <Reveal key={it.n} delay={(i % 2) * 90}>
              <div className="solve-card">
                <div className="sc-n">{it.n}</div>
                <h4>{it.t}</h4>
                <p>{it.s}</p>
              </div>
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
            Questions about your data? <em>Ask us directly.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead" style={{ margin: "20px auto 34px", maxWidth: 540 }}>
            Write in Creole, French, or English. A person — not a bot — will answer,
            including how to report anything suspicious.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-ember">Contact the team <Ic name="arrow" size={15} /></Link>
            <Link to="/features" className="btn btn-ghost">Or see how it works</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function PrivacyPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Opening />
      <Blind />
      <Credentials />
      <Leaks />
      <Practices />
      <Ask />
    </>
  );
}
