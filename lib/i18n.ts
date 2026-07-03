import ar from "@/locales/ar.json";
import en from "@/locales/en.json";

export const locales = ["ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const dictionaries = { ar, en } as const;
export type Dict = typeof en;

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

export function dir(locale: Locale): "rtl" | "ltr" {
  return locale === "ar" ? "rtl" : "ltr";
}
