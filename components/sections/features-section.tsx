"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

function TypeTester() {
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const interval = setInterval(() => {
      setScale((prev) => (prev === 1 ? 1.5 : 1))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center justify-center h-full">
      <motion.span
        className="font-serif text-6xl md:text-8xl text-foreground"
        animate={{ scale }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        Aa
      </motion.span>
    </div>
  )
}

function LayoutAnimation() {
  const [layout, setLayout] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setLayout((prev) => (prev + 1) % 3)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const layouts = ["grid-cols-2 grid-rows-2", "grid-cols-3 grid-rows-1", "grid-cols-1 grid-rows-3"]

  return (
    <div className="h-full p-4 flex items-center justify-center">
      <motion.div className={`grid ${layouts[layout]} gap-2 w-full max-w-[140px]`} layout>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="bg-primary/20 rounded-md min-h-[30px]"
            layout
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function SpeedIndicator() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timeout = setTimeout(() => setProgress(100), 500)
    return () => clearTimeout(timeout)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <span className="text-3xl md:text-4xl font-sans font-medium text-foreground">100ms</span>
      <span className="text-sm text-muted-foreground">Load Time</span>
      <div className="w-full max-w-[120px] h-1.5 bg-foreground/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>
    </div>
  )
}

export function FeaturesSection() {
  return (
    <section className="bg-background px-5 md:px-8 py-20 md:py-22">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.2em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          CORE STRATEGIES
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Typography Card */}
          <motion.div
            className="bg-secondary/80 rounded-2xl p-7 md:p-8 min-h-[265px] flex flex-col border border-border/80 shadow-[0_14px_32px_-24px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            transition={{ duration: 0.2 }}
            data-clickable
          >
            <div className="flex-1">
              <TypeTester />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-foreground">Fixed Income Planning</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Structured annuity strategies designed to provide defined income streams while reducing exposure to
                market swings.
              </p>
            </div>
          </motion.div>

          {/* Layouts Card */}
          <motion.div
            className="bg-secondary/80 rounded-2xl p-7 md:p-8 min-h-[265px] flex flex-col border border-border/80 shadow-[0_14px_32px_-24px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <LayoutAnimation />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-foreground">Asset Repositioning</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Strategic evaluation of 401(k)s and IRAs to determine whether a portion should be repositioned for
                income efficiency and principal protection where appropriate.
              </p>
            </div>
          </motion.div>

          {/* Speed Card */}
          <motion.div
            className="bg-secondary/80 rounded-2xl p-7 md:p-8 min-h-[265px] flex flex-col border border-border/80 shadow-[0_14px_32px_-24px_rgba(0,0,0,0.45)]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 0.98 }}
            whileTap={{ scale: 0.96 }}
            data-clickable
          >
            <div className="flex-1">
              <SpeedIndicator />
            </div>
            <div className="mt-4">
              <h3 className="font-serif text-2xl text-foreground">Legacy Alignment</h3>
              <p className="text-muted-foreground text-sm mt-2 leading-relaxed">
                Indexed life insurance strategies structured to support tax-aware wealth transfer and long-term
                planning objectives.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
