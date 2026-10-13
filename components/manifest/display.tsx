import type { Category, CountryRow, Lens, Origin, Vendor } from "@/lib/shiftmap-data";
import { LEAD_CAVEAT, LENSES } from "@/lib/shiftmap-data";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* Rough inked edge for stamps. Render once per page. */
export function InkFilters() {
  return (
    <svg aria-hidden className="absolute h-0 w-0">
      <filter id="mf-ink">
        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="2" seed="4" result="noise" />
        <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.5" />
      </filter>
    </svg>
  );
}

/* ---------- Stamp (badge) ---------- */

export function Stamp({
  children,
  tone = "red",
  size = "sm",
  tilt = 0,
}: {
  children: React.ReactNode;
  tone?: "red" | "ink";
  size?: "sm" | "lg";
  tilt?: number;
}) {
  return (
    <span
      className={cx(
        "inline-block font-mf-stencil uppercase whitespace-nowrap",
        tone === "red" ? "border-mf-stamp text-mf-stamp" : "border-mf-ink text-mf-ink",
        size === "lg" ? "border-[5px] border-double px-3 py-0.5 text-2xl tracking-wider" : "border-2 px-1.5 py-px text-[11px] leading-4 tracking-widest",
      )}
      style={{ transform: tilt ? `rotate(${tilt}deg)` : undefined, filter: "url(#mf-ink)" }}
    >
      {children}
    </span>
  );
}

/* ---------- Category card ---------- */

