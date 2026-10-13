import type { Metadata } from "next";
import Link from "next/link";
import { Button, Checkbox, Chip, Radio, Select, Tabs, TextField, TextLink, Toggle, type Forced } from "@/components/manifest/controls";
import { CategoryCard, CountryTable, InkFilters, MixBar, Notice, Stamp, ToolSteps, VendorRows } from "@/components/manifest/display";
import { manifestUiFonts } from "@/components/manifest/fonts";
import { contrast, rating } from "@/lib/contrast";
import { CATEGORIES, FICTION_NOTE, PERIOD, SWEATER_COUNTRIES, VENDORS, WHY_SHIFT } from "@/lib/shiftmap-data";
import { ChipsDemo, DetailDemo, TabsDemo, ToggleDemo } from "./live-demos";

export const metadata: Metadata = { title: "Manifest · Design system" };

const KRAFT = "#EFE6D2";
const PAPER = "#FBF8F1";
const INK = "#1F2A44";

const COLORS = [
  { role: "Background", name: "Kraft", token: "mf-kraft", hex: KRAFT, pairs: [["Ink text on it", INK], ["Muted text on it", "#6B6455"]] },
  { role: "Surface", name: "Carbon white", token: "mf-paper", hex: PAPER, pairs: [["Ink text on it", INK], ["Muted text on it", "#6B6455"]] },
  { role: "Text", name: "Ink navy", token: "mf-ink", hex: INK, pairs: [["On kraft", KRAFT], ["On surface", PAPER]] },
  { role: "Muted text", name: "Faded umber", token: "mf-umber", hex: "#6B6455", pairs: [["On kraft", KRAFT], ["On surface", PAPER]] },
  {
    role: "Border",
    name: "Rule line",
    token: "mf-rule",
    hex: "#CBBF9F",
    pairs: [["Against kraft", KRAFT]],
    note: "Dividers only. Controls take an ink edge so they pass 3:1.",
  },
  {
    role: "Accent",
    name: "Stamp red",
    token: "mf-stamp",
    hex: "#C2352B",
    pairs: [["Button label on it", PAPER], ["Stamp text on surface", PAPER], ["Stamp text on kraft", KRAFT]],
    note: "Filled red is the primary action only. Outlined red marks stamps and errors. Small stamps sit on carbon white; on kraft only at 18px and up.",
  },
];

const TYPE_ROLES = [
  { role: "Display", spec: "Saira Stencil · 700 · 56/56", className: "font-mf-stencil text-[56px] font-bold leading-none", sample: "52% → 32%" },
  { role: "Heading", spec: "Plex Sans Condensed · 600 · 24/30", className: "font-mf-condensed text-2xl font-semibold leading-[30px]", sample: "Women’s knit sweaters" },
  { role: "Body", spec: "Plex Sans Condensed · 400 · 16/24", className: "font-mf-condensed text-base leading-6 max-w-xl", sample: WHY_SHIFT[0] },
  { role: "Label", spec: "Plex Mono · 500 · 11/16 · caps", className: "font-mf-mono text-[11px] font-medium uppercase leading-4 tracking-wider", sample: "Net margin vs peers" },
  {
    role: "Figures",
    spec: "Plex Mono · 400/600 · 14/20 · tabular",
    className: "font-mf-mono text-sm tabular-nums",
    sample: (
      <>
        freight/u <span className="font-semibold">$1.85</span> vs peers $1.21, +$0.64/u, +53%
      </>
    ),
  },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48];

const STATES = ["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"] as const;
type StateName = (typeof STATES)[number];
const FORCE: Partial<Record<StateName, Forced>> = { Hover: "hover", Focus: "focus", Pressed: "pressed" };

