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
                    <h3 className="type-card-title">{t[locale]}</h3>
                    <img
                      src={t.logo}
                      alt=""
                      className="h-10 w-auto max-w-20 shrink-0 object-contain md:h-12"
                    />
                  </div>

                  <div className="h-px w-full bg-white/20" />

                  <div className="mt-auto flex w-full items-center justify-end pt-4">
                    <span
                      className={`rounded-s-lg px-3 py-2 text-xs font-medium leading-4 ${
                        live ? "bg-white text-black" : "bg-black text-white"
                      }`}
                    >
                      {formatDateRange(t, locale)}
                    </span>
                    <span
                      className={`flex h-8 items-center justify-center rounded-e-lg px-2 ${
                        live ? "bg-black" : "bg-white"
                      }`}
                    >
                      {live ? (
                        <span className="inline-block size-3 animate-live-pulse rounded-full bg-orange" />
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
    <svg
      viewBox="0 0 24 24"
      className="size-5 text-black"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}
