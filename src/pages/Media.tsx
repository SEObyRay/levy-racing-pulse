import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Video, Camera, Newspaper, Instagram } from "lucide-react";

const mediaKits = [
  {
    title: "Persmap 2025",
    description:
      "Basisinformatie over Levy Opbergen, kampioenschappen, team en technische specificaties. Inclusief rechtenvrije foto’s (HR).",
    cta: {
      label: "Download persmap",
      href: "#",
    },
  },
  {
    title: "Foto- en videopakket",
    description:
      "Selectie van actiebeelden op Assen, Spa en Kerpen. Onderverdeeld naar social, print en widescreen-formats.",
    cta: {
      label: "Bekijk gallerij",
      href: "#",
    },
  },
  {
    title: "Teaminterviews",
    description:
      "Quotes van Levy, zijn coach en teammanager. Te gebruiken voor media-artikelen en podcasts.",
    cta: {
      label: "Aanvragen",
      href: "mailto:media@levyopbergen.nl",
    },
  },
];

const Media = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-24">
        <div className="container mx-auto px-4 max-w-5xl space-y-16">
          <section className="text-center space-y-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm uppercase tracking-[0.2em]">
              Media & Press
            </Badge>
            <h1 className="text-4xl md:text-6xl font-headline font-bold leading-tight">
              Mediahub voor journalisten, partners en content creators
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Vind snel alle assets rondom Levy Opbergen: perskits, foto’s, video’s en social templates. We helpen je graag met maatwerk
              content voor tv, print en online.
            </p>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            {mediaKits.map((kit) => (
              <Card key={kit.title} className="border-border/60 h-full">
                <CardContent className="p-6 space-y-4">
                  <h2 className="text-xl font-headline font-semibold">{kit.title}</h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">{kit.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a href={kit.cta.href}>{kit.cta.label}</a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </section>

          <section className="grid gap-6 md:grid-cols-2">
            <Card className="border-border/60">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Video className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Video format requests</span>
                </div>
                <h3 className="text-2xl font-headline font-semibold">Onboard, trackside & interview footage</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Vraag high-frame rate onboardbeelden of een korte praatvideo aan. We leveren edits in social-first formaat of broadcast-ready.
                </p>
                <Button asChild className="gradient-orange shadow-orange hover-lift">
                  <a href="mailto:media@levyopbergen.nl">Vraag video aan</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/60">
              <CardContent className="p-8 space-y-4">
                <div className="flex items-center gap-3 text-primary">
                  <Camera className="w-5 h-5" />
                  <span className="text-sm font-semibold uppercase tracking-wide">Fotoshoots</span>
                </div>
                <h3 className="text-2xl font-headline font-semibold">Fotomoment bij volgende racedag</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Sluit aan op Assen, Spa of Kerpen om Levy in actie vast te leggen. We faciliteren toegang tot de paddock en pitlane.
                </p>
                <Button variant="outline" asChild>
                  <a href="mailto:media@levyopbergen.nl?subject=Fotoshoot%20aanvraag">Plan fotoshoot</a>
                </Button>
              </CardContent>
            </Card>
          </section>

          <section className="grid gap-6 md:grid-cols-3">
            <Card className="border-border/60">
              <CardContent className="p-6 space-y-3">
                <Newspaper className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-headline font-semibold">Fact sheet</h3>
                <p className="text-sm text-muted-foreground">
                  Leeftijd, team, materiaal en kalender op één A4. Ideaal voor eventprogramma’s en sponsors.
                </p>
                <Button variant="outline" asChild size="sm">
                  <a href="#">Download factsheet</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6 space-y-3">
                <Instagram className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-headline font-semibold">Social media toolkit</h3>
                <p className="text-sm text-muted-foreground">
                  Formats en captions voor Instagram, TikTok en YouTube Shorts. Inclusief hashtags en tag-richtlijnen.
                </p>
                <Button variant="outline" asChild size="sm">
                  <a href="#">Download toolkit</a>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-6 space-y-3">
                <Video className="w-5 h-5 text-primary" />
                <h3 className="text-lg font-headline font-semibold">Livestream updates</h3>
                <p className="text-sm text-muted-foreground">
                  Overzicht van livestream-links per event, inclusief embed-codes voor op je eigen platform.
                </p>
                <Button variant="outline" asChild size="sm">
                  <a href="mailto:media@levyopbergen.nl">Vraag links aan</a>
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

export default Media;
