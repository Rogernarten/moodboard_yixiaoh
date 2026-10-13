import { IBM_Plex_Mono, IBM_Plex_Sans_Condensed, Saira_Stencil } from "next/font/google";

// Manifest design system: three families, down from five on the mood board.
const display = Saira_Stencil({
  subsets: ["latin"],
  variable: "--next-mf-stencil",
  adjustFontFallback: false,
});
const sans = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-mf-condensed",
});
const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-mf-mono",
});

export const manifestUiFonts = [display, sans, mono].map((font) => font.variable).join(" ");
