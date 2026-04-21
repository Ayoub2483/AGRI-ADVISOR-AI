import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { useSettings } from "@/contexts/SettingsContext";
import { crops, localized } from "@/data/crops";
import { useColors } from "@/hooks/useColors";

export default function LibraryScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { lang } = useSettings();
  const router = useRouter();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        paddingBottom: insets.bottom + (Platform.OS === "web" ? 110 : 100),
      }}
    >
      {crops.map((cr) => (
        <Pressable key={cr.id} onPress={() => router.push(`/crop/${cr.id}`)}>
          <Card padded={false} style={styles.card}>
            <Image source={cr.image} style={styles.image} contentFit="cover" />
            <View style={styles.body}>
              <AppText variant="h2">{localized(cr.name, lang)}</AppText>
              <AppText variant="body" color={c.mutedForeground} numberOfLines={3} style={{ marginTop: 6 }}>
                {localized(cr.intro, lang)}
              </AppText>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Feather name="calendar" size={14} color={c.primary} />
                  <AppText variant="caption" color={c.primary}>
                    {localized(cr.sowing, lang)}
                  </AppText>
                </View>
                <Feather name="chevron-right" size={20} color={c.mutedForeground} />
              </View>
            </View>
          </Card>
        </Pressable>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  card: { overflow: "hidden" },
  image: { width: "100%", height: 170 },
  body: { padding: 16 },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 14,
  },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6, flex: 1 },
});
