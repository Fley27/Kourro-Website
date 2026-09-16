import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Ic } from "./icon";

/* ---------- Reveal on scroll ---------- */
export function Reveal({
  children,
  delay = 0,
  dir,
  className = "",
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  dir?: "left" | "right";
  className?: string;
  as?: "div" | "section" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const cn = ["rv", dir === "left" ? "rv-left" : dir === "right" ? "rv-right" : "", className].join(" ").trim();
  const Tag = as as any;
  return (
    <Tag ref={ref} className={cn} style={{ ["--d" as string]: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

/* ---------- Eyebrow label ---------- */
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

/* ---------- Marquee strip ---------- */
export function Marquee({ onink, items }: { onink?: boolean; items: string[] }) {
  const row = (fi: number) => (
    <span key={fi}>
      {items.map((t, i) => (
        <React.Fragment key={i}>
          {t}
          <span className="gold">◆</span>
        </React.Fragment>
      ))}
    </span>
  );
  return (
    <div className={"marquee" + (onink ? " onink" : "")}>
      <div className="marquee-track">
        {row(0)}
        {row(1)}
      </div>
    </div>
  );
}

/* ---------- Scroll-linked nav ---------- */
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="wrap nav-inner">
          <Link className="brand brand-logo-only" to="/" aria-label="Kourro">
            <img className="brand-logo" src="/logo.png" alt="" />
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="nav-cta">
            <Link to="/pricing" className="btn btn-ember" style={{ padding: "12px 22px", fontSize: 13.5 }}>
              Get started
              <Ic name="arrow" size={15} />
            </Link>
          </div>
          <button className="nav-burger" onClick={() => setMenu(v => !v)} aria-label="Menu">
            <Ic name={menu ? "close" : "menu"} size={19} />
          </button>
        </div>
      </header>
      <div className={"mobile-menu" + (menu ? " open" : "")}>
        <Link to="/" onClick={() => setMenu(false)}>Home</Link>
        <Link to="/features" onClick={() => setMenu(false)}>Features</Link>
        <Link to="/pricing" onClick={() => setMenu(false)}>Pricing</Link>
        <Link to="/about" onClick={() => setMenu(false)}>About</Link>
        <Link to="/contact" onClick={() => setMenu(false)}>Contact</Link>
        <div style={{ marginTop: 30 }}>
          <Link to="/pricing" className="btn btn-ember" onClick={() => setMenu(false)}>
            Get started · Choose membership <Ic name="arrow" size={15} />
          </Link>
        </div>
      </div>
    </>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="f-grid">
          <div className="f-brand">
<Link className="brand" to="/">
              <img className="brand-logo" src="/logo.png" alt="Kourro" />
              <span className="brand-name" style={{ color: "var(--paper)" }}>
                Kourro
                <small style={{ color: "rgba(246,241,228,0.5)" }}>Store OS · kreyòl</small>
              </span>
            </Link>
            <p>
              One mobile app + one web dashboard. Every gourde accounted for, every credit collected,
              every decision on record — even when the power and the internet are out.
            </p>
          </div>
          <div className="f-col">
            <h6>Product</h6>
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Membership</Link>
            <Link to="/about">About us</Link>
          </div>
          <div className="f-col">
            <h6>Contact</h6>
            <Link to="/contact">Contact us</Link>
            <Link to="/contact#faq">FAQ</Link>
            <Link to="/contact#custom">Custom quote</Link>
          </div>
          <div className="f-col">
            <h6>Legal</h6>
            <Link to="/contact">Terms</Link>
            <Link to="/contact">Privacy</Link>
            <Link to="/contact">30-day money-back</Link>
          </div>
        </div>
        <div className="f-bottom">
          <span>© 2026 Kourro — Build a business that outlives you, and pass it on.</span>
          <span>
            Made with <span className="f-heart">♥</span> for Haiti · HTG +++
          </span>
        </div>
      </div>
    </footer>
  );
}