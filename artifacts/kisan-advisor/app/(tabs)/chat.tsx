import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { useSettings } from "@/contexts/SettingsContext";
import { useColors } from "@/hooks/useColors";
import { aiChat } from "@/lib/api";
import { t } from "@/lib/i18n";
import { crops, localized } from "@/data/crops";

type Msg = { id: string; role: "user" | "assistant"; content: string };

const STORAGE_KEY = "kisan.chat.v1";

export default function ChatScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { lang, cropId, weather, location } = useSettings();
  const isWeb = Platform.OS === "web";

  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<FlatList<Msg>>(null);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then((v) => {
        if (v) setMessages(JSON.parse(v));
      })
      .catch(() => undefined);
  }, []);

  const persist = useCallback((next: Msg[]) => {
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next.slice(-50))).catch(() => undefined);
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || sending) return;
    const cropName = localized(crops.find((cr) => cr.id === cropId)!.name, lang);
    const userMsg: Msg = {
      id: Date.now().toString() + "u",
      role: "user",
      content: text,
    };
    const next = [...messages, userMsg];
    setMessages(next);
    persist(next);
    setInput("");
    setSending(true);
    setError(null);

    const ctxLine =
      `Context — crop: ${cropName} (${cropId}); ` +
      (location ? `location: ${location.latitude.toFixed(2)},${location.longitude.toFixed(2)}; ` : "") +
      (weather
        ? `weather: ${Math.round(weather.tempC)}°C, humidity ${Math.round(weather.humidity)}%, wind ${Math.round(weather.windKmh)}km/h, rain today ${(weather.daily[0]?.rainMm ?? 0).toFixed(1)}mm.`
        : "no weather data.");

    try {
      const reply = await aiChat({
        lang,
        history: next.slice(-12).map((m) => ({ role: m.role, content: m.content })),
        message: `${ctxLine}\n\nFarmer says: ${text}`,
      });
      const aiMsg: Msg = {
        id: Date.now().toString() + "a",
        role: "assistant",
        content: reply,
      };
      const next2 = [...next, aiMsg];
      setMessages(next2);
      persist(next2);
    } catch (e) {
      setError((e as Error).message ?? "Error");
    } finally {
      setSending(false);
      setTimeout(() => listRef.current?.scrollToEnd?.({ animated: true }), 50);
    }
  }, [input, messages, sending, lang, cropId, weather, location, persist]);

  const data = messages.length === 0
    ? [{ id: "welcome", role: "assistant" as const, content: t("chatWelcome", lang) }]
    : messages;

  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1, backgroundColor: c.background }}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        ref={listRef}
        data={data}
        keyExtractor={(m) => m.id}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: 16,
          gap: 10,
        }}
        renderItem={({ item }) => <Bubble msg={item} />}
        keyboardDismissMode="interactive"
        keyboardShouldPersistTaps="handled"
        ListFooterComponent={
          sending ? (
            <View style={{ paddingVertical: 8, alignItems: "flex-start" }}>
              <View style={[s.bubble, { backgroundColor: c.secondary, borderColor: c.border }]}>
                <ActivityIndicator color={c.primary} />
              </View>
            </View>
          ) : error ? (
            <View style={{ paddingVertical: 8 }}>
              <AppText variant="caption" color={c.destructive}>
                {error}
              </AppText>
            </View>
          ) : null
        }
      />
      <View
        style={[
          s.composer,
          {
            backgroundColor: c.background,
            borderTopColor: c.border,
            paddingBottom: insets.bottom + (isWeb ? 90 : 84),
          },
        ]}
      >
        <View style={[s.inputWrap, { backgroundColor: c.secondary, borderColor: c.border }]}>
          <TextInput
            value={input}
            onChangeText={setInput}
            placeholder={t("chatPlaceholder", lang)}
            placeholderTextColor={c.mutedForeground}
            multiline
            style={[s.input, { color: c.foreground, fontFamily: "Inter_400Regular" }]}
            onSubmitEditing={send}
          />
          <Pressable
            onPress={send}
            disabled={sending || !input.trim()}
            style={[
              s.sendBtn,
              {
                backgroundColor: input.trim() && !sending ? c.primary : c.muted,
              },
            ]}
          >
            <Feather name="send" size={18} color="#fff" />
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

function Bubble({ msg }: { msg: Msg }) {
  const c = useColors();
  const me = msg.role === "user";
  return (
    <View
      style={{
        alignItems: me ? "flex-end" : "flex-start",
        width: "100%",
      }}
    >
      <View
        style={[
          s.bubble,
          me
            ? { backgroundColor: c.primary, borderColor: c.primary }
            : { backgroundColor: c.card, borderColor: c.border },
        ]}
      >
        <AppText variant="body" color={me ? c.primaryForeground : c.foreground}>
          {msg.content}
        </AppText>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  bubble: {
    maxWidth: "86%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 18,
    borderWidth: StyleSheet.hairlineWidth,
  },
  composer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  inputWrap: {
    flexDirection: "row",
    alignItems: "flex-end",
    borderRadius: 24,
    borderWidth: 1,
    paddingLeft: 14,
    paddingRight: 6,
    paddingVertical: 6,
    gap: 8,
    minHeight: 46,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingTop: Platform.OS === "ios" ? 8 : 4,
    paddingBottom: Platform.OS === "ios" ? 8 : 4,
    maxHeight: 120,
  },
  sendBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },
});
