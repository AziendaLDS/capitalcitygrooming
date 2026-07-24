import { business } from "@/lib/business";

const facebookHref =
  "https://www.facebook.com/p/Capital-City-Grooming-Supply-100057082555749/";

function FacebookIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.52 1.49-3.91 3.78-3.91 1.09 0 2.24.2 2.24.2v2.48h-1.26c-1.24 0-1.63.78-1.63 1.57v1.88h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer bg-forest text-paper">
      <div className="mx-auto max-w-content px-4 py-6 sm:px-6 sm:py-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-display text-xl font-semibold leading-tight sm:text-2xl">
              Capital City
              <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.22em] text-paper/75">
                Grooming &amp; Supply
              </span>
            </p>
            <address className="mt-2 not-italic font-mono text-sm leading-relaxed text-paper/85">
              <a
                href={business.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-1 transition-colors hover:text-brass"
              >
                {business.address.line1}
                <br />
                {business.address.cityStateZip}
              </a>
            </address>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4">
            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Capital City Grooming & Supply on Facebook"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-paper/25 text-paper transition-colors hover:border-brass hover:text-brass"
            >
              <FacebookIcon />
            </a>
            <a
              href={business.phoneHref}
              className="inline-flex min-h-11 flex-1 items-center justify-center rounded-lg bg-brass px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider text-paper transition-colors hover:bg-[color-mix(in_srgb,var(--brass)_88%,white)] sm:flex-none"
            >
              Call {business.phoneDisplay}
            </a>
          </div>
        </div>

        <p className="mt-6 border-t border-paper/20 pt-4 font-mono text-xs text-paper/70">
          © {year} Capital City Grooming &amp; Supply · Olympia, WA
        </p>
      </div>
    </footer>
  );
}
