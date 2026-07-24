import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="border-y border-forest/10"
    >
      <div className="mx-auto grid max-w-content items-center gap-10 px-4 py-10 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-16">
        <div className="overflow-hidden rounded-2xl border border-forest/10">
          <Image
            src="/images/about.png"
            alt="A groomer at Capital City Grooming & Supply with a calm black Labrador in the shop"
            width={414}
            height={414}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="h-auto w-full"
          />
        </div>

        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
            The Shop
          </p>
          <h2
            id="about-heading"
            className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl"
          >
            Part grooming table, part supply counter
          </h2>
          {/* FLAG: owner name and first-person voice to be added once the client
              engages. Older Google reviews reference prior groomer Dawn - expected
              given the confirmed ownership change. */}
          <div className="mt-6 space-y-4 font-body text-base leading-relaxed text-stone">
            <p>
              Capital City Grooming &amp; Supply sits on 4th Ave E in Olympia, on
              the working end of Washington&rsquo;s capital. Now under new
              ownership at the same address, with renewed standards from
              International Certified Master Groomers. Same careful, calm
              handling regulars have counted on for years.
            </p>
            <p>
              It&rsquo;s a grooming table and a supply counter under one roof: a
              clean cut when your dog needs it, and the brushes, shampoo, and
              odds and ends to keep the coat right between visits.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
