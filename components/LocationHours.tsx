import Image from "next/image";
import { business } from "@/lib/business";

// Coordinate embed (no place-card popup) + hl=en for English UI.
const mapsEmbedSrc =
  "https://www.google.com/maps?q=47.0462967,-122.8780019&z=16&hl=en&output=embed";

export default function LocationHours() {
  return (
    <section
      id="location"
      aria-labelledby="location-heading"
      className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-16"
    >
      <div className="mb-8 sm:mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
          Find Us
        </p>
        <h2
          id="location-heading"
          className="mt-2 font-display text-2xl font-semibold text-forest sm:text-3xl md:text-4xl"
        >
          Location &amp; Hours
        </h2>
      </div>

      {/*
        Mobile order (via display:contents + order):
          address → door → maps button → map → hours
        Desktop: left = address + button + map; right = door + hours
      */}
      <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-stretch lg:gap-x-16">
        <div className="contents lg:flex lg:flex-col lg:gap-4">
          <div className="order-1 lg:order-none">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-stone">
              Address
            </h3>
            <a
              href={business.mapsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block font-mono text-base leading-relaxed text-forest transition-colors hover:text-brass"
            >
              {business.address.line1}
              <br />
              {business.address.cityStateZip}
            </a>
            <p className="mt-2 font-body text-sm text-stone">
              Entry is at the back door.
              <br />
              The parking lot is off the alley.
              <br />
              Look for the purple door with the Capital City sign.
            </p>
          </div>

          <a
            href={business.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="order-3 inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-forest/40 px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider text-forest transition-colors hover:border-forest hover:bg-forest/5 sm:w-fit lg:order-none"
          >
            Open in Google Maps
          </a>

          <div className="relative order-4 aspect-[4/3] w-full overflow-hidden rounded-xl border border-forest/10 lg:order-none">
            <iframe
              title="Capital City Grooming & Supply on Google Maps"
              src={mapsEmbedSrc}
              className="absolute inset-0 h-full w-full border-0"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>

        <div className="contents lg:flex lg:h-full lg:flex-col lg:gap-4">
          <div className="relative order-2 aspect-[4/3] w-full min-h-0 overflow-hidden rounded-xl border border-forest/10 lg:order-none lg:aspect-auto lg:flex-1">
            <Image
              src="/images/storefront.png"
              alt="Purple back door of Capital City Grooming & Supply with the shop sign and Yes We're Open sign"
              fill
              sizes="(max-width: 1024px) 90vw, 45vw"
              className="object-cover object-[center_35%]"
              loading="lazy"
            />
          </div>

          <div className="order-5 lg:order-none">
            <h3 className="font-mono text-xs uppercase tracking-[0.22em] text-stone">
              Hours
            </h3>
            <table className="mt-2 w-full max-w-sm border-collapse font-mono text-sm">
              <caption className="sr-only">
                Shop hours for Capital City Grooming &amp; Supply
              </caption>
              <tbody>
                {business.hours.map((row) => {
                  const closed = row.time === "Closed";
                  return (
                    <tr key={row.day} className="border-b border-forest/10">
                      <th
                        scope="row"
                        className="py-2.5 text-left font-medium text-forest"
                      >
                        {row.day}
                      </th>
                      <td
                        className={`py-2.5 text-right ${
                          closed ? "text-stone" : "text-forest"
                        }`}
                      >
                        {row.time}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
