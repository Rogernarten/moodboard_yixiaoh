import { Newsreader, Source_Sans_3, Source_Serif_4 } from "next/font/google";

// Pink Paper design system: three families, down from four on the mood board.
const display = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--next-pp-display" });
const serif = Source_Serif_4({ subsets: ["latin"], style: ["normal", "italic"], variable: "--next-pp-serif" });
const sans = Source_Sans_3({ subsets: ["latin"], variable: "--next-pp-sans" });

export const pinkPaperUiFonts = [display, serif, sans].map((font) => font.variable).join(" ");
