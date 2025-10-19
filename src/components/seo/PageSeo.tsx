import { Helmet } from "react-helmet-async";
import { SITE_URL, buildCanonical } from "@/lib/seo";

type PageSeoProps = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile" | "collection" | string;
  image?: string;
  jsonLd?: unknown | unknown[];
};

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const PageSeo = ({
  title,
  description,
  path,
  type = "website",
  image,
  jsonLd,
}: PageSeoProps) => {
  const url = buildCanonical(path);
  const imageUrl = image ?? DEFAULT_IMAGE;
  const scripts = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      {scripts.map((data, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
};

export default PageSeo;
