import { COMPLIANCE_COPY, SITE } from "@/lib/site-config"

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-gradient-to-r from-primary via-[#0f2541] to-primary py-14 text-primary-foreground">
      <div className="container-shell grid gap-8 md:grid-cols-3">
        <div>
          <p className="text-xl font-semibold tracking-tight">Jason Mashburn</p>
          <p className="mt-2 text-sm text-primary-foreground/80">Arizona IUL Planning Specialist</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Contact</p>
          <p className="mt-2 text-sm text-primary-foreground/80">{SITE.phone}</p>
          <p className="text-sm text-primary-foreground/80">{SITE.email}</p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent">Service Area</p>
          <p className="mt-2 text-sm text-primary-foreground/80">{SITE.serviceArea}</p>
          <p className="text-sm text-primary-foreground/80">{SITE.officeLocation}</p>
        </div>
      </div>
      <div className="container-shell mt-9 border-t border-white/10 pt-7">
        <p className="text-xs leading-relaxed text-primary-foreground/75">{COMPLIANCE_COPY}</p>
      </div>
    </footer>
  )
}
