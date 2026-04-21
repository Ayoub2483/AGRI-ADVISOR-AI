import { Feather } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { Section } from "@/components/Section";
import { useSettings } from "@/contexts/SettingsContext";
import { crops, localized } from "@/data/crops";
import { getDailyMarketRows } from "@/data/market";
import { useColors } from "@/hooks/useColors";
import { t } from "@/lib/i18n";

export default function MarketScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { lang, cropId, setCropId } = useSettings();
  const [selected, setSelected] = useState<typeof cropId>(cropId);

  React.useEffect(() => setSelected(cropId), [cropId]);

  const rows = useMemo(() => getDailyMarketRows(), []);
  const today = new Date().toLocaleDateString(lang === "ur" ? "ur-PK" : "en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        paddingBottom: insets.bottom + (Platform.OS === "web" ? 110 : 100),
      }}
    >
      <Card>
        <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
          <View>
            <AppText variant="h3">{t("marketPrices", lang)}</AppText>
            <AppText variant="caption" color={c.mutedForeground}>
              {t("updated", lang)}: {today}
            </AppText>
          </View>
          <Feather name="trending-up" size={22} color={c.primary} />
        </View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
          <View style={{ flexDirection: "row", gap: 8 }}>
            {crops.map((cr) => (
              <Pill
                key={cr.id}
                label={localized(cr.name, lang)}
                selected={cr.id === selected}
                onPress={() => {
                  setSelected(cr.id);
                  setCropId(cr.id);
                }}
              />
            ))}
          </View>
        </ScrollView>
      </Card>

      <Section title={t("perMaund", lang)}>
        <Card padded={false}>
          {rows.map((r, i) => {
            const p = r.prices[selected];
            return (
              <View
                key={i}
                style={{
                  padding: 14,
                  borderTopWidth: i === 0 ? 0 : StyleSheet.hairlineWidth,
                  borderTopColor: c.border,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <View
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 18,
                    backgroundColor: c.primary + "18",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Feather name="map-pin" size={16} color={c.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="h3">{localized(r.market, lang)}</AppText>
                  <AppText variant="caption" color={c.mutedForeground}>
                    {lang === "ur" ? "تھوک منڈی" : "Wholesale mandi"}
                  </AppText>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <AppText variant="h3">
                    {p.min.toLocaleString()} – {p.max.toLocaleString()}
                  </AppText>
                  <AppText variant="caption" color={c.mutedForeground}>
                    PKR / 40kg
                  </AppText>
                </View>
              </View>
            );
          })}
        </Card>
      </Section>

      <Card style={{ flexDirection: "row", gap: 10, alignItems: "flex-start" }}>
        <Feather name="info" size={18} color={c.mutedForeground} />
        <AppText variant="caption" color={c.mutedForeground} style={{ flex: 1 }}>
          {lang === "ur"
            ? "یہ قیمتیں اشاراتی ہیں اور حالیہ منڈی کی رینج پر مبنی ہیں۔ سودے سے پہلے مقامی مارکیٹ سے تصدیق کریں۔"
            : "These prices are indicative based on recent wholesale ranges. Confirm with your local mandi before trading."}
        </AppText>
      </Card>
    </ScrollView>
  );
}
