"use client";

import { useCallback, useRef, useState } from "react";

type Phase = "idle" | "out" | "pre";

/**
 * Step-by-one carousel index with a short exit/enter slide+fade.
 * Honors prefers-reduced-motion by swapping instantly.
 */
export function useCarouselStep(length: number) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [dir, setDir] = useState<1 | -1>(1);
  const busy = useRef(false);

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
    goPrev: () => step(-1),
    goNext: () => step(1),
  };
}
