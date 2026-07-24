"use client";

import { useId } from "react";
import Image from "next/image";
import { useCarouselStep } from "@/lib/useCarouselStep";

const photos = [
  {
    src: "/images/work-1.png",
    alt: "Before and after grooming: a brown Poodle and a white West Highland Terrier",
  },
  {
    src: "/images/work-2.png",
    alt: "A freshly groomed schnauzer-mix wearing a red bandana",
  },
  {
    src: "/images/work-3.png",
    alt: "A small dog in a pink harness with a purple flower collar",
  },
  {
    src: "/images/work-4.png",
    alt: "A terrier-mix in a stars-and-stripes bandana at the shop",
  },
  {
    src: "/images/work-5.png",
    alt: "A Pomeranian in a plaid bandana, groomer working in the background",
  },
  {
    src: "/images/work-6.png",
    alt: "A Samoyed being lathered up in the wash tub",
  },
  {
    src: "/images/table-2.png",
    alt: "A small black curly-coated dog in a blue collar sitting on the grooming table",
  },
  {
    src: "/images/table-3.png",
    alt: "A tricolor doodle in a blue Easter-print bandana after a groom",
  },
  {
    src: "/images/table-4.png",
    alt: "A groomer showing soapy hands beside a wet black dog in the wash tub",
  },
  {
    src: "/images/table-5.png",
    alt: "A small tan dog in a taco-print bandana on the grooming table",
  },
  {
    src: "/images/table-6.png",
    alt: "A wet black dog with its tongue out during a bath",
  },
  {
    src: "/images/table-7.png",
    alt: "A red-tri Australian Shepherd with a freshly brushed coat",
  },
  {
    src: "/images/table-8.png",
    alt: "A small white dog held after a fresh groom",
  },
  {
    src: "/images/table-9.png",
    alt: "A soapy Pomeranian looking up from the wash tub",
  },
];

const VISIBLE = 3;

function wrapSlice<T>(items: T[], start: number, count: number): T[] {
  if (items.length === 0) return [];
  return Array.from(
    { length: Math.min(count, items.length) },
    (_, i) => items[(start + i) % items.length],
  );
}

function ArrowButton({
  direction,
  onClick,
  label,
  controls,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  controls: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-controls={controls}
      aria-label={label}
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-forest/30 bg-paper text-forest transition-colors hover:border-forest hover:bg-forest/5"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        aria-hidden="true"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
      >
        {direction === "prev" ? (
          <path d="M10 3L5 8l5 5" strokeLinecap="round" strokeLinejoin="round" />
        ) : (
          <path d="M6 3l5 5-5 5" strokeLinecap="round" strokeLinejoin="round" />
        )}
      </svg>
    </button>
  );
}

export default function Gallery() {
  const labelId = useId();
  const { index, panelClass, goPrev, goNext } = useCarouselStep(photos.length);
  const visible = wrapSlice(photos, index, VISIBLE);

  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-16"
    >
      <div className="mb-10">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
          On the Table
        </p>
        <h2
          id="gallery-heading"
          className="mt-2 font-display text-3xl font-semibold text-forest sm:text-4xl"
        >
          Recent Visits
        </h2>
      </div>

      <div className="flex items-stretch gap-2 sm:gap-4">
        <ArrowButton
          direction="prev"
          onClick={goPrev}
          label="Previous photo"
          controls={labelId}
        />
        <div
          id={labelId}
          className={`${panelClass} grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-3`}
          aria-roledescription="carousel"
          aria-label="Recent grooming photos"
        >
          <p className="sr-only" aria-live="polite">
            Showing photo {index + 1} of {photos.length}
          </p>
          {visible.map((photo, i) => (
            <div
              key={`${photo.src}-${(index + i) % photos.length}`}
              className="relative aspect-square overflow-hidden rounded-xl border border-forest/10"
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(max-width: 640px) 100vw, 33vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
        <ArrowButton
          direction="next"
          onClick={goNext}
          label="Next photo"
          controls={labelId}
        />
      </div>
    </section>
  );
}
