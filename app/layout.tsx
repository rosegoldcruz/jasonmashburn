import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { LenisProvider } from "@/components/lenis-provider"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { ChatWidget } from "@/components/site/chat-widget"
import { MobileFloatingCta } from "@/components/site/mobile-floating-cta"
import { StampImpactOverlay } from "@/components/site/stamp-impact-overlay"
import { LeadCaptureModal } from "@/components/site/lead-capture-modal"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Jason Mashburn | Arizona IUL Strategies",
  description:
    "Tax-advantaged Indexed Universal Life education and policy design for Arizona families, business owners, and pre-retirees.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: "Jason Mashburn — Arizona IUL Strategies",
    description:
      "Tax-advantaged Indexed Universal Life education and policy design for Arizona families, business owners, and pre-retirees.",
    url: "https://jasonmashburn.com",
    telephone: process.env.NEXT_PUBLIC_JASON_PHONE || "",
    email: process.env.NEXT_PUBLIC_JASON_EMAIL || "",
    areaServed: {
      "@type": "State",
      name: "Arizona",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Scottsdale",
      addressRegion: "AZ",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 33.4942,
      longitude: -111.9261,
    },
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "17:00",
    },
    sameAs: [],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Financial Planning Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Indexed Universal Life (IUL) Strategy Design",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Retirement Income Planning",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Fixed Annuity Planning",
          },
        },
      ],
    },
  }

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LenisProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileFloatingCta />
          <ChatWidget />
          <StampImpactOverlay />
          <LeadCaptureModal />
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  )
}
