import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

// feature cards in the thmanyah.com subscription style: dark cards on
// black, a flat minimal illustration on top, small muted icon + title below
const illustrations = [
  <LiveIllustration key="0" />,
  <RecapIllustration key="1" />,
  <StudioIllustration key="2" />,
  <ArabicIllustration key="3" />,
];
const icons = [<PlayIcon key="0" />, <ReplayIcon key="1" />, <StageIcon key="2" />, <ChatIcon key="3" />];

export default function WhyThamanya({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["why"];
}) {
  return (
    <section id="why" className="relative bg-black py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title={dict.title}
          subtitle={dict.subtitle}
          pill={dict.pill}
          tone="dark"
        />

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {dict.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="h-full">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/5 bg-[#141414] transition-all duration-300 hover:-translate-y-1 hover:border-white/15">
                <div className="flex h-44 items-center justify-center px-8 pt-8 md:h-52">
                  {illustrations[i % 4]}
                </div>
                <div className="mt-auto flex flex-col items-start gap-3 p-6 md:p-7">
                  <span className="text-white/35 [&>svg]:size-6">{icons[i % 4]}</span>
                  <h3 className="type-card-title text-white">{item.title}</h3>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* flat illustrations, matching the subscription-page style:
   dark grays, muted pitch green, a single red accent */

function LiveIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-auto max-w-full">
      {/* TV showing a live match */}
      <rect x="18" y="12" width="164" height="104" rx="10" fill="#262626" />
      <rect x="26" y="20" width="148" height="88" rx="5" fill="#1c3527" />
      <line x1="100" y1="20" x2="100" y2="108" stroke="#ffffff" strokeOpacity="0.35" />
      <circle cx="100" cy="64" r="15" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
      <rect x="26" y="45" width="17" height="38" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
      <rect x="157" y="45" width="17" height="38" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
      {[
        [52, 38], [70, 74], [58, 94], [86, 52], [116, 88], [130, 40], [146, 66], [138, 96],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill="#fff" fillOpacity={i % 2 ? 0.9 : 0.45} />
      ))}
      {/* live pill */}
      <rect x="128" y="26" width="40" height="15" rx="7.5" fill="#e5352b" />
      <text x="148" y="37" textAnchor="middle" fontSize="9" fontWeight="700" fill="#fff">
        مباشر
      </text>
      {/* stand */}
      <rect x="86" y="116" width="28" height="7" rx="3.5" fill="#262626" />
    </svg>
  );
}

function RecapIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-auto max-w-full">
      {/* replay player */}
      <rect x="18" y="12" width="164" height="104" rx="10" fill="#262626" />
      <rect x="26" y="20" width="148" height="88" rx="5" fill="#1a1a1a" />
      <circle cx="100" cy="56" r="20" fill="#333333" />
      <path d="M94 46l18 10-18 10V46z" fill="#fff" />
      {/* progress bar with highlight segments */}
      <rect x="36" y="92" width="128" height="6" rx="3" fill="#333333" />
      <rect x="36" y="92" width="52" height="6" rx="3" fill="#5a5a5a" />
      <rect x="58" y="92" width="10" height="6" rx="3" fill="#e5352b" />
      <rect x="104" y="92" width="10" height="6" rx="3" fill="#e5352b" />
      <rect x="136" y="92" width="10" height="6" rx="3" fill="#e5352b" />
      {/* highlight flags above the red segments */}
      <path d="M63 86l0 -8 6 0 -2.2 3 2.2 3z" fill="#e5352b" opacity="0.8" />
      <path d="M109 86l0 -8 6 0 -2.2 3 2.2 3z" fill="#e5352b" opacity="0.8" />
    </svg>
  );
}

function StudioIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-auto max-w-full">
      {/* tactics board */}
      <rect x="36" y="10" width="128" height="76" rx="6" fill="#262626" />
      <rect x="42" y="16" width="116" height="64" rx="3" fill="#1c3527" />
      <circle cx="100" cy="48" r="12" fill="none" stroke="#ffffff" strokeOpacity="0.35" />
      <line x1="100" y1="16" x2="100" y2="80" stroke="#ffffff" strokeOpacity="0.35" />
      {[[62, 32], [78, 58], [122, 36], [138, 60]].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={i % 2 ? "#e5352b" : "#fff"} fillOpacity="0.85" />
      ))}
      <path d="M64 34c10 8 18 18 12 22" fill="none" stroke="#ffffff" strokeOpacity="0.5" strokeDasharray="3 3" />
      {/* presenter */}
      <circle cx="76" cy="86" r="10" fill="#3a3a3a" />
      <path d="M60 128c0-14 7-24 16-24s16 10 16 24z" fill="#303030" />
      {/* desk */}
      <path d="M46 128c0-10 24-16 54-16s54 6 54 16z" fill="#232323" />
    </svg>
  );
}

function ArabicIllustration() {
  return (
    <svg viewBox="0 0 200 140" className="h-full w-auto max-w-full">
      {/* commentary bubble, arabic-style text lines */}
      <path d="M172 22H86a12 12 0 0 0-12 12v22a12 12 0 0 0 12 12h64l14 12v-12h8a12 12 0 0 0 12-12V34a12 12 0 0 0-12-12z" fill="#1c3527" />
      <rect x="92" y="36" width="66" height="6" rx="3" fill="#ffffff" fillOpacity="0.75" />
      <rect x="112" y="50" width="46" height="6" rx="3" fill="#ffffff" fillOpacity="0.35" />
      {/* reply bubble */}
      <path d="M28 66h86a12 12 0 0 1 12 12v18a12 12 0 0 1-12 12H50l-14 12v-12h-8a12 12 0 0 1-12-12V78a12 12 0 0 1 12-12z" fill="#262626" />
      <rect x="42" y="80" width="60" height="6" rx="3" fill="#ffffff" fillOpacity="0.55" />
      <rect x="62" y="94" width="40" height="6" rx="3" fill="#ffffff" fillOpacity="0.3" />
      {/* reaction */}
      <circle cx="156" cy="102" r="13" fill="#e5352b" />
      <path d="M156 108.5l-6-5.4a3.6 3.6 0 0 1 5-5.1l1 .9 1-.9a3.6 3.6 0 0 1 5 5.1z" fill="#fff" />
    </svg>
  );
}

/* small muted icons under each illustration */

function PlayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <path d="m10 8 6 4-6 4V8z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function ReplayIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7L3 8" />
      <path d="M3 3v5h5" />
      <path d="m10 9 5 3-5 3V9z" fill="currentColor" stroke="none" />
    </svg>
  );
}
function StageIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="3" width="6" height="10" rx="3" />
      <path d="M6 9v1a6 6 0 0 0 12 0V9M12 16v3M12 19a7 7 0 0 1 5 2H7a7 7 0 0 1 5-2z" />
    </svg>
  );
}
function ChatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a8 8 0 0 1-8 8H4l2.5-2.5A8 8 0 1 1 21 12z" />
      <path d="M8 11h8M8 15h5" />
    </svg>
  );
}
