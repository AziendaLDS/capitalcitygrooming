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
      <div className="mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
          Find Us
        </p>
        <h2
          id="location-heading"
          className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl"
        >
          Location &amp; Hours
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-x-16 gap-y-6 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <div>
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
              Entry is at the back door. The parking lot is off the alley.
              <br />
              Look for the purple door with the Capital City sign.
            </p>
          </div>

          <a
            href={business.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center rounded-lg border border-forest/40 px-6 py-4 font-mono text-sm font-medium uppercase tracking-wider text-forest transition-colors hover:border-forest hover:bg-forest/5 sm:w-fit"
          >
            Open in Google Maps
          </a>

          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-forest/10">
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

        <div className="flex flex-col gap-4">
          <div className="relative aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-forest/10">
            <Image
              src="/images/storefront.png"
              alt="Purple back door of Capital City Grooming & Supply with the shop sign and Yes We're Open sign"
              fill
              sizes="(max-width: 1024px) 90vw, 380px"
              className="object-cover object-[center_35%]"
              loading="lazy"
            />
          </div>

          <div>
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
                        className="py-2 text-left font-medium text-forest"
                      >
                        {row.day}
                      </th>
                      <td
                        className={`py-2 text-right ${
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