/* One row per control; null means the state doesn't apply. */
const STATE_ROWS: { name: string; render: (state: StateName) => React.ReactNode | null }[] = [
  {
    name: "Primary button",
    render: (s) => (s === "Selected" ? null : <Button force={FORCE[s]} disabled={s === "Disabled"}>Generate</Button>),
  },
  {
    name: "Secondary button",
    render: (s) => (s === "Selected" ? null : <Button variant="secondary" force={FORCE[s]} disabled={s === "Disabled"}>Copy</Button>),
  },
  {
    name: "Link",
    render: (s) => (s === "Selected" || s === "Disabled" ? null : <TextLink force={FORCE[s]}>Vendor leads →</TextLink>),
  },
  {
    name: "Text input",
    render: (s) =>
      s === "Selected" || s === "Pressed" ? null : (
        <TextField label="Search" placeholder="Vendor name" force={FORCE[s]} disabled={s === "Disabled"} className="w-32" />
      ),
  },
  {
    name: "Checkbox",
    render: (s) => <Checkbox label="CN" force={FORCE[s]} defaultChecked={s === "Selected"} disabled={s === "Disabled"} />,
  },
  {
    name: "Radio",
    render: (s) => <Radio label="Share" name={`radio-${s}`} force={FORCE[s]} defaultChecked={s === "Selected"} disabled={s === "Disabled"} />,
  },
  {
    name: "Toggle",
    render: (s) => <Toggle label="Active" checked={s === "Selected"} force={FORCE[s]} disabled={s === "Disabled"} />,
  },
  {
    name: "Filter chip",
    render: (s) => (
      <Chip selected={s === "Selected"} force={FORCE[s]} disabled={s === "Disabled"}>
        Women
      </Chip>
    ),
  },
  {
    name: "Tab",
    render: (s) => (
      <Tabs
        label={`Tab ${s}`}
        items={[{ id: "peers", label: "Peers" }]}
        value={s === "Selected" ? "peers" : "none"}
        force={FORCE[s] ? { id: "peers", state: FORCE[s] } : s === "Disabled" ? { id: "peers", state: "disabled" } : undefined}
      />
    ),
  },
];

