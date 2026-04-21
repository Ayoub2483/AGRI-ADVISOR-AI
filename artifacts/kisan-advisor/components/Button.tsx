import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React from "react";
import { ActivityIndicator, Platform, Pressable, StyleSheet, View, type ViewStyle } from "react-native";

import { useColors } from "@/hooks/useColors";
import { AppText } from "@/components/AppText";

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  loading,
  disabled,
  style,
  full,
}: {
  label: string;
  onPress?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "destructive";
  icon?: keyof typeof Feather.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  full?: boolean;
}) {
  const c = useColors();
  const bg =
    variant === "primary"
      ? c.primary
      : variant === "destructive"
        ? c.destructive
        : variant === "secondary"
          ? c.secondary
          : "transparent";
  const fg =
    variant === "primary"
      ? c.primaryForeground
      : variant === "destructive"
        ? c.destructiveForeground
        : variant === "secondary"
          ? c.foreground
          : c.primary;
  const border =
    variant === "ghost" ? "transparent" : variant === "secondary" ? c.border : bg;

  return (
    <Pressable
      disabled={disabled || loading}
      onPress={() => {
        if (Platform.OS !== "web") Haptics.selectionAsync().catch(() => undefined);
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.base,
        {
          backgroundColor: bg,
          borderColor: border,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
          alignSelf: full ? "stretch" : "auto",
        },
        style,
      ]}
    >
      <View style={styles.row}>
        {loading ? (
          <ActivityIndicator size="small" color={fg} />
        ) : icon ? (
          <Feather name={icon} size={18} color={fg} />
        ) : null}
        <AppText variant="label" color={fg}>
          {label}
        </AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    minHeight: 46,
    justifyContent: "center",
  },
  row: { flexDirection: "row", alignItems: "center", gap: 8, justifyContent: "center" },
});
