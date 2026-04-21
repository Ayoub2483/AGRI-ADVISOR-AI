import { Router, type IRouter } from "express";
import OpenAI from "openai";

const router: IRouter = Router();

const baseURL = process.env["AI_INTEGRATIONS_OPENAI_BASE_URL"];
const apiKey = process.env["AI_INTEGRATIONS_OPENAI_API_KEY"];

const client =
  baseURL && apiKey ? new OpenAI({ baseURL, apiKey }) : null;

const SYSTEM_EN = `You are "Kisan Advisor", a friendly, practical agricultural extension officer for farmers in Pakistan and South Asia.
You ONLY advise on these four crops: wheat, rice, cotton, corn (maize).
Use plain, short sentences. A farmer with limited reading should understand you.
Give concrete numbers (rates per acre, days, °C) when relevant. If you are not sure, say so.
Never recommend banned or very dangerous chemicals. Suggest IPM and safer options first.
Reply in 4-8 short bullet points or short paragraphs. Do not use markdown headers.`;

const SYSTEM_UR = `آپ "کسان ایڈوائزر" ہیں — پاکستان کے کسانوں کے لیے دوستانہ زرعی مشیر۔
آپ صرف چار فصلوں پر مشورہ دیتے ہیں: گندم، چاول، کپاس، مکئی۔
آسان مختصر جملے استعمال کریں تاکہ کم پڑھا لکھا کسان بھی سمجھ سکے۔
ضرورت ہو تو ایکڑ کے حساب سے مقدار، دن، درجہ حرارت بتائیں۔ اگر یقین نہ ہو تو بتا دیں۔
خطرناک یا ممنوعہ کیمیکل کا مشورہ مت دیں — پہلے IPM اور محفوظ طریقے بتائیں۔
4 سے 8 مختصر نکات یا چھوٹے پیراگراف میں جواب دیں۔ مارک ڈاؤن ہیڈر استعمال نہ کریں۔`;

router.post("/ai/chat", async (req, res) => {
  if (!client) {
    res.status(503).json({ error: "AI is not configured" });
    return;
  }
  const lang: "en" | "ur" = req.body?.lang === "ur" ? "ur" : "en";
  const history = Array.isArray(req.body?.history) ? req.body.history : [];
  const message = String(req.body?.message ?? "").slice(0, 4000);
  if (!message) {
    res.status(400).json({ error: "message required" });
    return;
  }

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 800,
      messages: [
        { role: "system", content: lang === "ur" ? SYSTEM_UR : SYSTEM_EN },
        ...history
          .slice(-10)
          .filter(
            (m: unknown): m is { role: "user" | "assistant"; content: string } =>
              !!m &&
              typeof m === "object" &&
              "role" in m &&
              "content" in m &&
              ((m as { role: string }).role === "user" ||
                (m as { role: string }).role === "assistant"),
          )
          .map((m) => ({ role: m.role, content: String(m.content).slice(0, 2000) })),
        { role: "user", content: message },
      ],
    });
    const reply = completion.choices[0]?.message?.content ?? "";
    res.json({ reply });
  } catch (err) {
    req.log.error({ err }, "ai chat failed");
    res.status(500).json({ error: "ai chat failed" });
  }
});

router.post("/ai/analyze-crop", async (req, res) => {
  if (!client) {
    res.status(503).json({ error: "AI is not configured" });
    return;
  }
  const lang: "en" | "ur" = req.body?.lang === "ur" ? "ur" : "en";
  const cropId = String(req.body?.cropId ?? "").toLowerCase();
  const imageBase64 = String(req.body?.imageBase64 ?? "");
  const mimeType = String(req.body?.mimeType ?? "image/jpeg");
  if (!imageBase64) {
    res.status(400).json({ error: "imageBase64 required" });
    return;
  }

  const langName = lang === "ur" ? "Urdu (اردو)" : "English";

  const prompt = `You are a plant pathologist for ${cropId}.
First, judge the photo quality. A "clear" photo shows a leaf or affected area filling at least 1/3 of the frame, in focus, in daylight.
If the photo is blurry, too far, too dark, not the right crop, or shows mostly soil/sky, set isClearPhoto=false and explain how the farmer should retake it.

If clear, identify whether it matches the selected crop (${cropId}), assess health, and if disease/pest is visible, name it and give 2-4 immediate actions and 2-3 prevention tips.

Reply ONLY in valid minified JSON matching this TypeScript type, with all human-readable strings written in ${langName}:
{
  "isClearPhoto": boolean,
  "retakeReason"?: string,
  "retakeInstructions"?: string,
  "identifiedCrop"?: string,
  "matchesSelectedCrop"?: boolean,
  "healthStatus"?: "healthy" | "stressed" | "diseased" | "pest" | "unknown",
  "diseaseName"?: string,
  "confidence"?: number,
  "symptoms"?: string,
  "immediateActions"?: string[],
  "preventiveTips"?: string[],
  "summary"?: string
}
No markdown, no commentary, only JSON.`;

  try {
    const completion = await client.chat.completions.create({
      model: "gpt-5-mini",
      max_completion_tokens: 1200,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: { url: `data:${mimeType};base64,${imageBase64}` },
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content ?? "{}";
    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      parsed = {
        isClearPhoto: false,
        retakeReason: "Could not analyze image.",
        retakeInstructions:
          lang === "ur"
            ? "براہِ کرم دوبارہ صاف تصویر لیں۔"
            : "Please take a clearer photo.",
      };
    }
    res.json(parsed);
  } catch (err) {
    req.log.error({ err }, "ai analyze failed");
    res.status(500).json({ error: "ai analyze failed" });
  }
});

export default router;
