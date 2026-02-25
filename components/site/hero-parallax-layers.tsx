"use client"

import { useEffect, useMemo, useRef } from "react"
import { ShieldCheck, Landmark, BarChart3 } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

export function HeroParallaxLayers() {
  const rootRef = useRef<HTMLDivElement | null>(null)
  const profile = useAdaptiveMotion()

  const particles = useMemo(
    () =>
      Array.from({ length: profile.particleCount }, (_, index) => {
        const seed = (index + 1) * 19
        return {
          id: index,
          left: `${(seed * 7) % 98}%`,
          top: `${(seed * 11) % 75}%`,
          size: 6 + ((seed * 13) % 18),
          delay: (seed % 8) * 0.06,
        }
      }),
    [profile.particleCount],
  )

  useEffect(() => {
    if (profile.reduced) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const root = rootRef.current
    if (!root) return

    const layers = gsap.utils.toArray<HTMLElement>("[data-parallax-depth]", root)

    const ctx = gsap.context(() => {
      layers.forEach((layer) => {
        const depth = Number(layer.dataset.parallaxDepth ?? "0.2")
        gsap.fromTo(
          layer,
          { y: 0 },
          {
            y: -140 * depth * profile.parallaxFactor,
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        )
      })
    }, root)

    return () => ctx.revert()
  }, [profile.parallaxFactor, profile.reduced])

  return (
    <div ref={rootRef} className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        data-parallax-depth={profile.reduced ? "0.05" : "0.15"}
        className="absolute -left-24 top-4 h-72 w-72 rounded-full bg-accent/14"
        style={{ filter: `blur(${Math.max(8, profile.blurPx - 4)}px)` }}
      />
      <div
        data-parallax-depth={profile.reduced ? "0.1" : "0.35"}
        className="absolute right-[-6rem] top-24 h-80 w-80 rounded-full bg-primary-foreground/9"
        style={{ filter: `blur(${Math.max(10, profile.blurPx)}px)` }}
      />
      <div
        data-parallax-depth={profile.reduced ? "0.18" : "0.65"}
        className="absolute bottom-[-5rem] left-1/3 h-64 w-64 rounded-full bg-accent/11"
        style={{ filter: `blur(${Math.max(10, profile.blurPx - 1)}px)` }}
      />

      {particles.map((particle) => (
        <span
          key={particle.id}
          data-parallax-depth="0.8"
          className="absolute rounded-full bg-accent/16 will-change-transform"
          style={{
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: particle.left,
            top: particle.top,
            animationDelay: `${particle.delay}s`,
          }}
        />
      ))}

      {!profile.isSmallMobile ? (
        <>
          <ShieldCheck data-parallax-depth="0.4" className="absolute left-[12%] top-[22%] size-8 text-accent/45" />
          <Landmark data-parallax-depth="0.55" className="absolute right-[14%] top-[32%] size-9 text-primary-foreground/35" />
          <BarChart3 data-parallax-depth="0.45" className="absolute left-[28%] bottom-[26%] size-8 text-accent/48" />
        </>
      ) : null}
    </div>
  )
}
