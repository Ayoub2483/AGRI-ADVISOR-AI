import type { Weather } from "./weather";
import type { Lang } from "./i18n";

export type Advice = {
  title: string;
  body: string;
  icon: "water" | "sun" | "cloud-rain" | "wind" | "alert-triangle" | "thermometer";
  priority: "low" | "medium" | "high";
};

export function getAdvice(w: Weather | null, cropId: string | null, lang: Lang): Advice[] {
  if (!w) {
    return [
      {
        title: lang === "ur" ? "موسم کا ڈیٹا نہیں" : "No weather data yet",
        body:
          lang === "ur"
            ? "لوکیشن آن کریں تاکہ ہم آپ کو روزانہ مشورہ دے سکیں۔"
            : "Enable location so we can give you daily advice.",
        icon: "alert-triangle",
        priority: "low",
      },
    ];
  }
  const list: Advice[] = [];
  const todayRain = w.daily[0]?.rainMm ?? 0;
  const tomorrowRain = w.daily[1]?.rainMm ?? 0;

  // Watering
  if (todayRain >= 5 || tomorrowRain >= 8) {
    list.push({
      title: lang === "ur" ? "آج آبپاشی نہ کریں" : "Skip irrigation today",
      body:
        lang === "ur"
          ? `تقریباً ${todayRain.toFixed(0)}mm آج اور ${tomorrowRain.toFixed(0)}mm کل بارش متوقع ہے۔ پانی محفوظ کریں۔`
          : `Around ${todayRain.toFixed(0)}mm rain today and ${tomorrowRain.toFixed(0)}mm tomorrow. Save water.`,
      icon: "cloud-rain",
      priority: "high",
    });
  } else if (w.tempC > 32 && w.humidity < 40) {
    list.push({
      title: lang === "ur" ? "صبح سویرے پانی دیں" : "Irrigate early in the morning",
      body:
        lang === "ur"
          ? "گرمی زیادہ اور نمی کم ہے۔ سورج چڑھنے سے پہلے پانی دیں تاکہ پودا مرجھائے نہیں۔"
          : "High heat and low humidity. Water before sunrise to prevent wilting.",
      icon: "water",
      priority: "high",
    });
  } else {
    list.push({
      title: lang === "ur" ? "آبپاشی معمول کے مطابق" : "Irrigate as scheduled",
      body:
        lang === "ur"
          ? "موسم نارمل ہے۔ زمین کی نمی چیک کریں اور حسب ضرورت پانی دیں۔"
          : "Weather is normal. Check soil moisture and irrigate as needed.",
      icon: "water",
      priority: "low",
    });
  }

  // Heat stress
  if (w.tempC >= 38) {
    list.push({
      title: lang === "ur" ? "گرمی کا الرٹ" : "Heat stress alert",
      body:
        lang === "ur"
          ? "درجہ حرارت بہت زیادہ ہے۔ سپرے دوپہر کے بجائے شام کو کریں اور مزدوروں کو سایہ دیں۔"
          : "Very hot. Spray in the evening, not midday. Give workers shade.",
      icon: "thermometer",
      priority: "high",
    });
  }

  // Wind / spray timing
  if (w.windKmh >= 18) {
    list.push({
      title: lang === "ur" ? "آج سپرے نہ کریں" : "Avoid spraying today",
      body:
        lang === "ur"
          ? `ہوا تقریباً ${w.windKmh.toFixed(0)} کلومیٹر فی گھنٹہ ہے۔ سپرے ضائع ہو گا اور زہر بکھرے گا۔`
          : `Wind is about ${w.windKmh.toFixed(0)} km/h. Spray will drift and waste chemicals.`,
      icon: "wind",
      priority: "medium",
    });
  }

  // Disease risk humid window
  if (w.humidity >= 80 && w.tempC >= 18 && w.tempC <= 28) {
    list.push({
      title: lang === "ur" ? "فنگس کا خطرہ بڑھ گیا" : "Higher fungal disease risk",
      body:
        lang === "ur"
          ? "نمی زیادہ اور موسم گیلا ہے۔ پتوں کا معائنہ کریں — رست، بلائٹ یا پھپھوندی پر نظر رکھیں۔"
          : "Humidity is high. Inspect leaves for rust, blight or mildew over the next 48 hours.",
      icon: "alert-triangle",
      priority: "medium",
    });
  }

  if (cropId === "cotton" && w.tempC < 15) {
    list.push({
      title: lang === "ur" ? "کپاس کے لیے ٹھنڈ" : "Cold for cotton",
      body:
        lang === "ur"
          ? "کپاس کو 18°C سے کم پسند نہیں۔ ابتدائی نشوونما متاثر ہو سکتی ہے۔"
          : "Cotton dislikes temperatures below 18°C — early growth may slow.",
      icon: "thermometer",
      priority: "medium",
    });
  }
  return list;
}
