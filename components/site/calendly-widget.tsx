"use client"

import { useEffect, useRef } from "react"

interface CalendlyWidgetProps {
  url?: string
  className?: string
}

const DEFAULT_URL = "https://calendly.com/jasonmashburn"

export function CalendlyWidget({
  url = DEFAULT_URL,
  className = "",
}: CalendlyWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.head.appendChild(script)

    return () => {
      try {
        document.head.removeChild(script)
      } catch {}
    }
  }, [])

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="calendly-inline-widget min-h-[660px] w-full rounded-2xl"
        data-url={`${url}?hide_gdpr_banner=1&background_color=0a1628&text_color=eaf1fb&primary_color=c9a84c`}
      />
    </div>
  )
}

export function CalendlyButton({
  url = DEFAULT_URL,
  children,
  className = "",
}: {
  url?: string
  children: React.ReactNode
  className?: string
}) {
  function handleClick() {
    if (typeof window !== "undefined" && (window as any).Calendly) {
      ;(window as any).Calendly.initPopupWidget({
        url: `${url}?hide_gdpr_banner=1&background_color=0a1628&text_color=eaf1fb&primary_color=c9a84c`,
      })
    } else {
      window.open(url, "_blank")
    }
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  )
}
