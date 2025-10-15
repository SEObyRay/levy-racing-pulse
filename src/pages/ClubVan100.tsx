import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Handshake, Users, Gift, Trophy } from "lucide-react";

const benefits = [
  {
    icon: Handshake,
    title: "Netwerk van kartliefhebbers",
    description:
      "Maak deel uit van een selecte groep supporters, ondernemers en motorsportfans die Levy naar de top helpen.",
  },
  {
    icon: Gift,
    title: "Exclusieve hospitality",
    description:
      "Toegang tot kartdagen, pit bezoeken en meet & greets. Beleef raceweekenden vanuit de eerste rij.",
  },
  {
    icon: Trophy,
    title: "Directe impact",
    description:
      "Elke bijdrage gaat naar motoronderhoud, banden en trainingsuren. Zo blijft Levy competitief op Europees niveau.",
  },
];

const contributionTiers = [
  {
    title: "Club van 100 lid",
    amount: "€100 per maand",
    perks: [
      "Welkomspakket met gesigneerde foto",
      "Maandelijkse update met raceverslagen",
      "Uitnodiging voor 2 club events per jaar",
    ],
  },
  {
    title: "Team Partner",
    amount: "€250 per maand",
    perks: [
      "Alle clubvoordelen",
      "Kartclinic of bedrijfsdemo op locatie",
      "Logo vermelding op website en socials",
    ],
  },
  {
    title: "Strategic Partner",
    amount: "€500 per maand",
    perks: [
      "Alle teampartner voordelen",
      "Persoonlijke hospitality tijdens raceweekenden",
      "Co-branded content shoots en PR exposure",
    ],
  },
];

const ClubVan100 = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-20">
          <section className="text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm uppercase tracking-[0.2em]">
              Club van 100
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
              Word onderdeel van Levy’s support crew
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Met de Club van 100 bouw jij mee aan de carrière van een gedreven karttalent. Samen investeren we in training, techniek
              en internationale ervaring.
            </p>
            <Button asChild className="gradient-orange shadow-orange hover-lift">
              <a href="#lid-worden">Word lid</a>
            </Button>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="border-border/60 h-full">
                <CardContent className="p-6 space-y-4 text-center">
                  <benefit.icon className="w-10 h-10 text-primary mx-auto" />
                  <h2 className="text-xl font-headline font-semibold">{benefit.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </section>

          <section id="lid-worden" className="space-y-10">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-headline font-bold">Kies het partnership dat bij je past</h2>
              <p className="text-muted-foreground max-w-3xl mx-auto">
                Van enthousiaste supporters tot strategische partners: elke bijdrage helpt Levy sneller te groeien.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {contributionTiers.map((tier) => (
                <Card key={tier.title} className="border-border/60 h-full">
                  <CardContent className="p-6 space-y-4">
                    <Sparkles className="w-6 h-6 text-primary" />
                    <div>
                      <h3 className="text-xl font-headline font-semibold">{tier.title}</h3>
                      <p className="text-muted-foreground text-sm">{tier.amount}</p>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {tier.perks.map((perk) => (
                        <li key={perk} className="flex items-start gap-2">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                    <Button asChild className="gradient-orange shadow-orange hover-lift w-full">
                      <a href="mailto:club@levyopbergen.nl?subject=Aanmelding%20{tier.title}">Aanmelden</a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/60">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Users className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Club kalender</span>
                </div>
                <h3 className="text-2xl font-headline font-semibold">Exclusieve meet-ups & events</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vier tot zes keer per jaar nodigen we leden uit voor kartclinics, foto- en contentdagen en hospitality tijdens
                  wedstrijden.
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:club@levyopbergen.nl">Vraag planning op</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Gift className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Serieus rendement</span>
                </div>
                <h3 className="text-2xl font-headline font-semibold">Marketing & activering</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We zorgen voor zichtbaarheid via social content, logo’s op kart en kleding, en maatwerk activaties voor jouw merk.
                </p>
                <Button asChild className="gradient-orange shadow-orange hover-lift">
                  <a href="mailto:club@levyopbergen.nl">Plan een strategiegesprek</a>
                </Button>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ClubVan100;
