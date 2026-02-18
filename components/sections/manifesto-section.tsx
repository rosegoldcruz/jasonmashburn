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
      className="relative min-h-[68vh] flex items-center justify-center bg-background px-5 md:px-8 py-22 md:py-24"
    >
      <div className="max-w-6xl mx-auto relative">
        <h2 className="text-5xl md:text-7xl lg:text-[5.35rem] font-serif leading-[0.92] text-center text-foreground/15">
          Stop building websites.
          <br />
          Start telling stories.
        </h2>

        {/* Gradient mask reveal text */}
        <motion.h2
          className="absolute inset-0 text-5xl md:text-7xl lg:text-[5.35rem] font-serif leading-[0.92] text-center bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          style={{ clipPath }}
        >
          Stop building websites.
          <br />
          Start telling stories.
        </motion.h2>
      </div>
    </section>
  )
}
