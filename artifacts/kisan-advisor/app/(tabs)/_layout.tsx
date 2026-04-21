import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, StyleSheet, View, useColorScheme } from "react-native";
import { useRouter } from "expo-router";

import { useColors } from "@/hooks/useColors";
import { useSettings } from "@/contexts/SettingsContext";
import { t } from "@/lib/i18n";

export default function TabLayout() {
  const colors = useColors();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";
  const isIOS = Platform.OS === "ios";
  const isWeb = Platform.OS === "web";
  const { lang } = useSettings();
  const router = useRouter();

  const SettingsButton = () => (
    <Pressable
      hitSlop={12}
      onPress={() => router.push("/settings")}
      style={{ paddingHorizontal: 16 }}
    >
      <Feather name="settings" size={22} color={colors.foreground} />
    </Pressable>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        headerShown: true,
        headerStyle: { backgroundColor: colors.background },
        headerShadowVisible: false,
        headerTitleStyle: { fontFamily: "Inter_700Bold", color: colors.foreground },
        headerRight: () => <SettingsButton />,
        tabBarStyle: {
          position: "absolute",
          backgroundColor: isIOS ? "transparent" : colors.background,
          borderTopWidth: isWeb ? 1 : 0,
          borderTopColor: colors.border,
          elevation: 0,
          ...(isWeb ? { height: 84 } : {}),
        },
        tabBarLabelStyle: { fontFamily: "Inter_600SemiBold", fontSize: 11 },
        tabBarBackground: () =>
          isIOS ? (
            <BlurView intensity={100} tint={isDark ? "dark" : "light"} style={StyleSheet.absoluteFill} />
          ) : isWeb ? (
            <View style={[StyleSheet.absoluteFill, { backgroundColor: colors.background }]} />
          ) : null,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("tabHome", lang),
          headerTitle: t("appName", lang),
          tabBarIcon: ({ color }) => <Feather name="home" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: t("tabCrops", lang),
          headerTitle: t("tabCrops", lang),
          tabBarIcon: ({ color }) => <Feather name="grid" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: t("tabScan", lang),
          headerTitle: t("scanCrop", lang),
          tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="market"
        options={{
          title: t("tabMarket", lang),
          headerTitle: t("marketPrices", lang),
          tabBarIcon: ({ color }) => <Feather name="trending-up" size={22} color={color} />,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: t("tabChat", lang),
          headerTitle: t("chatTitle", lang),
          tabBarIcon: ({ color }) => <Feather name="message-circle" size={22} color={color} />,
        }}
      />
    </Tabs>
  );
}
