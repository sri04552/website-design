"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function SmoothScroll() {
  const pathname = usePathname();

  // Reset scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname]);

  // Smooth scroll handler for anchor links with native GPU compositor acceleration
  useEffect(() => {
    // Compatibility stub for any components calling window.lenis
    window.lenis = {
      scrollTo: (target, options = {}) => {
        if (typeof target === "number") {
          window.scrollTo({
            top: target,
            behavior: options.immediate ? "instant" : "smooth",
          });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          if (el) {
            el.scrollIntoView({
              behavior: options.immediate ? "instant" : "smooth",
              block: "start",
            });
          }
        }
      },
      stop: () => {},
      start: () => {},
    };

    const handleAnchorClick = (e) => {
      const link = e.target.closest("a[href*='#']");
      if (!link) return;

      const href = link.getAttribute("href");
      if (!href) return;

      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);
      if (!hash || hash === "#") return;

      const targetEl = document.querySelector(hash);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        if (window.history.pushState) {
          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      delete window.lenis;
    };
  }, []);

  return null;
}
