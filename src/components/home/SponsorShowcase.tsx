import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

// Mock sponsor data - replace with WordPress GraphQL later
const sponsors = [
  { id: 1, name: "Sponsor 1", logo: "/placeholder.svg", tier: "main" },
  { id: 2, name: "Sponsor 2", logo: "/placeholder.svg", tier: "main" },
  { id: 3, name: "Sponsor 3", logo: "/placeholder.svg", tier: "main" },
  { id: 4, name: "Sponsor 4", logo: "/placeholder.svg", tier: "secondary" },
  { id: 5, name: "Sponsor 5", logo: "/placeholder.svg", tier: "secondary" },
  { id: 6, name: "Sponsor 6", logo: "/placeholder.svg", tier: "secondary" },
];

const SponsorShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-headline font-bold mb-4">
            Mijn Partners
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Deze geweldige bedrijven maken mijn race avonturen mogelijk
          </p>
        </div>

        {/* Sponsor Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
          {sponsors.map((sponsor) => (
            <Link
              key={sponsor.id}
              to={`/sponsors/${sponsor.id}`}
              className="group aspect-square bg-card rounded-lg border border-border overflow-hidden hover:border-primary transition-smooth hover-lift"
            >
              <div className="w-full h-full p-6 flex items-center justify-center">
                <img
                  src={sponsor.logo}
                  alt={sponsor.name}
                  className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-smooth"
                />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-card to-secondary rounded-2xl p-8 md:p-12 text-center shadow-soft">
          <h3 className="text-3xl md:text-4xl font-headline font-bold mb-4">
            Word Onderdeel van het Team
          </h3>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Wil jij ook mijn race avonturen steunen? Sluit je aan bij de Club van 100 
            en profiteer van exclusieve voordelen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="gradient-orange shadow-orange hover-lift"
            >
              <Link to="/club-van-100" className="flex items-center gap-2">
                Bekijk Mogelijkheden
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link to="/sponsors">Alle Sponsors</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SponsorShowcase;