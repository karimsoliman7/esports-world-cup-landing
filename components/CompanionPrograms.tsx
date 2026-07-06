import type { Dict, Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

// visual identity per card: [pill classes, thumbnail gradient, icon]
const cardStyles = [
  {
    pill: "bg-orange/15 text-orange",
    thumb: "from-orange/30 via-orange/10 to-transparent",
    icon: <MicIcon />,
    glow: "group-hover:shadow-[0_0_64px_rgba(228,85,46,0.2)]",
    dash: "bg-orange",
  },
  {
    pill: "bg-purple/20 text-[#a695ff]",
    thumb: "from-purple/40 via-purple/15 to-transparent",
    icon: <NewsIcon />,
    glow: "group-hover:shadow-[0_0_64px_rgba(96,66,230,0.25)]",
    dash: "bg-purple",
  },
];

// split layout per the Figma design (node 10-390): black section, purple
// rounded panel — headline + subtitle on the start side, cards opposite
export default function CompanionPrograms({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["programs"];
}) {
  return (
    <section id="programs" className="relative bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="flex flex-col gap-10 rounded-[40px] bg-purple p-6 md:rounded-[64px] md:p-10 lg:flex-row lg:items-center lg:gap-16">
            <div className="flex flex-1 flex-col items-start justify-center gap-6 p-2 text-start md:p-6">
              <div className="flex flex-wrap items-center gap-5">
                <h2 className="type-title text-balance text-white">
                  {dict.title}
                </h2>
                <span
                  aria-hidden
                  className="flex size-11 shrink-0 items-center justify-center rounded-full border-2 border-black/5 bg-white text-2xl md:size-12"
                  style={{ transform: "rotate(-15deg)" }}
                >
                  🔴
                </span>
              </div>
              <p className="type-lead feat-ss01 text-pretty text-white">
                {dict.subtitle}
              </p>
            </div>

            <div className="grid flex-1 grid-cols-[repeat(auto-fit,minmax(min(300px,100%),1fr))] gap-6">
              {dict.items.map((item, i) => {
                const s = cardStyles[i % cardStyles.length];
                // whole card links out when the program has a URL
                const Card: "a" | "article" = item.url ? "a" : "article";
                return (
                  <Card
                    key={item.title}
                    {...(item.url
                      ? { href: item.url, target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-ink text-white shadow-[0_16px_48px_rgba(0,0,0,0.25)] transition-all duration-500 hover:-translate-y-1.5 ${s.glow}`}
                  >
                    {/* thumbnail area — swap for real artwork when available */}
                    <div
                      className={`relative flex h-52 items-center justify-center bg-gradient-to-br ${s.thumb} md:h-56`}
                    >
                      <span className="text-white/80 transition-transform duration-500 group-hover:scale-110 [&>svg]:size-16 md:[&>svg]:size-20">
                        {s.icon}
                      </span>
                      <span
                        className={`absolute start-6 top-6 rounded-full px-3.5 py-1.5 text-xs font-bold ${s.pill}`}
                      >
                        {item.tag}
                      </span>
                    </div>

                    <div className="flex grow flex-col p-6 md:p-8">
                      <p className="type-meta mb-3 text-white/40">{item.meta}</p>
                      <h3 className="type-card-title">{item.title}</h3>
                      <p className="mt-3 grow text-pretty leading-relaxed text-white/55">
                        {item.desc}
                      </p>
                      <p className="mt-6 flex items-center gap-3 text-sm font-bold">
                        <span className={`h-0.5 w-8 rounded ${s.dash}`} />
                        {item.link}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function MicIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8" />
    </svg>
  );
}

function NewsIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0V7" />
      <path d="M10 6h8M10 10h8M10 14h4" />
    </svg>
  );
}
