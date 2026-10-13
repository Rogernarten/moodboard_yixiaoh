import { Barlow, Barlow_Condensed, JetBrains_Mono } from "next/font/google";

// Night Port design system: three families, down from five on the mood board.
const display = Barlow_Condensed({ subsets: ["latin"], weight: ["600", "700"], variable: "--next-np-display" });
const body = Barlow({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--next-np-body" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--next-np-mono" });

export const nightPortUiFonts = [display, body, mono].map((font) => font.variable).join(" ");
