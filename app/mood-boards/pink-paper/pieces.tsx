import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const PHOTO_DIR = "mood/pink-paper";

/* ---------- Photos ---------- */

export function PhotoSlot({
  file,
  alt,
  query,
  aspect,
}: {
  file: string;
  alt: string;
  query: string;
  aspect: string;
}) {
  const exists = fs.existsSync(path.join(process.cwd(), "public", PHOTO_DIR, file));

  return (
    <div className="relative isolate w-full overflow-hidden bg-pp-salmon" style={{ aspectRatio: aspect }}>
      {exists ? (
        /* Printed on newsprint: grayscale multiplied onto the salmon paper. */
        <Image
          src={`/${PHOTO_DIR}/${file}`}
          alt={alt}
          fill
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover mix-blend-multiply grayscale contrast-125"
        />
      ) : (
        <div
          className="flex h-full flex-col justify-end gap-1 border border-pp-rule p-4 font-pp-sans text-xs text-pp-graphite"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 10px, rgb(220 197 178 / 0.5) 10px 11px)",
          }}
        >
          <span className="self-start bg-pp-salmon px-1">Unsplash: “{query}”</span>
          <span className="self-start bg-pp-salmon px-1">public/{PHOTO_DIR}/{file}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Type ---------- */

export function TypeSample({ children, spec }: { children: React.ReactNode; spec: string }) {
  return (
    <div>
      {children}
      <p className="mt-3 border-t border-pp-rule pt-1.5 font-pp-sans text-[11px] uppercase tracking-wider text-pp-graphite">
        {spec}
      </p>
    </div>
  );
}

/* ---------- Color ---------- */

export function Swatch({ hex, name, role }: { hex: string; name: string; role: string }) {
  return (
    <div>
      <div className="h-28 border border-pp-rule" style={{ backgroundColor: hex }} />
      <div className="mt-2 flex items-baseline justify-between font-pp-sans text-sm">
        <span className="font-semibold">{name}</span>
        <span className="tabular-nums uppercase text-pp-graphite">{hex}</span>
      </div>
      <p className="font-pp-serif text-sm italic text-pp-graphite">{role}</p>
    </div>
  );
}

/* ---------- Texture ---------- */

/* Faint mirrored text from the other side of the sheet, plus paper fibre. */
export function ShowThrough() {
  const columns = [14, 118, 222];
  const bars = columns.flatMap((x, c) =>
    Array.from({ length: 22 }, (_, i) => ({
      x,
      y: 46 + i * 7.5,
      w: i % 7 === 6 ? 40 + ((i * 13 + c * 7) % 30) : 84,
    })),
  );

  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" role="img" aria-label="Newsprint with faint show-through from the reverse page">
      <filter id="pp-fibre" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="5" />
        <feColorMatrix values="0 0 0 0 0.4  0 0 0 0 0.3  0 0 0 0 0.25  0 0 0 0.12 0" />
      </filter>
      <rect width="320" height="220" fill="#fff1e5" />
      <g fill="#262a33" fillOpacity="0.07" transform="translate(320 0) scale(-1 1)">
        <rect x="14" y="14" width="250" height="14" />
        {bars.map((bar) => (
          <rect key={`${bar.x}-${bar.y}`} x={bar.x} y={bar.y} width={bar.w} height="3" />
        ))}
      </g>
      <rect width="320" height="220" filter="url(#pp-fibre)" />
    </svg>
  );
}

/* Dots on a 45° screen, sized by a soft light falling from the top right. */
export function Halftone() {
  const step = 8;
  const dots: { x: number; y: number; r: number }[] = [];
  const cos = Math.SQRT1_2;
  for (let gx = -240; gx <= 560; gx += step) {
    for (let gy = -240; gy <= 460; gy += step) {
      const x = 160 + (gx - 160) * cos - (gy - 110) * cos;
      const y = 110 + (gx - 160) * cos + (gy - 110) * cos;
      if (x < -4 || x > 324 || y < -4 || y > 224) continue;
      const light = Math.min(1, Math.hypot(x - 250, y - 50) / 300);
      dots.push({ x: Math.round(x * 10) / 10, y: Math.round(y * 10) / 10, r: Math.round(Math.max(0.3, light * 3.9) * 100) / 100 });
    }
  }

  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" role="img" aria-label="Halftone dot screen">
      <rect width="320" height="220" fill="#fff1e5" />
      <g fill="#262a33">
        {dots.map((dot, i) => (
          <circle key={i} cx={dot.x} cy={dot.y} r={dot.r} />
        ))}
      </g>
    </svg>
  );
}

