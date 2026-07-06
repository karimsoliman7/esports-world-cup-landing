export type TournamentStatus = "upcoming" | "live" | "finished";

export interface Tournament {
  key: string;
  en: string;
  ar: string;
  start: string; // ISO date (Riyadh time)
  end: string;
  logo: string; // white game logo, from the Figma design
}

export const tournaments: Tournament[] = [
  { key: "apex", en: "Apex Legends", ar: "إيبكس ليجند", start: "2026-07-07", end: "2026-07-11", logo: "/figma/games/apex.svg", },
  { key: "dota2", en: "Dota 2", ar: "دوتا 2", start: "2026-07-07", end: "2026-07-19", logo: "/figma/games/dota2.svg", },
  { key: "fc26q", en: "FC 26 Qualifiers", ar: "تصفيات FC 26", start: "2026-07-09", end: "2026-07-11", logo: "/figma/games/fc.svg", },
  { key: "fc26", en: "FC 26", ar: "FC 26", start: "2026-07-22", end: "2026-07-26", logo: "/figma/games/fc.svg", },
  { key: "overwatch", en: "Overwatch", ar: "أوفرواتش", start: "2026-07-29", end: "2026-08-02", logo: "/figma/games/overwatch.svg", },
  { key: "warzone", en: "Call of Duty: Warzone", ar: "كول أوف دوتي: وور زون", start: "2026-07-30", end: "2026-08-02", logo: "/figma/games/warzone.svg", },
  { key: "bo7", en: "Call of Duty: Black Ops 7", ar: "كول أوف دوتي: بلاك أوبس 7", start: "2026-08-05", end: "2026-08-09", logo: "/figma/games/bo7.svg", },
  { key: "chess", en: "Chess", ar: "شطرنج", start: "2026-08-11", end: "2026-08-15", logo: "/figma/games/chess.svg", },
  { key: "rocket", en: "Rocket League", ar: "روكيت ليق", start: "2026-08-12", end: "2026-08-16", logo: "/figma/games/rocket.svg", },
];

// Tournament kickoff — used by the hero countdown
export const KICKOFF = new Date("2026-07-07T00:00:00+03:00");

export function tournamentStatus(t: Tournament, now: Date): TournamentStatus {
  const start = new Date(`${t.start}T00:00:00+03:00`);
  const end = new Date(`${t.end}T23:59:59+03:00`);
  if (now < start) return "upcoming";
  if (now > end) return "finished";
  return "live";
}

export function formatDateRange(t: Tournament, locale: "ar" | "en"): string {
  const start = new Date(`${t.start}T12:00:00+03:00`);
  const end = new Date(`${t.end}T12:00:00+03:00`);
  const fmt = new Intl.DateTimeFormat(locale === "ar" ? "ar" : "en-GB", {
    day: "numeric",
    month: "long",
    numberingSystem: "latn",
  });
  return fmt.formatRange(start, end);
}
