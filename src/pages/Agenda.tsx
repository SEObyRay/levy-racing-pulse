import { useMemo } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Download } from "lucide-react";
import { useWordPressEvents } from "@/hooks/use-wordpress";
import { decodeHtml } from "@/lib/utils";
import type { WPEvent } from "@/types/wordpress";

type AgendaEvent = {
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
};

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

const Agenda = () => {
  const { data, isLoading, isError } = useWordPressEvents({
    per_page: 100,
    order: "asc",
  });

  const events = useMemo(() => {
    const items = data?.items ?? [];
    return items
      .map(parseEvent)
      .filter((item) => item.startDate)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [data]);

  const upcomingEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events
      .filter((event) => new Date(event.startDate) >= now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
      .slice(0, 3);
  }, [events]);

  const pastEvents = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return events
      .filter((event) => new Date(event.startDate) < now)
      .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  }, [events]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-headline font-bold mb-4">
              Race Agenda
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              Alle aankomende races en evenementen
            </p>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Download iCal Feed
            </Button>
          </div>

          {/* Upcoming Events */}
          <div className="mb-16">
            <h2 className="text-3xl font-headline font-bold mb-8">
              Aankomende Races
            </h2>
            {isLoading && <div className="text-muted-foreground">Evenementen worden geladen...</div>}
            {isError && !isLoading && (
              <div className="text-destructive">Kon evenementen niet laden.</div>
            )}
            {!isLoading && upcomingEvents.length === 0 && (
              <div className="text-muted-foreground">Geen aankomende evenementen gevonden.</div>
            )}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const daysUntil = getDaysUntil(event.startDate);
                const year = new Date(event.startDate).getFullYear();
                return (
                  <Card
                    key={event.id}
                    className={`group hover:shadow-orange transition-smooth hover-lift ${
                      event.isNextRace ? "ring-2 ring-primary shadow-orange" : ""
                    }`}
                  >
                    <Link to={`/agenda/${year}/${event.slug}`}>
                      <CardContent className="p-8 space-y-6">
                        {event.isNextRace && (
                          <div className="inline-flex px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold animate-pulse-glow">
                            🏁 Volgende Race
                          </div>
                        )}

                        <div>
                          <div className="text-sm font-medium text-primary mb-2">
                            {event.klasse || ""}
                          </div>
                          <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-smooth mb-4">
                            {event.title}
                          </h3>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                              <div>
                                <div className="font-semibold text-foreground">
                                  {formatDate(event.startDate)}
                                  {event.endDate && ` - ${formatDate(event.endDate)}`}
                                </div>
                                {daysUntil > 0 && (
                                  <div className="text-sm text-muted-foreground">
                                    Over {daysUntil} {daysUntil === 1 ? "dag" : "dagen"}
                                  </div>
                                )}
                              </div>
                            </div>

                            {(event.venue || event.address || event.city) && (
                              <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                                <div>
                                  <div className="font-semibold">{event.venue || "Onbekend Circuit"}</div>
                                  <div className="text-sm text-muted-foreground">
                                    {event.address || event.city || ""}
                                  </div>
                                </div>
                              </div>
                            )}

                            {event.time && (
                              <div className="flex items-center gap-3">
                                <Clock className="w-5 h-5 flex-shrink-0 text-primary" />
                                <span className="font-medium">{event.time}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* Past Events */}
          <div>
            <h2 className="text-3xl font-headline font-bold mb-8">
              Afgelopen Races
            </h2>
            {!isLoading && pastEvents.length === 0 && (
              <div className="text-muted-foreground">Geen afgelopen races gevonden.</div>
            )}
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-soft transition-smooth hover-lift"
                >
                  <Link to={`/agenda/${new Date(event.startDate).getFullYear()}/${event.slug}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-primary mb-1">
                            {event.klasse || ""}
                          </div>
                          <h3 className="text-xl font-headline font-semibold group-hover:text-primary transition-smooth mb-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(event.startDate)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.venue || "Onbekend Circuit"}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          {event.result && (
                            <div className="text-2xl font-bold text-primary">
                              {event.result}
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Agenda;