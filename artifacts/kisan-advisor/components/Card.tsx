import React from "react";
import { StyleSheet, View, type ViewStyle } from "react-native";

import { useColors } from "@/hooks/useColors";

export function Card({
  children,
  style,
  padded = true,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
  padded?: boolean;
}) {
  const c = useColors();
  return (
    <View
      style={[
        styles.base,
        {
          backgroundColor: c.card,
          borderRadius: c.radius,
          borderColor: c.border,
        },
        padded && styles.padded,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    borderWidth: StyleSheet.hairlineWidth,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  padded: {
    padding: 16,
  },
});
