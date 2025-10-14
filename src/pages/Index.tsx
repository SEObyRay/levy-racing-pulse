import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import LatestNews from "@/components/home/LatestNews";
import AgendaWidget from "@/components/home/AgendaWidget";
import SponsorShowcase from "@/components/home/SponsorShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LatestNews />
        <AgendaWidget />
        <SponsorShowcase />
      </main>
      <Footer />
    </div>
  );
};

export default Index;