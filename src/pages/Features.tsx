import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";
import { WeeklyHistory } from "../components/mockups";

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
            <div className="tour-cols">
              <div className="tour-solo-step">
                <div className="tour-step-anim" key={active}>
                  <span className="tour-step-num">{String(activeIndex + 1).padStart(2, "0")}</span>
                  <div className="tour-step-rule" />
                  <h3>{tab.t}</h3>
                  <p>{tab.d}</p>
                </div>
                <div className="tour-step-foot">
                  <span className="tour-step-count">0{activeIndex + 1} / {String(TABS.length).padStart(2, "0")}</span>
                  <span className="tour-step-bar"><i style={{ width: `${((activeIndex + 1) / TABS.length) * 100}%` }} /></span>
                </div>
              </div>
<PhoneStage active={active} dark={dark} activeIndex={activeIndex} />
            </div>
          </div>

          {TABS.map((t, i) => (
            <div key={t.id} className="tour-zone" data-index={i} ref={(el) => { zoneRefs.current[i] = el; }} />
          ))}

          <div className="tour-mobile">
            <PhoneStage active={active} dark={dark} activeIndex={activeIndex} />
            <div className="tour-list">
              {TABS.map((t, i) => (
                <button key={t.id} className={"tour-step" + (active === t.id ? " on" : "")} onClick={() => setActive(t.id)}>
                  <span className="tour-step-num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="tour-step-body">
                    <h3>{t.t}</h3>
                    <p>{t.d}</p>
                  </div>
                  <span className="tour-step-ic"><Ic name={t.icon} size={16} /></span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PhoneStage({ active, dark, activeIndex }: { active: string; dark: boolean; activeIndex: number }) {
  const shots: Record<string, string> = {
    register: "/mock/register.png",
    shift: "/mock/client.png",
    credit: "/mock/credit.png",
    stock: "/mock/stock.png",
    stores: "/mock/client-equity.png",
  };
  return (
    <div className={"tour-stage" + (dark ? " dark" : "")}>
      {TABS.map((t) => {
        const src = shots[t.id];
        const on = t.id === active;
        return (
          <div key={t.id} className={"tour-shot" + (on ? " on" : "")} aria-hidden={!on}>
            {src ? (
              <img src={src} alt={t.t + " screen"} />
            ) : (
              <div className="tour-phone">
                <div className="tp-top" />
                <div className="tp-screen">
                  <div className="tp-inner">
                    <div className="tp-head">{t.t}<span className="tp-live">● live</span></div>
                    <ScreenContent tab={t.id} />
                  </div>
                </div>
              </div>
            )}
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

function ScreenContent({ tab }: { tab: string }) {
  const rows = (arr: [string, string][]) =>
    arr.map(([a, b]) => (
      <div className="tp-row" key={a}>
        <span>{a}</span>
        <b>{b}</b>
      </div>
    ));

  switch (tab) {
    case "register":
      return (
        <>
          <div className="tp-amount">G 1,790.00</div>
          <div className="tp-chips">
            <span>Cash</span><span>MonCash</span><span>NatCash</span>
          </div>
          <div className="tp-rows">
            {rows([["Water 5G", "G 80.00"], ["Rice 5kg", "G 650.00"], ["Oil 1L · x2", "G 680.00"], ["Credit payment", "-G 200.00"]])}
          </div>
          <div className="tp-total">Total <b>G 1,790.00</b></div>
        </>
      );
    case "shift":
      return (
        <>
          <div className="tp-alert">Reminder ready</div>
          <div className="tp-cash"><b>G 1,500 paid</b><span>toward G 4,200 owed</span></div>
          <div className="tp-sec">Collection log</div>
          <div className="tp-rows">
            {rows([["MonCash · today", "G 1,000"], ["Cash · yesterday", "G 500"], ["NatCash · Monday", "G 900"]])}
          </div>
        </>
      );
    case "credit":
      return (
        <>
          <div className="tp-chips"><span className="on">Week</span><span>Month</span></div>
          <div className="tp-bars">
            {[46, 66, 38, 84, 58, 96, 72].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}
          </div>
          <div className="tp-sec">Top profit</div>
          <div className="tp-rows">
            {rows([["Rice 5kg · margin 24%", "G 18k"], ["Water 5G · margin 19%", "G 9k"]])}
          </div>
        </>
      );
    case "stock":
      return (
        <>
          <div className="tp-alert warn">Low stock · Rice 5kg</div>
          <div className="tp-sec">Shelf status</div>
          <div className="tp-rows">
            {rows([["Oil 1L", "42 left"], ["Water 5G", "12 → restock"], ["Rice 5kg", "3 → restock"]])}
          </div>
        </>
      );
    case "team":
      return (
        <>
          <div className="tp-alert">Approval pending</div>
          <div className="tp-sec">Today's decisions</div>
          <div className="tp-rows">
            {rows([["Shift close", "approved · Patwon"], ["Refund · G 850", "from J. Claude"], ["Open", "by cashier Kettely"]])}
          </div>
        </>
      );
    case "stores":
      return (
        <>
          <div className="tp-sec">VIP clients</div>
          <div className="tp-rows">
            {rows([["Martine V.", "credit G 4,200"], ["Jean-Marc P.", "credit G 900"], ["Roseline J.", "G 0 ✓"]])}
          </div>
          <div className="tp-cash"><b>3 new clients</b><span>this week</span></div>
        </>
      );
    default:
      return null;
  }
}

/* ------------------------------------------------------------------ */
/* Before / after — opens above the fold on this page                  */
/* ------------------------------------------------------------------ */
function Comparison() {
  const rows = [
    { old: "Notebook that can be rewritten", ko: "Record that can't be erased, synced everywhere" },
    { old: "Drawer short with no explanation", ko: "Mismatch becomes a debt or loss, approved on record" },
    { old: "Credit remembered differently", ko: "Limits, balances, and receipts on every transaction" },
    { old: "Cloud app that dies in a blackout", ko: "Works offline, syncs when the internet returns" },
    { old: "\u201cWho said what?\u201d between staff and owner", ko: "Logged decisions with secret codes and roles" },
  ];
  return (
    <section className="section" id="compare">
      <div className="wrap">
        <div className="section-head">
          <Reveal>
            <Eyebrow>Before / after</Eyebrow>
            <h2 className="display" style={{ fontSize: "clamp(34px, 4vw, 50px)", marginTop: 18 }}>
              Your store today, <em>and with Kourro.</em>
            </h2>
          </Reveal>
        </div>
        <div className="cmp">
          <Reveal>
            <div className="cmp-col bad">
              <div className="cmp-head">Without Kourro</div>
              {rows.map(r => (
                <div key={r.old} className="cmp-row"><span className="cmp-x"><Ic name="x" size={12} /></span><span>{r.old}</span></div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="cmp-col good">
              <div className="cmp-head">With Kourro</div>
              {rows.map(r => (
                <div key={r.ko} className="cmp-row"><span className="cmp-c"><Ic name="check" size={12} /></span><span>{r.ko}</span></div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={160}>
          <div className="cmp-week">
            <div className="cmp-week-head">
              <span className="cmp-week-title">Weekly rhythm</span>
              <span className="cmp-week-sub">A live grid of everything moving through your store — the way heartbeats look on a monitor.</span>
            </div>
            <WeeklyHistory />
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
    { n: "03", t: "\u201cCredit disappears — customers remember differently than I do.\u201d", s: "Every \u2018kredi\u2019 has a customer, a limit, and a receipt. The register refuses to open new credit when someone owes too much. Collections are recorded with proof." },
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