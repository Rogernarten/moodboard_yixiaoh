// Fictional sample data from shiftmap-brief.md §6. Use only these names and numbers.

export type Origin = "CN" | "VN" | "BD" | "KH" | "ID" | "IN" | "GT" | "Other";
export type Recommendation = "Rebalance" | "Renegotiate freight" | "Add origin";
export type Lens = "own" | "peers" | "industry";

export const LENSES: { id: Lens; label: string }[] = [
  { id: "own", label: "Own brand" },
  { id: "peers", label: "Retail peers" },
  { id: "industry", label: "Industry imports" },
];

export const ORIGIN_NAMES: Record<Origin, string> = {
  CN: "China",
  VN: "Vietnam",
  BD: "Bangladesh",
  KH: "Cambodia",
  ID: "Indonesia",
  IN: "India",
  GT: "Guatemala",
  Other: "Other",
};

export type Category = {
  id: string;
  name: string;
  brandLine: string;
  hts: string;
  sales: string;
  units: string;
  netMargin: { own: number; peers: number; gapBps: number };
  freight: { own: number; peers: number };
  recommendation: Recommendation;
  action: string;
  mix: Record<Lens, Partial<Record<Origin, number>>>;
};

export const CATEGORIES: Category[] = [
  {
    id: "sweaters",
    name: "Women’s knit sweaters",
    brandLine: "Northfold Women",
    hts: "6110.20",
    sales: "$29.8M",
    units: "1.42M",
    netMargin: { own: 3.3, peers: 7.4, gapBps: -410 },
    freight: { own: 1.85, peers: 1.21 },
    recommendation: "Rebalance",
    action: "CN→VN 12 pts, CN→KH 8 pts",
    mix: {
      own: { CN: 52, VN: 18, BD: 12, KH: 8, Other: 10 },
      peers: { CN: 30, VN: 34, BD: 14, KH: 12, Other: 10 },
      industry: { CN: 27, VN: 31, BD: 16, KH: 12, Other: 14 },
    },
  },
  {
    id: "leggings",
    name: "Women’s leggings",
    brandLine: "Northfold Active",
    hts: "6104.63",
    sales: "$18.9M",
    units: "1.65M",
    netMargin: { own: 6.8, peers: 8.1, gapBps: -130 },
    freight: { own: 0.98, peers: 0.71 },
    recommendation: "Renegotiate freight",
    action: "VN lane $1.08 vs $0.66/u",
    mix: {
      own: { CN: 38, VN: 30, KH: 17, ID: 9, Other: 6 },
      peers: { VN: 33, CN: 27, KH: 16, ID: 10, Other: 14 },
      industry: { VN: 29, CN: 26, KH: 15, ID: 12, Other: 18 },
    },
  },
  {
    id: "tees",
    name: "Crew-neck tees",
    brandLine: "Northfold Basics",
    hts: "6109.10",
    sales: "$36.5M",
    units: "4.10M",
    netMargin: { own: 9.2, peers: 10.0, gapBps: -80 },
    freight: { own: 0.64, peers: 0.52 },
    recommendation: "Add origin",
    action: "Test Guatemala for ~10 pts",
    mix: {
      own: { BD: 34, CN: 28, VN: 20, IN: 12, Other: 6 },
      peers: { BD: 30, CN: 20, VN: 18, GT: 12, IN: 10, Other: 10 },
      industry: { BD: 25, GT: 17, CN: 15, VN: 14, IN: 11, Other: 18 },
    },
  },
  {
    id: "jackets",
    name: "Men’s down jackets",
    brandLine: "Northfold Men",
    hts: "6201.40",
    sales: "$22.1M",
    units: "0.31M",
    netMargin: { own: 1.9, peers: 6.6, gapBps: -470 },
    freight: { own: 4.4, peers: 3.05 },
    recommendation: "Rebalance",
    action: "CN→VN 12 pts",
    mix: {
      own: { CN: 71, VN: 19, Other: 10 },
      peers: { CN: 55, VN: 28, KH: 7, Other: 10 },
      industry: { CN: 48, VN: 31, KH: 9, Other: 12 },
    },
  },
];

