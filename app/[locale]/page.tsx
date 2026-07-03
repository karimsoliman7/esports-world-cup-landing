import { notFound } from "next/navigation";
import { dictionaries, isLocale } from "@/lib/i18n";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlayersCarousel from "@/components/PlayersCarousel";
import WatchLiveBand from "@/components/WatchLiveBand";
import TournamentCards from "@/components/TournamentCards";
import CompanionPrograms from "@/components/CompanionPrograms";
import WhyThamanya from "@/components/WhyThamanya";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const dict = dictionaries[locale];

  return (
    <>
      <Navbar locale={locale} dict={dict.nav} />
      <main>
        <Hero locale={locale} dict={dict.hero} />
        <PlayersCarousel locale={locale} dict={dict.players} />
        <WatchLiveBand locale={locale} dict={dict.band} countdown={dict.countdown} />
        <TournamentCards locale={locale} dict={dict.tournaments} />
        <CompanionPrograms locale={locale} dict={dict.programs} />
        <WhyThamanya locale={locale} dict={dict.why} />
        <FAQ locale={locale} dict={dict.faq} />
      </main>
      <Footer locale={locale} dict={dict.footer} />
    </>
  );
}
