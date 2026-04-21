import { Feather } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AppText } from "@/components/AppText";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Pill } from "@/components/Pill";
import { Section } from "@/components/Section";
import { useSettings } from "@/contexts/SettingsContext";
import { crops, localized } from "@/data/crops";
import { useColors } from "@/hooks/useColors";
import { analyzeCropImage, type CropAnalysis } from "@/lib/api";
import { t } from "@/lib/i18n";

type Picked = {
  uri: string;
  base64: string;
  mime: string;
};

export default function ScanScreen() {
  const c = useColors();
  const insets = useSafeAreaInsets();
  const { lang, cropId, setCropId } = useSettings();
  const [picked, setPicked] = useState<Picked | null>(null);
  const [analysis, setAnalysis] = useState<CropAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isWeb = Platform.OS === "web";

  const onResult = useCallback((res: ImagePicker.ImagePickerResult) => {
    if (res.canceled || !res.assets?.[0]) return;
    const a = res.assets[0];
    if (!a.base64) return;
    const mime = a.mimeType ?? "image/jpeg";
    setPicked({ uri: a.uri, base64: a.base64, mime });
    setAnalysis(null);
    setError(null);
  }, []);

  const takePhoto = useCallback(async () => {
    if (isWeb) {
      const r = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        base64: true,
        quality: 0.7,
      });
      onResult(r);
      return;
    }
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(t("scanCrop", lang), "Camera permission denied");
      return;
    }
    const r = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
      allowsEditing: false,
    });
    onResult(r);
  }, [isWeb, lang, onResult]);

  const pickGallery = useCallback(async () => {
    const r = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      base64: true,
      quality: 0.7,
    });
    onResult(r);
  }, [onResult]);

  const analyze = useCallback(async () => {
    if (!picked) return;
    setLoading(true);
    setError(null);
    setAnalysis(null);
    try {
      const res = await analyzeCropImage({
        lang,
        cropId,
        imageBase64: picked.base64,
        mimeType: picked.mime,
      });
      setAnalysis(res);
    } catch (e) {
      setError((e as Error).message ?? "Error");
    } finally {
      setLoading(false);
    }
  }, [picked, lang, cropId]);

  const reset = () => {
    setPicked(null);
    setAnalysis(null);
    setError(null);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: c.background }}
      contentContainerStyle={{
        padding: 16,
        gap: 16,
        paddingBottom: insets.bottom + (isWeb ? 110 : 100),
      }}
    >
      <Card>
        <AppText variant="h3">{t("whichCrop", lang)}</AppText>
        <View style={{ flexDirection: "row", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {crops.map((cr) => (
            <Pill
              key={cr.id}
              label={localized(cr.name, lang)}
              selected={cr.id === cropId}
              onPress={() => setCropId(cr.id)}
            />
          ))}
        </View>
      </Card>

      <Card padded={false} style={{ overflow: "hidden" }}>
        {picked ? (
          <View>
            <Image source={{ uri: picked.uri }} style={styles.preview} contentFit="cover" />
            <View style={{ flexDirection: "row", gap: 8, padding: 12 }}>
              <Button label={t("retake", lang)} variant="secondary" icon="refresh-cw" onPress={reset} style={{ flex: 1 }} />
              <Button label={t("analyze", lang)} icon="zap" loading={loading} onPress={analyze} style={{ flex: 1 }} />
            </View>
          </View>
        ) : (
          <View style={styles.empty}>
            <View style={[styles.bigIcon, { backgroundColor: c.primary + "1A" }]}>
              <Feather name="camera" size={36} color={c.primary} />
            </View>
            <AppText variant="h2" style={{ marginTop: 12 }}>
              {t("scanCrop", lang)}
            </AppText>
            <AppText variant="body" color={c.mutedForeground} style={{ textAlign: "center", marginTop: 6 }}>
              {t("scanDesc", lang)}
            </AppText>
            <View style={{ flexDirection: "row", gap: 8, marginTop: 16, alignSelf: "stretch" }}>
              <Button label={t("takePhoto", lang)} icon="camera" onPress={takePhoto} style={{ flex: 1 }} />
              <Button label={t("pickPhoto", lang)} variant="secondary" icon="image" onPress={pickGallery} style={{ flex: 1 }} />
            </View>
          </View>
        )}
      </Card>

      {loading && (
        <Card style={{ alignItems: "center" }}>
          <AppText variant="body">{t("analyzing", lang)}</AppText>
        </Card>
      )}

      {error && (
        <Card>
          <AppText variant="h3" color={c.destructive}>
            {t("errorGeneric", lang)}
          </AppText>
          <AppText variant="caption" color={c.mutedForeground} style={{ marginTop: 4 }}>
            {error}
          </AppText>
          <Button label={t("retry", lang)} onPress={analyze} style={{ marginTop: 12 }} icon="refresh-cw" />
        </Card>
      )}

      {analysis && <AnalysisCard analysis={analysis} onRetry={() => { reset(); }} />}

      <Section title={t("scanTipsTitle", lang)}>
        <Card>
          {[t("scanTip1", lang), t("scanTip2", lang), t("scanTip3", lang)].map((tip, i) => (
            <View key={i} style={{ flexDirection: "row", gap: 8, paddingVertical: 6 }}>
              <Feather name="check" size={16} color={c.primary} />
              <AppText variant="body" style={{ flex: 1 }}>
                {tip}
              </AppText>
            </View>
          ))}
        </Card>
      </Section>
    </ScrollView>
  );
}

