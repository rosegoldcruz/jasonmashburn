"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Briefcase, TrendingUp, ShieldCheck, ArrowRight, Search, Wrench, BarChart3 } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HeroParallaxLayers } from "@/components/site/hero-parallax-layers"
import { StickyCtaDock } from "@/components/site/sticky-cta-dock"
import { RetirementRiskDashboard } from "@/components/site/retirement-risk-dashboard"
import { IncomeModelVisualization } from "@/components/site/income-model-visualization"
import { RetirementStressTest } from "@/components/site/retirement-stress-test"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"
import {
  duration,
  distance,
  scale,
  easing,
  stagger,
  sectionReveal,
  cardHover,
  heroReveal,
} from "@/motion/tokens"

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
        scale: scale.heroShrink,
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
    ...sectionReveal,
    transition: {
      duration: duration.base * profile.motionDurationScale,
      ease: easing.easeOut,
    },
  }

  return (
    <main className="pt-20 text-foreground">
      {/* ═══════════════════════════════════════════════════════════
          SECTION 1 — HERO (Problem-Led)
          Asset A: seven-desert-mountain-header.mp4 — LOCKED
          ═══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative isolate min-h-[calc(100vh-5rem)] overflow-hidden"
        style={{ backgroundColor: "rgb(8 19 36)" }}
      >
        <HeroParallaxLayers />
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/azluxury.png"
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/seven-desert-mountain-header.mp4" type="video/mp4" />
        </video>

        {/* Layered overlay system for guaranteed text contrast */}
        <div className="absolute inset-0 bg-[rgb(8_19_36/0.25)]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[rgb(8_19_36/0.70)] via-[rgb(8_19_36/0.35)] to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[rgb(8_19_36/0.70)] to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse at center, transparent 50%, rgb(8 19 36 / 0.30) 100%)",
          }}
        />

        <div className="container-shell relative z-10 flex min-h-[calc(100vh-5rem)] flex-col justify-center py-20 sm:py-28">
          <motion.div
            initial={heroReveal.initial}
            animate={heroReveal.animate}
            transition={{
              duration: heroReveal.transition.duration * profile.motionDurationScale,
              ease: heroReveal.transition.ease,
            }}
            className="max-w-4xl"
          >
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.22em] text-accent">
              Arizona Retirement Income Specialist
            </p>
            <h1 className="text-3xl leading-[1.08] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6),0_6px_24px_rgba(0,0,0,0.4)] sm:text-5xl lg:text-6xl">
              Are You 5–10 Years From Retirement and Unsure How Your Income Will Actually Work?
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] sm:text-lg">
              Jason Mashburn designs protection-first retirement income structures for Arizona business owners
              and pre-retirees who want defined income, not market guesswork.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button asChild size="lg" className="h-12 rounded-full bg-accent px-7 text-sm font-semibold text-accent-foreground hover:bg-accent/90">
                <Link href="#stress-test" data-major-cta>
                  Run Your Retirement Income Stress Test
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Link
                href="/how-it-works"
                className="text-sm font-medium text-white/70 underline decoration-white/20 underline-offset-4 transition-colors hover:text-white hover:decoration-white/40"
              >
                See How Structured Income Planning Works
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 2 — RETIREMENT RISK DASHBOARD
          Institutional animated metrics panel
          ═══════════════════════════════════════════════════════════ */}
      <RetirementRiskDashboard />

      {/* ═══════════════════════════════════════════════════════════
          SECTION 3 — WHO THIS IS FOR (Decision Gate)
          3 selectable persona cards with scroll anchors
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24" id="who-this-is-for">
        <div className="container-shell">
          <motion.div {...cardAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Who This Is For</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Which describes your situation?</h2>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Business Owner With 401(k)",
                copy: "You've built significant 401(k) or qualified plan assets and need a structured exit strategy that protects principal and creates tax-efficient retirement income.",
                anchor: "#stress-test",
              },
              {
                icon: TrendingUp,
                title: "Pre-Retiree 5–10 Years Out",
                copy: "You're approaching retirement and need to shift from accumulation to income architecture — with downside protection and a defined withdrawal strategy.",
                anchor: "#stress-test",
              },
              {
                icon: ShieldCheck,
                title: "Retiree Concerned About Income Stability",
                copy: "You're already retired or about to be and worried that market volatility, inflation, or longevity could erode your income and lifestyle.",
                anchor: "#stress-test",
              },
            ].map((persona, idx) => (
              <motion.a
                key={persona.title}
                href={persona.anchor}
                initial={sectionReveal.initial}
                whileInView={sectionReveal.whileInView}
                viewport={sectionReveal.viewport}
                transition={{
                  duration: duration.base * profile.motionDurationScale,
                  delay: idx * stagger.children,
                  ease: easing.easeOut,
                }}
                whileHover={{ y: -distance.lift, scale: scale.hover }}
                className="glass-panel group flex cursor-pointer flex-col rounded-2xl p-8 transition-colors hover:bg-white/[0.08]"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12">
                  <persona.icon className="h-6 w-6 text-accent" />
                </div>
                <h3 className="text-2xl leading-tight text-primary">{persona.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{persona.copy}</p>
                <div className="mt-5 flex items-center gap-2 text-sm font-medium text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  Take the Stress Test
                  <ArrowRight className="h-4 w-4" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 4 — INCOME MODEL VISUALIZATION
          Layered bar chart with Market-Only vs Structured toggle
          ═══════════════════════════════════════════════════════════ */}
      <IncomeModelVisualization />

      {/* ═══════════════════════════════════════════════════════════
          MODELING PROOF — Advisor Credibility
          Asset B: Without_changing_the_202602250426.mp4 — LOCKED
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-shell">
          <motion.div {...cardAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Advisor Credibility</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Strategic Retirement Planning, Not Product Sales.</h2>
          </motion.div>

          <div className="mt-10 grid gap-8 lg:grid-cols-[1.08fr_1fr] lg:items-start">
            <motion.div
              {...cardAnimation}
              className="relative min-h-[360px] overflow-hidden rounded-3xl sm:min-h-[460px]"
            >
              <video
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              >
                <source src="/Without_changing_the_202602250426.mp4" type="video/mp4" />
              </video>
            </motion.div>

            <div className="grid gap-4">
              {[
                {
                  title: "Structured Review First",
                  points: [
                    "Clarify risk exposure, timeline, and income targets before product selection.",
                    "Use transparent assumptions and scenario-based design.",
                  ],
                },
                {
                  title: "Protection-First Allocation",
                  points: [
                    "Design around downside protection before growth assumptions.",
                    "Reduce sequence risk pressure during early retirement years.",
                  ],
                },
                {
                  title: "Defined Income Mapping",
                  points: [
                    "Model when and how policy access supports retirement cash flow.",
                    "Coordinate income phases with Social Security and other assets.",
                  ],
                },
              ].map((item, idx) => (
                <motion.article
                  key={item.title}
                  initial={sectionReveal.initial}
                  whileInView={sectionReveal.whileInView}
                  viewport={sectionReveal.viewport}
                  transition={{
                    duration: duration.base * profile.motionDurationScale,
                    delay: idx * stagger.children,
                    ease: easing.easeOut,
                  }}
                  whileHover={{ y: -distance.lift, scale: scale.hover }}
                  className="rounded-2xl bg-[rgb(255_255_255/0.08)] p-6 border border-[rgb(255_255_255/0.12)]"
                >
                  <div className="mb-4 h-[2px] w-12 rounded-full bg-accent/80" />
                  <h3 className="text-2xl leading-tight text-primary">{item.title}</h3>
                  <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted-foreground">
                    {item.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <span className="mt-[6px] h-1.5 w-1.5 rounded-full bg-accent" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 5 — STRUCTURED PLANNING PROCESS (3 Bold Pillars)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-shell">
          <motion.div {...cardAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Process</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Three Phases. One Structured Outcome.</h2>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Search,
                number: "01",
                title: "Diagnose Retirement Exposure",
                copy: "Map current assets, income gaps, tax posture, and sequence risk to understand where your plan is vulnerable.",
              },
              {
                icon: Wrench,
                number: "02",
                title: "Engineer Income Structure",
                copy: "Design a layered income architecture using protection-first tools — structured for durability, not market dependency.",
              },
              {
                icon: BarChart3,
                number: "03",
                title: "Monitor & Adjust Long-Term",
                copy: "Track policy performance, funding benchmarks, and distribution sustainability with scheduled reviews.",
              },
            ].map((pillar, idx) => (
              <motion.div
                key={pillar.title}
                initial={sectionReveal.initial}
                whileInView={sectionReveal.whileInView}
                viewport={sectionReveal.viewport}
                transition={{
                  duration: duration.base * profile.motionDurationScale,
                  delay: idx * stagger.children,
                  ease: easing.easeOut,
                }}
                className="glass-panel flex flex-col rounded-2xl p-8"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/12">
                    <pillar.icon className="h-6 w-6 text-accent" />
                  </div>
                  <span className="text-xs font-semibold tracking-[0.16em] text-accent/60">{pillar.number}</span>
                </div>
                <h3 className="text-2xl leading-tight text-primary">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.copy}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          SECTION 6 — RETIREMENT INCOME STRESS TEST (4-Step)
          ═══════════════════════════════════════════════════════════ */}
      <RetirementStressTest />

      {/* ═══════════════════════════════════════════════════════════
          JASON BIO — Shorter, clinical
          Asset C: jason-headshot.png — LOCKED
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <motion.div
              {...cardAnimation}
              className="relative aspect-[4/5] max-w-md overflow-hidden rounded-3xl lg:max-w-none"
            >
              <img
                src="/jason-headshot.png"
                alt="Jason Mashburn"
                className="h-full w-full object-cover"
              />
            </motion.div>

            <motion.div {...cardAnimation} className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">About</p>
              <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Jason Mashburn</h2>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                Licensed in AZ · Scottsdale-based · Bankers Life
              </p>

              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  Arizona-licensed retirement income specialist focused on helping retirees and business owners transition from asset accumulation to structured retirement income.
                </p>
                <p>
                  I design strategies using fixed annuities and indexed life insurance to address income continuity, principal protection, and long-term distribution planning — evaluated within each client's broader financial objectives and risk tolerance.
                </p>
                <p>
                  My approach is analytical and process-driven. Each engagement begins with a detailed review of assets, liabilities, income needs, and long-term objectives to determine whether structured insurance strategies align with the client's retirement plan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FAQs — Objection handling
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-shell grid gap-6 lg:grid-cols-[1fr_1.55fr]">
          <motion.div {...cardAnimation} className="glass-panel rounded-2xl p-7">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Common Questions</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-4xl">Structured Income Planning FAQ</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Neutral, educational guidance on structure, taxation, and planning assumptions.
            </p>
          </motion.div>

          <Accordion type="single" collapsible className="glass-panel rounded-2xl px-7">
            <AccordionItem value="q1">
              <AccordionTrigger>How does IUL fit with other retirement accounts?</AccordionTrigger>
              <AccordionContent>
                IUL is typically positioned as one layer of a broader plan. It can complement qualified accounts by offering additional
                tax-diversified access and protection-oriented design when structured appropriately.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q2">
              <AccordionTrigger>What happens to policy crediting in down markets?</AccordionTrigger>
              <AccordionContent>
                Indexed strategies use carrier-defined floors and caps. The floor helps limit downside crediting in negative index years,
                while upside participation remains subject to policy terms.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q3">
              <AccordionTrigger>How is income modeled from a policy?</AccordionTrigger>
              <AccordionContent>
                Income modeling evaluates timing, loan assumptions, and policy sustainability under different scenarios. The goal is defined,
                manageable distributions aligned with long-term policy health.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="q4">
              <AccordionTrigger>Are illustration results guaranteed?</AccordionTrigger>
              <AccordionContent>
                No. Illustrations are hypothetical and based on current assumptions. They are used for planning clarity and scenario review,
                not as guaranteed performance outcomes.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          FINAL CTA + SCHEDULING
          ═══════════════════════════════════════════════════════════ */}
      <section className="pb-28">
        <div className="container-shell">
          <div className="glass-panel-strong grid overflow-hidden rounded-3xl text-primary-foreground md:grid-cols-[1fr_1.05fr]">
            <div className="order-2 px-8 py-12 sm:px-12 md:order-1">
              <h2 className="text-3xl sm:text-4xl">Ready to Define Your Retirement Income?</h2>
              <p className="mt-4 max-w-2xl text-sm text-primary-foreground/88">
                Schedule a structured review to map your assets, income needs, and protection priorities into a clear, actionable plan.
              </p>
              <Button asChild className="mt-7 h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/apply" data-major-cta>Schedule Structured Review</Link>
              </Button>
            </div>
            <div className="order-1 min-h-72 md:order-2 md:min-h-full">
              <img src="/jason3.jpeg" alt="Jason Mashburn advisory consultation" className="h-full w-full object-cover md:hidden" />
              <img src="/jason2.jpeg" alt="Jason Mashburn advisory consultation" className="hidden h-full w-full object-cover md:block" />
            </div>
          </div>
        </div>
      </section>

      {/* Sticky CTA Dock — appears after hero scroll */}
      <StickyCtaDock />
    </main>
  )
}
