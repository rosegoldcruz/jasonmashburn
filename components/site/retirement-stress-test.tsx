"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, ArrowLeft, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"
import { duration, easing, sectionReveal } from "@/motion/tokens"

const CONCERNS = [
  { id: "volatility", label: "Market volatility" },
  { id: "longevity", label: "Longevity risk" },
  { id: "tax", label: "Tax exposure" },
  { id: "healthcare", label: "Healthcare costs" },
] as const

function formatCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  return `$${(value / 1_000).toFixed(0)}K`
}

export function RetirementStressTest() {
  const profile = useAdaptiveMotion()
  const [step, setStep] = useState(1)
  const [balance, setBalance] = useState(500_000)
  const [yearsToRetirement, setYearsToRetirement] = useState(10)
  const [monthlyIncome, setMonthlyIncome] = useState("")
  const [concerns, setConcerns] = useState<Set<string>>(new Set())
  const [submitted, setSubmitted] = useState(false)

  const totalSteps = 4
  const progress = (step / totalSteps) * 100

  function toggleConcern(id: string) {
    setConcerns((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleNext() {
    if (step < totalSteps) setStep(step + 1)
    else setSubmitted(true)
  }

  function handleBack() {
    if (step > 1) setStep(step - 1)
  }

  const canAdvance =
    step === 1 ||
    step === 2 ||
    (step === 3 && monthlyIncome.trim() !== "") ||
    (step === 4 && concerns.size > 0)

  const stepVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
  }

  return (
    <section className="py-24" id="stress-test">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          {/* Left — Header */}
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
              Diagnostic Tool
            </p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">
              Retirement Income Stress Test
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Answer four quick questions to assess whether your current retirement
              trajectory supports defined, durable income — or leaves you exposed
              to market-dependent guesswork.
            </p>

            {!submitted && (
              <div className="mt-8">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Step {step} of {totalSteps}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                  <motion.div
                    className="h-full rounded-full bg-accent/70"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>
            )}
          </motion.div>

          {/* Right — Interactive Panel */}
          <motion.div
            initial={sectionReveal.initial}
            whileInView={sectionReveal.whileInView}
            viewport={sectionReveal.viewport}
            transition={{
              duration: duration.base * profile.motionDurationScale,
              delay: 0.08,
              ease: easing.easeOut,
            }}
            className="glass-panel relative overflow-hidden rounded-2xl p-7"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="result"
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="flex min-h-[340px] flex-col items-center justify-center text-center"
                >
                  <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                    <CheckCircle2 className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="text-2xl font-semibold text-primary">Assessment Complete</h3>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    Based on your inputs, a structured income review may help define
                    protection and income durability for your retirement timeline.
                  </p>

                  <div className="mt-6 grid w-full max-w-sm grid-cols-2 gap-3 text-left">
                    <div className="rounded-xl bg-white/[0.05] p-4">
                      <p className="text-[11px] text-muted-foreground/60">Current Assets</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">{formatCurrency(balance)}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.05] p-4">
                      <p className="text-[11px] text-muted-foreground/60">Years to Retirement</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">{yearsToRetirement}</p>
                    </div>
                    <div className="rounded-xl bg-white/[0.05] p-4">
                      <p className="text-[11px] text-muted-foreground/60">Monthly Target</p>
                      <p className="mt-1 text-lg font-semibold text-foreground">
                        ${Number(monthlyIncome).toLocaleString() || "—"}
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/[0.05] p-4">
                      <p className="text-[11px] text-muted-foreground/60">Top Concerns</p>
                      <p className="mt-1 text-sm font-medium text-foreground">
                        {CONCERNS.filter((c) => concerns.has(c.id))
                          .map((c) => c.label)
                          .join(", ") || "—"}
                      </p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="mt-8 h-11 rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90"
                  >
                    <Link href="/apply">Schedule Structured Review</Link>
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key={`step-${step}`}
                  variants={stepVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="min-h-[340px]"
                >
                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-foreground">
                          Current IRA / 401(k) Balance
                        </Label>
                        <p className="mt-1 text-[11px] text-muted-foreground/60">
                          Approximate total across retirement accounts
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">$100K</span>
                        <span className="text-2xl font-semibold text-accent">
                          {formatCurrency(balance)}
                        </span>
                        <span className="text-xs text-muted-foreground">$5M+</span>
                      </div>
                      <Slider
                        value={[balance]}
                        onValueChange={([v]) => setBalance(v)}
                        min={100_000}
                        max={5_000_000}
                        step={25_000}
                      />
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-foreground">
                          Years Until Retirement
                        </Label>
                        <p className="mt-1 text-[11px] text-muted-foreground/60">
                          How far out is your target retirement date?
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">1 yr</span>
                        <span className="text-2xl font-semibold text-accent">
                          {yearsToRetirement} years
                        </span>
                        <span className="text-xs text-muted-foreground">30 yrs</span>
                      </div>
                      <Slider
                        value={[yearsToRetirement]}
                        onValueChange={([v]) => setYearsToRetirement(v)}
                        min={1}
                        max={30}
                        step={1}
                      />
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-foreground">
                          Desired Monthly Retirement Income
                        </Label>
                        <p className="mt-1 text-[11px] text-muted-foreground/60">
                          What monthly income do you need in retirement?
                        </p>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
                          $
                        </span>
                        <Input
                          type="number"
                          placeholder="8,000"
                          value={monthlyIncome}
                          onChange={(e) => setMonthlyIncome(e.target.value)}
                          className="h-12 rounded-xl border-white/10 bg-white/[0.04] pl-8 text-lg text-foreground"
                        />
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-6">
                      <div>
                        <Label className="text-sm text-foreground">
                          Primary Concerns
                        </Label>
                        <p className="mt-1 text-[11px] text-muted-foreground/60">
                          Select all that apply
                        </p>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {CONCERNS.map((concern) => (
                          <button
                            key={concern.id}
                            type="button"
                            onClick={() => toggleConcern(concern.id)}
                            className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition-all ${
                              concerns.has(concern.id)
                                ? "border-accent/40 bg-accent/10 text-foreground"
                                : "border-white/8 bg-white/[0.03] text-muted-foreground hover:border-white/15 hover:bg-white/[0.06]"
                            }`}
                          >
                            <div
                              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors ${
                                concerns.has(concern.id)
                                  ? "border-accent bg-accent"
                                  : "border-white/20 bg-transparent"
                              }`}
                            >
                              {concerns.has(concern.id) && (
                                <svg viewBox="0 0 12 12" className="h-3 w-3 text-accent-foreground">
                                  <path
                                    d="M2.5 6L5 8.5L9.5 3.5"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              )}
                            </div>
                            {concern.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Navigation */}
                  <div className="mt-8 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ArrowLeft className="h-4 w-4" />
                        Back
                      </button>
                    ) : (
                      <div />
                    )}
                    <Button
                      onClick={handleNext}
                      disabled={!canAdvance}
                      className="h-10 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
                    >
                      {step === totalSteps ? "See Results" : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
