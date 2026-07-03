export interface Player {
  id: string;
  name: { en: string; ar: string };
  tag: { en: string; ar: string }; // condensed poster headline, e.g. "THE DARK HORSE"
  game: { en: string; ar: string };
  // poster gradient + jersey accent, per the esports-poster reference
  gradient: string;
  accent: string;
}

export const players: Player[] = [
  {
    id: "carlsen",
    name: { en: "Magnus Carlsen", ar: "ماغنوس كارلسن" },
    tag: { en: "THE GRANDMASTER", ar: "الجراند ماستر" },
    game: { en: "Chess", ar: "شطرنج" },
    gradient: "from-[#3b2a8f] via-[#221f21] to-[#141214]",
    accent: "#6042E6",
  },
  {
    id: "imperialhal",
    name: { en: "ImperialHal", ar: "إمبيريال هال" },
    tag: { en: "THE APEX PREDATOR", ar: "المفترس" },
    game: { en: "Apex Legends", ar: "إيبكس ليجند" },
    gradient: "from-[#8f2a1e] via-[#221f21] to-[#141214]",
    accent: "#E4552E",
  },
  {
    id: "miracle",
    name: { en: "Miracle-", ar: "ميراكل" },
    tag: { en: "THE MIRACLE MAN", ar: "صانع المعجزات" },
    game: { en: "Dota 2", ar: "دوتا 2" },
    gradient: "from-[#1e3a8f] via-[#221f21] to-[#141214]",
    accent: "#4f7cff",
  },
  {
    id: "vejrgang",
    name: { en: "Anders Vejrgang", ar: "أندرس فايرغانغ" },
    tag: { en: "THE PRODIGY", ar: "الظاهرة" },
    game: { en: "FC 26", ar: "FC 26" },
    gradient: "from-[#0f6b4f] via-[#221f21] to-[#141214]",
    accent: "#2ecf8e",
  },
  {
    id: "peterbot",
    name: { en: "Peterbot", ar: "بيتربوت" },
    tag: { en: "THE CHAMPION", ar: "البطل" },
    game: { en: "Fortnite", ar: "فورتنايت" },
    gradient: "from-[#6b3ab0] via-[#221f21] to-[#141214]",
    accent: "#a06bff",
  },
  {
    id: "zen",
    name: { en: "Zen", ar: "زين" },
    tag: { en: "THE PHENOM", ar: "الموهبة" },
    game: { en: "Rocket League", ar: "روكيت ليق" },
    gradient: "from-[#8f6b1e] via-[#221f21] to-[#141214]",
    accent: "#f0b429",
  },
  {
    id: "proper",
    name: { en: "Proper", ar: "بروبر" },
    tag: { en: "THE ACE", ar: "الآس" },
    game: { en: "Overwatch", ar: "أوفرواتش" },
    gradient: "from-[#8f1e50] via-[#221f21] to-[#141214]",
    accent: "#ff4f8e",
  },
  {
    id: "paraboy",
    name: { en: "Paraboy", ar: "بارابوي" },
    tag: { en: "THE SHARPSHOOTER", ar: "القنّاص" },
    game: { en: "PUBG Mobile", ar: "ببجي موبايل" },
    gradient: "from-[#b05a1e] via-[#221f21] to-[#141214]",
    accent: "#E4552E",
  },
];
