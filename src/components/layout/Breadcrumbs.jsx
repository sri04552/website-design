import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Breadcrumbs({ items = [] }) {
  if (!items || items.length === 0) return null;

  // JSON-LD structured data for search engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteConfig.url,
      },
      ...items.map((item, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: item.label,
        item: `${siteConfig.url}${item.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="py-4 select-none">
        <ol className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm text-slate-500">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1 hover:text-blue-600 transition-colors py-1 focus-visible:outline-blue-600 rounded"
              title="Home"
            >
              <Home className="w-3.5 h-3.5" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href || index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                {isLast ? (
                  <span
                    className="font-medium text-slate-900 line-clamp-1 py-1"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="hover:text-blue-600 transition-colors py-1 focus-visible:outline-blue-600 rounded"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
