"use client"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"

const showcaseImages = [
  "/modern-architecture-building-exterior-minimal.jpg",
  "/fashion-model-editorial-portrait-dramatic-lighting.jpg",
  "/interior-design-minimalist-living-room-natural-lig.jpg",
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
          Showcase
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {showcaseImages.map((src, i) => (
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
                src={src}
                alt={`Showcase image ${i + 1}`}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
