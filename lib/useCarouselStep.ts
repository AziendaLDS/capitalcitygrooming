"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type TouchEvent,
} from "react";

type Phase = "idle" | "out" | "pre";

const SWIPE_THRESHOLD_PX = 40;

/**
 * Step-by-one carousel index with a short exit/enter slide+fade.
 * Honors prefers-reduced-motion by swapping instantly.
 * Exposes touch handlers for swipe on touch devices.
 */
export function useCarouselStep(length: number) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<1 | -1>(1);
  const busy = useRef(false);
  const touchStartX = useRef<number | null>(null);

  const prefersReducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const step = useCallback(
    (direction: 1 | -1) => {
      if (busy.current || length < 2) return;

      if (prefersReducedMotion()) {
        setIndex((i) => (i + direction + length) % length);
        return;
      }

      busy.current = true;
      setDir(direction);
      setPhase("out");

      window.setTimeout(() => {
        setIndex((i) => (i + direction + length) % length);
        setPhase("pre");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("idle");
            busy.current = false;
          });
        });
      }, 200);
    },
    [length],
  );

  const goPrev = useCallback(() => step(-1), [step]);
  const goNext = useCallback(() => step(1), [step]);

  const onTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  }, []);

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (touchStartX.current == null) return;
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

  const panelClass =
    phase === "out"
      ? dir === 1
        ? "carousel-panel carousel-panel--out-next"
        : "carousel-panel carousel-panel--out-prev"
      : phase === "pre"
        ? dir === 1
          ? "carousel-panel carousel-panel--pre-next"
          : "carousel-panel carousel-panel--pre-prev"
        : "carousel-panel";

  return {
    index,
    panelClass,
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
