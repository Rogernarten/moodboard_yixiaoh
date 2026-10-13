import type { Category, CountryRow, Lens, Origin, Vendor } from "@/lib/shiftmap-data";
import { LEAD_CAVEAT, LENSES } from "@/lib/shiftmap-data";

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

const minus = (n: number) => (n < 0 ? `−${Math.abs(n)}` : `+${n}`);

/* Badge: a status light and a mono label; solid signal marks a lead. */
export function Badge({ children, solid }: { children: React.ReactNode; solid?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-[2px] border px-2 py-0.5 font-np-mono text-[11px] uppercase whitespace-nowrap",
        solid ? "border-np-signal bg-np-signal text-np-night" : "border-np-steel text-np-signal",
      )}
    >
      {!solid && <span aria-hidden className="size-1.5 bg-np-signal" />}
      {children}
    </span>
  );
}

/* A channel bar, the label strip on top of every monitor panel. */
export function ChannelBar({ left, right }: { left: React.ReactNode; right?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-np-edge px-3 py-1.5 font-np-mono text-[10px] uppercase tracking-wider text-np-steel">
      <span className="truncate">{left}</span>
      {right}
    </div>
  );
}

export function PanelCard({ category, selected }: { category: Category; selected?: boolean }) {
  const { netMargin, freight } = category;
  return (
    <div className={cx("rounded-[2px] border bg-np-panel text-left", selected ? "border-np-signal" : "border-np-edge group-hover:border-np-steel")}>
      <ChannelBar left={`${category.brandLine} · HTS ${category.hts}`} right={<Badge>{category.recommendation}</Badge>} />
      <div className="p-4">
        <p className="font-np-body text-lg font-semibold leading-tight">{category.name}</p>
        <p className="mt-3 font-np-mono text-3xl font-medium tracking-tight">{minus(netMargin.gapBps)} bps</p>
        <p className="font-np-mono text-[11px] uppercase tracking-wider text-np-steel">Net margin vs peers</p>
        <dl className="mt-3 grid grid-cols-2 gap-3 border-t border-np-edge pt-3 font-np-mono text-xs tabular-nums">
          <div>
            <dt className="text-np-steel">Own / peers</dt>
            <dd>
              {netMargin.own.toFixed(1)}% / {netMargin.peers.toFixed(1)}%
            </dd>
          </div>
          <div>
            <dt className="text-np-steel">Freight/u</dt>
            <dd>
              ${freight.own.toFixed(2)} / ${freight.peers.toFixed(2)}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

export function VendorRows({ vendors }: { vendors: Vendor[] }) {
  return (
    <div className="rounded-[2px] border border-np-edge bg-np-panel">
      <ul className="divide-y divide-np-edge">
        {vendors.map((vendor) => (
          <li key={vendor.name} className="flex items-center justify-between gap-3 px-4 py-2.5">
            <div className="min-w-0">
              <p className="font-np-body font-semibold">{vendor.name}</p>
              <p className="font-np-mono text-xs text-np-steel">
                {vendor.origin} · {vendor.category}
                {vendor.shipments && ` · ${vendor.shipments}`}
              </p>
            </div>
            <Badge solid={vendor.status === "Lead"}>{vendor.status === "Lead" ? "Lead" : "Current"}</Badge>
          </li>
        ))}
      </ul>
      {vendors.some((v) => v.status === "Lead") && (
        <p className="border-t border-np-edge px-4 py-2 font-np-mono text-[11px] text-np-steel">{LEAD_CAVEAT}</p>
      )}
    </div>
  );
}

export function CountryTable({ rows }: { rows: CountryRow[] }) {
  return (
    <div className="overflow-x-auto rounded-[2px] border border-np-edge bg-np-panel">
      <table className="w-full min-w-[34rem] font-np-mono text-sm tabular-nums">
        <thead>
          <tr className="border-b border-np-steel text-left text-[10px] uppercase tracking-wider text-np-steel">
            <th className="sticky left-0 bg-np-panel px-3 py-2 font-normal">Origin</th>
            <th className="px-3 py-2 text-right font-normal">Share</th>
            <th className="px-3 py-2 text-right font-normal">Units</th>
            <th className="px-3 py-2 text-right font-normal">Freight/u</th>
            <th className="px-3 py-2 text-right font-normal">Peers</th>
            <th className="px-3 py-2 text-right font-normal">Net margin</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-np-edge">
          {rows.map((row) => (
            <tr key={row.origin}>
              <td className="sticky left-0 bg-np-panel px-3 py-2">{row.origin}</td>
              <td className="px-3 py-2 text-right">{row.share}%</td>
              <td className="px-3 py-2 text-right">{row.units}</td>
              <td className="px-3 py-2 text-right">${row.freightOwn.toFixed(2)}</td>
              <td className="px-3 py-2 text-right text-np-steel">{row.freightPeers ? `$${row.freightPeers.toFixed(2)}` : "—"}</td>
              <td className="px-3 py-2 text-right">{row.netMargin.toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const FILLS = ["#e6e8eb", "#8b93a1", "#5b6372", "#3a414d", "#2a303a", "#20252e"];

export function MixBar({ mix, lenses = ["own", "peers", "industry"] }: { mix: Record<Lens, Partial<Record<Origin, number>>>; lenses?: Lens[] }) {
  const origins = Array.from(new Set(lenses.flatMap((lens) => Object.keys(mix[lens])))) as Origin[];
  const fill = (origin: Origin) => FILLS[origins.indexOf(origin) % FILLS.length];
  return (
    <div>
      <div className="space-y-3">
        {lenses.map((lens) => (
          <div key={lens} className="grid grid-cols-[6.5rem_1fr] items-center gap-3">
            <span className="font-np-mono text-[11px] uppercase tracking-wider text-np-steel">{LENSES.find((l) => l.id === lens)?.label}</span>
            <div className="flex h-6 gap-px" role="img" aria-label={Object.entries(mix[lens]).map(([o, s]) => `${o} ${s}%`).join(", ")}>
              {Object.entries(mix[lens]).map(([origin, share], i) => (
                <div
                  key={origin}
                  className="flex items-center pl-1.5 font-np-mono text-[11px]"
                  style={{ width: `${share}%`, backgroundColor: fill(origin as Origin), color: i <= 1 ? "#0e1116" : "#e6e8eb" }}
                >
                  {share! >= 15 && `${origin} ${share}`}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-3 gap-y-1 font-np-mono text-[11px] text-np-steel">
        {origins.map((origin) => (
          <li key={origin} className="flex items-center gap-1">
            <span className="size-2 border border-np-steel" style={{ backgroundColor: fill(origin) }} />
            {origin}
          </li>
        ))}
      </ul>
    </div>
  );
}

export type StepState = "done" | "running" | "failed" | "queued";

export function ToolSteps({ steps }: { steps: { label: string; state: StepState }[] }) {
  const done = steps.filter((s) => s.state === "done").length;
  return (
    <div>
      <div className="h-1 w-full bg-np-edge">
        <div className="h-1 bg-np-signal transition-[width]" style={{ width: `${(done / steps.length) * 100}%` }} />
      </div>
      <ol className="mt-3 space-y-2 font-np-body">
        {steps.map((step) => (
          <li key={step.label} className="flex items-center gap-3">
            <span aria-hidden className="flex w-4 justify-center font-np-mono text-xs">
              {step.state === "done" && <span className="text-np-steel">✓</span>}
              {step.state === "running" && <span className="size-2.5 rounded-full bg-np-signal motion-safe:animate-pulse" />}
              {step.state === "queued" && <span className="size-2.5 rounded-full border border-np-steel" />}
              {step.state === "failed" && <span className="font-semibold">!</span>}
            </span>
            <span className={cx(step.state === "running" ? "text-np-signal" : "text-np-steel")}>
              {step.label}
              {step.state === "running" && "…"}
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
  const status = { empty: "No signal", loading: "Running", error: "Fault", success: "Ready" }[tone];
  return (
    <div
      role={tone === "error" ? "alert" : tone === "loading" ? "status" : undefined}
      className={cx(
        "flex h-full flex-col rounded-[2px] bg-np-panel",
        tone === "empty" && "border border-dashed border-np-steel",
        tone === "loading" && "border border-np-edge",
        tone === "error" && "border-2 border-np-signal",
        tone === "success" && "border border-np-steel",
      )}
    >
      <ChannelBar
        left={
          <span className="flex items-center gap-2">
            {tone === "error" && <span className="flex size-3.5 items-center justify-center bg-np-signal text-[9px] font-bold text-np-night">!</span>}
            {tone === "success" && <span className="text-np-signal">✓</span>}
            {tone === "loading" && <span className="size-2 rounded-full bg-np-signal motion-safe:animate-pulse" />}
            {tone === "empty" && <span className="size-2 rounded-full border border-np-steel" />}
            {status}
          </span>
        }
      />
      <div className="flex flex-1 flex-col items-start gap-2 p-4">
        <p className="font-np-display text-xl font-semibold uppercase leading-tight tracking-wide">{title}</p>
        {children && <div className="w-full font-np-body text-sm text-np-steel">{children}</div>}
        {action && <div className="mt-1">{action}</div>}
      </div>
    </div>
  );
}
