import type { Metadata } from "next";
import Link from "next/link";
import { pinkPaperFonts } from "./fonts";
import {
  Buttons,
  ColumnGrid,
  FoldCrease,
  Halftone,
  HeadlineBlock,
  Masthead,
  OriginTable,
  PhotoSlot,
  RecommendationTags,
  ShowThrough,
  SlopeChart,
  SmallMultiples,
  Swatch,
  TypeSample,
  WhatToDo,
} from "./pieces";

export const metadata: Metadata = { title: "Pink Paper · Mood board" };

type Kind = "Photo" | "Type" | "Color" | "Texture" | "Interface";

export default function PinkPaperMoodBoard() {
  // generated: drawn by the agent in SVG or CSS rather than collected
  const artifacts: { kind: Kind; title: string; content: React.ReactNode; generated?: boolean }[] = [
    { kind: "Interface", title: "Report masthead", content: <Masthead /> },
    {
      kind: "Type",
      title: "Display figures",
      content: (
        <TypeSample spec="Newsreader · 500 · Display">
          <p className="font-pp-display text-6xl font-medium leading-none tracking-tight">−410 bps</p>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Salmon newsprint", content: <Swatch hex="#FFF1E5" name="Salmon newsprint" role="Background" /> },
    { kind: "Interface", title: "Headline, standfirst and byline", content: <HeadlineBlock /> },
    { kind: "Texture", title: "Show-through", content: <ShowThrough />, generated: true },
    {
      kind: "Photo",
      title: "Printing press",
      content: <PhotoSlot file="printing-press.jpg" alt="Rollers of a printing press" query="printing press" aspect="3/4" />,
    },
    {
      kind: "Type",
      title: "Kicker",
      content: (
        <TypeSample spec="Libre Franklin · 600 · Kickers, labels">
          <p className="font-pp-kicker text-sm font-semibold uppercase tracking-[0.18em]">
            Sourcing · Knitwear · US
          </p>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Press ink", content: <Swatch hex="#262A33" name="Press ink" role="Text" /> },
    { kind: "Interface", title: "Ruled data table", content: <OriginTable /> },
    {
      kind: "Type",
      title: "Pull quote",
      content: (
        <TypeSample spec="Newsreader · 500 · Pull quote">
          <p className="font-pp-display text-3xl font-medium leading-tight tracking-tight">
            <span className="-ml-3 text-pp-graphite">“</span>The industry already moved.”
          </p>
        </TypeSample>
      ),
    },
    { kind: "Texture", title: "Halftone screen", content: <Halftone />, generated: true },
    {
      kind: "Type",
      title: "Italic standfirst",
      content: (
        <TypeSample spec="Newsreader Italic · 400 · Standfirst">
          <p className="font-pp-display text-2xl italic leading-snug">
            Vietnam is now the top origin for this code.
          </p>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Deep teal", content: <Swatch hex="#0F5257" name="Deep teal" role="Accent · primary action" /> },
    { kind: "Interface", title: "Slope chart", content: <SlopeChart /> },
    {
      kind: "Photo",
      title: "Reading glasses on a report",
      content: <PhotoSlot file="reading-glasses.jpg" alt="Reading glasses resting on printed pages" query="reading glasses paper" aspect="4/3" />,
    },
    { kind: "Color", title: "Sidebar tint", content: <Swatch hex="#F7E3D3" name="Sidebar tint" role="Surface" /> },
    { kind: "Texture", title: "Column grid", content: <ColumnGrid />, generated: true },
    {
      kind: "Type",
      title: "Serif body with drop cap",
      content: (
        <TypeSample spec="Source Serif 4 · 400 · 17/28 · Body">
          <p className="font-pp-serif text-[17px] leading-7">
            <span className="float-left mr-2 font-pp-display text-[56px] font-medium leading-[0.85]">T</span>
            he industry already moved: Vietnam is the #1 origin for this code at 31%, while Northfold
            buys 18% there. The capacity exists: 14 vendors in Vietnam and Cambodia already ship it to
            US brands.
          </p>
        </TypeSample>
      ),
    },
    {
      kind: "Photo",
      title: "Letterpress type",
      content: <PhotoSlot file="letterpress.jpg" alt="Trays of metal letterpress type" query="letterpress type" aspect="3/2" />,
    },
    { kind: "Interface", title: "What-to-do sidebar", content: <WhatToDo /> },
    { kind: "Color", title: "Graphite", content: <Swatch hex="#66605A" name="Graphite" role="Muted text" /> },
    {
      kind: "Photo",
      title: "Pen on a printout",
      content: <PhotoSlot file="pen-printout.jpg" alt="A pen marking up a printed page" query="pen annotating document" aspect="4/5" />,
    },
    { kind: "Texture", title: "Fold crease", content: <FoldCrease />, generated: true },
    {
      kind: "Type",
      title: "Tabular figures",
      content: (
        <TypeSample spec="Source Sans 3 · 400/600 · Tabular figures">
          <table className="w-full font-pp-sans text-lg tabular-nums">
            <tbody>
              {[
                ["$29.8M", "1.42M", "3.3%"],
                ["$18.9M", "1.65M", "6.8%"],
                ["$36.5M", "4.10M", "9.2%"],
              ].map((row) => (
                <tr key={row[0]}>
                  {row.map((cell) => (
                    <td key={cell} className="text-right first:font-semibold">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </TypeSample>
      ),
    },
    { kind: "Color", title: "Hairline", content: <Swatch hex="#DCC5B2" name="Hairline" role="Border" /> },
    { kind: "Interface", title: "Small multiples", content: <SmallMultiples /> },
    { kind: "Interface", title: "Buttons and link", content: <Buttons /> },
    { kind: "Interface", title: "Recommendation tags", content: <RecommendationTags /> },
  ];

  return (
    <div className={`${pinkPaperFonts} min-h-screen bg-pp-salmon text-pp-ink`}>
      <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8 sm:py-10">
        <header>
          <div className="flex items-center justify-between font-pp-sans text-xs uppercase tracking-wider">
            <Link
              href="/"
              className="underline decoration-pp-rule underline-offset-4 hover:decoration-pp-ink focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pp-ink"
            >
              ← Hub
            </Link>
            <span className="text-pp-graphite">Mood board 2 / 3</span>
          </div>
          <h1 className="mt-6 text-center font-pp-display text-6xl font-medium leading-none tracking-tight sm:text-8xl lg:text-[9rem]">
            Pink Paper
          </h1>
          <div className="mt-6 flex flex-col gap-1 border-t border-b-4 border-double border-pp-ink py-2 font-pp-sans text-xs uppercase tracking-wider sm:flex-row sm:justify-between">
            <span className="font-semibold">Salmon · Serif · Ruled</span>
            <span className="text-pp-graphite">
              {artifacts.length} artifacts: photos, type, color, texture and interface pieces · ✦ drawn by
              the agent in code
            </span>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center font-pp-display text-xl italic leading-snug text-pp-graphite">
            The Monday business pages: salmon newsprint, serif headlines, hairline rules and small,
            exact charts. Calm authority, numbers first.
          </p>
        </header>

        <ol className="mt-10 columns-1 gap-8 [column-rule:1px_solid_var(--color-pp-rule)] sm:columns-2 lg:columns-3 xl:columns-4">
          {artifacts.map((artifact, i) => (
            <li key={artifact.title} className="mb-8 break-inside-avoid">
              <figure>
                {artifact.content}
                <figcaption className="mt-2 font-pp-serif text-[13px] italic leading-snug text-pp-graphite">
                  <span className="mr-1.5 font-pp-sans text-[11px] font-semibold not-italic tracking-wider text-pp-ink">
                    FIG. {String(i + 1).padStart(2, "0")}
                  </span>
                  {artifact.kind} — {artifact.title}
                  {artifact.generated && <span className="not-italic text-pp-ink"> ✦</span>}
                </figcaption>
              </figure>
            </li>
          ))}
        </ol>

        <footer className="mt-4 border-t border-pp-ink pt-3 font-pp-sans text-xs text-pp-graphite">
          Shiftmap, Northfold and all figures are fictional.
        </footer>
      </main>
    </div>
  );
}
