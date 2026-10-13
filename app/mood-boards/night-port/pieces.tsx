import fs from "node:fs";
import path from "node:path";
import Image from "next/image";

const PHOTO_DIR = "mood/night-port";

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
    <div className="relative isolate h-full min-h-48 w-full overflow-hidden bg-np-signal" style={{ aspectRatio: aspect }}>
      {exists ? (
        <>
          {/* Monitor feed: grayscale between signal white and night black. */}
          <Image
            src={`/${PHOTO_DIR}/${file}`}
            alt={alt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover mix-blend-multiply grayscale contrast-125"
          />
          <div aria-hidden className="absolute inset-0 bg-np-night mix-blend-lighten" />
        </>
      ) : (
        <div
          className="flex h-full flex-col justify-end gap-1 bg-np-panel p-4 font-np-mono text-[11px] text-np-steel"
          style={{
            backgroundImage: "repeating-linear-gradient(135deg, transparent 0 10px, rgb(42 48 58 / 0.9) 10px 11px)",
          }}
        >
          <span className="self-start bg-np-panel px-1">Unsplash: “{query}”</span>
          <span className="self-start bg-np-panel px-1">public/{PHOTO_DIR}/{file}</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Type ---------- */

export function TypeSample({ children, spec }: { children: React.ReactNode; spec: string }) {
  return (
    <div className="w-full">
      {children}
      <p className="mt-4 font-np-mono text-[10px] uppercase tracking-wider text-np-steel">{spec}</p>
    </div>
  );
}

/* ---------- Color ---------- */

export function Swatch({ hex, name, role }: { hex: string; name: string; role: string }) {
  return (
    <div className="w-full">
      <div className="h-24 border border-np-edge" style={{ backgroundColor: hex }} />
      <div className="mt-3 flex items-baseline justify-between font-np-label text-sm">
        <span className="font-semibold uppercase tracking-wide">{name}</span>
        <span className="font-np-mono text-xs text-np-steel">{hex}</span>
      </div>
      <p className="font-np-body text-sm text-np-steel">{role}</p>
    </div>
  );
}

/* ---------- Illustrations ---------- */

const BLIPS = [
  { origin: "CN", x: 196, y: 92, act: true },
  { origin: "VN", x: 118, y: 168 },
  { origin: "BD", x: 92, y: 104 },
  { origin: "KH", x: 214, y: 186 },
  { origin: "GT", x: 250, y: 140 },
];

export function Radar() {
  return (
    <svg viewBox="0 0 320 260" className="block h-auto w-full" role="img" aria-label="Radar screen with origin blips; China is highlighted for action">
      <defs>
        <radialGradient id="np-sweep" cx="160" cy="130" r="120" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#e6e8eb" stopOpacity="0.02" />
          <stop offset="1" stopColor="#e6e8eb" stopOpacity="0.16" />
        </radialGradient>
      </defs>
      <rect width="320" height="260" fill="#0e1116" />
      <g fill="none" stroke="#2a303a">
        {[30, 60, 90, 120].map((r) => (
          <circle key={r} cx="160" cy="130" r={r} />
        ))}
        <line x1="40" y1="130" x2="280" y2="130" />
        <line x1="160" y1="10" x2="160" y2="250" />
      </g>
      <path d="M160 130 L160 10 A120 120 0 0 1 263.9 70 Z" fill="url(#np-sweep)" />
      <line x1="160" y1="130" x2="263.9" y2="70" stroke="#e6e8eb" strokeOpacity="0.7" />
      {BLIPS.map((b) => (
        <g key={b.origin} style={{ fontFamily: "var(--next-np-mono)" }} fontSize="10">
          <circle cx={b.x} cy={b.y} r={b.act ? 5 : 3} fill={b.act ? "#ffb020" : "#e6e8eb"} />
          {b.act && <circle cx={b.x} cy={b.y} r="10" fill="none" stroke="#ffb020" strokeOpacity="0.5" />}
          <text x={b.x + 9} y={b.y - 7} fill={b.act ? "#ffb020" : "#8b93a1"}>
            {b.origin}
          </text>
        </g>
      ))}
    </svg>
  );
}

const LANES = [
  { origin: "CN", x: 110, y: 70, share: 52 },
  { origin: "VN", x: 124, y: 118, share: 18, recommended: true },
  { origin: "BD", x: 76, y: 100, share: 12 },
  { origin: "KH", x: 138, y: 138, share: 8 },
];
const US = { x: 520, y: 76 };

export function ShippingLanes() {
  return (
    <svg viewBox="0 0 600 200" className="block h-auto w-full" role="img" aria-label="Shipping lanes from Asian origins to the US, line width by share; Vietnam is the recommended lane">
      <defs>
        <pattern id="np-dots" width="12" height="12" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="6" r="0.9" fill="#8b93a1" fillOpacity="0.3" />
        </pattern>
      </defs>
      <rect width="600" height="200" fill="#0e1116" />
      <rect width="600" height="200" fill="url(#np-dots)" />
      {LANES.map((lane) => (
        <path
          key={lane.origin}
          d={`M${lane.x} ${lane.y} Q ${(lane.x + US.x) / 2} ${lane.y - 70} ${US.x} ${US.y}`}
          fill="none"
          stroke={lane.recommended ? "#e6e8eb" : "#8b93a1"}
          strokeOpacity={lane.recommended ? 1 : 0.55}
          strokeWidth={Math.max(1, lane.share / 6)}
          strokeDasharray={lane.recommended ? "6 4" : undefined}
        />
      ))}
      <path d="M470 150 Q 500 120 520 76" fill="none" stroke="#8b93a1" strokeOpacity="0.55" strokeDasharray="2 4" />
      <g style={{ fontFamily: "var(--next-np-mono)" }} fontSize="11">
        {LANES.map((lane) => (
          <g key={lane.origin}>
            <circle cx={lane.x} cy={lane.y} r="3.5" fill="#e6e8eb" />
            <text x={lane.x - 8} y={lane.y + 4} textAnchor="end" fill="#e6e8eb">
              {lane.origin} <tspan fill="#8b93a1">{lane.share}%</tspan>
            </text>
          </g>
        ))}
        <circle cx="470" cy="150" r="3" fill="none" stroke="#8b93a1" />
        <text x="478" y="166" fill="#8b93a1">GT · test</text>
        <circle cx={US.x} cy={US.y} r="5" fill="#e6e8eb" />
        <text x={US.x + 10} y={US.y + 4} fill="#e6e8eb">US</text>
        <text x="20" y="188" fill="#8b93a1" fontSize="10" letterSpacing="1">
          SWEATERS · OWN BRAND SHARE · DASHED = RECOMMENDED SHIFT
        </text>
      </g>
    </svg>
  );
}

/* A container ship at anchor at night: deck lights, lit bridge, reflections. */
export function ShipAtNight() {
  const stacks = Array.from({ length: 13 }, (_, i) => ({ x: 92 + i * 26, h: 3 + ((i * 5) % 3) }));
  const deckLights = [96, 150, 204, 258, 312, 366, 420];

  return (
    <svg viewBox="0 0 600 220" className="block h-auto w-full" role="img" aria-label="A container ship at night with deck lights reflected in the water">
      <defs>
        <linearGradient id="np-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0e1116" />
          <stop offset="1" stopColor="#1d2330" />
        </linearGradient>
        <filter id="np-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.5" />
        </filter>
      </defs>
      <rect width="600" height="150" fill="url(#np-sky)" />
      <rect y="150" width="600" height="70" fill="#0b0d11" />
      {/* Containers on deck */}
      {stacks.map((s) =>
        Array.from({ length: s.h }, (_, row) => (
          <rect key={`${s.x}-${row}`} x={s.x} y={128 - row * 11} width="24" height="10" fill={row % 2 ? "#2a303a" : "#232833"} />
        )),
      )}
      {/* Bridge tower at the stern */}
      <rect x="440" y="70" width="44" height="68" fill="#151920" />
      <rect x="434" y="66" width="56" height="8" fill="#151920" />
      {[82, 96, 110].map((y) => (
        <g key={y} fill="#e6e8eb" fillOpacity="0.8">
          {[446, 456, 466, 476].map((x) => (
            <rect key={x} x={x} y={y} width="5" height="3" />
          ))}
        </g>
      ))}
      {/* Hull */}
      <path d="M60 138 L520 138 L506 162 L82 162 Z" fill="#05070a" />
      {/* Deck lights with glow and reflections */}
      <g fill="#e6e8eb">
        {deckLights.map((x) => (
          <g key={x}>
            <circle cx={x} cy="136" r="5" fillOpacity="0.35" filter="url(#np-glow)" />
            <circle cx={x} cy="136" r="1.4" />
            <rect x={x - 6} y={172 + (x % 3) * 6} width="12" height="1.5" fillOpacity="0.18" />
          </g>
        ))}
      </g>
      <circle cx="462" cy="58" r="1.6" fill="#e6e8eb" />
      <circle cx="462" cy="58" r="6" fill="#e6e8eb" fillOpacity="0.3" filter="url(#np-glow)" />
    </svg>
  );
}

/* ---------- Texture ---------- */

export function Scanlines() {
  return (
    <div
      role="img"
      aria-label="Monitor scanlines with a soft vignette"
      className="h-44 w-full"
      style={{
        backgroundColor: "#171b22",
        backgroundImage:
          "radial-gradient(ellipse at center, transparent 40%, rgb(14 17 22 / 0.85) 100%), repeating-linear-gradient(to bottom, rgb(230 232 235 / 0.07) 0 1px, transparent 1px 3px)",
      }}
    />
  );
}

export function BlueprintGrid() {
  return (
    <div
      role="img"
      aria-label="Dot grid with major grid lines"
      className="h-44 w-full"
      style={{
        backgroundColor: "#0e1116",
        backgroundImage:
          "linear-gradient(to right, #2a303a 1px, transparent 1px), linear-gradient(to bottom, #2a303a 1px, transparent 1px), radial-gradient(circle, rgb(139 147 161 / 0.45) 1px, transparent 1.5px)",
        backgroundSize: "60px 60px, 60px 60px, 12px 12px",
      }}
    />
  );
}

const BOKEH = [
  { x: 40, y: 60, r: 18, o: 0.25 },
  { x: 90, y: 120, r: 26, o: 0.18 },
  { x: 150, y: 50, r: 12, o: 0.4 },
  { x: 200, y: 140, r: 30, o: 0.14 },
  { x: 250, y: 80, r: 16, o: 0.3 },
  { x: 290, y: 150, r: 10, o: 0.45 },
  { x: 120, y: 170, r: 8, o: 0.5 },
  { x: 270, y: 30, r: 22, o: 0.16 },
];

export function Bokeh() {
  return (
    <svg viewBox="0 0 320 200" className="block h-auto w-full" role="img" aria-label="Out-of-focus harbour lights">
      <defs>
        <filter id="np-bokeh" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" />
        </filter>
      </defs>
      <rect width="320" height="200" fill="#0e1116" />
      <g filter="url(#np-bokeh)">
        {BOKEH.map((b) => (
          <circle key={`${b.x}-${b.y}`} cx={b.x} cy={b.y} r={b.r} fill="#e6e8eb" fillOpacity={b.o} />
        ))}
      </g>
    </svg>
  );
}

/* A dot-matrix level meter: lit dots show the own-brand share per origin. */
export function DotMatrix() {
  const levels = [52, 18, 12, 8, 10, 30, 34, 14, 12, 10, 27, 31, 16, 12, 14];
  const rows = 12;
  return (
    <svg viewBox="0 0 320 200" className="block h-auto w-full" role="img" aria-label="Dot-matrix level meter">
      <rect width="320" height="200" fill="#0e1116" />
      {levels.map((level, col) =>
        Array.from({ length: rows }, (_, row) => {
          const lit = rows - row <= Math.round((level / 52) * rows);
          return (
            <circle
              key={`${col}-${row}`}
              cx={22 + col * 19.5}
              cy={20 + row * 14}
              r="4"
              fill={lit ? "#e6e8eb" : "#2a303a"}
              fillOpacity={lit ? 0.9 : 1}
            />
          );
        }),
      )}
    </svg>
  );
}

/* ---------- Interface ---------- */

const STEPS = [
  { label: "Finding matching categories", state: "done" },
  { label: "Building origin tables", state: "done" },
  { label: "Comparing with industry imports", state: "running" },
  { label: "Scanning shipment records for vendors", state: "queued" },
] as const;

export function ToolSteps() {
  return (
    <div className="w-full font-np-body">
      <p className="font-np-label text-xs font-semibold uppercase tracking-wider text-np-steel">
        Generating report · Women’s knit sweaters · US
      </p>
      <div className="mt-3 h-1 w-full bg-np-edge">
        <div className="h-1 w-3/5 bg-np-signal" />
      </div>
      <ol className="mt-4 space-y-2.5 text-[15px]">
        {STEPS.map((step) => (
          <li key={step.label} className="flex items-center gap-3">
            {step.state === "done" && <span className="w-4 text-center font-np-mono text-np-steel">✓</span>}
            {step.state === "running" && (
              <span className="flex w-4 justify-center">
                <span className="h-2.5 w-2.5 rounded-full bg-np-signal motion-safe:animate-pulse" />
              </span>
            )}
            {step.state === "queued" && (
              <span className="flex w-4 justify-center">
                <span className="h-2.5 w-2.5 rounded-full border border-np-steel" />
              </span>
            )}
            <span className={step.state === "done" ? "text-np-steel" : step.state === "queued" ? "text-np-steel" : "text-np-signal"}>
              {step.label}
              {step.state === "running" && "…"}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Buttons() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        className="rounded-[2px] bg-np-amber px-4 py-2 font-np-label text-sm font-semibold uppercase tracking-wider text-np-night hover:bg-[#ffc24d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-np-signal active:translate-y-px"
      >
        Generate report
      </button>
      <button
        type="button"
        className="rounded-[2px] border border-np-edge px-4 py-2 font-np-label text-sm font-semibold uppercase tracking-wider text-np-signal hover:border-np-steel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-np-signal active:translate-y-px"
      >
        Stop
      </button>
      <span className="font-np-mono text-xs text-np-steel underline decoration-np-edge underline-offset-4">Copy session ID</span>
    </div>
  );
}

export function LensTabs() {
  const tabs = ["Own brand", "Retail peers", "Industry"];
  const chips = [
    { label: "CN", on: true },
    { label: "VN", on: true },
    { label: "BD", on: false },
    { label: "KH", on: false },
  ];
  return (
    <div className="w-full">
      <div className="flex border-b border-np-edge font-np-label text-xs font-semibold uppercase tracking-wide whitespace-nowrap">
        {tabs.map((tab, i) => (
          <span
            key={tab}
            className={`-mb-px px-2.5 py-2 ${i === 0 ? "border-b-2 border-np-signal text-np-signal" : "text-np-steel"}`}
          >
            {tab}
          </span>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap gap-2 font-np-mono text-xs">
        {chips.map((chip) => (
          <span
            key={chip.label}
            className={`rounded-[2px] px-2.5 py-1 ${chip.on ? "bg-np-signal text-np-night" : "border border-np-edge text-np-steel"}`}
          >
            {chip.label}
            {chip.on && " ×"}
          </span>
        ))}
      </div>
    </div>
  );
}

export function StatusBadges() {
  const recs = ["Rebalance", "Renegotiate freight", "Add origin"];
  return (
    <div className="flex w-full flex-col gap-3">
      <div className="flex flex-wrap gap-2">
        {recs.map((rec) => (
          <span
            key={rec}
            className="flex items-center gap-1.5 rounded-[2px] border border-np-edge px-2 py-1 font-np-label text-xs font-semibold uppercase tracking-wider"
          >
            <span className="h-1.5 w-1.5 bg-np-signal" />
            {rec}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 font-np-mono text-[11px] uppercase">
        <span className="rounded-[2px] bg-np-signal px-2 py-0.5 text-np-night">Lead</span>
        <span className="rounded-[2px] border border-np-steel px-2 py-0.5 text-np-steel">Current supplier</span>
      </div>
    </div>
  );
}

const MIX_ROWS = [
  { lens: "Own", shares: [52, 18, 12, 8, 10] },
  { lens: "Industry", shares: [27, 31, 16, 12, 14] },
];
const MIX_FILLS = ["#e6e8eb", "#8b93a1", "#5b6372", "#3a414d", "#2a303a"];

export function MixBars() {
  return (
    <div className="w-full">
      <div className="space-y-3">
        {MIX_ROWS.map((row) => (
          <div key={row.lens} className="flex items-center gap-3">
            <span className="w-16 font-np-label text-xs font-semibold uppercase tracking-wider text-np-steel">{row.lens}</span>
            <div className="flex h-5 flex-1 gap-px">
              {row.shares.map((share, i) => (
                <div key={i} style={{ width: `${share}%`, backgroundColor: MIX_FILLS[i] }} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex flex-wrap gap-x-3 gap-y-1 pl-19 font-np-mono text-[11px] text-np-steel">
        {["CN", "VN", "BD", "KH", "Other"].map((origin, i) => (
          <span key={origin} className="flex items-center gap-1">
            <span className="h-2 w-2" style={{ backgroundColor: MIX_FILLS[i] }} />
            {origin}
          </span>
        ))}
      </div>
    </div>
  );
}

const BOARD = [
  { origin: "CN", own: "52", ind: "27", gap: "+25", status: "OVER" },
  { origin: "VN", own: "18", ind: "31", gap: "−13", status: "UNDER" },
  { origin: "BD", own: "12", ind: "16", gap: " −4", status: "UNDER" },
  { origin: "KH", own: " 8", ind: "12", gap: " −4", status: "UNDER" },
];

export function OriginBoard() {
  return (
    <div className="w-full overflow-x-auto bg-black px-4 py-3">
      <table className="w-full font-np-dot text-[17px] leading-8 tracking-wider">
        <thead className="text-np-steel">
          <tr className="text-left">
            <th className="font-normal">ORIGIN</th>
            <th className="text-right font-normal">OWN</th>
            <th className="text-right font-normal">IND</th>
            <th className="text-right font-normal">GAP</th>
            <th className="pl-6 text-left font-normal">STATUS</th>
          </tr>
        </thead>
        <tbody className="text-np-signal">
          {BOARD.map((row) => (
            <tr key={row.origin} className="border-t border-np-edge">
              <td>{row.origin}</td>
              <td className="text-right whitespace-pre">{row.own}</td>
              <td className="text-right">{row.ind}</td>
              <td className="text-right whitespace-pre">{row.gap}</td>
              <td className={`pl-6 ${row.status === "OVER" ? "" : "text-np-steel"}`}>{row.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function KpiTile() {
  return (
    <div className="w-full">
      <p className="font-np-label text-xs font-semibold uppercase tracking-wider text-np-steel">Net margin gap vs peers</p>
      <p className="mt-1 font-np-mono text-5xl font-medium tracking-tight">−410 bps</p>
      <div className="mt-4 space-y-1.5 font-np-mono text-xs">
        <div className="flex items-center gap-2">
          <span className="w-12 text-np-steel">Own</span>
          <div className="h-2 bg-np-signal" style={{ width: `${(3.3 / 7.4) * 70}%` }} />
          <span>3.3%</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-12 text-np-steel">Peers</span>
          <div className="h-2 bg-np-steel" style={{ width: "70%" }} />
          <span>7.4%</span>
        </div>
      </div>
    </div>
  );
}
