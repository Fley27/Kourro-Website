import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";
import { MockRegister, MockShift, MockCredit, MockStock, MockStores } from "../components/TourMockups";

/* ------------------------------------------------------------------ */
/* Feature tabs — segmented product tour, no hero block                */
/* ------------------------------------------------------------------ */

const TABS = [
  { 
    id: "register", // Keep this ID the same so the page knows what to show
    icon: "phone", 
    t: "Remote Ownership", 
    d: "Stop wondering what's happening at your store. See every sale and every movement in real-time, from anywhere in the world. You are present, even when you're absent." 
  },
  { 
    id: "shift", // Keep this ID the same
    icon: "receipt", 
    t: "Effortless Collection", 
    d: "Stop chasing your customers. Kourro handles the awkward conversations for you, sending professional reminders that bring your money back without you lifting a finger." 
  },
  { 
    id: "credit", // Keep this ID the same
    icon: "card", 
    t: "Profit Intelligence", 
    d: "Stop guessing which products are your winners. Kourro tells you exactly which items are driving your profit and which ones are just taking up space on your shelf." 
  },
  { 
    id: "stock", // Keep this ID the same
    icon: "box", 
    t: "Stock Control", 
    d: "Bundle/bag/lot units, low-stock alerts, transfers, and register pickups. Keep your shelves full and your records precise." 
  },
  { 
    id: "stores", // Keep this ID the same
    icon: "store", 
    t: "Client Equity", 
    d: "Your customers are your most valuable asset. Kourro builds a digital database of your VIPs, their habits, and their preferences." 
  },
];

