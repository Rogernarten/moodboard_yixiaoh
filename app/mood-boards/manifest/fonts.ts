import {
  Big_Shoulders_Stencil,
  IBM_Plex_Mono,
  IBM_Plex_Sans_Condensed,
  Saira_Stencil,
  Special_Elite,
} from "next/font/google";

const sairaStencil = Saira_Stencil({
  subsets: ["latin"],
  variable: "--next-mf-stencil",
  adjustFontFallback: false,
});
const bigShoulders = Big_Shoulders_Stencil({ subsets: ["latin"], variable: "--next-mf-shoulders" });
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-mf-mono",
});
const plexCondensed = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--next-mf-condensed",
});
const specialElite = Special_Elite({
  subsets: ["latin"],
  weight: "400",
  variable: "--next-mf-typewriter",
});

export const manifestFonts = [sairaStencil, bigShoulders, plexMono, plexCondensed, specialElite]
  .map((font) => font.variable)
  .join(" ");
