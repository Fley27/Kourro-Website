import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal, Eyebrow } from "../components/core";
import { Ic } from "../components/icon";

/* ------------------------------------------------------------------ */
/* Demo form + side info — form is the hero                            */
/* ------------------------------------------------------------------ */
function LeadForm() {
  const [sent, setSent] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };
  return (
    <form className="c-form lead-form" onSubmit={submit} id="demo">
      <div>
        <Eyebrow>Book a free demo</Eyebrow>
        <h1 className="display" style={{ fontSize: "clamp(34px, 4vw, 52px)", marginTop: 16 }}>
          See it on your store, <em>then decide.</em>
        </h1>
        <p className="lead" style={{ fontSize: 15, marginTop: 14 }}>
          20 minutes, in Creole, no pressure. We show the register and the dashboard on your type
          of store.
        </p>
      </div>
      {sent ? (
        <div style={{ padding: 22, borderRadius: 16, background: "rgba(200,162,74,0.12)", border: "1px solid rgba(200,162,74,0.4)" }}>
          <b>Mèsi! We received it.</b> Someone will contact you within one business day to set the
          demo time.
        </div>
      ) : (
        <>
          <div className="field-row">
            <label>Your name
              <input required placeholder="Pierre Joseph" />
            </label>
            <label>Phone / WhatsApp
              <input required placeholder="+509 00 00 0000" />
            </label>
          </div>
          <div className="field-row">
            <label>Email
              <input type="email" required placeholder="pjoseph@gmail.com" />
            </label>
            <label>Your store is in…
              <select>
                <option>Ouest</option>
                <option>Nord</option>
                <option>Sud</option>
                <option>Artibonite</option>
                <option>Sud-Est</option>
                <option>Nord-Est</option>
                <option>Nord-Ouest</option>
                <option>Nippes</option>
                <option>Grand-Anse</option>
                <option>Centre</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <div className="field-row">
              <label>Address 1
                <input required placeholder="Pétion-Ville" />
              </label>
              <label>Address 2
                <input required placeholder="Rue Rébecca #22" />
              </label>
          </div>
          <label>What kind of store / how many?
            <select>
              <option>1 store</option>
              <option>2 or 3 stores</option>
              <option>3+ stores</option>
              <option>Not open yet</option>
            </select>
          </label>
          <label>What bothers you most today?
            <select>
              {/* Revenue Integrity */}
              <option>Unexplained cash discrepancies</option>
              <option>Lack of real-time profit visibility</option>
              <option>Inefficient end-of-day closing process</option>
              
              {/* Debt Management */}
              <option>Inconsistent credit tracking</option>
              <option>High rate of uncollected credit</option>
              <option>Customer disputes over balances</option>
              
              {/* Operational Control */}
              <option>Lack of staff accountability</option>
              <option>Difficulty managing multiple locations</option>
              <option>Dependency on physical presence to manage</option>
              
              {/* Infrastructure */}
              <option>Reliance on fragile paper records</option>
              <option>Other</option>
            </select>
          </label>
          <button type="submit" className="btn btn-ember" style={{ width: "100%", justifyContent: "center" }}>
            Book my free demo <Ic name="arrow" size={15} />
          </button>
          <p style={{ fontSize: 12, color: "var(--mist)", textAlign: "center" }}>
            No commitment. Your information is never shared.
          </p>
        </>
      )}
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Side column — direct contacts + custom                              */
/* ------------------------------------------------------------------ */
const QUICK = [
  { ic: "phonecall", t: "Phone / WhatsApp", d: "+509 3166 4446 · Mon–Sat, 8:00 am – 6:30 pm" },
  { ic: "message", t: "Email", d: "info@kourro.com · reply within 24h" },
  { ic: "pin", t: "Journy, Camp-Perrin - Haiti", d: "On-site training by appointment" },
];

function Side() {
  return (
    <div className="c-side">
      <div className="c-infos">
        {QUICK.map((q, i) => (
          <Reveal key={q.t} delay={i * 60}>
            <div className="c-info">
              <span className="ci"><Ic name={q.ic} size={17} /></span>
              <div>
                <b>{q.t}</b>
                <span>{q.d}</span>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={200}>
        <div className="onink" style={{ padding: "28px 26px", borderRadius: 22, marginTop: 16 }}>
          <div className="a-ic" style={{ width: 46, height: 46, borderRadius: 14, background: "var(--gold)", color: "var(--ink)", display: "grid", placeItems: "center", marginBottom: 16 }}>
            <Ic name="hat" size={20} />
          </div>
          <h3 className="display" style={{ fontSize: 22, fontWeight: 600 }}>Building something bigger?</h3>
          <p style={{ marginTop: 10, fontSize: 13.5, lineHeight: 1.7, color: "rgba(246,241,228,0.72)" }}>
            Franchises, multi-store groups, custom workflows, or migrating years of paper records —
            that's what Signature is for. We'll come to you.
          </p>
          <Link to="/pricing" className="btn btn-light" style={{ marginTop: 16, padding: "12px 20px", fontSize: 13 }}>
            Signature <Ic name="arrow" size={14} />
          </Link>
        </div>
      </Reveal>
      <Reveal delay={260}>
        <div style={{ padding: 22, borderRadius: 18, border: "1px solid var(--line)", background: "var(--paper-2)", marginTop: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span className="r-ic" style={{ width: 38, height: 38, borderRadius: 11, background: "var(--ember)", color: "var(--ember-ink)", display: "grid", placeItems: "center" }}>
              <Ic name="gift" size={16} />
            </span>
            <b style={{ fontSize: 14 }}>7-day money-back</b>
          </div>
          <p style={{ fontSize: 13, color: "var(--ink-soft)", lineHeight: 1.6 }}>
            If Kourro isn't for your business, we return your money — and you keep your history.
          </p>
        </div>
      </Reveal>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* FAQ (unanchored from the top of the page)                           */
/* ------------------------------------------------------------------ */
const FAQS: { q: string; a: React.ReactNode }[] = [
  { q: "What happens if there is no internet at all?", a: "The register keeps selling — every sale is saved on the phone. Registers in the same store share sales directly with each other, and everything reaches the cloud when the internet returns. No sales stop, no data lost." },
  { q: "Do I need expensive hardware?", a: "No. Any Android phone or tablet works. The dashboard runs in any browser — no special computer, no installation." },
  { q: "Can I run several stores?", a: "Yes. Each store gets its own team, registers, secret codes, and reports — all inside one Kourro account." },
  { q: "Is the interface really in Creole?", a: "Yes — the whole system was written for the people who work the counter, in Haitian Creole, with gourdes everywhere. English support for diaspora owners is on the roadmap." },
  { q: "Can someone erase history to hide a mistake?", a: "No. Reviews, approvals, and decisions are recorded permanently and synced across devices and the cloud. A change always leaves a mark." },
  { q: "How do I pay for the membership?", a: "MonCash, NatCash, or card. The membership activates immediately and the receipt is emailed to you." },
];

function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="section" style={{ background: "var(--paper-2)" }}>
      <div className="wrap">
        <Reveal>
          <Eyebrow>Questions owners ask us</Eyebrow>
          <h2 className="display" style={{ fontSize: "clamp(32px, 3.8vw, 46px)", marginTop: 18, marginBottom: 34 }}>
            Short answers, <em>no jargon.</em>
          </h2>
        </Reveal>
        <div className="faq" style={{ marginTop: 10 }}>
          {FAQS.map((f, i) => (
            <div key={i} className={"faq-item" + (open === i ? " open" : "")}>
              <button className="faq-q" onClick={() => setOpen(open === i ? null : i)}>
                <span>{f.q}</span>
                <span className="chev">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? 500 : 0 }}>
                <p>{f.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */
function ContactSection() {
  return (
    <section style={{ padding: "170px 0 110px" }} id="top">
      <div className="wrap contact-wrap">
        <Reveal dir="left" delay={80}>
          <LeadForm />
        </Reveal>
        <Side />
      </div>
    </section>
  );
}

export function ContactPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <ContactSection />
      <Faq />
    </>
  );
}