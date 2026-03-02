"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ShieldCheck, TrendingDown, BarChart3, Activity } from "lucide-react"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"
import { duration, easing, stagger, sectionReveal } from "@/motion/tokens"

function useCountUp(end: number, decimals = 0, suffix = "", prefix = "", durationMs = 1400) {
  const [value, setValue] = useState(prefix + (0).toFixed(decimals) + suffix)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    const tick = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = eased * end
      setValue(prefix + current.toFixed(decimals) + suffix)
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, end, decimals, suffix, prefix, durationMs])

  return { ref, value }
}

function ProtectionFloorToggle() {
  const [showProtected, setShowProtected] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!inView) return
    const timer = setTimeout(() => setShowProtected(true), 1800)
    return () => clearTimeout(timer)
  }, [inView])

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70">Market Year</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-1 text-2xl font-semibold text-red-400"
          >
            −18%
          </motion.p>
        </div>
        <div className="h-12 w-px bg-white/10" />
        <div className="flex-1 text-right">
          <p className="text-[11px] uppercase tracking-wider text-muted-foreground/70">Indexed Floor</p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-1 text-2xl font-semibold text-accent"
          >
            0%
          </motion.p>
        </div>
      </div>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="h-1 w-full origin-left rounded-full bg-gradient-to-r from-red-400/60 via-white/10 to-accent/80"
      />
      <p className="text-[11px] text-muted-foreground/60">
        {showProtected ? "Floor protection limits downside crediting" : "Comparing market loss vs indexed policy floor"}
      </p>
    </div>
  )
}

function IncomeDurabilityMeter() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const percentage = 72

  const circumference = 2 * Math.PI * 54
  const offset = circumference - (percentage / 100) * circumference

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative h-32 w-32">
        <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
          <circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="rgb(255 255 255 / 0.06)"
            strokeWidth="8"
          />
          <motion.circle
            cx="60" cy="60" r="54"
            fill="none"
            stroke="url(#durabilityGradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={inView ? { strokeDashoffset: offset } : {}}
            transition={{ duration: 1.6, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          />
          <defs>
            <linearGradient id="durabilityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(201 168 76)" />
              <stop offset="100%" stopColor="rgb(201 168 76 / 0.4)" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.0 }}
            className="text-2xl font-semibold text-foreground"
          >
            {percentage}%
          </motion.span>
          <span className="text-[10px] text-muted-foreground/60">Defined</span>
        </div>
      </div>
      <p className="text-center text-[11px] leading-snug text-muted-foreground/60">
        Defined Income vs.<br />Market-Dependent Income
      </p>
    </div>
  )
}

export function RetirementRiskDashboard() {
  const profile = useAdaptiveMotion()

  const iraAssets = useCountUp(2.3, 1, "T+", "$", 1400)
  const sequenceRisk = useCountUp(34, 0, "%", "", 1200)

  return (
    <section className="relative overflow-hidden py-20">
      <div className="absolute inset-0 bg-gradient-to-b from-[rgb(6_14_28)] via-[rgb(8_19_36)] to-[rgb(10_22_40)]" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(rgb(201 168 76 / 0.3) 0.5px, transparent 0.5px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-shell relative z-10">
        <motion.div
          initial={sectionReveal.initial}
          whileInView={sectionReveal.whileInView}
          viewport={sectionReveal.viewport}
          transition={{ duration: duration.base * profile.motionDurationScale, ease: easing.easeOut }}
          className="mb-12 max-w-2xl"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Retirement Risk Intelligence</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">The Numbers Behind the Urgency</h2>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {/* Metric 1: IRA Assets */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{ duration: duration.base * profile.motionDurationScale, delay: 0 * stagger.children, ease: easing.easeOut }}
            className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <BarChart3 className="h-5 w-5 text-accent/80" />
            </div>
            <div ref={iraAssets.ref}>
              <p className="text-3xl font-semibold tracking-tight text-foreground">{iraAssets.value}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              IRA assets approaching the distribution phase nationwide
            </p>
          </motion.div>

          {/* Metric 2: Sequence Risk */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{ duration: duration.base * profile.motionDurationScale, delay: 1 * stagger.children, ease: easing.easeOut }}
            className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <TrendingDown className="h-5 w-5 text-accent/80" />
            </div>
            <div ref={sequenceRisk.ref}>
              <p className="text-3xl font-semibold tracking-tight text-foreground">{sequenceRisk.value}</p>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground/70">
              Average portfolio impact from early retirement volatility
            </p>
          </motion.div>

          {/* Metric 3: Protection Floor */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{ duration: duration.base * profile.motionDurationScale, delay: 2 * stagger.children, ease: easing.easeOut }}
            className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <ShieldCheck className="h-5 w-5 text-accent/80" />
            </div>
            <ProtectionFloorToggle />
          </motion.div>

          {/* Metric 4: Income Durability */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{ duration: duration.base * profile.motionDurationScale, delay: 3 * stagger.children, ease: easing.easeOut }}
            className="rounded-2xl border border-white/8 bg-white/[0.04] p-6 backdrop-blur-sm"
          >
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10">
              <Activity className="h-5 w-5 text-accent/80" />
            </div>
            <IncomeDurabilityMeter />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
