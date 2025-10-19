import { SITE_URL } from "./seo";

interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item?: string;
}

export function buildBreadcrumbsJsonLd(items: Array<{ name: string; url?: string }>): object {
  const breadcrumbList: BreadcrumbItem[] = items.map((item, index) => {
    const breadcrumb: BreadcrumbItem = {
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
    };
    
    // Only add item URL if it's not the last item (current page)
    if (item.url && index < items.length - 1) {
      breadcrumb.item = item.url.startsWith("http") ? item.url : `${SITE_URL}${item.url}`;
    }
    
    return breadcrumb;
  });

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbList,
  };
}
