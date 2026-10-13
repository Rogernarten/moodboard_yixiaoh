"use client";

import { useState } from "react";
import { Button, Chip, DetailPanel, Tabs, Toggle } from "@/components/pink-paper/controls";
import { MixBar } from "@/components/pink-paper/display";
import { BRAND_LINES, CATEGORIES, LENSES, SWEATER_COUNTRIES, type Lens } from "@/lib/shiftmap-data";

const sweaters = CATEGORIES[0];

export function TabsDemo() {
  const [lens, setLens] = useState<Lens>("own");
  return (
    <div>
      <Tabs label="Lens" items={LENSES} value={lens} onChange={setLens} />
      <div role="tabpanel" className="pt-4">
        <MixBar mix={sweaters.mix} lenses={[lens]} />
      </div>
    </div>
  );
}

export function ChipsDemo() {
  const [selected, setSelected] = useState<string[]>(["Northfold Women"]);
  const toggle = (line: string) =>
    setSelected((current) => (current.includes(line) ? current.filter((l) => l !== line) : [...current, line]));
  return (
    <div className="flex flex-wrap gap-2">
      <Chip selected={selected.length === 0} onClick={() => setSelected([])}>
        All
      </Chip>
      {BRAND_LINES.map((line) => (
        <Chip key={line} selected={selected.includes(line)} onClick={() => toggle(line)}>
          {line.replace("Northfold ", "")}
        </Chip>
      ))}
    </div>
  );
}

export function ToggleDemo() {
  const [on, setOn] = useState(true);
  return <Toggle label="Active items only" checked={on} onChange={setOn} />;
}

export function DetailDemo() {
  const cn = SWEATER_COUNTRIES[0];
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Open China detail
      </Button>
      <DetailPanel open={open} onClose={() => setOpen(false)} kicker="Women’s knit sweaters · Own brand" title="China carries 52% of units">
        <p className="font-pp-serif text-lg italic leading-snug text-pp-graphite">
          The shift takes it to {cn.afterShift}%. Freight/u is ${cn.freightOwn.toFixed(2)} against ${cn.freightPeers?.toFixed(2)} for peers.
        </p>
        <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 border-t-2 border-pp-ink pt-3 font-pp-sans tabular-nums">
          {[
            ["Units", cn.units],
            ["Net margin", `${cn.netMargin.toFixed(1)}%`],
            ["Top vendor", cn.topVendor?.name ?? "—"],
            ["Its share of CN", `${cn.topVendor?.share}%`],
          ].map(([label, value]) => (
            <div key={label} className="border-b border-pp-rule pb-2">
              <dt className="text-xs uppercase tracking-[0.1em] text-pp-graphite">{label}</dt>
              <dd className="text-[15px] font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </DetailPanel>
    </>
  );
}
