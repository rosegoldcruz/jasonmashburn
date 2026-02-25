"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
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
  const heroRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    const heroElement = heroRef.current
    if (!heroElement) {
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(heroElement, {
        transformOrigin: "center center",
        scale: 1,
        borderRadius: 0,
      })

      gsap.to(heroElement, {
        scale: 0.6,
        borderRadius: 24,
        ease: "none",
        scrollTrigger: {
          trigger: heroElement,
          start: "top top",
          end: "+=800",
          pin: true,
          scrub: 1.5,
          anticipatePin: 1,
        },
      })
    }, heroElement)

    return () => ctx.revert()
  }, [])

  const cardAnimation = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: { duration: 0.55 * profile.motionDurationScale },
  }

  return (
    <main className="pt-20 text-foreground">
      <section ref={heroRef} className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden">
        <HeroParallaxLayers />
        <video autoPlay loop muted playsInline className="absolute inset-0 h-full w-full object-cover">
          <source src="/seven-desert-mountain-header.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary/18" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/62 via-primary/22 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-primary/58 to-transparent" />

        <div className="container-shell relative z-10 py-30 sm:py-44">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 * profile.motionDurationScale }}
            className="max-w-4xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">Arizona Indexed Universal Life Planning</p>
            <h1 className="text-4xl leading-[1.02] text-primary-foreground [text-shadow:0_6px_24px_rgba(0,0,0,0.5)] sm:text-6xl">
              Build tax-free retirement income with IUL strategies designed to protect principal and preserve flexibility.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-primary-foreground/95 [text-shadow:0_3px_16px_rgba(0,0,0,0.35)] sm:text-lg">
              Jason Mashburn helps Arizona families and high-income professionals use Indexed Universal Life for downside protection,
              tax-advantaged growth potential, and access to living benefits.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                <Link href="/how-it-works" data-major-cta>See How IUL Works</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-11 rounded-full border-primary-foreground bg-transparent px-6 text-primary-foreground hover:bg-primary-foreground/12"
              >
                <Link href="/apply" data-major-cta>Apply Now</Link>
              </Button>
            </div>

          </motion.div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Core Value</p>
              <h2 className="mt-3 text-3xl text-primary sm:text-5xl">What Is an IUL?</h2>
            </div>
            <span className="hidden text-xs uppercase tracking-[0.18em] text-primary-foreground/70 md:inline">Risk-managed accumulation</span>
          </div>

          <div className="grid gap-5 md:grid-cols-6">
            <motion.article {...cardAnimation} className="glass-panel rounded-2xl p-7 md:col-span-3 md:row-span-2">
              <div className="mb-4 h-[2px] w-14 rounded-full bg-accent/85" />
              <h3 className="text-3xl leading-tight text-primary">Tax-Free Growth Potential</h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Cash value growth can be accessed through policy loans structured to support supplemental retirement income.
                Built correctly, this creates a distinct tax-diversification lane beyond traditional qualified plans.
              </p>
            </motion.article>

            <motion.article {...cardAnimation} className="glass-panel rounded-2xl p-7 md:col-span-3">
              <div className="mb-4 h-[2px] w-12 rounded-full bg-accent/80" />
              <h3 className="text-[1.65rem] leading-tight text-primary">Principal Protection</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Indexed strategies include a floor, helping protect against direct market loss while allowing capped upside participation.
              </p>
            </motion.article>

            <motion.article {...cardAnimation} className="glass-panel rounded-2xl p-7 md:col-span-3">
              <div className="mb-4 h-[2px] w-12 rounded-full bg-accent/80" />
              <h3 className="text-[1.65rem] leading-tight text-primary">Living Benefits</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                Modern IUL designs can include accelerated benefit riders for qualifying chronic, critical, or terminal conditions.
              </p>
            </motion.article>
          </div>
        </div>
      </section>

      <section className="py-24 text-primary-foreground">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Ideal Client Profile</p>
          <h2 className="mt-3 text-3xl sm:text-5xl">Who This Is For</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              "Pre-retirees who want additional tax diversification beyond qualified plans.",
              "Business owners looking for flexible premium design and policy-backed liquidity.",
              "High earners who are already maxing out 401(k) and IRA options and still need tax-advantaged accumulation.",
            ].map((item, index) => (
              <motion.div
                key={item}
                {...cardAnimation}
                className={`glass-panel rounded-2xl p-7 ${index === 1 ? "md:translate-y-5" : ""}`}
              >
                <div className="mb-4 h-[2px] w-10 rounded-full bg-accent/85" />
                <p className="text-sm leading-relaxed text-primary-foreground/92">{item}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Implementation</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">The Process</h2>

          <div className="mt-10 space-y-4">
            {[
              ["01", "Consultation", "Review current strategy, retirement timeline, and protection priorities."],
              ["02", "Custom Illustration", "Evaluate carrier illustration scenarios with cap, participation, and funding design."],
              ["03", "Policy Design", "Finalize underwriting path and structure policy details around your objective."],
            ].map(([n, t, c]) => (
              <motion.div key={t} {...cardAnimation} className="glass-panel rounded-2xl p-7 md:grid md:grid-cols-[100px_260px_1fr] md:items-start md:gap-6">
                <p className="text-sm font-semibold tracking-[0.16em] text-accent">{n}</p>
                <h3 className="mt-1 text-2xl leading-tight text-primary md:mt-0">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-0">{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <div className="glass-panel-strong rounded-3xl px-8 py-14 text-primary-foreground sm:px-14">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Advisor Positioning</p>
            <h2 className="mt-3 text-3xl sm:text-5xl">Why Jason Mashburn</h2>
            <p className="mt-5 max-w-4xl text-primary-foreground/90">
              Jason focuses on IUL education for Arizona households, combines carrier-backed illustration analysis with practical
              implementation, and guides each client through underwriting and long-term policy management through Bankers Life.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_1.55fr]">
          <div className="glass-panel rounded-2xl p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Clarity</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-4xl">Frequently Asked Questions</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Transparent answers on policy mechanics, taxation, and retirement-income structure.
            </p>
          </div>

          <Accordion type="single" collapsible className="glass-panel rounded-2xl px-7">
            <AccordionItem value="q1">
              <AccordionTrigger>How is IUL different from a Roth IRA?</AccordionTrigger>
              <AccordionContent>
                Roth IRAs have annual contribution limits and income restrictions, while properly structured IUL policies can provide flexible
                premium funding and tax-advantaged access through loans.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>How does indexing work if the market drops?</AccordionTrigger>
              <AccordionContent>
                Indexed crediting links to an external index with a floor rate, which means the policy is designed to avoid direct index losses
                in negative years, subject to carrier terms.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>How do policy loans support retirement income?</AccordionTrigger>
              <AccordionContent>
                Policy loans are typically not treated as taxable income when the policy remains in force and properly managed. Loan terms vary by
                carrier and product design.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Is an illustration a guarantee?</AccordionTrigger>
              <AccordionContent>
                No. Illustrations are hypothetical projections based on current assumptions, not guaranteed outcomes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-shell">
          <div className="glass-panel-strong rounded-3xl px-8 py-12 text-primary-foreground sm:px-12">
            <h2 className="text-3xl sm:text-4xl">Get Your Custom IUL Illustration — Free</h2>
            <p className="mt-4 max-w-2xl text-sm text-primary-foreground/88">
              Get a personalized illustration designed around your contribution target, retirement horizon, and protection priorities.
            </p>
            <Button asChild className="mt-7 h-11 bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/apply" data-major-cta>Start Your Illustration Request</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
