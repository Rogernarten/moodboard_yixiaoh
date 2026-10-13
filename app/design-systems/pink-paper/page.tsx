import type { Metadata } from "next";
import Link from "next/link";
import { Button, Checkbox, Chip, Radio, Select, Tabs, TextField, TextLink, Toggle, type Forced } from "@/components/pink-paper/controls";
import { ArticleCard, CountryTable, MixBar, Notice, Progress, Tag, VendorList } from "@/components/pink-paper/display";
import { pinkPaperUiFonts } from "@/components/pink-paper/fonts";
import { contrast, rating } from "@/lib/contrast";
import { CATEGORIES, FICTION_NOTE, PERIOD, SWEATER_COUNTRIES, VENDORS, WHY_SHIFT } from "@/lib/shiftmap-data";
import { ChipsDemo, DetailDemo, TabsDemo, ToggleDemo } from "./live-demos";

export const metadata: Metadata = { title: "Pink Paper · Design system" };

const SALMON = "#FFF1E5";
const TINT = "#F7E3D3";
const INK = "#262A33";
const GRAPHITE = "#66605A";

const COLORS = [
  { role: "Background", name: "Salmon newsprint", token: "pp-salmon", hex: SALMON, pairs: [["Ink text on it", INK], ["Muted text on it", GRAPHITE]] },
  { role: "Surface", name: "Sidebar tint", token: "pp-tint", hex: TINT, pairs: [["Ink text on it", INK], ["Muted text on it", GRAPHITE]] },
  { role: "Text", name: "Press ink", token: "pp-ink", hex: INK, pairs: [["On salmon", SALMON], ["On tint", TINT]] },
  { role: "Muted text", name: "Graphite", token: "pp-graphite", hex: GRAPHITE, pairs: [["On salmon", SALMON], ["On tint", TINT]] },
  {
    role: "Border",
    name: "Hairline",
    token: "pp-rule",
    hex: "#DCC5B2",
    pairs: [["Against salmon", SALMON]],
    note: "Column rules and dividers only. Controls take an ink or graphite edge.",
  },
  {
    role: "Accent",
    name: "Deep teal",
    token: "pp-teal",
    hex: "#0F5257",
    pairs: [["Button label on it", SALMON], ["As text on salmon", SALMON]],
    note: "Teal fills the primary action and nothing else, not even links.",
  },
];

const TYPE_ROLES = [
  { role: "Display", spec: "Newsreader · 500 · 56/60", className: "font-pp-display text-[56px] font-medium leading-[60px] tracking-tight", sample: "−410 bps" },
  {
    role: "Heading",
    spec: "Newsreader · 500 · 24/30",
    className: "font-pp-display text-2xl font-medium leading-[30px] tracking-tight",
    sample: "Northfold buys 52% of its sweaters in China. The industry buys 27%.",
  },
  { role: "Body", spec: "Source Serif 4 · 400 · 17/28", className: "font-pp-serif text-[17px] leading-7 max-w-xl", sample: WHY_SHIFT[1] },
  { role: "Label", spec: "Source Sans 3 · 600 · 12/16 · caps", className: "font-pp-sans text-xs font-semibold uppercase leading-4 tracking-[0.12em]", sample: "Sourcing · Women’s knit sweaters" },
  {
    role: "Figures",
    spec: "Source Sans 3 · 400/600 · 15/22 · tabular",
    className: "font-pp-sans text-[15px] tabular-nums",
    sample: (
      <>
        Freight/u <span className="font-semibold">$1.85</span> vs peers $1.21, +$0.64/u, +53%
      </>
    ),
  },
];

const SPACING = [4, 8, 12, 16, 24, 32, 48];
const STATES = ["Rest", "Hover", "Focus", "Pressed", "Selected", "Disabled"] as const;
type StateName = (typeof STATES)[number];
const FORCE: Partial<Record<StateName, Forced>> = { Hover: "hover", Focus: "focus", Pressed: "pressed" };

