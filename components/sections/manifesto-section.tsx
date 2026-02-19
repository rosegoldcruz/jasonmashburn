"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

export function ManifestoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const clipPath = useTransform(scrollYProgress, [0.2, 0.6], ["inset(0 100% 0 0)", "inset(0 0% 0 0)"])

  return (
    <section
      ref={containerRef}
      className="relative bg-background px-5 md:px-8 py-18 md:py-22"
    >
      <div className="max-w-5xl mx-auto relative">
        <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground mb-5">WHY STRUCTURE MATTERS</p>

        <h2 className="text-[2.15rem] md:text-6xl lg:text-[4.5rem] font-serif leading-[0.94] md:leading-[0.92] text-foreground/15">
          Retirement Is No Longer Passive.
        </h2>

        <motion.h2
          className="absolute inset-x-0 top-0 text-[2.15rem] md:text-6xl lg:text-[4.5rem] font-serif leading-[0.94] md:leading-[0.92] bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          style={{ clipPath }}
        >
          Retirement Is No Longer Passive.
        </motion.h2>

        <div className="mt-10 space-y-5 max-w-4xl">
          <p className="text-[0.96rem] md:text-lg leading-relaxed text-foreground/85">
            Market volatility, shifting economic conditions, and longer life expectancy have changed what retirement
            planning requires. Growth alone is no longer the strategy. Structure, income clarity, and tax awareness
            are essential components of a stable retirement phase.
          </p>
          <p className="text-[0.96rem] md:text-lg leading-relaxed text-foreground/85">
            This is not about chasing returns. It is about protecting what you’ve built and aligning it with your
            long-term objectives.
          </p>
        </div>
      </div>
    </section>
  )
}
