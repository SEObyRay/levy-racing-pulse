import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Trophy, Compass, Target } from "lucide-react";
import PageSeo from "@/components/seo/PageSeo";
import { SITE_URL } from "@/lib/seo";

const highlightItems = [
  {
    icon: Trophy,
    title: "Kampioenschappen 2025",
    description:
      "Officieel Nederlands Kampioenschap Parolin Rocky 200cc bij Chrono en het Dutch Open Kampioenschap van NXT GP.",
  },
  {
    icon: Compass,
    title: "Internationale banen",
    description:
      "Assen, Spa-Francorchamps en Kerpen: Levy leert racen op circuits waar ook de grootste kampioenen reden.",
  },
  {
    icon: Target,
    title: "Missie",
    description:
      "Stap voor stap groeien naar de absolute top van het Europese karting met een professioneel team.",
  },
];

const timeline = [
  {
    year: "2025",
    title: "Start kartcarrière",
    description:
      "Levy (8) zet de eerste officiële stappen in de Parolin Rocky 200cc-klasse. Focus op racecraft, techniek en plezier.",
  },
  {
    year: "2025",
    title: "Chrono NK Parolin Rocky",
    description:
      "Volledig seizoen in het officiële Nederlands kampioenschap. Iedere race is een les in snelheid en tactiek.",
  },
  {
    year: "2025",
    title: "Dutch Open bij NXT GP",
    description:
      "Extra internationale ervaring tegen sterke concurrentie om sneller te groeien dan leeftijdsgenoten.",
  },
];

const circuits = [
  {
    name: "TT Junior Track Assen",
    country: "Nederland",
    description: "Racen naast het MotoGP-circuit — perfecte plek voor de eerste successen.",
  },
  {
    name: "Karting des Fagnes Spa-Francorchamps",
    country: "België",
    description: "De uitdagende Ardennen lay-out dwingt Levy om elke bocht met precisie en lef aan te vallen.",
  },
  {
    name: "Kartbahn Kerpen",
    country: "Duitsland",
    description: "Thuisbaan van de familie Schumacher en Sebastian Vettel. Inspiratiebron voor Levy’s ambities.",
  },
];

const OverLevy = () => {
  const aboutJsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Over Levy Opbergen",
    url: `${SITE_URL}/over-levy`,
    mainEntity: {
      "@type": "Person",
      name: "Levy Opbergen",
      birthDate: "2017",
      jobTitle: "Kartcoureur",
      description:
        "Levy Opbergen is een karttalent van acht jaar dat actief is in Europese competities en werkt aan een professionele racecarrière.",
      image: `${SITE_URL}/og-image.jpg`,
      memberOf: {
        "@type": "SportsTeam",
        name: "Team Levy Opbergen",
      },
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Over Levy Opbergen | Kart Racing Talent"
        description="Lees het verhaal, de missie en de trainingsaanpak van karttalent Levy Opbergen en ontdek zijn route naar de top."
        path="/over-levy"
        jsonLd={aboutJsonLd}
      />
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-20">
          <section className="text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm uppercase tracking-[0.2em]">
              Over Levy Opbergen
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
              Gedreven talent van 8 jaar met grote dromen in het Europese karting
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Levy Opbergen begon in 2025 aan zijn kartavontuur. Met een Parolin-chassis en een ID Engine 200cc Rocky motor
              werkt hij elke training aan snelheid, controle en race-intelligentie. Doel: kampioen worden in de hoogste klasses
              van het karting en uiteindelijk doorstromen naar de autosport.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="gradient-orange shadow-orange hover-lift">
                <a href="/sponsors">Word partner</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:info@levyopbergen.nl">Plan een gesprek</a>
              </Button>
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {highlightItems.map((item) => (
              <Card key={item.title} className="h-full border-border/60">
                <CardContent className="p-8 space-y-4">
                  <item.icon className="w-10 h-10 text-primary" />
                  <h2 className="text-xl font-headline font-semibold">{item.title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="space-y-8">
            <header className="space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Ontwikkeling en trainingsaanpak</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Groei komt voort uit regelmatige trainingsblokken, fysieke begeleiding en mentale voorbereiding. Levy combineert
                technische coaching met veel track time om iedere ronde sneller te worden.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Calendar className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Trainingsschema</span>
                  </div>
                  <h3 className="text-2xl font-headline font-semibold">Meermaals per week op de baan</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Techniek, starts, racepace en wedstrijdsimulaties vormen de kern van het schema. Elke sessie eindigt met
                    data-analyse zodat Levy precies weet waar hij kan verbeteren.
                  </p>
                </CardContent>
              </Card>
              <Card className="h-full">
                <CardContent className="p-8 space-y-4">
                  <div className="flex items-center gap-3 text-primary">
                    <Target className="w-5 h-5" />
                    <span className="text-sm font-semibold uppercase tracking-wide">Mentale focus</span>
                  </div>
                  <h3 className="text-2xl font-headline font-semibold">Racen met een plan</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Voor elke race wordt een strategie opgesteld: inhaalpunten, bandenmanagement en startprocedures. Levy ontwikkelt
                    een winnaarsmentaliteit zonder het plezier in de sport te verliezen.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="space-y-6">
            <header className="space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Belangrijke kartbanen</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Iedere baan vraagt om een unieke aanpak. Door in diverse landen te racen, ontwikkelt Levy zich razendsnel.
              </p>
            </header>
            <div className="grid gap-6 md:grid-cols-3">
              {circuits.map((circuit) => (
                <Card key={circuit.name} className="h-full">
                  <CardContent className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-primary font-semibold">
                      <MapPin className="w-5 h-5" />
                      {circuit.country}
                    </div>
                    <h3 className="text-xl font-headline font-semibold">{circuit.name}</h3>
                    <p className="text-muted-foreground leading-relaxed">{circuit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <header className="space-y-2 text-center">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Roadmap naar succes</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                We bouwen aan een meerjarige route waarin ontwikkeling, sponsoring en exposure samenkomen. Hieronder de belangrijkste
                mijlpalen.
              </p>
            </header>
            <div className="relative border-l border-border/60 pl-8 space-y-10">
              {timeline.map((item) => (
                <div key={item.year} className="relative">
                  <span className="absolute -left-4 top-1.5 w-2 h-2 rounded-full bg-primary" />
                  <h3 className="text-xl font-headline font-semibold">
                    {item.year} · {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="text-center space-y-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Samen sneller vooruit</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Levy’s groei vraagt om partners die geloven in ambitie, professionaliteit en jeugdige energie. Ontdek hoe jouw merk kan
              meegroeien met een karttalent dat vastbesloten is om de top te bereiken.
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild className="gradient-orange shadow-orange hover-lift">
                <a href="/sponsors">Word partner</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:info@levyopbergen.nl">Plan een gesprek</a>
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OverLevy;
