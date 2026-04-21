import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { Platform, Pressable, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { useSettings } from "@/contexts/SettingsContext";
import { getCrop, localized } from "@/data/crops";
import { useColors } from "@/hooks/useColors";
import { t } from "@/lib/i18n";

export default function CropDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const c = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { lang } = useSettings();
  const crop = getCrop(id ?? "");

  if (!crop) {
    return (
      <View style={{ flex: 1, backgroundColor: c.background, padding: 24 }}>
        <AppText variant="h2">Not found</AppText>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: c.background }}>
      <Stack.Screen options={{ title: localized(crop.name, lang) }} />
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 32 }}>
        <View>
          <Image source={crop.image} style={styles.hero} contentFit="cover" />
          <LinearGradient
            colors={["transparent", "rgba(0,0,0,0.65)"]}
            style={styles.heroOverlay}
          />
          <View style={[styles.heroText, { bottom: 16 }]}>
            <AppText variant="title" color="#fff">
              {localized(crop.name, lang)}
            </AppText>
          </View>
        </View>

        <View style={{ padding: 16 }}>
          <Section title={t("introduction", lang)}>
            <Card>
              <AppText variant="body">{localized(crop.intro, lang)}</AppText>
            </Card>
          </Section>

          <Section title={t("requirements", lang)}>
            <Card>
              <AppText variant="body">{localized(crop.requirements, lang)}</AppText>
            </Card>
          </Section>

          <Section title={t("cultivation", lang)}>
            <Card>
              <AppText variant="body">{localized(crop.cultivation, lang)}</AppText>
            </Card>
          </Section>

          <View style={{ flexDirection: "row", gap: 12, marginBottom: 24 }}>
            <Card style={{ flex: 1 }}>
              <Feather name="calendar" size={20} color={c.primary} />
              <AppText variant="caption" color={c.mutedForeground} style={{ marginTop: 8 }}>
                {t("sowing", lang)}
              </AppText>
              <AppText variant="body" style={{ marginTop: 4 }}>
                {localized(crop.sowing, lang)}
              </AppText>
            </Card>
            <Card style={{ flex: 1 }}>
              <Feather name="scissors" size={20} color={c.primary} />
              <AppText variant="caption" color={c.mutedForeground} style={{ marginTop: 8 }}>
                {t("harvesting", lang)}
              </AppText>
              <AppText variant="body" style={{ marginTop: 4 }}>
                {localized(crop.harvesting, lang)}
              </AppText>
            </Card>
          </View>

          <Section title={t("growthStages", lang)}>
            <Card>
              {crop.growthStages.map((s, i) => (
                <View
                  key={i}
                  style={{
                    paddingVertical: 12,
                    borderTopWidth: i === 0 ? 0 : StyleSheet.hairlineWidth,
                    borderTopColor: c.border,
                    flexDirection: "row",
                    gap: 12,
                  }}
                >
                  <View
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 16,
                      backgroundColor: c.primary + "22",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <AppText variant="label" color={c.primary}>
                      {i + 1}
                    </AppText>
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText variant="h3">{localized(s.name, lang)}</AppText>
                    <AppText variant="caption" color={c.mutedForeground}>
                      {localized(s.days, lang)}
                    </AppText>
                    <AppText variant="body" style={{ marginTop: 4 }}>
                      {localized(s.notes, lang)}
                    </AppText>
                  </View>
                </View>
              ))}
            </Card>
          </Section>

          <Section title={t("fertilizerPlan", lang)}>
            <Card padded={false}>
              {crop.fertilizer.map((f, i) => (
                <ScheduleRow
                  key={i}
                  index={i}
                  stage={localized(f.stageDays, lang)}
                  product={localized(f.product, lang)}
                  rate={localized(f.rateOrTiming, lang)}
                />
              ))}
            </Card>
          </Section>

          <Section title={t("pesticidePlan", lang)}>
            <Card padded={false}>
              {crop.pesticide.map((f, i) => (
                <ScheduleRow
                  key={i}
                  index={i}
                  stage={localized(f.stageDays, lang)}
                  product={localized(f.product, lang)}
                  rate={localized(f.rateOrTiming, lang)}
                />
              ))}
            </Card>
          </Section>

          <Section title={t("storage", lang)}>
            <Card>
              <AppText variant="body">{localized(crop.storage, lang)}</AppText>
            </Card>
          </Section>

          <Section title={t("diseases", lang)}>
            {crop.diseases.map((d) => (
              <Pressable
                key={d.id}
                onPress={() => router.push(`/disease/${crop.id}/${d.id}`)}
              >
                <Card style={{ marginBottom: 8, flexDirection: "row", alignItems: "center", gap: 12 }}>
                  <View
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: 19,
                      backgroundColor: c.destructive + "1A",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Feather name="alert-triangle" size={18} color={c.destructive} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <AppText variant="h3">{localized(d.name, lang)}</AppText>
                    <AppText variant="caption" color={c.mutedForeground} numberOfLines={1}>
                      {localized(d.whenItStrikes, lang)}
                    </AppText>
                  </View>
                  <Feather name="chevron-right" size={20} color={c.mutedForeground} />
                </Card>
              </Pressable>
            ))}
          </Section>
        </View>
      </ScrollView>
    </View>
  );
}

function ScheduleRow({
  index,
  stage,
  product,
  rate,
}: {
  index: number;
  stage: string;
  product: string;
  rate: string;
}) {
  const c = useColors();
  return (
    <View
      style={{
        padding: 14,
        borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
        borderTopColor: c.border,
      }}
    >
      <AppText variant="caption" color={c.mutedForeground}>
        {stage}
      </AppText>
      <AppText variant="h3" style={{ marginTop: 2 }}>
        {product}
      </AppText>
      <AppText variant="body" color={c.mutedForeground} style={{ marginTop: 2 }}>
        {rate}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { width: "100%", height: 280 },
  heroOverlay: { position: "absolute", left: 0, right: 0, bottom: 0, height: 120 },
  heroText: { position: "absolute", left: 16, right: 16 },
});
