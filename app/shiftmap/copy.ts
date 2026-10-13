// Per-category copy for the report. Every figure comes from shiftmap-brief.md or is
// simple arithmetic on it (e.g. $0.98 − $0.71 = +$0.27/u). Numbers first, no fluff.

export const HEADLINES: Record<string, { figure: string; caption: string }> = {
  sweaters: { figure: "CN 52% → 32%", caption: "China’s share of units, now → after the shift" },
  leggings: { figure: "VN $1.08 → $0.66/u", caption: "Vietnam lane freight/u, Northfold → matched competitors" },
  tees: { figure: "GT 0% → 10%", caption: "Guatemala’s share of units, now → proposed test" },
  jackets: { figure: "CN 71% → 59%", caption: "China’s share of units, now → after the shift" },
};

export const SUMMARIES: Record<string, string[]> = {
  sweaters: [
    "The industry already moved: Vietnam is the #1 origin for this code at 31%, while Northfold buys 18% there.",
    "The capacity exists: 14 vendors in Vietnam and Cambodia already ship this code to US brands.",
    "It pays: estimated landed cost per unit falls by about 5% after the shift.",
  ],
  leggings: [
    "Freight/u is $0.98 vs peers $0.71, +$0.27/u.",
    "The Vietnam lane costs $1.08 vs $0.66/u for matched competitors on the same origin.",
    "Net margin is 6.8% vs peers 8.1%, −130 bps. Fix the lane before moving volume.",
  ],
  tees: [
    "Peers buy 12% in Guatemala and the industry 17%. Northfold buys none.",
    "Net margin is 9.2% vs peers 10.0%, −80 bps.",
    "Quetzal Cotton Mills already ships this code: $61M · 530 shipments · 7 clients.",
  ],
  jackets: [
    "Northfold buys 71% in China. Peers buy 55% and the industry 48%.",
    "Net margin is 1.9% vs peers 6.6%, −470 bps: the widest gap of the four categories.",
    "Freight/u is $4.40 vs peers $3.05, +$1.35/u.",
  ],
};

export const VENDOR_MATCH: Record<string, RegExp> = {
  sweaters: /sweater/i,
  leggings: /legging/i,
  tees: /tee/i,
  jackets: /jacket/i,
};
