import { COMPLIANCE_COPY } from "@/lib/site-config"
import { ApplyForm } from "./apply-form"

export default function ApplyPage() {
  return (
    <main className="pt-28 text-foreground">
      <section className="container-shell py-14">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
          Application
        </p>
        <h1 className="mt-3 text-4xl text-primary sm:text-5xl">
          Request your custom Indexed Universal Life illustration.
        </h1>
        <p className="mt-5 max-w-3xl text-muted-foreground">
          Complete this pre-screen so Jason can prepare an IUL strategy around
          your goals, contribution range, underwriting profile, and timeline.
        </p>
      </section>

      <section className="container-shell pb-16">
        <ApplyForm />
      </section>

      <section className="container-shell pb-20">
        <div className="glass-panel rounded-2xl p-6">
          <p className="text-xs leading-relaxed text-muted-foreground">{COMPLIANCE_COPY}</p>
        </div>
      </section>
    </main>
  )
}
