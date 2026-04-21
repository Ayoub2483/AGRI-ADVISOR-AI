import { Feather } from "@expo/vector-icons";
import React from "react";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Section } from "@/components/Section";
import { useSettings } from "@/contexts/SettingsContext";
import { useColors } from "@/hooks/useColors";
import { t } from "@/lib/i18n";

export default function SettingsScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { lang, setLang, location, setLocation } = useSettings();

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{ padding: 16, gap: 16, paddingBottom: insets.bottom + 32 }}
    >
      <Section title={t("changeLang", lang)}>
        <Card padded={false}>
          <Row
            label="English"
            active={lang === "en"}
            onPress={() => setLang("en")}
          />
          <Row
            label="اردو"
            active={lang === "ur"}
            onPress={() => setLang("ur")}
          />
        </Card>
      </Section>

      <Section title={lang === "ur" ? "لوکیشن" : "Location"}>
        <Card>
          {location ? (
            <View>
              <AppText variant="body">
                {location.latitude.toFixed(3)}, {location.longitude.toFixed(3)}
              </AppText>
              <Button
                label={lang === "ur" ? "صاف کریں" : "Clear"}
                variant="secondary"
                onPress={() => setLocation(null)}
                style={{ marginTop: 12 }}
              />
            </View>
          ) : (
            <AppText variant="body" color={c.mutedForeground}>
              {t("noLocation", lang)}
            </AppText>
          )}
        </Card>
      </Section>

      <Section title={lang === "ur" ? "ایپ کے بارے میں" : "About"}>
        <Card>
          <AppText variant="body">{t("appName", lang)}</AppText>
          <AppText variant="caption" color={c.mutedForeground} style={{ marginTop: 4 }}>
            v1.0.0 — {t("tagline", lang)}
          </AppText>
        </Card>
      </Section>
    </ScrollView>
  );
}

function Row({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const c = useColors();
  return (
    <View
      onTouchEnd={onPress}
      style={{
        padding: 14,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderTopWidth: 1,
        borderTopColor: c.border,
      }}
    >
      <AppText variant="body">{label}</AppText>
      <Feather
        name={active ? "check-circle" : "circle"}
        size={20}
        color={active ? c.primary : c.mutedForeground}
      />
    </View>
  );
}
