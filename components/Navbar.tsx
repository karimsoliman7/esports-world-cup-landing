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
  const [active, setActive] = useState<string | null>(null);
  const other = locale === "ar" ? "en" : "ar";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
        <a href="#top" className="flex items-center gap-2.5">
          <Image
            src="/figma/logo-black.svg"
            alt=""
            width={28}
            height={28}
            className="size-7"
          />
          <span className="text-2xl font-black tracking-tight text-ink">
            {dict.brand}
            <span className="text-orange">.</span>
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active === id
                    ? "bg-black/5 text-ink"
                    : "text-ink/55 hover:text-ink"
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
            className="rounded-full border border-black/15 px-4 py-2 text-sm font-medium text-ink/70 transition-colors hover:border-black/40 hover:text-ink"
          >
            {dict.switchLabel}
          </Link>
          <a
            href="#download"
            className="hidden rounded-full bg-purple px-5 py-2 text-sm font-bold text-white shadow-[0_4px_20px_rgba(86,0,204,0.3)] transition-all hover:shadow-[0_6px_28px_rgba(86,0,204,0.45)] sm:block"
          >
            {dict.download}
          </a>
        </div>
      </nav>
    </header>
  );
}
