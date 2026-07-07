"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import type { Dict, Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

// chat-style FAQ, per the Figma design (node 23-60): the visitor "asks"
// from the right, Thamanya replies from the left with a typing indicator
export default function FAQ({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["faq"];
}) {
  // conversation order: item i plays only after item i-1 has been answered
  const [unlocked, setUnlocked] = useState(0);

  return (
    <section id="faq" className="bg-[#f8f8f7] py-24 md:py-36">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <Reveal className="mb-14 flex flex-col items-center gap-5 text-center md:mb-20">
          <p className="type-lead text-ink/80">{dict.label}</p>
          <h2 className="type-title text-balance text-ink">{dict.title}</h2>
        </Reveal>

        <div className="mx-auto flex w-full max-w-[560px] flex-col gap-11">
          {dict.items.map((item, i) => (
            <ChatItem
              key={i}
              q={item.q}
              a={item.a}
              canStart={unlocked >= i}
              onAnswered={() => setUnlocked((u) => Math.max(u, i + 1))}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// 0 hidden → 1 question sent → 2 typing → 3 answered
// items play one by one; the next unlocks as soon as this one's answer shows
function ChatItem({
  q,
  a,
  canStart,
  onAnswered,
}: {
  q: string;
  a: string;
  canStart: boolean;
  onAnswered: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [stage, setStage] = useState(0);
  const started = useRef(false);
  const onAnsweredRef = useRef(onAnswered);
  onAnsweredRef.current = onAnswered;

  useEffect(() => {
    if (!inView || !canStart || started.current) return;
    started.current = true;
    const timers = [
      setTimeout(() => setStage(1), 57),
      setTimeout(() => setStage(2), 429),
      setTimeout(() => setStage(3), 1143),
      // 500ms buffer after the answer shows before the next question starts
      setTimeout(() => onAnsweredRef.current(), 1643),
    ];
    return () => timers.forEach(clearTimeout);
  }, [inView, canStart]);

  return (
    <div ref={ref} className="flex min-h-[7rem] flex-col gap-4">
      {/* visitor question — sent from the right */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6, y: 16 }}
        animate={stage >= 1 ? { opacity: 1, scale: 1, y: 0 } : {}}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        style={{ originX: 1, originY: 1 }}
        className="feat-ss01 ml-auto w-fit max-w-[85%] rounded-[32px] bg-ink px-6 py-3 text-lg text-white"
      >
        <p dir="auto" className="text-start leading-snug">
          {q}
        </p>
      </motion.div>

      {/* thamanya reply — avatar on the left, layout forced LTR so it
          reads as the same conversation in both locales */}
      {stage >= 2 && (
        <div dir="ltr" className="flex items-end gap-1">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 320, damping: 20 }}
            className="flex size-8 shrink-0 items-center justify-center rounded-full border border-black/5 bg-black/10"
          >
            <img
              src="/figma/logo-black.svg"
              alt=""
              className="size-4 -scale-y-100"
            />
          </motion.div>
          <div className="flex-1">
            <motion.div
              layout
              initial={{ opacity: 0, scale: 0.7, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              style={{ originX: 0, originY: 1 }}
              className="feat-ss01 w-fit max-w-full rounded-[32px] bg-black/5 px-6 py-4 text-lg text-ink/80"
            >
              {stage === 2 ? <TypingDots /> : <AnswerText a={a} />}
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}

// word-by-word reveal; newline-separated answers render as bullet lines
// and [text](url) segments render as links
const LINK_SPLIT = /(\[[^\]]+\]\([^)]+\))/;
const LINK_MATCH = /^\[([^\]]+)\]\(([^)]+)\)$/;

function AnswerText({ a }: { a: string }) {
  let word = 0;
  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.103, delay },
  });

  return (
    <div dir="auto" className="text-start leading-relaxed">
      {a.split("\n").map((line, li) => (
        <p key={li} className={li > 0 ? "mt-1.5" : undefined}>
          {line.split(LINK_SPLIT).map((part, pi) => {
            const link = part.match(LINK_MATCH);
            if (link) {
              return (
                <motion.a
                  key={`${li}-${pi}`}
                  href={link[2]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-purple underline underline-offset-2 hover:text-purple/70"
                  {...fade(word++ * 0.017)}
                >
                  {link[1]}
                </motion.a>
              );
            }
            return part.split(" ").map((w, wi) => (
              <motion.span key={`${li}-${pi}-${wi}`} {...fade(word++ * 0.017)}>
                {w}{" "}
              </motion.span>
            ));
          })}
        </p>
      ))}
    </div>
  );
}

function TypingDots() {
  return (
    <span className="flex items-center gap-1.5 py-1" aria-label="…">
      {[0, 1, 2].map((d) => (
        <span
          key={d}
          className="typing-dot size-2 rounded-full bg-ink/40"
          style={{ animationDelay: `${d * 0.18}s` }}
        />
      ))}
    </span>
  );
}
