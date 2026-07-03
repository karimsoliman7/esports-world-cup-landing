import type { Dict, Locale } from "@/lib/i18n";
import Reveal from "./Reveal";

export default function Footer({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dict["footer"];
}) {
  return (
    <footer id="download" className="relative overflow-hidden bg-ink text-white">
      {/* closing CTA */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 start-1/2 h-[60vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-purple/15 blur-[140px] rtl:translate-x-1/2" />
      </div>

      <Reveal className="mx-auto max-w-4xl px-5 py-24 text-center md:py-36">
        <h2 className="feat-salt text-balance text-4xl font-black leading-tight md:text-7xl">
          {dict.closingTitle}
        </h2>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <StoreBadge
            top={dict.appStore}
            name={dict.appStoreName}
            icon={<AppleIcon />}
          />
          <StoreBadge
            top={dict.googlePlay}
            name={dict.googlePlayName}
            icon={<PlayStoreIcon />}
          />
        </div>
      </Reveal>

      {/* footer bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 py-10 md:flex-row md:px-8">
          <p className="flex items-center gap-2.5 text-2xl font-black">
            <img src="/figma/logo-white.svg" alt="" className="size-7" />
            {locale === "ar" ? "ثمانية" : "thmanyah"}
            <span className="-ms-2 text-orange">.</span>
          </p>

          <div className="flex items-center gap-2" aria-label={dict.social}>
            <SocialLink href="https://x.com/thmanyah" label="X">
              <XIcon />
            </SocialLink>
            <SocialLink href="https://instagram.com/thmanyah" label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com/@thmanyah" label="YouTube">
              <YouTubeIcon />
            </SocialLink>
            <SocialLink href="https://tiktok.com/@thmanyah" label="TikTok">
              <TikTokIcon />
            </SocialLink>
          </div>

          <p className="text-sm text-white/40">{dict.rights}</p>
        </div>
      </div>
    </footer>
  );
}

function StoreBadge({
  top,
  name,
  icon,
}: {
  top: string;
  name: string;
  icon: React.ReactNode;
}) {
  return (
    <a
      href="#"
      className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-6 py-3.5 backdrop-blur transition-all hover:border-white/40 hover:bg-white/10"
    >
      <span className="[&>svg]:size-7">{icon}</span>
      <span className="text-start leading-tight">
        <span className="block text-[11px] text-white/60">{top}</span>
        <span className="block text-lg font-bold" dir="ltr">
          {name}
        </span>
      </span>
    </a>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="flex size-11 items-center justify-center rounded-full border border-white/10 text-white/60 transition-colors hover:border-white/40 hover:text-white [&>svg]:size-5"
    >
      {children}
    </a>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}
function PlayStoreIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.61 1.81 13.79 12 3.61 22.19c-.38-.2-.61-.6-.61-1.09V2.9c0-.49.23-.89.61-1.09zM14.85 13.06l2.44 2.44-11.6 6.5 9.16-8.94zM20.16 10.81c.79.44.79 1.94 0 2.38l-2.47 1.38-2.65-2.57 2.65-2.57 2.47 1.38zM5.69 2 17.29 8.5l-2.44 2.44L5.69 2z" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93zm-1.29 19.5h2.04L6.49 3.24H4.3l13.31 17.41z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z" />
    </svg>
  );
}
function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.9 2.9 0 1 1-2.9-2.9c.28 0 .54.04.8.11V9.4a6.33 6.33 0 0 0-.8-.05 6.34 6.34 0 1 0 6.34 6.34V9.71a8.16 8.16 0 0 0 4.77 1.52v-3.45a4.85 4.85 0 0 1-.99-.09z" />
    </svg>
  );
}
