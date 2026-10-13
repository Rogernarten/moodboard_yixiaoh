"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button, Chip, DetailPanel, Tabs, TextField } from "@/components/manifest/controls";
import { CategoryCard, MixBar, Notice, Stamp, ToolSteps, VendorRows, type StepState } from "@/components/manifest/display";
import {
  BRAND_LINES,
  CATEGORIES,
  FICTION_NOTE,
  LEAD_CAVEAT,
  LENSES,
  ORIGIN_NAMES,
  PERIOD,
  SWEATER_COUNTRIES,
  TOOL_STEPS,
  VENDORS,
  type Category,
  type Lens,
  type Origin,
} from "@/lib/shiftmap-data";
import { HEADLINES, SUMMARIES, VENDOR_MATCH } from "./copy";

type Phase = "idle" | "running" | "done";
const STEP_MS = 700;

const LABEL = "font-mf-mono text-[11px] font-medium uppercase tracking-wider text-mf-umber";
const H2 = "font-mf-condensed text-xl font-semibold leading-tight";

function signed(n: number) {
  return n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0";
}

/* Origins for a category, own-brand share first, Other last. */
function originRows(category: Category) {
  const origins = Array.from(
    new Set(LENSES.flatMap((lens) => Object.keys(category.mix[lens.id]))),
  ) as Origin[];
  return origins
    .map((origin) => {
      const own = category.mix.own[origin] ?? 0;
      const peers = category.mix.peers[origin] ?? 0;
      const industry = category.mix.industry[origin] ?? 0;
      return { origin, own, peers, industry, gap: own - industry };
    })
    .sort((a, b) => (a.origin === "Other" ? 1 : b.origin === "Other" ? -1 : b.own - a.own || b.industry - a.industry));
}

function afterShift(origin: Origin) {
  const share = SWEATER_COUNTRIES.find((c) => c.origin === origin)?.afterShift;
  return share === undefined ? "—" : `${share}%`;
}

function categoryVendors(category: Category) {
  return VENDORS.filter((v) => VENDOR_MATCH[category.id].test(v.category));
}

