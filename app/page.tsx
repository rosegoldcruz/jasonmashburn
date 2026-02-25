"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HeroParallaxLayers } from "@/components/site/hero-parallax-layers"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

export default function Home() {
  const profile = useAdaptiveMotion()

  const cardAnimation = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.55 * profile.motionDurationScale },
  }

  return (
    <main className="bg-background pt-20">
      <section className="relative isolate overflow-hidden border-b border-white/10">
        <HeroParallaxLayers />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/seven-desert-mountain-header.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-primary/45 to-primary/70" />
        <div className="container-shell relative z-10 py-28 sm:py-40">
          <div className="grid items-end gap-6 lg:grid-cols-[1.1fr_0.72fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 * profile.motionDurationScale }}
              className="max-w-3xl rounded-3xl border border-white/20 bg-primary/38 p-7 shadow-2xl backdrop-blur-md sm:p-11"
            >
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                Arizona Indexed Universal Life Planning
              </p>
              <h1 className="text-4xl leading-[1.03] text-primary-foreground sm:text-6xl">
                Build tax-free retirement income with IUL strategies designed to
                protect principal and preserve flexibility.
              </h1>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
                Jason Mashburn helps Arizona families and high-income professionals
                use Indexed Universal Life for downside protection, tax-advantaged
                growth potential, and access to living benefits.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild size="lg" className="h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                  <Link href="/how-it-works">See How IUL Works</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="h-11 rounded-full border-primary-foreground bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/10"
                >
                  <Link href="/apply">Apply Now</Link>
                </Button>
              </div>
            </motion.div>

            <motion.aside
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.78 * profile.motionDurationScale, delay: 0.12 }}
              className="hidden rounded-3xl border border-white/15 bg-white/6 p-7 text-primary-foreground shadow-[0_34px_90px_-55px_rgba(0,0,0,0.85)] backdrop-blur-md lg:block"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Strategic Outcome</p>
              <h2 className="mt-3 text-3xl leading-tight">Preserve downside. Build optionality.</h2>
              <div className="mt-6 space-y-4 border-t border-white/15 pt-5">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-primary-foreground/70">Priority 01</p>
                  <p className="text-sm text-primary-foreground/90">Retirement income flexibility through policy loan design</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-primary-foreground/70">Priority 02</p>
                  <p className="text-sm text-primary-foreground/90">Principal-protection framework with indexed crediting</p>
                </div>
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-primary-foreground/70">Priority 03</p>
                  <p className="text-sm text-primary-foreground/90">Living and legacy benefits integrated in one policy architecture</p>
                </div>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-b from-background to-secondary/45 py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core Value</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">What Is an IUL?</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            {
              title: "Tax-Free Growth Potential",
              copy: "Cash value growth can be accessed through policy loans structured to support supplemental retirement income.",
            },
            {
              title: "Principal Protection",
              copy: "Indexed strategies include a floor, helping protect against direct market loss while still allowing capped upside participation.",
            },
            {
              title: "Living Benefits",
              copy: "Modern IUL designs can include accelerated benefit riders for qualifying chronic, critical, or terminal conditions.",
            },
          ].map((item) => (
            <motion.article
              key={item.title}
              {...cardAnimation}
              className="group rounded-2xl border border-border/70 bg-card/95 p-7 shadow-[0_18px_45px_-24px_rgba(10,22,40,0.55)] transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_22px_55px_-22px_rgba(10,22,40,0.45)]"
            >
              <div className="mb-4 h-[2px] w-12 rounded-full bg-accent/80" />
              <h3 className="text-[1.65rem] leading-tight text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
            </motion.article>
          ))}
          </div>
        </div>
      </section>

      <section className="bg-primary py-24 text-primary-foreground">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Ideal Client Profile</p>
          <h2 className="mt-3 text-3xl sm:text-5xl">Who This Is For</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Pre-retirees who want additional tax diversification beyond qualified plans.",
              "Business owners looking for flexible premium design and policy-backed liquidity.",
              "High earners who are already maxing out 401(k) and IRA options and still need tax-advantaged accumulation.",
            ].map((item) => (
              <motion.div
                key={item}
                {...cardAnimation}
                className="rounded-2xl border border-white/15 bg-white/7 p-7 shadow-[0_20px_55px_-35px_rgba(0,0,0,0.7)] backdrop-blur-sm"
              >
                <div className="mb-4 h-[2px] w-10 rounded-full bg-accent/85" />
                <p className="text-sm leading-relaxed text-primary-foreground/90">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Implementation</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">The Process</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Consultation", "Review current strategy, retirement timeline, and protection priorities."],
            ["02", "Custom Illustration", "Evaluate carrier illustration scenarios with cap, participation, and funding design."],
            ["03", "Policy Design", "Finalize underwriting path and structure policy details around your objective."],
          ].map(([n, t, c]) => (
            <motion.div
              key={t}
              {...cardAnimation}
              className="rounded-2xl border border-border bg-card p-7 shadow-[0_16px_38px_-28px_rgba(10,22,40,0.5)]"
            >
              <p className="text-sm font-semibold tracking-wide text-accent">{n}</p>
              <h3 className="mt-2 text-[1.6rem] leading-tight text-primary">{t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c}</p>
            </motion.div>
          ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <div className="rounded-3xl bg-gradient-to-r from-primary to-[#102746] px-8 py-14 text-primary-foreground shadow-2xl sm:px-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Advisor Positioning</p>
            <h2 className="mt-3 text-3xl sm:text-5xl">Why Jason Mashburn</h2>
            <p className="mt-5 max-w-4xl text-primary-foreground/90">
            Jason focuses on IUL education for Arizona households, combines
            carrier-backed illustration analysis with practical implementation,
            and guides each client through underwriting and long-term policy
            management through Bankers Life.
            </p>
          </div>
        </div>
      </section>

      <section className="relative bg-gradient-to-b from-transparent to-secondary/45 py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Clarity</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Frequently Asked Questions</h2>
          <Accordion
            type="single"
            collapsible
            className="mt-8 rounded-2xl border border-border bg-card px-7 shadow-[0_20px_52px_-34px_rgba(10,22,40,0.45)]"
          >
          <AccordionItem value="q1">
            <AccordionTrigger>How is IUL different from a Roth IRA?</AccordionTrigger>
            <AccordionContent>
              Roth IRAs have annual contribution limits and income restrictions,
              while properly structured IUL policies can provide flexible premium
              funding and tax-advantaged access through loans.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q2">
            <AccordionTrigger>How does indexing work if the market drops?</AccordionTrigger>
            <AccordionContent>
              Indexed crediting links to an external index with a floor rate,
              which means the policy is designed to avoid direct index losses in
              negative years, subject to carrier terms.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q3">
            <AccordionTrigger>How do policy loans support retirement income?</AccordionTrigger>
            <AccordionContent>
              Policy loans are typically not treated as taxable income when the
              policy remains in force and properly managed. Loan terms vary by
              carrier and product design.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="q4">
            <AccordionTrigger>Is an illustration a guarantee?</AccordionTrigger>
            <AccordionContent>
              No. Illustrations are hypothetical projections based on current
              assumptions, not guaranteed outcomes.
            </AccordionContent>
          </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-shell">
          <div className="rounded-3xl bg-gradient-to-r from-accent to-[#b5912f] px-8 py-12 text-accent-foreground shadow-[0_24px_60px_-32px_rgba(201,168,76,0.8)] sm:px-12">
            <h2 className="text-3xl sm:text-4xl">Get Your Custom IUL Illustration — Free</h2>
            <p className="mt-4 max-w-2xl text-sm text-accent-foreground/90">
              Get a personalized illustration designed around your contribution
              target, retirement horizon, and protection priorities.
            </p>
            <Button asChild className="mt-7 h-11 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/apply">Start Your Illustration Request</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
