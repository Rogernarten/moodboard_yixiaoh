import Link from "next/link";
import { InkFilters, Stamp } from "@/components/manifest/display";
import { manifestUiFonts } from "@/components/manifest/fonts";
import { nightPortUiFonts } from "@/components/night-port/fonts";
import { pinkPaperUiFonts } from "@/components/pink-paper/fonts";
import { FICTION_NOTE } from "@/lib/shiftmap-data";

const STYLES = [
  {
    id: "manifest",
    name: "Manifest",
    keywords: "Kraft · Stamped · Gridded",
    palette: ["#EFE6D2", "#FBF8F1", "#1F2A44", "#6B6455", "#CBBF9F", "#C2352B"],
    aa: "font-mf-stencil font-bold",
    chosen: true,
  },
  {
    id: "pink-paper",
    name: "Pink Paper",
    keywords: "Salmon · Serif · Ruled",
    palette: ["#FFF1E5", "#F7E3D3", "#262A33", "#66605A", "#DCC5B2", "#0F5257"],
    aa: "font-pp-display font-medium",
  },
  {
    id: "night-port",
    name: "Night Port",
    keywords: "Dark · Signal · Live",
    palette: ["#0E1116", "#171B22", "#E6E8EB", "#8B93A1", "#2A303A", "#FFB020"],
    aa: "font-np-display font-bold",
  },
];

const LINK =
  "group flex items-center justify-between gap-4 border border-mf-rule bg-mf-paper p-4 hover:border-mf-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink active:translate-y-px";

function Step({ n, title, note, children }: { n: number; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section aria-labelledby={`step-${n}`} className="border-t-2 border-mf-ink pt-5">
      <h2 id={`step-${n}`} className="flex items-center gap-3 font-mf-condensed text-2xl font-semibold">
        <span className="flex size-7 items-center justify-center border border-mf-ink font-mf-mono text-sm">{n}</span>
        {title}
      </h2>
      {note && <p className="mt-1 pl-10 font-mf-condensed text-mf-umber">{note}</p>}
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function Hub() {
  return (
    <div className={`${manifestUiFonts} ${pinkPaperUiFonts} ${nightPortUiFonts} min-h-screen bg-mf-kraft text-mf-ink`}>
      <InkFilters />
      <main className="mx-auto max-w-5xl space-y-12 px-5 py-10 sm:px-8 sm:py-14">
        <header>
          <p className="font-mf-mono text-xs uppercase tracking-wider text-mf-umber">UI/UX &amp; Visual Design · Assignment 2</p>
          <h1 className="mt-4 font-mf-stencil text-6xl font-bold uppercase leading-none sm:text-8xl">Shiftmap</h1>
          <p className="mt-4 max-w-2xl font-mf-condensed text-lg leading-7">
            A country-of-origin research tool for an own-brand apparel team, explored in three visual
            styles and built in the one that fits sourcing managers best.
          </p>
        </header>

        <Step n={1} title="Mood boards" note="28 artifacts each: photos, type, color, texture and interface pieces.">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STYLES.map((style) => (
              <li key={style.id}>
                <Link href={`/mood-boards/${style.id}`} className={`${LINK} h-full flex-col items-stretch`}>
                  <span className="flex h-6 border border-mf-ink" aria-hidden>
                    {style.palette.map((hex) => (
                      <span key={hex} className="flex-1" style={{ backgroundColor: hex }} />
                    ))}
                  </span>
                  <span className="flex items-end justify-between gap-2">
                    <span>
                      <span className="block font-mf-condensed text-xl font-semibold">{style.name} →</span>
                      <span className="block font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">{style.keywords}</span>
                    </span>
                    {style.chosen && <Stamp tilt={-4}>Chosen</Stamp>}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Step>

        <Step n={2} title="Design systems" note="Each one built from its mood board: color, type, spacing, components and every state.">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {STYLES.map((style) => (
              <li key={style.id}>
                <Link href={`/design-systems/${style.id}`} className={`${LINK} h-full`}>
                  <span className="flex items-baseline gap-3">
                    <span className={`text-4xl leading-none ${style.aa}`} aria-hidden>
                      Aa
                    </span>
                    <span className="font-mf-condensed text-xl font-semibold">{style.name} →</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Step>

        <Step n={3} title="The site" note="Shiftmap in the Manifest style: filter categories, generate a report, open an origin.">
          <Link
            href="/shiftmap"
            className="inline-flex h-12 items-center gap-2 bg-mf-stamp px-6 font-mf-mono text-sm font-semibold uppercase tracking-wider text-mf-paper hover:bg-[#a42c24] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mf-ink active:translate-y-px active:bg-[#8e251e]"
          >
            Open Shiftmap →
          </Link>
        </Step>

        <footer className="border-t border-mf-rule pt-4 font-mf-mono text-xs text-mf-umber">{FICTION_NOTE}</footer>
      </main>
    </div>
  );
}
