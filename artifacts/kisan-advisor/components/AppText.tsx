import React from "react";
import { Text, type TextProps, type TextStyle } from "react-native";

import { useColors } from "@/hooks/useColors";
import { useSettings } from "@/contexts/SettingsContext";

type Variant = "title" | "h2" | "h3" | "body" | "caption" | "label";

const styleFor: Record<Variant, TextStyle> = {
  title: { fontSize: 28, fontWeight: "700", lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: "700", lineHeight: 28 },
  h3: { fontSize: 17, fontWeight: "600", lineHeight: 22 },
  body: { fontSize: 15, fontWeight: "400", lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: "500", lineHeight: 16 },
  label: { fontSize: 13, fontWeight: "600", lineHeight: 18 },
};

const familyFor: Record<Variant, string> = {
  title: "Inter_700Bold",
  h2: "Inter_700Bold",
  h3: "Inter_600SemiBold",
  body: "Inter_400Regular",
  caption: "Inter_500Medium",
  label: "Inter_600SemiBold",
};

export function AppText({
  variant = "body",
  color,
  style,
  children,
  ...rest
}: TextProps & { variant?: Variant; color?: string }) {
  const c = useColors();
  const { lang } = useSettings();
  const isUr = lang === "ur";
  return (
    <Text
      {...rest}
      style={[
        { color: color ?? c.foreground, fontFamily: familyFor[variant] },
        styleFor[variant],
        isUr && { writingDirection: "rtl", lineHeight: styleFor[variant].lineHeight! + 4 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
