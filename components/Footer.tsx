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
    <footer id="download" className="relative overflow-hidden bg-black text-white">
      {/* closing CTA */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute bottom-0 start-1/2 h-[60vmax] w-[80vmax] -translate-x-1/2 rounded-full bg-purple/15 blur-[140px] rtl:translate-x-1/2" />
      </div>

      <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-5 py-14 text-center md:py-20">
        <h2 className="type-title text-balance">{dict.closingTitle}</h2>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://apps.apple.com/us/app/thmanyah/id6746764325"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <img
              src="/badges/app-store.svg"
              alt={`${dict.appStore} ${dict.appStoreName}`}
              className="h-12 w-auto"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=com.thmanyah.shasha"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-opacity hover:opacity-80"
          >
            <img
              src="/badges/google-play.svg"
              alt={`${dict.googlePlay} ${dict.googlePlayName}`}
              className="h-12 w-auto"
            />
          </a>
        </div>
        <div className="mt-2 flex w-full flex-col items-center justify-center gap-8 md:flex-row md:gap-12">
          <img
            src="/footer/devices.png"
            alt=""
            aria-hidden
            className="w-full max-w-md select-none md:w-[58%] md:max-w-none"
          />
          <img
            src="/footer/platforms.png"
            alt=""
            aria-hidden
            className="w-full max-w-xs select-none md:w-[38%] md:max-w-none"
          />
        </div>
      </Reveal>

      {/* footer bar, per the thmanyah.com footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-14 md:px-8 md:pt-20">
          <div className="flex flex-col items-center gap-10 md:flex-row md:items-center md:justify-between">
            <img
              src={locale === "ar" ? "/figma/wordmark-ar.svg" : "/figma/wordmark-en.svg"}
              alt={locale === "ar" ? "ثمانية" : "thmanyah"}
              className="h-8 w-auto md:h-9"
            />
            <div className="flex items-center gap-6" aria-label={dict.social}>
              <SocialLink href="https://youtube.com/@thmanyah" label="YouTube">
                <YouTubeIcon />
              </SocialLink>
              <SocialLink href="https://x.com/thmanyah" label="X">
                <XIcon />
              </SocialLink>
              <SocialLink href="https://instagram.com/thmanyah" label="Instagram">
                <InstagramIcon />
              </SocialLink>
              <SocialLink href="https://tiktok.com/@thmanyah" label="TikTok">
                <TikTokIcon />
              </SocialLink>
              <SocialLink href="https://facebook.com/thmanyah" label="Facebook">
                <FacebookIcon />
              </SocialLink>
            </div>
          </div>

          <div className="my-10 border-t border-white/10 md:my-14" />

          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 text-sm text-white/40">
            <p>{dict.rights}</p>
            <a
              href="https://company.thmanyah.com/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {dict.privacy}
            </a>
            <a
              href="mailto:hala@thmanyah.com"
              className="transition-colors hover:text-white"
            >
              {dict.contact}
            </a>
          </div>
        </div>
      </div>
    </footer>
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
      className="text-white/60 transition-colors hover:text-white [&>svg]:size-5"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12a12 12 0 1 0-13.88 11.85v-8.38H7.08V12h3.04V9.36c0-3 1.8-4.67 4.53-4.67 1.31 0 2.69.23 2.69.23v2.96H15.8c-1.49 0-1.95.92-1.95 1.87V12h3.32l-.53 3.47h-2.79v8.38A12 12 0 0 0 24 12z" />
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
