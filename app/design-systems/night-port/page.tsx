import type { Metadata } from "next";
import Link from "next/link";
import { Button, Checkbox, Chip, Radio, Select, Tabs, TextField, TextLink, Toggle, type Forced } from "@/components/night-port/controls";
import { Badge, ChannelBar, CountryTable, MixBar, Notice, PanelCard, ToolSteps, VendorRows } from "@/components/night-port/display";
import { nightPortUiFonts } from "@/components/night-port/fonts";
import { contrast, rating } from "@/lib/contrast";
import { CATEGORIES, FICTION_NOTE, PERIOD, SWEATER_COUNTRIES, VENDORS, WHY_SHIFT } from "@/lib/shiftmap-data";
import { ChipsDemo, DetailDemo, TabsDemo, ToggleDemo } from "./live-demos";

export const metadata: Metadata = { title: "Night Port · Design system" };

const NIGHT = "#0E1116";
const PANEL = "#171B22";
const SIGNAL = "#E6E8EB";
const STEEL = "#8B93A1";

const COLORS = [
  { role: "Background", name: "Night", token: "np-night", hex: NIGHT, pairs: [["Signal text on it", SIGNAL], ["Muted text on it", STEEL]] },
  { role: "Surface", name: "Panel", token: "np-panel", hex: PANEL, pairs: [["Signal text on it", SIGNAL], ["Muted text on it", STEEL]] },
  { role: "Text", name: "Signal white", token: "np-signal", hex: SIGNAL, pairs: [["On night", NIGHT], ["On panel", PANEL]] },
  {
    role: "Muted text",
    name: "Steel",
    token: "np-steel",
    hex: STEEL,
    pairs: [["On night", NIGHT], ["On panel", PANEL]],
    note: "Also the edge of every control: it clears 3:1 where edge grey doesn’t.",
  },
  {
    role: "Border",
    name: "Edge",
    token: "np-edge",
    hex: "#2A303A",
    pairs: [["Against panel", PANEL]],
    note: "Bezels and dividers only, never a control boundary.",
  },
  {
    role: "Accent",
    name: "Signal amber",
    token: "np-amber",
    hex: "#FFB020",
    pairs: [["Night label on it", NIGHT]],
    note: "Amber means act. It lights the primary action and nothing else.",
  },
];

