import type { Category, CountryRow, Lens, Origin, Vendor } from "@/lib/shiftmap-data";
import { LEAD_CAVEAT, LENSES } from "@/lib/shiftmap-data";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const minus = (n: number) => (n < 0 ? `−${Math.abs(n)}` : `+${n}`);

/* Tag: small caps label in a hairline box; solid ink marks a lead. */
export function Tag({ children, solid }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className={cx(
        "inline-block border px-1.5 py-0.5 font-pp-sans text-[11px] font-semibold uppercase tracking-[0.1em] whitespace-nowrap",
        solid ? "border-pp-ink bg-pp-ink text-pp-salmon" : "border-pp-ink text-pp-ink",
      )}
    >
      {children}
    </span>
  );
}

/* Category as a short article: kicker, headline, standfirst, figures. */
export function ArticleCard({ category, selected }: { category: Category; selected?: boolean }) {
  const { netMargin, freight } = category;
  return (
    <article className={cx("border-t-2 bg-pp-salmon pt-3 pb-4", selected ? "border-pp-ink" : "border-pp-rule group-hover:border-pp-ink")}>
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">
          {category.brandLine} · HTS {category.hts}
        </p>
        <Tag>{category.recommendation}</Tag>
      </div>
      <h3 className="mt-2 font-pp-display text-2xl font-medium leading-tight tracking-tight">{category.name}</h3>
      <p className="mt-1 font-pp-serif text-base italic text-pp-graphite">{category.action}.</p>
      <dl className="mt-3 grid grid-cols-2 gap-4 border-t border-pp-rule pt-2 font-pp-sans text-sm tabular-nums">
        <div>
          <dt className="text-xs text-pp-graphite">Net margin vs peers</dt>
          <dd>
            <span className="font-semibold">{netMargin.own.toFixed(1)}%</span> vs {netMargin.peers.toFixed(1)}% · {minus(netMargin.gapBps)} bps
          </dd>
        </div>
        <div>
          <dt className="text-xs text-pp-graphite">Freight/u vs peers</dt>
          <dd>
            <span className="font-semibold">${freight.own.toFixed(2)}</span> vs ${freight.peers.toFixed(2)}
          </dd>
        </div>
      </dl>
    </article>
  );
}

export function VendorList({ vendors }: { vendors: Vendor[] }) {
  return (
    <div>
      <ul className="divide-y divide-pp-rule border-y border-pp-ink">
        {vendors.map((vendor) => (
          <li key={vendor.name} className="flex items-start justify-between gap-3 py-3">
            <div className="min-w-0">
              <p className="font-pp-display text-lg font-medium leading-tight">{vendor.name}</p>
              <p className="font-pp-sans text-sm tabular-nums text-pp-graphite">
                {vendor.origin} · {vendor.category}
                {vendor.shipments && ` · ${vendor.shipments}`}
              </p>
            </div>
            <Tag solid={vendor.status === "Lead"}>{vendor.status === "Lead" ? "Lead" : "Current"}</Tag>
          </li>
        ))}
      </ul>
      {vendors.some((v) => v.status === "Lead") && <p className="mt-2 font-pp-serif text-sm italic text-pp-graphite">{LEAD_CAVEAT}</p>}
    </div>
  );
}

