import React from "react";
import { Ic } from "./icon";

/* ------------------------------------------------------------------ */
/* Register screen — faithful replica of the real POS                  */
/* ------------------------------------------------------------------ */
const PRODUCTS = [
  { name: "Farin", sku: "FAR001", stock: 48, price: "240", top: true },
  { name: "Dlo bore", sku: "DLO002", stock: 120, price: "50" },
  { name: "Diri Boulan", sku: "DIR003", stock: 15, price: "1 450" },
];

export function RegisterScreen() {
  return (
    <>
      {/* status bar */}
      <div className="ph-status">
        <span>09:41</span>
        <span>HTG</span>
      </div>

      {/* search header */}
      <div className="reg-head">
        <div className="reg-tabs">
          <span className="reg-tab on">Nom</span>
          <span className="reg-tab">Bakod</span>
          <span className="reg-tab">Kategori</span>
        </div>
        <div className="reg-input-row">
          <div className="reg-input">
            <span className="reg-input-ic">⌕</span>
            <span className="reg-input-ph">Chèche pwodwi</span>
          </div>
          <div className="reg-scan">▣</div>
        </div>
      </div>

      {/* product list */}
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
                <span className="reg-stock">{p.stock} nan stòk · Disponib</span>
              </div>
            </div>
            <div className="reg-card-r">
              <span className="reg-price">G {p.price}</span>
              <span className="reg-add">+ Tape</span>
            </div>
          </div>
        ))}
      </div>

      {/* floating cart bar */}
      <div className="reg-cart">
        <div className="reg-cart-badge">3</div>
        <div className="reg-cart-info">
          <div className="reg-cart-title">
            <span className="reg-cart-label">Kadye</span>
            <span className="reg-cart-count">3 atik</span>
          </div>
          <span className="reg-cart-hint">Tape pou wè detay</span>
        </div>
        <div className="reg-cart-total">
          <span className="reg-cart-price">G 1 790</span>
          <span className="reg-cart-sub">Gade panyen</span>
        </div>
        <div className="reg-cart-chev">⌃</div>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Phone mockup                                                        */
/* ------------------------------------------------------------------ */
export function PhoneMock() {
  return (
    <div className="phone shot-phone">
      <img src="/mock/mobile-register.png" alt="Kourro register screenshot" className="shot-img" />
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
/* Shift close — different screen, still accurate                     */
/* ------------------------------------------------------------------ */
export function ShiftMock() {
  return (
    <div className="phone" style={{ position: "relative", zIndex: 2 }}>
      <div className="phone-top" />
      <div className="phone-screen">
        <div className="ph-status"><span>18:57</span><span>HTG</span></div>
        <div className="app-head">
          <div className="t">Close shift</div>
          <div className="s">Kesye #2 — Delmas 33 coffee</div>
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
/* Tablet — same register, wider screen                                */
/* ------------------------------------------------------------------ */
export function TableMock() {
  return (
    <div className="tablet">
      <div className="tablet-screen">
        <img src="/mock/tablet-register.png" alt="Kourro register tablet screenshot" className="tablet-shot-img" />
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

/* ------------------------------------------------------------------ */
/* Desktop — same register, on a monitor                               */
/* ------------------------------------------------------------------ */
export function DesktopMock() {
  return (
    <div className="desktop">
      <div className="desk-screen shot-desktop">
        <img src="/mock/desktop-register.png" alt="Kourro dashboard screenshot" className="shot-img-desk" />
      </div>
      <div className="desk-stand" />
      <div className="desk-foot" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Analytics card — stays as background behind the devices             */
/* ------------------------------------------------------------------ */
export function DashboardMock({ variant = "phone" }: { variant?: "phone" | "tablet" | "desktop" }) {
  const slim = variant !== "phone";
  const copy = {
    phone: { title: "Live store", sub: "Kesye #2 · Petyonville" },
    tablet: { title: "Live store", sub: "Tablet · Petyonville" },
    desktop: { title: "Command center", sub: "Petyonville · tous boutik" },
  }[variant];
  return (
    <div className={`dash dash-${variant}`}>
      <div className="dhead">
        <div className="dtitle">
          <span className="dlogo">K</span>
          <div>
            <div className="dtitle-label">{copy.title}</div>
            <div className="dtitle-sub">{copy.sub}</div>
          </div>
        </div>
        <span className="dmark"><i /> Live</span>
      </div>
      <div className="dkpis">
        <div className="dkpi">
          <div className="l">Deficit</div>
          <div className="v">0.00 <small className="ok">✓</small></div>
        </div>
        <div className="dkpi">
          <div className="l">Revenue</div>
          <div className="v">G 68 240 <small className="up">+18%</small></div>
        </div>
        <div className="dkpi k3">
          <div className="l">Credit</div>
          <div className="v">G 3 400 <small className="up">↑</small></div>
        </div>
      </div>
      {!slim && (
        <>
          <div className="dchart">
            <div className="dchart-head">
              <span>Weekly rhythm</span>
              <span>G 482k</span>
            </div>
            <WeeklyHistory compact />
          </div>
          <div className="dcollect">
            <div className="dcollect-row">
              <span>Credit collected</span>
              <span className="up">G 3 400 ↑</span>
            </div>
            <div className="dprogress">
              <i style={{ ["--p" as string]: 74 } as React.CSSProperties} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Weekly rhythm widget — the grid-style history heatmap                */
/* ------------------------------------------------------------------ */
const WEEK_COLS = ["", "", "", "", "", "", "", "Sat 09", "Sun 10", "Mon 11", "Tue", "Today"];
const WEEK_ROWS: { label: string; days: number[] }[] = [
  { label: "Sales", days: [0, 0, 0.7, 1.4, 1.4, 0.7, 0, 0.7, 1.4, 1.4, 0.7, 0] },
  { label: "Kredi", days: [0, 0, 0, 0.7, 0.7, 0, 0, 0.7, 1.4, 0.7, 0, 0] },
  { label: "Verify", days: [0, 0.7, 0.7, 0, 0, 0.7, 1.4, 1.4, 0, 0, 0.7, 0] },
  { label: "Calls", days: [0.7, 0, 0, 0, 0, 0.7, 0.7, 0, 0.7, 1.4, 0.7, 0] },
];

export function WeeklyHistory({ compact = false }: { compact?: boolean }) {
  const cols = compact ? WEEK_COLS.slice(-7) : WEEK_COLS;
  const rows = compact ? WEEK_ROWS.map(r => ({ ...r, days: r.days.slice(-7) })) : WEEK_ROWS;
  return (
    <div className={"weekchart" + (compact ? " compact" : "")}>
      <div className="wc-head">
        <span className="wc-corner" />
        {cols.map((lbl, i) => <span key={i} className={lbl ? "has" : ""}>{lbl}</span>)}
      </div>
      {rows.map(r => (
        <div className="wc-row" key={r.label}>
          <span className="wc-label">{r.label}</span>
          {r.days.map((v, i) => {
            const pct = Math.max(8, Math.round((Math.abs(v) / 1.4) * 100));
            return (
              <div className="wc-day" key={i}>
                <div className={"wc-cell" + (v === 0 ? " zero" : "")}>
                  {v !== 0 && v < 0 && <i className="wc-mid" />}
                  {v !== 0 && <b className={v < 0 ? "neg" : ""} style={{ height: pct + "%" }} />}
                  {v === 0 && <span className="wc-ghost" />}
                </div>
                {v !== 0 && <span className="wc-cap">{v}</span>}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}