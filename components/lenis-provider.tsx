"use client"

import { useEffect, type ReactNode } from "react"
import Lenis from "lenis"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.2,
    })

    let rafId = 0

    function raf(time: number) {
      lenis.raf(time)
      ScrollTrigger.update()
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)
    ScrollTrigger.refresh()

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return <>{children}</>
}
