import Link from "next/link"

export function MobileFloatingCta() {
  return (
    <div className="fixed bottom-5 left-4 z-30 md:hidden">
      <Link
        href="/apply"
        data-major-cta
        className="block rounded-full bg-accent px-5 py-3 text-center text-xs font-semibold text-accent-foreground shadow-lg"
      >
        Get a Free Illustration
      </Link>
    </div>
  )
}
