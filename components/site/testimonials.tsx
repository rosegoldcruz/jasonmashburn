"use client"

import { motion } from "framer-motion"
import { Quote } from "lucide-react"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

const testimonials = [
  {
    quote:
      "Jason walked me through every detail of the IUL illustration. For the first time, I understood how my retirement income would actually work. No pressure, just clarity.",
    name: "Michael R.",
    context: "Business owner, Scottsdale",
    highlight: "401(k) rollover + IUL strategy",
  },
  {
    quote:
      "After my husband passed, I needed someone who would sit down and explain my options honestly. Jason restructured my income plan and gave me confidence I would be okay.",
    name: "Patricia L.",
    context: "Retiree, Paradise Valley",
    highlight: "Income stabilization planning",
  },
  {
    quote:
      "I was skeptical about IUL until Jason showed me the downside protection mechanics and tax-aware distribution strategy. The structured approach made all the difference.",
    name: "David & Karen S.",
    context: "Pre-retirees, North Scottsdale",
    highlight: "Tax-diversified retirement design",
  },
]

export function Testimonials() {
  const profile = useAdaptiveMotion()

  return (
    <section className="py-24">
      <div className="container-shell">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
          Client Experiences
        </p>
        <h2 className="mt-3 text-3xl text-primary sm:text-5xl">
          What Clients Say About Working with Jason
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, idx) => (
            <motion.article
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.5 * profile.motionDurationScale,
                delay: idx * 0.1,
              }}
              className="glass-panel flex flex-col rounded-2xl p-7"
            >
              <Quote className="mb-4 h-6 w-6 text-accent/60" />
              <blockquote className="flex-1 text-sm leading-relaxed text-muted-foreground">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="text-sm font-semibold text-foreground">{t.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{t.context}</p>
                <span className="mt-2 inline-block rounded-full bg-accent/12 px-3 py-1 text-[11px] font-medium text-accent">
                  {t.highlight}
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