const STATE_ROWS: { name: string; render: (state: StateName) => React.ReactNode | null }[] = [
  { name: "Primary button", render: (s) => (s === "Selected" ? null : <Button force={FORCE[s]} disabled={s === "Disabled"}>Generate</Button>) },
  { name: "Secondary button", render: (s) => (s === "Selected" ? null : <Button variant="secondary" force={FORCE[s]} disabled={s === "Disabled"}>Download CSV</Button>) },
  { name: "Link", render: (s) => (s === "Selected" || s === "Disabled" ? null : <TextLink force={FORCE[s]}>Appendix →</TextLink>) },
  {
    name: "Text input",
    render: (s) =>
      s === "Selected" || s === "Pressed" ? null : <TextField label="Search" placeholder="Vendor name" force={FORCE[s]} disabled={s === "Disabled"} className="w-32" />,
  },
  { name: "Checkbox", render: (s) => <Checkbox label="CN" force={FORCE[s]} defaultChecked={s === "Selected"} disabled={s === "Disabled"} /> },
  { name: "Radio", render: (s) => <Radio label="Share" name={`pp-radio-${s}`} force={FORCE[s]} defaultChecked={s === "Selected"} disabled={s === "Disabled"} /> },
  { name: "Toggle", render: (s) => <Toggle label="Active" checked={s === "Selected"} force={FORCE[s]} disabled={s === "Disabled"} /> },
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
    <section className="border-t-2 border-pp-ink pt-4" aria-labelledby={`section-${n}`}>
      <p className="font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">Section {n}</p>
      <h2 id={`section-${n}`} className="mt-1 font-pp-display text-3xl font-medium tracking-tight">
        {title}
      </h2>
      {note && <p className="mt-1 max-w-2xl font-pp-serif text-lg italic text-pp-graphite">{note}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Demo({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <div className={wide ? "min-w-0 lg:col-span-2" : "min-w-0"}>
      <p className="mb-3 border-b border-pp-rule pb-1 font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">{label}</p>
      {children}
    </div>
  );
}

export default function PinkPaperDesignSystem() {
  const sweaters = CATEGORIES[0];

  return (
    <div className={`${pinkPaperUiFonts} min-h-screen bg-pp-salmon text-pp-ink`}>
      <main className="mx-auto max-w-6xl space-y-16 px-5 py-8 sm:px-8 sm:py-10">
        <header>
          <div className="flex items-center justify-between font-pp-sans text-xs uppercase tracking-[0.12em]">
            <Link href="/" className="underline decoration-pp-rule underline-offset-4 hover:decoration-pp-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pp-ink">
              ← Hub
            </Link>
            <span className="text-pp-graphite">Design system 2 / 3</span>
          </div>
          <h1 className="mt-6 text-center font-pp-display text-6xl font-medium leading-none tracking-tight sm:text-8xl">Pink Paper</h1>
          <div className="mt-5 flex flex-col gap-1 border-t border-b-4 border-double border-pp-ink py-2 font-pp-sans text-xs uppercase tracking-[0.12em] sm:flex-row sm:justify-between">
            <span className="font-semibold">Design system</span>
            <span className="text-pp-graphite">
              Built from the{" "}
              <Link href="/mood-boards/pink-paper" className="underline decoration-pp-rule underline-offset-4 hover:decoration-pp-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pp-ink">
                Pink Paper mood board
              </Link>
            </span>
          </div>
          <p className="mx-auto mt-5 max-w-2xl text-center font-pp-display text-xl italic leading-snug text-pp-graphite">
            The same Shiftmap components, set as the business pages: serif headlines, hairline rules, one teal button.
          </p>
        </header>

        <Section n={1} title="Color roles" note="Six colors. Ratios are WCAG contrast, computed from the hex values.">
          <ul className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map((color) => (
              <li key={color.token}>
                <div className="h-20 border border-pp-rule" style={{ backgroundColor: color.hex }} />
                <div className="mt-2 flex items-baseline justify-between gap-2">
                  <p className="font-pp-display text-xl font-medium">{color.role}</p>
                  <p className="font-pp-sans text-sm tabular-nums">{color.hex}</p>
                </div>
                <p className="font-pp-serif text-sm italic text-pp-graphite">
                  {color.name} · {color.token}
                </p>
                <dl className="mt-2 space-y-0.5 border-t border-pp-rule pt-2 font-pp-sans text-sm tabular-nums">
                  {color.pairs.map(([label, against]) => {
                    const ratio = contrast(color.hex, against);
                    return (
                      <div key={label} className="flex justify-between gap-2">
                        <dt className="text-pp-graphite">{label}</dt>
                        <dd>
                          <span className="font-semibold">{ratio.toFixed(1)}:1</span> {rating(ratio)}
                        </dd>
                      </div>
                    );
                  })}
                </dl>
                {color.note && <p className="mt-2 font-pp-serif text-sm">{color.note}</p>}
              </li>
            ))}
          </ul>
        </Section>

        <Section n={2} title="Type roles" note="Three families, five roles, set in Shiftmap content.">
          <dl className="divide-y divide-pp-rule border-b border-pp-rule">
            {TYPE_ROLES.map((type) => (
              <div key={type.role} className="grid gap-2 py-5 sm:grid-cols-[10rem_1fr] sm:items-baseline">
                <dt>
                  <p className="font-pp-sans text-sm font-semibold">{type.role}</p>
                  <p className="font-pp-sans text-xs text-pp-graphite">{type.spec}</p>
                </dt>
                <dd className={type.className}>{type.sample}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section n={3} title="Spacing and shape" note="A 4px scale, square corners, hairline rules instead of shadows.">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:divide-x lg:divide-pp-rule">
            <Demo label="Spacing scale (px)">
              <ul className="space-y-2">
                {SPACING.map((space) => (
                  <li key={space} className="flex items-center gap-3 font-pp-sans text-sm tabular-nums">
                    <span className="w-6 text-right">{space}</span>
                    <span className="h-3 bg-pp-ink" style={{ width: space * 3 }} />
                  </li>
                ))}
              </ul>
            </Demo>
            <div className="lg:pl-10">
              <Demo label="Corners">
                <div className="flex items-end gap-6">
                  <div>
                    <div className="size-16 border border-pp-ink" />
                    <p className="mt-2 font-pp-sans text-sm">0px · everything</p>
                  </div>
                  <div>
                    <div className="size-16 rounded-full border border-pp-ink" />
                    <p className="mt-2 font-pp-sans text-sm">Round · radios, toggles</p>
                  </div>
                </div>
              </Demo>
            </div>
            <div className="lg:pl-10">
              <Demo label="Rules and shadow">
                <ul className="space-y-3 font-pp-sans text-sm">
                  <li className="border-b border-pp-rule pb-2">1px hairline · column rules, dividers</li>
                  <li className="border-b border-pp-ink pb-2">1px ink · controls, field underlines</li>
                  <li className="border-b-2 border-pp-ink pb-2">2px ink · table tops, sections</li>
                  <li className="border-b-4 border-double border-pp-ink pb-2">4px double · masthead, dialogs</li>
                  <li className="pt-1 font-pp-serif italic">No shadows. Newsprint is flat; hierarchy comes from type and rules.</li>
                </ul>
              </Demo>
            </div>
          </div>
        </Section>

        <Section n={4} title="Components" note="Live: hover, tab to, click and type into them.">
          <div className="grid grid-cols-1 gap-x-10 gap-y-10 lg:grid-cols-2">
            <Demo label="Buttons and link">
              <div className="flex flex-wrap items-center gap-4">
                <Button>Generate report</Button>
                <Button variant="secondary">Download CSV</Button>
                <TextLink href="#section-4">Read the appendix →</TextLink>
              </div>
            </Demo>
            <Demo label="Text input and select">
              <div className="grid gap-6 sm:grid-cols-2">
                <TextField label="Search vendors" placeholder="Vendor name" />
                <Select label="Category" options={CATEGORIES.map((c) => c.name)} />
              </div>
            </Demo>
            <Demo label="Checkboxes and radios">
              <div className="grid gap-6 sm:grid-cols-2">
                <fieldset>
                  <legend className="mb-2 font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">Origins</legend>
                  <div className="flex flex-col gap-2">
                    <Checkbox label="CN · China" defaultChecked />
                    <Checkbox label="VN · Vietnam" defaultChecked />
                    <Checkbox label="BD · Bangladesh" />
                    <Checkbox label="KH · Cambodia" />
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-2 font-pp-sans text-xs font-semibold uppercase tracking-[0.12em] text-pp-graphite">Sort by</legend>
                  <div className="flex flex-col gap-2">
                    <Radio name="pp-sort" label="Share" defaultChecked />
                    <Radio name="pp-sort" label="Freight/u" />
                    <Radio name="pp-sort" label="Net margin" />
                  </div>
                </fieldset>
              </div>
            </Demo>
            <Demo label="Toggle and filter chips">
              <div className="space-y-5">
                <ToggleDemo />
                <ChipsDemo />
              </div>
            </Demo>
            <Demo label="Tabs · Tab and Enter, or arrow keys">
              <TabsDemo />
            </Demo>
            <Demo label="Card · a category as a short article">
              <ArticleCard category={sweaters} />
            </Demo>
            <Demo label="List rows">
              <VendorList vendors={[VENDORS[2], VENDORS[6], VENDORS[7]]} />
            </Demo>
            <Demo label="Tags">
              <div className="flex flex-wrap items-center gap-2">
                <Tag>Rebalance</Tag>
                <Tag>Renegotiate freight</Tag>
                <Tag>Add origin</Tag>
                <Tag solid>Lead</Tag>
                <Tag>Current</Tag>
              </div>
            </Demo>
            <Demo label={`Data table · sweaters by country · ${PERIOD}`} wide>
              <CountryTable rows={SWEATER_COUNTRIES} />
            </Demo>
            <Demo label="Origin mix bar">
              <MixBar mix={sweaters.mix} />
            </Demo>
            <Demo label="Detail panel · Esc or × closes">
              <DetailDemo />
            </Demo>
            <Demo label="Report progress">
              <Progress
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
          <div className="overflow-x-auto">
            <table className="w-full min-w-[56rem] border-t-2 border-pp-ink text-left">
              <thead>
                <tr className="border-b border-pp-ink font-pp-sans text-xs uppercase tracking-[0.12em] text-pp-graphite">
                  <th className="sticky left-0 bg-pp-salmon py-3 pr-4 font-semibold">Control</th>
                  {STATES.map((state) => (
                    <th key={state} className="px-4 py-3 font-semibold">
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-pp-rule">
                {STATE_ROWS.map((row) => (
                  <tr key={row.name}>
                    <th className="sticky left-0 bg-pp-salmon py-4 pr-4 font-pp-sans text-sm font-semibold whitespace-nowrap">{row.name}</th>
                    {STATES.map((state) => (
                      <td key={state} className="px-4 py-4 align-middle">
                        {row.render(state) ?? <span className="font-pp-sans text-pp-rule">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section n={6} title="UI states" note="What each one tells the category manager reading the report.">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Notice tone="empty" title="No scope yet: pick a category" action={<Button variant="secondary">Pick a category</Button>}>
              The report compares where a category is made with peers and industry imports.
            </Notice>
            <Notice tone="loading" title="Building origin tables…">
              <Progress
                steps={[
                  { label: "Finding matching categories", state: "done" },
                  { label: "Building origin tables", state: "running" },
                  { label: "Comparing with industry imports", state: "queued" },
                ]}
              />
            </Notice>
            <Notice tone="error" title="Couldn’t load industry imports" action={<Button variant="secondary">Retry</Button>}>
              Shipment records didn’t respond. Your scope is kept.
            </Notice>
            <Notice tone="success" title="Report ready · 8 tables" action={<TextLink href="#section-4">Open the report →</TextLink>}>
              Women’s knit sweaters · US · {PERIOD}
            </Notice>
          </div>
        </Section>

        <footer className="border-t border-pp-ink pt-3 font-pp-sans text-xs text-pp-graphite">{FICTION_NOTE}</footer>
      </main>
    </div>
  );
}
