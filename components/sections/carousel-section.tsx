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
        <motion.h2
          className="text-4xl md:text-5xl font-serif text-foreground leading-[0.95]"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Built by creators, for creators.
        </motion.h2>
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
