"use client";

import { useEffect, useRef } from "react";

export function useScrollCurrentIntoView(
  currentId: string | undefined,
  options?: { block?: ScrollLogicalPosition; inline?: ScrollLogicalPosition },
) {
  const ref = useRef<HTMLLIElement | null>(null);
  const block = options?.block ?? "center";
  const inline = options?.inline ?? "center";

  useEffect(() => {
    if (!currentId) return;
    const frame = window.requestAnimationFrame(() => {
      const node = ref.current;
      if (!node) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      node.scrollIntoView({
        behavior: reduce ? "auto" : "smooth",
        block,
        inline,
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [block, currentId, inline]);

  return ref;
}
