// Centralized site configuration
// All business details, contact channels, and branding are configured here.
// Sensitive or client-provided contact channels (WhatsApp, Email) read from environment variables
// with clean, transparent fallback notices.

export const siteConfig = {
  // Configurable business identity
  name: process.env.NEXT_PUBLIC_BUSINESS_NAME || "Sri Digital Studio",
  tagline: "High-Performance Websites, Targeted Advertising & AI Automation",
  shortDescription:
    "Independent freelance digital partner helping businesses in Eluru, Andhra Pradesh, and across India scale online with custom web development, paid advertising, and automated workflows.",
  
  // Location & service reach
  location: {
    city: "Eluru",
    state: "Andhra Pradesh",
    country: "India",
    serviceArea: "Eluru, Vijayawada, West Godavari region, and remote clients pan-India",
  },

  // Contact Channels (Configurable via Environment Variables)
  contact: {
    // WhatsApp number in international format without + or spaces (e.g., "916304299387")
    // Set NEXT_PUBLIC_WHATSAPP_NUMBER in .env.local to override
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "916304299387",
    whatsappDefaultMessage:
      "Hello! I saw your portfolio and would like to discuss a digital project for my business.",
    
    // Contact email
    // Set NEXT_PUBLIC_CONTACT_EMAIL in .env.local
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contact@example.com",
    
    // Display phone
    phone: process.env.NEXT_PUBLIC_PHONE_NUMBER || "+91 63042 99387",
    
    // Office / meeting note
    availabilityNote: "Available for in-person meetings in Eluru & virtual consultations pan-India",
  },

  // Base URL for metadata and canonicals (set NEXT_PUBLIC_SITE_URL in .env.local)
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

  // Main navigation structure
  navItems: [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],

  // Services list mapping
  services: [
    {
      id: "website-design",
      title: "Website Design & Development",
      shortTitle: "Web Development",
      slug: "website-design",
      href: "/services/website-design",
      tagline: "Fast, mobile-optimized websites built to convert visitors into phone calls and enquiries.",
      icon: "Code",
    },
    {
      id: "meta-ads",
      title: "Meta Ads Management",
      shortTitle: "Meta (FB & IG) Ads",
      slug: "meta-ads",
      href: "/services/meta-ads",
      tagline: "Targeted Facebook and Instagram campaigns that put your offer in front of qualified local buyers.",
      icon: "Share2",
    },
    {
      id: "google-ads",
      title: "Google Ads Management",
      shortTitle: "Google Ads",
      slug: "google-ads",
      href: "/services/google-ads",
      tagline: "Capture active buyers searching for your specific products or services on Google Search.",
      icon: "Search",
    },
    {
      id: "ai-automation",
      title: "AI Automation & Chatbots",
      shortTitle: "AI Automation",
      slug: "ai-automation",
      href: "/services/ai-automation",
      tagline: "24/7 automated WhatsApp/website assistants and automated workflow pipelines that save hours every week.",
      icon: "Bot",
    },
    {
      id: "graphic-design",
      title: "Graphic Design & Branding",
      shortTitle: "Graphic Design",
      slug: "graphic-design",
      href: "/services/graphic-design",
      tagline: "Cohesive visual identity, ad creatives, social media graphics, and print collateral that build authority.",
      icon: "Palette",
    },
    {
      id: "ai-video",
      title: "AI Video Generation",
      shortTitle: "AI Video",
      slug: "ai-video",
      href: "/services/ai-video",
      tagline: "High-impact video ads, product showcase reels, and localized social video content generated efficiently.",
      icon: "Video",
    },
  ],
};
