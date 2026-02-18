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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background px-5 md:px-8 lg:px-10 py-16 md:py-20"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-x-0 top-0 h-[28vh] bg-gradient-to-b from-accent/10 to-transparent" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[92vw] max-w-6xl h-[36vh] rounded-[2.25rem] border border-border/70 bg-secondary/35" />
      </div>

      {/* Stacked images */}
      <div className="relative flex items-center justify-center w-full max-w-6xl">
        <motion.div
          className="absolute w-[250px] md:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_48px_-28px_rgba(0,0,0,0.5)] border border-border/70"
          style={{ rotate: rotate1, x: x1, y, zIndex: 1 }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[0] || "/placeholder.svg"}
            alt="Portfolio showcase 1"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="relative w-[290px] md:w-[360px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_30px_64px_-26px_rgba(0,0,0,0.55)] border border-border"
          style={{ rotate: rotate2, y, zIndex: 2 }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[1] || "/placeholder.svg"}
            alt="Portfolio showcase 2"
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          className="absolute w-[250px] md:w-[300px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_48px_-28px_rgba(0,0,0,0.5)] border border-border/70"
          style={{ rotate: rotate3, x: x3, y, zIndex: 1 }}
          initial={{ clipPath: "inset(100% 0 0 0)" }}
          animate={{ clipPath: "inset(0 0 0 0)" }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <img
            src={images[2] || "/placeholder.svg"}
            alt="Portfolio showcase 3"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h1 className="text-[3.05rem] md:text-[5.65rem] lg:text-[7.4rem] leading-[0.88] font-serif text-center text-foreground px-6">
          Your work, <em className="italic">curated</em>.
        </h1>
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
