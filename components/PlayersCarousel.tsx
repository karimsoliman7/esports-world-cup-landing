"use client";

import { useRef } from "react";
import { players } from "@/lib/players";
import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function PlayersCarousel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["players"];
}) {
  const track = useRef<HTMLDivElement>(null);

  // "next" advances with the reading direction; native RTL scrolling
  // means a negative x offset moves forward in Arabic
  const scroll = (forward: boolean) => {
    const el = track.current;
    if (!el) return;
    const rtl = getComputedStyle(el).direction === "rtl";
    const amount = Math.min(el.clientWidth * 0.8, 640);
    el.scrollBy({
      left: (forward ? 1 : -1) * (rtl ? -1 : 1) * amount,
      behavior: "smooth",
    });
  };

  return (
    <section id="players" className="relative bg-orange py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title={dict.title}
          subtitle={dict.subtitle}
          pill={dict.pill}
          tone="orange"
        />
      </div>

      <Reveal delay={0.15}>
        <div className="relative">
          <div
            ref={track}
            className="no-scrollbar flex snap-x snap-proximity gap-5 overflow-x-auto scroll-smooth px-5 [scroll-padding-inline-start:1.25rem] md:px-[max(2rem,calc((100vw-80rem)/2+2rem))] md:[scroll-padding-inline-start:max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {players.map((p) => (
              <article
                key={p.id}
                className={`group relative aspect-[3/4] w-64 shrink-0 snap-start overflow-hidden rounded-3xl bg-gradient-to-b text-white ${p.gradient} border border-black/10 shadow-[0_16px_48px_rgba(0,0,0,0.25)] transition-transform duration-500 hover:-translate-y-2 md:w-80`}
              >
                {/* ghosted monogram in place of the player photo (assets TBD) */}
                <span
                  aria-hidden
                  className="absolute -bottom-8 end-[-4%] select-none text-[11rem] font-black leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.1] md:text-[14rem]"
                >
                  {p.name.en.charAt(0)}
                </span>

                {/* jersey color block, per the poster reference */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1.5"
                  style={{ backgroundColor: p.accent }}
                />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <p
                    className="text-2xl font-black uppercase leading-[1.1] tracking-tight"
                    style={{ color: p.accent }}
                  >
                    {p.tag[locale]}
                  </p>
                  <div>
                    <h3 className="type-card-title">{p.name[locale]}</h3>
                    <p className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
                      {p.game[locale]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              aria-label={dict.prev}
              onClick={() => scroll(false)}
              className="flex size-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <ArrowIcon flipped={locale !== "ar"} />
            </button>
            <button
              type="button"
              aria-label={dict.next}
              onClick={() => scroll(true)}
              className="flex size-12 items-center justify-center rounded-full border-2 border-white/40 text-white transition-colors hover:border-white hover:bg-white/10"
            >
              <ArrowIcon flipped={locale === "ar"} />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function ArrowIcon({ flipped }: { flipped?: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`size-5 ${flipped ? "rotate-180" : ""}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