function Section({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section className="border-t-2 border-mf-ink pt-5" aria-labelledby={`section-${n}`}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 id={`section-${n}`} className="flex items-center gap-3 font-mf-condensed text-2xl font-semibold">
          <span className="flex size-7 items-center justify-center border border-mf-ink font-mf-mono text-sm">{n}</span>
          {title}
        </h2>
        {note && <p className="font-mf-condensed text-mf-umber">{note}</p>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Demo({ label, children, surface, wide }: { label: string; children: React.ReactNode; surface?: boolean; wide?: boolean }) {
  return (
    <div className={wide ? "min-w-0 lg:col-span-2" : "min-w-0"}>
      <p className="mb-2 font-mf-mono text-[11px] font-medium uppercase tracking-wider text-mf-umber">{label}</p>
      {surface ? <div className="border border-mf-rule bg-mf-paper p-5">{children}</div> : children}
    </div>
  );
}

export default function ManifestDesignSystem() {
  const sweaters = CATEGORIES[0];

  return (
    <div className={`${manifestUiFonts} min-h-screen bg-mf-kraft text-mf-ink`}>
      <InkFilters />
      <main className="mx-auto max-w-6xl space-y-16 px-5 py-10 sm:px-8 sm:py-14">
        <header>
          <div className="flex items-center justify-between font-mf-mono text-xs uppercase tracking-wider">
            <Link href="/" className="underline decoration-mf-rule underline-offset-4 hover:decoration-mf-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mf-ink">
              ← Hub
            </Link>
            <span className="text-mf-umber">Design system 1 / 3</span>
          </div>
          <h1 className="mt-8 font-mf-stencil text-6xl font-bold uppercase leading-none sm:text-8xl">Manifest</h1>
          <p className="mt-2 font-mf-mono text-sm uppercase tracking-[0.2em]">Design system</p>
          <p className="mt-4 max-w-2xl font-mf-condensed text-lg leading-7">
            Built from the{" "}
            <Link href="/mood-boards/manifest" className="underline decoration-mf-rule underline-offset-4 hover:decoration-mf-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink">
              Manifest mood board
            </Link>
            . These are the components the Shiftmap site uses, in every state.
          </p>
        </header>

        <Section n={1} title="Color roles" note="Six colors. Ratios are WCAG contrast, computed from the hex values.">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map((color) => (
              <li key={color.token} className="border border-mf-rule bg-mf-paper">
                <div className="h-20 border-b border-mf-rule" style={{ backgroundColor: color.hex }} />
                <div className="p-4">
                  <div className="flex items-baseline justify-between gap-2">
                    <p className="font-mf-condensed text-lg font-semibold">{color.role}</p>
                    <p className="font-mf-mono text-xs">{color.hex}</p>
                  </div>
                  <p className="font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">
                    {color.name} · {color.token}
                  </p>
                  <dl className="mt-3 space-y-1 font-mf-mono text-xs tabular-nums">
                    {color.pairs.map(([label, against]) => {
                      const ratio = contrast(color.hex, against);
                      return (
                        <div key={label} className="flex justify-between gap-2">
                          <dt className="text-mf-umber">{label}</dt>
                          <dd>
                            <span className="font-semibold">{ratio.toFixed(1)}:1</span> {rating(ratio)}
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                  {color.note && <p className="mt-3 font-mf-condensed text-sm">{color.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section n={2} title="Type roles" note="Three families, five roles, set in Shiftmap content.">
          <dl className="divide-y divide-mf-rule border-y border-mf-rule">
            {TYPE_ROLES.map((type) => (
              <div key={type.role} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:items-baseline">
                <dt>
                  <p className="font-mf-condensed font-semibold">{type.role}</p>
                  <p className="font-mf-mono text-[11px] text-mf-umber">{type.spec}</p>
                </dt>
                <dd className={type.className}>{type.sample}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section n={3} title="Spacing and shape" note="A 4px scale, square corners, ruled lines instead of shadows.">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <Demo label="Spacing scale (px)">
              <ul className="space-y-2">
                {SPACING.map((space) => (
                  <li key={space} className="flex items-center gap-3 font-mf-mono text-xs">
                    <span className="w-6 text-right">{space}</span>
                    <span className="h-3 bg-mf-ink" style={{ width: space * 3 }} />
                  </li>
                ))}
              </ul>
            </Demo>
            <Demo label="Corners">
              <div className="flex items-end gap-6">
                <div>
                  <div className="size-16 border border-mf-ink bg-mf-paper" />
                  <p className="mt-2 font-mf-mono text-xs">0px · everything</p>
                </div>
                <div>
                  <div className="size-16 rounded-full border border-mf-ink bg-mf-paper" />
                  <p className="mt-2 font-mf-mono text-xs">Round · radios only</p>
                </div>
              </div>
            </Demo>
            <Demo label="Borders and shadow">
              <ul className="space-y-3 font-mf-mono text-xs">
                <li className="border-b border-mf-rule pb-2">1px rule · dividers</li>
                <li className="border-b border-mf-ink pb-2">1px ink · controls, cards in focus</li>
                <li className="border-b-2 border-mf-ink pb-2">2px ink · section rules, dialogs</li>
                <li className="border-b-4 border-double border-mf-stamp pb-2">4px double red · large stamps</li>
                <li className="pt-1 font-mf-condensed text-sm">No shadows. Paper doesn’t float, so separation comes from lines.</li>
              </ul>
            </Demo>
          </div>
        </Section>

        <Section n={4} title="Components" note="Live: hover, tab to, click and type into them.">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            <Demo label="Buttons and link" surface>
              <div className="flex flex-wrap items-center gap-3">
                <Button>Generate report</Button>
                <Button variant="secondary">Copy</Button>
                <TextLink href="#section-4">See vendor leads →</TextLink>
              </div>
            </Demo>
            <Demo label="Text input and select" surface>
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Search vendors" placeholder="Vendor name" />
                <Select label="Category" options={CATEGORIES.map((c) => c.name)} />
              </div>
            </Demo>
            <Demo label="Checkboxes and radios" surface>
              <div className="grid gap-6 sm:grid-cols-2">
                <fieldset>
                  <legend className="mb-2 font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">Origins</legend>
                  <div className="flex flex-col gap-2">
                    <Checkbox label="CN · China" defaultChecked />
                    <Checkbox label="VN · Vietnam" defaultChecked />
                    <Checkbox label="BD · Bangladesh" />
                    <Checkbox label="KH · Cambodia" />
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-2 font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">Sort by</legend>
                  <div className="flex flex-col gap-2">
                    <Radio name="sort" label="Share" defaultChecked />
                    <Radio name="sort" label="Freight/u" />
                    <Radio name="sort" label="Net margin" />
                  </div>
                </fieldset>
              </div>
            </Demo>
            <Demo label="Toggle and filter chips" surface>
              <div className="space-y-5">
                <ToggleDemo />
                <ChipsDemo />
              </div>
            </Demo>
            <Demo label="Tabs · arrow keys move between lenses">
              <TabsDemo />
            </Demo>
            <Demo label="Category card · full and compact (site sidebar)">
              <div className="grid gap-3">
                <CategoryCard category={sweaters} />
                <div className="max-w-xs">
                  <CategoryCard category={CATEGORIES[1]} compact />
                </div>
              </div>
            </Demo>
            <Demo label="List rows">
              <VendorRows vendors={[VENDORS[2], VENDORS[6], VENDORS[7]]} />
            </Demo>
            <Demo label="Badges · stamps" surface>
              <div className="flex flex-wrap items-center gap-3">
                <Stamp size="lg" tilt={-4}>
                  Rebalance
                </Stamp>
                <Stamp tilt={2}>Renegotiate freight</Stamp>
                <Stamp tilt={-2}>Add origin</Stamp>
                <Stamp>Lead</Stamp>
                <Stamp tone="ink">Current</Stamp>
              </div>
            </Demo>
            <Demo label={`Data table · sweaters by country · ${PERIOD}`} wide>
              <CountryTable rows={SWEATER_COUNTRIES} />
            </Demo>
            <Demo label="Origin mix bar" surface>
              <MixBar mix={sweaters.mix} />
            </Demo>
            <Demo label="Detail panel · Esc or × closes" surface>
              <DetailDemo />
            </Demo>
            <Demo label="Report progress" surface>
              <ToolSteps
                steps={[
                  { label: "Finding matching categories", state: "done" },
                  { label: "Building origin tables", state: "done" },
                  { label: "Comparing with industry imports", state: "running" },
                  { label: "Scanning shipment records for vendors", state: "queued" },
                ]}
              />
            </Demo>
          </div>
        </Section>

        <Section n={5} title="Control states" note="Each state pinned on, so they can be compared side by side.">
          <div className="overflow-x-auto border border-mf-rule bg-mf-paper">
            <table className="w-full min-w-[56rem] text-left">
              <thead>
                <tr className="border-b-2 border-mf-ink font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">
                  <th className="sticky left-0 bg-mf-paper px-4 py-3 font-medium">Control</th>
                  {STATES.map((state) => (
                    <th key={state} className="px-4 py-3 font-medium">
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-mf-rule">
                {STATE_ROWS.map((row) => (
                  <tr key={row.name}>
                    <th className="sticky left-0 bg-mf-paper px-4 py-4 font-mf-condensed font-semibold whitespace-nowrap">{row.name}</th>
                    {STATES.map((state) => (
                      <td key={state} className="px-4 py-4 align-middle">
                        {row.render(state) ?? <span className="font-mf-mono text-mf-rule">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section n={6} title="UI states" note="What each one tells the sourcing manager.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Demo label="Empty">
              <Notice tone="empty" title="No scope yet: pick a category" action={<Button variant="secondary">Pick a category</Button>}>
                Shiftmap compares where a category is made with peers and industry imports.
              </Notice>
            </Demo>
            <Demo label="Loading">
              <Notice tone="loading" title="Building origin tables…">
                <ToolSteps
                  steps={[
                    { label: "Finding matching categories", state: "done" },
                    { label: "Building origin tables", state: "running" },
                    { label: "Comparing with industry imports", state: "queued" },
                  ]}
                />
              </Notice>
            </Demo>
            <Demo label="Error">
              <Notice tone="error" title="Couldn’t load industry imports" action={<Button variant="secondary">Retry</Button>}>
                Shipment records didn’t respond. Your scope is kept.
              </Notice>
            </Demo>
            <Demo label="Success">
              <Notice tone="success" title="Report ready · 8 tables" action={<TextLink href="#section-4">Open report →</TextLink>}>
                Women’s knit sweaters · US · {PERIOD}
              </Notice>
            </Demo>
          </div>
        </Section>

        <footer className="border-t border-mf-rule pt-4 font-mf-mono text-xs text-mf-umber">{FICTION_NOTE}</footer>
      </main>
    </div>
  );
}
