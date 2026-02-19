"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const processSteps = [
  {
    title: "Initial Review",
    description:
      "We begin with a confidential conversation to understand your goals, assets, and long-term priorities.",
    image: "/azluxury.png",
  },
  {
    title: "Strategic Evaluation",
    description: "I analyze your current positioning and outline structured options aligned with your objectives.",
    image: "/jason-headshot.png",
  },
  {
    title: "Implementation & Ongoing Review",
    description:
      "Once aligned, strategies are implemented carefully and reviewed periodically as conditions evolve.",
    image: "/boardroom.png",
  },
]

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150])
  const y3 = useTransform(scrollYProgress, [0, 1], [80, -80])

  const yValues = [y1, y2, y3]

  return (
    <section ref={containerRef} className="bg-background px-5 md:px-8 py-22 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.p
          className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.2em] mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          THE PROCESS
        </motion.p>

        <motion.h2
          className="text-[2.1rem] md:text-6xl font-serif leading-[0.94] md:leading-[0.92] text-foreground mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          A Structured, Private Approach.
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {processSteps.map((step, i) => (
            <motion.div
              key={i}
              className="relative h-[360px] md:h-[460px] rounded-2xl overflow-hidden group border border-border/80 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.5)]"
              style={{ y: yValues[i] }}
              initial={{ clipPath: "inset(100% 0 0 0)" }}
              whileInView={{ clipPath: "inset(0 0 0 0)" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              data-clickable
            >
              <motion.img
                src={step.image}
                alt={step.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />

              <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 bg-gradient-to-t from-background/95 via-background/70 to-transparent">
                <span className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">Step {i + 1}</span>
                <h3 className="mt-2 font-serif text-[1.5rem] md:text-2xl leading-[1.04] md:leading-[1.02] text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 md:mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-6 md:px-7 py-3.5 text-sm md:text-base font-medium hover:bg-primary/90 transition-colors"
            data-clickable
          >
            Schedule a Strategy Conversation
          </a>
        </div>
      </div>
    </section>
  )
}
