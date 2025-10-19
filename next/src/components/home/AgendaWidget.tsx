import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Download, ArrowRight } from "lucide-react";

// Mock data - replace with WordPress data later
const upcomingEvents = [
  {
    id: 1,
    title: "Rotax Max Challenge - Ronde 3",
    slug: "rotax-max-challenge-ronde-3-2025",
    date: "2025-04-12",
    endDate: "2025-04-13",
    venue: "Circuit Park Berghem",
    city: "Berghem",
    time: "09:00 - 18:00",
    isNextRace: true,
  },
  {
    id: 2,
    title: "IAME X30 Challenge - Finale",
    slug: "iame-x30-challenge-finale-2025",
    date: "2025-05-03",
    endDate: "2025-05-04",
    venue: "Kartbaan Genk",
    city: "Genk, België",
    time: "08:30 - 19:00",
    isNextRace: false,
  },
  {
    id: 3,
    title: "ONK Karting - Ronde 2",
    slug: "onk-karting-ronde-2-2025",
    date: "2025-05-17",
    endDate: "2025-05-18",
    venue: "Raceway Venray",
    city: "Venray",
    time: "09:00 - 17:30",
    isNextRace: false,
  },
];

const AgendaWidget = () => {
  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("nl-NL", { day: "numeric", month: "long", year: "numeric" });

  const getDaysUntil = (dateStr: string) => {
    const today = new Date();
    const eventDate = new Date(dateStr);
    const diffTime = eventDate.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <section className="py-20 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">Race Agenda</h2>
            <p className="text-muted-foreground text-lg">Aankomende races en evenementen</p>
          </div>
          <div className="hidden md:flex gap-3">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Download iCal
            </Button>
            <Button asChild variant="outline">
              <Link href="/agenda" className="flex items-center gap-2">
                Volledige Agenda
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {upcomingEvents.map((event) => {
            const daysUntil = getDaysUntil(event.date);
            return (
              <Card key={event.id} className={`group hover:shadow-orange hover-lift ${event.isNextRace ? "ring-2 ring-primary shadow-orange" : ""}`}>
                <Link href={`/agenda/${event.slug}`}>
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
                            <div className="font-medium text-foreground">{formatDate(event.date)}</div>
                            {daysUntil > 0 && <div className="text-xs">Over {daysUntil} {daysUntil === 1 ? "dag" : "dagen"}</div>}
                          </div>
                        </div>

                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-primary" />
                          <div>
                            <div>{event.venue}</div>
                            <div className="text-xs">{event.city}</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 flex-shrink-0 text-primary" />
                          <span>{event.time}</span>
                        </div>
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

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center md:hidden">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download iCal
          </Button>
          <Button asChild variant="outline">
            <Link href="/agenda" className="flex items-center gap-2">
              Volledige Agenda
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AgendaWidget;
