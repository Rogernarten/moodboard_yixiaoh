import { Libre_Franklin, Newsreader, Source_Sans_3, Source_Serif_4 } from "next/font/google";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--next-pp-display",
});
const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--next-pp-serif",
});
const sourceSans = Source_Sans_3({ subsets: ["latin"], variable: "--next-pp-sans" });
const libreFranklin = Libre_Franklin({ subsets: ["latin"], variable: "--next-pp-kicker" });

export const pinkPaperFonts = [newsreader, sourceSerif, sourceSans, libreFranklin]
  .map((font) => font.variable)
  .join(" ");
