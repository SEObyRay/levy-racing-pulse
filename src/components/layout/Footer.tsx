import { Link } from "react-router-dom";
import { Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-orange rounded-lg flex items-center justify-center font-headline font-bold text-lg">
                LO
              </div>
              <span className="font-headline font-bold text-lg">
                Levy Opbergen
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Volg mijn race avonturen in verschillende kart competities.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-headline font-semibold mb-4">Navigatie</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/nieuws"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Nieuws
                </Link>
              </li>
              <li>
                <Link
                  to="/agenda"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Agenda
                </Link>
              </li>
              <li>
                <Link
                  to="/over-levy"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Over Levy
                </Link>
              </li>
              <li>
                <Link
                  to="/media"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Sponsors */}
          <div>
            <h4 className="font-headline font-semibold mb-4">Sponsoren</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/sponsors"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Alle Sponsors
                </Link>
              </li>
              <li>
                <Link
                  to="/club-van-100"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Club van 100
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-smooth"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-headline font-semibold mb-4">Volg Mij</h4>
            <div className="flex gap-3">
              <a
                href="https://instagram.com/levyopbergen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary flex items-center justify-center transition-smooth hover-lift"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://youtube.com/@levyopbergen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary flex items-center justify-center transition-smooth hover-lift"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
              <a
                href="https://facebook.com/levyopbergen"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary flex items-center justify-center transition-smooth hover-lift"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Levy Opbergen. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <Link
              to="/privacy"
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Privacy
            </Link>
            <Link
              to="/algemene-voorwaarden"
              className="text-sm text-muted-foreground hover:text-primary transition-smooth"
            >
              Algemene Voorwaarden
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;