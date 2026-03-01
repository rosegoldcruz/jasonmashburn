"use client"

import { motion } from "framer-motion"
import { Shield, Award, MapPin, Briefcase } from "lucide-react"
import { useAdaptiveMotion } from "@/hooks/use-adaptive-motion"

const credentials = [
  {
    icon: Award,
    label: "Licensed",
    detail: "State of Arizona",
  },
  {
    icon: MapPin,
    label: "Arizona-Based",
    detail: "Scottsdale · PV · North Scottsdale",
  },
  {
    icon: Briefcase,
    label: "Bankers Life",
    detail: "Advisory & Insurance Solutions",
  },
  {
    icon: Shield,
    label: "Specialist",
    detail: "Medicare & Retirement Planning",
  },
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
      </div>
    </section>
  )
}