function Tour() {
  const [active, setActive] = React.useState(TABS[0].id);
  const zoneRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  React.useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.45;
      let next = 0;
      let anyZone = false;
      zoneRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        if (r.height > 0) anyZone = true;
        if (r.top < line) next = i;
      });
      if (!anyZone || !TABS[next]) return; // mobile tap-list mode — respect manual selection
      setActive((cur) => (TABS[next].id === cur ? cur : TABS[next].id));
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const tab = TABS.find((t) => t.id === active)!;
  const dark = active === "shift" || active === "credit";
  const activeIndex = TABS.findIndex((t) => t.id === active);

  return (
    <section className="tour section" id="top">
      <div className="wrap">
        <Reveal>
          <div className="section-head center">
            <Eyebrow>Product tour</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4.2vw, 54px)", marginTop: 18 }}>
              Seven years of store problems, <em>answered in one app.</em>
            </h2>
            <p className="lead" style={{ marginTop: 18, maxWidth: 640 }}>
              Keep scrolling — the register follows you as the screen advances. Each screen is
              a real Kourro workflow your staff could run tonight.
            </p>
          </div>
        </Reveal>

        <div className="tour-scroll">
          <div className="tour-pin">
            {/* Horizontal sticky tab bar */}
            <Reveal delay={60}>
              <div className="tour-tab-rail">
                {TABS.map((t, i) => (
                  <button
                    key={t.id}
                    type="button"
                    className={"tour-tab" + (active === t.id ? " on" : "")}
                    onClick={() => setActive(t.id)}
                  >
                    <span className="tour-tab-num">{String(i + 1).padStart(2, "0")}</span>
                    <span className="tour-tab-icon"><Ic name={t.icon} size={14} /></span>
                    <span className="tour-tab-title">{t.t}</span>
                  </button>
                ))}
              </div>
            </Reveal>

            {/* Container: left content + right tablet-frame mockup */}
            <div className="tour-container">
              <div className="tour-content">
                <Reveal delay={100}>
                  <div className="tour-step-anim" key={active}>
                    <span className="tour-step-num">{String(activeIndex + 1).padStart(2, "0")}</span>
                    <div className="tour-step-rule" />
                    <h3>{tab.t}</h3>
                    <p>{tab.d}</p>
                  </div>
                </Reveal>
                <div className="tour-step-foot">
                  <span className="tour-step-count">0{activeIndex + 1} / {String(TABS.length).padStart(2, "0")}</span>
                  <span className="tour-step-bar"><i style={{ width: `${((activeIndex + 1) / TABS.length) * 100}%` }} /></span>
                </div>
              </div>
              <div className="tour-mockup">
                <div className="tour-mockup-frame">
                  <PhoneStage active={active} dark={dark} activeIndex={activeIndex} />
                </div>
              </div>
            </div>
          </div>

          {/* Scroll zone triggers (invisible) */}
          {TABS.map((t, i) => (
            <div key={t.id} className="tour-zone" data-index={i} ref={(el) => { zoneRefs.current[i] = el; }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhoneStage({ active, dark, activeIndex }: { active: string; dark: boolean; activeIndex: number }) {
  const mocks: Record<string, React.FC> = {
    register: MockRegister,
    shift: MockShift,
    credit: MockCredit,
    stock: MockStock,
    stores: MockStores,
  };
  return (
    <div className={"tour-stage" + (dark ? " dark" : "")}>
      {TABS.map((t) => {
        const Mock = mocks[t.id];
        const on = t.id === active;
        return (
          <div key={t.id} className={"tour-shot" + (on ? " on" : "")} aria-hidden={!on}>
            {Mock ? <Mock /> : null}
          </div>
        );
      })}
      <div className="tour-progress" aria-hidden="true">
        {TABS.map((t, i) => (
          <i key={t.id} className={i <= activeIndex ? "on" : ""} />
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Before / after — transformation ledger + live rhythm monitor       */
/* ------------------------------------------------------------------ */
function Comparison() {
  const rows = [
    { tag: "Sales", old: "Notebook that can be rewritten", ko: "Records that can't be erased — synced everywhere" },
    { tag: "Checkout", old: "Drawer short with no explanation", ko: "Every mismatch becomes a debt or loss, approved on record" },
    { tag: "Credit", old: "Credit remembered differently", ko: "Limits, balances and receipts on every transaction" },
    { tag: "Offline", old: "Cloud app that dies in a blackout", ko: "Works offline, syncs when the internet returns" },
    { tag: "Team", old: "\u201cWho said what?\u201d between staff and owner", ko: "Logged decisions with secret codes and roles" },
  ];
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="section-head center">
          <Reveal>
            <Eyebrow>Before / after</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4vw, 50px)", marginTop: 18 }}>
              Your store today, <em>and with Kourro.</em>
            </h2>
            <p className="lead" style={{ marginTop: 18, maxWidth: 600 }}>
              Five frictions every shop knows by heart — and what replaces each one
              the night you install Kourro.
            </p>
          </Reveal>
        </div>

        <Reveal delay={80}>
          <div className="bx-panel">
            <div className="bx-head" aria-hidden="true">
              <span />
              <span className="bx-head-cell bad">
                <span className="bx-x"><Ic name="x" size={12} /></span>
                <span className="bx-head-tx">Without Kourro<small>The notebook era</small></span>
              </span>
              <span />
              <span className="bx-head-cell good">
                <span className="bx-check"><Ic name="check" size={12} /></span>
                <span className="bx-head-tx">With Kourro<small>Starting tonight</small></span>
              </span>
            </div>
            <ol className="bx-rows">
              {rows.map((r, i) => (
                <li key={r.old} className="bx-row">
                  <Reveal className="bx-rowgrid" delay={i * 70}>
                    <span className="bx-idx">{String(i + 1).padStart(2, "0")}</span>
                    <div className="bx-pain">
                      <span className="bx-micro">Before</span>
                      <span className="bx-x"><Ic name="x" size={12} /></span>
                      <p>{r.old}</p>
                    </div>
                    <span className="bx-arrow" aria-hidden="true"><Ic name="arrow" size={14} /></span>
                    <div className="bx-gain">
                      <span className="bx-micro">After</span>
                      <span className="bx-check"><Ic name="check" size={12} /></span>
                      <p>{r.ko}</p>
                      <span className="bx-tag">{r.tag}</span>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
            <div className="bx-foot">
              <span className="bx-verdict">Same store. Same team. <em>Different result.</em></span>
              <Link to="/pricing" className="bx-link">See plans <Ic name="arrow" size={14} /></Link>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* The one-panel answers — what it solves for you                      */
/* ------------------------------------------------------------------ */
function Solve() {
  const items = [
    { n: "01", t: "\u201cThe power goes out and everything stops.\u201d", s: "Kourro saves every sale on the phone itself. Registers near each other share sales directly; when the internet returns, everything uploads automatically. The store never stops selling." },
    { n: "02", t: "\u201cThe drawer doesn't match and nobody can say why.\u201d", s: "Register opens, counts, and closes each session. The system shows what the drawer should hold — the cashier counts, and the answer is either \u2018it matches\u2019 or a recorded decision (debt or store loss) approved up the chain." },
    { n: "03", t: "\u201cCredit disappears — customers remember differently than I do.\u201d", s: "Every \u2018credit\u2019 has a customer, a limit, and a receipt. The register refuses to open new credit when someone owes too much. Collections are recorded with proof." },
    { n: "04", t: "\u201cI don't know the truth of my business until it's too late.\u201d", s: "The web dashboard shows today, this week, this month: revenue, payment mix (cash, MonCash, NatCash, credit), team totals, and margins. From the store, the road, or abroad." },
  ];
  return (
    <section className="section onink" id="solve">
      <div className="wrap">
        <Reveal>
          <div className="section-head">
            <Eyebrow>What it actually fixes</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(36px, 4.4vw, 52px)", marginTop: 18 }}>
              Four complaints, <em style={{ color: "var(--gold)" }}>four answers.</em>
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
/* CTA                                                                 */
/* ------------------------------------------------------------------ */
function Cta() {
  return (
    <section className="section">
      <div className="wrap cta-final">
        <Reveal>
          <div className="big-title display">
            See it on your counter, <em style={{ color: "var(--ember)" }}>with your team.</em>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 32 }}>
            <Link to="/contact" className="btn btn-ember">Book a free demo <Ic name="arrow" size={15} /></Link>
            <Link to="/pricing" className="btn btn-ghost">Go straight to pricing</Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
export function FeaturesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Tour />
      <Comparison />
      <Solve />
      <Cta />
    </>
  );
}