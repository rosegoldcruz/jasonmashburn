"use client"

import { AnimatePresence, motion } from "framer-motion"
import { useCallback, useEffect, useState } from "react"

type StampLabel = "APPROVED" | "SECURED"

type StampPayload = {
  label?: StampLabel
}

export function StampImpactOverlay() {
  const [stamp, setStamp] = useState<{ id: number; label: StampLabel } | null>(null)

  const trigger = useCallback((label: StampLabel) => {
    const id = Date.now()
    setStamp({ id, label })

    document.documentElement.classList.add("ui-impact-shake")
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate([10, 28, 18])
    }

    window.setTimeout(() => {
      document.documentElement.classList.remove("ui-impact-shake")
    }, 460)

    window.setTimeout(() => {
      setStamp((prev) => (prev?.id === id ? null : prev))
    }, 920)
  }, [])

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null
      if (!target) return

      const majorCtaElement = target.closest("[data-major-cta]")
      if (!majorCtaElement) return

      trigger("SECURED")
    }

    const onStampImpact = (event: Event) => {
      const customEvent = event as CustomEvent<StampPayload>
      trigger(customEvent.detail?.label ?? "APPROVED")
    }

    window.addEventListener("click", onClick, true)
    window.addEventListener("stamp-impact", onStampImpact as EventListener)

    return () => {
      window.removeEventListener("click", onClick, true)
      window.removeEventListener("stamp-impact", onStampImpact as EventListener)
      document.documentElement.classList.remove("ui-impact-shake")
    }
  }, [trigger])

  return (
    <AnimatePresence>
      {stamp ? (
        <motion.div
          key={stamp.id}
          className="pointer-events-none fixed inset-0 z-[120] grid place-items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="rounded-2xl border-[12px] border-[#8a1818]/70 bg-[#c22a2a]/12 px-8 py-5 text-center shadow-[0_30px_80px_-22px_rgba(90,0,0,0.9)] sm:px-14 sm:py-8"
            initial={{
              scale: 3.2,
              y: -360,
              rotate: -14,
              opacity: 0,
              filter: "blur(8px)",
            }}
            animate={{
              scale: [3.2, 0.96, 1],
              y: [-360, 0, 4],
              rotate: [-14, -8.5, -8.5],
              opacity: [0, 0.38, 0],
              filter: ["blur(8px)", "blur(0px)", "blur(0px)"],
            }}
            transition={{ duration: 0.88, times: [0, 0.62, 1], ease: [0.2, 0.9, 0.22, 1] }}
            style={{ transformOrigin: "center center", perspective: 1200 }}
          >
            <p className="font-serif text-5xl font-bold tracking-[0.09em] text-[#7f1010] sm:text-7xl">{stamp.label}</p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}
