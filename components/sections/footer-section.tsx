"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

const footerLinks = [
  { label: "Templates", href: "#" },
  { label: "Showcase", href: "#" },
  { label: "Pricing", href: "#" },
  { label: "Login", href: "#" },
]

export function FooterSection() {
  const [email, setEmail] = useState("")

  return (
    <footer className="relative bg-background px-5 md:px-8 py-20 md:py-22 overflow-hidden">
      {/* Gradient blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[560px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-accent/20 to-secondary opacity-70 blur-3xl rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-14 items-end">
          {/* Logo and links */}
          <div>
            <motion.h2
              className="text-6xl md:text-[7.35rem] leading-[0.88] font-serif text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              OPUS.
            </motion.h2>

            <nav className="flex flex-wrap gap-5 mt-6">
              {footerLinks.map((link, i) => (
                <motion.a
                  key={i}
                  href={link.href}
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  data-clickable
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Email signup */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-muted-foreground text-sm mb-4">Get updates on new templates and features.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors"
                data-clickable
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </form>
          </motion.div>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2025 Opus. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm" data-clickable>
              Privacy
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground text-sm" data-clickable>
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
