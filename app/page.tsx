"use client"

import Link from "next/link"
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react"
import { animate, motion, useInView, useMotionValue, useTransform } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Slider } from "@/components/ui/slider"
import { TrustBadges } from "@/components/site/trust-badges"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

type DecisionProfile = {
  id: string
  title: string
  detail: string
}

type ConcernKey = "volatility" | "longevity" | "tax" | "healthcare"

const decisionProfiles: DecisionProfile[] = [
  {
    id: "business-owner",
    title: "Business Owner With 401(k)",
    detail: "Coordinate rollover timing, tax exposure, and dependable retirement income layers.",
  },
  {
    id: "pre-retiree",
    title: "Pre-Retiree 5-10 Years Out",
    detail: "Transition from accumulation to defined distribution before sequence risk compounds.",
  },
  {
    id: "income-stability",
    title: "Retiree Concerned About Income Stability",
    detail: "Stabilize monthly cash flow and reduce reliance on volatile drawdowns.",
  },
]

const concernLabels: Record<ConcernKey, string> = {
  volatility: "Market volatility",
  longevity: "Longevity risk",
  tax: "Tax exposure",
  healthcare: "Healthcare costs",
}

function AnimatedCounter({
  value,
  formatter,
  className,
}: {
  value: number
  formatter: (value: number) => string
  className?: string
}) {
  const ref = useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.7 })
  const count = useMotionValue(0)
  const text = useTransform(count, (latest) => formatter(latest))

  useEffect(() => {
    if (!inView) return

    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" })
    return () => controls.stop()
  }, [count, inView, value])

  return <motion.span ref={ref} className={className}>{text}</motion.span>
}

function MetricCard({
  title,
  value,
  caption,
  formatter,
}: {
  title: string
  value: number
  caption: string
  formatter: (value: number) => string
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55 }}
      className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(17,28,48,0.88),rgba(6,13,24,0.92))] p-6"
    >
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b9c6dc]">{title}</p>
      <AnimatedCounter value={value} formatter={formatter} className="mt-3 block text-3xl font-semibold text-[#f2d7a1]" />
      <p className="mt-2 text-xs text-[#9aa8bf]">{caption}</p>
    </motion.article>
  )
}

function DecisionGateCard({ item }: { item: DecisionProfile }) {
  const handleClick = () => {
    document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.45 }}
      className="group w-full rounded-2xl border border-white/10 bg-[linear-gradient(165deg,rgba(16,26,44,0.75),rgba(7,12,22,0.9))] p-7 text-left"
    >
      <p className="text-2xl leading-tight text-[#edf3ff]">{item.title}</p>
      <p className="mt-3 text-sm leading-relaxed text-[#9fb0ca]">{item.detail}</p>
      <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#f2d7a1]">
        View your planning path
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </motion.button>
  )
}

