export interface Player {
  id: string;
  name: { en: string; ar: string };
  team: { en: string; ar: string }; // poster headline, in the team color
  game: { en: string; ar: string };
  teamLogo: string;
  // poster gradient + team accent color
  gradient: string;
  accent: string;
}

// team palettes
const FALCONS = { teamLogo: "/teams/falcons.svg", gradient: "from-[#0f6b4f] via-[#221f21] to-[#141214]", accent: "#2ecf8e" };
const TWISTED = { teamLogo: "/teams/twisted.svg", gradient: "from-[#5b2a8f] via-[#221f21] to-[#141214]", accent: "#a06bff" };

export const players: Player[] = [
  {
    id: "imperialhal",
    name: { en: "ImperialHal", ar: "إمبريال" },
    team: { en: "Team Falcons", ar: "فالكونز" },
    game: { en: "Apex Legends", ar: "إيبكس ليجندز" },
    ...FALCONS,
  },
  {
    id: "faker",
    name: { en: "Faker", ar: "فيكر" },
    team: { en: "T1", ar: "تي وان" },
    game: { en: "League of Legends", ar: "ليق أوف ليجندز" },
    teamLogo: "/teams/t1.svg",
    gradient: "from-[#8f1e2e] via-[#221f21] to-[#141214]",
    accent: "#ff4157",
  },
  {
    id: "abumakkah",
    name: { en: "AbuMakkah", ar: "أبو مكة" },
    team: { en: "Al Qadsiah", ar: "القادسية" },
    game: { en: "EA Sports FC", ar: "إي أيه إف سي" },
    teamLogo: "/teams/qadsiah.svg",
    gradient: "from-[#8f6b1e] via-[#221f21] to-[#141214]",
    accent: "#f0b429",
  },
  {
    id: "msdossary",
    name: { en: "Msdossary", ar: "مساعد الدوسري" },
    team: { en: "Team Falcons", ar: "فالكونز" },
    game: { en: "EA Sports FC", ar: "إي أيه إف سي" },
    ...FALCONS,
  },
  {
    id: "vejrgang",
    name: { en: "Vejrgang", ar: "فيرقانق" },
    team: { en: "Team Falcons", ar: "فالكونز" },
    game: { en: "EA Sports FC", ar: "إي أيه إف سي" },
    ...FALCONS,
  },
  {
    id: "quartz",
    name: { en: "Quartz", ar: "كوارتز" },
    team: { en: "Twisted Minds", ar: "تويستد مايندز" },
    game: { en: "Overwatch", ar: "أوفرواتش" },
    ...TWISTED,
  },
  {
    id: "soka",
    name: { en: "Soka", ar: "سوكا" },
    team: { en: "Team Falcons", ar: "فالكونز" },
    game: { en: "Call of Duty", ar: "كول أوف دوتي" },
    ...FALCONS,
  },
  {
    id: "magnus",
    name: { en: "Magnus", ar: "ماقنوس" },
    team: { en: "Team Liquid", ar: "ليكويد" },
    game: { en: "Chess", ar: "الشطرنج" },
    teamLogo: "/teams/liquid.svg",
    gradient: "from-[#1e3a8f] via-[#221f21] to-[#141214]",
    accent: "#4f7cff",
  },
  {
    id: "nwpo",
    name: { en: "Nwpo", ar: "نوبو" },
    team: { en: "Twisted Minds", ar: "تويستد مايندز" },
    game: { en: "Rocket League", ar: "روكيت ليق" },
    ...TWISTED,
  },
  {
    id: "niko",
    name: { en: "NiKo", ar: "نيكو" },
    team: { en: "Team Falcons", ar: "فالكونز" },
    game: { en: "Counter-Strike 2", ar: "كاونتر سترايك 2" },
    ...FALCONS,
  },
  {
    id: "peterbot",
    name: { en: "Peterbot", ar: "بيتربوت" },
    team: { en: "Team Falcons", ar: "فالكونز" },
    game: { en: "Fortnite", ar: "فورتنايت" },
    ...FALCONS,
  },
];
