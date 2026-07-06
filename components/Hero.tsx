"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import Sticker from "./Sticker";

const CHARACTERS = [1, 2, 3, 4, 5];

export default function Hero({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["hero"];
}) {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col justify-between overflow-hidden bg-white pt-28 md:pt-36"
    >
      <div className="relative mx-auto flex w-full max-w-4xl flex-col items-center px-5 pb-14 pt-6 text-center md:pb-20">
        {/* tilted fire stickers, per the Figma hero */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 14 }}
          className="absolute -top-1 end-1 md:end-6"
        >
          <Sticker emoji="🔥" rotate={-15} bob />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, type: "spring", stiffness: 200, damping: 14 }}
          className="absolute start-1 top-[58%] md:start-8"
        >
          <Sticker emoji="🔥" rotate={-3} bob />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="feat-salt max-w-[877px] text-balance text-5xl font-black leading-[1.15] text-ink md:text-7xl lg:text-[92px]"
        >
          {dict.title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="type-lead feat-ss01 mt-6 max-w-2xl text-pretty text-ink"
        >
          {dict.subtitle}
        </motion.p>

        {/* purple download pill: logo + label + QR, per the Figma hero */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8"
        >
          <a
            href="#download"
            dir="ltr"
            className="flex items-center gap-3 rounded-xl border border-black/5 bg-purple p-1.5 ps-4 shadow-[0_12px_40px_rgba(86,0,204,0.3)] transition-all hover:scale-[1.03] hover:shadow-[0_16px_56px_rgba(86,0,204,0.45)] active:scale-[0.98]"
          >
            <span className="pe-1 text-base font-medium text-white">
              {dict.cta}
            </span>
            <Image
              src="/figma/qr.png"
              alt="QR"
              width={64}
              height={64}
              className="size-16 rounded-lg bg-white"
            />
          </a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="type-meta mt-8 text-ink/40"
        >
          {dict.kicker}
        </motion.p>
      </div>

      {/* duotone character strip, per the Figma hero */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mx-auto w-full max-w-[1200px] px-5 pb-0 md:px-8"
      >
        <div className="flex overflow-hidden rounded-t-xl">
          {CHARACTERS.map((n) => (
            <div key={n} className="relative h-20 flex-1 md:h-[100px] lg:h-28">
              <Image
                src={`/figma/char-${n}.png`}
                alt=""
                fill
                sizes="(max-width: 768px) 20vw, 240px"
                className="object-cover"
                priority={n <= 2}
              />
              <div aria-hidden className="absolute inset-0 bg-[rgba(204,0,0,0.3)] mix-blend-color" />
              <div aria-hidden className="absolute inset-0 bg-[rgba(106,0,255,0.8)] mix-blend-lighten" />
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
