"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import Sticker from "./Sticker";

// hero per the Figma design (node 1-15): orange-red gradient, white
// start-aligned type, purple QR pill, and the Paris/EWC-trophy montage
// anchored to the bottom on the opposite side
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
      className="relative flex min-h-svh flex-col justify-center overflow-hidden bg-[linear-gradient(225deg,#eb2100_15%,#ff5112_85%)] pb-24 pt-28 text-white md:pt-32"
    >
      {/* bottom montage — trophy, Arc de Triomphe, skyline */}
      <motion.img
        src="/hero/montage.png"
        alt=""
        aria-hidden
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="pointer-events-none absolute bottom-0 end-0 w-full max-w-[1389px] select-none"
      />

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="relative flex max-w-[877px] flex-col items-start gap-8 text-start">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, type: "spring", stiffness: 200, damping: 14 }}
            className="absolute -top-3 end-0 md:end-[10%]"
          >
            <Sticker emoji="🔥" rotate={-15} bob />
          </motion.div>

          <div className="flex flex-col gap-6">
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="feat-salt text-balance text-5xl font-black leading-[1.15] md:text-7xl lg:text-[92px]"
            >
              {dict.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="type-lead feat-ss01 text-pretty"
            >
              {dict.subtitle}
            </motion.p>
          </div>

          {/* purple download pill: label + QR, per the design */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
          >
            <a
              href="#download"
              dir="ltr"
              className="flex items-center gap-4 rounded-2xl border border-black/5 bg-purple p-2 ps-5 shadow-[0_12px_40px_rgba(86,0,204,0.35)] transition-all hover:scale-[1.03] hover:shadow-[0_16px_56px_rgba(86,0,204,0.5)] active:scale-[0.98]"
            >
              <span className="feat-ss01 text-xl font-medium text-white md:text-2xl">
                {dict.cta}
              </span>
              <Image
                src="/qr-download.svg"
                alt="QR"
                width={86}
                height={86}
                className="size-16 rounded-lg bg-white md:size-[86px]"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
