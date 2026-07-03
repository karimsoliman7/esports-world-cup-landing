"use client";

import { useEffect, useState } from "react";
import { KICKOFF } from "@/lib/tournaments";
import type { Dict, Locale } from "@/lib/i18n";

function remaining() {
  const diff = KICKOFF.getTime() - Date.now();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1_000) % 60,
  };
}

export default function Countdown({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["countdown"];
}) {
  const [time, setTime] = useState<ReturnType<typeof remaining> | undefined>(
    undefined
  );

  useEffect(() => {
    setTime(remaining());
    const id = setInterval(() => setTime(remaining()), 1000);
    return () => clearInterval(id);
  }, []);

  const nf = new Intl.NumberFormat(locale === "ar" ? "ar-SA-u-nu-latn" : "en", {
    minimumIntegerDigits: 2,
  });

  // time === undefined → not mounted yet (SSR); render stable placeholders
  if (time === null) {
    return (
      <div className="flex items-center gap-3 text-lg font-bold text-orange">
        <span className="inline-block size-2.5 animate-live-pulse rounded-full bg-orange" />
        {dict.live}
      </div>
    );
  }

  const units = [
    { key: "days", value: time?.days },
    { key: "hours", value: time?.hours },
    { key: "minutes", value: time?.minutes },
    { key: "seconds", value: time?.seconds },
  ] as const;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-sm font-medium uppercase tracking-widest text-white/50">
        {dict.label}
      </p>
      <div className="flex items-start gap-1.5 md:gap-6" dir="ltr">
        {units.map(({ key, value }, i) => (
          <div key={key} className="flex items-start gap-1.5 md:gap-6">
            {i > 0 && (
              <span className="pt-0.5 text-2xl font-light text-white/25 md:pt-1 md:text-5xl">
                :
              </span>
            )}
            <div className="flex w-14 flex-col items-center md:w-24">
              <span
                className="text-3xl font-light tabular-nums text-white md:text-6xl"
                suppressHydrationWarning
              >
                {value === undefined ? "--" : nf.format(value)}
              </span>
              <span className="mt-1 text-xs font-medium text-white/50 md:text-sm">
                {dict[key]}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
