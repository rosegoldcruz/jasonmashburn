"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { contactSchema, type ContactFormValues } from "@/lib/validation"

export function ContactForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const onSubmit = async (values: ContactFormValues) => {
    setServerError(null)
    setSuccess(null)

    const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })

    const data = (await response.json()) as { error?: string; message?: string }

    if (!response.ok) {
      setServerError(data.error || "Unable to send message")
      return
    }

    setSuccess(data.message || "Message sent")
    reset()
  }

  return (
    <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" {...register("name")} />
        {errors.name ? <p className="mt-1 text-xs text-destructive">{errors.name.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" {...register("email")} />
        {errors.email ? <p className="mt-1 text-xs text-destructive">{errors.email.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" {...register("phone")} />
        {errors.phone ? <p className="mt-1 text-xs text-destructive">{errors.phone.message}</p> : null}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea id="message" rows={6} {...register("message")} />
        {errors.message ? <p className="mt-1 text-xs text-destructive">{errors.message.message}</p> : null}
      </div>

      {serverError ? <p className="text-sm text-destructive">{serverError}</p> : null}
      {success ? <p className="text-sm text-foreground">{success}</p> : null}

      <Button type="submit" disabled={isSubmitting} className="bg-accent text-accent-foreground hover:bg-accent/90">
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
