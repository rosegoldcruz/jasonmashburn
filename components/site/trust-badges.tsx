"use client"

import { motion } from "framer-motion"
import { Shield, Award, MapPin, Building2 } from "lucide-react"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

const credentials = [
  {
    icon: Shield,
    label: "Fiduciary-Minded",
    detail: "Client-first planning process",
  },
  {
    icon: Award,
    label: "Licensed Insurance Agent",
    detail: "State of Arizona",
  },
  {
    icon: Building2,
    label: "30+ Carriers",
    detail: "Access to top-rated insurers",
  },
  {
    icon: MapPin,
    label: "Arizona-Based",
    detail: "Scottsdale · PV · North Scottsdale",
  },
]

const carrierNames = [
  "Nationwide",
  "Pacific Life",
  "North American",
  "Allianz",
  "Lincoln Financial",
  "Securian",
  "Transamerica",
  "John Hancock",
]

export function TrustBadges() {
  const profile = useAdaptiveMotion()

  return (
    <section className="py-16">
      <div className="container-shell">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((cred, idx) => (
            <motion.div
              key={cred.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.45 * profile.motionDurationScale,
                delay: idx * 0.08,
              }}
              className="glass-panel flex items-start gap-4 rounded-2xl p-5"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/15">
                <cred.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{cred.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{cred.detail}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 * profile.motionDurationScale, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Partnered With Leading Carriers
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {carrierNames.map((name) => (
              <span
                key={name}
                className="text-sm font-medium tracking-wide text-muted-foreground/70 transition-colors hover:text-accent"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
