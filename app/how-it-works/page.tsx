"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

const growthPoints = [
  { year: 1, value: 20 },
  { year: 5, value: 42 },
  { year: 10, value: 65 },
  { year: 15, value: 83 },
  { year: 20, value: 100 },
]

export default function HowItWorksPage() {
  return (
    <main className="pt-28 text-foreground">
      <section className="container-shell py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          IUL Education
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl text-primary sm:text-5xl">
          How Indexed Universal Life Works in a Structured Plan
        </h1>
        <p className="mt-6 max-w-3xl text-muted-foreground">
          Indexed Universal Life is used here as a strategic planning tool to
          support protection, tax awareness, and defined retirement income
          design. Structure and policy management matter more than product
          labels alone.
        </p>
      </section>

      <section className="py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <article className="glass-panel rounded-2xl p-7">
            <h2 className="text-3xl text-primary">Structured Planning Mechanics</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">Protection-first crediting:</span>{" "}
                interest is credited by index-linked formulas rather than direct
                market investment, creating a floor-based risk framework.
              </li>
              <li>
                <span className="font-semibold text-foreground">Guardrails and limits:</span>{" "}
                floor, cap, and participation terms establish a defined range of
                outcomes used for disciplined income planning.
              </li>
              <li>
                <span className="font-semibold text-foreground">Funding discipline:</span>{" "}
                properly structured contributions help build durable cash value
                for long-term flexibility and retirement sequencing.
              </li>
              <li>
                <span className="font-semibold text-foreground">Tax-aware compliance:</span>{" "}
                policy design must remain compliant under IRC 7702 and avoid
                MEC status to preserve intended tax treatment.
              </li>
            </ul>
          </article>

          <article className="glass-panel rounded-2xl p-7">
            <h2 className="text-3xl text-primary">Income Modeling Concept</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              This conceptual view shows how structured funding and policy
              crediting can support defined income planning over time while
              maintaining protection-focused controls.
            </p>
            <div className="glass-panel mt-6 rounded-xl p-5">
              <div className="space-y-3">
                {growthPoints.map((point, idx) => (
                  <div key={point.year} className="grid grid-cols-[60px_1fr] items-center gap-3">
                    <span className="text-xs font-medium text-muted-foreground">Year {point.year}</span>
                    <div className="h-5 overflow-hidden rounded-full bg-secondary">
                      <motion.div
                        className="h-full rounded-full bg-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${point.value}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: idx * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </article>
        </div>
      </section>

      <section className="container-shell py-16">
        <h2 className="text-3xl text-primary">IUL Within a Structured Retirement Framework</h2>
        <div className="glass-panel mt-6 overflow-x-auto rounded-2xl">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-white/10 text-foreground">
              <tr>
                <th className="px-5 py-4">Planning Lane</th>
                <th className="px-5 py-4">Primary Purpose</th>
                <th className="px-5 py-4">Tax Profile</th>
                <th className="px-5 py-4">Flexibility Notes</th>
                <th className="px-5 py-4">Planning Role</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">IUL</td>
                <td className="px-5 py-4">Protection + defined income design</td>
                <td className="px-5 py-4">Potential tax-advantaged policy access</td>
                <td className="px-5 py-4">Funding and loan strategy are design-dependent</td>
                <td className="px-5 py-4">Tax-diversified income + legacy alignment</td>
              </tr>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">401(k)</td>
                <td className="px-5 py-4">Accumulation-focused retirement savings</td>
                <td className="px-5 py-4">Tax-deferred with taxable distributions</td>
                <td className="px-5 py-4">Employer plan rules and annual limits apply</td>
                <td className="px-5 py-4">Core qualified-plan foundation</td>
              </tr>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">Roth IRA</td>
                <td className="px-5 py-4">Tax-free qualified distribution lane</td>
                <td className="px-5 py-4">After-tax contribution with qualified tax-free access</td>
                <td className="px-5 py-4">Income limits and annual contribution caps</td>
                <td className="px-5 py-4">Supplemental tax-diversification bucket</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="glass-panel-strong rounded-3xl px-7 py-10 text-primary-foreground sm:px-10">
            <h2 className="text-3xl">Request Your Custom IUL Illustration</h2>
            <p className="mt-3 max-w-2xl text-primary-foreground/85">
              Review your strategy with clearer modeling around protection,
              structure, tax awareness, and defined retirement income planning.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/apply" data-major-cta>Request Custom Illustration</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
