import Constants from "expo-constants";
import { Platform } from "react-native";

export function getApiBase(): string {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) return `https://${domain}/api`;
  if (Platform.OS === "web" && typeof window !== "undefined") {
    return `${window.location.origin}/api`;
  }
  const host = Constants.expoConfig?.hostUri?.split(":")[0];
  if (host) return `http://${host}:80/api`;
  return "/api";
}

export async function aiChat(params: {
  lang: "en" | "ur";
  history: { role: "user" | "assistant"; content: string }[];
  message: string;
}): Promise<string> {
  const res = await fetch(`${getApiBase()}/ai/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`Chat failed: ${res.status}`);
  const data = (await res.json()) as { reply: string };
  return data.reply;
}

export type CropAnalysis = {
  isClearPhoto: boolean;
  retakeReason?: string;
  retakeInstructions?: string;
  identifiedCrop?: string;
  matchesSelectedCrop?: boolean;
  healthStatus?: "healthy" | "stressed" | "diseased" | "pest" | "unknown";
  diseaseName?: string;
  confidence?: number;
  symptoms?: string;
  immediateActions?: string[];
  preventiveTips?: string[];
  summary?: string;
};

export async function analyzeCropImage(params: {
  lang: "en" | "ur";
  cropId: string;
  imageBase64: string;
  mimeType: string;
}): Promise<CropAnalysis> {
  const res = await fetch(`${getApiBase()}/ai/analyze-crop`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });
  if (!res.ok) throw new Error(`Analyze failed: ${res.status}`);
  return (await res.json()) as CropAnalysis;
}
