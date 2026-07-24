"use client";

import { useEffect, useId, useRef, useState } from "react";
import reviewsData from "@/data/reviews.json";
import { business } from "@/lib/business";
import CarouselViewport from "@/components/CarouselViewport";
import {
  useCarouselStep,
  useVisibleCount,
} from "@/lib/useCarouselStep";

type Review = { quote: string; name: string; rating: number };

const reviews = reviewsData as Review[];

function formatAttributionName(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return name;

  const capitalize = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

  if (parts.length === 1) {
    return capitalize(parts[0]);
  }

  const first = capitalize(parts[0]);
  const lastInitial = parts[parts.length - 1].charAt(0).toUpperCase();
  return `${first} ${lastInitial}.`;
}

function Stars({ rating }: { rating: number }) {
  const full = Math.round(rating);
  return (
    <span
      className="inline-flex gap-1"
      role="img"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 20 20"
          aria-hidden="true"
          className={i < full ? "fill-brass" : "fill-forest/15"}
        >
          <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const [expanded, setExpanded] = useState(false);
  const [showToggle, setShowToggle] = useState(false);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const quoteId = useId();

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    const checkTruncation = () => {
      if (expanded) {
        setShowToggle(true);
        return;
      }
      setShowToggle(el.scrollHeight > el.clientHeight + 1);
    };

    checkTruncation();
    const observer = new ResizeObserver(checkTruncation);
    observer.observe(el);
    return () => observer.disconnect();
  }, [review.quote, expanded]);

  return (
    <article className="flex h-full min-w-0 flex-col rounded-xl border border-forest/10 bg-paper p-5 sm:p-6">
      <Stars rating={review.rating} />

      <blockquote
        ref={quoteRef}
        id={quoteId}
        className={`mt-4 whitespace-pre-line break-words font-body text-base leading-relaxed text-forest ${
          expanded ? "" : "line-clamp-5"
        }`}
      >
        {review.quote}
      </blockquote>

      <div className="mt-2 min-h-5">
        {showToggle && (
          <button
            type="button"
            onClick={() => setExpanded((open) => !open)}
            aria-expanded={expanded}
            aria-controls={quoteId}
            className="font-mono text-xs font-medium uppercase tracking-wider text-brass transition-colors hover:text-forest"
          >
            {expanded ? "Read less" : "Read more"}
          </button>
        )}
      </div>

      <p className="mt-auto pt-4 font-mono text-sm text-stone">
        {formatAttributionName(review.name)}
      </p>
    </article>
  );
}

function ArrowButton({
  direction,
  onClick,
  label,
  controls,
  disabled = false,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  label: string;
  controls: string;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-controls={controls}
      aria-label={label}
      className="inline-flex h-11 w-11 shrink-0 items-center justify-center self-center rounded-full border border-forest/30 bg-paper text-forest transition-colors hover:border-forest hover:bg-forest/5 disabled:pointer-events-none disabled:opacity-40"
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

export default function Reviews() {
  const labelId = useId();
  const visibleCount = useVisibleCount({ base: 1, md: 2 });
  const { index, slide, isAnimating, goPrev, goNext, touchHandlers } =
    useCarouselStep(reviews.length);

  return (
    <section
      id="reviews"
      aria-labelledby="reviews-heading"
      className="border-y border-forest/10"
    >
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-16">
        <div className="mb-8 sm:mb-10">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-brass">
            Word of Mouth
          </p>
          <h2
            id="reviews-heading"
            className="mt-2 font-display text-2xl font-semibold text-forest sm:text-3xl md:text-4xl"
          >
            What Olympia Says
          </h2>
          <p className="mt-4 inline-flex items-center gap-1.5 font-mono text-sm text-stone">
            <span className="inline-flex items-center gap-1">
              {business.rating.stars}
              <svg
                width="14"
                height="14"
                viewBox="0 0 20 20"
                aria-hidden="true"
                className="fill-brass"
              >
                <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L10 14.77l-5.2 2.73.99-5.79L1.58 7.62l5.82-.85L10 1.5z" />
              </svg>
            </span>
            <span aria-hidden="true">·</span>
            <span>{business.rating.count} Google Reviews</span>
          </p>
        </div>

        {reviews.length === 0 ? (
          <p className="font-body text-sm text-stone">
            Reviews will appear here once{" "}
            <code className="font-mono">data/reviews.json</code> is populated.
          </p>
        ) : (
          <div className="flex items-stretch gap-2 sm:gap-4">
            <ArrowButton
              direction="prev"
              onClick={goPrev}
              label="Previous review"
              controls={labelId}
              disabled={isAnimating}
            />
            <CarouselViewport
              items={reviews}
              index={index}
              slide={slide}
              visibleCount={visibleCount}
              labelId={labelId}
              ariaLabel="Customer reviews"
              gridClassName="grid-cols-1 items-stretch gap-4 md:grid-cols-2 md:gap-6"
              statusText={`Showing review ${(slide?.toIndex ?? index) + 1} of ${reviews.length}`}
              touchHandlers={touchHandlers}
              getItemKey={(review, itemIndex) =>
                `${review.name}-${itemIndex}`
              }
              renderItem={(review) => <ReviewCard review={review} />}
            />
            <ArrowButton
              direction="next"
              onClick={goNext}
              label="Next review"
              controls={labelId}
              disabled={isAnimating}
            />
          </div>
        )}
      </div>
    </section>
  );
}
