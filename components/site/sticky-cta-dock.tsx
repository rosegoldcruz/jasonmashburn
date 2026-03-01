"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { stickyDockReveal } from "@/motion/tokens"

export function StickyCtaDock() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      // Show after scrolling past 40% of viewport height (hero threshold)
      const threshold = window.innerHeight * 0.4
      setVisible(window.scrollY > threshold)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="sticky-cta-dock"
          initial={stickyDockReveal.initial}
          animate={stickyDockReveal.animate}
          exit={{ opacity: 0, y: 10 }}
          transition={stickyDockReveal.transition}
          className="fixed bottom-0 left-0 right-0 z-40 md:bottom-6 md:left-auto md:right-6 md:w-auto"
        >
          {/* Mobile: full-width bar */}
          <div className="flex items-center justify-between gap-3 border-t border-white/10 bg-[rgb(9_18_33/0.92)] px-4 py-3 backdrop-blur-md md:rounded-2xl md:border md:border-white/15 md:px-5 md:py-3.5 md:shadow-2xl"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <Button
              asChild
              size="sm"
              className="h-10 rounded-full bg-accent px-5 text-sm font-semibold text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/apply">Run Retirement Income Stress Test</Link>
            </Button>
            <Link
              href="/apply"
              className="whitespace-nowrap text-xs font-medium text-muted-foreground transition-colors hover:text-accent"
            >
              Request Custom Illustration
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
