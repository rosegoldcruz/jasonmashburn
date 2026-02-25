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
    <header className="fixed inset-x-0 top-0 z-50 bg-gradient-to-r from-primary/94 via-[#0f2541]/93 to-primary/94 shadow-[0_14px_32px_-20px_rgba(0,0,0,0.7)] backdrop-blur-xl">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="text-lg font-semibold text-primary-foreground sm:text-xl">
          Jason Mashburn
          <span className="ml-2 text-[10px] font-medium uppercase tracking-[0.2em] text-accent sm:text-xs">
            IUL Advisor
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-primary-foreground/85 hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="h-10 rounded-full bg-accent px-5 text-accent-foreground hover:bg-accent/90">
            <Link href="/apply" data-major-cta>Get Free Illustration</Link>
          </Button>
        </nav>
      </div>
      <MobileGestureNav />
    </header>
  )
}