export const BRAND_LINES = ["Northfold Women", "Northfold Active", "Northfold Basics", "Northfold Men"];

/* §6.3 — sweaters by country, own brand */
export type CountryRow = {
  origin: Origin;
  share: number;
  units: string;
  freightOwn: number;
  freightPeers?: number;
  netMargin: number;
  topVendor?: { name: string; share: number };
  afterShift: number;
};

export const SWEATER_COUNTRIES: CountryRow[] = [
  { origin: "CN", share: 52, units: "738K", freightOwn: 2.05, freightPeers: 1.38, netMargin: 1.8, topVendor: { name: "Jade Harbor Apparel", share: 61 }, afterShift: 32 },
  { origin: "VN", share: 18, units: "256K", freightOwn: 1.52, freightPeers: 1.05, netMargin: 6.2, topVendor: { name: "Lotus Bay Knitwear", share: 74 }, afterShift: 30 },
  { origin: "BD", share: 12, units: "170K", freightOwn: 1.71, freightPeers: 1.2, netMargin: 4.0, topVendor: { name: "Delta Loom Industries", share: 100 }, afterShift: 12 },
  { origin: "KH", share: 8, units: "114K", freightOwn: 1.48, freightPeers: 1.1, netMargin: 6.9, topVendor: { name: "Angkor Thread Ltd.", share: 100 }, afterShift: 16 },
  { origin: "Other", share: 10, units: "142K", freightOwn: 1.9, netMargin: 2.5, afterShift: 10 },
];

export const SWEATER_INDUSTRY_IMPORTS = "$4.2B";

export const WHY_SHIFT = [
  "The industry already moved: Vietnam is the #1 origin for this code at 31%, while Northfold buys 18% there.",
  "The capacity exists: 14 vendors in Vietnam and Cambodia already ship this code to US brands.",
  "It pays: estimated landed cost per unit falls by about 5% after the shift.",
];

/* §6.4 — vendors */
export type Vendor = {
  name: string;
  origin: Origin;
  status: "Current supplier" | "Lead";
  category: string;
  shipments?: string;
};

export const VENDORS: Vendor[] = [
  { name: "Jade Harbor Apparel", origin: "CN", status: "Current supplier", category: "Sweaters" },
  { name: "Seastar Textiles", origin: "CN", status: "Current supplier", category: "Down jackets" },
  { name: "Lotus Bay Knitwear", origin: "VN", status: "Current supplier", category: "Sweaters" },
  { name: "Delta Loom Industries", origin: "BD", status: "Current supplier", category: "Sweaters, tees" },
  { name: "Angkor Thread Ltd.", origin: "KH", status: "Current supplier", category: "Sweaters" },
  { name: "Coral Line Mills", origin: "ID", status: "Current supplier", category: "Leggings" },
  { name: "Red River Garment Co.", origin: "VN", status: "Lead", category: "Sweaters", shipments: "$86M · 412 shipments · 9 US brand clients" },
  { name: "Saigon Pine Knit", origin: "VN", status: "Lead", category: "Sweaters", shipments: "$54M · 268 shipments · 6 clients" },
  { name: "Mekong Stitch Works", origin: "KH", status: "Lead", category: "Sweaters", shipments: "$38M · 190 shipments · 4 clients" },
  { name: "Quetzal Cotton Mills", origin: "GT", status: "Lead", category: "Tees", shipments: "$61M · 530 shipments · 7 clients" },
];

export const LEAD_CAVEAT = "Leads come from shipment records. Verify before outreach.";

export const TOOL_STEPS = [
  "Finding matching categories",
  "Building origin tables",
  "Comparing with industry imports",
  "Scanning shipment records for vendors",
];

export const PERIOD = "Oct 2025 – Sep 2026";
export const FICTION_NOTE = "Shiftmap, Northfold and all figures are fictional.";
