export type Weather = {
  tempC: number;
  apparentC: number;
  humidity: number;
  windKmh: number;
  precipitationMm: number;
  weatherCode: number;
  daily: {
    date: string;
    maxC: number;
    minC: number;
    rainMm: number;
  }[];
  fetchedAt: number;
};

export async function fetchWeather(lat: number, lon: number): Promise<Weather> {
  const url =
    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}` +
    `&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m` +
    `&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,weather_code` +
    `&forecast_days=5&timezone=auto`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Weather fetch failed");
  const j = await res.json();
  const c = j.current ?? {};
  const d = j.daily ?? {};
  return {
    tempC: c.temperature_2m ?? 0,
    apparentC: c.apparent_temperature ?? c.temperature_2m ?? 0,
    humidity: c.relative_humidity_2m ?? 0,
    windKmh: c.wind_speed_10m ?? 0,
    precipitationMm: c.precipitation ?? 0,
    weatherCode: c.weather_code ?? 0,
    daily: (d.time ?? []).map((date: string, i: number) => ({
      date,
      maxC: d.temperature_2m_max?.[i] ?? 0,
      minC: d.temperature_2m_min?.[i] ?? 0,
      rainMm: d.precipitation_sum?.[i] ?? 0,
    })),
    fetchedAt: Date.now(),
  };
}

export function weatherLabel(code: number, lang: "en" | "ur"): string {
  const map: Record<number, [string, string]> = {
    0: ["Clear sky", "صاف آسمان"],
    1: ["Mainly clear", "زیادہ تر صاف"],
    2: ["Partly cloudy", "جزوی ابر آلود"],
    3: ["Overcast", "گھنا بادل"],
    45: ["Foggy", "دھند"],
    48: ["Foggy", "دھند"],
    51: ["Light drizzle", "ہلکی پھوار"],
    53: ["Drizzle", "پھوار"],
    55: ["Heavy drizzle", "تیز پھوار"],
    61: ["Light rain", "ہلکی بارش"],
    63: ["Rain", "بارش"],
    65: ["Heavy rain", "تیز بارش"],
    71: ["Light snow", "ہلکی برفباری"],
    73: ["Snow", "برفباری"],
    75: ["Heavy snow", "تیز برفباری"],
    80: ["Rain showers", "بارش کی پھواریں"],
    81: ["Rain showers", "بارش کی پھواریں"],
    82: ["Heavy showers", "تیز بارش"],
    95: ["Thunderstorm", "گرج چمک کے ساتھ بارش"],
    96: ["Thunderstorm", "گرج چمک"],
    99: ["Thunderstorm", "گرج چمک"],
  };
  const v = map[code] ?? ["—", "—"];
  return lang === "ur" ? v[1] : v[0];
}
