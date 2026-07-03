"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import SectionHeading from "./SectionHeading";
import Reveal from "./Reveal";

export default function FAQ({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["faq"];
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-white py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <SectionHeading title={dict.title} pill={dict.pill} />

        <Reveal>
          <div className="divide-y divide-black/10 rounded-3xl border border-black/10 bg-black/[0.02]">
            {dict.items.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-7 py-6 text-start transition-colors hover:bg-black/[0.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple md:px-9"
                  >
                    <span className="text-lg font-bold text-ink md:text-xl">
                      {item.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className={`flex size-8 shrink-0 items-center justify-center rounded-full text-xl font-light ${
                        isOpen ? "bg-purple text-white" : "bg-black/5 text-ink/70"
                      }`}
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-panel-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                        className="overflow-hidden"
                      >
                        <p className="px-7 pb-7 leading-relaxed text-ink/60 md:px-9">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
