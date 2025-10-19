import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "VSG Talent - Altijd 100%, in weer en wind",
    short_name: "VSG Talent",
    description: "VSG Talent ondersteunt veelbelovende sporters in Nederland",
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#FF6B00",
    orientation: "portrait-primary",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["sports", "entertainment"],
    lang: "nl-NL",
  };
}
