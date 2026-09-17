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
        <Reveal delay={220}>
          <div className="story-meta">
            <span>A founder&rsquo;s letter</span><i aria-hidden="true" />
            <span>Port-au-Prince &middot; Haiti</span><i aria-hidden="true" />
            <span>4 min read</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The story — a founder's letter told in chapters                     */
/* ------------------------------------------------------------------ */
const CHAPTERS = [
  { n: "01", kick: "Chapter 01 · When Everything Falls", title: "The collapse" },
  { n: "02", kick: "Chapter 02 · Numbers Don't Lie", title: "The excuses" },
  { n: "03", kick: "Chapter 03 · Betrayal", title: "The betrayal" },
  { n: "04", kick: "Chapter 04 · The Answer", title: "The answer" },
  { n: "05", kick: "Epilogue · Legacy", title: "The legacy" },
];

function useActiveChapter() {
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    const els = Array.from(document.querySelectorAll(".story-chapter"));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = els.indexOf(e.target);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return active;
}

function Story() {
  const active = useActiveChapter();
  return (
    <section className="section" id="story" style={{ paddingTop: 0 }}>
      <div className="wrap">
        <Reveal>
          <div className="section-head center">
            <Eyebrow>Why we built Kourro</Eyebrow>
          </div>
        </Reveal>
        <div className="story-cols">
          <aside className="story-rail" aria-hidden="true">
            <ol>
              {CHAPTERS.map((c, i) => (
                <li key={c.n} className={i === active ? "on" : ""}>
                  <i />
                  <span>{c.n}</span>
                </li>
              ))}
            </ol>
          </aside>
          <div className="story-body">
            <Reveal className="story-chapter">
              <p className="story-kick">{CHAPTERS[0].kick}</p>
              <h3 className="story-title">{CHAPTERS[0].title}</h3>
              <p className="story-dropcap">
                I&rsquo;ve seen it happen too many times. I&rsquo;ve watched hardworking Haitian business owners
                pour their entire lives into their dreams, only for a single tragedy to wipe it all
                away. Because there was no plan and no one prepared to step in, a lifetime of sacrifice
                ended in bankruptcy.
              </p>
            </Reveal>
            <Reveal className="story-chapter">
              <p className="story-kick">{CHAPTERS[1].kick}</p>
              <h3 className="story-title">{CHAPTERS[1].title}</h3>
              <p>
                Then there are the businesses where the math just doesn&rsquo;t add up — where spending far
                outweighs profit, yet the failure is blamed on &ldquo;the devil&rdquo; or bad luck, rather than a
                lack of systems.
              </p>
            </Reveal>
            <Reveal className="story-chapter">
              <p className="story-kick">{CHAPTERS[2].kick}</p>
              <h3 className="story-title">{CHAPTERS[2].title}</h3>
              <blockquote className="story-pull">
                And perhaps the most painful part of all: the betrayal. The moment you realize that the
                people in your inner circle — the ones you trusted most — have been stealing from you.
                And by the time you notice… it&rsquo;s already too late.
              </blockquote>
            </Reveal>
            <Reveal className="story-chapter">
              <p className="story-kick">{CHAPTERS[3].kick}</p>
              <h3 className="story-title">{CHAPTERS[3].title}</h3>
              <p>
                I&rsquo;m sharing this because you deserve better. You deserve a business that is stable,
                transparent, and sustainable.
              </p>
              <p>
                Kourro is here to help you build the right systems so that your business continues to
                deliver, no matter what happens. We help you move from survival to stability.
              </p>
            </Reveal>
            <Reveal className="story-chapter story-epilogue">
              <p className="story-kick">{CHAPTERS[4].kick}</p>
              <p className="story-legacy">
                With Kourro, you aren&rsquo;t just running a business. <em>You are building a legacy.</em>
              </p>
              <p className="story-sign"><span>Founder, Fenley Ménélas</span></p>
            </Reveal>
          </div>
        </div>
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
            <h2 className="display display-md mt-lg">
              Four promises, <em style={{ color: "var(--gold)" }}>written down.</em>
            </h2>
          </div>
        </Reveal>
        <div className="commit-grid">
          {items.map((it, i) => (
            <Reveal key={it.t} delay={i * 90}>
              <div className="commit-card">
                <span className="smark"><Ic name={it.ic} size={18} /></span>
                <h4>{it.t}</h4>
                <p>{it.d}</p>
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