import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import PageSeo from "@/components/seo/PageSeo";

const Sponsors = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSeo
        title="Partners & Sponsoren | Levy Opbergen"
        description="Ontdek alle partners en sponsoren die de race carrière van Levy Opbergen ondersteunen en word zelf partner."
        path="/sponsors"
      />
      <Header />
      <main className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <section className="mb-16 text-center">
            <h1 className="text-5xl md:text-6xl font-headline font-bold mb-4">Partners & Sponsoren</h1>
            <p className="text-xl text-muted-foreground">
              Binnenkort komt hier het overzicht van alle partners die Levy richting de top helpen.
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((slot) => (
              <div
                key={slot}
                className="border border-dashed border-border rounded-3xl h-48 flex flex-col items-center justify-center text-muted-foreground"
              >
                <span className="text-sm uppercase tracking-[0.24em] mb-2">Sponsor slot {slot}</span>
                <span className="text-lg font-semibold">Binnenkort beschikbaar</span>
              </div>
            ))}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Sponsors;
