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
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#FDFBF7] px-5 md:px-8 lg:px-10 py-10 md:py-14"
    >
      {/* Subtle Grain Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      
      <div className="absolute inset-0 pointer-events-none flex justify-center items-center">
        {/* Radial Charcoal Fade behind Jason */}
        <div className="absolute w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-radial from-slate-800/5 to-transparent blur-3xl opacity-70 translate-x-[20%] translate-y-[10%]" />
      </div>

      <motion.div
        className="relative z-10 w-full max-w-7xl grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 lg:gap-8 items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <div className="max-w-2xl">
          <p className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-muted-foreground/80 font-light mb-3 md:mb-4">
            Why Structure Matters
          </p>

          <h1 className="text-[clamp(1.1rem,4.8vw,5.7rem)] whitespace-nowrap md:whitespace-normal tracking-[-0.02em] md:tracking-normal leading-[0.85] font-serif text-foreground font-semibold relative inline-block">
            Retirement Is No Longer Passive.
            <div className="absolute -bottom-2 md:-bottom-4 left-0 w-1/3 h-[1px] bg-slate-400/40"></div>
          </h1>

          <p className="mt-4 md:mt-6 text-[0.96rem] md:text-lg text-foreground/85 w-[90%] md:w-full max-w-xl leading-[1.7] md:leading-[1.8]">
            I help Arizona retirees and pre-retirees reposition assets into structured income strategies designed to reduce unnecessary market exposure and support long-term financial clarity.
          </p>

          <p className="mt-5 text-[10.5px] md:text-xs uppercase tracking-[0.14em] text-muted-foreground leading-relaxed">
            Arizona Licensed • Products Offered Through Bankers Life • Private Consultations
          </p>

          <div className="mt-6 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5">
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 text-white px-6 md:px-7 py-4 text-sm md:text-base font-semibold shadow-md hover:bg-slate-800 transition-colors"
              data-clickable
            >
              Request a Confidential Review
            </a>
            <a
              href="#"
              className="inline-flex items-center text-sm md:text-base font-medium text-foreground/70 hover:text-slate-900 transition-colors"
              data-clickable
            >
              Learn How the Process Works
            </a>
          </div>
        </div>

        <div className="relative flex items-center justify-center min-h-[390px] md:min-h-[460px] lg:min-h-[520px]">
          <motion.div
            className="absolute w-[170px] md:w-[220px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_48px_-28px_rgba(0,0,0,0.4)] border border-border/40 opacity-90 translate-y-6 md:translate-y-8"
            style={{ rotate: rotate1, x: x1, y, zIndex: 1 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 rounded-2xl pointer-events-none"></div>
            <img
              src={images[0] || "/placeholder.svg"}
              alt="Arizona advisory office exterior"
              className="w-full h-full object-cover saturate-[0.9]"
            />
          </motion.div>

          <motion.div
            className="relative w-[265px] md:w-[340px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)] border border-border"
            style={{ rotate: rotate2, y, zIndex: 10 }}
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
            className="absolute w-[170px] md:w-[220px] aspect-[3/4] rounded-2xl overflow-hidden shadow-[0_24px_48px_-28px_rgba(0,0,0,0.4)] border border-border/40 opacity-90 translate-y-6 md:translate-y-8"
            style={{ rotate: rotate3, x: x3, y, zIndex: 1 }}
            initial={{ clipPath: "inset(100% 0 0 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.1)] z-10 rounded-2xl pointer-events-none"></div>
            <img
              src={images[2] || "/placeholder.svg"}
              alt="Private consultation boardroom"
              className="w-full h-full object-cover saturate-[0.9]"
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
