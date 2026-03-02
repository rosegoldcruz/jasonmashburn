"use client"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"
import { duration, easing, sectionReveal } from "@/motion/tokens"

const YEARS = ["Year 1", "Year 5", "Year 10", "Year 15", "Year 20", "Year 25", "Year 30"]

const DATA_STRUCTURED = [
  { ss: 28, structured: 40, market: 32 },
  { ss: 30, structured: 38, market: 32 },
  { ss: 32, structured: 36, market: 32 },
  { ss: 32, structured: 38, market: 30 },
  { ss: 34, structured: 36, market: 30 },
  { ss: 34, structured: 38, market: 28 },
  { ss: 36, structured: 38, market: 26 },
]

const DATA_MARKET_ONLY = [
  { ss: 28, structured: 0, market: 72 },
  { ss: 30, structured: 0, market: 70 },
  { ss: 32, structured: 0, market: 68 },
  { ss: 32, structured: 0, market: 52 },
  { ss: 34, structured: 0, market: 58 },
  { ss: 34, structured: 0, market: 40 },
  { ss: 36, structured: 0, market: 34 },
]

function BarGroup({
  year,
  ss,
  structured,
  market,
  index,
  inView,
  maxHeight,
}: {
  year: string
  ss: number
  structured: number
  market: number
  index: number
  inView: boolean
  maxHeight: number
}) {
  const total = ss + structured + market
  const ssH = (ss / 100) * maxHeight
  const structuredH = (structured / 100) * maxHeight
  const marketH = (market / 100) * maxHeight
  const barWidth = 32
  const gap = 2

  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={barWidth} height={maxHeight + 4} className="overflow-visible">
        {/* Market Assets (top) */}
        <motion.rect
          x={0}
          width={barWidth}
          rx={3}
          fill="rgb(120 172 240 / 0.35)"
          initial={{ height: 0, y: maxHeight }}
          animate={
            inView
              ? { height: marketH, y: maxHeight - marketH - structuredH - ssH }
              : {}
          }
          transition={{
            duration: 0.75,
            delay: 0.2 + index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Structured Income (middle) */}
        <motion.rect
          x={0}
          width={barWidth}
          rx={3}
          fill="rgb(201 168 76 / 0.7)"
          initial={{ height: 0, y: maxHeight }}
          animate={
            inView
              ? { height: structuredH, y: maxHeight - structuredH - ssH }
              : {}
          }
          transition={{
            duration: 0.75,
            delay: 0.1 + index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
        {/* Social Security (bottom) */}
        <motion.rect
          x={0}
          width={barWidth}
          rx={3}
          fill="rgb(255 255 255 / 0.15)"
          initial={{ height: 0, y: maxHeight }}
          animate={inView ? { height: ssH, y: maxHeight - ssH } : {}}
          transition={{
            duration: 0.75,
            delay: index * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </svg>
      <span className="text-[10px] text-muted-foreground/50">{year}</span>
    </div>
  )
}

export function IncomeModelVisualization() {
  const profile = useAdaptiveMotion()
  const [mode, setMode] = useState<"structured" | "market">("structured")
  const chartRef = useRef<HTMLDivElement>(null)
  const inView = useInView(chartRef, { once: false, amount: 0.3 })

  const data = mode === "structured" ? DATA_STRUCTURED : DATA_MARKET_ONLY
  const maxHeight = 180

  return (
    <section className="py-24">
      <div className="container-shell">
        <motion.div
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={{
            duration: duration.base * profile.motionDurationScale,
            ease: easing.easeOut,
          }}
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Income Architecture
          </p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">
            How Structured Income Changes the Equation
          </h2>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            Compare a market-dependent withdrawal strategy against a structured allocation
            that layers Social Security, protected income, and market assets.
          </p>
        </motion.div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
          {/* Chart */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{
              duration: duration.base * profile.motionDurationScale,
              ease: easing.easeOut,
            }}
            className="glass-panel rounded-2xl p-6 sm:p-8"
          >
            {/* Toggle */}
            <div className="mb-8 flex items-center gap-1 rounded-full bg-white/[0.06] p-1">
              <button
                onClick={() => setMode("structured")}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  mode === "structured"
                    ? "bg-accent/20 text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Structured Allocation
              </button>
              <button
                onClick={() => setMode("market")}
                className={`flex-1 rounded-full px-4 py-2 text-xs font-medium transition-all ${
                  mode === "market"
                    ? "bg-accent/20 text-accent"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Market-Only Strategy
              </button>
            </div>

            <div
              ref={chartRef}
              className="flex items-end justify-between gap-2 sm:gap-4"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={mode}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex w-full items-end justify-between gap-2 sm:gap-4"
                >
                  {data.map((d, i) => (
                    <BarGroup
                      key={`${mode}-${i}`}
                      year={YEARS[i]}
                      ss={d.ss}
                      structured={d.structured}
                      market={d.market}
                      index={i}
                      inView={inView}
                      maxHeight={maxHeight}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap gap-5">
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm bg-[rgb(255_255_255/0.15)]" />
                <span className="text-[11px] text-muted-foreground/60">Social Security</span>
              </div>
              {mode === "structured" && (
                <div className="flex items-center gap-2">
                  <div className="h-2.5 w-2.5 rounded-sm bg-[rgb(201_168_76/0.7)]" />
                  <span className="text-[11px] text-muted-foreground/60">Structured Income (Annuity / IUL)</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <div className="h-2.5 w-2.5 rounded-sm bg-[rgb(120_172_240/0.35)]" />
                <span className="text-[11px] text-muted-foreground/60">Market Assets</span>
              </div>
            </div>
          </motion.div>

          {/* Sidebar insight */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{
              duration: duration.base * profile.motionDurationScale,
              delay: 0.1,
              ease: easing.easeOut,
            }}
            className="space-y-4"
          >
            <div className="glass-panel rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent/80">
                {mode === "structured" ? "Volatility Compression" : "Volatility Exposure"}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {mode === "structured"
                  ? "A structured allocation layers protected income beneath market assets, reducing the impact of sequence risk on retirement cash flow."
                  : "A market-only strategy exposes 100% of retirement income to sequence risk. Early downturns can permanently impair portfolio longevity."}
              </p>
            </div>
            <div className="glass-panel rounded-2xl p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-accent/80">
                Key Difference
              </p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {mode === "structured"
                  ? "Defined income layers don't fluctuate with index performance — they provide a floor that market-dependent withdrawals cannot."
                  : "Without a protection floor, each market downturn forces either reduced spending or accelerated asset depletion."}
              </p>
            </div>
          </motion.div>
        </div>

        <p className="mt-6 text-[11px] text-muted-foreground/40">
          This visualization is conceptual and illustrative only. It does not represent any specific product, policy, or guaranteed outcome.
          Actual results depend on individual circumstances, carrier terms, and market conditions.
        </p>
      </div>
    </section>
  )
}
