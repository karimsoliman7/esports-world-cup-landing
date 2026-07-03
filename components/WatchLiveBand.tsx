import type { Dict, Locale } from "@/lib/i18n";
import Countdown from "./Countdown";
import Reveal from "./Reveal";
import Sticker from "./Sticker";

// black scoreboard block, per the live-results poster reference
export default function WatchLiveBand({
  locale,
  dict,
  countdown,
}: {
  locale: Locale;
  dict: Dict["band"];
  countdown: Dict["countdown"];
}) {
  const ticker = Array.from({ length: 10 }, () => dict.ticker);

  return (
    <section className="relative overflow-hidden bg-ink py-24 text-white md:py-32">
      {/* broadcast ticker — forced LTR so the loop animation reads the same in both locales */}
      <div
        dir="ltr"
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-8 select-none"
      >
        <div className="animate-marquee flex w-max items-center gap-8 whitespace-nowrap opacity-[0.06]">
          {[...ticker, ...ticker].map((t, i) => (
            <span
              key={i}
              className="flex items-center gap-8 text-6xl font-black uppercase md:text-8xl"
            >
              {t}
              <span className="size-4 rounded-full bg-orange md:size-5" />
            </span>
          ))}
        </div>
      </div>

      <Reveal className="relative mx-auto flex max-w-4xl flex-col items-center px-5 text-center md:px-8">
        <span className="relative">
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-orange px-4 py-1.5 text-sm font-bold text-white">
            <span className="inline-block size-2 animate-live-pulse rounded-full bg-white" />
            {dict.ticker}
          </p>
          <Sticker
            emoji="💥"
            rotate={12}
            className="absolute -end-14 -top-3 hidden md:block"
          />
        </span>

        <h2 className="feat-salt text-balance text-4xl font-black leading-tight md:text-6xl">
          {dict.title}
        </h2>
        <p className="mt-4 text-lg text-white/60 md:text-xl">{dict.subtitle}</p>
        <p className="mt-2 text-sm font-medium text-white/35">{dict.kicker}</p>

        <div className="mt-12">
          <Countdown locale={locale} dict={countdown} />
        </div>

        <a
          href="#download"
          className="mt-12 inline-block rounded-full bg-orange px-9 py-4 text-lg font-bold text-white shadow-[0_0_40px_rgba(228,85,46,0.4)] transition-all hover:scale-[1.03] hover:shadow-[0_0_64px_rgba(228,85,46,0.6)] active:scale-[0.98]"
        >
          {dict.cta}
        </a>
      </Reveal>
    </section>
  );
}
