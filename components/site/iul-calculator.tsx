"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Calculator, ArrowRight, Lock, TrendingUp, Shield, DollarSign } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

function calculateProjection(
  annualPremium: number,
  years: number,
  currentAge: number
) {
  const floorRate = 0.0
  const avgCreditingRate = 0.065
  const costOfInsurance = 0.012
  const netRate = avgCreditingRate - costOfInsurance

  let cashValue = 0
  for (let y = 1; y <= years; y++) {
    cashValue = (cashValue + annualPremium) * (1 + netRate)
  }

  const annualIncome = cashValue * 0.05
  const deathBenefit = Math.max(cashValue * 1.4, annualPremium * years * 1.5)
  const retirementAge = currentAge + years

  return {
    projectedCashValue: Math.round(cashValue),
    estimatedAnnualIncome: Math.round(annualIncome),
    estimatedDeathBenefit: Math.round(deathBenefit),
    retirementAge,
    totalPremiums: annualPremium * years,
  }
}

export function IulCalculator() {
  const profile = useAdaptiveMotion()
  const [currentAge, setCurrentAge] = useState(45)
  const [annualPremium, setAnnualPremium] = useState(24000)
  const [fundingYears, setFundingYears] = useState(20)
  const [showResults, setShowResults] = useState(false)
  const [showGate, setShowGate] = useState(false)
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [unlocked, setUnlocked] = useState(false)

  const projection = calculateProjection(annualPremium, fundingYears, currentAge)

  function handleCalculate() {
    setShowResults(true)
    if (!unlocked) {
      setShowGate(true)
    }
  }

  function handleUnlock(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim() && name.trim()) {
      setUnlocked(true)
      setShowGate(false)
    }
  }

  return (
    <section className="py-24" id="calculator">
      <div className="container-shell">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Interactive Tool
            </p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">
              IUL Retirement Income Explorer
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Adjust the sliders below to see a conceptual projection of how
              structured IUL funding could support tax-advantaged retirement
              income. These are illustrative estimates only — not guarantees.
            </p>

            <div className="mt-8 space-y-7">
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-foreground">Current Age</Label>
                  <span className="text-sm font-semibold text-accent">{currentAge}</span>
                </div>
                <Slider
                  value={[currentAge]}
                  onValueChange={([v]) => {
                    setCurrentAge(v)
                    setShowResults(false)
                  }}
                  min={25}
                  max={60}
                  step={1}
                  className="mt-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-foreground">Annual Premium</Label>
                  <span className="text-sm font-semibold text-accent">
                    {formatCurrency(annualPremium)}
                  </span>
                </div>
                <Slider
                  value={[annualPremium]}
                  onValueChange={([v]) => {
                    setAnnualPremium(v)
                    setShowResults(false)
                  }}
                  min={6000}
                  max={100000}
                  step={1000}
                  className="mt-3"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-foreground">Funding Years</Label>
                  <span className="text-sm font-semibold text-accent">{fundingYears} years</span>
                </div>
                <Slider
                  value={[fundingYears]}
                  onValueChange={([v]) => {
                    setFundingYears(v)
                    setShowResults(false)
                  }}
                  min={5}
                  max={35}
                  step={1}
                  className="mt-3"
                />
              </div>

              <Button
                onClick={handleCalculate}
                className="h-11 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Calculator className="mr-2 h-4 w-4" />
                See Projected Results
              </Button>
            </div>
          </div>

          <div className="glass-panel relative overflow-hidden rounded-2xl p-7">
            <AnimatePresence mode="wait">
              {!showResults ? (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex min-h-[380px] flex-col items-center justify-center text-center"
                >
                  <Calculator className="mb-4 h-12 w-12 text-muted-foreground/40" />
                  <p className="text-lg font-medium text-muted-foreground/60">
                    Adjust the sliders and click calculate to see your projection
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.4 * profile.motionDurationScale }}
                  className="min-h-[380px]"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    Conceptual Projection
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Income begins at age {projection.retirementAge}
                  </p>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/5 p-5">
                      <TrendingUp className="mb-2 h-5 w-5 text-accent" />
                      <p className="text-xs text-muted-foreground">Projected Cash Value</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {unlocked
                          ? formatCurrency(projection.projectedCashValue)
                          : "••••••"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-5">
                      <DollarSign className="mb-2 h-5 w-5 text-accent" />
                      <p className="text-xs text-muted-foreground">Est. Annual Income</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {unlocked
                          ? formatCurrency(projection.estimatedAnnualIncome)
                          : "••••••"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-5">
                      <Shield className="mb-2 h-5 w-5 text-accent" />
                      <p className="text-xs text-muted-foreground">Est. Death Benefit</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {unlocked
                          ? formatCurrency(projection.estimatedDeathBenefit)
                          : "••••••"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/5 p-5">
                      <Calculator className="mb-2 h-5 w-5 text-accent" />
                      <p className="text-xs text-muted-foreground">Total Premiums Paid</p>
                      <p className="mt-1 text-2xl font-semibold text-foreground">
                        {formatCurrency(projection.totalPremiums)}
                      </p>
                    </div>
                  </div>

                  {!unlocked && (
                    <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-5">
                      <div className="flex items-center gap-2">
                        <Lock className="h-4 w-4 text-accent" />
                        <p className="text-sm font-semibold text-foreground">
                          Unlock Your Full Projection
                        </p>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Enter your name and email to see the detailed results and
                        receive a personalized IUL planning guide.
                      </p>
                      <form onSubmit={handleUnlock} className="mt-4 space-y-3">
                        <Input
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="h-10 rounded-lg border-white/15 bg-white/5 text-sm"
                        />
                        <Input
                          type="email"
                          placeholder="Your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="h-10 rounded-lg border-white/15 bg-white/5 text-sm"
                        />
                        <Button
                          type="submit"
                          className="h-10 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
                        >
                          Unlock Results
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </form>
                    </div>
                  )}

                  <p className="mt-5 text-[11px] leading-relaxed text-muted-foreground/60">
                    This projection is illustrative only and based on hypothetical
                    assumptions including a 6.5% average crediting rate, 1.2% cost
                    of insurance, and 5% withdrawal rate. Actual results will vary
                    based on carrier terms, caps, participation rates, and policy
                    design. Not a guarantee of future performance.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