/* A page of greeked text set in three columns with hairline rules. */
export function ColumnGrid() {
  const columns = [12, 116, 220];
  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full" role="img" aria-label="Three-column newspaper grid with hairline rules">
      <rect width="320" height="220" fill="#fff1e5" />
      <rect x="12" y="12" width="230" height="10" fill="#262a33" />
      <rect x="12" y="27" width="150" height="10" fill="#262a33" />
      <line x1="12" y1="46" x2="308" y2="46" stroke="#262a33" />
      <line x1="110" y1="54" x2="110" y2="210" stroke="#dcc5b2" />
      <line x1="214" y1="54" x2="214" y2="210" stroke="#dcc5b2" />
      <rect x="116" y="56" width="92" height="56" fill="#dcc5b2" />
      {columns.map((x) =>
        Array.from({ length: 21 }, (_, i) => 56 + i * 7.5)
          .filter((y) => x !== 116 || y > 116)
          .map((y, i) => (
            <rect
              key={`${x}-${y}`}
              x={x}
              y={y}
              width={i % 6 === 5 ? 52 : 88}
              height="2.5"
              fill="#66605a"
              fillOpacity="0.5"
            />
          )),
      )}
    </svg>
  );
}

export function FoldCrease() {
  return (
    <div
      role="img"
      aria-label="A horizontal fold crease across newsprint"
      className="h-44 border border-pp-rule"
      style={{
        background:
          "linear-gradient(to bottom, #fff1e5 0%, #fbe8d8 46%, #e8cfbb 49.5%, #fff8f1 50.5%, #fcebdd 54%, #fff1e5 100%)",
      }}
    />
  );
}

/* ---------- Interface ---------- */

export function HeadlineBlock() {
  return (
    <article className="border-t-2 border-pp-ink pt-3">
      <p className="font-pp-kicker text-[11px] font-semibold uppercase tracking-[0.18em] text-pp-graphite">
        Sourcing · Women’s knit sweaters
      </p>
      <h3 className="mt-2 font-pp-display text-[28px] font-medium leading-[1.1] tracking-tight">
        Northfold buys 52% of its sweaters in China. The industry buys 27%.
      </h3>
      <p className="mt-3 font-pp-display text-lg italic leading-snug text-pp-graphite">
        Vietnam is now the top origin for HTS 6110.20. Moving 20 points cuts landed cost per unit by
        about 5%.
      </p>
      <p className="mt-4 border-t border-pp-rule pt-2 font-pp-sans text-xs text-pp-graphite">
        Shiftmap landscape report · US · Oct 2025 – Sep 2026
      </p>
    </article>
  );
}

const ORIGIN_ROWS = [
  { origin: "CN", share: "52%", own: "$2.05", peers: "$1.38", margin: "1.8%" },
  { origin: "VN", share: "18%", own: "$1.52", peers: "$1.05", margin: "6.2%" },
  { origin: "BD", share: "12%", own: "$1.71", peers: "$1.20", margin: "4.0%" },
  { origin: "KH", share: "8%", own: "$1.48", peers: "$1.10", margin: "6.9%" },
  { origin: "Other", share: "10%", own: "$1.90", peers: "—", margin: "2.5%" },
];

