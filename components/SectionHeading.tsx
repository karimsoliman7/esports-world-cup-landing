import Reveal from "./Reveal";

export type SectionTone = "light" | "dark" | "orange" | "purple";

const toneStyles: Record<
  SectionTone,
  { title: string; subtitle: string; pill: string }
> = {
  light: { title: "text-ink", subtitle: "text-ink/55", pill: "bg-purple text-white" },
  dark: { title: "text-white", subtitle: "text-white/60", pill: "bg-purple text-white" },
  orange: { title: "text-white", subtitle: "text-white/80", pill: "bg-purple text-white" },
  purple: { title: "text-white", subtitle: "text-white/70", pill: "bg-white text-purple" },
};

export default function SectionHeading({
  title,
  subtitle,
  pill,
  tone = "light",
}: {
  title: string;
  subtitle?: string;
  pill?: string;
  tone?: SectionTone;
}) {
  const s = toneStyles[tone];
  return (
    <Reveal className="mx-auto mb-14 flex max-w-3xl flex-col items-center text-center md:mb-20">
      {pill && (
        <span
          className={`mb-6 inline-block -rotate-2 rounded-full px-4 py-1.5 text-sm font-medium ${s.pill}`}
        >
          {pill}
        </span>
      )}
      <h2
        className={`feat-salt text-balance text-4xl font-black leading-tight md:text-6xl ${s.title}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mx-auto mt-5 max-w-2xl text-pretty text-lg leading-relaxed md:text-xl ${s.subtitle}`}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
