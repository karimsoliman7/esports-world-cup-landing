"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { Dict, Locale } from "@/lib/i18n";

const SECTIONS = ["players", "tournaments", "programs", "why", "faq"] as const;

export default function Navbar({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["nav"];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const other = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setPastHero(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-black/10 bg-white/85 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-5 md:h-20 md:px-8">
        <a href="#top" className="shrink-0">
          {/* white logo over the hero gradient, black once scrolled */}
          <Image
            src={scrolled ? "/figma/mark-black.svg" : "/figma/mark-white.svg"}
            alt={dict.brand}
            width={31}
            height={36}
            className="h-9 w-auto"
          />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === id
                    ? scrolled
                      ? "bg-black/5 text-ink"
                      : "bg-white/15 text-white"
                    : scrolled
                      ? "text-ink/55 hover:text-ink"
                      : "text-white/75 hover:text-white"
                }`}
              >
                {dict[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href={`/${other}`}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              scrolled
                ? "text-ink/70 hover:bg-black/5 hover:text-ink"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            {dict.switchLabel}
          </Link>
          <a
            href="https://appthmanyah.go.link/fQrWo"
            target="_blank"
            rel="noopener noreferrer"
            className={`rounded-full bg-black px-6 py-2.5 text-base font-bold text-white transition-all hover:bg-black/85 ${
              pastHero ? "hidden sm:block" : "hidden"
            }`}
          >
            {dict.download}
          </a>
        </div>
      </nav>
    </header>
  );
}
