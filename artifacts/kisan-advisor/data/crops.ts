import type { Lang } from "@/lib/i18n";
import type { ImageSourcePropType } from "react-native";

export type LocalizedString = { en: string; ur: string };
export type ScheduleItem = {
  stageDays: LocalizedString;
  product: LocalizedString;
  rateOrTiming: LocalizedString;
};
export type GrowthStage = {
  name: LocalizedString;
  days: LocalizedString;
  notes: LocalizedString;
};
export type Disease = {
  id: string;
  name: LocalizedString;
  whenItStrikes: LocalizedString;
  symptoms: LocalizedString;
  treatment: LocalizedString;
  prevention: LocalizedString;
};
export type Crop = {
  id: "wheat" | "rice" | "cotton" | "corn";
  name: LocalizedString;
  emojiHint: string;
  image: ImageSourcePropType;
  intro: LocalizedString;
  cultivation: LocalizedString;
  requirements: LocalizedString;
  sowing: LocalizedString;
  harvesting: LocalizedString;
  storage: LocalizedString;
  growthStages: GrowthStage[];
  fertilizer: ScheduleItem[];
  pesticide: ScheduleItem[];
  diseases: Disease[];
};

export const crops: Crop[] = [
  {
    id: "wheat",
    name: { en: "Wheat", ur: "گندم" },
    emojiHint: "wheat",
    image: require("@/assets/images/crop-wheat.png"),
    intro: {
      en: "Wheat is the staple winter (rabi) cereal of Pakistan and much of South Asia. It thrives in cool, dry weather and well-drained loamy soil.",
      ur: "گندم پاکستان اور جنوبی ایشیا کی اہم ربیع کی فصل ہے۔ یہ ٹھنڈے خشک موسم اور اچھی نکاسی والی میرا زمین میں اچھی اگتی ہے۔",
    },
    cultivation: {
      en: "Prepare a fine seedbed with 2–3 ploughings followed by planking. Sow with a seed drill at 5 cm depth and 22 cm row spacing. Use 50 kg/acre of seed for timely sowing.",
      ur: "زمین کو 2-3 ہل چلا کر تیار کریں اور سہاگہ پھیریں۔ بیج 5 سینٹی میٹر گہرائی پر 22 سینٹی میٹر فاصلے سے ڈرل سے بوئیں۔ بروقت بوائی کے لیے 50 کلو فی ایکڑ بیج۔",
    },
    requirements: {
      en: "Cool weather (10–25°C). Loamy soil, pH 6–7.5. 4–6 irrigations totalling about 12–15 inches of water depending on rainfall.",
      ur: "ٹھنڈا موسم (10–25°C)۔ میرا زمین، پی ایچ 6–7.5۔ 4–6 پانی، کل 12–15 انچ پانی، بارش پر منحصر۔",
    },
    sowing: {
      en: "1 November – 30 November (timely). Late sowing up to 25 December reduces yield.",
      ur: "1 نومبر تا 30 نومبر بہترین۔ 25 دسمبر کے بعد بوائی سے پیداوار کم ہو جاتی ہے۔",
    },
    harvesting: {
      en: "Mid-April to early May, when grain is hard and moisture is around 14%. Harvest in cool morning hours to reduce shattering.",
      ur: "اپریل کے وسط سے مئی کے شروع تک، جب دانہ سخت ہو اور نمی تقریباً 14% ہو۔ صبح ٹھنڈے وقت میں کٹائی کریں۔",
    },
    storage: {
      en: "Dry grain to ≤10% moisture. Store in clean, dry, ventilated bins. Use neem leaves or aluminium phosphide tablets in sealed bins to control storage pests.",
      ur: "دانے کو 10% سے کم نمی پر خشک کریں۔ صاف، خشک، ہوا دار جگہ میں رکھیں۔ کیڑوں سے بچاؤ کے لیے نیم کے پتے یا فاسٹوکسن گولیاں استعمال کریں۔",
    },
    growthStages: [
      {
        name: { en: "Germination & seedling", ur: "اگاؤ اور پنیری" },
        days: { en: "0 – 20 days", ur: "0 – 20 دن" },
        notes: {
          en: "Keep soil moist. Light first irrigation 20–25 days after sowing.",
          ur: "زمین نم رکھیں۔ بوائی کے 20-25 دن بعد ہلکا پانی۔",
        },
      },
      {
        name: { en: "Tillering", ur: "پھٹاؤ" },
        days: { en: "20 – 45 days", ur: "20 – 45 دن" },
        notes: {
          en: "First nitrogen top-dressing. Critical for tiller count.",
          ur: "پہلی نائٹروجن کھاد۔ پھٹاؤ کے لیے اہم وقت۔",
        },
      },
      {
        name: { en: "Stem elongation & booting", ur: "گانٹھ بنائی" },
        days: { en: "45 – 80 days", ur: "45 – 80 دن" },
        notes: {
          en: "Second irrigation and second urea split. Watch for rust.",
          ur: "دوسرا پانی اور دوسری یوریا۔ رست (زنگ) پر نظر رکھیں۔",
        },
      },
      {
        name: { en: "Heading & flowering", ur: "گوبھ اور پھول" },
        days: { en: "80 – 110 days", ur: "80 – 110 دن" },
        notes: {
          en: "Most water-sensitive stage. Avoid water stress.",
          ur: "پانی کی سب سے زیادہ ضرورت۔ کمی نہ ہونے دیں۔",
        },
      },
      {
        name: { en: "Grain filling & maturity", ur: "دانہ بھرائی اور پختگی" },
        days: { en: "110 – 145 days", ur: "110 – 145 دن" },
        notes: {
          en: "Light final irrigation. Stop before harvest to dry crop.",
          ur: "آخری ہلکا پانی۔ کٹائی سے پہلے روک دیں۔",
        },
      },
    ],
    fertilizer: [
      {
        stageDays: { en: "At sowing", ur: "بوائی پر" },
        product: { en: "DAP", ur: "ڈی اے پی" },
        rateOrTiming: { en: "1 bag (50 kg) / acre", ur: "1 بوری (50 کلو) فی ایکڑ" },
      },
      {
        stageDays: { en: "At sowing", ur: "بوائی پر" },
        product: { en: "Urea (1st split)", ur: "یوریا (پہلی قسط)" },
        rateOrTiming: { en: "½ bag / acre", ur: "آدھی بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "1st irrigation (~25 days)", ur: "پہلے پانی (~25 دن)" },
        product: { en: "Urea (2nd split)", ur: "یوریا (دوسری قسط)" },
        rateOrTiming: { en: "1 bag / acre", ur: "1 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "2nd irrigation (~50 days)", ur: "دوسرے پانی (~50 دن)" },
        product: { en: "Urea (3rd split)", ur: "یوریا (تیسری قسط)" },
        rateOrTiming: { en: "½ bag / acre", ur: "آدھی بوری فی ایکڑ" },
      },
    ],
    pesticide: [
      {
        stageDays: { en: "30 – 40 days", ur: "30 – 40 دن" },
        product: { en: "2,4-D for broadleaf weeds", ur: "چوڑے پتوں کے جڑی بوٹی کش 2,4-D" },
        rateOrTiming: { en: "As per label, calm wind", ur: "لیبل کے مطابق، ہوا بند ہو" },
      },
      {
        stageDays: { en: "On rust appearance", ur: "زنگ ظاہر ہونے پر" },
        product: { en: "Propiconazole 25 EC", ur: "پروپیکونازول 25 EC" },
        rateOrTiming: { en: "200 ml / acre", ur: "200 ملی فی ایکڑ" },
      },
      {
        stageDays: { en: "Aphid threshold", ur: "تیلے کی اوسط حد پر" },
        product: { en: "Imidacloprid 20 SL", ur: "امیڈاکلوپرڈ 20 SL" },
        rateOrTiming: { en: "200 ml / acre evening spray", ur: "200 ملی فی ایکڑ، شام کو" },
      },
    ],
    diseases: [
      {
        id: "yellow-rust",
        name: { en: "Yellow (stripe) rust", ur: "زرد (پٹی والا) زنگ" },
        whenItStrikes: {
          en: "Cool, humid weather between Jan and March, 10–18°C.",
          ur: "جنوری تا مارچ ٹھنڈا اور نم موسم، 10–18°C۔",
        },
        symptoms: {
          en: "Yellow-orange powdery stripes on leaves arranged in rows. Leaves yellow and dry early.",
          ur: "پتوں پر قطاروں میں زرد نارنجی پاؤڈر نما لکیریں۔ پتے جلد زرد ہو کر سوکھ جاتے ہیں۔",
        },
        treatment: {
          en: "Spray Propiconazole 25 EC or Tebuconazole at 200 ml/acre. Repeat after 12 days if needed.",
          ur: "پروپیکونازول 25 EC یا ٹیبوکونازول 200 ملی فی ایکڑ سپرے کریں۔ ضرورت ہو تو 12 دن بعد دہرائیں۔",
        },
        prevention: {
          en: "Use resistant varieties (e.g., Akbar-2019, Ujala-2016). Avoid late sowing and excess nitrogen.",
          ur: "مزاحم اقسام لگائیں (مثلاً اکبر-2019، اجالا-2016)۔ دیر سے بوائی اور زائد یوریا سے بچیں۔",
        },
      },
      {
        id: "loose-smut",
        name: { en: "Loose smut", ur: "کانگیاری" },
        whenItStrikes: {
          en: "Visible at heading stage (Feb–March), seed-borne.",
          ur: "بال نکلنے کے وقت (فروری-مارچ) ظاہر ہوتا ہے، بیج کی بیماری۔",
        },
        symptoms: {
          en: "Heads appear as black powdery masses instead of grain.",
          ur: "بالیں دانے کے بجائے کالے پاؤڈر کی شکل میں نکلتی ہیں۔",
        },
        treatment: {
          en: "No cure once infected. Pull and burn affected plants.",
          ur: "جب آ جائے تو علاج نہیں۔ متاثرہ پودے اکھاڑ کر جلا دیں۔",
        },
        prevention: {
          en: "Treat seed with Carboxin or Vitavax @ 2g/kg before sowing.",
          ur: "بیج کو بوائی سے پہلے کاربوکسن یا وٹاوکس 2 گرام فی کلو لگا کر بوئیں۔",
        },
      },
      {
        id: "karnal-bunt",
        name: { en: "Karnal bunt", ur: "کرنال بنٹ" },
        whenItStrikes: {
          en: "Cool moist weather at flowering, late February – March.",
          ur: "پھول کے وقت ٹھنڈا نم موسم، فروری کے آخر سے مارچ۔",
        },
        symptoms: {
          en: "Partially affected grains turn black, smell fishy.",
          ur: "کچھ دانے سیاہ ہو جاتے ہیں اور مچھلی جیسی بو آتی ہے۔",
        },
        treatment: {
          en: "Spray Propiconazole at boot stage if forecast is wet.",
          ur: "بوٹ سٹیج پر پروپیکونازول اگر بارش کی پیشگوئی ہو۔",
        },
        prevention: {
          en: "Use clean certified seed. Avoid excess irrigation at flowering.",
          ur: "صاف تصدیق شدہ بیج۔ پھول کے وقت زائد پانی سے بچیں۔",
        },
      },
    ],
  },
  {
    id: "rice",
    name: { en: "Rice", ur: "چاول" },
    emojiHint: "rice",
    image: require("@/assets/images/crop-rice.png"),
    intro: {
      en: "Rice is the major kharif (summer) cereal grown in flooded fields. Pakistan's basmati rice is world famous for aroma and long grain.",
      ur: "چاول خریف کی بڑی فصل ہے جو پانی میں اگائی جاتی ہے۔ پاکستانی باسمتی خوشبو اور لمبے دانے کی وجہ سے دنیا بھر میں مشہور ہے۔",
    },
    cultivation: {
      en: "Raise nursery for 25–30 days. Puddle field, transplant 2–3 seedlings per hill at 22×22 cm spacing. Maintain 2–5 cm standing water through tillering.",
      ur: "25–30 دن کی پنیری تیار کریں۔ کھیت کو لیپ کر کے 22x22 سینٹی میٹر فاصلے پر 2-3 پودے فی منڈ لگائیں۔ پھٹاؤ تک 2-5 سینٹی میٹر پانی برقرار رکھیں۔",
    },
    requirements: {
      en: "Warm humid weather (25–35°C). Heavy clay soil that holds water. ~50 inches of water through the season.",
      ur: "گرم نم موسم (25–35°C)۔ بھاری چکنی زمین جو پانی روک سکے۔ پورے سیزن میں تقریباً 50 انچ پانی۔",
    },
    sowing: {
      en: "Nursery: mid-May to mid-June. Transplanting: late June to mid-July.",
      ur: "پنیری: مئی کے وسط سے جون کے وسط تک۔ منتقلی: جون کے آخر سے جولائی کے وسط تک۔",
    },
    harvesting: {
      en: "October to mid-November when 80% panicles turn straw yellow and grain moisture is 20–22%.",
      ur: "اکتوبر سے نومبر کے وسط، جب 80% بالیں زرد ہوں اور دانے کی نمی 20–22% ہو۔",
    },
    storage: {
      en: "Dry paddy to 13–14% moisture. Store in jute bags on wooden pallets in dry shed. Fumigate if weevils appear.",
      ur: "دھان کو 13–14% نمی پر خشک کریں۔ لکڑی کے تختوں پر بوریوں میں خشک گودام میں رکھیں۔ سوسی نظر آئے تو فیومیگیشن کریں۔",
    },
    growthStages: [
      {
        name: { en: "Nursery", ur: "پنیری" },
        days: { en: "0 – 30 days", ur: "0 – 30 دن" },
        notes: { en: "Maintain shallow water and apply DAP basal.", ur: "تھوڑا پانی رکھیں اور بنیادی ڈی اے پی۔" },
      },
      {
        name: { en: "Transplanting & rooting", ur: "منتقلی اور جڑ پکڑنا" },
        days: { en: "30 – 45 days", ur: "30 – 45 دن" },
        notes: { en: "Keep 2–3 cm water continuously.", ur: "مسلسل 2-3 سینٹی میٹر پانی رکھیں۔" },
      },
      {
        name: { en: "Tillering", ur: "پھٹاؤ" },
        days: { en: "45 – 75 days", ur: "45 – 75 دن" },
        notes: { en: "First urea top-dressing.", ur: "پہلی یوریا۔" },
      },
      {
        name: { en: "Panicle initiation", ur: "بال کی تیاری" },
        days: { en: "75 – 95 days", ur: "75 – 95 دن" },
        notes: { en: "Second urea + zinc spray if needed.", ur: "دوسری یوریا اور ضرورت ہو تو زنک سپرے۔" },
      },
      {
        name: { en: "Flowering & grain filling", ur: "پھول اور دانہ بھرائی" },
        days: { en: "95 – 130 days", ur: "95 – 130 دن" },
        notes: { en: "Don't let field dry. Watch for blast.", ur: "کھیت سوکھنے نہ دیں۔ بلاسٹ پر نظر۔" },
      },
    ],
    fertilizer: [
      {
        stageDays: { en: "At transplanting", ur: "منتقلی پر" },
        product: { en: "DAP", ur: "ڈی اے پی" },
        rateOrTiming: { en: "1 bag / acre", ur: "1 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "15 days after transplant", ur: "منتقلی کے 15 دن بعد" },
        product: { en: "Urea (1st split)", ur: "یوریا پہلی قسط" },
        rateOrTiming: { en: "1 bag / acre", ur: "1 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "Panicle initiation (~45 d)", ur: "بال شروع (~45 دن)" },
        product: { en: "Urea (2nd split)", ur: "یوریا دوسری قسط" },
        rateOrTiming: { en: "1 bag / acre", ur: "1 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "If yellowing", ur: "اگر پتے زرد ہوں" },
        product: { en: "Zinc sulphate spray", ur: "زنک سلفیٹ سپرے" },
        rateOrTiming: { en: "1 kg / acre, foliar", ur: "1 کلو فی ایکڑ، پتوں پر" },
      },
    ],
    pesticide: [
      {
        stageDays: { en: "Borer egg masses", ur: "بورر کے انڈے" },
        product: { en: "Cartap hydrochloride", ur: "کارٹاپ ہائیڈرو کلورائیڈ" },
        rateOrTiming: { en: "400 g / acre", ur: "400 گرام فی ایکڑ" },
      },
      {
        stageDays: { en: "Leaf folder", ur: "پتہ لپیٹ سنڈی" },
        product: { en: "Chlorantraniliprole 18.5 SC", ur: "کلورینٹرینیلیپرول 18.5 SC" },
        rateOrTiming: { en: "50 ml / acre", ur: "50 ملی فی ایکڑ" },
      },
      {
        stageDays: { en: "Blast appearance", ur: "بلاسٹ ظاہر ہو" },
        product: { en: "Tricyclazole 75 WP", ur: "ٹرائی سائیکلازول 75 WP" },
        rateOrTiming: { en: "120 g / acre", ur: "120 گرام فی ایکڑ" },
      },
    ],
    diseases: [
      {
        id: "rice-blast",
        name: { en: "Rice blast", ur: "چاول کا بلاسٹ" },
        whenItStrikes: {
          en: "Warm humid weather with night dew, especially Aug–Sep at panicle stage.",
          ur: "گرم مرطوب موسم اور رات کی شبنم، خاص طور پر اگست تا ستمبر بال کے وقت۔",
        },
        symptoms: {
          en: "Diamond-shaped greyish lesions with brown edges on leaves; necks of panicles break.",
          ur: "پتوں پر بھورے کناروں والے ہیرے نما سرمئی نشان؛ بال کی گردن ٹوٹ جاتی ہے۔",
        },
        treatment: {
          en: "Spray Tricyclazole 75 WP at 120 g/acre at first symptoms.",
          ur: "پہلی علامات پر ٹرائی سائیکلازول 75 WP، 120 گرام فی ایکڑ سپرے کریں۔",
        },
        prevention: {
          en: "Avoid excess nitrogen; balanced potash; resistant varieties.",
          ur: "زائد یوریا سے بچیں؛ پوٹاش متوازن دیں؛ مزاحم اقسام۔",
        },
      },
      {
        id: "bacterial-blight",
        name: { en: "Bacterial leaf blight", ur: "بیکٹیریل پتہ بلائٹ" },
        whenItStrikes: {
          en: "After heavy rain or flooding, July–September.",
          ur: "تیز بارش یا سیلاب کے بعد، جولائی تا ستمبر۔",
        },
        symptoms: {
          en: "Water-soaked yellow stripes from leaf tip down the margins; whole leaf dies.",
          ur: "پتے کے سرے سے کناروں پر زرد لکیریں؛ پورا پتہ مر جاتا ہے۔",
        },
        treatment: {
          en: "Drain field briefly. Spray copper oxychloride + streptocycline.",
          ur: "کھیت کا پانی نکالیں۔ کاپر آکسی کلورائیڈ + سٹریپٹو سائکلین سپرے۔",
        },
        prevention: {
          en: "Use clean seed; avoid wounding seedlings; resistant varieties.",
          ur: "صاف بیج؛ پنیری کو زخمی نہ کریں؛ مزاحم اقسام۔",
        },
      },
      {
        id: "stem-borer",
        name: { en: "Stem borer (insect)", ur: "تنا چھیدنے والی سنڈی" },
        whenItStrikes: {
          en: "Tillering to panicle stage, 30–80 days after transplant.",
          ur: "پھٹاؤ سے بال تک، منتقلی کے 30-80 دن بعد۔",
        },
        symptoms: {
          en: "Dead heart in young plants; whitehead at panicle stage.",
          ur: "نوجوان پودوں میں سوکھا مرکز؛ بال کے وقت سفید بال۔",
        },
        treatment: {
          en: "Apply Cartap 4G granules @ 8 kg/acre or spray Chlorantraniliprole.",
          ur: "کارٹاپ 4G دانے 8 کلو فی ایکڑ یا کلورینٹرینیلیپرول سپرے۔",
        },
        prevention: {
          en: "Destroy stubble after harvest; install pheromone traps.",
          ur: "کٹائی کے بعد بھوسا تلف کریں؛ فیرومون ٹریپ لگائیں۔",
        },
      },
    ],
  },
  {
    id: "cotton",
    name: { en: "Cotton", ur: "کپاس" },
    emojiHint: "cotton",
    image: require("@/assets/images/crop-cotton.png"),
    intro: {
      en: "Cotton is Pakistan's most important cash crop, grown in the southern Punjab and Sindh during summer for fibre and oilseed.",
      ur: "کپاس پاکستان کی سب سے اہم نقد آور فصل ہے، جنوبی پنجاب اور سندھ میں گرمیوں میں ریشے اور بیج کے لیے کاشت ہوتی ہے۔",
    },
    cultivation: {
      en: "Sow in 75 cm rows with 22 cm plant-to-plant spacing. Use 8 kg/acre delinted BT cotton seed. Thin to one healthy plant per hill at 30 days.",
      ur: "75 سینٹی میٹر قطاروں میں 22 سینٹی میٹر فاصلے پر بوائی۔ 8 کلو فی ایکڑ ڈیلنٹڈ بی ٹی بیج۔ 30 دن پر ایک صحت مند پودا فی منڈ چھوڑیں۔",
    },
    requirements: {
      en: "Warm weather 25–35°C, full sun, well-drained loamy soil. 6–8 irrigations of 3 inches each.",
      ur: "گرم موسم 25-35°C، مکمل دھوپ، اچھی نکاسی والی میرا زمین۔ 6-8 پانی، ہر بار 3 انچ۔",
    },
    sowing: {
      en: "1 April – 31 May (Punjab). Earlier sowing in Sindh (mid-Feb – April).",
      ur: "1 اپریل تا 31 مئی (پنجاب)۔ سندھ میں جلد بوائی (فروری وسط سے اپریل)۔",
    },
    harvesting: {
      en: "First picking from late August through November. Pick clean, dry bolls in the morning every 15–20 days.",
      ur: "پہلی چنائی اگست کے آخر سے نومبر تک۔ ہر 15-20 دن بعد صبح کو صاف خشک ٹینڈے چنیں۔",
    },
    storage: {
      en: "Store seed cotton in a dry, ventilated store. Avoid mixing wet and dry pickings. Gin within 30 days for best fibre quality.",
      ur: "پھٹی کو خشک ہوا دار جگہ رکھیں۔ گیلی اور خشک چنائی نہ ملائیں۔ بہترین معیار کے لیے 30 دن میں جننگ کریں۔",
    },
    growthStages: [
      {
        name: { en: "Germination", ur: "اگاؤ" },
        days: { en: "0 – 15 days", ur: "0 – 15 دن" },
        notes: { en: "Light irrigation; thin weeds.", ur: "ہلکا پانی؛ جڑی بوٹی نکالیں۔" },
      },
      {
        name: { en: "Vegetative", ur: "نشوونما" },
        days: { en: "15 – 50 days", ur: "15 – 50 دن" },
        notes: { en: "First urea split; scout for jassid & whitefly.", ur: "پہلی یوریا؛ تیلے اور سفید مکھی پر نظر۔" },
      },
      {
        name: { en: "Squaring", ur: "ڈوڈی بنائی" },
        days: { en: "50 – 70 days", ur: "50 – 70 دن" },
        notes: { en: "Critical for fruit set.", ur: "پھل لگنے کا اہم وقت۔" },
      },
      {
        name: { en: "Flowering & boll formation", ur: "پھول اور ٹینڈے" },
        days: { en: "70 – 110 days", ur: "70 – 110 دن" },
        notes: { en: "Highest water and nutrient demand.", ur: "پانی اور غذا کی سب سے زیادہ ضرورت۔" },
      },
      {
        name: { en: "Boll opening & picking", ur: "ٹینڈے کھلنا اور چنائی" },
        days: { en: "110 – 180 days", ur: "110 – 180 دن" },
        notes: { en: "Reduce nitrogen, regular pickings.", ur: "یوریا کم؛ باقاعدہ چنائی۔" },
      },
    ],
    fertilizer: [
      {
        stageDays: { en: "Pre-sowing", ur: "بوائی سے پہلے" },
        product: { en: "DAP + SOP", ur: "ڈی اے پی + پوٹاش" },
        rateOrTiming: { en: "1 bag DAP + ½ bag SOP / acre", ur: "1 بوری ڈی اے پی + آدھی پوٹاش فی ایکڑ" },
      },
      {
        stageDays: { en: "1st irrigation (~30 d)", ur: "پہلے پانی (~30 دن)" },
        product: { en: "Urea (1st split)", ur: "یوریا پہلی قسط" },
        rateOrTiming: { en: "1 bag / acre", ur: "1 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "Flowering (~70 d)", ur: "پھول (~70 دن)" },
        product: { en: "Urea (2nd split)", ur: "یوریا دوسری قسط" },
        rateOrTiming: { en: "1 bag / acre", ur: "1 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "Boll formation", ur: "ٹینڈے کے وقت" },
        product: { en: "Boron + Zinc spray", ur: "بورون + زنک سپرے" },
        rateOrTiming: { en: "Foliar as per label", ur: "پتوں پر، لیبل کے مطابق" },
      },
    ],
    pesticide: [
      {
        stageDays: { en: "30 – 50 days", ur: "30 – 50 دن" },
        product: { en: "Pyriproxyfen for whitefly", ur: "پائریپروکسیفین (سفید مکھی)" },
        rateOrTiming: { en: "200 ml / acre evening", ur: "200 ملی فی ایکڑ، شام کو" },
      },
      {
        stageDays: { en: "50 – 90 days", ur: "50 – 90 دن" },
        product: { en: "Spinosad for bollworm", ur: "سپینوسیڈ (سنڈی)" },
        rateOrTiming: { en: "80 ml / acre", ur: "80 ملی فی ایکڑ" },
      },
      {
        stageDays: { en: "Pink bollworm threshold", ur: "گلابی سنڈی کی حد" },
        product: { en: "Emamectin benzoate", ur: "ایمامیکٹن بنزویٹ" },
        rateOrTiming: { en: "200 g / acre", ur: "200 گرام فی ایکڑ" },
      },
    ],
    diseases: [
      {
        id: "cotton-leaf-curl",
        name: { en: "Cotton leaf curl virus (CLCuV)", ur: "کپاس کا پتہ مروڑ وائرس" },
        whenItStrikes: {
          en: "Spread by whitefly, July–September peak.",
          ur: "سفید مکھی سے پھیلتا ہے، جولائی تا ستمبر عروج پر۔",
        },
        symptoms: {
          en: "Upward leaf curling, vein thickening and enations on undersides; stunted plants with few bolls.",
          ur: "پتے اوپر کو مڑ جاتے ہیں، رگیں موٹی، نیچے ابھار؛ پودا ٹھٹھر جاتا ہے، ٹینڈے کم۔",
        },
        treatment: {
          en: "No cure. Control whitefly early with Pyriproxyfen + Diafenthiuron. Remove and destroy infected plants.",
          ur: "علاج نہیں۔ ابتدائی طور پر سفید مکھی کو پائریپروکسیفین + ڈائفینتھیورن سے قابو۔ متاثرہ پودے ختم کریں۔",
        },
        prevention: {
          en: "Use tolerant varieties (e.g., FH-Lalazar, IUB-13). Avoid dense planting and excess nitrogen.",
          ur: "برداشت رکھنے والی اقسام لگائیں۔ گھنی بوائی اور زائد یوریا سے بچیں۔",
        },
      },
      {
        id: "cotton-bollworm",
        name: { en: "American bollworm", ur: "امریکی سنڈی" },
        whenItStrikes: {
          en: "Peaks Aug–Oct in flowering and boll stage.",
          ur: "اگست تا اکتوبر، پھول اور ٹینڈے کے وقت۔",
        },
        symptoms: {
          en: "Holes in squares and bolls; greenish-brown caterpillars inside.",
          ur: "ڈوڈیوں اور ٹینڈوں میں سوراخ؛ اندر سبز بھوری سنڈیاں۔",
        },
        treatment: {
          en: "Spray Spinosad or Emamectin benzoate at evening; rotate chemistries.",
          ur: "شام کو سپینوسیڈ یا ایمامیکٹن بنزویٹ سپرے کریں؛ کیمیائی گروپ بدلتے رہیں۔",
        },
        prevention: {
          en: "Pheromone traps; preserve natural predators; timely picking.",
          ur: "فیرومون ٹریپ؛ قدرتی شکاریوں کا تحفظ؛ بروقت چنائی۔",
        },
      },
      {
        id: "fusarium-wilt",
        name: { en: "Fusarium wilt", ur: "فیوزیریم مرجھاؤ" },
        whenItStrikes: {
          en: "Soil-borne, appears 30–60 days after sowing in warm soil.",
          ur: "زمین کی بیماری، گرم زمین میں بوائی کے 30-60 دن بعد۔",
        },
        symptoms: {
          en: "Yellow lower leaves; brown vascular streaks; sudden wilting.",
          ur: "نچلے پتے زرد؛ تنوں میں بھوری لکیریں؛ اچانک مرجھانا۔",
        },
        treatment: {
          en: "Drench with Carbendazim solution around base. Remove badly infected plants.",
          ur: "تنے کے گرد کاربن ڈازم ڈالیں۔ بری طرح متاثرہ پودے نکال دیں۔",
        },
        prevention: {
          en: "Crop rotation with cereals; resistant varieties; avoid waterlogging.",
          ur: "اناج کے ساتھ چکر؛ مزاحم اقسام؛ پانی جمع نہ ہونے دیں۔",
        },
      },
    ],
  },
  {
    id: "corn",
    name: { en: "Corn (Maize)", ur: "مکئی" },
    emojiHint: "corn",
    image: require("@/assets/images/crop-corn.png"),
    intro: {
      en: "Maize is grown in spring and autumn for grain, fodder and increasingly for poultry feed. It responds strongly to balanced fertilizer and timely water.",
      ur: "مکئی بہار اور خزاں دونوں میں دانے، چارے اور پولٹری فیڈ کے لیے اگائی جاتی ہے۔ یہ متوازن کھاد اور بروقت پانی پر بہترین جواب دیتی ہے۔",
    },
    cultivation: {
      en: "Sow on ridges 75 cm apart with plant-to-plant spacing of 22 cm. Use 8–10 kg/acre hybrid seed at 4–5 cm depth.",
      ur: "75 سینٹی میٹر کی پٹیوں پر 22 سینٹی میٹر فاصلے پر بوائی۔ 8–10 کلو فی ایکڑ ہائبرڈ بیج، 4-5 سینٹی میٹر گہرائی پر۔",
    },
    requirements: {
      en: "Warm weather 21–32°C; sandy loam to loam; 5–7 irrigations.",
      ur: "گرم موسم 21–32°C؛ ریتلی میرا تا میرا زمین؛ 5–7 پانی۔",
    },
    sowing: {
      en: "Spring: Late January – February. Autumn: 20 July – 20 August.",
      ur: "بہار: جنوری کے آخر تا فروری۔ خزاں: 20 جولائی تا 20 اگست۔",
    },
    harvesting: {
      en: "Spring crop in May–June; autumn crop in Nov–Dec, when husks turn straw-colored and grain hard at 25% moisture.",
      ur: "بہار کی فصل مئی-جون میں؛ خزاں کی نومبر-دسمبر میں، جب چھلکا زرد ہو اور دانہ سخت 25% نمی پر۔",
    },
    storage: {
      en: "Dry to 13% moisture before shelling. Store in clean dry bins; treat with pirimiphos-methyl against weevils.",
      ur: "گہائی سے پہلے 13% نمی پر خشک کریں۔ صاف خشک گودام میں رکھیں؛ سوسی سے بچاؤ کے لیے پیریمفوس میتھائل استعمال کریں۔",
    },
    growthStages: [
      {
        name: { en: "Germination", ur: "اگاؤ" },
        days: { en: "0 – 10 days", ur: "0 – 10 دن" },
        notes: { en: "Keep moist; avoid crusting.", ur: "نم رکھیں؛ سطح سخت نہ ہو۔" },
      },
      {
        name: { en: "Vegetative (V4–V8)", ur: "نشوونما (V4-V8)" },
        days: { en: "10 – 35 days", ur: "10 – 35 دن" },
        notes: { en: "First urea + earthing up.", ur: "پہلی یوریا اور مٹی چڑھائیں۔" },
      },
      {
        name: { en: "Tasseling & silking", ur: "گُل اور بال" },
        days: { en: "55 – 75 days", ur: "55 – 75 دن" },
        notes: { en: "Most water-sensitive; avoid stress.", ur: "سب سے زیادہ پانی کی ضرورت؛ کمی نہ ہو۔" },
      },
      {
        name: { en: "Grain filling", ur: "دانہ بھرائی" },
        days: { en: "75 – 110 days", ur: "75 – 110 دن" },
        notes: { en: "Light frequent irrigation.", ur: "ہلکا اور بار بار پانی۔" },
      },
      {
        name: { en: "Maturity", ur: "پختگی" },
        days: { en: "110 – 130 days", ur: "110 – 130 دن" },
        notes: { en: "Stop irrigation; allow to dry.", ur: "پانی بند کریں؛ خشک ہونے دیں۔" },
      },
    ],
    fertilizer: [
      {
        stageDays: { en: "Pre-sowing", ur: "بوائی سے پہلے" },
        product: { en: "DAP + SOP", ur: "ڈی اے پی + پوٹاش" },
        rateOrTiming: { en: "2 bags DAP + 1 bag SOP / acre", ur: "2 بوری ڈی اے پی + 1 بوری پوٹاش فی ایکڑ" },
      },
      {
        stageDays: { en: "20 – 25 days", ur: "20 – 25 دن" },
        product: { en: "Urea (1st split)", ur: "یوریا پہلی قسط" },
        rateOrTiming: { en: "1.5 bags / acre", ur: "1.5 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "Knee-high (~40 d)", ur: "گھٹنے بھر (~40 دن)" },
        product: { en: "Urea (2nd split)", ur: "یوریا دوسری قسط" },
        rateOrTiming: { en: "1.5 bags / acre", ur: "1.5 بوری فی ایکڑ" },
      },
      {
        stageDays: { en: "Tasseling", ur: "گُل کے وقت" },
        product: { en: "Zinc sulphate (if needed)", ur: "زنک سلفیٹ (ضرورت ہو)" },
        rateOrTiming: { en: "5 kg / acre soil", ur: "5 کلو فی ایکڑ زمین میں" },
      },
    ],
    pesticide: [
      {
        stageDays: { en: "10 – 30 days", ur: "10 – 30 دن" },
        product: { en: "Atrazine for weeds (pre-emergence)", ur: "اگاؤ سے پہلے ایٹرازین" },
        rateOrTiming: { en: "500 g / acre", ur: "500 گرام فی ایکڑ" },
      },
      {
        stageDays: { en: "Fall armyworm scouting", ur: "فال آرمی ورم پر نظر" },
        product: { en: "Emamectin benzoate / Spinetoram", ur: "ایمامیکٹن بنزویٹ / اسپنیٹورم" },
        rateOrTiming: { en: "Direct spray into whorl", ur: "گدی میں سیدھا سپرے" },
      },
      {
        stageDays: { en: "Stem borer", ur: "تنا چھیدنے والی سنڈی" },
        product: { en: "Carbofuran 3G granules", ur: "کاربوفیوران 3G دانے" },
        rateOrTiming: { en: "8 kg / acre in whorl", ur: "8 کلو فی ایکڑ گدی میں" },
      },
    ],
    diseases: [
      {
        id: "fall-armyworm",
        name: { en: "Fall armyworm", ur: "فال آرمی ورم" },
        whenItStrikes: {
          en: "All season, peaks 3–6 weeks after sowing.",
          ur: "پورے سیزن میں، بوائی کے 3-6 ہفتے بعد عروج۔",
        },
        symptoms: {
          en: "Window-pane feeding on young leaves; ragged holes; sawdust-like frass in whorl.",
          ur: "نوجوان پتوں پر شیشے جیسے سوراخ؛ پھٹے پتے؛ گدی میں چورا جیسا فضلہ۔",
        },
        treatment: {
          en: "Spray Emamectin benzoate or Spinetoram directly into the whorl in evening.",
          ur: "ایمامیکٹن بنزویٹ یا اسپنیٹورم شام کو گدی میں سپرے کریں۔",
        },
        prevention: {
          en: "Pheromone traps; early sowing; avoid mono-cropping; preserve egg parasitoids.",
          ur: "فیرومون ٹریپ؛ جلد بوائی؛ ایک ہی فصل بار بار نہ لگائیں۔",
        },
      },
      {
        id: "maize-rust",
        name: { en: "Common rust", ur: "عام زنگ" },
        whenItStrikes: {
          en: "Cool moist weather, 16–25°C, late season.",
          ur: "ٹھنڈا نم موسم 16-25°C، سیزن کے آخر میں۔",
        },
        symptoms: {
          en: "Reddish-brown pustules on both leaf surfaces.",
          ur: "پتوں کے دونوں طرف سرخ بھورے دانے۔",
        },
        treatment: {
          en: "Spray Mancozeb 75 WP @ 600 g/acre or Propiconazole.",
          ur: "مینکوزیب 75 WP، 600 گرام فی ایکڑ یا پروپیکونازول سپرے۔",
        },
        prevention: {
          en: "Resistant hybrids; remove volunteer plants.",
          ur: "مزاحم ہائبرڈ؛ خود سے اگنے والے پودے ہٹا دیں۔",
        },
      },
      {
        id: "stalk-rot",
        name: { en: "Stalk rot", ur: "تنا گلن" },
        whenItStrikes: {
          en: "After silking, especially in stressed or over-watered crops.",
          ur: "بال نکلنے کے بعد، خاص طور پر کمزور یا زائد پانی والی فصل میں۔",
        },
        symptoms: {
          en: "Plants lodge; pith inside the stem turns soft and discoloured.",
          ur: "پودے گر جاتے ہیں؛ تنے کے اندر گودا نرم اور رنگ بدلا ہوا۔",
        },
        treatment: {
          en: "No effective spray; remove and burn affected plants.",
          ur: "کوئی موثر سپرے نہیں؛ متاثرہ پودے نکال کر جلا دیں۔",
        },
        prevention: {
          en: "Balanced potash; avoid waterlogging; resistant varieties.",
          ur: "متوازن پوٹاش؛ پانی جمع نہ ہونے دیں؛ مزاحم اقسام۔",
        },
      },
    ],
  },
];

export const getCrop = (id: string) => crops.find((c) => c.id === id);
export const localized = (s: { en: string; ur: string }, lang: Lang) => s[lang];