export function ShiftmapApp() {
  const [lines, setLines] = useState<string[]>([]);
  const [categoryId, setCategoryId] = useState("sweaters");
  const [lens, setLens] = useState<Lens>("own");
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [origin, setOrigin] = useState<Origin | null>(null);
  const [query, setQuery] = useState("");
  const reportRef = useRef<HTMLElement>(null);

  const visible = lines.length ? CATEGORIES.filter((c) => lines.includes(c.brandLine)) : CATEGORIES;
  const category = CATEGORIES.find((c) => c.id === categoryId) ?? CATEGORIES[0];
  const headline = HEADLINES[category.id];

  // Fake report generation: one tool step every STEP_MS, then the report.
  useEffect(() => {
    if (phase !== "running") return;
    const timer = setTimeout(
      () => (step >= TOOL_STEPS.length - 1 ? setPhase("done") : setStep(step + 1)),
      STEP_MS,
    );
    return () => clearTimeout(timer);
  }, [phase, step]);

  function selectCategory(id: string) {
    setCategoryId(id);
    setPhase("idle");
    setStep(0);
    setQuery("");
  }

  function toggleLine(line: string | null) {
    const next = line === null ? [] : lines.includes(line) ? lines.filter((l) => l !== line) : [...lines, line];
    setLines(next);
    const nextVisible = next.length ? CATEGORIES.filter((c) => next.includes(c.brandLine)) : CATEGORIES;
    if (!nextVisible.some((c) => c.id === categoryId)) selectCategory(nextVisible[0].id);
  }

  function generate() {
    setStep(0);
    setPhase("running");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    reportRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "nearest" });
  }

  const steps = TOOL_STEPS.map((label, i) => ({
    label,
    state: (i < step ? "done" : i === step ? "running" : "queued") as StepState,
  }));

  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b-2 border-mf-ink py-4">
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-mf-stencil text-3xl font-bold uppercase leading-none">Shiftmap</p>
          <p className={LABEL}>Northfold own brand · US · {PERIOD}</p>
        </div>
        <Link
          href="/"
          className="font-mf-mono text-xs uppercase tracking-wider underline decoration-mf-rule underline-offset-4 hover:decoration-mf-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mf-ink"
        >
          ← Hub
        </Link>
      </header>

      <div className="grid grid-cols-1 gap-8 py-8 lg:grid-cols-[19rem_minmax(0,1fr)]">
        {/* Scope */}
        <aside aria-label="Scope" className="min-w-0 space-y-6">
          <div>
            <p className={`mb-2 ${LABEL}`}>Brand line</p>
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:-mx-8 sm:px-8 lg:mx-0 lg:flex-wrap lg:px-0">
              <Chip selected={lines.length === 0} onClick={() => toggleLine(null)}>
                All
              </Chip>
              {BRAND_LINES.map((line) => (
                <Chip key={line} selected={lines.includes(line)} onClick={() => toggleLine(line)}>
                  {line.replace("Northfold ", "")}
                </Chip>
              ))}
            </div>
          </div>
          <div>
            <p className={`mb-2 ${LABEL}`}>
              Category · {visible.length} of {CATEGORIES.length}
            </p>
            <ul className="-mx-5 flex snap-x scroll-px-5 gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:flex-col lg:overflow-visible lg:px-0">
              {visible.map((c) => (
                <li key={c.id} className="w-[16rem] shrink-0 snap-start lg:w-auto">
                  <button
                    type="button"
                    aria-pressed={c.id === categoryId}
                    aria-label={`${c.name}: ${c.recommendation}, ${c.netMargin.gapBps} bps net margin vs peers`}
                    onClick={() => selectCategory(c.id)}
                    className="group block w-full cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink active:translate-y-px"
                  >
                    <CategoryCard category={c} selected={c.id === categoryId} compact />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <div className="min-w-0 space-y-10">
          {/* Summary: the first thing to read */}
          <section aria-labelledby="category-title" className="border border-mf-rule bg-mf-paper p-5 sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className={LABEL}>
                  {category.brandLine} · HTS {category.hts} · {category.sales} sales · {category.units} units
                </p>
                <h1 id="category-title" className="mt-1 font-mf-condensed text-2xl font-semibold leading-tight">
                  {category.name}
                </h1>
              </div>
              <Stamp size="lg" tilt={-4}>
                {category.recommendation}
              </Stamp>
            </div>
            <p className="mt-6 font-mf-stencil text-[40px] font-bold leading-none sm:text-[56px]">{headline.figure}</p>
            <p className="mt-2 font-mf-condensed text-mf-umber">{headline.caption}</p>
            <dl className="mt-6 grid grid-cols-1 border-t border-l border-mf-ink font-mf-mono text-sm tabular-nums sm:grid-cols-3">
              {[
                ["Action", category.action],
                ["Net margin vs peers", `${category.netMargin.own.toFixed(1)}% vs ${category.netMargin.peers.toFixed(1)}% · ${signed(category.netMargin.gapBps)} bps`],
                ["Freight/u vs peers", `$${category.freight.own.toFixed(2)} vs $${category.freight.peers.toFixed(2)}`],
              ].map(([label, value]) => (
                <div key={label} className="border-r border-b border-mf-ink p-3">
                  <dt className="text-[10px] uppercase tracking-wider text-mf-umber">{label}</dt>
                  <dd className="mt-0.5">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              <Button onClick={generate} disabled={phase === "running"}>
                {phase === "running" ? "Generating…" : phase === "done" ? "Regenerate report" : "Generate report"}
              </Button>
              <p className="font-mf-condensed text-sm text-mf-umber">
                {phase === "done" ? "Report below reflects the latest run." : "Builds the country diagnosis and vendor list."}
              </p>
            </div>
          </section>

          {/* Landscape by lens */}
          <section aria-labelledby="mix-title">
            <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
              <h2 id="mix-title" className={H2}>
                Where it’s made
              </h2>
              <p className={LABEL}>Share of units by origin</p>
            </div>
            <Tabs label="Lens" items={LENSES} value={lens} onChange={setLens} />
            <div role="tabpanel" aria-label={LENSES.find((l) => l.id === lens)?.label} className="border-x border-b border-mf-ink bg-mf-paper p-4">
              <MixBar mix={category.mix} lenses={[lens]} />
            </div>
          </section>

          {/* Report */}
          <section ref={reportRef} aria-labelledby="report-title" className="scroll-mt-6">
            <h2 id="report-title" className={`mb-3 ${H2}`}>
              Report
            </h2>
            <div aria-live="polite">
              {phase === "idle" && (
                <Notice tone="empty" title="No report yet">
                  Generate the report to see the country diagnosis and the vendors to call.
                </Notice>
              )}
              {phase === "running" && (
                <Notice tone="loading" title={`${TOOL_STEPS[step]}…`}>
                  <ToolSteps steps={steps} />
                </Notice>
              )}
              {phase === "done" && <Report category={category} onOpenOrigin={setOrigin} query={query} onQuery={setQuery} />}
            </div>
          </section>
        </div>
      </div>

      <footer className="border-t border-mf-rule py-4 font-mf-mono text-xs text-mf-umber">{FICTION_NOTE}</footer>

      <DetailPanel
        open={origin !== null}
        onClose={() => setOrigin(null)}
        eyebrow={`${category.name} · ${category.brandLine}`}
        title={origin === "Other" ? "Other origins" : origin ? `${origin} · ${ORIGIN_NAMES[origin]}` : ""}
      >
        {origin && <OriginDetail category={category} origin={origin} />}
      </DetailPanel>
    </div>
  );
}

function Report({
  category,
  onOpenOrigin,
  query,
  onQuery,
}: {
  category: Category;
  onOpenOrigin: (origin: Origin) => void;
  query: string;
  onQuery: (query: string) => void;
}) {
  const rows = originRows(category);
  const isSweaters = category.id === "sweaters";
  const vendors = categoryVendors(category);
  const q = query.trim().toLowerCase();
  const matches = q ? vendors.filter((v) => v.name.toLowerCase().includes(q) || v.origin.toLowerCase() === q) : vendors;
  const maxGap = Math.max(...rows.map((r) => r.gap));

  return (
    <div className="space-y-8">
      <div role="status" className="flex flex-wrap items-center gap-3 border-2 border-mf-ink bg-mf-paper px-4 py-3">
        <Stamp tone="ink">Ready</Stamp>
        <p className="font-mf-condensed font-semibold">
          Report ready · {category.name} · US · {PERIOD}
        </p>
      </div>

      <div>
        <h3 className={`mb-2 ${LABEL}`}>Summary</h3>
        <ol className="space-y-2 font-mf-condensed text-base leading-6">
          {SUMMARIES[category.id].map((line, i) => (
            <li key={line} className="flex gap-3">
              <span className="font-mf-mono text-sm text-mf-umber">{i + 1}</span>
              <span>{line}</span>
            </li>
          ))}
        </ol>
      </div>

      <div>
        <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
          <h3 className={LABEL}>Origins vs industry imports</h3>
          <p className="font-mf-condensed text-sm text-mf-umber">Select an origin for its detail.</p>
        </div>
        <div className="overflow-x-auto border border-mf-rule bg-mf-paper">
          <table className="w-full min-w-[36rem] font-mf-mono text-sm tabular-nums">
            <thead>
              <tr className="border-b-2 border-mf-ink text-left text-[10px] uppercase tracking-wider text-mf-umber">
                <th className="sticky left-0 bg-mf-paper px-3 py-2 font-medium">Origin</th>
                <th className="px-3 py-2 text-right font-medium">Own</th>
                <th className="px-3 py-2 text-right font-medium">Peers</th>
                <th className="px-3 py-2 text-right font-medium">Industry</th>
                <th className="px-3 py-2 text-right font-medium">Gap</th>
                {isSweaters && <th className="px-3 py-2 text-right font-medium">After shift</th>}
              </tr>
            </thead>
            <tbody className="divide-y divide-mf-rule">
              {rows.map((row) => (
                <tr
                  key={row.origin}
                  onClick={() => onOpenOrigin(row.origin)}
                  className={`group cursor-pointer hover:bg-[#ede7d8] ${row.gap === maxGap && row.gap > 0 ? "font-semibold" : ""}`}
                >
                  <td className="sticky left-0 bg-mf-paper px-3 py-2 group-hover:bg-[#ede7d8]">
                    <button
                      type="button"
                      onClick={(event) => {
                        event.stopPropagation();
                        onOpenOrigin(row.origin);
                      }}
                      className="cursor-pointer text-left underline decoration-mf-rule underline-offset-4 hover:decoration-mf-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink"
                    >
                      {row.origin === "Other" ? "Other" : `${row.origin} · ${ORIGIN_NAMES[row.origin]}`}
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right">{row.own}%</td>
                  <td className="px-3 py-2 text-right text-mf-umber">{row.peers}%</td>
                  <td className="px-3 py-2 text-right text-mf-umber">{row.industry}%</td>
                  <td className="px-3 py-2 text-right">{signed(row.gap)} pts</td>
                  {isSweaters && (
                    <td className="px-3 py-2 text-right">{afterShift(row.origin)}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className={`mb-2 ${LABEL}`}>Vendors</h3>
        <TextField
          label="Search vendors"
          placeholder="Name, or an origin code like VN"
          value={query}
          onChange={(event) => onQuery(event.target.value)}
          className="mb-3 max-w-sm"
        />
        {matches.length ? (
          <VendorRows vendors={matches} />
        ) : (
          <Notice tone="empty" title={`No vendors match “${query.trim()}”`}>
            Try an origin code such as VN or KH, or clear the search.
          </Notice>
        )}
      </div>
    </div>
  );
}

function OriginDetail({ category, origin }: { category: Category; origin: Origin }) {
  const row = originRows(category).find((r) => r.origin === origin)!;
  const country = category.id === "sweaters" ? SWEATER_COUNTRIES.find((c) => c.origin === origin) : undefined;
  const vendors = categoryVendors(category).filter((v) => v.origin === origin);

  const fields: [string, string][] = [
    ["Own brand", `${row.own}%`],
    ["Retail peers", `${row.peers}%`],
    ["Industry imports", `${row.industry}%`],
    ["Gap vs industry", `${signed(row.gap)} pts`],
  ];
  if (country) {
    fields.push(
      ["Units", country.units],
      ["After shift", `${country.afterShift}%`],
      ["Freight/u vs peers", country.freightPeers ? `$${country.freightOwn.toFixed(2)} vs $${country.freightPeers.toFixed(2)}` : `$${country.freightOwn.toFixed(2)}`],
      ["Net margin", `${country.netMargin.toFixed(1)}%`],
    );
  }

  return (
    <div className="space-y-4">
      <dl className="grid grid-cols-2 border-t border-l border-mf-ink font-mf-mono text-sm tabular-nums">
        {fields.map(([label, value]) => (
          <div key={label} className="border-r border-b border-mf-ink p-2">
            <dt className="text-[10px] uppercase tracking-wider text-mf-umber">{label}</dt>
            <dd className="mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
      {country?.topVendor && (
        <p className="font-mf-condensed">
          Top vendor: <span className="font-semibold">{country.topVendor.name}</span> ({country.topVendor.share}% of {origin})
        </p>
      )}
      {vendors.length > 0 ? (
        <ul className="divide-y divide-mf-rule border-y border-mf-rule">
          {vendors.map((v) => (
            <li key={v.name} className="flex items-center justify-between gap-3 py-2 font-mf-condensed">
              <span>{v.name}</span>
              {v.status === "Lead" ? <Stamp>Lead</Stamp> : <Stamp tone="ink">Current</Stamp>}
            </li>
          ))}
        </ul>
      ) : (
        <p className="font-mf-condensed text-sm text-mf-umber">
          No known vendors {origin === "Other" ? "in other origins" : `in ${ORIGIN_NAMES[origin]}`} for this category yet.
        </p>
      )}
      {vendors.some((v) => v.status === "Lead") && <p className="font-mf-condensed text-xs text-mf-umber">{LEAD_CAVEAT}</p>}
    </div>
  );
}
