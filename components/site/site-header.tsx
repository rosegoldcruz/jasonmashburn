"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MobileGestureNav } from "@/components/site/mobile-gesture-nav"

const navItems = [
  { label: "Home", href: "/" },
  { label: "How It Works", href: "/how-it-works" },
  { label: "Apply", href: "/apply" },
  { label: "Contact", href: "/contact" },
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-primary/95 backdrop-blur">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-primary-foreground">
          Jason Mashburn
          <span className="ml-2 text-xs font-normal uppercase tracking-[0.18em] text-accent">
            IUL Advisor
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-primary-foreground/90 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
            <Link href="/apply">Get Free Illustration</Link>
          </Button>
        </nav>
      </div>
      <MobileGestureNav />
    </header>
  )
}
