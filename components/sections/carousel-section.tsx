"use client"

import { motion } from "framer-motion"

const portfolioItems = [
  "/portfolio-website-design-preview-modern.jpg",
  "/photography-portfolio-website-clean.jpg",
  "/architecture-firm-website-minimal.jpg",
  "/design-agency-portfolio-dark-theme.jpg",
  "/artist-portfolio-website-creative.jpg",
  "/writer-portfolio-website-elegant.jpg",
]

export function CarouselSection() {
  // Duplicate for seamless loop
  const items = [...portfolioItems, ...portfolioItems]

  return (
    <section className="bg-secondary/65 py-20 md:py-22 overflow-hidden border-y border-border/70">
      <div className="max-w-7xl mx-auto px-5 md:px-8 mb-10">
        <motion.p
          className="text-muted-foreground text-xs md:text-sm uppercase tracking-[0.2em] mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          ABOUT JASON MASHBURN
        </motion.p>

        <motion.h2
          className="text-[2.1rem] md:text-6xl font-serif text-foreground leading-[0.94] md:leading-[0.92]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Focused on Stability and Clarity.
        </motion.h2>

        <motion.div
          className="mt-5 space-y-4 max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-[0.96rem] md:text-lg leading-relaxed text-foreground/85">
            I work with Arizona individuals and families who value discretion, structure, and long-term financial
            alignment.
          </p>
          <p className="text-[0.96rem] md:text-lg leading-relaxed text-foreground/85">
            As an Arizona licensed insurance agent offering products through Bankers Life, my focus is on income
            structuring and risk-aware retirement positioning. Each client engagement is approached deliberately, with
            careful attention to objectives, liquidity needs, and legacy considerations.
          </p>
          <p className="text-[0.96rem] md:text-lg leading-relaxed text-foreground/85">
            Retirement planning should not feel rushed. It should feel structured.
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <motion.div
          className="flex gap-5 md:gap-6"
          animate={{ x: [0, "-50%"] }}
          transition={{
            duration: 30,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[290px] md:w-[360px] rounded-2xl overflow-hidden shadow-[0_24px_50px_-30px_rgba(0,0,0,0.55)] border border-border/70"
              data-clickable
            >
              <img
                src={src || "/placeholder.svg"}
                alt={`Portfolio example ${(i % portfolioItems.length) + 1}`}
                className="w-full h-auto"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
