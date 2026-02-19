"use client"

import { motion } from "framer-motion"

export function FooterSection() {
  return (
    <footer className="relative bg-background px-5 md:px-8 py-14 md:py-16 overflow-hidden border-t border-border/70">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="flex flex-col gap-5 md:gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="text-xl md:text-2xl font-serif text-foreground">Jason Mashburn</p>
          <p className="text-sm md:text-base leading-relaxed text-foreground/80 max-w-5xl">
            Licensed insurance agent in the state of Arizona. Products offered through Bankers Life. All strategies
            are subject to suitability review and applicable carrier guidelines.
          </p>
          <p className="text-xs md:text-sm text-muted-foreground">© 2026 Jason Mashburn. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
