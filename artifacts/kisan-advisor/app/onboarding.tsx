import { Feather } from "@expo/vector-icons";
import * as Location from "expo-location";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "expo-image";
import React, { useState } from "react";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { useSettings } from "@/contexts/SettingsContext";
import { useColors } from "@/hooks/useColors";
import { t, type Lang } from "@/lib/i18n";

export default function OnboardingScreen() {
  const insets = useSafeAreaInsets();
  const c = useColors();
  const { lang, setLang, setLocation, finishOnboarding } = useSettings();
  const [step, setStep] = useState<"lang" | "loc">("lang");
  const [requesting, setRequesting] = useState(false);
  const isWeb = Platform.OS === "web";

  const askLocation = async () => {
    setRequesting(true);
    try {
      if (isWeb && typeof navigator !== "undefined" && navigator.geolocation) {
        await new Promise<void>((resolve) =>
          navigator.geolocation.getCurrentPosition(
            (pos) => {
              setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
              resolve();
            },
            () => resolve(),
            { enableHighAccuracy: false, timeout: 8000 },
          ),
        );
      } else {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status === "granted") {
          const pos = await Location.getCurrentPositionAsync({});
          setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
        }
      }
    } catch {
      // ignore — user can set later
    } finally {
      setRequesting(false);
      finishOnboarding();
    }
  };

  return (
    <View style={[styles.flex, { backgroundColor: c.background }]}>
      <LinearGradient
        colors={["#2f7d3a", "#5aaa54"]}
        style={[styles.hero, { paddingTop: insets.top + (isWeb ? 67 : 24) }]}
      >
        <Image
          source={require("@/assets/images/icon.png")}
          style={styles.logo}
          contentFit="contain"
        />
        <AppText variant="title" color="#fff">
          {t("appName", lang)}
        </AppText>
        <AppText variant="body" color="rgba(255,255,255,0.92)" style={{ textAlign: "center" }}>
          {t("tagline", lang)}
        </AppText>
      </LinearGradient>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 40 }]}>
        {step === "lang" ? (
          <Card>
            <AppText variant="h2" style={{ marginBottom: 16 }}>
              {t("chooseLanguage", lang)}
            </AppText>
            <View style={{ gap: 10 }}>
              <LangOption
                title={t("english", "en")}
                subtitle="English"
                active={lang === "en"}
                onPress={() => setLang("en")}
              />
              <LangOption
                title="اردو"
                subtitle="Urdu"
                active={lang === "ur"}
                onPress={() => setLang("ur")}
              />
            </View>
            <Button
              label={t("continue", lang)}
              icon="arrow-right"
              full
              onPress={() => setStep("loc")}
              style={{ marginTop: 20 }}
            />
          </Card>
        ) : (
          <Card>
            <Feather name="map-pin" size={28} color={c.primary} />
            <AppText variant="h2" style={{ marginTop: 8, marginBottom: 8 }}>
              {t("enableLocation", lang)}
            </AppText>
            <AppText variant="body" color={c.mutedForeground}>
              {lang === "ur"
                ? "ہم آپ کا مقام صرف موسم اور مقامی مشورہ دکھانے کے لیے استعمال کریں گے۔ اسے کسی کے ساتھ شیئر نہیں کیا جائے گا۔"
                : "We use your location only to show local weather and timely advice. It is never shared."}
            </AppText>
            <Button
              label={t("allow", lang)}
              icon="navigation"
              loading={requesting}
              full
              onPress={askLocation}
              style={{ marginTop: 20 }}
            />
            <Button
              label={t("skip", lang)}
              variant="ghost"
              full
              onPress={finishOnboarding}
              style={{ marginTop: 8 }}
            />
          </Card>
        )}
      </ScrollView>
    </View>
  );
}

function LangOption({
  title,
  subtitle,
  active,
  onPress,
}: {
  title: string;
  subtitle: string;
  active: boolean;
  onPress: () => void;
}) {
  const c = useColors();
  return (
    <View
      style={[
        rowStyles.row,
        {
          backgroundColor: active ? c.primary + "12" : c.secondary,
          borderColor: active ? c.primary : c.border,
        },
      ]}
      onTouchEnd={onPress}
    >
      <View style={{ flex: 1 }}>
        <AppText variant="h3">{title}</AppText>
        <AppText variant="caption" color={c.mutedForeground}>
          {subtitle}
        </AppText>
      </View>
      <Feather
        name={active ? "check-circle" : "circle"}
        size={22}
        color={active ? c.primary : c.mutedForeground}
      />
    </View>
  );
}

const rowStyles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    gap: 12,
  },
});

const styles = StyleSheet.create({
  flex: { flex: 1 },
  hero: {
    paddingHorizontal: 24,
    paddingBottom: 28,
    alignItems: "center",
    gap: 8,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  logo: { width: 84, height: 84, marginBottom: 8 },
  content: { padding: 16, gap: 16 },
});
