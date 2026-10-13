import Link from "next/link";

type HubLink = { label: string; href?: string };

const sections: { title: string; note?: string; links: HubLink[] }[] = [
  {
    title: "Mood boards",
    links: [
      { label: "Manifest", href: "/mood-boards/manifest" },
      { label: "Pink Paper", href: "/mood-boards/pink-paper" },
      { label: "Night Port", href: "/mood-boards/night-port" },
    ],
  },
  {
    title: "Design systems",
    note: "Each one built from its mood board",
    links: [
      { label: "Manifest", href: "/design-systems/manifest" },
      { label: "Pink Paper", href: "/design-systems/pink-paper" },
      { label: "Night Port", href: "/design-systems/night-port" },
    ],
  },
  {
    title: "The site",
    links: [{ label: "Open Shiftmap", href: "/shiftmap" }],
  },
];

export default function Hub() {
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-16 sm:py-24">
      <p className="text-sm text-stone-500">UI/UX &amp; Visual Design · Assignment 2</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">Shiftmap</h1>
      <p className="mt-3 max-w-xl text-lg text-stone-600">
        A country-of-origin research assistant for an own-brand apparel team, explored in three
        visual styles.
      </p>

      <ol className="mt-14 space-y-10">
        {sections.map((section, i) => (
          <li key={section.title} className="border-t border-stone-200 pt-6">
            <h2 className="flex items-baseline gap-3 text-xs font-semibold uppercase tracking-widest text-stone-500">
              <span className="font-mono text-stone-900">{i + 1}</span>
              {section.title}
            </h2>
            {section.note && <p className="mt-1 pl-6 text-sm text-stone-500">{section.note}</p>}
            <ul className="mt-4 flex flex-wrap gap-x-8 gap-y-3 pl-6">
              {section.links.map((link) =>
                link.href ? (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-lg font-medium underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-stone-900"
                    >
                      {link.label} →
                    </Link>
                  </li>
                ) : (
                  <li key={link.label} className="text-lg text-stone-400">
                    {link.label} <span className="text-xs uppercase tracking-wide">soon</span>
                  </li>
                ),
              )}
            </ul>
          </li>
        ))}
      </ol>

      <p className="mt-16 text-xs text-stone-500">
        Shiftmap, Northfold and all figures are fictional.
      </p>
    </main>
  );
}
