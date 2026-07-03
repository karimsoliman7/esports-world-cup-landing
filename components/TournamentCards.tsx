"use client";

import { useEffect, useState } from "react";
import {
  formatDateRange,
  tournamentStatus,
  tournaments,
  type TournamentStatus,
} from "@/lib/tournaments";
import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

const badgeStyles: Record<TournamentStatus, string> = {
  upcoming: "bg-white/10 text-white/70",
  live: "bg-orange text-white",
  finished: "bg-white/5 text-white/35",
};

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
    <section id="tournaments" className="relative bg-white py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          title={dict.title}
          subtitle={dict.subtitle}
          pill={dict.pill}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tournaments.map((t, i) => {
            const status = now ? tournamentStatus(t, now) : null;
            return (
              <Reveal key={t.key} delay={Math.min(i * 0.05, 0.3)}>
                {/* black scoreboard card, per the results poster reference */}
                <article
                  className={`group flex h-full flex-col justify-between rounded-2xl bg-ink p-7 text-white transition-all duration-300 hover:-translate-y-1 ${
                    status === "live"
                      ? "shadow-[0_16px_48px_rgba(228,85,46,0.35)] ring-2 ring-orange"
                      : "shadow-[0_8px_24px_rgba(34,31,33,0.12)] hover:shadow-[0_16px_40px_rgba(34,31,33,0.2)]"
                  }`}
                >
                  <div className="mb-8 flex items-start justify-between gap-3">
                    <h3 className="text-2xl font-bold leading-tight">
                      {t[locale]}
                    </h3>
                    <span
                      className={`flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${
                        status ? badgeStyles[status] : "bg-white/5 text-transparent"
                      }`}
                    >
                      {status === "live" && (
                        <span className="inline-block size-1.5 animate-live-pulse rounded-full bg-white" />
                      )}
                      {status ? dict.status[status] : "…"}
                    </span>
                  </div>
                  <p className="text-sm font-medium tabular-nums text-white/45">
                    {formatDateRange(t, locale)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
