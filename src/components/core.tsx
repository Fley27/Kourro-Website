import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Ic } from "./icon";

/* ---------- Media query hook ---------- */
export function useMediaQuery(query: string) {
  const [m, setM] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });
  useEffect(() => {
    const mq = window.matchMedia(query);
    const onChange = () => setM(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [query]);
  return m;
}

/* ---------- Theme (light/dark) hook ----------
   Module-level store so every ThemeToggle instance (header + menu) stays in sync. */
const STORAGE_KEY = "theme";
const DARK_CLASS = "dark";

function readDark() {
  try {
    return localStorage.getItem(STORAGE_KEY) !== "light"; // dark is the default
  } catch {
    return true;
  }
}

let darkSnapshot = typeof window === "undefined" ? true : readDark();
const themeListeners = new Set<(dark: boolean) => void>();

function applyTheme(dark: boolean) {
  const root = document.documentElement;
  const tc = document.querySelector('meta[name="theme-color"]');
  if (dark) {
    root.classList.add(DARK_CLASS);
    root.classList.remove("light");
    try { localStorage.setItem(STORAGE_KEY, "dark"); } catch { /* storage blocked */ }
    if (tc) tc.setAttribute("content", "#0f0d08");
  } else {
    root.classList.add("light");
    root.classList.remove(DARK_CLASS);
    try { localStorage.setItem(STORAGE_KEY, "light"); } catch { /* storage blocked */ }
    if (tc) tc.setAttribute("content", "#f6f1e4");
  }
}

export function useTheme() {
  const [dark, setDark] = useState(darkSnapshot);

  useEffect(() => {
    applyTheme(darkSnapshot);
    const onChange = (d: boolean) => setDark(d);
    themeListeners.add(onChange);
    return () => { themeListeners.delete(onChange); };
  }, []);

  const toggle = () => {
    darkSnapshot = !darkSnapshot;
    applyTheme(darkSnapshot);
    themeListeners.forEach(fn => fn(darkSnapshot));
  };

  return { dark, toggle };
}

/* ---------- Theme toggle button ---------- */
export function ThemeToggle() {
  const { dark, toggle } = useTheme();
  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={toggle}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={dark}
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
    >
      <Ic name={dark ? "sun" : "moon"} size={19} />
    </button>
  );
}

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

/* ---------- Responsive image (AVIF → WebP → PNG fallback) ---------- */
export interface ImgProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> {
  /** Path without extension, e.g. "/mock/register" or "/logo". */
  srcBase: string;
  /** Rendered width hint so the density descriptors pick the right candidate. */
  sizes?: string;
}

export function Img({
  srcBase,
  alt,
  sizes,
  loading = "lazy",
  decoding = "async",
  fetchPriority,
  className,
  width,
  height,
  ...rest
}: ImgProps) {
  return (
    <picture>
      <source type="image/avif" srcSet={`${srcBase}.avif 1x, ${srcBase}@2x.avif 2x`} sizes={sizes} />
      <source type="image/webp" srcSet={`${srcBase}.webp 1x, ${srcBase}@2x.webp 2x`} sizes={sizes} />
      <img
        src={`${srcBase}.png`}
        alt={alt}
        className={className}
        loading={loading}
        decoding={decoding}
        {...(fetchPriority ? { fetchPriority } : {})}
        {...(width ? { width } : {})}
        {...(height ? { height } : {})}
        {...rest}
      />
    </picture>
  );
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  // scroll-lock + Esc-to-close when the mobile menu is open
  useEffect(() => {
    if (!menu) return;
    document.documentElement.classList.add("menu-open");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-open");
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  // close on tap outside the menu (the header manages its own taps:
  // logo closes via onClick, the burger toggles — so don't pre-close on it)
  useEffect(() => {
    if (!menu) return;
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Element | null;
      if (!t || (menuRef.current && menuRef.current.contains(t))) return;
      if (t.closest && t.closest(".nav")) return;
      setMenu(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [menu]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/features", label: "Features" },
    { to: "/pricing", label: "Pricing" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <>
      <header className={"nav" + (scrolled ? " scrolled" : "")}>
        <div className="wrap nav-inner">
          <Link className="brand brand-logo-only" to="/" aria-label="Kourro — home" onClick={() => setMenu(false)}>
            <img src="/logo.svg" alt="Kourro — Built to deliver" className="brand-logo" loading="eager" decoding="async" fetchPriority="high" width={978} height={256} />
          </Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/features">Features</Link>
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <div className="nav-cta">
            <Link to="/pricing" className="btn btn-ember">
              Get started
              <Ic name="arrow" size={15} />
            </Link>
          </div>
          <ThemeToggle />
          <button
            className="nav-burger"
            onClick={() => setMenu(v => !v)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={menu ? "Close menu" : "Menu"}
          >
            <Ic name={menu ? "close" : "menu"} size={19} />
          </button>
        </div>
      </header>
      <div
        id="mobile-menu"
        ref={menuRef}
        className={"mobile-menu" + (menu ? " open" : "")}
        aria-hidden={!menu}
      >
        <nav className="mm-links">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/"}
              onClick={() => setMenu(false)}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mm-foot">
          <Link to="/pricing" className="btn btn-ember" onClick={() => setMenu(false)}>
            Get started
            <Ic name="arrow" size={16} />
          </Link>
          <div className="mm-bar">
            <span className="mm-label">Appearance</span>
            <ThemeToggle />
          </div>
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
<Link className="brand" to="/" aria-label="Kourro — home">
              <img src="/logo.svg" alt="Kourro — Built to deliver" className="brand-logo" width={978} height={256} />
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
            <Link to="/pricing">Pricing</Link>
            <Link to="/about">About</Link>
          </div>
          <div className="f-col">
            <h6>Contact</h6>
            <Link to="/contact">Contact</Link>
            <Link to="/contact#faq">FAQ</Link>
            <Link to="/contact#demo">Custom quote</Link>
          </div>
          <div className="f-col">
            <h6>Legal</h6>
            <Link to="/terms">Terms</Link>
            <Link to="/privacy">Privacy</Link>
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