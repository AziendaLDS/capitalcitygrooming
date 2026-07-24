"use client";

import type { ReactNode, TouchEvent } from "react";
import { wrapSlice, type Slide } from "@/lib/useCarouselStep";

type CarouselViewportProps<T> = {
  items: T[];
  index: number;
  slide: Slide | null;
  visibleCount: number;
  labelId: string;
  ariaLabel: string;
  gridClassName: string;
  statusText: string;
  touchHandlers: {
    onTouchStart: (event: TouchEvent) => void;
    onTouchEnd: (event: TouchEvent) => void;
  };
  renderItem: (item: T, itemIndex: number) => ReactNode;
  getItemKey: (item: T, itemIndex: number) => string;
};

export default function CarouselViewport<T>({
  items,
  index,
  slide,
  visibleCount,
  labelId,
  ariaLabel,
  gridClassName,
  statusText,
  touchHandlers,
  renderItem,
  getItemKey,
}: CarouselViewportProps<T>) {
  const displayIndex = slide?.toIndex ?? index;
  const visible = wrapSlice(items, displayIndex, visibleCount);
  const exiting = slide
    ? wrapSlice(items, slide.fromIndex, visibleCount)
    : null;

  const exitClass =
    slide?.direction === 1
      ? "carousel-slide-exit-next"
      : "carousel-slide-exit-prev";
  const enterClass =
    slide?.direction === 1
      ? "carousel-slide-enter-next"
      : "carousel-slide-enter-prev";

  return (
    <div
      className="relative min-w-0 flex-1 touch-pan-y overflow-hidden"
      {...touchHandlers}
    >
      <div
        id={labelId}
        className={`grid ${gridClassName} ${slide ? "invisible" : ""}`}
        aria-roledescription="carousel"
        aria-label={ariaLabel}
        aria-hidden={slide ? true : undefined}
      >
        <p className="sr-only" aria-live="polite">
          {statusText}
        </p>
        {visible.map((item, i) => (
          <div key={getItemKey(item, (displayIndex + i) % items.length)}>
            {renderItem(item, (displayIndex + i) % items.length)}
          </div>
        ))}
      </div>

      {slide && exiting && (
        <>
          <div
            className={`carousel-slide-layer absolute inset-0 grid ${gridClassName} ${exitClass}`}
            aria-hidden="true"
          >
            {exiting.map((item, i) => (
              <div
                key={`exit-${getItemKey(item, (slide.fromIndex + i) % items.length)}`}
              >
                {renderItem(item, (slide.fromIndex + i) % items.length)}
              </div>
            ))}
          </div>
          <div
            className={`carousel-slide-layer absolute inset-0 grid ${gridClassName} ${enterClass}`}
            aria-roledescription="carousel"
            aria-label={ariaLabel}
          >
            <p className="sr-only" aria-live="polite">
              {statusText}
            </p>
            {visible.map((item, i) => (
              <div
                key={`enter-${getItemKey(item, (displayIndex + i) % items.length)}`}
              >
                {renderItem(item, (displayIndex + i) % items.length)}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
