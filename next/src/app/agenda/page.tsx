import Link from "next/link";
import type { Metadata } from "next";
import { Calendar, MapPin, Clock, Download, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getWordPressEvents } from "@/lib/wordpress-data";
import { decodeHtml } from "@/lib/utils";
import { buildCanonical } from "@/lib/seo";
import type { WPEvent } from "@/types/wordpress";

export const revalidate = 300; // Revalidate every 5 minutes

export const metadata: Metadata = {
  title: "Race Agenda",
  description: "Bekijk de volledige race agenda van onze VSG Talent sporters met alle aankomende en afgelopen evenementen.",
  alternates: {
    canonical: buildCanonical("/agenda"),
  },
  openGraph: {
    title: "Race Agenda | VSG Talent",
    description: "Bekijk wanneer onze talenten in actie komen tijdens verschillende competities.",
    url: buildCanonical("/agenda"),
  },
};

interface AgendaEvent {
  id: number;
  title: string;
  slug: string;
  startDate: string;
  endDate?: string | null;
  venue?: string | null;
  city?: string | null;
  address?: string | null;
  time?: string | null;
  klasse?: string | null;
  result?: string | null;
  isNextRace?: boolean;
}

const parseEvent = (event: WPEvent): AgendaEvent => {
  const meta = event.meta ?? {};
  const startDate = meta.datum || event.date || event.modified;

  return {
    id: event.id,
    title: decodeHtml(event.title.rendered),
    slug: event.slug,
    startDate,
    endDate: meta.einddatum || null,
    venue: meta.locatie ? decodeHtml(meta.locatie) : null,
    city: meta.stad ? decodeHtml(meta.stad) : null,
    address: meta.adres ? decodeHtml(meta.adres) : null,
    time: meta.tijd || null,
    klasse: meta.klasse ? decodeHtml(meta.klasse) : null,
    result: meta.resultaat ? decodeHtml(meta.resultaat) : null,
    isNextRace: Boolean(meta.volgende_race),
  };
};

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const getDaysUntil = (dateStr: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const eventDate = new Date(dateStr);
  eventDate.setHours(0, 0, 0, 0);
  const diffTime = eventDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export default async function AgendaPage() {
  let events: AgendaEvent[] = [];

  try {
    const res = await getWordPressEvents({ per_page: 100, order: "asc", _embed: true }, 300);
    events = res.items
      .map(parseEvent)
      .filter((item) => item.startDate)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  } catch {
    events = [];
  }

  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const upcomingEvents = events
    .filter((event) => new Date(event.startDate) >= now)
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 5);

  const pastEvents = events
    .filter((event) => new Date(event.startDate) < now)
    .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());

  const eventsJsonLd = events.slice(0, 20).map((event) => {
    const startDateIso = new Date(event.startDate).toISOString();
    const endDateIso = event.endDate ? new Date(event.endDate).toISOString() : undefined;
    const location = event.venue || event.address || event.city;
    return {
      "@context": "https://schema.org",
      "@type": "SportsEvent",
      name: event.title,
      startDate: startDateIso,
      endDate: endDateIso,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: location
        ? {
            "@type": "Place",
            name: event.venue || location,
            address: event.address || event.city || "",
          }
        : undefined,
      url: buildCanonical(`/agenda/${new Date(event.startDate).getFullYear()}/${event.slug}`),
    };
  });

  return (
    <div className="min-h-screen bg-background pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h1 className="text-5xl md:text-6xl font-headline font-bold mb-4">Race Agenda</h1>
            <p className="text-xl text-muted-foreground">Aankomende races en evenementen</p>
          </div>
          <div className="hidden md:block">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download iCal
            </Button>
          </div>
        </div>

        {upcomingEvents.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-6">Aankomende Evenementen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => {
                const daysUntil = getDaysUntil(event.startDate);
                const year = new Date(event.startDate).getFullYear();
                return (
                  <Card
                    key={event.id}
                    className={`group hover:shadow-orange hover-lift ${
                      event.isNextRace ? "ring-2 ring-primary shadow-orange" : ""
                    }`}
                  >
                    <Link href={`/agenda/${year}/${event.slug}`}>
                      <CardContent className="p-6 space-y-4">
                        {event.isNextRace && (
                          <div className="inline-flex px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold animate-pulse-glow">
                            🏁 Volgende Race
                          </div>
                        )}

                        <div>
                          <h3 className="font-headline font-semibold text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                            {event.title}
                          </h3>

                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                              <div>
                                <div className="font-medium text-foreground">{formatDate(event.startDate)}</div>
                                {daysUntil > 0 && (
                                  <div className="text-xs">
                                    Over {daysUntil} {daysUntil === 1 ? "dag" : "dagen"}
                                  </div>
                                )}
                              </div>
                            </div>

                            {event.venue && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                <div>
                                  <div>{event.venue}</div>
                                  {event.city && <div className="text-xs">{event.city}</div>}
                                </div>
                              </div>
                            )}

                            {event.time && (
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                                <span>{event.time}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border">
                          <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300 text-sm">
                            Bekijk details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {pastEvents.length > 0 && (
          <section>
            <h2 className="text-3xl font-headline font-bold mb-6">Afgelopen Evenementen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => {
                const year = new Date(event.startDate).getFullYear();
                return (
                  <Card key={event.id} className="group hover:shadow-orange hover-lift opacity-80 hover:opacity-100 transition-opacity">
                    <Link href={`/agenda/${year}/${event.slug}`}>
                      <CardContent className="p-6 space-y-4">
                        <div>
                          <h3 className="font-headline font-semibold text-xl group-hover:text-primary transition-colors duration-300 mb-2">
                            {event.title}
                          </h3>

                          <div className="space-y-2 text-sm text-muted-foreground">
                            <div className="flex items-start gap-2">
                              <Calendar className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                              <div className="font-medium text-foreground">{formatDate(event.startDate)}</div>
                            </div>

                            {event.venue && (
                              <div className="flex items-start gap-2">
                                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                                <div>
                                  <div>{event.venue}</div>
                                  {event.city && <div className="text-xs">{event.city}</div>}
                                </div>
                              </div>
                            )}

                            {event.result && (
                              <div className="text-xs text-primary font-semibold mt-2">Resultaat: {event.result}</div>
                            )}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-border">
                          <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300 text-sm">
                            Bekijk details
                            <ArrowRight className="w-4 h-4" />
                          </span>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </section>
        )}

        {events.length === 0 && (
          <div className="text-center py-20 text-muted-foreground text-lg">
            Geen evenementen gevonden. Check binnenkort opnieuw voor de nieuwste race-agenda.
          </div>
        )}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventsJsonLd) }} />
    </div>
  );
}
