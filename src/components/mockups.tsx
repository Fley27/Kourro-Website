import React from "react";
import { Ic } from "./icon";
import { Img } from "./core";

/* ------------------------------------------------------------------ */
/* Register screen — faithful replica of the real POS                  */
/* ------------------------------------------------------------------ */
const PRODUCTS = [
  { name: "French Flour (50kg)", sku: "FAR001", stock: 48, price: "2 450", top: true },
  { name: "Treated Water 5 Gallon", sku: "DLO002", stock: 120, price: "95", top: false },
  { name: "Boulan Rice 25kg", sku: "DIR003", stock: 15, price: "1 950", top: true },
  { name: "Palm Oil 1L (Case)", sku: "OIL004", stock: 32, price: "1 820", top: false },
];

export function RegisterScreen() {
  return (
    <>
      <div className="ph-status">
        <span>09:41</span>
        <span className="ph-badge-off">⚡ OFFLINE READY</span>
        <span>HTG</span>
      </div>

      <div className="reg-head">
        <div className="reg-tabs">
          <span className="reg-tab on">All</span>
          <span className="reg-tab">Food</span>
          <span className="reg-tab">Drinks</span>
          <span className="reg-tab">Cleaning</span>
        </div>
        <div className="reg-input-row">
          <div className="reg-input">
            <span className="reg-input-ic"><Ic name="search" size={13} /></span>
            <span className="reg-input-ph">Search products or scan...</span>
          </div>
          <div className="reg-scan">▣</div>
        </div>
      </div>

      <div className="reg-list">
        {PRODUCTS.map(p => (
          <div key={p.sku} className="reg-card">
            <div className="reg-card-l">
              <div className="reg-card-name">
                {p.top && <span className="reg-top">★ TOP</span>}
                <span>{p.name}</span>
              </div>
              <div className="reg-card-meta">
                <span className="reg-sku">{p.sku}</span>
                <span className="reg-dot" />
                <span className="reg-stock">{p.stock} in stock · Available</span>
              </div>
            </div>
            <div className="reg-card-r">
              <span className="reg-price">G {p.price}</span>
              <span className="reg-add">+ Tap</span>
            </div>
          </div>
        ))}
      </div>

      <div className="reg-cart">
        <div className="reg-cart-badge">3</div>
        <div className="reg-cart-info">
          <div className="reg-cart-title">
            <span className="reg-cart-label">Cart</span>
            <span className="reg-cart-count">3 items</span>
          </div>
          <span className="reg-cart-hint">Tap for details</span>
        </div>
        <div className="reg-cart-total">
          <span className="reg-cart-price">G 4 495</span>
          <span className="reg-cart-sub">View cart ↗</span>
        </div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Phone Mockup — Original High-Fidelity UI Asset with Cohesive Badges */
/* ------------------------------------------------------------------ */
export function PhoneMock() {
  return (
    <div className="phone shot-phone">
      <Img
        srcBase="/mock/mobile-register"
        alt="Kourro mobile register screenshot"
        className="shot-img"
        sizes="280px"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        width={794}
        height={1660}
      />
      <div className="pbadge pbadge-1">
        <span className="chip">
          <span className="ic"><Ic name="bolt" size={13} /></span>
          Works without power
        </span>
      </div>
      <div className="pbadge pbadge-2">
        <span className="chip">
          <span className="ic"><Ic name="sync" size={13} /></span>
          Syncs automatically
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Shift close                                                        */
/* ------------------------------------------------------------------ */
export function ShiftMock() {
  return (
    <div className="phone" style={{ position: "relative", zIndex: 2 }}>
      <div className="phone-top" />
      <div className="phone-screen">
        <div className="ph-status"><span>18:57</span><span>HTG</span></div>
        <div className="app-head">
          <div className="t">Close shift</div>
          <div className="s">Cashier #2 — Delmas 33 coffee</div>
        </div>
        {[
          { l: "Expected in drawer", v: "G 54,120" },
          { l: "Counted in drawer", v: "G 54,120" },
          { l: "Difference", v: "0.00" },
        ].map(r => (
          <div key={r.l} className="prow">
            <span className="pn"><span className="a">{r.l}</span></span>
            <span className="pp" style={{ color: "#0f7b43" }}>{r.v}</span>
          </div>
        ))}
        <div className="pbadge pbadge-1" style={{ top: 130 }}>
          <span className="chip">
            <span className="ic" style={{ background: "var(--ember)" }}><Ic name="check" size={13} /></span>
            Drawer matches
          </span>
        </div>
        <div className="pbtn" style={{ marginTop: 24 }}>Confirm & close · approved ✓</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tablet & Desktop Mockups                                           */
/* ------------------------------------------------------------------ */
export function TableMock() {
  return (
    <div className="tablet">
      <div className="tablet-screen">
        <Img
          srcBase="/mock/tablet-register"
          alt="Kourro register tablet screenshot"
          className="tablet-shot-img"
          sizes="560px"
          width={2015}
          height={1513}
        />
      </div>
      <div className="pbadge tablet-badge">
        <span className="chip">
          <span className="ic" style={{ background: "var(--ember)" }}><Ic name="check" size={13} /></span>
          Offline-ready ✓
        </span>
      </div>
    </div>
  );
}

export function DesktopMock() {
  return (
    <div className="desktop">
      <div className="desk-screen shot-desktop">
        <Img
          srcBase="/mock/desktop-register"
          alt="Kourro dashboard screenshot"
          className="shot-img-desk"
          sizes="600px"
          width={3024}
          height={1736}
        />
      </div>
      <div className="desk-stand" />
      <div className="desk-foot" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics Companion Card — Perfectly Harmonized with the Device     */
/* ------------------------------------------------------------------ */
export function DashboardMock({ variant = "phone" }: { variant?: "phone" | "tablet" | "desktop" }) {
  const slim = variant !== "phone";
  const copy = {
    phone: { title: "Live store oversight", sub: "Cashier #2 · Petyonville" },
    tablet: { title: "Command center", sub: "Tablet · Delmas 33" },
    desktop: { title: "Enterprise dashboard", sub: "Petyonville · all stores" },
  }[variant];

  return (
    <div className={`dash dash-${variant} hero-dash-premium`}>
      {/* Header matching the app typography and brand */}
      <div className="dhead">
        <div className="dtitle">
          <span className="dlogo">K</span>
          <div>
            <div className="dtitle-label">{copy.title}</div>
            <div className="dtitle-sub">{copy.sub}</div>
          </div>
        </div>
        <span className="dmark"><i /> LIVE</span>
      </div>

      {/* KPI Metrics */}
      <div className="dkpis">
        <div className="dkpi">
          <div className="l">DEFICIT</div>
          <div className="v">
            0.00 <span className="ok-tag">✓ Perfect</span>
          </div>
        </div>
        <div className="dkpi">
          <div className="l">REVENUE</div>
          <div className="v">
            G 68 240 <small className="up">+18%</small>
          </div>
        </div>
        {slim && (
          <div className="dkpi k3">
            <div className="l">CREDIT</div>
            <div className="v">G 3 400 <small className="up">↑</small></div>
          </div>
        )}
      </div>

      {!slim && (
        <>
          {/* Weekly Rhythm Activity */}
          <div className="dchart">
            <div className="dchart-head">
              <span>Weekly rhythm activity</span>
              <span className="dchart-vol">G 482k</span>
            </div>
            <WeeklyHistory compact />
          </div>

          {/* Credit Collection Live Shimmer */}
          <div className="dcollect">
            <div className="dcollect-row">
              <span>Credit collected today</span>
              <span className="up">G 3 400 ↑ <small>(82%)</small></span>
            </div>
            <div className="dprogress">
              <i style={{ ["--p" as string]: 82 } as React.CSSProperties} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Weekly rhythm widget — heat matrix                                 */
/* ------------------------------------------------------------------ */
const WEEK_COLS = ["Sat 09", "Sun 10", "Mon 11", "Tue", "Today"];
const WEEK_ROWS: { label: string; days: number[] }[] = [
  { label: "SALES", days: [0.7, 0, 0.7, 1.4, 1.4, 0.7, 0] },
  { label: "CREDIT", days: [0, 0, 0.7, 1.4, 0.7, 0, 0] },
  { label: "VERIFY", days: [0.7, 1.4, 1.4, 0, 0, 0.7, 0] },
  { label: "CALLS", days: [0.7, 0.7, 0, 0.7, 1.4, 0.7, 0] },
];

export function WeeklyHistory({ compact = false }: { compact?: boolean }) {
  const cols = WEEK_COLS;
  const rows = WEEK_ROWS.map(r => ({ ...r, days: r.days.slice(-5) }));

  return (
    <div className={"weekchart" + (compact ? " compact" : "")}>
      <div className="wc-head">
        <span className="wc-corner" />
        {cols.map((lbl, i) => <span key={i} className="has">{lbl}</span>)}
      </div>
      {rows.map(r => (
        <div className="wc-row" key={r.label}>
          <span className="wc-label">{r.label}</span>
          {r.days.map((v, i) => {
            const isFilled = v > 0;
            const isHigh = v >= 1.4;
            return (
              <div className="wc-day" key={i}>
                <div className={`wc-cell ${isFilled ? (isHigh ? "high" : "med") : "empty"}`}>
                  {isFilled && <span className="wc-val">{v}</span>}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
