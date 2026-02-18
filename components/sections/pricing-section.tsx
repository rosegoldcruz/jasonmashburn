"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

const plans = [
  {
    name: "Starter",
    price: "$12",
    period: "/month",
    description: "Perfect for personal portfolios",
    features: ["5 portfolio pages", "Custom domain", "Basic analytics", "Email support"],
  },
  {
    name: "Professional",
    price: "$29",
    period: "/month",
    description: "For growing creatives",
    features: ["Unlimited pages", "Priority support", "Advanced analytics", "Custom branding", "Team collaboration"],
    popular: true,
  },
]

export function PricingSection() {
  return (
    <section className="bg-secondary/55 px-5 md:px-8 py-20 md:py-22 border-y border-border/70">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-[0.94]">Simple, transparent pricing</h2>
          <p className="text-muted-foreground mt-3 max-w-md mx-auto">Start free, upgrade when you&apos;re ready.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              className={`relative bg-background rounded-2xl p-7 md:p-8 ticket-edge border border-border/80 shadow-[0_18px_38px_-24px_rgba(0,0,0,0.45)] ${plan.popular ? "ring-2 ring-primary" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              data-clickable
            >
              {plan.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-background text-xs font-medium px-3 py-1 rounded-full">
                  Popular
                </span>
              )}

              <div className="text-center pb-6 border-b border-dashed border-border">
                <h3 className="font-serif text-xl text-foreground">{plan.name}</h3>
                <div className="mt-4 flex items-baseline justify-center gap-1">
                  <span className="text-5xl md:text-6xl font-serif text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
              </div>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-3 text-foreground">
                    <Check className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                className={`w-full mt-8 py-3 px-6 rounded-lg font-medium transition-colors ${
                  plan.popular
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "bg-secondary text-foreground hover:bg-primary/10"
                }`}
              >
                Get started
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
