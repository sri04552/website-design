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
    // Provide a full compatibility bridge for any components calling window.lenis
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
            const yOffset = options.offset || -80;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({
              top: y,
              behavior: options.immediate ? "instant" : "smooth",
            });
          }
        } else if (target && typeof target === "object" && target.getBoundingClientRect) {
          const yOffset = options.offset || -80;
          const y = target.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({
            top: y,
            behavior: options.immediate ? "instant" : "smooth",
          });
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
        const yOffset = -80;
        const y = targetEl.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({
          top: y,
          behavior: "smooth",
        });
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
