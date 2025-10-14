import { useState } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

// Mock data
const mockNews = [
  {
    id: 1,
    title: "Podium Finish in Rotax Max Challenge Nederland",
    slug: "podium-rotax-max-challenge-2024",
    excerpt: "Fantastisch weekend in Lelystad met een 2e plaats in de finale!",
    date: "2024-10-15",
    year: 2024,
    circuit: "Raceway Lelystad",
    competitie: "Rotax Max Challenge",
    position: 2,
    image: "/placeholder.svg",
  },
  {
    id: 2,
    title: "Seizoensopener IAME X30 Challenge",
    slug: "seizoensopener-iame-x30-2024",
    excerpt: "Start van het seizoen met een goede 5e plaats ondanks technische problemen.",
    date: "2024-09-20",
    year: 2024,
    circuit: "Circuit Zandvoort",
    competitie: "IAME X30 Challenge",
    position: 5,
    image: "/placeholder.svg",
  },
  {
    id: 3,
    title: "Overwinning in ONK Karting",
    slug: "overwinning-onk-karting-2024",
    excerpt: "Pole position en racewinst! Een perfecte dag op het circuit.",
    date: "2024-08-12",
    year: 2024,
    circuit: "Kartcircuit Berghem",
    competitie: "ONK Karting",
    position: 1,
    image: "/placeholder.svg",
  },
];

const Nieuws = () => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCompetition, setSelectedCompetition] = useState<string | null>(null);

  const years = [...new Set(mockNews.map((n) => n.year))].sort((a, b) => b - a);
  const competitions = [...new Set(mockNews.map((n) => n.competitie))];

  const filteredNews = mockNews.filter((article) => {
    if (selectedYear && article.year !== selectedYear) return false;
    if (selectedCompetition && article.competitie !== selectedCompetition) return false;
    return true;
  });

  const getPositionBadge = (position: number) => {
    const colors = {
      1: "bg-yellow-500 text-black",
      2: "bg-gray-300 text-black",
      3: "bg-orange-600 text-white",
    };

    return (
      <div
        className={`inline-flex items-center justify-center w-10 h-10 rounded-full font-bold ${
          colors[position as keyof typeof colors] || "bg-muted text-foreground"
        }`}
      >
        {position}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-5xl md:text-6xl font-headline font-bold mb-4">
              Wedstrijdverslagen
            </h1>
            <p className="text-xl text-muted-foreground">
              Al mijn race resultaten en verhalen
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-wrap gap-3">
            <Button
              variant={selectedYear === null ? "default" : "outline"}
              onClick={() => setSelectedYear(null)}
              className={selectedYear === null ? "gradient-orange" : ""}
            >
              Alle Jaren
            </Button>
            {years.map((year) => (
              <Button
                key={year}
                variant={selectedYear === year ? "default" : "outline"}
                onClick={() => setSelectedYear(year)}
                className={selectedYear === year ? "gradient-orange" : ""}
              >
                {year}
              </Button>
            ))}
          </div>

          <div className="mb-12 flex flex-wrap gap-3">
            <Button
              variant={selectedCompetition === null ? "default" : "outline"}
              onClick={() => setSelectedCompetition(null)}
              className={selectedCompetition === null ? "gradient-orange" : ""}
            >
              Alle Competities
            </Button>
            {competitions.map((comp) => (
              <Button
                key={comp}
                variant={selectedCompetition === comp ? "default" : "outline"}
                onClick={() => setSelectedCompetition(comp)}
                className={selectedCompetition === comp ? "gradient-orange" : ""}
              >
                {comp}
              </Button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredNews.map((article) => (
              <Card
                key={article.id}
                className="group hover:shadow-orange transition-smooth hover-lift overflow-hidden"
              >
                <Link to={`/nieuws/${article.year}/${article.slug}`}>
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                    />
                    <div className="absolute top-4 right-4">
                      {getPositionBadge(article.position)}
                    </div>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(article.date).toLocaleDateString("nl-NL", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </div>
                    </div>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{article.circuit}</span>
                    </div>
                    <div className="text-xs font-medium text-primary">
                      {article.competitie}
                    </div>
                    <h3 className="font-headline font-semibold text-xl group-hover:text-primary transition-smooth">
                      {article.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                    <div className="pt-2">
                      <span className="text-primary font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-smooth">
                        Lees meer
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>

          {filteredNews.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                Geen verslagen gevonden met de geselecteerde filters.
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Nieuws;