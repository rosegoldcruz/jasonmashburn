"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactFormValues } from "@/lib/validation"

const defaultValues: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  message: "",
}

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [values, setValues] = useState<ContactFormValues>(defaultValues)
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement | null>(null)

  const heading = useMemo(() => (isOpen ? "Close chat" : "Chat with Jason"), [isOpen])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    const onPointerDown = (event: PointerEvent) => {
      const panel = panelRef.current
      if (!panel) {
        return
      }

      const target = event.target
      if (!(target instanceof Node)) {
        return
      }

      if (!panel.contains(target)) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    window.addEventListener("pointerdown", onPointerDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
      window.removeEventListener("pointerdown", onPointerDown)
    }
  }, [isOpen])

  const handleChange = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setServerError(null)
    setSuccess(null)

    const parsed = contactSchema.safeParse(values)
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors
      setErrors({
        name: fieldErrors.name?.[0],
        email: fieldErrors.email?.[0],
        phone: fieldErrors.phone?.[0],
        message: fieldErrors.message?.[0],
      })
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      })

      const data = (await response.json()) as { error?: string; message?: string }
      if (!response.ok) {
        setServerError(data.error || "Unable to send request")
        return
      }

      setSuccess(data.message || "Request received. Jason will follow up shortly.")
      setValues(defaultValues)
    } catch {
      setServerError("Unable to send request")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="pointer-events-none fixed bottom-5 right-4 z-[90] sm:bottom-7 sm:right-7">
      {isOpen ? (
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="false"
          aria-label="Chat with Jason"
          className="pointer-events-auto max-h-[78vh] w-[min(92vw,400px)] overflow-hidden rounded-2xl border border-border/70 bg-background/98 shadow-2xl backdrop-blur"
        >
          <div className="grid grid-cols-[108px_1fr] gap-0 border-b border-border/70">
            <img src="/jason-headshot.png" alt="Jason Mashburn" className="h-full w-full object-cover" />
            <div className="px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">About Jason</p>
              <p className="mt-1 text-lg text-primary">Jason Mashburn</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Arizona-licensed specialist focused on protection-first retirement income design.
              </p>
            </div>
          </div>

          <form className="space-y-3 overflow-y-auto px-4 py-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="chat-name">Name</Label>
              <Input
                id="chat-name"
                autoComplete="name"
                value={values.name}
                onChange={(event) => handleChange("name", event.target.value)}
              />
              {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name}</p> : null}
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Label htmlFor="chat-email">Email</Label>
                <Input
                  id="chat-email"
                  type="email"
                  autoComplete="email"
                  value={values.email}
                  onChange={(event) => handleChange("email", event.target.value)}
                />
                {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email}</p> : null}
              </div>
              <div>
                <Label htmlFor="chat-phone">Phone</Label>
                <Input
                  id="chat-phone"
                  autoComplete="tel"
                  value={values.phone}
                  onChange={(event) => handleChange("phone", event.target.value)}
                />
                {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone}</p> : null}
              </div>
            </div>

            <div>
              <Label htmlFor="chat-message">How can Jason help?</Label>
              <Textarea
                id="chat-message"
                rows={3}
                value={values.message}
                onChange={(event) => handleChange("message", event.target.value)}
              />
              {errors.message ? <p className="mt-1 text-xs text-destructive">{errors.message}</p> : null}
            </div>

            {serverError ? <p className="text-xs text-destructive">{serverError}</p> : null}
            {success ? <p className="text-xs text-foreground">{success}</p> : null}

            <div className="flex items-center gap-2 pt-1">
              <Button type="submit" disabled={isSubmitting} className="h-9 bg-accent text-accent-foreground hover:bg-accent/90">
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
              <Button type="button" variant="ghost" className="h-9" onClick={() => setIsOpen(false)}>
                Minimize
              </Button>
            </div>
          </form>
        </div>
      ) : null}

      <Button
        type="button"
        size="icon"
        aria-label={heading}
        className="pointer-events-auto mt-3 h-14 w-14 rounded-full bg-accent text-accent-foreground shadow-xl hover:bg-accent/90"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </Button>
    </div>
  )
}
