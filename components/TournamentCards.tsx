"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  formatDateRange,
  tournamentStatus,
  tournaments,
} from "@/lib/tournaments";
import type { Dict, Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

// tournaments section, per the Figma design (node 10-160): orange-red gradient
// section, white rounded headline banner with a 🏆 sticker, glassy cards
// with the game logo, a divider, and date + clock chips.
// The cards sit in a single row inside a sticky viewport; vertical page
// scroll through the tall outer section pans the row horizontally.
export default function TournamentCards({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["tournaments"];
}) {
  // status depends on the visitor's clock — resolve after mount to avoid
  // a stale prerendered badge
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => setNow(new Date()), []);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  // how far the row has to travel so the last card ends up flush with the
  // viewport edge — measured, since it depends on screen and card widths
  const [shift, setShift] = useState(0);
  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      setShift(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  // in RTL the row is anchored to the right and the overflow hides past the
  // left edge, so the pan is mirrored: the row travels +x instead of -x
  const rtl = locale === "ar";
  const x = useTransform(scrollYProgress, [0, 1], [0, rtl ? shift : -shift]);

  return (
    <section
      ref={sectionRef}
      id="tournaments"
      className="relative h-[300vh] bg-gradient-to-l from-[#eb2100] to-[#ff5112]"
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-hidden py-6 md:gap-11">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <Reveal>
            <div className="relative flex items-center justify-center rounded-[40px] bg-white px-6 py-12 md:min-h-[265px] md:rounded-[64px] md:px-16">
              <h2 className="type-title max-w-[681px] text-balance text-center text-ink">
                {dict.title}
              </h2>
              <span
                aria-hidden
                className="absolute -top-5 end-6 flex size-14 items-center justify-center rounded-full border-[3px] border-black/5 bg-purple text-3xl md:top-1/2 md:end-[9%] md:size-20 md:-translate-y-1/2 md:text-5xl"
                style={{ transform: "rotate(-15deg)" }}
              >
                🏆
              </span>
            </div>
          </Reveal>
        </div>

        <div ref={viewportRef} className="w-full">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-4 px-5 md:gap-6 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {tournaments.map((t) => {
              const status = now ? tournamentStatus(t, now) : null;
              const live = status === "live";
              return (
                <article
                  key={t.key}
                  className={`flex w-[280px] shrink-0 flex-col gap-2 rounded-3xl border border-white/10 bg-white/20 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 md:w-[330px] ${
                    status === "finished" ? "opacity-60" : ""
                  }`}
                >
                  <div className="flex w-full items-center justify-between gap-3">
                    <h3 className="text-[22px] font-black uppercase leading-none">
                      {t[locale]}
                    </h3>
                    <div className="flex size-16 shrink-0 items-center justify-center">
                      <img
                        src={t.logo}
                        alt=""
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>
                  </div>

                  <div className="h-px w-full bg-white/20" />

                  {/* dir-locked so the chips read the same in both languages:
                      pinned to the right, date on the left, icon on the right */}
                  <div dir="ltr" className="mt-auto flex w-full items-center justify-end gap-2">
                    <span
                      dir="auto"
                      className={`rounded-lg px-3 py-2 text-xs font-medium leading-4 ${
                        live ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      {formatDateRange(t, locale)}
                    </span>
                    <span
                      className={`flex items-center justify-center rounded-lg px-2 py-1 ${
                        live ? "bg-black" : "bg-white"
                      }`}
                    >
                      {live ? (
                        <span className="m-1.5 inline-block size-3 animate-live-pulse rounded-full bg-orange" />
                      ) : (
                        <ClockIcon />
                      )}
                      {status && <span className="sr-only">{dict.status[status]}</span>}
                    </span>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6 text-black" fill="none">
      <path
        d="M12.6836 0.0675498C23.1117 -0.974628 27.1915 10.268 21.2607 18.2121C18.9705 21.3371 15.5321 23.3989 11.7207 23.9338C0.796718 24.9659 -3.28804 13.7651 2.89157 5.6945C5.25734 2.54679 8.79643 0.513578 12.6836 0.0675498ZM9.08883 11.2043C8.48026 11.7176 8.05349 12.0696 7.93942 12.9386C7.87122 13.4234 8.01314 13.9133 8.32809 14.2853C9.1539 15.2648 10.2562 15.1135 11.2705 14.6037L17.1543 15.6623C17.7602 15.7662 17.6934 15.8571 18.1445 15.6418C18.5201 15.0456 18.4668 14.2029 18.5634 13.4289C16.3304 13.1633 14.0947 12.9236 11.8554 12.7082C11.6335 12.2673 11.4264 11.8339 11.1611 11.4181L12.6308 7.62224L10.3554 6.83317L9.08883 11.2043Z"
        fill="currentColor"
      />
    </svg>
  );
}
