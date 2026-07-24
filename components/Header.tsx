import { business } from "@/lib/business";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-content items-center justify-between gap-2 px-4 py-4 sm:gap-4 sm:px-6">
        <a
          href="#top"
          className="min-w-0 font-display text-base font-semibold leading-none tracking-tight text-forest sm:text-xl"
        >
          Capital City
          <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.18em] text-stone sm:tracking-[0.22em]">
            Grooming &amp; Supply
          </span>
        </a>

        <div className="flex shrink-0 items-center gap-2 sm:gap-4">
          <a
            href={business.phoneHref}
            className="hidden font-mono text-sm text-forest transition-colors hover:text-brass md:inline"
          >
            {business.phoneDisplay}
          </a>
          <a
            href="#book"
            aria-label="Book an Appointment"
            className="rounded-lg bg-brass px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-wider text-paper transition-colors hover:bg-[color-mix(in_srgb,var(--brass)_88%,black)] sm:text-xs"
          >
            Book<span className="hidden sm:inline"> an Appointment</span>
          </a>
        </div>
      </div>
    </header>
  );
}
