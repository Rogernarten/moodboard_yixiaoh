import type { Metadata } from "next";
import { InkFilters } from "@/components/manifest/display";
import { manifestUiFonts } from "@/components/manifest/fonts";
import { ShiftmapApp } from "./shiftmap-app";

export const metadata: Metadata = {
  title: "Shiftmap · Where Northfold makes it, and where it should move",
};

export default function ShiftmapPage() {
  return (
    <div className={`${manifestUiFonts} min-h-screen bg-mf-kraft text-mf-ink`}>
      <InkFilters />
      <ShiftmapApp />
    </div>
  );
}
