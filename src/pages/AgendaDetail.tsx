import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import { decodeHtml } from "@/lib/utils";
import { useWordPressEventBySlug } from "@/hooks/use-wordpress";
import type { WPEvent } from "@/types/wordpress";
import PageSeo from "@/components/seo/PageSeo";
import { buildCanonical } from "@/lib/seo";

const extractFeaturedImage = (event: WPEvent | null) => {
  if (!event?._embedded) return null;
  const media = (event._embedded["wp:featuredmedia"] as any)?.[0];
  return media?.source_url || null;
};

const formatDate = (date?: string) => {
  if (!date) return "Onbekende datum";
  return new Date(date).toLocaleDateString("nl-NL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const AgendaDetail = () => {
  const { slug, year } = useParams();
  const navigate = useNavigate();

  const { data: event, isLoading, isError } = useWordPressEventBySlug(slug ?? "");

  const featuredImage = useMemo(() => extractFeaturedImage(event), [event]);

  const location = event?.meta?.locatie ? decodeHtml(event.meta.locatie) : "Onbekend Circuit";
  const address = event?.meta?.adres ? decodeHtml(event.meta.adres) : "";
  const city = event?.meta?.stad ? decodeHtml(event.meta.stad) : "";
  const klasse = event?.meta?.klasse ? decodeHtml(event.meta.klasse) : "";
  const time = event?.meta?.tijd ? decodeHtml(event.meta.tijd) : "Tijd nog niet bekend";
  const canonicalPath = year && slug ? `/agenda/${year}/${slug}` : "/agenda";
  const description = event
    ? `${formatDate(event.meta?.datum)} • ${location}${city ? ` (${city})` : ""}`
    : "Bekijk details van dit evenement op de race agenda van Levy Opbergen.";

  const eventJsonLd = event
    ? {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: decodeHtml(event.title.rendered),
        startDate: event.meta?.datum ? new Date(event.meta.datum).toISOString() : undefined,
        endDate: event.meta?.einddatum ? new Date(event.meta.einddatum).toISOString() : undefined,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: location,
          address: address || city || undefined,
        },
        url: buildCanonical(canonicalPath),
        description,
        image: featuredImage ? [featuredImage] : undefined,
      }
    : undefined;

  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title={event ? `${decodeHtml(event.title.rendered)} | Race Agenda Levy Opbergen` : "Race agenda evenement"}
        description={description}
        path={canonicalPath}
        type="event"
        image={featuredImage ?? undefined}
        jsonLd={eventJsonLd}
      />
      <Header />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Button variant="ghost" className="mb-6 gap-2" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-4 h-4" /> Terug
          </Button>

          {isLoading && <div className="text-muted-foreground">Evenement wordt geladen...</div>}
          {isError && !isLoading && (
            <div className="text-destructive">Kon het evenement niet ophalen. Probeer later opnieuw.</div>
          )}

          {!isLoading && !event && !isError && (
            <div className="text-muted-foreground">Evenement niet gevonden.</div>
          )}

          {event && (
            <article className="space-y-10">
              <header className="space-y-4">
                <div className="space-y-2">
                  <span className="text-sm uppercase tracking-wide text-primary/80">
                    {klasse || "Karting"}
                  </span>
                  <h1 className="text-4xl md:text-5xl font-headline font-bold">
                    {decodeHtml(event.title.rendered)}
                  </h1>
                </div>

                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(event.meta?.datum)}
                    {event.meta?.einddatum ? ` – ${formatDate(event.meta.einddatum)}` : ""}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {location}
                    {(city || address) && (
                      <span className="text-muted-foreground/80">
                        {city && !address ? city : address || ""}
                      </span>
                    )}
                  </div>
                </div>

                {featuredImage && (
                  <div className="overflow-hidden rounded-3xl border border-border">
                    <img
                      src={featuredImage}
                      alt={decodeHtml(event.title.rendered)}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                )}
              </header>

              <div className="prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: event.content?.rendered ?? "" }} />
            </article>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AgendaDetail;
