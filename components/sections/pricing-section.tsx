"use client"

import { motion } from "framer-motion"

export function PricingSection() {
  return (
    <section className="bg-secondary/55 px-5 md:px-8 py-20 md:py-22 border-y border-border/70">
      <div className="max-w-5xl mx-auto text-center">
        <motion.h2
          className="text-[2.1rem] md:text-6xl font-serif text-foreground leading-[0.94] md:leading-[0.92]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Structure the Next Phase
          <br className="hidden sm:block" />
          with Intention.
        </motion.h2>

        <motion.p
          className="mt-5 text-[0.96rem] md:text-lg leading-relaxed text-foreground/85 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          If you are approaching retirement or evaluating your current income positioning, begin with a structured
          review.
        </motion.p>

        <motion.div
          className="mt-9"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground px-7 md:px-8 py-3.5 text-sm md:text-base font-medium hover:bg-primary/90 transition-colors"
            data-clickable
          >
            Start the Review Process
          </a>
        </motion.div>
      </div>
    </section>
  )
}