export function OriginTable() {
  return (
    <div>
      <p className="font-pp-display text-lg font-semibold leading-tight">Sweaters by origin</p>
      <p className="font-pp-sans text-xs text-pp-graphite">Own brand, last 12 months</p>
      <table className="mt-3 w-full border-t-2 border-pp-ink font-pp-sans text-[13px] tabular-nums">
        <thead>
          <tr className="border-b border-pp-ink text-[10px] uppercase tracking-wider text-pp-graphite">
            <th className="py-1.5 text-left font-semibold">Origin</th>
            <th className="text-right font-semibold">Share</th>
            <th className="text-right font-semibold">Freight/u</th>
            <th className="text-right font-semibold">Peers</th>
            <th className="text-right font-semibold">Net margin</th>
          </tr>
        </thead>
        <tbody>
          {ORIGIN_ROWS.map((row) => (
            <tr key={row.origin} className={`border-b border-pp-rule ${row.origin === "CN" ? "font-semibold" : ""}`}>
              <td className="py-1.5">{row.origin}</td>
              <td className="text-right">{row.share}</td>
              <td className="text-right">{row.own}</td>
              <td className="text-right text-pp-graphite">{row.peers}</td>
              <td className="text-right">{row.margin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 font-pp-serif text-xs italic text-pp-graphite">
        China carries half the volume at the thinnest margin.
      </p>
    </div>
  );
}

const SLOPES = [
  { origin: "CN", own: 52, industry: 27, focus: true },
  { origin: "VN", own: 18, industry: 31, focus: true },
  { origin: "BD", own: 12, industry: 16 },
  { origin: "KH", own: 8, industry: 12 },
  { origin: "Other", own: 10, industry: 14 },
];
const slopeY = (share: number) => 196 - share * 3.2;

export function SlopeChart() {
  return (
    <div>
      <p className="font-pp-display text-lg font-semibold leading-tight">Own brand vs industry imports</p>
      <p className="font-pp-sans text-xs text-pp-graphite">Share of units, women’s knit sweaters (%)</p>
      <svg viewBox="0 0 300 226" className="mt-3 block h-auto w-full" role="img" aria-label="Slope chart: China falls from 52% for the own brand to 27% for industry imports; Vietnam rises from 18% to 31%">
        <line x1="80" y1="18" x2="80" y2="200" stroke="#dcc5b2" />
        <line x1="220" y1="18" x2="220" y2="200" stroke="#dcc5b2" />
        {SLOPES.filter((s) => !s.focus).map((s) => (
          <line key={s.origin} x1="80" y1={slopeY(s.own)} x2="220" y2={slopeY(s.industry)} stroke="#66605a" strokeOpacity="0.5" />
        ))}
        {SLOPES.filter((s) => s.focus).map((s) => (
          <g key={s.origin} fill="#262a33" style={{ fontFamily: "var(--next-pp-sans)" }} fontSize="12">
            <line x1="80" y1={slopeY(s.own)} x2="220" y2={slopeY(s.industry)} stroke="#262a33" strokeWidth="2" />
            <circle cx="80" cy={slopeY(s.own)} r="3.5" />
            <circle cx="220" cy={slopeY(s.industry)} r="3.5" />
            <text x="70" y={slopeY(s.own) + 4} textAnchor="end" fontWeight="600">
              {s.origin} {s.own}
            </text>
            <text x="230" y={slopeY(s.industry) + 4} fontWeight="600">
              {s.industry} {s.origin}
            </text>
          </g>
        ))}
        <g fill="#66605a" fontSize="10" style={{ fontFamily: "var(--next-pp-sans)" }} letterSpacing="1">
          <text x="80" y="218" textAnchor="middle">OWN BRAND</text>
          <text x="220" y="218" textAnchor="middle">INDUSTRY</text>
        </g>
      </svg>
      <p className="font-pp-serif text-xs italic text-pp-graphite">Grey lines: BD, KH and other origins.</p>
    </div>
  );
}

export function WhatToDo() {
  return (
    <aside className="bg-pp-tint p-5">
      <p className="font-pp-kicker text-[11px] font-semibold uppercase tracking-[0.18em]">What to do</p>
      <ol className="mt-3 space-y-3 font-pp-serif text-[15px] leading-6">
        <li>
          <span className="font-pp-display font-semibold">Rebalance.</span> Move 12 pts from CN to VN
          and 8 pts from CN to KH.
        </li>
        <li>
          <span className="font-pp-display font-semibold">Call two leads.</span> Red River Garment Co.
          and Saigon Pine Knit already ship this code to US brands.
        </li>
        <li>
          <span className="font-pp-display font-semibold">Book the saving.</span> Landed cost per unit
          falls by about 5% after the shift.
        </li>
      </ol>
      <p className="mt-4 border-t border-pp-rule pt-2 font-pp-sans text-xs text-pp-graphite">
        Leads come from shipment records. Verify before outreach.
      </p>
    </aside>
  );
}

export function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        className="bg-pp-teal px-4 py-2 font-pp-sans text-sm font-semibold text-pp-salmon hover:bg-[#0b3e42] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-ink active:translate-y-px"
      >
        Generate report
      </button>
      <button
        type="button"
        className="border border-pp-ink px-4 py-2 font-pp-sans text-sm font-semibold hover:bg-pp-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-ink active:translate-y-px"
      >
        Download CSV
      </button>
      <span className="font-pp-serif text-[15px] underline decoration-pp-rule underline-offset-4">
        Read the appendix →
      </span>
    </div>
  );
}

export function Masthead() {
  return (
    <div className="text-center">
      <p className="flex justify-between border-b border-pp-ink pb-1 font-pp-sans text-[10px] uppercase tracking-[0.2em] text-pp-graphite">
        <span>US</span>
        <span>Oct 2025 – Sep 2026</span>
      </p>
      <p className="py-2 font-pp-display text-5xl font-semibold tracking-tight">Shiftmap</p>
      <p className="border-t-4 border-double border-pp-ink pt-1.5 font-pp-sans text-[10px] uppercase tracking-[0.2em]">
        Landscape report · Women’s knit sweaters
      </p>
    </div>
  );
}

const MARGINS = [
  { category: "Women’s knit sweaters", own: 3.3, peers: 7.4, gap: "−410 bps" },
  { category: "Women’s leggings", own: 6.8, peers: 8.1, gap: "−130 bps" },
  { category: "Crew-neck tees", own: 9.2, peers: 10.0, gap: "−80 bps" },
  { category: "Men’s down jackets", own: 1.9, peers: 6.6, gap: "−470 bps" },
];

export function SmallMultiples() {
  return (
    <div>
      <p className="font-pp-display text-lg font-semibold leading-tight">Net margin, own brand vs peers</p>
      <p className="font-pp-sans text-xs text-pp-graphite">Four categories, last 12 months (%)</p>
      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-4 border-t-2 border-pp-ink pt-3">
        {MARGINS.map((m) => (
          <div key={m.category} className="font-pp-sans text-[11px] tabular-nums">
            <p className="font-semibold leading-tight">{m.category}</p>
            <div className="mt-1.5 space-y-1">
              <div className="flex items-center gap-1.5">
                <div className="h-2 bg-pp-ink" style={{ width: `${m.own * 7}%` }} />
                <span>{m.own.toFixed(1)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 bg-pp-rule" style={{ width: `${m.peers * 7}%` }} />
                <span className="text-pp-graphite">{m.peers.toFixed(1)}</span>
              </div>
            </div>
            <p className="mt-1 font-pp-serif italic text-pp-graphite">{m.gap}</p>
          </div>
        ))}
      </div>
      <p className="mt-3 font-pp-sans text-[11px] text-pp-graphite">
        <span className="mr-1 inline-block h-2 w-2 bg-pp-ink" />
        Own brand
        <span className="mr-1 ml-3 inline-block h-2 w-2 bg-pp-rule" />
        Retail peers
      </p>
    </div>
  );
}

const RECOMMENDATIONS = [
  { category: "Women’s knit sweaters", tag: "Rebalance", detail: "CN→VN 12 pts, CN→KH 8 pts" },
  { category: "Women’s leggings", tag: "Renegotiate freight", detail: "VN lane $1.08 vs $0.66/u" },
  { category: "Crew-neck tees", tag: "Add origin", detail: "Test Guatemala for ~10 pts" },
  { category: "Men’s down jackets", tag: "Rebalance", detail: "CN→VN 12 pts" },
];

export function RecommendationTags() {
  return (
    <ul className="divide-y divide-pp-rule border-y border-pp-ink">
      {RECOMMENDATIONS.map((r) => (
        <li key={r.category} className="py-2">
          <div className="flex items-baseline justify-between gap-2">
            <span className="font-pp-display text-[15px] font-semibold">{r.category}</span>
            <span className="shrink-0 border border-pp-ink px-1.5 py-0.5 font-pp-sans text-[10px] font-semibold uppercase tracking-wider">
              {r.tag}
            </span>
          </div>
          <p className="font-pp-sans text-xs tabular-nums text-pp-graphite">{r.detail}</p>
        </li>
      ))}
    </ul>
  );
}