export function CountryTable({ rows }: { rows: CountryRow[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] border-t-2 border-pp-ink font-pp-sans text-[15px] tabular-nums">
        <thead>
          <tr className="border-b border-pp-ink text-xs uppercase tracking-[0.1em] text-pp-graphite">
            <th className="py-2 pr-3 text-left font-semibold">Origin</th>
            <th className="px-3 py-2 text-right font-semibold">Share</th>
            <th className="px-3 py-2 text-right font-semibold">Units</th>
            <th className="px-3 py-2 text-right font-semibold">Freight/u</th>
            <th className="px-3 py-2 text-right font-semibold">Peers</th>
            <th className="py-2 pl-3 text-right font-semibold">Net margin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-pp-rule">
          {rows.map((row) => (
            <tr key={row.origin} className={row.origin === "CN" ? "font-semibold" : undefined}>
              <td className="py-2 pr-3">{row.origin}</td>
              <td className="px-3 py-2 text-right">{row.share}%</td>
              <td className="px-3 py-2 text-right">{row.units}</td>
              <td className="px-3 py-2 text-right">${row.freightOwn.toFixed(2)}</td>
              <td className="px-3 py-2 text-right font-normal text-pp-graphite">{row.freightPeers ? `$${row.freightPeers.toFixed(2)}` : "—"}</td>
              <td className="py-2 pl-3 text-right">{row.netMargin.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-2 font-pp-serif text-sm italic text-pp-graphite">China carries half the volume at the thinnest margin.</p>
    </div>
  );
}

/* Origin mix as a ruled horizontal bar per lens, inks graded dark to light. */
const INKS = ["#262a33", "#4a4e57", "#66605a", "#9c8f83", "#dcc5b2", "#efe0d2"];

export function MixBar({ mix, lenses = ["own", "peers", "industry"] }: { mix: Record<Lens, Partial<Record<Origin, number>>>; lenses?: Lens[] }) {
  const origins = Array.from(new Set(lenses.flatMap((lens) => Object.keys(mix[lens])))) as Origin[];
  const fill = (origin: Origin) => INKS[origins.indexOf(origin) % INKS.length];
  return (
    <div>
      <div className="space-y-3">
        {lenses.map((lens) => (
          <div key={lens} className="grid grid-cols-[7rem_1fr] items-center gap-3">
            <p className="font-pp-sans text-sm text-pp-graphite">{LENSES.find((l) => l.id === lens)?.label}</p>
            <div className="flex h-6" role="img" aria-label={Object.entries(mix[lens]).map(([o, s]) => `${o} ${s}%`).join(", ")}>
              {Object.entries(mix[lens]).map(([origin, share], i) => (
                <div
                  key={origin}
                  className="flex items-center border-r border-pp-salmon pl-1.5 font-pp-sans text-xs font-semibold tabular-nums last:border-r-0"
                  style={{ width: `${share}%`, backgroundColor: fill(origin as Origin), color: i < 3 ? "#fff1e5" : "#262a33" }}
                >
                  {share! >= 15 && `${origin} ${share}`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-pp-sans text-sm">
        {origins.map((origin) => (
          <li key={origin} className="flex items-center gap-1.5">
            <span className="size-3" style={{ backgroundColor: fill(origin) }} />
            {origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export type StepState = "done" | "running" | "failed" | "queued";

export function Progress({ steps }: { steps: { label: string; state: StepState }[] }) {
  const done = steps.filter((s) => s.state === "done").length;
  return (
    <div>
      <div className="h-0.5 w-full bg-pp-rule">
        <div className="h-0.5 bg-pp-ink transition-[width]" style={{ width: `${(done / steps.length) * 100}%` }} />
      </div>
      <ol className="mt-3 space-y-1.5 font-pp-serif text-base">
        {steps.map((step, i) => (
          <li key={step.label} className="flex gap-3">
            <span className="w-5 font-pp-sans text-sm tabular-nums text-pp-graphite">{step.state === "done" ? "✓" : i + 1}</span>
            <span className={cx(step.state === "queued" && "text-pp-graphite", step.state === "running" && "italic", step.state === "done" && "text-pp-graphite")}>
              {step.label}
              {step.state === "running" && "…"}
              {step.state === "failed" && " — not loaded"}
              <span className="sr-only"> ({step.state})</span>
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

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
  const kicker = { empty: "Nothing yet", loading: "In progress", error: "Not loaded", success: "Ready" }[tone];
  return (
    <div
      role={tone === "error" ? "alert" : tone === "loading" ? "status" : undefined}
      className={cx(
        "flex h-full flex-col items-start gap-2 p-5",
        tone === "empty" && "border border-dashed border-pp-graphite",
        tone === "loading" && "bg-pp-tint",
        tone === "error" && "border-l-4 border-pp-ink bg-pp-tint",
        tone === "success" && "border-t-4 border-double border-pp-ink",
      )}
    >
      <p className="font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">
        {tone === "success" && "✓ "}
        {tone === "error" && "! "}
        {kicker}
      </p>
      <p className="font-pp-display text-xl font-medium leading-tight">{title}</p>
      {children && <div className="w-full font-pp-serif text-base text-pp-graphite">{children}</div>}
      {action && <div className="mt-1">{action}</div>}
    </div>
  );
}
