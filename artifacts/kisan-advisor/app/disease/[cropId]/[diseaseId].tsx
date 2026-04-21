import { Feather } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { useSettings } from "@/contexts/SettingsContext";
import { getCrop, localized } from "@/data/crops";
import { useColors } from "@/hooks/useColors";
import { t } from "@/lib/i18n";

export default function DiseaseDetail() {
  const { cropId, diseaseId } = useLocalSearchParams<{ cropId: string; diseaseId: string }>();
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { lang } = useSettings();

  const crop = getCrop(cropId ?? "");
  const disease = crop?.diseases.find((d) => d.id === diseaseId);

  if (!crop || !disease) {
    return (
      <View style={{ flex: 1, backgroundColor: c.background, padding: 24 }}>
        <AppText variant="h2">Not found</AppText>
      </View>
    );
  }

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{ padding: 16, paddingBottom: insets.bottom + 32 }}
    >
      <Stack.Screen options={{ title: localized(disease.name, lang) }} />

      <Card style={{ marginBottom: 16 }}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <View style={[s.iconBubble, { backgroundColor: c.destructive + "1A" }]}>
            <Feather name="alert-triangle" size={20} color={c.destructive} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="caption" color={c.mutedForeground}>
              {localized(crop.name, lang)}
            </AppText>
            <AppText variant="h2">{localized(disease.name, lang)}</AppText>
          </View>
        </View>
      </Card>

      <Section title={t("whenItStrikes", lang)}>
        <Card>
          <AppText variant="body">{localized(disease.whenItStrikes, lang)}</AppText>
        </Card>
      </Section>

      <Section title={t("symptoms", lang)}>
        <Card>
          <AppText variant="body">{localized(disease.symptoms, lang)}</AppText>
        </Card>
      </Section>

      <Section title={t("treatment", lang)}>
        <Card>
          <AppText variant="body">{localized(disease.treatment, lang)}</AppText>
        </Card>
      </Section>

      <Section title={t("prevention", lang)}>
        <Card>
          <AppText variant="body">{localized(disease.prevention, lang)}</AppText>
        </Card>
      </Section>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  iconBubble: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
});