const TYPE_ROLES = [
  { role: "Display", spec: "Barlow Condensed · 700 · 56/56 · caps", className: "font-np-display text-[56px] font-bold uppercase leading-none tracking-tight", sample: "CN 52% → 32%" },
  { role: "Heading", spec: "Barlow Condensed · 600 · 22/26 · caps", className: "font-np-display text-[22px] font-semibold uppercase leading-[26px] tracking-wide", sample: "Women’s knit sweaters · US" },
  { role: "Body", spec: "Barlow · 400 · 16/24", className: "font-np-body text-base leading-6 max-w-xl", sample: WHY_SHIFT[1] },
  { role: "Label", spec: "JetBrains Mono · 400 · 11/16 · caps", className: "font-np-mono text-[11px] uppercase leading-4 tracking-wider", sample: "CH 05 · Comparing with industry imports" },
  {
    role: "Figures",
    spec: "JetBrains Mono · 400/500 · 14/20 · tabular",
    className: "font-np-mono text-sm tabular-nums",
    sample: (
      <>
        freight/u <span className="font-medium text-np-signal">$1.85</span> <span className="text-np-steel">vs peers</span> $1.21, +$0.64/u, +53%
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
  { name: "Secondary button", render: (s) => (s === "Selected" ? null : <Button variant="secondary" force={FORCE[s]} disabled={s === "Disabled"}>Stop</Button>) },
  { name: "Link", render: (s) => (s === "Selected" || s === "Disabled" ? null : <TextLink force={FORCE[s]}>Session ID</TextLink>) },
  {
    name: "Text input",
    render: (s) =>
      s === "Selected" || s === "Pressed" ? null : <TextField label="Search" placeholder="Vendor" force={FORCE[s]} disabled={s === "Disabled"} className="w-32" />,
  },
  { name: "Checkbox", render: (s) => <Checkbox label="CN" force={FORCE[s]} defaultChecked={s === "Selected"} disabled={s === "Disabled"} /> },
  { name: "Radio", render: (s) => <Radio label="Share" name={`np-radio-${s}`} force={FORCE[s]} defaultChecked={s === "Selected"} disabled={s === "Disabled"} /> },
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
    <section aria-labelledby={`section-${n}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-np-edge pb-3">
        <h2 id={`section-${n}`} className="flex items-baseline gap-3 font-np-display text-3xl font-bold uppercase tracking-tight">
          <span className="font-np-mono text-sm font-normal text-np-steel">CH {String(n).padStart(2, "0")}</span>
          {title}
        </h2>
        {note && <p className="font-np-body text-np-steel">{note}</p>}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

/* A labeled monitor panel. */
function Demo({ label, children, wide, bare }: { label: string; children: React.ReactNode; wide?: boolean; bare?: boolean }) {
  return (
    <div className={cx("flex min-w-0 flex-col rounded-[2px] border border-np-edge bg-np-panel", wide && "lg:col-span-2")}>
      <ChannelBar left={label} />
      <div className={bare ? "" : "flex-1 p-5"}>{children}</div>
    </div>
  );
}

function cx(...parts: (string | false | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

export default function NightPortDesignSystem() {
  const sweaters = CATEGORIES[0];

  return (
    <div className={`${nightPortUiFonts} min-h-screen bg-np-night text-np-signal`}>
      <main className="mx-auto max-w-6xl space-y-16 px-5 py-8 sm:px-8 sm:py-10">
        <header>
          <div className="flex items-center justify-between font-np-mono text-xs uppercase tracking-wider text-np-steel">
            <Link href="/" className="text-np-signal underline decoration-np-steel underline-offset-4 hover:decoration-np-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-np-signal">
              ← Hub
            </Link>
            <span>Design system 3 / 3</span>
          </div>
          <h1 className="mt-8 font-np-display text-7xl font-bold uppercase leading-none tracking-tight sm:text-9xl">Night Port</h1>
          <p className="mt-3 font-np-mono text-sm uppercase tracking-[0.2em] text-np-steel">Design system</p>
          <p className="mt-4 max-w-2xl font-np-body text-lg leading-7 text-np-steel">
            Built from the{" "}
            <Link href="/mood-boards/night-port" className="text-np-signal underline decoration-np-steel underline-offset-4 hover:decoration-np-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-np-signal">
              Night Port mood board
            </Link>
            . The Shiftmap components as a control room: dark panels, steel edges, one amber signal.
          </p>
        </header>

        <Section n={1} title="Color roles" note="Six colors. WCAG ratios computed from the hex values.">
          <ul className="grid grid-cols-1 gap-px rounded-[2px] border border-np-edge bg-np-edge sm:grid-cols-2 lg:grid-cols-3">
            {COLORS.map((color) => (
              <li key={color.token} className="bg-np-night">
                <ChannelBar left={`${color.role} · ${color.token}`} right={<span className="text-np-signal">{color.hex}</span>} />
                <div className="p-4">
                  <div className="h-16 rounded-[2px] border border-np-steel" style={{ backgroundColor: color.hex }} />
                  <p className="mt-3 font-np-display text-lg font-semibold uppercase tracking-wide">{color.name}</p>
                  <dl className="mt-2 space-y-1 font-np-mono text-xs tabular-nums">
                    {color.pairs.map(([label, against]) => {
                      const ratio = contrast(color.hex, against);
                      return (
                        <div key={label} className="flex justify-between gap-2">
                          <dt className="text-np-steel">{label}</dt>
                          <dd>
                            {ratio.toFixed(1)}:1 <span className="text-np-steel">{rating(ratio)}</span>
                          </dd>
                        </div>
                      );
                    })}
                  </dl>
                  {color.note && <p className="mt-3 font-np-body text-sm text-np-steel">{color.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Section>

        <Section n={2} title="Type roles" note="Three families, five roles, set in Shiftmap content.">
          <dl className="divide-y divide-np-edge rounded-[2px] border border-np-edge bg-np-panel">
            {TYPE_ROLES.map((type) => (
              <div key={type.role} className="grid gap-2 px-5 py-5 sm:grid-cols-[11rem_1fr] sm:items-baseline">
                <dt>
                  <p className="font-np-mono text-xs uppercase tracking-wider">{type.role}</p>
                  <p className="font-np-mono text-[11px] text-np-steel">{type.spec}</p>
                </dt>
                <dd className={type.className}>{type.sample}</dd>
              </div>
            ))}
          </dl>
        </Section>

        <Section n={3} title="Spacing and shape" note="A 4px scale, 2px corners, bezels instead of shadows.">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Demo label="Spacing scale (px)">
              <ul className="space-y-2">
                {SPACING.map((space) => (
                  <li key={space} className="flex items-center gap-3 font-np-mono text-xs">
                    <span className="w-6 text-right text-np-steel">{space}</span>
                    <span className="h-3 bg-np-signal" style={{ width: space * 3 }} />
                  </li>
                ))}
              </ul>
            </Demo>
            <Demo label="Corners">
              <div className="flex items-end gap-6">
                <div>
                  <div className="size-16 rounded-[2px] border border-np-steel bg-np-night" />
                  <p className="mt-2 font-np-mono text-xs">2px · everything</p>
                </div>
                <div>
                  <div className="size-16 rounded-full border border-np-steel bg-np-night" />
                  <p className="mt-2 font-np-mono text-xs">Round · radios, LEDs</p>
                </div>
              </div>
            </Demo>
            <Demo label="Edges and shadow">
              <ul className="space-y-3 font-np-mono text-xs">
                <li className="border-b border-np-edge pb-2">1px edge · bezels, dividers</li>
                <li className="border-b border-np-steel pb-2">1px steel · controls</li>
                <li className="border-b-2 border-np-signal pb-2">2px signal · faults, focus</li>
                <li className="pt-1 font-np-body text-sm text-np-steel">No shadows or glow. Panels separate with 1px bezels, like a monitor wall.</li>
              </ul>
            </Demo>
          </div>
        </Section>

        <Section n={4} title="Components" note="Live: hover, tab to, click and type into them.">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Demo label="Buttons and link">
              <div className="flex flex-wrap items-center gap-3">
                <Button>Generate report</Button>
                <Button variant="secondary">Stop</Button>
                <TextLink href="#section-4">Copy session ID</TextLink>
              </div>
            </Demo>
            <Demo label="Text input and select">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Search vendors" placeholder="Vendor name" />
                <Select label="Category" options={CATEGORIES.map((c) => c.name)} />
              </div>
            </Demo>
            <Demo label="Checkboxes and radios">
              <div className="grid gap-6 sm:grid-cols-2">
                <fieldset>
                  <legend className="mb-2 font-np-mono text-[11px] uppercase tracking-wider text-np-steel">Origins</legend>
                  <div className="flex flex-col gap-2">
                    <Checkbox label="CN · China" defaultChecked />
                    <Checkbox label="VN · Vietnam" defaultChecked />
                    <Checkbox label="BD · Bangladesh" />
                    <Checkbox label="KH · Cambodia" />
                  </div>
                </fieldset>
                <fieldset>
                  <legend className="mb-2 font-np-mono text-[11px] uppercase tracking-wider text-np-steel">Sort by</legend>
                  <div className="flex flex-col gap-2">
                    <Radio name="np-sort" label="Share" defaultChecked />
                    <Radio name="np-sort" label="Freight/u" />
                    <Radio name="np-sort" label="Net margin" />
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
            <Demo label="Segmented tabs · Tab and Enter, or arrow keys">
              <TabsDemo />
            </Demo>
            <Demo label="Card · a category as a monitor panel">
              <PanelCard category={sweaters} />
            </Demo>
            <Demo label="List rows" bare>
              <div className="p-5">
                <VendorRows vendors={[VENDORS[2], VENDORS[6], VENDORS[7]]} />
              </div>
            </Demo>
            <Demo label="Badges">
              <div className="flex flex-wrap items-center gap-2">
                <Badge>Rebalance</Badge>
                <Badge>Renegotiate freight</Badge>
                <Badge>Add origin</Badge>
                <Badge solid>Lead</Badge>
                <Badge>Current</Badge>
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
            <Demo label="Report progress" wide>
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
          <div className="overflow-x-auto rounded-[2px] border border-np-edge bg-np-panel">
            <table className="w-full min-w-[56rem] text-left">
              <thead>
                <tr className="border-b border-np-steel font-np-mono text-[11px] uppercase tracking-wider text-np-steel">
                  <th className="sticky left-0 bg-np-panel px-4 py-3 font-normal">Control</th>
                  {STATES.map((state) => (
                    <th key={state} className="px-4 py-3 font-normal">
                      {state}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-np-edge">
                {STATE_ROWS.map((row) => (
                  <tr key={row.name}>
                    <th className="sticky left-0 bg-np-panel px-4 py-4 font-np-body text-sm font-semibold whitespace-nowrap">{row.name}</th>
                    {STATES.map((state) => (
                      <td key={state} className="px-4 py-4 align-middle">
                        {row.render(state) ?? <span className="font-np-mono text-np-edge">—</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section n={6} title="UI states" note="What each one tells the sourcing manager watching a run.">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Notice tone="empty" title="No scope yet" action={<Button variant="secondary">Pick a category</Button>}>
              Pick a category to compare where it’s made with peers and industry imports.
            </Notice>
            <Notice tone="loading" title="Building origin tables…">
              <ToolSteps
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
            <Notice tone="success" title="Report ready · 8 tables" action={<TextLink href="#section-4">Open report</TextLink>}>
              Women’s knit sweaters · US · {PERIOD}
            </Notice>
          </div>
        </Section>

        <footer className="font-np-mono text-xs text-np-steel">{FICTION_NOTE}</footer>
      </main>
    </div>
  );
}
