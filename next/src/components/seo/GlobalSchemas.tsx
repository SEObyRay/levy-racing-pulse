import { getBusinessInfo, buildOrganizationSchema } from "@/lib/business-data";
import { SITE_URL } from "@/lib/seo";

export default async function GlobalSchemas() {
  const businessInfo = await getBusinessInfo();
  const organizationSchema = buildOrganizationSchema(businessInfo);

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "VSG Talent",
    alternateName: ["VSG Talent Platform", "VSG Dakwerken Talent"],
    url: SITE_URL,
    description:
      "VSG Talent ondersteunt veelbelovende sporters in Nederland. Altijd 100%, in weer en wind. Een initiatief van VSG Dakwerken.",
    inLanguage: "nl-NL",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Levy Opbergen",
    url: SITE_URL,
    image: `${SITE_URL}/og-image.jpg`,
    jobTitle: "Kart Racing Driver",
    description: "Nederlands kart racing talent",
    sameAs: Object.values(businessInfo.socialMedia).filter(Boolean),
    affiliation: {
      "@id": `${SITE_URL}/#organization`,
    },
    knowsAbout: ["Karting", "Motorsport", "Racing", "Parolin Rocky 200cc"],
    nationality: {
      "@type": "Country",
      name: "Nederland",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify({ ...organizationSchema, "@id": `${SITE_URL}/#organization` }) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
    </>
  );
}
