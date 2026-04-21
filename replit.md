# Kisan Advisor

A bilingual (English / اردو) Expo mobile app that helps Pakistani farmers manage **wheat, rice, cotton, and corn** from sowing to selling.

## Features

- **Onboarding** — pick language, optionally share location.
- **Home** — live weather (Open-Meteo, no key), location-aware daily advice (irrigation, heat stress, spray timing, disease risk), quick crop card.
- **Crop library** — full notes per crop: introduction, requirements, cultivation, sowing/harvesting calendar, growth stages, fertilizer plan, pesticide plan, storage, common diseases.
- **Disease pages** — symptoms, when it strikes, treatment, prevention.
- **Scan** — camera or gallery photo → AI analysis (OpenAI GPT-5-mini vision). Bad photos get retake instructions. Good photos get diagnosis + immediate actions + prevention tips.
- **Market** — indicative wholesale prices in PKR / 40 kg across 6 major Pakistani mandis with daily variation.
- **Advisor chat** — AI agronomy chatbot that knows the farmer's selected crop, weather and location. History persisted on-device.
- **Settings** — change language, clear location.
- **Offline-friendly** — settings, weather snapshot, chat history persisted via `AsyncStorage`. Chat & scan need internet; library, market and theory work offline.

## Architecture

Monorepo (pnpm workspace) with two artifacts:

- `artifacts/kisan-advisor` — Expo Router app (mobile + web). Frontend-heavy.
- `artifacts/api-server` — Express server that exposes:
  - `POST /api/ai/chat` — bilingual agronomy chat (OpenAI gpt-5-mini)
  - `POST /api/ai/analyze-crop` — vision analysis returning JSON with health/disease/retake guidance.
- `artifacts/mockup-sandbox` — design canvas (untouched).

OpenAI is wired through Replit AI Integrations (env vars `AI_INTEGRATIONS_OPENAI_BASE_URL` + `AI_INTEGRATIONS_OPENAI_API_KEY`, no user key required).

## Notable mobile bits

- Inter + Feather icon fonts pre-loaded with SplashScreen gating.
- `SettingsContext` persists `lang`, `cropId`, `location`, `weather`, `onboarded`.
- Web uses `navigator.geolocation`; native uses `expo-location`.
- Body limit raised to 20 MB on the API to accept base64 photos.
- Urdu strings render with `writingDirection: "rtl"` and slightly larger line-height.
