import "../styles/globals.css";
import { Metadata } from "next";
import { Providers } from "@/components/providers";
import { profile } from "@/lib/data/profile";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

const siteName = `${profile.name} – ${profile.title}`;
// Resolve site URL from env (deployed) or localhost fallback
const siteUrl = (() => {
  const direct = process.env.NEXT_PUBLIC_SITE_URL;
  if (direct) return direct.replace(/\/$/, "");
  const vercel = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined;
  return (vercel || "http://localhost:3000").replace(/\/$/, "");
})();
const siteDescription = profile.about;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteName,
  template: `%s – ${profile.name}`,
  },
  description: siteDescription,
  keywords: [
    "Full Stack Developer",
    "Next.js",
    "TypeScript",
    "React",
    "Tailwind CSS",
    "Portfolio"
  ],
  openGraph: {
    type: "website",
    url: siteUrl,
    title: siteName,
    description: siteDescription,
    siteName,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: siteName }],
    locale: "en_US"
  },
  twitter: {
    
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
  images: ["/og.png"],
  creator: profile.socials.twitter?.replace("https://twitter.com/", "@") ?? undefined,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
  name: profile.name,
    jobTitle: profile.title,
    url: siteUrl,
    sameAs: [profile.socials.github, profile.socials.linkedin, profile.socials.twitter].filter(Boolean),
  email: `mailto:${profile.email}`,
    address: {
      "@type": "PostalAddress",
  addressLocality: profile.location,
  addressRegion: "",
  addressCountry: "India"
    }
  };

  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="person-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <Script id="website-jsonld" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