function AnalysisCard({
  analysis,
  onRetry,
}: {
  analysis: CropAnalysis;
  onRetry: () => void;
}) {
  const c = useColors();
  const { lang } = useSettings();
  const bad = !analysis.isClearPhoto;

  return (
    <Card>
      <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
        <Feather
          name={bad ? "alert-circle" : analysis.healthStatus === "healthy" ? "check-circle" : "info"}
          size={22}
          color={bad ? c.destructive : analysis.healthStatus === "healthy" ? c.primary : c.accentForeground}
        />
        <AppText variant="h2" style={{ flex: 1 }}>
          {bad ? t("badPhotoTitle", lang) : t("goodPhotoTitle", lang)}
        </AppText>
      </View>

      {bad ? (
        <>
          {analysis.retakeReason && (
            <AppText variant="body" color={c.mutedForeground} style={{ marginTop: 8 }}>
              {analysis.retakeReason}
            </AppText>
          )}
          {analysis.retakeInstructions && (
            <View style={{ marginTop: 12, padding: 12, borderRadius: 12, backgroundColor: c.secondary }}>
              <AppText variant="label" style={{ marginBottom: 4 }}>
                {lang === "ur" ? "اگلی تصویر کیسے لیں" : "How to take the next photo"}
              </AppText>
              <AppText variant="body">{analysis.retakeInstructions}</AppText>
            </View>
          )}
          <Button label={t("retake", lang)} icon="refresh-cw" onPress={onRetry} style={{ marginTop: 14 }} />
        </>
      ) : (
        <>
          {analysis.summary && (
            <AppText variant="body" style={{ marginTop: 10 }}>
              {analysis.summary}
            </AppText>
          )}
          <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
            {analysis.identifiedCrop && (
              <Pill label={`${lang === "ur" ? "فصل: " : "Crop: "}${analysis.identifiedCrop}`} />
            )}
            {analysis.healthStatus && (
              <Pill label={`${lang === "ur" ? "حالت: " : "Status: "}${analysis.healthStatus}`} />
            )}
            {typeof analysis.confidence === "number" && (
              <Pill label={`${lang === "ur" ? "یقین: " : "Confidence: "}${Math.round(analysis.confidence * 100)}%`} />
            )}
          </View>
          {analysis.diseaseName && (
            <Card style={{ marginTop: 12, backgroundColor: c.destructive + "10", borderColor: c.destructive + "55" }}>
              <AppText variant="h3" color={c.destructive}>
                {analysis.diseaseName}
              </AppText>
              {analysis.symptoms && (
                <AppText variant="body" style={{ marginTop: 6 }}>
                  {analysis.symptoms}
                </AppText>
              )}
            </Card>
          )}
          {analysis.immediateActions && analysis.immediateActions.length > 0 && (
            <View style={{ marginTop: 14 }}>
              <AppText variant="label" style={{ marginBottom: 6 }}>
                {lang === "ur" ? "ابھی کیا کریں" : "Do this now"}
              </AppText>
              {analysis.immediateActions.map((a, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 8, paddingVertical: 4 }}>
                  <Feather name="arrow-right" size={16} color={c.primary} />
                  <AppText variant="body" style={{ flex: 1 }}>
                    {a}
                  </AppText>
                </View>
              ))}
            </View>
          )}
          {analysis.preventiveTips && analysis.preventiveTips.length > 0 && (
            <View style={{ marginTop: 14 }}>
              <AppText variant="label" style={{ marginBottom: 6 }}>
                {lang === "ur" ? "آئندہ کے لیے" : "For next time"}
              </AppText>
              {analysis.preventiveTips.map((a, i) => (
                <View key={i} style={{ flexDirection: "row", gap: 8, paddingVertical: 4 }}>
                  <Feather name="shield" size={16} color={c.primary} />
                  <AppText variant="body" style={{ flex: 1 }}>
                    {a}
                  </AppText>
                </View>
              ))}
            </View>
          )}
          <View style={{ flexDirection: "row", gap: 8, marginTop: 16 }}>
            <Pressable
              onPress={onRetry}
              style={{ flex: 1, paddingVertical: 12, alignItems: "center" }}
            >
              <AppText variant="label" color={c.primary}>
                {lang === "ur" ? "نئی اسکین" : "Scan another"}
              </AppText>
            </Pressable>
          </View>
        </>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  preview: { width: "100%", height: 280 },
  empty: { alignItems: "center", padding: 24 },
  bigIcon: {
    width: 84,
    height: 84,
    borderRadius: 42,
    alignItems: "center",
    justifyContent: "center",
  },
});
