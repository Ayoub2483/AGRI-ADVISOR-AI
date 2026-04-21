import React from "react";
import { StyleSheet, View } from "react-native";

import { AppText } from "@/components/AppText";

export function Section({
  title,
  children,
  right,
}: {
  title?: string;
  children: React.ReactNode;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.wrap}>
      {(title || right) && (
        <View style={styles.header}>
          {title ? <AppText variant="h3">{title}</AppText> : <View />}
          {right}
        </View>
      )}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12, marginBottom: 24 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
});
