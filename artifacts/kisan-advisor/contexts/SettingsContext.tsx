import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import type { Lang } from "@/lib/i18n";
import type { Weather } from "@/lib/weather";
import { fetchWeather } from "@/lib/weather";

type LocationState = {
  latitude: number;
  longitude: number;
  label?: string;
} | null;

type Settings = {
  ready: boolean;
  onboarded: boolean;
  lang: Lang;
  cropId: "wheat" | "rice" | "cotton" | "corn";
  location: LocationState;
  weather: Weather | null;
  weatherLoading: boolean;
  weatherError: string | null;
  setLang: (l: Lang) => void;
  setCropId: (c: Settings["cropId"]) => void;
  setLocation: (loc: LocationState) => void;
  finishOnboarding: () => void;
  refreshWeather: () => Promise<void>;
};

const SettingsContext = createContext<Settings | undefined>(undefined);

const KEYS = {
  onboarded: "kisan.onboarded.v1",
  lang: "kisan.lang.v1",
  crop: "kisan.crop.v1",
  loc: "kisan.loc.v1",
  weather: "kisan.weather.v1",
};

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [lang, setLangState] = useState<Lang>("en");
  const [cropId, setCropIdState] = useState<Settings["cropId"]>("wheat");
  const [location, setLocationState] = useState<LocationState>(null);
  const [weather, setWeather] = useState<Weather | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const [ob, lg, cr, lc, wt] = await Promise.all([
          AsyncStorage.getItem(KEYS.onboarded),
          AsyncStorage.getItem(KEYS.lang),
          AsyncStorage.getItem(KEYS.crop),
          AsyncStorage.getItem(KEYS.loc),
          AsyncStorage.getItem(KEYS.weather),
        ]);
        if (ob === "1") setOnboarded(true);
        if (lg === "en" || lg === "ur") setLangState(lg);
        if (cr === "wheat" || cr === "rice" || cr === "cotton" || cr === "corn") setCropIdState(cr);
        if (lc) setLocationState(JSON.parse(lc));
        if (wt) setWeather(JSON.parse(wt));
      } catch {
        // ignore
      } finally {
        setReady(true);
      }
    })();
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    AsyncStorage.setItem(KEYS.lang, l).catch(() => undefined);
  }, []);

  const setCropId = useCallback((c: Settings["cropId"]) => {
    setCropIdState(c);
    AsyncStorage.setItem(KEYS.crop, c).catch(() => undefined);
  }, []);

  const setLocation = useCallback((loc: LocationState) => {
    setLocationState(loc);
    if (loc) {
      AsyncStorage.setItem(KEYS.loc, JSON.stringify(loc)).catch(() => undefined);
    } else {
      AsyncStorage.removeItem(KEYS.loc).catch(() => undefined);
    }
  }, []);

  const finishOnboarding = useCallback(() => {
    setOnboarded(true);
    AsyncStorage.setItem(KEYS.onboarded, "1").catch(() => undefined);
  }, []);

  const refreshWeather = useCallback(async () => {
    if (!location) return;
    setWeatherLoading(true);
    setWeatherError(null);
    try {
      const w = await fetchWeather(location.latitude, location.longitude);
      setWeather(w);
      AsyncStorage.setItem(KEYS.weather, JSON.stringify(w)).catch(() => undefined);
    } catch (e) {
      setWeatherError(String(e));
    } finally {
      setWeatherLoading(false);
    }
  }, [location]);

  // Auto-refresh when location changes or weather is older than 1 hour
  useEffect(() => {
    if (!location) return;
    const stale = !weather || Date.now() - (weather.fetchedAt ?? 0) > 60 * 60 * 1000;
    if (stale) refreshWeather();
  }, [location, weather, refreshWeather]);

  const value: Settings = useMemo(
    () => ({
      ready,
      onboarded,
      lang,
      cropId,
      location,
      weather,
      weatherLoading,
      weatherError,
      setLang,
      setCropId,
      setLocation,
      finishOnboarding,
      refreshWeather,
    }),
    [
      ready,
      onboarded,
      lang,
      cropId,
      location,
      weather,
      weatherLoading,
      weatherError,
      setLang,
      setCropId,
      setLocation,
      finishOnboarding,
      refreshWeather,
    ],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Settings {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings must be used inside SettingsProvider");
  return ctx;
}
