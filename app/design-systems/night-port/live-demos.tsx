"use client";

import { useState } from "react";
import { Button, Chip, DetailPanel, Tabs, Toggle } from "@/components/night-port/controls";
import { MixBar } from "@/components/night-port/display";
import { BRAND_LINES, CATEGORIES, LENSES, SWEATER_COUNTRIES, type Lens } from "@/lib/shiftmap-data";

const sweaters = CATEGORIES[0];

export function TabsDemo() {
  const [lens, setLens] = useState<Lens>("own");
  return (
    <div>
      <Tabs label="Lens" items={LENSES} value={lens} onChange={setLens} />
      <div role="tabpanel" className="mt-4">
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
      <DetailPanel open={open} onClose={() => setOpen(false)} channel="Women’s knit sweaters · Own brand" title="CN · China">
        <p className="font-np-mono text-4xl font-medium tracking-tight">
          {cn.share}% <span className="text-np-steel">→</span> {cn.afterShift}%
        </p>
        <p className="font-np-mono text-[11px] uppercase tracking-wider text-np-steel">Share of units, now → after shift</p>
        <dl className="mt-4 grid grid-cols-2 gap-px rounded-[2px] border border-np-edge bg-np-edge font-np-mono text-sm tabular-nums">
          {[
            ["Units", cn.units],
            ["Net margin", `${cn.netMargin.toFixed(1)}%`],
            ["Freight/u", `$${cn.freightOwn.toFixed(2)}`],
            ["Peers", `$${cn.freightPeers?.toFixed(2)}`],
          ].map(([label, value]) => (
            <div key={label} className="bg-np-panel p-2.5">
              <dt className="text-[10px] uppercase tracking-wider text-np-steel">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-4 font-np-body">
          Top vendor: <span className="font-semibold">{cn.topVendor?.name}</span>{" "}
          <span className="text-np-steel">({cn.topVendor?.share}% of CN)</span>
        </p>
      </DetailPanel>
    </>
  );
}
