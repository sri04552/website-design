import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/config/site";

export function Breadcrumbs({ items = [], className = "" }) {
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
      <nav aria-label="Breadcrumb" className={`py-3 select-none ${className}`}>
        <ol className="inline-flex items-center flex-wrap gap-1.5 px-3 py-1.5 rounded-full bg-[#14233D]/80 border border-[#29374D] backdrop-blur-md text-xs sm:text-[13px] shadow-xs">
          <li>
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-[#9BAAC2] hover:text-[#00B8F0] transition-colors py-0.5 focus-visible:outline-[#00B8F0] rounded font-medium"
              title="Home"
            >
              <Home className="w-3.5 h-3.5 text-[#00B8F0] shrink-0" />
              <span>Home</span>
            </Link>
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href || index} className="flex items-center gap-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-[#475569] shrink-0" />
                {isLast ? (
                  <span
                    className="font-semibold text-[#F5F7FC] line-clamp-1 py-0.5"
                    aria-current="page"
                  >
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="text-[#9BAAC2] hover:text-[#00B8F0] transition-colors py-0.5 focus-visible:outline-[#00B8F0] rounded font-medium"
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
