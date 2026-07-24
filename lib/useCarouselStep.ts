"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

type Slide = {
  fromIndex: number;
  toIndex: number;
  direction: 1 | -1;
};

export type { Slide };

export const SLIDE_DURATION_MS = 560;
const SWIPE_THRESHOLD_PX = 40;

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function wrapSlice<T>(items: T[], start: number, count: number): T[] {
  if (items.length === 0) return [];
  return Array.from(
    { length: Math.min(count, items.length) },
    (_, i) => items[(start + i) % items.length],
  );
}

/**
 * Step-by-one carousel index with a horizontal slide transition.
 * Honors prefers-reduced-motion by swapping instantly.
 */
export function useCarouselStep(length: number) {
  const [index, setIndex] = useState(0);
  const [slide, setSlide] = useState<Slide | null>(null);
  const busy = useRef(false);
  const indexRef = useRef(index);
  const touchStartX = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  indexRef.current = index;

  useEffect(() => {
    return () => {
      if (timeoutRef.current != null) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const step = useCallback(
    (direction: 1 | -1) => {
      // Ignore rapid clicks / swipes while a slide is in progress
      if (busy.current || length < 2) return;

      const fromIndex = indexRef.current;
      const toIndex = (fromIndex + direction + length) % length;

      if (prefersReducedMotion()) {
        setIndex(toIndex);
        return;
      }

      busy.current = true;
      setSlide({ fromIndex, toIndex, direction });

      timeoutRef.current = window.setTimeout(() => {
        setIndex(toIndex);
        setSlide(null);
        busy.current = false;
        timeoutRef.current = null;
      }, SLIDE_DURATION_MS);
    },
    [length],
  );

  const goPrev = useCallback(() => step(-1), [step]);
  const goNext = useCallback(() => step(1), [step]);

  const onTouchStart = useCallback((event: TouchEvent) => {
    if (busy.current) return;
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (busy.current || touchStartX.current == null) return;
      const endX = event.changedTouches[0]?.clientX;
      const startX = touchStartX.current;
      touchStartX.current = null;
      if (endX == null) return;

      const dx = endX - startX;
      if (Math.abs(dx) < SWIPE_THRESHOLD_PX) return;
      if (dx < 0) goNext();
      else goPrev();
    },
    [goNext, goPrev],
  );

  return {
    index,
    slide,
    isAnimating: slide !== null,
    goPrev,
    goNext,
    touchHandlers: {
      onTouchStart,
      onTouchEnd,
    },
  };
}

type VisibleCounts = {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
};

/**
 * Matches Tailwind breakpoints so carousel item counts track the grid.
 */
export function useVisibleCount({ base, sm, md, lg }: VisibleCounts) {
  const [count, setCount] = useState(base);

  useEffect(() => {
    const queries: { mq: MediaQueryList; value: number }[] = [];
    if (lg != null) {
      queries.push({
        mq: window.matchMedia("(min-width: 1024px)"),
        value: lg,
      });
    }
    if (md != null) {
      queries.push({
        mq: window.matchMedia("(min-width: 768px)"),
        value: md,
      });
    }
    if (sm != null) {
      queries.push({
        mq: window.matchMedia("(min-width: 640px)"),
        value: sm,
      });
    }

    const update = () => {
      for (const { mq, value } of queries) {
        if (mq.matches) {
          setCount(value);
          return;
        }
      }
      setCount(base);
    };

    update();
    for (const { mq } of queries) {
      mq.addEventListener("change", update);
    }
    return () => {
      for (const { mq } of queries) {
        mq.removeEventListener("change", update);
      }
    };
  }, [base, sm, md, lg]);

  return count;
}
