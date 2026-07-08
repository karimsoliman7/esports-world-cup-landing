"use client";

import { useEffect, useState } from "react";
import {
  formatDateRange,
  tournamentStatus,
  tournaments,
} from "@/lib/tournaments";
import type { Dict, Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

// tournaments grid, per the Figma design (node 10-160): orange-red gradient
// section, white rounded headline banner with a 🏆 sticker, glassy cards
// with the game logo, a divider, and date + clock chips
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

  return (
    <section
      id="tournaments"
      className="relative bg-gradient-to-l from-[#eb2100] to-[#ff5112] py-24 md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal>
          <div className="relative mb-11 flex items-center justify-center rounded-[40px] bg-white px-6 py-12 md:min-h-[265px] md:rounded-[64px] md:px-16">
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

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-4">
          {tournaments.map((t, i) => {
            const status = now ? tournamentStatus(t, now) : null;
            const live = status === "live";
            return (
              <Reveal key={t.key} delay={Math.min(i * 0.05, 0.35)} className="h-full">
                <article
                  className={`flex h-full flex-col gap-2 rounded-3xl border border-white/10 bg-white/20 p-4 text-white transition-all duration-300 hover:-translate-y-1 hover:bg-white/25 ${
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
              </Reveal>
            );
          })}
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
