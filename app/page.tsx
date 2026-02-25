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
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Advisor Credibility</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Strategic Retirement Planning, Not Product Sales.</h2>

          <div className="mt-10 grid gap-6 lg:grid-cols-[1.08fr_1fr] lg:items-start">
            <motion.div {...cardAnimation} className="relative min-h-[360px] overflow-hidden rounded-3xl sm:min-h-[460px]">
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
              ].map((item) => (
                <motion.article
                  key={item.title}
                  {...cardAnimation}
                  whileHover={{ y: -4, scale: 1.01 }}
                  transition={{ duration: 0.2 }}
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

              <div className="mt-6 space-y-4 text-muted-foreground">
                <p>
                  I'm Jason Mashburn, an Arizona-licensed retirement income specialist based in Scottsdale.
                </p>
                <p>
                  My work centers on helping retirees and business owners transition from asset accumulation to structured retirement income. After decades of building businesses, funding qualified plans, and managing investments, the challenge shifts from growth to sustainability.
                </p>
                <p>
                  I design strategies using fixed annuities and indexed life insurance to address income continuity, principal protection where appropriate, and long-term distribution planning. These tools are evaluated within the context of each client's broader financial objectives and risk tolerance.
                </p>
                <p>
                  Retirement income planning is not about chasing returns. It is about creating a framework that supports dependable cash flow, tax efficiency, and disciplined allocation decisions through varying market conditions.
                </p>
                <p>
                  I work with individuals throughout Scottsdale, Paradise Valley, North Scottsdale, Cave Creek, and the greater Arizona market who value clarity, structure, and thoughtful financial positioning.
                </p>
                <p>
                  My approach is analytical and process-driven. Each engagement begins with a detailed review of assets, liabilities, income needs, and long-term objectives to determine whether structured insurance strategies align with the client's retirement plan.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Visual Proof</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Real Planning Conversations. Real Outcomes.</h2>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {["/Business%20owner%20rollover.jpeg", "/pre-retiree.jpeg", "/widow.jpeg"].map((image) => (
              <motion.div key={image} {...cardAnimation} className="glass-panel overflow-hidden rounded-2xl">
                <img src={image} alt="Planning meeting" className="h-72 w-full object-cover" />
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-3">
            {[
              ["Business owner rollover", "A business owner evaluates rollover timing and uses structured IUL design to add tax-aware income flexibility."],
              ["Pre-retiree asset restructuring", "A pre-retiree rebalances exposure and aligns protected accumulation with an income date and withdrawal sequence."],
              ["Widow income stabilization", "A surviving spouse reviews household cash flow and restructures for steadier income, protection continuity, and clearer planning decisions."],
            ].map(([title, copy]) => (
              <motion.article key={title} {...cardAnimation} className="glass-panel rounded-2xl p-7">
                <div className="mb-4 h-[2px] w-12 rounded-full bg-accent/80" />
                <h3 className="text-2xl leading-tight text-primary">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{copy}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-shell">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Implementation</p>
          <h2 className="mt-3 text-3xl text-primary sm:text-5xl">Our Structured Planning Process</h2>

          <div className="mt-10 space-y-4">
            {[
              ["01", "Discovery Review", "Define protection priorities, tax posture, and retirement income objectives with full balance-sheet context."],
              ["02", "Structured Illustration Modeling", "Compare funding and distribution scenarios to identify designs that support defined income and policy durability."],
              ["03", "Implementation and Alignment", "Execute underwriting and policy setup with clear benchmarks for ongoing monitoring and long-term strategy fit."],
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
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Objection Handling</p>
            <h2 className="mt-3 text-3xl text-primary sm:text-4xl">Common Questions About IUL</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Neutral, educational guidance on structure, taxation, and planning assumptions.
            </p>
          </div>

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
    </main>
  )
}
