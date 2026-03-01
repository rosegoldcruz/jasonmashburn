"use client"

import Link from "next/link"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ShieldCheck, TrendingUp, Clock, Users, Briefcase, Heart } from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { HeroParallaxLayers } from "@/components/site/hero-parallax-layers"
import { StickyCtaDock } from "@/components/site/sticky-cta-dock"
import { IulCalculator } from "@/components/site/iul-calculator"
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
          LAYER 1 — IDENTITY SNAP (Hero)
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

        <div className="container-shell relative z-10 py-28 sm:py-44">
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
            <h1 className="text-4xl leading-[1.02] text-white [text-shadow:0_2px_8px_rgba(0,0,0,0.6),0_6px_24px_rgba(0,0,0,0.4)] sm:text-6xl">
              Build tax-free retirement income with IUL strategies designed to protect principal and preserve flexibility.
            </h1>
            <p className="mt-6 max-w-3xl text-base leading-relaxed text-white/90 [text-shadow:0_2px_12px_rgba(0,0,0,0.4)] sm:text-lg">
              Jason Mashburn helps Arizona families and high-income professionals use Indexed Universal Life for downside protection,
              tax-advantaged growth potential, and access to living benefits.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="h-11 rounded-full bg-accent px-6 text-accent-foreground hover:bg-accent/90">
                <Link href="/apply" data-major-cta>Run Retirement Income Stress Test</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 2 — AUTHORITY COMPRESSION (KPI Dashboard)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-16">
        <div className="container-shell">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: ShieldCheck, stat: "0% Floor", label: "Downside protection built into indexed strategies" },
              { icon: TrendingUp, stat: "Tax-Free", label: "Policy loan access designed for tax-advantaged income" },
              { icon: Clock, stat: "Lifetime", label: "Income modeling for distributions that don't expire" },
              { icon: Users, stat: "Arizona", label: "Licensed · Scottsdale-based · In-person & virtual" },
            ].map((kpi, idx) => (
              <motion.div
                key={kpi.label}
                initial={sectionReveal.initial}
                whileInView={sectionReveal.whileInView}
                viewport={sectionReveal.viewport}
                transition={{
                  duration: duration.base * profile.motionDurationScale,
                  delay: idx * stagger.children,
                  ease: easing.easeOut,
                }}
                className="glass-panel flex items-start gap-4 rounded-2xl p-5"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                  <kpi.icon className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">{kpi.stat}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{kpi.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 3 — DECISION GATE ("Who This Is For")
          Three persona cards — categorization reduces anxiety
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24" id="who-this-is-for">
        <div className="container-shell">
          <motion.div {...cardAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Who This Is For</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Select the scenario that fits you.</h2>
            <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              Each path leads to the same structured review process — but understanding your starting point helps Jason design a more relevant strategy from day one.
            </p>
          </motion.div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Briefcase,
                title: "Business Owner Rollover",
                copy: "You've built equity in your business and need to transition accumulated assets into protected retirement income without unnecessary tax exposure.",
                image: "/Business%20owner%20rollover.jpeg",
              },
              {
                icon: TrendingUp,
                title: "Pre-Retiree Restructuring",
                copy: "You're 5–15 years from retirement and want to rebalance market exposure toward principal-protected accumulation with a defined income date.",
                image: "/pre-retiree.jpeg",
              },
              {
                icon: Heart,
                title: "Surviving Spouse / Income Stabilization",
                copy: "You need to restructure household cash flow for steadier income, protection continuity, and clearer long-term planning decisions.",
                image: "/widow.jpeg",
              },
            ].map((persona, idx) => (
              <motion.article
                key={persona.title}
                initial={sectionReveal.initial}
                whileInView={sectionReveal.whileInView}
                viewport={sectionReveal.viewport}
                transition={{
                  duration: duration.base * profile.motionDurationScale,
                  delay: idx * stagger.children,
                  ease: easing.easeOut,
                }}
                whileHover={cardHover.whileHover}
                className="glass-panel group flex flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={persona.image}
                    alt={persona.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgb(8_19_36/0.60)] to-transparent" />
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-accent/15">
                    <persona.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="text-2xl leading-tight text-primary">{persona.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{persona.copy}</p>
                  <Link
                    href="/apply"
                    className="mt-5 inline-flex text-sm font-medium text-accent transition-colors hover:text-accent/80"
                  >
                    Start Structured Review →
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          LAYER 4 — MODELING PROOF
          Asset B: Without_changing_the_202602250426.mp4 — LOCKED
          "He models outcomes. Not vibes."
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-shell">
          <motion.div {...cardAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Modeling Proof</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Strategic Retirement Planning, Not Product Sales.</h2>
          </motion.div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_1fr] lg:items-start">
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
                  title: "Fiduciary-Minded Process",
                  points: [
                    "Recommendations are framed around alignment, not one-time transactions.",
                    "Each design decision is mapped to protection and tax awareness goals.",
                  ],
                },
                {
                  title: "Long-Term Policy Management",
                  points: [
                    "Build around defined income and durability checkpoints.",
                    "Review funding and performance to keep strategy on track over time.",
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
                {
                  title: "Tax-Aware Structure",
                  points: [
                    "Build tax-diversified distribution options for future flexibility.",
                    "Stress-test assumptions for long-term sustainability.",
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
          LAYER 5 — DIAGNOSTIC ENGAGEMENT (Stress Test / Calculator)
          ═══════════════════════════════════════════════════════════ */}
      <IulCalculator />

      {/* ═══════════════════════════════════════════════════════════
          LAYER 6 — PROCESS (3 steps max)
          ═══════════════════════════════════════════════════════════ */}
      <section className="py-24">
        <div className="container-shell">
          <motion.div {...cardAnimation}>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Implementation</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Our Structured Planning Process</h2>
          </motion.div>

          <div className="mt-10 space-y-4">
            {[
              ["01", "Discovery Review", "Define protection priorities, tax posture, and retirement income objectives with full balance-sheet context."],
              ["02", "Structured Illustration Modeling", "Compare funding and distribution scenarios to identify designs that support defined income and policy durability."],
              ["03", "Implementation and Alignment", "Execute underwriting and policy setup with clear benchmarks for ongoing monitoring and long-term strategy fit."],
            ].map(([n, t, c], idx) => (
              <motion.div
                key={t}
                initial={sectionReveal.initial}
                whileInView={sectionReveal.whileInView}
                viewport={sectionReveal.viewport}
                transition={{
                  duration: duration.base * profile.motionDurationScale,
                  delay: idx * stagger.children,
                  ease: easing.easeOut,
                }}
                className="glass-panel rounded-2xl p-7 md:grid md:grid-cols-[100px_260px_1fr] md:items-start md:gap-6"
              >
                <p className="text-sm font-semibold tracking-[0.16em] text-accent">{n}</p>
                <h3 className="mt-1 text-2xl leading-tight text-primary md:mt-0">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-0">{c}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════
          JASON BIO — Shorter, more clinical
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Objection Handling</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-4xl">Common Questions About IUL</h2>
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
              <h2 className="text-3xl sm:text-4xl">Request Your Custom IUL Illustration</h2>
              <p className="mt-4 max-w-2xl text-sm text-primary-foreground/88">
                Get structured clarity on protection, tax-aware design, and defined income modeling based on your real timeline and objectives.
              </p>
              <Button asChild className="mt-7 h-11 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/apply" data-major-cta>Request Custom Illustration</Link>
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