export default function Home() {
  const profile = useAdaptiveMotion()
  const [incomeMode, setIncomeMode] = useState<"market" | "structured">("structured")
  const [retirementBalance, setRetirementBalance] = useState(950000)
  const [yearsToRetirement, setYearsToRetirement] = useState(8)
  const [monthlyIncome, setMonthlyIncome] = useState("12000")
  const [concerns, setConcerns] = useState<Record<ConcernKey, boolean>>({
    volatility: true,
    longevity: false,
    tax: false,
    healthcare: false,
  })

  const selectedConcerns = useMemo(
    () => Object.entries(concerns).filter(([, checked]) => checked).map(([key]) => concernLabels[key as ConcernKey]),
    [concerns],
  )

  const stepCompletion = useMemo(() => {
    const hasBalance = retirementBalance > 0
    const hasYears = yearsToRetirement > 0
    const hasIncome = Number(monthlyIncome.replace(/[^\d]/g, "")) > 0
    const hasConcern = selectedConcerns.length > 0

    return [hasBalance, hasYears, hasIncome, hasConcern].filter(Boolean).length
  }, [monthlyIncome, retirementBalance, selectedConcerns.length, yearsToRetirement])

  const completionPercent = (stepCompletion / 4) * 100

  const marketLine = incomeMode === "structured" ? "56%" : "84%"
  const structuredLine = incomeMode === "structured" ? "72%" : "42%"

  const formatCurrencyCompact = (value: number) => {
    if (value >= 1_000_000_000_000) {
      return `$${(value / 1_000_000_000_000).toFixed(1)}T+`
    }
    if (value >= 1_000_000_000) {
      return `$${(value / 1_000_000_000).toFixed(1)}B+`
    }
    return `$${Math.round(value).toLocaleString()}`
  }

  const planningAnchors: Array<{ id: string; heading: string; copy: string; bullets: string[]; cta: ReactNode }> = [
    {
      id: "business-owner",
      heading: "Business Owner Distribution Strategy",
      copy: "Build a rollover-aware income framework that protects cash flow through market cycles while preserving optionality.",
      bullets: [
        "Coordinate exit timing with tax-aware distribution sequencing",
        "Define protected income floors before elective withdrawals",
      ],
      cta: <Link href="#stress-test" className="text-sm font-medium text-[#f2d7a1] hover:text-[#ffe8bd]">Run a business-owner stress test</Link>,
    },
    {
      id: "pre-retiree",
      heading: "5-10 Year Pre-Retirement Buildout",
      copy: "Transition from growth-only positioning to an engineered income map with explicit durability checkpoints.",
      bullets: [
        "Model sequence-risk sensitivity before retirement date",
        "Layer principal-protection tools around target income start",
      ],
      cta: <Link href="#stress-test" className="text-sm font-medium text-[#f2d7a1] hover:text-[#ffe8bd]">Build my pre-retirement map</Link>,
    },
    {
      id: "income-stability",
      heading: "Retiree Income Stability Framework",
      copy: "Reduce drawdown pressure by balancing guaranteed and market-dependent income sources within one review process.",
      bullets: [
        "Stabilize monthly income against market volatility",
        "Protect retirement assets from healthcare and longevity drift",
      ],
      cta: <Link href="#stress-test" className="text-sm font-medium text-[#f2d7a1] hover:text-[#ffe8bd]">Evaluate income stability options</Link>,
    },
  ]

  return (
    <main className="bg-[radial-gradient(circle_at_10%_10%,rgba(26,42,67,0.7),transparent_40%),radial-gradient(circle_at_85%_20%,rgba(197,163,94,0.13),transparent_36%),linear-gradient(180deg,#060b14_0%,#091325_42%,#07101d_100%)] pt-20 text-[#e5ecf8]">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 opacity-40">
          <div className="absolute left-[-10rem] top-[-7rem] h-80 w-80 rounded-full bg-[#8da8ce]/20 blur-3xl" />
          <div className="absolute right-[-7rem] top-[10rem] h-72 w-72 rounded-full bg-[#d5b57c]/14 blur-3xl" />
        </div>

        <div className="container-shell relative z-10 py-24 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.68 * profile.motionDurationScale }}
            className="max-w-5xl"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#9fb0ca]">Scottsdale Retirement Income Planning</p>
            <h1 className="mt-4 text-4xl leading-tight text-[#f5f7fb] sm:text-6xl">
              Are You 5-10 Years From Retirement and Unsure How Your Income Will Actually Work?
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-[#b8c5d9] sm:text-lg">
              Jason Mashburn designs protection-first retirement income structures for Arizona business owners and pre-retirees who
              want defined income, not market guesswork.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full bg-[#d8b67d] px-8 text-[#161820] hover:bg-[#e4c48d]">
                <Link href="#stress-test" data-major-cta>Run Your Retirement Income Stress Test</Link>
              </Button>
              <Link href="/how-it-works" className="text-sm font-medium text-[#d8e4f6] underline-offset-4 hover:text-white hover:underline">
                See How Structured Income Planning Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <TrustBadges />

      <section className="py-24">
        <div className="container-shell">
          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(150deg,rgba(10,19,34,0.95),rgba(6,10,19,0.97))] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9fb0ca]">Retirement Risk Dashboard</p>
            <h2 className="mt-3 text-3xl text-[#eef3fb] sm:text-5xl">Income Pressure Signals You Can Quantify</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#9eb0c8]">
              A planning-first command view to assess distribution risk, protection floors, and income durability before retirement begins.
            </p>

            <div className="mt-10 grid gap-5 lg:grid-cols-2">
              <MetricCard
                title="IRA Assets Approaching Distribution"
                value={2_300_000_000_000}
                formatter={formatCurrencyCompact}
                caption="Assets entering retirement income phase"
              />
              <MetricCard
                title="Sequence Risk Impact"
                value={31}
                formatter={(value) => `${Math.round(value)}%`}
                caption="Average portfolio impact from early retirement volatility"
              />
            </div>

            <div className="mt-5 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(16,27,44,0.86),rgba(7,12,21,0.9))] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b9c6dc]">Protection Floor Concept</p>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, x: -14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="rounded-xl border border-[#5f6d84] bg-[#121b2d] p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-[#9eabc1]">Market Year</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f28b8b]">-18%</p>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: 14 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="rounded-xl border border-[#6f6748] bg-[#181a21] p-5"
                  >
                    <p className="text-xs uppercase tracking-[0.14em] text-[#b8af93]">Indexed Policy Floor</p>
                    <p className="mt-2 text-3xl font-semibold text-[#f2d7a1]">0%</p>
                  </motion.div>
                </div>
              </motion.article>

              <motion.article
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.55 }}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(14,23,38,0.85),rgba(7,12,21,0.9))] p-6"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#b9c6dc]">Income Durability Meter</p>
                <div className="mt-5 flex items-center justify-center">
                  <div className="relative h-40 w-40">
                    <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                      <circle cx="60" cy="60" r="44" stroke="rgba(138,154,179,0.24)" strokeWidth="11" fill="none" />
                      <motion.circle
                        cx="60"
                        cy="60"
                        r="44"
                        stroke="#d8b67d"
                        strokeWidth="11"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: incomeMode === "structured" ? 0.78 : 0.46 }}
                        viewport={{ once: false, amount: 0.6 }}
                        transition={{ duration: 0.8 * profile.motionDurationScale }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <p className="text-3xl font-semibold text-[#f2d7a1]">{incomeMode === "structured" ? "78%" : "46%"}</p>
                      <p className="text-[11px] uppercase tracking-[0.14em] text-[#9fb0ca]">Durability Score</p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-[#9fb0ca]">Defined Income vs. Market-Dependent Income</p>
              </motion.article>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9fb0ca]">Who This Is For</p>
          <h2 className="mt-3 text-3xl text-[#edf3ff] sm:text-5xl">Choose Your Retirement Decision Path</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {decisionProfiles.map((item) => (
              <DecisionGateCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <div className="rounded-3xl border border-white/10 bg-[linear-gradient(160deg,rgba(11,19,34,0.86),rgba(7,12,21,0.92))] p-8 sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ca]">Income Model Visualization</p>
            <h2 className="mt-3 text-3xl text-[#edf3ff] sm:text-5xl">Retirement Income Layer Graph</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#a8b8cf]">
              Compare a market-only withdrawal approach against a structured allocation model designed to compress volatility and
              improve income durability.
            </p>

            <div className="mt-8 flex gap-3">
              {[
                { key: "market", label: "Market-Only Strategy" },
                { key: "structured", label: "Structured Allocation" },
              ].map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setIncomeMode(option.key as "market" | "structured")}
                  className={`rounded-full border px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                    incomeMode === option.key
                      ? "border-[#d8b67d] bg-[#d8b67d]/20 text-[#f2d7a1]"
                      : "border-white/15 bg-white/5 text-[#a5b5cb] hover:border-[#8ca1bf]"
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-white/10 bg-[#090f1b] p-6">
              <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
                <div className="relative h-64 rounded-xl border border-white/10 bg-[linear-gradient(180deg,rgba(20,30,47,0.45),rgba(9,15,27,0.96))] p-4">
                  <div className="absolute inset-x-4 top-4 h-px border-t border-dashed border-white/15" />
                  <div className="absolute inset-x-4 top-1/2 h-px border-t border-dashed border-white/15" />
                  <div className="absolute inset-x-4 bottom-4 h-px border-t border-dashed border-white/15" />

                  <motion.div
                    initial={{ width: "25%" }}
                    animate={{ width: marketLine }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute left-4 top-[32%] h-9 rounded-r-full bg-[#c97b7b]/70"
                  />
                  <motion.div
                    initial={{ width: "25%" }}
                    animate={{ width: structuredLine }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute left-4 top-[56%] h-9 rounded-r-full bg-[#d8b67d]/75"
                  />

                  <div className="absolute left-5 top-[12%] space-y-1 text-[11px] text-[#95a9c5]">
                    <p>Layer 1: Social Security</p>
                    <p>Layer 2: Structured Income (Annuity / IUL)</p>
                    <p>Layer 3: Market Assets</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-[linear-gradient(150deg,rgba(16,26,44,0.78),rgba(8,13,24,0.92))] p-6">
                  <p className="text-sm font-semibold text-[#edf3ff]">Volatility Compression Snapshot</p>
                  <div className="mt-5 space-y-4 text-sm text-[#a9b7cd]">
                    <div>
                      <p className="mb-2">Market-dependent withdrawal variation</p>
                      <Progress value={incomeMode === "structured" ? 62 : 84} className="h-2 bg-white/15" />
                    </div>
                    <div>
                      <p className="mb-2">Structured income stability score</p>
                      <Progress value={incomeMode === "structured" ? 78 : 49} className="h-2 bg-white/15" />
                    </div>
                    <p className="pt-2 text-xs leading-relaxed text-[#8fa2bf]">
                      Structured allocation scenarios illustrate how protected income layers may reduce reliance on selling market assets in
                      adverse years.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ca]">Personalized Planning Lanes</p>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {planningAnchors.map((lane) => (
              <motion.article
                id={lane.id}
                key={lane.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45 }}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(15,25,42,0.76),rgba(7,12,21,0.92))] p-7"
              >
                <h3 className="text-2xl text-[#edf3ff]">{lane.heading}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a8b7cc]">{lane.copy}</p>
                <ul className="mt-4 space-y-2 text-sm text-[#c3cedf]">
                  {lane.bullets.map((bullet) => (
                    <li key={bullet} className="flex gap-2">
                      <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[#d8b67d]" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">{lane.cta}</div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ca]">Structured Planning Process</p>
          <h2 className="mt-3 text-3xl text-[#edf3ff] sm:text-5xl">Three Institutional Planning Pillars</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              [
                "Diagnose Retirement Exposure",
                "Audit portfolio drawdown risk, tax posture, and income dependencies before any implementation decisions.",
              ],
              [
                "Engineer Income Structure",
                "Layer Social Security, protected income tools, and market assets into a defined distribution blueprint.",
              ],
              [
                "Monitor & Adjust Long-Term",
                "Review funding, distributions, and healthcare exposure to maintain income durability over time.",
              ],
            ].map(([title, copy], index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(150deg,rgba(13,22,38,0.86),rgba(8,12,22,0.9))] p-7"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-[#f2d7a1]">0{index + 1}</p>
                <h3 className="mt-3 text-2xl text-[#edf3ff]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[#a8b7cc]">{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white/[0.02] py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ca]">Product Capabilities</p>
          <h2 className="mt-3 text-3xl text-[#edf3ff] sm:text-5xl">Solutions Available Through Bankers Life</h2>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Protection Foundation",
                subtitle: "Life Insurance Solutions",
                items: ["Term Life Insurance", "Whole Life Insurance", "Universal Life Insurance", "Juvenile Whole Life"],
                copy: "Permanent and term-based structures designed for income replacement, estate planning, and long-term accumulation objectives.",
              },
              {
                title: "Retirement Income Design",
                subtitle: "Annuity Strategies",
                items: ["Fixed Indexed Annuities", "Bonus / Flexible Premium Indexed", "Guaranteed Lifetime Income Riders"],
                copy: "Principal-protected accumulation and income structures designed to support defined retirement cash flow objectives.",
              },
              {
                title: "Healthcare Cost Mitigation",
                subtitle: "Coverage Solutions",
                items: ["Medicare Supplement (Medigap)", "Long-Term Care Insurance", "Hospital Indemnity", "Critical Illness"],
                copy: "Coverage solutions structured to manage healthcare cost exposure and protect retirement assets from medical erosion.",
              },
            ].map((pillar) => (
              <motion.article
                key={pillar.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-white/10 bg-[linear-gradient(155deg,rgba(14,24,41,0.78),rgba(7,12,22,0.93))] p-8"
              >
                <div className="mb-6 h-[2px] w-12 rounded-full bg-[#d8b67d]" />
                <h3 className="text-2xl text-[#edf3ff]">{pillar.title}</h3>
                <p className="mt-1 text-sm font-medium text-[#d8b67d]">{pillar.subtitle}</p>
                <ul className="mt-6 space-y-3 text-sm text-[#d2ddee]">
                  {pillar.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#d8b67d]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-white/10 pt-5 text-sm leading-relaxed text-[#9fb0ca]">{pillar.copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="stress-test" className="py-24">
        <div className="container-shell">
          <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(12,20,35,0.88),rgba(7,12,22,0.94))] p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ca]">Retirement Income Stress Test</p>
              <h2 className="mt-3 text-3xl text-[#edf3ff] sm:text-4xl">Run a Structured Income Readiness Check</h2>
              <p className="mt-4 text-sm leading-relaxed text-[#9fb0ca]">
                Complete the four-step input to identify whether a structured retirement income review is appropriate.
              </p>

              <div className="mt-6">
                <Progress value={completionPercent} className="h-2 bg-white/15" />
                <p className="mt-2 text-xs text-[#8ea3bf]">{stepCompletion} of 4 inputs completed</p>
              </div>

              <div className="mt-8 space-y-7">
                <div>
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <p className="text-[#edf3ff]">Step 1: Current IRA / 401(k) balance</p>
                    <span className="font-semibold text-[#d8b67d]">${retirementBalance.toLocaleString()}</span>
                  </div>
                  <Slider
                    value={[retirementBalance]}
                    onValueChange={([value]) => setRetirementBalance(value)}
                    min={100000}
                    max={3000000}
                    step={25000}
                  />
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-between text-sm">
                    <p className="text-[#edf3ff]">Step 2: Years until retirement</p>
                    <span className="font-semibold text-[#d8b67d]">{yearsToRetirement} years</span>
                  </div>
                  <Slider value={[yearsToRetirement]} onValueChange={([value]) => setYearsToRetirement(value)} min={1} max={20} step={1} />
                </div>

                <div>
                  <label htmlFor="monthly-income" className="mb-2 block text-sm text-[#edf3ff]">
                    Step 3: Desired monthly retirement income
                  </label>
                  <Input
                    id="monthly-income"
                    value={monthlyIncome}
                    onChange={(event) => setMonthlyIncome(event.target.value)}
                    inputMode="numeric"
                    placeholder="12000"
                    className="h-11 border-white/20 bg-white/5 text-[#edf3ff]"
                  />
                </div>

                <div>
                  <p className="mb-3 text-sm text-[#edf3ff]">Step 4: Primary concern</p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    {(Object.keys(concernLabels) as ConcernKey[]).map((concernKey) => (
                      <label key={concernKey} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-[#c9d6e8]">
                        <Checkbox
                          checked={concerns[concernKey]}
                          onCheckedChange={(checked) =>
                            setConcerns((previous) => ({
                              ...previous,
                              [concernKey]: Boolean(checked),
                            }))
                          }
                        />
                        {concernLabels[concernKey]}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <motion.aside
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/10 bg-[linear-gradient(160deg,rgba(18,30,50,0.82),rgba(8,13,24,0.95))] p-8"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9fb0ca]">Summary</p>
              <h3 className="mt-3 text-2xl text-[#edf3ff]">Structured Review Outlook</h3>

              <div className="mt-5 space-y-2 text-sm text-[#c8d5e8]">
                <p>Retirement assets modeled: <span className="font-semibold text-[#f2d7a1]">${retirementBalance.toLocaleString()}</span></p>
                <p>Time horizon: <span className="font-semibold text-[#f2d7a1]">{yearsToRetirement} years</span></p>
                <p>Target monthly income: <span className="font-semibold text-[#f2d7a1]">${Number(monthlyIncome.replace(/[^\d]/g, "") || "0").toLocaleString()}</span></p>
              </div>

              <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm leading-relaxed text-[#e3ebf8]">
                  Based on your inputs, a structured income review may help define protection and income durability.
                </p>
              </div>

              <div className="mt-6">
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-[#9fb0ca]">Selected concerns</p>
                {selectedConcerns.length ? (
                  <ul className="space-y-2 text-sm text-[#c9d6e8]">
                    {selectedConcerns.map((label) => (
                      <li key={label} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-[#d8b67d]" />
                        <span>{label}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-[#9fb0ca]">Select at least one concern to tailor your review.</p>
                )}
              </div>

              <Button asChild className="mt-8 h-11 w-full rounded-full bg-[#d8b67d] text-[#1a1d27] hover:bg-[#e4c48d]">
                <Link href="/contact" data-major-cta>Schedule Structured Review</Link>
              </Button>
            </motion.aside>
          </div>
        </div>
      </section>
    </main>
  )
}
