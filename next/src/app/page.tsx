import HeroSection from "@/components/home/HeroSection";
import LatestNews from "@/components/home/LatestNewsServer";
import AgendaWidget from "@/components/home/AgendaWidget";
import SponsorShowcase from "@/components/home/SponsorShowcase";

export const revalidate = 300; // Revalidate every 5 minutes

export default function Home() {
  return (
    <>
      <HeroSection />
      <LatestNews />
      <AgendaWidget />
      <SponsorShowcase />
    </>
  );
}
