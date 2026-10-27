"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export function ConditionalFooter() {
  const pathname = usePathname();

  // For the current homepage hero stage, homepage contains ONLY the header and hero
  if (pathname === "/") {
    return null;
  }

  return <Footer />;
}
