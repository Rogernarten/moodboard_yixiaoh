import { Barlow, Barlow_Condensed, Barlow_Semi_Condensed, DotGothic16, JetBrains_Mono } from "next/font/google";

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--next-np-display",
});
const barlowSemi = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["500", "600"],
  variable: "--next-np-label",
});
const barlow = Barlow({ subsets: ["latin"], weight: ["400", "500"], variable: "--next-np-body" });
const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--next-np-mono" });
const dotGothic = DotGothic16({ subsets: ["latin"], weight: "400", variable: "--next-np-dot" });

export const nightPortFonts = [barlowCondensed, barlowSemi, barlow, jetbrainsMono, dotGothic]
  .map((font) => font.variable)
  .join(" ");
