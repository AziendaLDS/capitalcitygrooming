import { business } from "@/lib/business";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-3 px-4 py-3 sm:gap-4 sm:px-6 sm:py-4">
        <a
          href="#top"
          className="min-w-0 font-display text-base font-semibold leading-none tracking-tight text-forest sm:text-xl"
        >
          Capital City
          <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-stone sm:tracking-[0.22em]">
            Grooming &amp; Supply
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <a
            href={business.phoneHref}
            className="hidden min-h-11 items-center font-mono text-sm text-forest transition-colors hover:text-brass md:inline-flex"
          >
            {business.phoneDisplay}
          </a>
          <a
            href="#book"
            aria-label="Book an Appointment"
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-brass px-4 py-3 font-mono text-[11px] font-medium uppercase tracking-wider text-paper transition-colors hover:bg-[color-mix(in_srgb,var(--brass)_88%,black)] sm:px-5 sm:text-xs"
          >
            <span className="sm:hidden">Book</span>
            <span className="hidden sm:inline">Book an Appointment</span>
          </a>
        </div>
      </div>
    </header>
  );
}
