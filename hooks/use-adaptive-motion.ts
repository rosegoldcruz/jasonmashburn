"use client"

import { useEffect, useMemo, useState } from "react"

type BatteryManagerLike = {
  level: number
  charging: boolean
  addEventListener: (type: string, listener: () => void) => void
  removeEventListener: (type: string, listener: () => void) => void
}

type NavigatorWithBattery = Navigator & {
  getBattery?: () => Promise<BatteryManagerLike>
  deviceMemory?: number
}

type AdaptiveProfile = {
  isMobile: boolean
  isSmallMobile: boolean
  isTablet: boolean
  isPortrait: boolean
  reduced: boolean
  qualityLevel: "low" | "medium" | "high"
  gpuTier: "low" | "mid" | "high"
  blurPx: number
  parallaxFactor: number
  particleCount: number
  motionDurationScale: number
}

function estimateGpuTier(): "low" | "mid" | "high" {
  if (typeof window === "undefined") return "mid"

  const nav = navigator as NavigatorWithBattery
  const memory = nav.deviceMemory ?? 4
  const cores = navigator.hardwareConcurrency ?? 4

  try {
    const canvas = document.createElement("canvas")
    const gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl")
    const renderer = gl
      ? (gl as WebGLRenderingContext).getParameter(
          (gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info")
            ? ((gl as WebGLRenderingContext).getExtension("WEBGL_debug_renderer_info") as { UNMASKED_RENDERER_WEBGL: number })
                .UNMASKED_RENDERER_WEBGL
            : (gl as WebGLRenderingContext).RENDERER,
        )
      : ""

    const rendererText = String(renderer).toLowerCase()

    if (
      memory <= 3 ||
      cores <= 4 ||
      /intel\(r\) hd|mali-4|adreno 5|apple a9|apple a10/.test(rendererText)
    ) {
      return "low"
    }

    if (memory >= 8 && cores >= 8) return "high"

    return "mid"
  } catch {
    if (memory <= 3 || cores <= 4) return "low"
    if (memory >= 8 && cores >= 8) return "high"
    return "mid"
  }
}

export function useAdaptiveMotion(): AdaptiveProfile {
  const [width, setWidth] = useState(1280)
  const [height, setHeight] = useState(720)
  const [batteryLevel, setBatteryLevel] = useState(1)
  const [charging, setCharging] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const [gpuTier, setGpuTier] = useState<"low" | "mid" | "high">("mid")
  const [lowFpsMode, setLowFpsMode] = useState(false)

  useEffect(() => {
    setWidth(window.innerWidth)
    setHeight(window.innerHeight)
    setGpuTier(estimateGpuTier())

    const media = window.matchMedia("(prefers-reduced-motion: reduce)")
    const updateReducedMotion = () => setReduceMotion(media.matches)
    updateReducedMotion()

    const onResize = () => {
      setWidth(window.innerWidth)
      setHeight(window.innerHeight)
    }

    window.addEventListener("resize", onResize)
    media.addEventListener("change", updateReducedMotion)

    const nav = navigator as NavigatorWithBattery
    let batteryRef: BatteryManagerLike | null = null
    const onBatteryChange = () => {
      if (!batteryRef) return
      setBatteryLevel(batteryRef.level)
      setCharging(batteryRef.charging)
    }

    nav
      .getBattery?.()
      .then((battery) => {
        batteryRef = battery
        onBatteryChange()
        battery.addEventListener("levelchange", onBatteryChange)
        battery.addEventListener("chargingchange", onBatteryChange)
      })
      .catch(() => undefined)

    let frameCount = 0
    let rafId = 0
    let start = performance.now()

    const sampleFps = (now: number) => {
      frameCount += 1
      const elapsed = now - start

      if (elapsed >= 1500) {
        const fps = (frameCount * 1000) / elapsed
        setLowFpsMode(fps < 50)
        frameCount = 0
        start = now
      }

      rafId = requestAnimationFrame(sampleFps)
    }

    rafId = requestAnimationFrame(sampleFps)

    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener("resize", onResize)
      media.removeEventListener("change", updateReducedMotion)
      if (batteryRef) {
        batteryRef.removeEventListener("levelchange", onBatteryChange)
        batteryRef.removeEventListener("chargingchange", onBatteryChange)
      }
    }
  }, [])

  return useMemo(() => {
    const isMobile = width < 768
    const isSmallMobile = width < 420
    const isTablet = width >= 768 && width < 1100
    const isPortrait = height >= width

    const powerSave = !charging && batteryLevel < 0.25
  const reduced = reduceMotion || powerSave || gpuTier === "low" || lowFpsMode

  const qualityLevel = reduced ? "low" : gpuTier === "high" ? "high" : "medium"

  const baseBlur = reduced ? 6 : gpuTier === "high" ? 22 : 15
    const blurPx = isSmallMobile
      ? Math.max(4, baseBlur - 8)
      : isMobile
        ? Math.max(6, baseBlur - 6)
        : isTablet
          ? baseBlur + 2
          : baseBlur

    const parallaxFactor = reduced
      ? 0.25
      : isSmallMobile
        ? 0.45
        : isMobile
          ? 0.55
          : gpuTier === "high"
            ? 1
            : 0.75
    const particleCount = reduced
      ? 3
      : isSmallMobile
        ? 4
        : isMobile
          ? 6
          : gpuTier === "high"
            ? 14
            : 9
    const motionDurationScale = reduced ? 0.58 : isMobile ? 0.78 : gpuTier === "high" ? 1 : 0.88

    return {
      isMobile,
      isSmallMobile,
      isTablet,
      isPortrait,
      reduced,
      qualityLevel,
      gpuTier,
      blurPx,
      parallaxFactor,
      particleCount,
      motionDurationScale,
    }
  }, [batteryLevel, charging, gpuTier, height, lowFpsMode, reduceMotion, width])
}
