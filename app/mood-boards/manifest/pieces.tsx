import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const PHOTO_DIR = "mood/manifest";

/* Shared SVG filters: a rough inked edge for stamps and carbon-copy text. */
export function InkFilters() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <filter id="mf-ink">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="2.5" />
      </filter>
      <filter id="mf-carbon">
        <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="11" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
        <feGaussianBlur stdDeviation="0.4" />
      </filter>
    </svg>
  );
}

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
    <div className="relative isolate w-full overflow-hidden border border-mf-rule bg-mf-kraft" style={{ aspectRatio: aspect }}>
      {exists ? (
        <>
          {/* Two-ink print: grayscale multiplied onto kraft for the lights, ink navy for the darks. */}
          <Image
            src={`/${PHOTO_DIR}/${file}`}
            alt={alt}
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover mix-blend-multiply grayscale contrast-125"
          />
          <div aria-hidden className="absolute inset-0 bg-mf-ink mix-blend-lighten" />
        </>
      ) : (
        <div
          className="flex h-full flex-col justify-end gap-1 p-4 font-mf-mono text-xs text-mf-umber"
          style={{
            backgroundColor: "var(--color-mf-paper)",
            backgroundImage:
              "repeating-linear-gradient(135deg, transparent 0 10px, rgb(203 191 159 / 0.35) 10px 11px)",
          }}
        >
          <span className="bg-mf-paper self-start px-1">Unsplash: “{query}”</span>
          <span className="bg-mf-paper self-start px-1">public/{PHOTO_DIR}/{file}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Type ---------- */

export function TypeSample({ children, spec }: { children: React.ReactNode; spec: string }) {
  return (
    <div className="border border-mf-rule bg-mf-paper p-5">
      {children}
      <p className="mt-4 border-t border-mf-rule pt-2 font-mf-mono text-[11px] text-mf-umber">{spec}</p>
    </div>
  );
}

/* ---------- Color ---------- */

export function Swatch({ hex, name, role }: { hex: string; name: string; role: string }) {
  return (
    <div className="border border-mf-rule bg-mf-paper">
      <div className="h-32 border-b border-mf-rule" style={{ backgroundColor: hex }} />
      <div className="flex items-baseline justify-between gap-2 p-3">
        <div>
          <p className="font-mf-condensed font-semibold">{name}</p>
          <p className="font-mf-condensed text-sm text-mf-umber">{role}</p>
        </div>
        <p className="font-mf-mono text-xs uppercase">{hex}</p>
      </div>
    </div>
  );
}

/* ---------- Texture ---------- */

export function KraftGrain() {
  return (
    <svg viewBox="0 0 320 220" className="block h-auto w-full border border-mf-rule" role="img" aria-label="Kraft paper grain">
      <filter id="mf-fibers" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012 0.5" numOctaves="2" seed="3" />
        <feColorMatrix values="0 0 0 0 0.35  0 0 0 0 0.27  0 0 0 0 0.15  0 0 0 0.55 0" />
      </filter>
      <filter id="mf-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="3" seed="7" />
        <feColorMatrix values="0 0 0 0 0.3  0 0 0 0 0.24  0 0 0 0 0.14  0 0 0 0.4 0" />
      </filter>
      <rect width="320" height="220" fill="#cdb48a" />
      <rect width="320" height="220" filter="url(#mf-fibers)" />
      <rect width="320" height="220" filter="url(#mf-grain)" />
    </svg>
  );
}

export function CarbonCopy() {
  return (
    <svg viewBox="0 0 320 180" className="block h-auto w-full border border-mf-rule" role="img" aria-label="Carbon-copy ink on paper">
      <rect width="320" height="180" fill="#fbf8f1" />
      <ellipse cx="220" cy="140" rx="90" ry="16" fill="#34408a" opacity="0.07" transform="rotate(-10 220 140)" />
      <g fill="#34408a" opacity="0.8" filter="url(#mf-carbon)" style={{ fontFamily: "var(--next-mf-typewriter)" }}>
        <text x="22" y="48" fontSize="22">RECEIVED</text>
        <text x="22" y="82" fontSize="14">Lotus Bay Knitwear · VN</text>
        <text x="22" y="104" fontSize="14">256K units · HTS 6110.20</text>
        <text x="22" y="126" fontSize="14">Freight/u $1.52</text>
      </g>
    </svg>
  );
}

export function PerforatedEdge() {
  const holes = Array.from({ length: 13 }, (_, i) => 14 + i * 24);
  const teeth = Array.from({ length: 33 }, (_, i) => `${i * 10},${i % 2 ? 112 : 104}`).join(" ");

  return (
    <svg viewBox="0 0 320 124" className="block h-auto w-full" role="img" aria-label="Perforated tear-off edge">
      <rect width="320" height="124" fill="#fbf8f1" />
      {holes.map((x) => (
        <circle key={x} cx={x} cy="16" r="6" fill="#efe6d2" stroke="#cbbf9f" />
      ))}
      <line x1="0" y1="38" x2="320" y2="38" stroke="#6b6455" strokeDasharray="5 4" />
      <text x="12" y="70" fontSize="11" fill="#6b6455" letterSpacing="2" style={{ fontFamily: "var(--next-mf-mono)" }}>
        COPY 2 OF 4 · KEEP FOR RECORDS
      </text>
      <polygon points={`0,124 ${teeth} 320,124`} fill="#efe6d2" />
    </svg>
  );
}

export function LedgerGrid() {
  return (
    <div
      role="img"
      aria-label="Ruled ledger paper with a red margin line"
      className="h-52 border border-mf-rule bg-mf-paper"
      style={{
        backgroundImage:
          "linear-gradient(to right, transparent 43px, rgb(194 53 43 / 0.45) 43px 44px, transparent 44px), repeating-linear-gradient(to bottom, transparent 0 25px, #cbbf9f 25px 26px)",
      }}
    />
  );
}

/* ---------- Interface ---------- */

export function Stamp({
  children,
  size = "sm",
  tilt = 0,
}: {
  children: React.ReactNode;
  size?: "sm" | "lg";
  tilt?: number;
}) {
  return (
    <span
      className={`inline-block border-mf-stamp font-mf-stencil uppercase text-mf-stamp ${
        size === "lg" ? "border-[5px] border-double px-4 py-1 text-3xl tracking-wider" : "border-2 px-2 py-0.5 text-xs tracking-widest"
      }`}
      style={{ transform: `rotate(${tilt}deg)`, filter: "url(#mf-ink)" }}
    >
      {children}
    </span>
  );
}

export function RecommendationStamps() {
  return (
    <div className="flex flex-col items-start gap-5 border border-mf-rule bg-mf-paper p-6">
      <Stamp size="lg" tilt={-5}>
        Rebalance
      </Stamp>
      <div className="flex flex-wrap gap-3">
        <Stamp tilt={2}>Add origin</Stamp>
        <Stamp tilt={-2}>Renegotiate freight</Stamp>
      </div>
    </div>
  );
}

function Field({ n, label, value, wide }: { n: number; label: string; value: string; wide?: boolean }) {
  return (
    <div className={`border-r border-b border-mf-ink p-2 ${wide ? "col-span-2" : ""}`}>
      <dt className="font-mf-condensed text-[10px] uppercase tracking-wider text-mf-umber">
        {n} · {label}
      </dt>
      <dd className="mt-0.5 font-mf-mono text-sm">{value}</dd>
    </div>
  );
}

export function LadingFields() {
  return (
    <div className="border border-mf-rule bg-mf-paper p-4">
      <p className="font-mf-shoulders text-lg font-bold uppercase tracking-wide">Origin record · Sweaters</p>
      <dl className="mt-3 grid grid-cols-3 border-t border-l border-mf-ink">
        <Field n={1} label="Vendor" value="Lotus Bay Knitwear" wide />
        <Field n={2} label="Origin" value="VN" />
        <Field n={3} label="HTS code" value="6110.20" />
        <Field n={4} label="Units" value="256K" />
        <Field n={5} label="Share" value="18%" />
        <Field n={6} label="Freight/u vs peers" value="$1.52 vs $1.05" wide />
        <Field n={7} label="Net margin" value="6.2%" />
      </dl>
    </div>
  );
}

const ORIGIN_FILL: Record<string, React.CSSProperties> = {
  CN: { backgroundColor: "#1f2a44", color: "#fbf8f1" },
  VN: {
    backgroundColor: "#fbf8f1",
    backgroundImage: "repeating-linear-gradient(45deg, #1f2a44 0 2px, transparent 2px 6px)",
  },
  BD: { backgroundColor: "#6b6455", color: "#fbf8f1" },
  KH: { backgroundColor: "#cbbf9f", color: "#1f2a44" },
  Other: { backgroundColor: "#fbf8f1", color: "#6b6455" },
};

const MIX = [
  { lens: "Own brand", shares: { CN: 52, VN: 18, BD: 12, KH: 8, Other: 10 } },
  { lens: "Retail peers", shares: { CN: 30, VN: 34, BD: 14, KH: 12, Other: 10 } },
  { lens: "Industry", shares: { CN: 27, VN: 31, BD: 16, KH: 12, Other: 14 } },
];

export function MixBars() {
  return (
    <div className="border border-mf-rule bg-mf-paper p-4">
      <p className="font-mf-condensed font-semibold">Women’s knit sweaters</p>
      <p className="font-mf-condensed text-sm text-mf-umber">Share of units by origin</p>
      <div className="mt-4 space-y-3">
        {MIX.map(({ lens, shares }) => (
          <div key={lens}>
            <p className="mb-1 font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">{lens}</p>
            <div className="flex h-7 border border-mf-ink">
              {Object.entries(shares).map(([origin, share]) => (
                <div
                  key={origin}
                  className="flex items-center justify-center border-r border-mf-ink font-mf-mono text-[11px] last:border-r-0"
                  style={{ width: `${share}%`, ...ORIGIN_FILL[origin] }}
                >
                  {share >= 15 && (
                    <span className={`whitespace-nowrap ${origin === "VN" ? "bg-mf-paper px-0.5" : ""}`}>
                      {origin} {share}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-1 font-mf-mono text-[11px]">
        {Object.keys(ORIGIN_FILL).map((origin) => (
          <li key={origin} className="flex items-center gap-1">
            <span className="h-3 w-3 border border-mf-ink" style={ORIGIN_FILL[origin]} />
            {origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-3 border border-mf-rule bg-mf-paper p-5">
      <button
        type="button"
        className="bg-mf-stamp px-4 py-2 font-mf-mono text-sm font-semibold uppercase tracking-wider text-mf-paper hover:bg-[#a42c24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink active:translate-y-px"
      >
        Generate report
      </button>
      <button
        type="button"
        className="border border-mf-ink px-4 py-2 font-mf-mono text-sm uppercase tracking-wider hover:bg-mf-kraft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink active:translate-y-px"
      >
        Copy
      </button>
      <span className="font-mf-mono text-sm underline decoration-mf-rule underline-offset-4">Vendor leads →</span>
    </div>
  );
}

const LEADS = [
  { name: "Red River Garment Co.", meta: "VN · $86M · 412 shipments · 9 US brand clients" },
  { name: "Saigon Pine Knit", meta: "VN · $54M · 268 shipments · 6 clients" },
  { name: "Mekong Stitch Works", meta: "KH · $38M · 190 shipments · 4 clients" },
];

export function VendorRows() {
  return (
    <div className="border border-mf-rule bg-mf-paper">
      <ul className="divide-y divide-mf-rule">
        {LEADS.map((lead) => (
          <li key={lead.name} className="flex items-start justify-between gap-3 p-3">
            <div>
              <p className="font-mf-condensed font-semibold">{lead.name}</p>
              <p className="font-mf-mono text-xs text-mf-umber">{lead.meta}</p>
            </div>
            <Stamp tilt={-3}>Lead</Stamp>
          </li>
        ))}
      </ul>
      <p className="border-t border-dashed border-mf-umber p-3 font-mf-condensed text-xs text-mf-umber">
        Leads come from shipment records. Verify before outreach.
      </p>
    </div>
  );
}

/* ---------- Illustrations ---------- */

/* Seeded random so the drawing is identical on every render. */
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ROOF_TONES = ["#efe6d2", "#cbbf9f", "#cbbf9f", "#a39a85", "#6b6455", "#6b6455", "#46506a"];
const BLOCK_TOPS = [10, 92, 174];

export function ContainerYard() {
  const rand = seeded(7);
  const roofs: { x: number; y: number; w: number; tone: string }[] = [];
  for (const top of BLOCK_TOPS) {
    for (let row = 0; row < 4; row++) {
      let x = 10;
      while (true) {
        const w = rand() < 0.7 ? 46 : 22;
        if (x + w > 350) break;
        if (rand() > 0.08) {
          roofs.push({ x, y: top + row * 16, w, tone: ROOF_TONES[Math.floor(rand() * ROOF_TONES.length)] });
        }
        x += w + 2;
      }
    }
  }

  return (
    <svg viewBox="0 0 360 246" className="block h-auto w-full border border-mf-rule" role="img" aria-label="Container yard seen from above">
      <defs>
        <pattern id="mf-ribs" width="3" height="14" patternUnits="userSpaceOnUse">
          <rect width="0.8" height="14" fill="#1f2a44" fillOpacity="0.25" />
        </pattern>
      </defs>
      <rect width="360" height="246" fill="#1f2a44" />
      {[82, 164].map((y) => (
        <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="#cbbf9f" strokeOpacity="0.5" strokeDasharray="8 6" />
      ))}
      {roofs.map((roof) => (
        <g key={`${roof.x}-${roof.y}`}>
          <rect x={roof.x} y={roof.y} width={roof.w} height="14" fill={roof.tone} />
          <rect x={roof.x} y={roof.y} width={roof.w} height="14" fill="url(#mf-ribs)" />
        </g>
      ))}
      {/* Trucks in the lanes */}
      {[
        { x: 58, y: 77 },
        { x: 236, y: 159 },
      ].map(({ x, y }) => (
        <g key={x}>
          <rect x={x} y={y} width="46" height="10" fill="#6b6455" />
          <rect x={x + 48} y={y + 1} width="7" height="8" fill="#efe6d2" />
        </g>
      ))}
      {/* Gantry crane straddling the middle block, with its shadow */}
      <g fill="#000" fillOpacity="0.25" transform="translate(5 6)">
        <rect x="190" y="84" width="6" height="78" />
        <rect x="262" y="84" width="6" height="78" />
        <rect x="190" y="84" width="78" height="5" />
        <rect x="190" y="157" width="78" height="5" />
      </g>
      <g fill="#efe6d2">
        <rect x="190" y="84" width="6" height="78" />
        <rect x="262" y="84" width="6" height="78" />
        <rect x="190" y="84" width="78" height="5" />
        <rect x="190" y="157" width="78" height="5" />
      </g>
      <rect x="220" y="112" width="18" height="22" fill="#cbbf9f" stroke="#1f2a44" />
    </svg>
  );
}

const RECORD_ROWS = [
  ["Shipper", "Red River Garment Co."],
  ["Origin", "VN"],
  ["HTS code", "6110.20"],
  ["Shipments", "412 · $86M"],
];

export function ReceiptBook() {
  return (
    <svg viewBox="0 0 320 240" className="block h-auto w-full border border-mf-rule" role="img" aria-label="A carbon-copy receipt book">
      <rect width="320" height="240" fill="#cbbf9f" />
      <g transform="rotate(-3 160 120)">
        <rect x="44" y="31" width="252" height="194" fill="#1f2a44" fillOpacity="0.18" />
        <rect x="40" y="26" width="254" height="196" fill="#efe6d2" />
        <rect x="37" y="23" width="253" height="195" fill="#34408a" />
        <rect x="34" y="20" width="252" height="194" fill="#fbf8f1" />
        <rect x="34" y="20" width="252" height="16" fill="#1f2a44" />
        <rect x="70" y="26" width="16" height="3" fill="#cbbf9f" />
        <rect x="236" y="26" width="16" height="3" fill="#cbbf9f" />
        <line x1="86" y1="36" x2="86" y2="214" stroke="#6b6455" strokeDasharray="2 3" />
        <text
          transform="rotate(-90 64 125)"
          x="64"
          y="125"
          textAnchor="middle"
          fontSize="8"
          letterSpacing="2"
          fill="#6b6455"
          style={{ fontFamily: "var(--next-mf-mono)" }}
        >
          COPY 1 OF 3
        </text>
        <text x="98" y="58" fontSize="16" fontWeight="800" letterSpacing="1" fill="#1f2a44" style={{ fontFamily: "var(--next-mf-shoulders)" }}>
          SHIPMENT RECORD
        </text>
        <g filter="url(#mf-ink)" transform="rotate(-8 240 122)">
          <rect x="210" y="111" width="60" height="22" fill="none" stroke="#c2352b" strokeWidth="2" />
          <text x="240" y="127" textAnchor="middle" fontSize="13" fill="#c2352b" letterSpacing="2" style={{ fontFamily: "var(--next-mf-stencil)" }}>
            LEAD
          </text>
        </g>
        {RECORD_ROWS.map(([label, value], i) => (
          <g key={label}>
            <text x="98" y={80 + i * 34} fontSize="7" letterSpacing="1.5" fill="#6b6455" style={{ fontFamily: "var(--next-mf-mono)" }}>
              {label.toUpperCase()}
            </text>
            <text
              x="98"
              y={95 + i * 34}
              fontSize="13"
              fill="#34408a"
              filter="url(#mf-carbon)"
              style={{ fontFamily: "var(--next-mf-typewriter)" }}
            >
              {value}
            </text>
            <line x1="98" y1={100 + i * 34} x2="274" y2={100 + i * 34} stroke="#cbbf9f" />
          </g>
        ))}
      </g>
    </svg>
  );
}
