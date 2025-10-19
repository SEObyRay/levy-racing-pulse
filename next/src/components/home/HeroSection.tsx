import Image from "next/image";
import Link from "next/link";
import { Calendar, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
        <Image
          src="/hero-racing.jpg"
          alt="Levy Opbergen Racing"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="container relative z-20 px-4 py-32">
        <div className="max-w-3xl space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-block">
            <div className="px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
              <span className="text-sm font-medium text-primary">🏆 Powered by VSG Dakwerken</span>
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-headline font-bold">VSG Talent</h1>
            <p className="text-2xl md:text-3xl text-gradient-orange font-headline font-semibold">Altijd 100%, in weer en wind</p>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl">
              Wij ondersteunen veelbelovende Nederlandse sporters. Ontdek onze talenten zoals kart racing coureur Levy Opbergen en word partner in hun sportieve reis.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="gradient-orange shadow-orange hover-lift text-lg px-8">
              <Link href="/over-levy" className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Ontdek Levy
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-primary/30 hover:bg-primary/10 text-lg px-8 backdrop-blur-sm">
              <Link href="/club-van-100" className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Word Partner
              </Link>
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-3xl font-bold text-primary">12</div>
              <div className="text-sm text-muted-foreground">Overwinningen</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-3xl font-bold text-primary">28</div>
              <div className="text-sm text-muted-foreground">Podiums</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-3xl font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Pole Positions</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm rounded-lg p-4 border border-border/50">
              <div className="text-3xl font-bold text-primary">15</div>
              <div className="text-sm text-muted-foreground">Snelste Rondes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-primary/30 flex justify-center p-2">
          <div className="w-1 h-3 bg-primary rounded-full" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