export function CategoryCard({ category, selected }: { category: Category; selected?: boolean }) {
  const { netMargin, freight } = category;
  return (
    <div
      className={cx(
        "border bg-mf-paper p-4 text-left",
        selected ? "border-mf-ink shadow-[inset_0_0_0_1px_var(--color-mf-ink)]" : "border-mf-rule",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">
            {category.brandLine} · HTS {category.hts}
          </p>
          <h3 className="mt-1 font-mf-condensed text-xl font-semibold leading-tight">{category.name}</h3>
        </div>
        <Stamp tilt={-3}>{category.recommendation}</Stamp>
      </div>
      <dl className="mt-4 grid grid-cols-2 border-t border-l border-mf-ink font-mf-mono text-sm tabular-nums">
        <div className="border-r border-b border-mf-ink p-2">
          <dt className="text-[10px] uppercase tracking-wider text-mf-umber">Net margin vs peers</dt>
          <dd className="mt-0.5">
            <span className="font-semibold">{netMargin.own}%</span> vs {netMargin.peers}%
          </dd>
        </div>
        <div className="border-r border-b border-mf-ink p-2">
          <dt className="text-[10px] uppercase tracking-wider text-mf-umber">Freight/u vs peers</dt>
          <dd className="mt-0.5">
            <span className="font-semibold">${freight.own.toFixed(2)}</span> vs ${freight.peers.toFixed(2)}
          </dd>
        </div>
      </dl>
      <p className="mt-3 font-mf-condensed text-sm">
        <span className="font-mf-mono font-semibold tabular-nums">{netMargin.gapBps} bps</span> · {category.action}
      </p>
    </div>
  );
}

/* ---------- Vendor list rows ---------- */

export function VendorRows({ vendors }: { vendors: Vendor[] }) {
  const hasLeads = vendors.some((v) => v.status === "Lead");
  return (
    <div className="border border-mf-rule bg-mf-paper">
      <ul className="divide-y divide-mf-rule">
        {vendors.map((vendor) => (
          <li key={vendor.name} className="flex items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <p className="font-mf-condensed font-semibold">{vendor.name}</p>
              <p className="font-mf-mono text-xs text-mf-umber">
                {vendor.origin} · {vendor.category}
                {vendor.shipments && ` · ${vendor.shipments}`}
              </p>
            </div>
            {vendor.status === "Lead" ? <Stamp tilt={-3}>Lead</Stamp> : <Stamp tone="ink">Current</Stamp>}
          </li>
        ))}
      </ul>
      {hasLeads && (
        <p className="border-t border-dashed border-mf-umber px-4 py-2 font-mf-condensed text-xs text-mf-umber">{LEAD_CAVEAT}</p>
      )}
    </div>
  );
}

/* ---------- Data table: sweaters by country ---------- */

export function CountryTable({ rows }: { rows: CountryRow[] }) {
  return (
    <div className="overflow-x-auto border border-mf-rule bg-mf-paper">
      <table className="w-full min-w-[34rem] font-mf-mono text-sm tabular-nums">
        <thead>
          <tr className="border-b-2 border-mf-ink text-left text-[10px] uppercase tracking-wider text-mf-umber">
            <th className="sticky left-0 bg-mf-paper px-3 py-2 font-medium">Origin</th>
            <th className="px-3 py-2 text-right font-medium">Share</th>
            <th className="px-3 py-2 text-right font-medium">Units</th>
            <th className="px-3 py-2 text-right font-medium">Freight/u</th>
            <th className="px-3 py-2 text-right font-medium">vs peers</th>
            <th className="px-3 py-2 text-right font-medium">Net margin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-mf-rule">
          {rows.map((row) => (
            <tr key={row.origin}>
              <td className="sticky left-0 bg-mf-paper px-3 py-2 font-semibold">{row.origin}</td>
              <td className="px-3 py-2 text-right">{row.share}%</td>
              <td className="px-3 py-2 text-right">{row.units}</td>
              <td className="px-3 py-2 text-right">${row.freightOwn.toFixed(2)}</td>
              <td className="px-3 py-2 text-right text-mf-umber">
                {row.freightPeers ? `$${row.freightPeers.toFixed(2)}` : "—"}
              </td>
              <td className="px-3 py-2 text-right">{row.netMargin.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- Origin mix bar ---------- */

export const ORIGIN_FILL: Record<Origin, React.CSSProperties> = {
  CN: { backgroundColor: "#1f2a44", color: "#fbf8f1" },
  VN: { backgroundColor: "#fbf8f1", backgroundImage: "repeating-linear-gradient(45deg, #1f2a44 0 2px, transparent 2px 6px)" },
  BD: { backgroundColor: "#6b6455", color: "#fbf8f1" },
  KH: { backgroundColor: "#cbbf9f", color: "#1f2a44" },
  ID: { backgroundColor: "#fbf8f1", backgroundImage: "radial-gradient(#1f2a44 1px, transparent 1.5px)", backgroundSize: "5px 5px" },
  IN: { backgroundColor: "#fbf8f1", backgroundImage: "repeating-linear-gradient(90deg, #6b6455 0 2px, transparent 2px 5px)" },
  GT: { backgroundColor: "#fbf8f1", backgroundImage: "repeating-linear-gradient(-45deg, #6b6455 0 2px, transparent 2px 6px)" },
  Other: { backgroundColor: "#fbf8f1", color: "#6b6455" },
};

export function MixBar({ mix, lenses = ["own", "peers", "industry"] }: { mix: Record<Lens, Partial<Record<Origin, number>>>; lenses?: Lens[] }) {
  const origins = Array.from(new Set(lenses.flatMap((lens) => Object.keys(mix[lens])))) as Origin[];
  return (
    <div>
      <div className="space-y-3">
        {lenses.map((lens) => (
          <div key={lens}>
            <p className="mb-1 font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">
              {LENSES.find((l) => l.id === lens)?.label}
            </p>
            <div className="flex h-7 border border-mf-ink" role="img" aria-label={Object.entries(mix[lens]).map(([o, s]) => `${o} ${s}%`).join(", ")}>
              {Object.entries(mix[lens]).map(([origin, share]) => (
                <div
                  key={origin}
                  className="flex items-center justify-center border-r border-mf-ink font-mf-mono text-[11px] last:border-r-0"
                  style={{ width: `${share}%`, ...ORIGIN_FILL[origin as Origin] }}
                >
                  {share! >= 15 && (
                    <span className={cx("whitespace-nowrap", !ORIGIN_FILL[origin as Origin].color && "bg-mf-paper px-0.5")}>
                      {origin} {share}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-mf-mono text-[11px]">
        {origins.map((origin) => (
          <li key={origin} className="flex items-center gap-1">
            <span className="size-3 border border-mf-ink" style={ORIGIN_FILL[origin]} />
            {origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Tool steps (report progress) ---------- */

export type StepState = "done" | "running" | "failed" | "queued";

export function ToolSteps({ steps }: { steps: { label: string; state: StepState }[] }) {
  const mark: Record<StepState, string> = { done: "✓", running: "", failed: "!", queued: "" };
  return (
    <ol className="space-y-2">
      {steps.map((step) => (
        <li key={step.label} className="flex items-center gap-2.5 font-mf-condensed">
          <span
            aria-hidden
            className={cx(
              "flex size-5 shrink-0 items-center justify-center border font-mf-mono text-xs",
              step.state === "done" && "border-mf-ink bg-mf-ink text-mf-paper",
              step.state === "running" && "border-mf-ink",
              step.state === "failed" && "border-mf-stamp text-mf-stamp",
              step.state === "queued" && "border-mf-rule",
            )}
          >
            {step.state === "running" ? <span className="size-2 bg-mf-ink motion-safe:animate-pulse" /> : mark[step.state]}
          </span>
          <span className={cx(step.state === "queued" && "text-mf-umber", step.state === "failed" && "text-mf-stamp")}>
            {step.label}
            {step.state === "running" && "…"}
            <span className="sr-only"> ({step.state})</span>
          </span>
        </li>
      ))}
    </ol>
  );
}

/* ---------- UI state notices ---------- */

export function Notice({
  tone,
  title,
  children,
  action,
}: {
  tone: "empty" | "loading" | "error" | "success";
  title: string;
  children?: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <div
      role={tone === "error" ? "alert" : tone === "loading" ? "status" : undefined}
      className={cx(
        "flex h-full flex-col items-start gap-3 bg-mf-paper p-5",
        tone === "empty" && "border border-dashed border-mf-umber",
        tone === "loading" && "border border-mf-rule",
        tone === "error" && "border-2 border-mf-stamp",
        tone === "success" && "border-2 border-mf-ink",
      )}
    >
      {tone === "error" && <Stamp>Not loaded</Stamp>}
      {tone === "success" && <Stamp tone="ink">Ready</Stamp>}
      <p className="font-mf-condensed text-lg font-semibold leading-tight">{title}</p>
      {children && <div className="font-mf-condensed text-sm text-mf-umber">{children}</div>}
      {action}
    </div>
  );
}
