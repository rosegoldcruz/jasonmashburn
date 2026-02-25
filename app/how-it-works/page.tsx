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
    <main className="bg-background pt-28">
      <section className="container-shell py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          IUL Education
        </p>
        <h1 className="mt-3 max-w-4xl text-4xl text-primary sm:text-5xl">
          How Indexed Universal Life works for tax-aware retirement and
          protection planning.
        </h1>
        <p className="mt-6 max-w-3xl text-muted-foreground">
          IUL policies are permanent life insurance contracts that can allocate
          cash value growth to indexed crediting strategies. They are designed
          with a downside floor, a potential upside cap or participation rate,
          and policy loan access for income planning.
        </p>
      </section>

      <section className="bg-secondary py-16">
        <div className="container-shell grid gap-8 lg:grid-cols-2">
          <article className="rounded-xl bg-card p-7">
            <h2 className="text-3xl text-primary">Core Mechanics</h2>
            <ul className="mt-5 space-y-4 text-sm text-muted-foreground">
              <li>
                <span className="font-semibold text-foreground">Indexing strategy:</span>{" "}
                interest is credited based on index performance formulas, not by
                direct investment in the market.
              </li>
              <li>
                <span className="font-semibold text-foreground">Floor and cap:</span>{" "}
                a floor helps limit downside in negative index years, while caps
                or participation rates set upside limits.
              </li>
              <li>
                <span className="font-semibold text-foreground">Cash value accumulation:</span>{" "}
                policy funding above internal costs can build long-term cash
                value based on credited interest and policy design.
              </li>
              <li>
                <span className="font-semibold text-foreground">Tax treatment:</span>{" "}
                policies must remain compliant under IRC 7702 to preserve tax
                advantages and avoid modified endowment contract issues.
              </li>
            </ul>
          </article>

          <article className="rounded-xl border border-border bg-background p-7">
            <h2 className="text-3xl text-primary">Animated Growth Concept</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              This conceptual chart shows how structured funding and indexed
              crediting can compound over time while maintaining policy-level
              risk controls.
            </p>
            <div className="mt-6 rounded-lg border bg-card p-5">
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
        <h2 className="text-3xl text-primary">IUL vs Other Strategies</h2>
        <div className="mt-6 overflow-x-auto rounded-xl border bg-card">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-secondary text-foreground">
              <tr>
                <th className="px-5 py-4">Strategy</th>
                <th className="px-5 py-4">Market Downside</th>
                <th className="px-5 py-4">Tax Treatment</th>
                <th className="px-5 py-4">Contribution Flexibility</th>
                <th className="px-5 py-4">Death Benefit</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">IUL</td>
                <td className="px-5 py-4">Floor-based crediting design</td>
                <td className="px-5 py-4">Potential tax-advantaged loans</td>
                <td className="px-5 py-4">Flexible, policy-dependent</td>
                <td className="px-5 py-4">Yes</td>
              </tr>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">401(k)</td>
                <td className="px-5 py-4">Direct market exposure</td>
                <td className="px-5 py-4">Tax deferred, taxable withdrawal</td>
                <td className="px-5 py-4">Annual limits apply</td>
                <td className="px-5 py-4">No</td>
              </tr>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">Roth IRA</td>
                <td className="px-5 py-4">Direct market exposure</td>
                <td className="px-5 py-4">Tax-free qualified distributions</td>
                <td className="px-5 py-4">Income and annual limits</td>
                <td className="px-5 py-4">No</td>
              </tr>
              <tr className="border-t">
                <td className="px-5 py-4 font-medium">Term Life</td>
                <td className="px-5 py-4">No cash accumulation</td>
                <td className="px-5 py-4">N/A for cash value planning</td>
                <td className="px-5 py-4">Premium set by term design</td>
                <td className="px-5 py-4">Yes (during term)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="pb-20">
        <div className="container-shell">
          <div className="rounded-2xl bg-primary px-7 py-10 text-primary-foreground sm:px-10">
            <h2 className="text-3xl">Ready to evaluate your custom IUL design?</h2>
            <p className="mt-3 max-w-2xl text-primary-foreground/85">
              Submit your details and receive a tailored illustration aligned to
              your retirement income and protection objectives.
            </p>
            <Button asChild className="mt-6 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/apply">Continue to Application</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
