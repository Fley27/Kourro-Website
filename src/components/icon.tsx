import React from "react";

// Compact inline SVG icon set (24x24, stroke). Falls back to a dot.
export function Ic({ name, size = 20, fill }: { name: string; size?: number; fill?: string }) {
  const s = { width: size, height: size } as const;
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (name) {
    case "bolt": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M13 2L4 14h6l-1 8 9-12h-6l1-8Z" /></svg>;
    case "shield": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M12 3l7 3v6c0 4.6-3 8-7 10-4-2-7-5.4-7-10V6l7-3Z" /><path d="M9 12l2 2 4-4" /></svg>;
    case "card": return <svg viewBox="0 0 24 24" style={s} {...common}><rect x="3" y="6" width="18" height="13" rx="2.5" /><path d="M3 10h18M7.5 15h4" /></svg>;
    case "chart": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M4 20V10M10 20V4M16 20v-8M21 20H3" /></svg>;
    case "store": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M4 4h16l1 4H3l1-4Z" /><path d="M4 10v10h16V10" /><path d="M9 20v-5h6v5" /></svg>;
    case "people": return <svg viewBox="0 0 24 24" style={s} {...common}><circle cx="9" cy="8" r="3.4" /><path d="M3 20c0-3.2 2.6-5.2 6-5.2s6 2 6 5.2" /><circle cx="17.2" cy="9" r="2.6" /><path d="M16.5 15c2.4.3 4.5 2 4.5 5" /></svg>;
    case "phone": return <svg viewBox="0 0 24 24" style={s} {...common}><rect x="7" y="3" width="10" height="18" rx="2.5" /><path d="M11 18h2" /></svg>;
    case "laptop": return <svg viewBox="0 0 24 24" style={s} {...common}><rect x="5" y="5" width="14" height="10" rx="2" /><path d="M2.5 19h19" /></svg>;
    case "lock": return <svg viewBox="0 0 24 24" style={s} {...common}><rect x="5" y="11" width="14" height="9" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>;
    case "box": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M21 8l-9-5-9 5v8l9 5 9-5V8Z" /><path d="M3 8l9 5 9-5M12 13v8" /></svg>;
    case "bell": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M18 9a6 6 0 1 0-12 0c0 6-2 7-2 7h16s-2-1-2-7Z" /><path d="M10.5 20a1.8 1.8 0 0 0 3 0" /></svg>;
    case "check": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M20 6L9 17l-5-5" /></svg>;
    case "arrow": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M4 12h16M13 5l7 7-7 7" /></svg>;
    case "phonecall": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M5 4h4l1.5 5L8 11a13 13 0 0 0 5 5l2-2.5L20 15v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" /></svg>;
    case "message": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M21 12a9 9 0 0 1-9 9H4a1 1 0 0 1-1-1v-4a9 9 0 1 1 18-4Z" /><path d="M8 9h8M8 13h5" /></svg>;
    case "pin": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M12 21s-7-5.5-7-11a7 7 0 1 1 14 0c0 5.5-7 11-7 11Z" /><circle cx="12" cy="10" r="2.5" /></svg>;
    case "menu": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M4 7h16M4 12h16M4 17h16" /></svg>;
    case "close": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M6 6l12 12M18 6L6 18" /></svg>;
    case "sync": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M20 11a8 8 0 1 0-2.3 6.3" /><path d="M20 4v7h-7" /></svg>;
    case "receipt": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3Z" /><path d="M9 8h6M9 12h6" /></svg>;
    case "gift": return <svg viewBox="0 0 24 24" style={s} {...common}><rect x="4" y="9" width="16" height="11" rx="1.5" /><path d="M12 9v11M4 13h16M12 9s-4 0-5-2a2.4 2.4 0 0 1 3.6-2.3c1 .6 1.4 2.3 1.4 4.3Zm0 0s4 0 5-2a2.4 2.4 0 0 0-3.6-2.3c-1 .6-1.4 2.3-1.4 4.3Z" /></svg>;
    case "moon": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z" /></svg>;
    case "sun": return <svg viewBox="0 0 24 24" style={s} {...common}><circle cx="12" cy="12" r="4.5" /><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" /></svg>;
    case "x": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M7 7l10 10M17 7L7 17" /></svg>;
    case "spark": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M12 3l1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="M19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8L19 16Z" /></svg>;
    case "hat": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M12 4L2 9l10 5 8-4v6" /><path d="M6 11.5V16c0 1.7 2.7 3 6 3s6-1.3 6-3v-4.5" /></svg>;
    case "target": return <svg viewBox="0 0 24 24" style={s} {...common}><circle cx="12" cy="12" r="8.5" /><circle cx="12" cy="12" r="4.5" /><circle cx="12" cy="12" r="1.2" /></svg>;
    case "chevron-left": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M15 18l-6-6 6-6" /></svg>;
    case "chevron-right": return <svg viewBox="0 0 24 24" style={s} {...common}><path d="M9 18l6-6-6-6" /></svg>;
    case "search": return <svg viewBox="0 0 24 24" style={s} {...common}><circle cx="11" cy="11" r="6" /><path d="M21 21l-4.35-4.35" /></svg>;
    case "mail": return <svg viewBox="0 0 24 24" style={s} {...common}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 6l-10 7L2 6" /></svg>;
    default: return <svg viewBox="0 0 24 24" style={s} {...common}><circle cx="12" cy="12" r="4" /></svg>;
  }
}