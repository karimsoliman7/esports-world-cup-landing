"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { players } from "@/lib/players";
import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";

// players section: the cards sit in a single row inside a sticky viewport;
// vertical page scroll through the tall outer section pans the row
// horizontally (mirrored in RTL).
export default function PlayersCarousel({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["players"];
}) {
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
    <section ref={sectionRef} id="players" className="relative h-[300vh] bg-black">
      <div className="sticky top-0 flex h-svh flex-col justify-center gap-8 overflow-hidden py-6 md:gap-12">
        <div className="mx-auto w-full max-w-7xl px-5 md:px-8">
          <SectionHeading
            title={dict.title}
            subtitle={dict.subtitle}
            pill={dict.pill}
            tone="orange"
          />
        </div>

        <div ref={viewportRef} className="w-full">
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex w-max gap-5 px-5 md:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {players.map((p) => (
              <article
                key={p.id}
                className={`group relative aspect-[3/4] w-64 shrink-0 overflow-hidden rounded-3xl bg-gradient-to-b text-white ${p.gradient} border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.45)] transition-transform duration-500 hover:-translate-y-2 md:w-80`}
              >
                {p.photo ? (
                  <>
                    {/* player cutout, anchored to the card bottom */}
                    <img
                      src={p.photo}
                      alt={p.name[locale]}
                      className="absolute inset-x-0 bottom-0 h-[80%] w-full select-none object-contain object-bottom transition-transform duration-500 group-hover:scale-[1.04]"
                    />
                    {/* legibility fade behind the name/game text */}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent"
                    />
                  </>
                ) : (
                  /* ghosted monogram while the player photo is pending */
                  <span
                    aria-hidden
                    className="absolute -bottom-8 end-[-4%] select-none text-[11rem] font-black leading-none text-white/[0.06] transition-colors duration-500 group-hover:text-white/[0.1] md:text-[14rem]"
                  >
                    {p.name.en.charAt(0)}
                  </span>
                )}

                {/* jersey color block, per the poster reference */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1.5"
                  style={{ backgroundColor: p.accent }}
                />

                <div className="relative flex h-full flex-col justify-between p-6">
                  <div className="flex items-center justify-between gap-3">
                    <p
                      className="text-2xl font-black uppercase leading-[1.1] tracking-tight"
                      style={{ color: p.accent }}
                    >
                      {p.team[locale]}
                    </p>
                    {/* team logo, rendered white via filter (works for any logo color) */}
                    <img
                      src={p.teamLogo}
                      alt={p.team[locale]}
                      className="size-11 shrink-0 object-contain brightness-0 invert md:size-12"
                    />
                  </div>
                  <div>
                    <h3 className="type-card-title">{p.name[locale]}</h3>
                    <p className="mt-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70 backdrop-blur">
                      {p.game[locale]}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
