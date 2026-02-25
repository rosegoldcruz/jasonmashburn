"use client"

import Link from "next/link"
import type React from "react"
import { useEffect, useMemo, useRef, useState } from "react"
import { Home, Sparkles, FileText, Phone, Compass, X } from "lucide-react"
import gsap from "gsap"
import { Draggable } from "gsap/Draggable"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

gsap.registerPlugin(Draggable)

type NavItem = {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "How It Works", href: "/how-it-works", icon: Sparkles },
  { label: "Apply", href: "/apply", icon: FileText },
  { label: "Contact", href: "/contact", icon: Phone },
]

function vibrate(pulse = 18) {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(pulse)
  }
}

export function MobileGestureNav() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement | null>(null)
  const profile = useAdaptiveMotion()

  const [touchStartY, setTouchStartY] = useState<number | null>(null)
  const [touchEndY, setTouchEndY] = useState<number | null>(null)

  const orderedItems = useMemo(() => {
    if (!profile.isPortrait) return navItems
    if (typeof window === "undefined") return navItems

    const thumbAnchor = {
      x: window.innerWidth - (profile.isSmallMobile ? 52 : 62),
      y: window.innerHeight - (profile.isSmallMobile ? 78 : 88),
    }
    const radius = profile.isSmallMobile ? 92 : 108

    return [...navItems]
      .map((item, index) => {
        const angle = (-Math.PI / 2.2) + index * (Math.PI / 5.2)
        const x = thumbAnchor.x - radius * Math.cos(angle)
        const y = thumbAnchor.y - radius * Math.sin(angle)
        const distance = Math.hypot(thumbAnchor.x - x, thumbAnchor.y - y)
        return { item, distance }
      })
      .sort((a, b) => a.distance - b.distance)
      .map((entry) => entry.item)
  }, [profile.isPortrait, profile.isSmallMobile])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""

    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  useEffect(() => {
    if (!panelRef.current || !open) return

    const panel = panelRef.current
    gsap.set(panel, { yPercent: 0 })

    const draggable = Draggable.create(panel, {
      type: "y",
      bounds: { minY: 0, maxY: 420 },
      inertia: false,
      onDragEnd: function onDragEnd() {
        const velocity = Math.abs((this as { deltaY?: number }).deltaY ?? 0)
        const closeThreshold = profile.isSmallMobile ? 120 : 150
        const end = this.y > closeThreshold ? 420 : 0
        gsap.to(panel, {
          y: end,
          duration: Math.min(0.7, (0.36 + velocity / 1000) * profile.motionDurationScale),
          ease: "power4.out",
          onComplete: () => {
            if (end === 420) setOpen(false)
          },
        })
      },
    })

    return () => {
      draggable.forEach((instance) => instance.kill())
    }
  }, [open, profile.isSmallMobile, profile.motionDurationScale])

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        "[data-radial-item]",
        { opacity: 0, scale: 0.7 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.28 * profile.motionDurationScale,
          stagger: 0.04,
          ease: "power2.out",
        },
      )
    }
  }, [open, profile.motionDurationScale])

  const onTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndY(null)
    setTouchStartY(event.targetTouches[0]?.clientY ?? null)
  }

  const onTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    setTouchEndY(event.targetTouches[0]?.clientY ?? null)
  }

  const onTouchEnd = () => {
    if (touchStartY == null || touchEndY == null) return

    const delta = touchStartY - touchEndY
    if (delta > 40) {
      setOpen(true)
      vibrate(22)
    }
    if (delta < -40) {
      setOpen(false)
      vibrate(16)
    }
  }

  if (!profile.isMobile) {
    return null
  }

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 h-20" onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}>
        <div className="absolute bottom-4 right-4">
          <button
            type="button"
            onClick={() => {
              setOpen((prev) => !prev)
              vibrate(24)
            }}
            className="inline-flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg"
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X className="size-6" /> : <Compass className="size-6" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-primary/55 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            ref={panelRef}
            className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-white/15 bg-primary px-6 pb-10 pt-4"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="mx-auto mb-4 h-1.5 w-14 rounded-full bg-primary-foreground/30" />

            <div className="relative mx-auto mt-2 h-52 w-72 max-w-full">
              {orderedItems.map((item, index) => {
                const Icon = item.icon
                const angleStart = profile.isSmallMobile ? -Math.PI / 2.15 : -Math.PI / 2.35
                const angleStep = profile.isSmallMobile ? Math.PI / 4.7 : Math.PI / 5
                const angle = angleStart + index * angleStep
                const radius = profile.isPortrait ? (profile.isSmallMobile ? 92 : 108) : 74
                const centerX = profile.isSmallMobile ? 112 : 128
                const centerY = profile.isSmallMobile ? 158 : 166
                const x = centerX - radius * Math.cos(angle)
                const y = centerY - radius * Math.sin(angle)

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    data-radial-item
                    className="absolute inline-flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-foreground"
                    style={{ left: x, top: y }}
                    onClick={() => {
                      setOpen(false)
                      vibrate(12)
                    }}
                    aria-label={item.label}
                  >
                    <Icon className="size-5" />
                  </Link>
                )
              })}

              <div
                className="absolute left-1/2 -translate-x-1/2 rounded-full bg-accent px-5 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground"
                style={{ top: profile.isSmallMobile ? 154 : 166 }}
              >
                Swipe down to close
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
