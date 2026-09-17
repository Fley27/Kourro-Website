import React from "react";

/* ------------------------------------------------------------------ */
/* iPad frame — thick black bezel like the screenshots                  */
/* ------------------------------------------------------------------ */
type TabId = "kay" | "stok" | "vant" | "kredi" | "kliyan";

const TABS: { id: TabId; label: string; icon: string }[] = [
  { id: "kay", label: "Home", icon: "◧" },
  { id: "stok", label: "Stock", icon: "▤" },
  { id: "vant", label: "Sales", icon: "▦" },
  { id: "kredi", label: "Credit", icon: "▭" },
  { id: "kliyan", label: "Customers", icon: "⚇" },
];

export function IpadFrame({
  children,
  title,
  subtitle,
  active,
  time = "11:08 PM",
  badge,
}: {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  active: TabId;
  time?: string;
  badge?: React.ReactNode;
}) {
  return (
    <div className="tb-ipad">
      <div className="tb-btn tb-btn-power" />
      <div className="tb-btn tb-btn-vol" />
      <div className="tb-screen">
        {/* iPadOS status bar */}
        <div className="tb-status">
          <span className="tb-status-l">
            {time} <b>Tue Sep 15</b>
          </span>
          <span className="tb-status-r">
            <i className="tb-wifi">⌁</i> 100% <i className="tb-batt" />
          </span>
        </div>
        {/* App header */}
        <div className="tb-appbar">
          <div className="tb-brand">
            <span className="tb-logo">▣</span>
            <span>
              <b>{title}</b>
              <small>{subtitle}</small>
            </span>
          </div>
          <div className="tb-appbar-r">
            {badge}
            <span className="tb-clock">◷</span>
            <span className="tb-avatar">JO</span>
          </div>
        </div>
        {/* Screen body */}
        <div className="tb-body">{children}</div>
        {/* Floating tab bar */}
        <div className="tb-tabbar-wrap">
          <div className="tb-tabbar">
            {TABS.map((t) => (
              <span key={t.id} className={"tb-tab" + (t.id === active ? " on" : "")}>
                <i className="tb-tab-ic">{t.icon}</i>
                <em>{t.label}</em>
                {t.id === active && <i className="tb-tab-dot" />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Small atoms */
const Pill = ({ children, tone = "" }: { children: React.ReactNode; tone?: string }) => (
  <span className={"tb-pill" + (tone ? " " + tone : "")}>{children}</span>
);
const Search = ({ ph }: { ph: string }) => (
  <div className="tb-search">
    <span>⌕</span> {ph}
  </div>
);

/* ------------------------------------------------------------------ */
/* 1. register → Vant POS — "Kès vit & presi"                           */
/* ------------------------------------------------------------------ */
const POS_PRODUCTS = [
  { tag: "Available · 40", name: "Rice 25kg", meta: "RICE-25KG · Cost 2 500 HTG", price: "3 200 HTG", qty: null },
  { tag: "Low · 3", name: "Prestige Beer", meta: "PREST-330 · Cost 75 HTG", price: "100 HTG", qty: "×2" },
  { tag: "Available · 25", name: "Cooking Oil 5L", meta: "OIL-5L · Cost 800 HTG", price: "1 100 HTG", qty: null },
  { tag: "Available · 200", name: "Laundry Soap", meta: "SOAP-001 · Cost 30 HTG", price: "50 HTG", qty: null },
  { tag: "Available · 30", name: "Flour 25kg", meta: "FARIN-25KG · Cost 2 200 HTG", price: "2 800 HTG", qty: "×4" },
  { tag: "Available · 35", name: "White Sugar 10kg", meta: "SIK-10KG · Cost 700 HTG", price: "950 HTG", qty: null },
];

const CART = [
  { name: "Prestige Beer", price: "100", unit: "HTG / pcs", qty: "2", total: "200 HTG" },
  { name: "Flour 25kg", price: "2 800", unit: "HTG / sack", qty: "4", total: "11 200 HTG" },
  { name: "Spaghetti 500g", price: "75", unit: "HTG / pcs", qty: "3", total: "225 HTG" },
];

export function MockRegister() {
  return (
    <IpadFrame
      title="Sales"
      subtitle="PÉTION-VILLE · HTG · OFFLINE READY"
      active="vant"
      time="11:04 PM"
      badge={
        <>
          <Pill>0 tab</Pill>
          <span className="tb-darkbtn">
            <b>◉ 0</b> ON HOLD
          </span>
        </>
      }
    >
      <div className="tb-eyebrow">SALES • POS TABLET</div>
      <div className="tb-h1 gold">
        Fast, <em>accurate checkout</em>
      </div>
      <div className="tb-sub">Sell fast on the tablet — search products, add to cart, hit Pay.</div>
      <div className="tb-2col">
        <div className="tb-card">
          <div className="tb-searchrow">
            <div style={{ flex: 1 }}>
              <Search ph="Search products or scan code" />
            </div>
            <span className="tb-scan">▣</span>
          </div>
          <div className="tb-pills">
            <Pill tone="dark">Name</Pill>
            <Pill>Barcode</Pill>
            <Pill>Category</Pill>
            <span className="tb-mode">Mode: name</span>
          </div>
          <div className="tb-pills">
            <Pill tone="dark">All</Pill>
            <Pill>Food</Pill>
            <Pill>Drinks</Pill>
            <Pill>Home</Pill>
            <Pill>Dairy</Pill>
          </div>
          <div className="tb-grid3">
            {POS_PRODUCTS.map((p, i) => (
              <div key={p.name} className={"tb-prod" + (i >= 3 ? " tb-hide-short" : "")}>
                <div className="tb-prod-top">
                  <Pill tone={p.tag.startsWith("Low") ? "warn" : "ok"}>{p.tag}</Pill>
                  {p.qty && <b className="tb-qtyflag">{p.qty}</b>}
                </div>
                <b>{p.name}</b>
                <small>{p.meta}</small>
                <span className="tb-price">{p.price}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="tb-card">
          <div className="tb-row">
            <b>Cart • 4 items • 13 pcs</b>
            <Pill tone="rose">Clear</Pill>
          </div>
          <small className="tb-mute">Swipe quantity • tap × to remove</small>
          {CART.map((c, i) => (
            <div key={c.name} className={"tb-line" + (i >= 2 ? " tb-hide-short" : "") + (i >= 1 ? " tb-hide-mobile" : "")}>
              <div className="tb-line-h">
                <b>{c.name}</b>
                <span className="tb-x">×</span>
              </div>
              <div className="tb-line-f">
                <span className="tb-mute">
                  PRICE
                  <br />
                  <b className="tb-ink">{c.price}</b> {c.unit}
                </span>
                <span className="tb-stepper">
                  <i>−</i>
                  <b>{c.qty}</b>
                  <i className="plus">+</i>
                </span>
                <span className="tb-mute right">
                  SUBTOTAL
                  <br />
                  <b className="tb-ink">{c.total}</b>
                </span>
              </div>
            </div>
          ))}
          <div className="tb-paybox">
            <div className="tb-row">
              <Pill tone="rose">🗑 Clear all</Pill>
              <Pill tone="navy">◷ Leave open</Pill>
            </div>
            <div className="tb-totalrow">
              <span className="tb-mute">Subtotal</span>
              <b>12 105 HTG</b>
            </div>
            <div className="tb-paye">
              <span>✓</span> Pay <span className="tb-arrow">→</span>
            </div>
            <small className="tb-mute center tb-hide-short">Tap Pay to open the payment form</small>
          </div>
        </div>
      </div>
    </IpadFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 2. shift → Kredi / Dèt                                               */
/* ------------------------------------------------------------------ */
export function MockShift() {
  return (
    <IpadFrame
      title="Credit"
      subtitle="PÉTION-VILLE · HTG · OFFLINE READY"
      active="kredi"
      time="11:07 PM"
      badge={<span className="tb-darkbtn">+ New Credit</span>}
    >
      <div className="tb-row">
        <div>
          <div className="tb-eyebrow">DEBT MGMT • PAYMENTS • BALANCE</div>
          <div className="tb-h1">Credit / Debt</div>
          <div className="tb-sub">Never lose track of customer debt — breakdowns, due dates, partial payments, REC- receipts, and automatic late penalties.</div>
        </div>
        <Pill>1 debt • 1 open</Pill>
      </div>
      <div className="tb-2col tb-focus-detail">
        <div>
          <div className="tb-card">
            <div className="tb-row">
              <small className="tb-mute">1 debt • 1 open • 2 000 HTG owed</small>
              <span className="tb-seg tb-hide-short">
                <i>Today</i>
                <i>7 days</i>
                <b>28 days</b>
                <i>6 months</i>
                <i>All time</i>
              </span>
            </div>
            <div className="tb-kpi2">
              <div className="tb-kpi peach">
                <small>CREDIT GIVEN</small>
                <b>3 500 HTG</b>
                <span>in this period</span>
              </div>
              <div className="tb-kpi mint">
                <small>CREDIT REPAID</small>
                <b>2 000 HTG</b>
                <span>57% repaid</span>
              </div>
            </div>
            <div className="tb-progresscard">
              <span className="tb-ring">57%</span>
              <div style={{ flex: 1 }}>
                <b>Repayment rate</b>
                <div className="tb-bar">
                  <i style={{ width: "57%" }} />
                </div>
                <div className="tb-row">
                  <small>● Paid 57%</small>
                  <small className="tb-red">● Unpaid 43%</small>
                </div>
              </div>
            </div>
          </div>
          <div className="tb-card">
            <Search ph="Search by name, NIF/CIN, phone or address" />
            <div className="tb-pills tb-hide-short">
              <Pill tone="dark">All</Pill>
              <Pill>Overdue</Pill>
              <Pill>Not yet due</Pill>
              <Pill>Already paid</Pill>
              <span className="tb-mode">1 result</span>
            </div>
            <div className="tb-debtrow">
              <span className="tb-ava">J</span>
              <span style={{ flex: 1 }}>
                <b>
                  Jean Baptiste <Pill tone="dark sm">OVERDUE</Pill>
                </b>
                <small className="tb-mute">004-123-4567 • +509 3810 0001</small>
                <small className="tb-mute">sale-debt-1 • Due 9/10/2026</small>
              </span>
              <span className="right">
                <b>1 500 HTG</b>
                <small className="tb-mute">of 3 500 HTG</small>
                <small>57% paid</small>
              </span>
              <div className="tb-bar red">
                <i style={{ width: "57%" }} />
              </div>
            </div>
          </div>
        </div>
        <div className="tb-card">
          <div className="tb-row">
            <div>
              <b>Jean Baptiste</b>
              <small className="tb-mute">004-123-4567 • +509 3810 0001 • Limit 5000 HTG</small>
            </div>
            <Pill tone="rose">OVERDUE</Pill>
          </div>
          <div className="tb-kpi2">
            <div className="tb-kpi ghost center">
              <small>ORIGINAL AMOUNT</small>
              <b>3 500 HTG</b>
            </div>
            <div className="tb-kpi pink center">
              <small>CURRENT BALANCE</small>
              <b className="tb-red">1 500 HTG</b>
            </div>
          </div>
          <div className="tb-kpi2">
            <div className="tb-minirow">
              <span className="tb-mute">Paid</span>
              <b className="tb-green">2 000 HTG</b>
            </div>
            <div className="tb-minirow">
              <span className="tb-mute">Due date</span>
              <b>9/10/2026</b>
            </div>
          </div>
          <div className="tb-minirow">
            <b>Payment history • 1 receipt</b>
            <span className="tb-mute">▸ View</span>
          </div>
          <div className="tb-minirow tb-hide-short">
            <b>Items</b>
            <span className="tb-mute">▸ View</span>
          </div>
          <div className="tb-darkcta">PAY NOW</div>
          <div className="tb-ghostcta tb-hide-short">Close</div>
        </div>
      </div>
    </IpadFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 3. credit → Kay analytics                                            */
/* ------------------------------------------------------------------ */
export function MockCredit() {
  return (
    <IpadFrame title="Home" subtitle="PÉTION-VILLE · HTG · OFFLINE READY" active="kay" time="11:09 PM">
      <div className="tb-segtabs tb-hide-mobile">
        <b>▥ Analytics</b>
        <span>▤ KPI</span>
        <span>⚇ Team</span>
        <span>▣ Store</span>
      </div>
      <div className="tb-pills plain tb-hide-mobile">
        <b className="tb-uline">Today</b>
        <span>7 days</span>
        <span>28 days</span>
        <span>6 months</span>
        <span>1 year</span>
        <span>Lifetime</span>
      </div>
      <div className="tb-alert">⚠ <b>1 product critically low</b><small>Restock now (300 HTG) so you don't lose sales.</small></div>
      <div className="tb-hero">
        <div>
          <Pill tone="darkline">• LIVE • TUESDAY, SEPTEMBER 15 • OWNER • DECISION PANEL</Pill>
          <div className="tb-hero-t">
            Build a <em>business</em>
            <br />
            that outlives you.
          </div>
          <small>Command center for owners. Every sale live, gross profit, margin, and low stock — no refresh needed. Offline-first, synced with CRDT.</small>
        </div>
        <div className="tb-hero-stats">
          <div className="tb-hstat">
            <small>REVENUE — TODAY</small>
            <b>63 600 HTG</b>
            <span className="tb-mute">1 transaction • Cash 63 600 • Credit 0 • live</span>
            <div className="tb-bar green">
              <i style={{ width: "100%" }} />
            </div>
          </div>
          <div className="tb-hstat">
            <small>GROSS MARGIN • PROFIT</small>
            <b>22 260 HTG <small>• 35.0%</small></b>
            <span className="tb-mute">Revenue 63 600 • Cost 41 340</span>
          </div>
          <div className="tb-hstat">
            <small>LOW STOCK &amp; VALUE</small>
            <b>1 item <small>300 HTG</small></b>
            <span className="tb-mute">1 product • Restock</span>
          </div>
        </div>
      </div>
      <div className="tb-kpi4 tb-hide-mobile tb-hide-short">
        <div className="tb-kpi white">
          <small>● SALES TODAY</small>
          <b>63 600 <small>HTG</small></b>
          <Pill tone="ok">↗ +100%</Pill> <span className="tb-mute">vs yesterday • 1 ticket</span>
        </div>
        <div className="tb-kpi white">
          <small>● AVERAGE CART</small>
          <b>63 600 <small>HTG</small></b>
          <span className="tb-mute">Margin 35.0% • 1 total sale</span>
        </div>
        <div className="tb-kpi white">
          <small>● TRANSACTIONS</small>
          <b>1</b>
          <span className="tb-mute">Credit 0 HTG • 0% on credit</span>
        </div>
        <div className="tb-kpi white">
          <small>● LOW STOCK</small>
          <b className="tb-red">1</b>
          <span className="tb-mute">Value 300 HTG • Buy soon</span>
        </div>
      </div>
      <div className="tb-2col tb-hide-short">
        <div className="tb-card">
          <b>Trend</b>
          <small className="tb-mute">Multi-KPI series — each product's contribution to revenue.</small>
        </div>
        <div className="tb-card">
          <div className="tb-row">
            <b>Payment Breakdown</b>
            <Pill>63 600 HTG</Pill>
          </div>
          <small className="tb-mute">Today • 4 methods • Cash / Credit / MonCash / NatCash</small>
        </div>
      </div>
    </IpadFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 4. stock → Stòk & Envantè                                            */
/* ------------------------------------------------------------------ */
export function MockStock() {
  return (
    <IpadFrame title="Stock" subtitle="PÉTION-VILLE · HTG · OFFLINE READY" active="stok" time="11:08 PM">
      <div className="tb-eyebrow">STOCK • INVENTORY</div>
      <div className="tb-h1">Stock &amp; Inventory</div>
      <div className="tb-sub">Filter by category, barcode, total value, margin, and movement.</div>
      <Pill>● 18 products • 1 low</Pill>
      <div className="tb-kpi4">
        <div className="tb-kpi white edge-green">
          <small>● TOTAL ITEMS</small>
          <b>18</b>
          <span className="tb-mute">18 visible • 6 categories</span>
        </div>
        <div className="tb-kpi white edge-blue">
          <small>● TOTAL VALUE</small>
          <b>406 450 HTG</b>
          <span className="tb-mute">Sale price × quantity</span>
        </div>
        <div className="tb-kpi white edge-gold">
          <small>● MARGIN %</small>
          <b className="tb-green">25.5%</b>
          <span className="tb-mute">Profit 103 550 HTG</span>
        </div>
        <div className="tb-kpi white edge-red">
          <small>● LOW STOCK</small>
          <b className="tb-red">1</b>
          <span className="tb-mute">Prestige Beer</span>
        </div>
      </div>
      <div className="tb-2col tb-focus-detail">
        <div>
          <div className="tb-card">
            <Search ph="Search products, SKU" />
            <div className="tb-pills">
              <Pill tone="dark">▦ In store</Pill>
              <Pill>◈ Incoming</Pill>
            </div>
            <div className="tb-pills">
              <Pill tone="dark">◉ All 18</Pill>
              <Pill>Food 7</Pill>
              <Pill>Drinks 3</Pill>
              <Pill>Home 3</Pill>
            </div>
          </div>
          <div className="tb-stock-sel">
            <Pill tone="okdark">● AVAILABLE</Pill>
            <small>40 sacks in stock</small>
            <b>Rice 25kg</b>
            <small className="tb-mute">RICE-25KG · 2 500 HTG → <b className="gold">3 200 HTG</b></small>
            <small className="tb-mute">Low threshold 5 · 40 pcs · sack</small>
            <b className="tb-big-r">40<small>IN STOCK</small></b>
          </div>
          <div className="tb-stock-row">
            <Pill tone="ok">● AVAILABLE</Pill>
            <small>25 pcs in stock</small>
            <b>Cooking Oil 5L</b>
            <small className="tb-mute">OIL-5L · 800 HTG → <b>1 100 HTG</b></small>
            <b className="tb-big-r green">25<small>IN STOCK</small></b>
          </div>
          <div className="tb-stock-row tb-hide-short">
            <Pill tone="warn">● LOW</Pill>
            <small>3 pcs in stock</small>
            <b>Prestige Beer</b>
            <small className="tb-mute">PREST-330 · 75 HTG → <b>100 HTG</b></small>
            <b className="tb-big-r gold">3<small>IN STOCK</small></b>
          </div>
        </div>
        <div>
          <div className="tb-card">
            <div className="tb-row">
              <span className="tb-ava dark">R</span>
              <span>
                <b>Rice 25kg</b>
                <small className="tb-mute">RICE-25KG</small>
              </span>
              <span className="tb-x">×</span>
            </div>
            <div className="tb-row">
              <b className="tb-green big">40 <small>sack</small></b>
              <Pill tone="ok">● AVAILABLE</Pill>
            </div>
            <small className="tb-mute">Low threshold: 5 sack</small>
          </div>
          <div className="tb-card">
            <b>Price</b>
            <div className="tb-kpi4 tb-pri4">
              <div className="tb-kpi sand">
                <small>SALE PRICE</small>
                <b>3 200 HTG</b>
              </div>
              <div className="tb-kpi sand">
                <small>COST</small>
                <b>2 500 HTG</b>
              </div>
              <div className="tb-kpi sand">
                <small>MARGIN</small>
                <b className="tb-green">21.9%</b>
              </div>
              <div className="tb-kpi sand">
                <small>STOCK</small>
                <b className="tb-green">40 sack</b>
              </div>
            </div>
            <div className="tb-minirow">
              <span>sack Regular</span>
              <b>3 200 HTG</b>
            </div>
          </div>
          <div className="tb-card tb-hide-short">
            <b>Units (1)</b>
            <div className="tb-minirow">
              <span>sack</span>
              <span className="tb-mute">×1</span>
            </div>
            <Pill>◉ Food</Pill>
          </div>
          <div className="tb-card tb-hide-short tb-hide-mobile">
            <div className="tb-row">
              <div>
                <b>Latest delivery</b>
                <small className="tb-mute">No deliveries for this product yet.</small>
              </div>
              <span className="tb-darkbtn sm">+ ADD</span>
            </div>
          </div>
        </div>
      </div>
    </IpadFrame>
  );
}

/* ------------------------------------------------------------------ */
/* 5. stores → Kliyan                                                   */
/* ------------------------------------------------------------------ */
export function MockStores() {
  return (
    <IpadFrame title="Customers" subtitle="PÉTION-VILLE · HTG · OFFLINE READY" active="kliyan" time="11:05 PM">
      <div className="tb-eyebrow">CRM • HISTORY • LIMIT</div>
      <div className="tb-h1">Customers</div>
      <div className="tb-row tb-hide-mobile">
        <div className="tb-sub">Customer records on desktop — search by NIF/CIN, see debt, limits, Credit vs Cash purchase history, and change audits.</div>
        <span style={{ display: "flex", gap: 6 }}>
          <Pill>3 customers • 1 active debt</Pill>
          <span className="tb-darkbtn sm">+ New Customer</span>
        </span>
      </div>
      <div className="tb-2col tb-focus-detail">
        <div className="tb-card tall">
          <Search ph="Search by name, NIF/CIN, phone or address" />
          <div className="tb-pills">
            <Pill tone="dark">All • 3</Pill>
            <Pill>With debt • 1</Pill>
          </div>
          <div className="tb-client-sel">
            <span className="tb-ava">J</span>
            <span style={{ flex: 1 }}>
              <b>Jean Baptiste</b>
              <small>ID 004-123-4567 • +509 3810 0001</small>
            </span>
            <span className="right">
              <b>3 500 HTG</b>
              <small>1 debt</small>
            </span>
          </div>
          <div className="tb-client-row">
            <span className="tb-ava mint">M</span>
            <span style={{ flex: 1 }}>
              <b>Marie Claire</b>
              <small>ID 004-987-6543 • +509 3820 0002</small>
            </span>
            <span className="right">
              <b className="tb-green">0 HTG</b>
              <small>Up to date</small>
            </span>
          </div>
          <div className="tb-client-row tb-hide-short">
            <span className="tb-ava mint">F</span>
            <span style={{ flex: 1 }}>
              <b>Frantz Delmas</b>
              <small>ID 004-111-2222 • +509 3833 0003</small>
            </span>
            <span className="right">
              <b className="tb-green">0 HTG</b>
              <small>Up to date</small>
            </span>
          </div>
        </div>
        <div>
          <div className="tb-card">
            <div className="tb-row">
              <span style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <span className="tb-ava lg">J</span>
                <span>
                  <b>Jean Baptiste <Pill tone="rose sm">1 active debt</Pill></b>
                  <small className="tb-mute">NIF/CIN 004-123-4567 • +509 3810 0001 • Delmas 33, Port-au-Prince</small>
                </span>
              </span>
              <Pill>✎ Edit</Pill>
            </div>
            <div className="tb-kpi2">
              <div className="tb-kpi sand">
                <small>TOTAL DEBT</small>
                <b className="tb-red">3 500 HTG</b>
                <span>1 open debt</span>
              </div>
              <div className="tb-kpi sand">
                <small>CREDIT LIMIT</small>
                <b>5 000 HTG</b>
                <span>Source: manual</span>
              </div>
            </div>
          </div>
          <div className="tb-card">
            <div className="tb-row">
              <div>
                <b>Active debt</b>
                <small className="tb-mute">1 debt not yet paid</small>
              </div>
              <Pill tone="rose">Attention</Pill>
            </div>
            <div className="tb-debtpink">
              <span>
                <b>sale-debt-1 • 3 500 HTG</b>
                <small>Overdue • Due 9/10/2026</small>
              </span>
              <Pill tone="redsolid">3 500 HTG</Pill>
            </div>
            <div className="tb-minirow tb-hide-short">
              <span>
                <b>Purchase history — Credit vs Cash</b>
                <small className="tb-mute">1 Credit • 0 Cash/Mobile • Clearly separated</small>
              </span>
              <Pill>View</Pill>
            </div>
          </div>
          <div className="tb-card tb-hide-short">
            <div className="tb-row">
              <b>Modification audit</b>
              <Pill>0 entries</Pill>
            </div>
            <small className="tb-mute">customer_history — last 10</small>
            <div className="tb-empty">No changes recorded for this customer yet</div>
          </div>
          <div className="tb-card row">
            <span className="tb-darkcta flex tb-hide-short">Close</span>
            <span className="tb-darkbtn navy">+ NEW CUSTOMER</span>
          </div>
        </div>
      </div>
    </IpadFrame>
  );
}

/* Back-compat: old DeviceFrame name kept in case other pages import it */
export function DeviceFrame({ children }: { children?: React.ReactNode }) {
  return <>{children}</>;
}
