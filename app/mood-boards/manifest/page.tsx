import type { Metadata } from "next";
import Link from "next/link";
import { manifestFonts } from "./fonts";
import {
  Buttons,
  CarbonCopy,
  InkFilters,
  KraftGrain,
  LadingFields,
  LedgerGrid,
  MixBars,
  PerforatedEdge,
  PhotoSlot,
  RecommendationStamps,
  Swatch,
  TypeSample,
  VendorRows,
} from "./pieces";

export const metadata: Metadata = { title: "Manifest · Mood board" };

type Kind = "Photo" | "Type" | "Color" | "Texture" | "Interface";

export default function ManifestMoodBoard() {
  const artifacts: { kind: Kind; title: string; content: React.ReactNode }[] = [
    {
      kind: "Photo",
      title: "Container yard from above",
      content: <PhotoSlot file="container-yard.jpg" alt="Container yard seen from above" query="container yard aerial drone" aspect="3/2" />,
    },
    {
      kind: "Type",
      title: "Stencil display",
      content: (
        <TypeSample spec="Saira Stencil · 700 · Display">
          <p className="font-mf-stencil text-6xl font-bold leading-none">CN → VN</p>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Kraft", content: <Swatch hex="#EFE6D2" name="Kraft" role="Background" /> },
    { kind: "Interface", title: "Recommendation stamps", content: <RecommendationStamps /> },
    {
      kind: "Photo",
      title: "Rubber stamp on a document",
      content: <PhotoSlot file="rubber-stamp.jpg" alt="A wooden rubber stamp resting on a printed document" query="rubber stamp ink" aspect="1600/1240" />,
    },
    { kind: "Texture", title: "Kraft paper grain", content: <KraftGrain /> },
    {
      kind: "Type",
      title: "Mono figures",
      content: (
        <TypeSample spec="IBM Plex Mono · 400/600 · Numbers, codes">
          <div className="space-y-1 font-mf-mono text-xl tabular-nums">
            <p>
              <span className="font-semibold">$1.85/u</span> vs $1.21
            </p>
            <p className="font-semibold">−410 bps</p>
            <p className="text-mf-umber">HTS 6110.20</p>
          </div>
        </TypeSample>
      ),
    },
    {
      kind: "Color",
      title: "Stamp red",
      content: <Swatch hex="#C2352B" name="Stamp red" role="Accent · primary action" />,
    },
    {
      kind: "Photo",
      title: "Gantry cranes at dusk",
      content: <PhotoSlot file="cranes-dusk.jpg" alt="Port gantry cranes at dusk" query="port gantry crane" aspect="1584/1600" />,
    },
    { kind: "Interface", title: "Boxed record fields", content: <LadingFields /> },
    { kind: "Color", title: "Ink navy", content: <Swatch hex="#1F2A44" name="Ink navy" role="Text" /> },
    { kind: "Texture", title: "Carbon copy", content: <CarbonCopy /> },
    {
      kind: "Photo",
      title: "Stack of paperwork",
      content: <PhotoSlot file="paper-stack.jpg" alt="A tall stack of papers and envelopes" query="manila folders" aspect="2/3" />,
    },
    {
      kind: "Type",
      title: "Condensed stencil headline",
      content: (
        <TypeSample spec="Big Shoulders Stencil · 800 · Section heads">
          <p className="font-mf-shoulders text-5xl font-extrabold uppercase leading-none tracking-wide">
            Bill of lading
          </p>
        </TypeSample>
      ),
    },
    { kind: "Interface", title: "Origin mix bars", content: <MixBars /> },
    {
      kind: "Color",
      title: "Carbon white",
      content: <Swatch hex="#FBF8F1" name="Carbon white" role="Surface" />,
    },
    {
      kind: "Photo",
      title: "Carbon-copy receipt book",
      content: <PhotoSlot file="carbon-receipt.jpg" alt="A carbon-copy receipt book" query="carbon copy invoice book" aspect="4/3" />,
    },
    { kind: "Texture", title: "Perforated tear-off", content: <PerforatedEdge /> },
    {
      kind: "Type",
      title: "Condensed body",
      content: (
        <TypeSample spec="IBM Plex Sans Condensed · 400 · 16/24 · Body">
          <p className="font-mf-condensed text-base leading-6">
            The industry already moved: Vietnam is the #1 origin for this code at 31%, while
            Northfold buys 18% there.
          </p>
        </TypeSample>
      ),
    },
    {
      kind: "Color",
      title: "Faded umber",
      content: <Swatch hex="#6B6455" name="Faded umber" role="Muted text" />,
    },
    {
      kind: "Photo",
      title: "Container door data plate",
      content: (
        <PhotoSlot file="door-data-plate.jpg" alt="Stenciled weight and capacity figures on a container door" query="shipping container doors" aspect="823/1556" />
      ),
    },
    { kind: "Interface", title: "Buttons and link", content: <Buttons /> },
    { kind: "Texture", title: "Ledger rules", content: <LedgerGrid /> },
    {
      kind: "Photo",
      title: "Clipboard with a handwritten log",
      content: (
        <PhotoSlot file="clipboard-log.jpg" alt="A clipboard holding a handwritten log sheet" query="clipboard paperwork warehouse" aspect="3/4" />
      ),
    },
    {
      kind: "Type",
      title: "Typewriter notes",
      content: (
        <TypeSample spec="Special Elite · 400 · Annotations">
          <p className="font-mf-typewriter text-lg leading-7">
            Shipper: Jade Harbor Apparel
            <br />
            Origin: CN · 738K units
          </p>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Rule line", content: <Swatch hex="#CBBF9F" name="Rule line" role="Border" /> },
    { kind: "Interface", title: "Vendor lead rows", content: <VendorRows /> },
    {
      kind: "Photo",
      title: "Folded knit sweaters",
      content: <PhotoSlot file="knit-sweaters.jpg" alt="A stack of folded knit sweaters" query="folded knit sweaters" aspect="2/3" />,
    },
  ];

  return (
    <div className={`${manifestFonts} min-h-screen bg-mf-kraft text-mf-ink`}>
      <InkFilters />
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-14">
        <header className="border-b-2 border-mf-ink pb-8">
          <div className="flex items-center justify-between font-mf-mono text-xs uppercase tracking-wider">
            <Link
              href="/"
              className="underline decoration-mf-rule underline-offset-4 hover:decoration-mf-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-mf-ink"
            >
              ← Hub
            </Link>
            <span className="text-mf-umber">Mood board 1 / 3</span>
          </div>
          <h1 className="mt-8 font-mf-stencil text-6xl font-bold uppercase leading-none sm:text-8xl lg:text-9xl">
            Manifest
          </h1>
          <p className="mt-4 font-mf-mono text-sm uppercase tracking-[0.2em]">Kraft · Stamped · Gridded</p>
          <p className="mt-4 max-w-2xl font-mf-condensed text-lg leading-7">
            A bill of lading on a sourcing desk: kraft paper, carbon copies, numbered boxes and
            rubber stamps. Practical and tactile, with nothing for show.
          </p>
          <p className="mt-6 font-mf-mono text-xs text-mf-umber">
            {artifacts.length} artifacts: photos, type, color, texture and interface pieces
          </p>
        </header>

        <ol className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 xl:columns-4">
          {artifacts.map((artifact, i) => (
            <li key={artifact.title} className="mb-5 break-inside-avoid">
              <figure>
                {artifact.content}
                <figcaption className="mt-1.5 flex gap-2 font-mf-mono text-[11px] uppercase tracking-wider text-mf-umber">
                  <span className="text-mf-ink">{String(i + 1).padStart(2, "0")}</span>
                  <span>{artifact.kind}</span>
                  <span>·</span>
                  <span>{artifact.title}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

        <footer className="mt-10 border-t border-mf-rule pt-4 font-mf-mono text-xs text-mf-umber">
          Shiftmap, Northfold and all figures are fictional.
        </footer>
      </main>
    </div>
  );
}
