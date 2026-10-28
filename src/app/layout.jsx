import { Inter, Manrope, Orbitron } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

const automataDisplay = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-automata",
  weight: ["600", "700", "800", "900"],
});

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Web Development, Performance Ads & AI Automation in Eluru`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "We engineer high-performance custom websites, ROI-driven marketing campaigns, and intelligent AI automation systems designed to capture qualified leads, streamline operations, and scale modern businesses in Eluru and pan-India.",
  keywords: [
    "Freelance Web Developer Eluru",
    "Website Design Eluru Andhra Pradesh",
    "Meta Ads Management Eluru",
    "Google Ads Freelancer Andhra Pradesh",
    "AI Automation Chatbots India",
    "Digital Marketing Agency Eluru",
    "Amogha Digital Web Design",
    "High Performance Business Websites",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-192x192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  openGraph: {
    title: `${siteConfig.name} | Web Development, Ads & AI Automation`,
    description:
      "Custom high-performance websites, targeted advertising, and 24/7 AI chatbots in Eluru, Andhra Pradesh.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Digital Services & AI Automation`,
    description:
      "Custom high-performance websites, targeted advertising, and 24/7 AI chatbots in Eluru, Andhra Pradesh.",
  },
  other: {
    "geo.region": "IN-AP",
    "geo.placename": "Eluru",
    "geo.position": "16.7107;81.0952",
    ICBM: "16.7107, 81.0952",
  },
};

export default function RootLayout({ children }) {
  // Structured Schema for Local Business / Professional Service
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.name,
    description:
      "High-performance website development, targeted paid advertising, and AI workflow automation.",
    url: siteConfig.url,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.location.city,
      addressRegion: siteConfig.location.state,
      addressCountry: siteConfig.location.country,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "16.7107",
      longitude: "81.0952",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Eluru" },
      { "@type": "AdministrativeArea", name: "West Godavari" },
      { "@type": "AdministrativeArea", name: "Andhra Pradesh" },
      { "@type": "Country", name: "India" },
    ],
    knowsAbout: [
      "Website Design and Development",
      "Meta Ads Management",
      "Google Ads Management",
      "AI Automation and Workflow Chatbots",
      "Graphic Design and Brand Identity",
      "AI Video Production",
    ],
  };

  return (
    <html
      lang="en"
      className={`${inter.variable} ${manrope.variable} ${automataDisplay.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-[#0B1220] text-[#F5F7FC] antialiased selection:bg-[#00B8F0] selection:text-[#0B1220]">
        <SmoothScroll />
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        {/* Footer enabled across all pages including homepage */}
        <Footer />
      </body>
    </html>
  );
}
