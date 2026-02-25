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
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <LenisProvider>
          <SiteHeader />
          {children}
          <SiteFooter />
          <MobileFloatingCta />
          <ChatWidget />
          <StampImpactOverlay />
          <Analytics />
        </LenisProvider>
      </body>
    </html>
  )
}
