"use client";

import { useState } from "react";
import { Button, Chip, DetailPanel, Tabs, Toggle } from "@/components/manifest/controls";
import { MixBar } from "@/components/manifest/display";
import { BRAND_LINES, CATEGORIES, LENSES, SWEATER_COUNTRIES, type Lens } from "@/lib/shiftmap-data";

const sweaters = CATEGORIES[0];

export function TabsDemo() {
  const [lens, setLens] = useState<Lens>("own");
  return (
    <div>
      <Tabs label="Lens" items={LENSES} value={lens} onChange={setLens} />
      <div role="tabpanel" className="border-x border-b border-mf-ink bg-mf-paper p-4">
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
        Open CN detail
      </Button>
      <DetailPanel open={open} onClose={() => setOpen(false)} eyebrow="Women’s knit sweaters · Own brand" title="CN · China">
      <dl className="grid grid-cols-2 border-t border-l border-mf-ink font-mf-mono text-sm tabular-nums">
        {[
          ["Share now → after shift", `${cn.share}% → ${cn.afterShift}%`],
          ["Units", cn.units],
          ["Freight/u vs peers", `$${cn.freightOwn.toFixed(2)} vs $${cn.freightPeers?.toFixed(2)}`],
          ["Net margin", `${cn.netMargin}%`],
        ].map(([label, value]) => (
          <div key={label} className="border-r border-b border-mf-ink p-2">
            <dt className="text-[10px] uppercase tracking-wider text-mf-umber">{label}</dt>
            <dd className="mt-0.5">{value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 font-mf-condensed">
        Top vendor: <span className="font-semibold">{cn.topVendor?.name}</span> ({cn.topVendor?.share}% of CN)
      </p>
      </DetailPanel>
    </>
  );
}
