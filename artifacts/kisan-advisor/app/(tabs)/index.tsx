import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import * as Location from "expo-location";
import React, { useCallback } from "react";
import {
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { Section } from "@/components/Section";
import { useSettings } from "@/contexts/SettingsContext";
import { crops, localized } from "@/data/crops";
import { useColors } from "@/hooks/useColors";
import { getAdvice } from "@/lib/advice";
import { t } from "@/lib/i18n";
import { weatherLabel } from "@/lib/weather";

export default function HomeScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const {
    lang,
    cropId,
    setCropId,
    location,
    weather,
    weatherLoading,
    refreshWeather,
    setLocation,
  } = useSettings();
  const isWeb = Platform.OS === "web";

  const advice = getAdvice(weather, cropId, lang);
  const selectedCrop = crops.find((cr) => cr.id === cropId)!;

  const askLocation = useCallback(async () => {
    if (Platform.OS === "web" && typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude }),
        () => undefined,
      );
      return;
    }
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      const pos = await Location.getCurrentPositionAsync({});
      setLocation({ latitude: pos.coords.latitude, longitude: pos.coords.longitude });
    }
  }, [setLocation]);

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{ paddingBottom: insets.bottom + (isWeb ? 110 : 100) }}
      refreshControl={
        <RefreshControl refreshing={weatherLoading} onRefresh={refreshWeather} tintColor={c.primary} />
      }
    >
      <LinearGradient
        colors={[c.primary, "#5aaa54"]}
        style={[styles.hero, { paddingTop: 16 }]}
      >
        <Pressable onPress={location ? refreshWeather : askLocation}>
          <View style={styles.weatherRow}>
            <View style={{ flex: 1 }}>
              <AppText variant="caption" color="rgba(255,255,255,0.85)">
                {location?.label ?? `${location?.latitude.toFixed(2) ?? "—"}, ${location?.longitude.toFixed(2) ?? ""}`}
              </AppText>
              {weather ? (
                <>
                  <AppText variant="title" color="#fff">
                    {Math.round(weather.tempC)}°C
                  </AppText>
                  <AppText variant="body" color="rgba(255,255,255,0.95)">
                    {weatherLabel(weather.weatherCode, lang)}
                  </AppText>
                </>
              ) : (
                <>
                  <AppText variant="h2" color="#fff">
                    {t("noLocation", lang)}
                  </AppText>
                </>
              )}
            </View>
            <Feather
              name={weather ? "sun" : "map-pin"}
              size={56}
              color="rgba(255,255,255,0.95)"
            />
          </View>

          {weather && (
            <View style={styles.statsRow}>
              <Stat label={t("feels", lang)} value={`${Math.round(weather.apparentC)}°`} />
              <Stat label={t("humidity", lang)} value={`${Math.round(weather.humidity)}%`} />
              <Stat label={t("wind", lang)} value={`${Math.round(weather.windKmh)} km/h`} />
              <Stat
                label={t("rainToday", lang)}
                value={`${(weather.daily[0]?.rainMm ?? 0).toFixed(1)} mm`}
              />
            </View>
          )}
        </Pressable>
      </LinearGradient>

      <View style={styles.body}>
        {/* Crop selector */}
        <Section title={t("yourCrops", lang)}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8 }}>
            {crops.map((cr) => (
              <Pill
                key={cr.id}
                label={localized(cr.name, lang)}
                selected={cr.id === cropId}
                onPress={() => setCropId(cr.id)}
              />
            ))}
          </ScrollView>
        </Section>

        {/* Today's advice */}
        <Section title={t("todaysAdvice", lang)}>
          {advice.map((a, i) => (
            <Card key={i} style={{ marginBottom: 8 }}>
              <View style={{ flexDirection: "row", alignItems: "flex-start", gap: 12 }}>
                <View
                  style={[
                    adviceStyles.iconBubble,
                    {
                      backgroundColor:
                        a.priority === "high"
                          ? c.destructive + "1A"
                          : a.priority === "medium"
                            ? c.accent + "33"
                            : c.primary + "1A",
                    },
                  ]}
                >
                  <Feather
                    name={a.icon as keyof typeof Feather.glyphMap}
                    size={20}
                    color={
                      a.priority === "high"
                        ? c.destructive
                        : a.priority === "medium"
                          ? c.accentForeground
                          : c.primary
                    }
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <AppText variant="h3">{a.title}</AppText>
                  <AppText variant="body" color={c.mutedForeground} style={{ marginTop: 4 }}>
                    {a.body}
                  </AppText>
                </View>
              </View>
            </Card>
          ))}
        </Section>

        {/* Selected crop quick-link */}
        <Section title={localized(selectedCrop.name, lang)}>
          <Pressable onPress={() => router.push(`/crop/${selectedCrop.id}`)}>
            <Card padded={false} style={{ overflow: "hidden" }}>
              <Image source={selectedCrop.image} style={styles.cropImage} contentFit="cover" />
              <View style={{ padding: 16 }}>
                <AppText variant="body" color={c.mutedForeground} numberOfLines={3}>
                  {localized(selectedCrop.intro, lang)}
                </AppText>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 6,
                    marginTop: 12,
                  }}
                >
                  <AppText variant="label" color={c.primary}>
                    {t("exploreCrops", lang)}
                  </AppText>
                  <Feather name="arrow-right" size={16} color={c.primary} />
                </View>
              </View>
            </Card>
          </Pressable>
        </Section>

        {/* Weekly scan reminder */}
        <Card style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
          <View
            style={[
              adviceStyles.iconBubble,
              { backgroundColor: c.accent + "33" },
            ]}
          >
            <Feather name="camera" size={20} color={c.accentForeground} />
          </View>
          <View style={{ flex: 1 }}>
            <AppText variant="body">{t("weeklyReminder", lang)}</AppText>
          </View>
          <Pressable onPress={() => router.push("/scan")} hitSlop={10}>
            <Feather name="chevron-right" size={22} color={c.mutedForeground} />
          </Pressable>
        </Card>
      </View>
    </ScrollView>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={{ flex: 1 }}>
      <AppText variant="caption" color="rgba(255,255,255,0.8)">
        {label}
      </AppText>
      <AppText variant="h3" color="#fff">
        {value}
      </AppText>
    </View>
  );
}

const adviceStyles = StyleSheet.create({
  iconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

const styles = StyleSheet.create({
  hero: {
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    gap: 16,
  },
  weatherRow: { flexDirection: "row", alignItems: "center", gap: 16 },
  statsRow: { flexDirection: "row", gap: 12 },
  body: { padding: 16, gap: 8 },
  cropImage: { width: "100%", height: 160 },
});
