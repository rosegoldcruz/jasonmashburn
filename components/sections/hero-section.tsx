"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const images = [
  "/azluxury.png",
  "/jason-headshot.png",
  "/boardroom.png",
]

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, -15])
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, 0])
  const rotate3 = useTransform(scrollYProgress, [0, 1], [0, 15])
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -200])
  const x3 = useTransform(scrollYProgress, [0, 1], [0, 200])
  const y = useTransform(scrollYProgress, [0, 1], [0, 100])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-5 md:px-8 lg:px-10 py-14 md:py-18"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[28vh] bg-gradient-to-b from-accent/10 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[92vw] max-w-6xl h-[36vh] rounded-[2.25rem] border border-border/70 bg-secondary/35" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="max-w-2xl">
          <p className="text-[11px] md:text-xs uppercase tracking-[0.22em] text-muted-foreground mb-4 md:mb-5">
            SCOTTSDALE RETIREMENT INCOME
          </p>

          <h1 className="text-[2.25rem] md:text-[4.85rem] lg:text-[5.7rem] leading-[0.92] md:leading-[0.9] font-serif text-foreground">
            Structured Retirement.
            <br />
            Built for Stability.
          </h1>

          <p className="mt-5 md:mt-6 text-[0.96rem] md:text-lg text-foreground/85 max-w-xl leading-relaxed">
            I help Arizona retirees and pre-retirees reposition assets into structured income
            <br className="hidden sm:block" />
            strategies designed to reduce unnecessary market exposure and support long-term financial clarity.
          </p>

          <p className="mt-5 text-[10.5px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground leading-relaxed">
            Arizona Licensed • Products Offered Through Bankers Life • Private Consultations
          </p>

          <div className="mt-7 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 md:px-7 py-3.5 text-sm md:text-base font-medium hover:bg-primary/90 transition-colors"
              data-clickable
            >
              Request a Confidential Review
            </a>
            <a
              href="#"
              className="inline-flex items-center text-sm md:text-base font-medium text-foreground/85 hover:text-primary transition-colors"
              data-clickable
            >
              Learn How the Process Works
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[390px] md:min-h-[460px] lg:min-h-[520px]">
          <motion.div
            className="absolute w-[230px] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_48px_-28px_rgba(0,0,0,0.5)] border border-border/70"
            style={{ rotate: rotate1, x: x1, y, zIndex: 1 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={images[0] || "/placeholder.svg"}
              alt="Arizona advisory office exterior"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="relative w-[265px] md:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_64px_-26px_rgba(0,0,0,0.55)] border border-border"
            style={{ rotate: rotate2, y, zIndex: 2 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={images[1] || "/placeholder.svg"}
              alt="Jason Mashburn portrait"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            className="absolute w-[230px] md:w-[280px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_48px_-28px_rgba(0,0,0,0.5)] border border-border/70"
            style={{ rotate: rotate3, x: x3, y, zIndex: 1 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <img
              src={images[2] || "/placeholder.svg"}
              alt="Private consultation boardroom"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <motion.div
          className="w-6 h-10 rounded-full border-2 border-foreground/30 flex items-start justify-center p-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
        >
          <div className="w-1 h-2 rounded-full bg-foreground/50" />
        </motion.div>
      </motion.div>
    </section>
  )
}
