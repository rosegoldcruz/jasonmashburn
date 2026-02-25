import { ContactForm } from "./contact-form"
import { COMPLIANCE_COPY, SITE } from "@/lib/site-config"

export default function ContactPage() {
  return (
    <main className="pt-28 text-foreground">
      <section className="container-shell py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Contact</p>
        <h1 className="mt-3 text-4xl text-primary sm:text-5xl">Speak with Jason About Your Structured IUL Plan</h1>
        <p className="mt-5 max-w-3xl text-muted-foreground">
          Use the form below to ask a focused question, request a consultation,
          or evaluate whether a structured IUL design aligns with your
          protection, tax-awareness, and retirement income objectives.
        </p>
      </section>

      <section className="container-shell grid gap-8 pb-16 lg:grid-cols-2">
        <div className="glass-panel rounded-2xl p-6">
          <h2 className="text-3xl text-primary">Send a Message</h2>
          <ContactForm />
        </div>
        <div className="space-y-5">
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-2xl text-primary">Contact Details</h2>
            <p className="mt-3 text-sm text-muted-foreground">Phone: {SITE.phone}</p>
            <p className="text-sm text-muted-foreground">Email: {SITE.email}</p>
            <p className="mt-3 text-sm text-muted-foreground">{SITE.serviceArea}</p>
            <p className="text-sm text-muted-foreground">{SITE.officeLocation}</p>
          </div>
          <div className="glass-panel overflow-hidden rounded-2xl">
            <iframe
              title="Arizona service area map"
              src="https://www.google.com/maps?q=Scottsdale%2C%20Arizona&output=embed"
              className="h-72 w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="glass-panel rounded-2xl p-6">
          <p className="text-xs leading-relaxed text-muted-foreground">{COMPLIANCE_COPY}</p>
        </div>
      </section>
    </main>
  )
}
