"use client"

import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Download, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const STORAGE_KEY = "jm-lead-dismissed"
const SCROLL_THRESHOLD = 0.45
const DELAY_MS = 8000

export function LeadCaptureModal() {
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const dismiss = useCallback(() => {
    setOpen(false)
    try {
      sessionStorage.setItem(STORAGE_KEY, "1")
    } catch {}
  }, [])

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return
    } catch {}

    let triggered = false
    const timer = setTimeout(() => {
      // fallback: show after delay if scroll hasn't triggered it
    }, DELAY_MS + 4000)

    function onScroll() {
      if (triggered) return
      const scrollPct =
        window.scrollY / (document.body.scrollHeight - window.innerHeight)
      if (scrollPct >= SCROLL_THRESHOLD) {
        triggered = true
        setOpen(true)
      }
    }

    function onMouseLeave(e: MouseEvent) {
      if (triggered) return
      if (e.clientY <= 0) {
        triggered = true
        setOpen(true)
      }
    }

    const scrollTimer = setTimeout(() => {
      window.addEventListener("scroll", onScroll, { passive: true })
      document.addEventListener("mouseleave", onMouseLeave)
    }, DELAY_MS)

    return () => {
      clearTimeout(timer)
      clearTimeout(scrollTimer)
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (name.trim() && email.trim()) {
      setSubmitted(true)
      try {
        sessionStorage.setItem(STORAGE_KEY, "1")
      } catch {}
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={(e) => {
            if (e.target === e.currentTarget) dismiss()
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.3 }}
            className="glass-panel-strong relative mx-4 w-full max-w-md rounded-2xl p-8"
          >
            <button
              onClick={dismiss}
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground hover:bg-white/10 hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            {!submitted ? (
              <>
                <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15">
                  <Download className="h-5 w-5 text-accent" />
                </div>
                <h3 className="mt-3 text-2xl font-serif text-primary">
                  Free IUL Planning Guide
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  Download our guide: <strong className="text-foreground">&ldquo;Understanding Indexed Universal Life Insurance &mdash; What Arizona Retirees Need to Know.&rdquo;</strong> Covers protection mechanics, tax-aware design, and income planning fundamentals.
                </p>
                <form onSubmit={handleSubmit} className="mt-5 space-y-3">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="h-10 rounded-lg border-white/15 bg-white/5 text-sm"
                  />
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-10 rounded-lg border-white/15 bg-white/5 text-sm"
                  />
                  <Button
                    type="submit"
                    className="h-10 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                  >
                    Get Free Guide
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
                <p className="mt-3 text-center text-[11px] text-muted-foreground/60">
                  No spam. Unsubscribe anytime.
                </p>
              </>
            ) : (
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                  <Download className="h-7 w-7 text-accent" />
                </div>
                <h3 className="text-2xl font-serif text-primary">Guide on Its Way!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check your inbox for the IUL planning guide. Jason may follow up with personalized insights based on your goals.
                </p>
                <Button
                  onClick={dismiss}
                  className="mt-5 h-10 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                >
                  Continue Browsing
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
