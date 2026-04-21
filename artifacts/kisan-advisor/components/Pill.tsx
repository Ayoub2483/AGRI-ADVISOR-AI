import React from "react";
import { Pressable, StyleSheet, View, type ViewStyle } from "react-native";

import { useColors } from "@/hooks/useColors";
import { AppText } from "@/components/AppText";

export function Pill({
  label,
  selected,
  onPress,
  style,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  const c = useColors();
  const Wrap: typeof View | typeof Pressable = onPress ? Pressable : View;
  return (
    <Wrap
      onPress={onPress}
      style={[
        styles.pill,
        {
          backgroundColor: selected ? c.primary : c.secondary,
          borderColor: selected ? c.primary : c.border,
        },
        style,
      ]}
    >
      <AppText variant="caption" color={selected ? c.primaryForeground : c.foreground}>
        {label}
      </AppText>
    </Wrap>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    borderWidth: StyleSheet.hairlineWidth,
  },
});
