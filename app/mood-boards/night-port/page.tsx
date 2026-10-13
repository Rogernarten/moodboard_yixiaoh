import type { Metadata } from "next";
import Link from "next/link";
import { nightPortFonts } from "./fonts";
import {
  BlueprintGrid,
  Bokeh,
  Buttons,
  DotMatrix,
  KpiTile,
  LensTabs,
  MixBars,
  OriginBoard,
  PhotoSlot,
  Radar,
  Scanlines,
  ShipAtNight,
  ShippingLanes,
  StatusBadges,
  Swatch,
  ToolSteps,
  TypeSample,
} from "./pieces";

export const metadata: Metadata = { title: "Night Port · Mood board" };

type Kind = "Photo" | "Illustration" | "Type" | "Color" | "Texture" | "Interface";

export default function NightPortMoodBoard() {
  // generated: drawn by the agent in SVG or CSS rather than collected
  // wide: spans two monitors; bleed: content runs edge to edge
  const artifacts: {
    kind: Kind;
    title: string;
    content: React.ReactNode;
    generated?: boolean;
    wide?: boolean;
    bleed?: boolean;
  }[] = [
    {
      kind: "Photo",
      title: "Container terminal at night",
      content: <PhotoSlot file="terminal-night.jpg" alt="A container terminal lit at night" query="container terminal night" aspect="2/1" />,
      wide: true,
      bleed: true,
    },
    {
      kind: "Type",
      title: "Signage display",
      content: (
        <TypeSample spec="Barlow Condensed · 700 · Display">
          <p className="font-np-display text-4xl font-bold uppercase leading-none whitespace-nowrap">CN 52% → 32%</p>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Night", content: <Swatch hex="#0E1116" name="Night" role="Background" /> },
    { kind: "Illustration", title: "Radar", content: <Radar />, generated: true, bleed: true },
    { kind: "Interface", title: "Tool activity", content: <ToolSteps /> },
    { kind: "Color", title: "Signal amber", content: <Swatch hex="#FFB020" name="Signal amber" role="Accent · primary action" /> },
    { kind: "Texture", title: "Scanlines", content: <Scanlines />, generated: true, bleed: true },
    {
      kind: "Type",
      title: "Dot-matrix board",
      content: (
        <TypeSample spec="DotGothic16 · 400 · Status boards">
          <p className="font-np-dot text-2xl leading-9 tracking-wider">
            CN +25 OVER
            <br />
            <span className="text-np-steel">VN −13 UNDER</span>
          </p>
        </TypeSample>
      ),
    },
    { kind: "Interface", title: "Origin status board", content: <OriginBoard />, wide: true, bleed: true },
    { kind: "Color", title: "Panel", content: <Swatch hex="#171B22" name="Panel" role="Surface" /> },
    {
      kind: "Photo",
      title: "Control room screens",
      content: <PhotoSlot file="control-room.jpg" alt="A wall of screens in a dark control room" query="control room screens" aspect="4/3" />,
      bleed: true,
    },
    { kind: "Interface", title: "Buttons and link", content: <Buttons /> },
    {
      kind: "Type",
      title: "Mono figures",
      content: (
        <TypeSample spec="JetBrains Mono · 400/500 · Numbers, IDs">
          <p className="font-np-mono text-xl leading-8">
            $1.85/u <span className="text-np-steel">vs</span> $1.21
            <br />
            +$0.64/u <span className="text-np-steel">+53%</span>
          </p>
        </TypeSample>
      ),
    },
    { kind: "Texture", title: "Blueprint grid", content: <BlueprintGrid />, generated: true, bleed: true },
    { kind: "Illustration", title: "Shipping lanes", content: <ShippingLanes />, generated: true, wide: true, bleed: true },
    { kind: "Color", title: "Signal white", content: <Swatch hex="#E6E8EB" name="Signal white" role="Text" /> },
    { kind: "Interface", title: "Tabs and chips", content: <LensTabs /> },
    { kind: "Interface", title: "Net margin tile", content: <KpiTile /> },
    {
      kind: "Type",
      title: "Body",
      content: (
        <TypeSample spec="Barlow · 400 · 16/24 · Body">
          <p className="font-np-body text-base leading-6">
            Comparing with industry imports. 14 vendors in Vietnam and Cambodia already ship this code
            to US brands.
          </p>
        </TypeSample>
      ),
    },
    { kind: "Texture", title: "Harbour bokeh", content: <Bokeh />, generated: true, bleed: true },
    { kind: "Color", title: "Steel", content: <Swatch hex="#8B93A1" name="Steel" role="Muted text" /> },
    { kind: "Illustration", title: "Ship at anchor", content: <ShipAtNight />, generated: true, wide: true, bleed: true },
    { kind: "Interface", title: "Badges", content: <StatusBadges /> },
    {
      kind: "Type",
      title: "Labels",
      content: (
        <TypeSample spec="Barlow Semi Condensed · 600 · Labels, tabs">
          <p className="font-np-label text-sm font-semibold uppercase tracking-[0.16em]">
            Lens · Own brand · Retail peers · Industry
          </p>
        </TypeSample>
      ),
    },
    {
      kind: "Photo",
      title: "Harbour lights",
      content: <PhotoSlot file="harbour-lights.jpg" alt="Long-exposure harbour lights on dark water" query="harbor lights long exposure" aspect="4/3" />,
      bleed: true,
    },
    { kind: "Interface", title: "Origin mix bars", content: <MixBars /> },
    { kind: "Texture", title: "Dot-matrix meter", content: <DotMatrix />, generated: true, bleed: true },
    { kind: "Color", title: "Edge", content: <Swatch hex="#2A303A" name="Edge" role="Border" /> },
  ];

  return (
    <div className={`${nightPortFonts} min-h-screen bg-np-night text-np-signal`}>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <header>
          <div className="flex items-center justify-between font-np-mono text-xs uppercase tracking-wider text-np-steel">
            <Link
              href="/"
              className="text-np-signal underline decoration-np-edge underline-offset-4 hover:decoration-np-signal focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-np-signal"
            >
              ← Hub
            </Link>
            <span>Mood board 3 / 3</span>
          </div>
          <h1 className="mt-8 font-np-display text-7xl font-bold uppercase leading-none tracking-tight sm:text-9xl">
            Night Port
          </h1>
          <p className="mt-4 font-np-mono text-sm uppercase tracking-[0.2em] text-np-steel">Dark · Signal · Live</p>
          <p className="mt-4 max-w-2xl font-np-body text-lg leading-7 text-np-steel">
            The port control room at 3 a.m.: near-black screens, one amber signal, monospaced figures
            and shipping lanes. Precise and live, with nothing decorative.
          </p>
          <p className="mt-6 font-np-mono text-xs text-np-steel">
            {artifacts.length} artifacts: photos, illustrations, type, color, texture and interface
            pieces · ✦ drawn by the agent in code
          </p>
        </header>

        <ol className="mt-10 grid grid-flow-dense grid-cols-1 gap-px border border-np-edge bg-np-edge sm:grid-cols-2 lg:grid-cols-4">
          {artifacts.map((artifact, i) => (
            <li
              key={artifact.title}
              className={`flex flex-col bg-np-night ${artifact.wide ? "sm:col-span-2" : ""}`}
            >
              <figure className="flex flex-1 flex-col">
                <figcaption className="flex items-center justify-between gap-3 border-b border-np-edge px-3 py-1.5 font-np-mono text-[10px] uppercase tracking-wider text-np-steel">
                  <span className="whitespace-nowrap">
                    <span className="text-np-signal">CH {String(i + 1).padStart(2, "0")}</span> · {artifact.kind}
                  </span>
                  <span className="truncate">
                    {artifact.title}
                    {artifact.generated && <span className="text-np-signal"> ✦</span>}
                  </span>
                </figcaption>
                <div className={`flex flex-1 items-center ${artifact.bleed ? "" : "p-5"}`}>{artifact.content}</div>
              </figure>
            </li>
          ))}
        </ol>

        <footer className="mt-6 font-np-mono text-xs text-np-steel">
          Shiftmap, Northfold and all figures are fictional.
        </footer>
      </main>
    </div>
  );
}
