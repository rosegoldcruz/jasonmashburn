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

export default function Home() {
  const cardAnimation = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.55 },
  }

  return (
    <main className="bg-background pt-20">
      <section className="relative isolate overflow-hidden">
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
        <div className="container-shell relative z-10 py-28 sm:py-36">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="max-w-3xl"
          >
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Arizona Indexed Universal Life Planning
            </p>
            <h1 className="text-4xl leading-tight text-primary-foreground sm:text-6xl">
              Build tax-free retirement income with IUL strategies designed to
              protect principal and preserve flexibility.
            </h1>
            <p className="mt-6 max-w-2xl text-base text-primary-foreground/90 sm:text-lg">
              Jason Mashburn helps Arizona families and high-income professionals
              use Indexed Universal Life for downside protection, tax-advantaged
              growth potential, and access to living benefits.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/how-it-works">See How IUL Works</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
                <Link href="/apply">Apply Now</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-shell py-20">
        <h2 className="text-3xl text-primary sm:text-4xl">What Is an IUL?</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
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
              className="rounded-xl border bg-card p-6"
            >
              <h3 className="text-2xl text-primary">{item.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{item.copy}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-20">
        <div className="container-shell">
          <h2 className="text-3xl text-primary sm:text-4xl">Who This Is For</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              "Pre-retirees who want additional tax diversification beyond qualified plans.",
              "Business owners looking for flexible premium design and policy-backed liquidity.",
              "High earners who are already maxing out 401(k) and IRA options and still need tax-advantaged accumulation.",
            ].map((item) => (
              <motion.div key={item} {...cardAnimation} className="rounded-xl bg-background p-6">
                <p className="text-sm text-foreground">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-20">
        <h2 className="text-3xl text-primary sm:text-4xl">The Process</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {[
            ["01", "Consultation", "Review current strategy, retirement timeline, and protection priorities."],
            ["02", "Custom Illustration", "Evaluate carrier illustration scenarios with cap, participation, and funding design."],
            ["03", "Policy Design", "Finalize underwriting path and structure policy details around your objective."],
          ].map(([n, t, c]) => (
            <motion.div key={t} {...cardAnimation} className="rounded-xl border border-border p-6">
              <p className="text-sm font-semibold text-accent">{n}</p>
              <h3 className="mt-2 text-2xl text-primary">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="bg-primary py-20 text-primary-foreground">
        <div className="container-shell max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl">Why Jason Mashburn</h2>
          <p className="mt-4 text-primary-foreground/90">
            Jason focuses on IUL education for Arizona households, combines
            carrier-backed illustration analysis with practical implementation,
            and guides each client through underwriting and long-term policy
            management through Bankers Life.
          </p>
        </div>
      </section>

      <section className="container-shell py-20">
        <h2 className="text-3xl text-primary sm:text-4xl">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="mt-6 rounded-xl border bg-card px-6">
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
      </section>

      <section className="pb-24">
        <div className="container-shell">
          <div className="rounded-2xl bg-accent px-6 py-10 text-accent-foreground sm:px-10">
            <h2 className="text-3xl">Get Your Custom IUL Illustration — Free</h2>
            <p className="mt-3 max-w-2xl text-sm text-accent-foreground/85">
              Get a personalized illustration designed around your contribution
              target, retirement horizon, and protection priorities.
            </p>
            <Button asChild className="mt-6 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/apply">Start Your Illustration Request</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
