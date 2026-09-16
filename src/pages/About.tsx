import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Opening statement — editorial, not a hero                           */
/* ------------------------------------------------------------------ */
function Opening() {
  return (
    <section className="story-land" id="top">
      <div className="wrap">
        <Reveal>
          <span className="eyebrow">About Kourro</span>
          <p className="story-land-line">
            Too many owners work all day and still can't say, at night,
            <em> how much the business made.</em>
          </p>
        </Reveal>
        <Reveal delay={140}>
          <p className="story-land-lead">
            We built Kourro to fix that one sentence. The register that never stops selling, the
            record that never lies, the dashboard that tells the truth — in Creole, in gourdes,
            on the phones that already exist in Haiti.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The story — founder's letter                                        */
/* ------------------------------------------------------------------ */
function Story() {
  return (
    <section className="section" id="story">
      <div className="wrap essay">
        <Reveal>
          <Eyebrow>Why we built Kourro</Eyebrow>
        </Reveal>
        <Reveal delay={100}>
          <p className="essay-first">
            I've seen it happen too many times. I've watched hardworking Haitian business owners
            pour their entire lives into their dreams, only for a single tragedy to wipe it all
            away. Because there was no plan and no one prepared to step in, a lifetime of sacrifice
            ended in bankruptcy.
          </p>
        </Reveal>
        <Reveal delay={160}>
          <p>
            Then there are the businesses where the math just doesn't add up — where spending far
            outweighs profit, yet the failure is blamed on "the devil" or bad luck, rather than a
            lack of systems.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <p className="essay-break">
            And perhaps the most painful part of all: the betrayal. The moment you realize that the
            people in your inner circle — the ones you trusted most — have been stealing from you.
            And by the time you notice… it's already too late.
          </p>
        </Reveal>
        <Reveal delay={280}>
          <p>
            I'm sharing this because you deserve better. You deserve a business that is stable,
            transparent, and sustainable.
          </p>
        </Reveal>
        <Reveal delay={340}>
          <p>
            Kourro is here to help you build the right systems so that your business continues to
            deliver, no matter what happens. We help you move from survival to stability.
          </p>
        </Reveal>
        <Reveal delay={400}>
          <p className="essay-legacy">
            With Kourro, you aren't just running a business. <em>You are building a legacy.</em>
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Commitments — what we stand on                                      */
/* ------------------------------------------------------------------ */
function Commit() {
  const items = [
    { ic: "moon", t: "Bought in, in Creole", d: "The interface, the support, the training — in the language the store actually runs on." },
    { ic: "shield", t: "Records that stay", d: "History that can't be rewritten by hand. Your audit trail is a feature, not an afterthought." },
    { ic: "people", t: "Work with your team, not against them", d: "Clear counts and named decisions replace suspicion. Good cashiers shine under Kourro." },
    { ic: "gift", t: "Your business stays yours", d: "Cancel anytime, export everything. We win by being useful — not by trapping your data." },
  ];
  return (
    <section className="section onink" id="commit">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <Eyebrow>What we commit to</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4.4vw, 52px)", marginTop: 18 }}>
              Four promises, <em style={{ color: "var(--gold)" }}>written down.</em>
            </h2>
          </div>
        </Reveal>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 90}>
              <div style={{ padding: 28, borderRadius: 20, border: "1px solid rgba(246,241,228,0.12)", background: "rgba(246,241,228,0.05)", height: "100%" }}>
                <span className="smark" style={{ background: "var(--gold)", color: "var(--ink)" }}><Ic name={it.ic} size={18} /></span>
                <h4 style={{ fontFamily: "var(--serif)", fontSize: 20, fontWeight: 600, margin: "16px 0 8px" }}>{it.t}</h4>
                <p style={{ fontSize: 13.5, lineHeight: 1.65, color: "rgba(246,241,228,0.72)" }}>{it.d}</p>
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
          <h2 className="display" style={{ fontSize: "clamp(36px, 4.6vw, 60px)" }}>
            We'd rather answer your question <em>than sell you a plan.</em>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="lead" style={{ margin: "20px auto 34px", maxWidth: 540 }}>
            Message us in Creole. Tell us about your store — and we'll tell you honestly if Kourro
            is a fit.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link to="/contact" className="btn btn-ember">Start the conversation <Ic name="arrow" size={15} /></Link>
            <Link to="/features" className="btn btn-ghost">Or see how it works</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Opening />
      <Story />
      <Commit />
      <Ask />
    </>
  );
}