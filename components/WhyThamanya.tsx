import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const icons = [<PlayIcon key="0" />, <ReplayIcon key="1" />, <StageIcon key="2" />, <ChatIcon key="3" />];
const iconStyles = [
  "bg-orange/10 text-orange",
  "bg-purple/10 text-purple",
  "bg-orange/10 text-orange",
  "bg-purple/10 text-purple",
];

export default function WhyThamanya({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["why"];
}) {
  return (
    <section id="why" className="relative bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title={dict.title}
          subtitle={dict.subtitle}
          pill={dict.pill}
        />

        <div className="grid gap-4 sm:grid-cols-2">
          {dict.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08}>
              <div className="flex h-full items-start gap-5 rounded-3xl border border-black/10 bg-black/[0.02] p-7 transition-all duration-300 hover:border-black/25 hover:shadow-[0_12px_32px_rgba(34,31,33,0.08)] md:p-9">
                <span
                  className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${iconStyles[i % 4]} [&>svg]:size-7`}
                >
                  {icons[i % 4]}
                </span>
                <div>
                  <h3 className="type-card-title text-ink">{item.title}</h3>
                  <p className="mt-2 leading-relaxed text-ink/55">{item.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

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
