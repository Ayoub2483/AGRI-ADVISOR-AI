export type MarketRow = {
  market: { en: string; ur: string };
  prices: Record<"wheat" | "rice" | "cotton" | "corn", { min: number; max: number }>;
};

// Indicative recent price ranges in PKR per 40 kg (maund) — used as base; we add a deterministic
// daily variation so it changes day-to-day but is consistent across users on the same day.
const baseRows: MarketRow[] = [
  {
    market: { en: "Lahore", ur: "لاہور" },
    prices: {
      wheat: { min: 3450, max: 3650 },
      rice: { min: 5200, max: 7400 },
      cotton: { min: 8800, max: 9600 },
      corn: { min: 2400, max: 2700 },
    },
  },
  {
    market: { en: "Multan", ur: "ملتان" },
    prices: {
      wheat: { min: 3380, max: 3600 },
      rice: { min: 5000, max: 7100 },
      cotton: { min: 8950, max: 9750 },
      corn: { min: 2350, max: 2650 },
    },
  },
  {
    market: { en: "Faisalabad", ur: "فیصل آباد" },
    prices: {
      wheat: { min: 3420, max: 3620 },
      rice: { min: 5300, max: 7300 },
      cotton: { min: 8850, max: 9650 },
      corn: { min: 2380, max: 2680 },
    },
  },
  {
    market: { en: "Karachi", ur: "کراچی" },
    prices: {
      wheat: { min: 3500, max: 3750 },
      rice: { min: 5400, max: 7600 },
      cotton: { min: 8900, max: 9800 },
      corn: { min: 2420, max: 2720 },
    },
  },
  {
    market: { en: "Hyderabad", ur: "حیدرآباد" },
    prices: {
      wheat: { min: 3470, max: 3680 },
      rice: { min: 5350, max: 7450 },
      cotton: { min: 8900, max: 9700 },
      corn: { min: 2400, max: 2700 },
    },
  },
  {
    market: { en: "Peshawar", ur: "پشاور" },
    prices: {
      wheat: { min: 3550, max: 3800 },
      rice: { min: 5500, max: 7700 },
      cotton: { min: 8800, max: 9600 },
      corn: { min: 2450, max: 2750 },
    },
  },
];

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function getDailyMarketRows(date = new Date()): MarketRow[] {
  const dayKey = Number(
    `${date.getUTCFullYear()}${date.getUTCMonth() + 1}${date.getUTCDate()}`,
  );
  return baseRows.map((row, ri) => {
    const rng = mulberry32(dayKey + ri * 17);
    const newPrices = { ...row.prices } as MarketRow["prices"];
    (Object.keys(newPrices) as (keyof MarketRow["prices"])[]).forEach((k) => {
      const drift = (rng() - 0.5) * 100; // ±50 PKR
      newPrices[k] = {
        min: Math.round(newPrices[k].min + drift),
        max: Math.round(newPrices[k].max + drift),
      };
    });
    return { ...row, prices: newPrices };
  });
}
