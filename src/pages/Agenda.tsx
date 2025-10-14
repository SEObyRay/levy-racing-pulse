import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, Clock, Download } from "lucide-react";

// Mock data
const upcomingEvents = [
  {
    id: 1,
    title: "Rotax Max Challenge - Ronde 3",
    slug: "rotax-max-challenge-ronde-3-2025",
    date: "2025-04-12",
    endDate: "2025-04-13",
    venue: "Circuit Park Berghem",
    city: "Berghem",
    address: "Berghem, Nederland",
    time: "09:00 - 18:00",
    klasse: "Senior Max",
    isNextRace: true,
  },
  {
    id: 2,
    title: "IAME X30 Challenge - Finale",
    slug: "iame-x30-challenge-finale-2025",
    date: "2025-05-03",
    endDate: "2025-05-04",
    venue: "Kartbaan Genk",
    city: "Genk",
    address: "Genk, België",
    time: "08:30 - 19:00",
    klasse: "X30 Senior",
    isNextRace: false,
  },
];

const pastEvents = [
  {
    id: 3,
    title: "Rotax Max Challenge - Ronde 2",
    slug: "rotax-max-challenge-ronde-2-2024",
    date: "2024-10-15",
    venue: "Raceway Lelystad",
    city: "Lelystad",
    klasse: "Senior Max",
    result: "P2",
  },
];

const Agenda = () => {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    const eventDate = new Date(dateStr);
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {upcomingEvents.map((event) => {
                const daysUntil = getDaysUntil(event.date);
                return (
                  <Card
                    key={event.id}
                    className={`group hover:shadow-orange transition-smooth hover-lift ${
                      event.isNextRace ? "ring-2 ring-primary shadow-orange" : ""
                    }`}
                  >
                    <Link to={`/agenda/2025/${event.slug}`}>
                      <CardContent className="p-8 space-y-6">
                        {event.isNextRace && (
                          <div className="inline-flex px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold animate-pulse-glow">
                            🏁 Volgende Race
                          </div>
                        )}

                        <div>
                          <div className="text-sm font-medium text-primary mb-2">
                            {event.klasse}
                          </div>
                          <h3 className="text-2xl font-headline font-bold group-hover:text-primary transition-smooth mb-4">
                            {event.title}
                          </h3>

                          <div className="space-y-3">
                            <div className="flex items-start gap-3">
                              <Calendar className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                              <div>
                                <div className="font-semibold text-foreground">
                                  {formatDate(event.date)}
                                  {event.endDate && ` - ${formatDate(event.endDate)}`}
                                </div>
                                {daysUntil > 0 && (
                                  <div className="text-sm text-muted-foreground">
                                    Over {daysUntil} {daysUntil === 1 ? "dag" : "dagen"}
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="flex items-start gap-3">
                              <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0 text-primary" />
                              <div>
                                <div className="font-semibold">{event.venue}</div>
                                <div className="text-sm text-muted-foreground">
                                  {event.address}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 flex-shrink-0 text-primary" />
                              <span className="font-medium">{event.time}</span>
                            </div>
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
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card
                  key={event.id}
                  className="group hover:shadow-soft transition-smooth hover-lift"
                >
                  <Link to={`/nieuws/2024/${event.slug}`}>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="text-sm font-medium text-primary mb-1">
                            {event.klasse}
                          </div>
                          <h3 className="text-xl font-headline font-semibold group-hover:text-primary transition-smooth mb-2">
                            {event.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {formatDate(event.date)}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.venue}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-2xl font-bold text-primary">
                            {event.result}
                          </div>
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