import Image from "next/image";
import { business } from "@/lib/business";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="mx-auto max-w-content px-4 pb-10 pt-10 sm:px-6 sm:pb-16 sm:pt-16"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
            {/* FLAG: founding year unknown - omit EST. until confirmed with client */}
            Olympia, Washington
          </p>

          <h1
            id="hero-heading"
            className="mt-4 font-display text-4xl font-bold leading-[1.05] text-forest sm:text-5xl lg:text-6xl"
          >
            The Capital&rsquo;s Grooming &amp; Supply Shop
          </h1>

          <p className="mt-6 max-w-xl font-body text-base leading-relaxed text-stone sm:text-lg">
            Now under new ownership: same Olympia location, renewed standards.
            Clean cuts, honest work, and the supplies to keep your dog or cat
            sharp between visits.
          </p>

          <p className="mt-4 font-mono text-sm text-stone">
            {business.rating.stars}
            <span aria-hidden="true" className="text-brass">
              ★
            </span>{" "}
            · {business.rating.count} Google Reviews
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={business.phoneHref}
              className="inline-flex items-center justify-center rounded-lg bg-brass px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider text-paper transition-colors hover:bg-[color-mix(in_srgb,var(--brass)_88%,black)]"
            >
              Call {business.phoneDisplay}
            </a>
            <a
              href={business.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg border border-forest/30 px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider text-forest transition-colors hover:border-forest hover:bg-forest/5"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] max-h-[520px] overflow-hidden rounded-2xl border border-forest/10 bg-[color-mix(in_srgb,var(--stone)_18%,var(--paper))] sm:max-h-none">
            <Image
              src="/images/hero.png"
              alt="A happy dog on the grooming table at Capital City Grooming & Supply in Olympia, Washington"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
