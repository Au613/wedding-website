"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { galleryPhotos } from "@/data/galleryPhotos";
import { cn } from "@/lib/utils";

type CardKind = "photo" | "title" | "pattern" | "date" | "number";

type ScatterNode = {
  nx: number;
  ny: number;
  scale: number;
  aspect: number;
  kind: CardKind;
  title?: string;
};

const NODES: ScatterNode[] = [
  { nx: -0.34, ny: -0.3, scale: 1.02, aspect: 1.48, kind: "photo" },
  { nx: 0.04, ny: -0.04, scale: 1.18, aspect: 1.55, kind: "title", title: "AUSTIN & ALEXA" },
  { nx: 0.4, ny: -0.26, scale: 0.86, aspect: 1.42, kind: "photo" },
  { nx: -0.1, ny: 0.3, scale: 0.98, aspect: 0.78, kind: "photo" },
  { nx: 0.34, ny: 0.24, scale: 0.9, aspect: 1.46, kind: "date" },
  { nx: -0.44, ny: 0.1, scale: 0.72, aspect: 1.38, kind: "pattern" },
  { nx: 0.22, ny: 0.4, scale: 0.74, aspect: 1.36, kind: "photo" },
  { nx: -0.26, ny: 0.44, scale: 0.64, aspect: 1.4, kind: "number" },
  { nx: 0.48, ny: 0.04, scale: 0.7, aspect: 0.8, kind: "photo" },
  { nx: -0.06, ny: -0.44, scale: 0.68, aspect: 1.5, kind: "photo" },
  { nx: 0.18, ny: -0.38, scale: 0.6, aspect: 1.32, kind: "pattern" },
  { nx: -0.48, ny: -0.12, scale: 0.66, aspect: 0.82, kind: "photo" },
];

const LAYERS = 5;
const LAYER_DEPTH = 420;

function wrap(value: number, length: number) {
  return ((value % length) + length) % length;
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

function FlowerMark({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none absolute", className)} aria-hidden>
      {[0, 72, 144, 216, 288].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cream/75"
          style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-10px)` }}
        />
      ))}
    </div>
  );
}

function ScatterFace({
  kind,
  photoIndex,
  title,
  priority,
}: {
  kind: CardKind;
  photoIndex: number;
  title?: string;
  priority?: boolean;
}) {
  const photo = galleryPhotos[photoIndex % galleryPhotos.length];

  if (kind === "title") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center bg-[#16110f] px-6 text-center">
        <p className="text-[0.65rem] uppercase tracking-[0.32em] text-gold-pale">October 12, 2026</p>
        <p className="mt-3 font-sans text-3xl font-medium uppercase tracking-[0.18em] text-cream-soft md:text-4xl">
          {title ?? "Austin & Alexa"}
        </p>
      </div>
    );
  }

  if (kind === "pattern") {
    return (
      <div className="relative h-full w-full bg-[#2a1c22]">
        <FlowerMark className="inset-0" />
        <p className="absolute bottom-4 left-4 font-sans text-xs uppercase tracking-[0.22em] text-cream/80">1 Cheshvan 5787</p>
      </div>
    );
  }

  if (kind === "number") {
    return (
      <div className="flex h-full w-full flex-col justify-between bg-[#1c1612] p-5">
        <p className="font-sans text-[0.65rem] uppercase tracking-[0.28em] text-gold-pale">Frame</p>
        <p className="font-sans text-5xl font-medium tracking-[0.08em] text-cream-soft">
          {String((photoIndex % galleryPhotos.length) + 1).padStart(4, "0")}
        </p>
        <p className="text-sm text-cream/70">{photo.caption}</p>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full bg-cream-deep">
      <Image
        src={photo.src}
        alt={photo.alt}
        fill
        sizes="40vw"
        priority={priority}
        className="object-cover"
        draggable={false}
      />
      {kind === "date" ? (
        <p className="absolute bottom-4 left-4 font-sans text-sm uppercase tracking-[0.22em] text-cream-soft drop-shadow">
          2026 Oct
        </p>
      ) : null}
    </div>
  );
}

export function PhotoTotem({
  variant = "section",
}: {
  variant?: "section" | "full";
}) {
  const reduced = usePrefersReducedMotion();
  const labelId = useId();
  const sceneRef = useRef<HTMLDivElement>(null);
  const travel = useRef(40);
  const pan = useRef({ x: 0, y: 0 });
  const velocity = useRef(0.55);
  const dragging = useRef(false);
  const dragOrigin = useRef({ x: 0, y: 0, travel: 0, panX: 0, panY: 0 });
  const [render, setRender] = useState({ travel: 40, panX: 0, panY: 0, w: 900, h: 640 });

  const cycle = LAYERS * LAYER_DEPTH;

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setRender((current) => ({ ...current, w: Math.max(320, rect.width), h: Math.max(320, rect.height) }));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    const tick = () => {
      if (!dragging.current) {
        travel.current += velocity.current;
        pan.current.x += (0 - pan.current.x) * 0.04;
        pan.current.y += (0 - pan.current.y) * 0.04;
      }
      travel.current = wrap(travel.current, cycle);
      setRender((current) => ({
        ...current,
        travel: travel.current,
        panX: pan.current.x,
        panY: pan.current.y,
      }));
      raf = window.requestAnimationFrame(tick);
    };
    raf = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(raf);
  }, [cycle, reduced]);

  const nudge = useCallback(
    (delta: number) => {
      travel.current = wrap(travel.current + delta, cycle);
    },
    [cycle],
  );

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || reduced) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      velocity.current = 0.25;
      nudge(event.deltaY * 0.9);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [nudge, reduced]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    dragOrigin.current = {
      x: event.clientX,
      y: event.clientY,
      travel: travel.current,
      panX: pan.current.x,
      panY: pan.current.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const dx = event.clientX - dragOrigin.current.x;
    const dy = event.clientY - dragOrigin.current.y;
    pan.current.x = dragOrigin.current.panX + dx * 0.55;
    pan.current.y = dragOrigin.current.panY + dy * 0.55;
    travel.current = wrap(dragOrigin.current.travel + dy * 0.65, cycle);
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight") {
      event.preventDefault();
      nudge(90);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-90);
    }
  };

  const cards = Array.from({ length: LAYERS }, (_, layer) =>
    NODES.map((node, index) => ({ node, layer, index })),
  ).flat();

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black",
        variant === "full" ? "flex min-h-0 flex-1 flex-col" : "h-[min(80vh,46rem)]",
        variant === "section" && "rounded-card",
      )}
    >
      <p id={labelId} className="sr-only">
        Parallel photo cards floating in space. Scroll or drag to move through photos of Austin and Alexa.
      </p>
      <div
        ref={sceneRef}
        role="region"
        aria-labelledby={labelId}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
        className="relative h-full min-h-0 w-full flex-1 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
        style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
      >
        {reduced ? (
          <div className="relative h-full overflow-hidden">
            {galleryPhotos.slice(0, 8).map((photo, index) => (
              <div
                key={photo.src}
                className="absolute overflow-hidden rounded-2xl border border-white/10"
                style={{
                  width: `${38 - index * 2}%`,
                  height: `${34 - index}%`,
                  left: `${8 + (index % 4) * 18}%`,
                  top: `${6 + Math.floor(index / 2) * 16}%`,
                  zIndex: 8 - index,
                }}
              >
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate3d(${render.panX}px, ${render.panY}px, ${render.travel}px)`,
            }}
          >
            {cards.map(({ node, layer, index }) => {
              const z = -layer * LAYER_DEPTH;
              const worldZ = z + render.travel;
              if (worldZ > 220 || worldZ < -LAYER_DEPTH * 3.2) return null;
              const angle = layer * 0.55;
              const cos = Math.cos(angle);
              const sin = Math.sin(angle);
              const nx = node.nx * cos - node.ny * sin;
              const ny = node.nx * sin + node.ny * cos;
              const x = nx * render.w * 0.52;
              const y = ny * render.h * 0.5;
              const width = Math.min(render.w, render.h) * 0.28 * node.scale;
              const height = width / node.aspect;
              const photoIndex = (layer * NODES.length + index) % galleryPhotos.length;
              const fade = worldZ > 80 ? Math.max(0, 1 - (worldZ - 80) / 140) : worldZ < -900 ? Math.max(0, 1 + (worldZ + 900) / 200) : 1;
              return (
                <article
                  key={`${layer}-${index}`}
                  className="absolute overflow-hidden rounded-[1.15rem] border border-white/10 bg-[#16110f] shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
                  style={{
                    width,
                    height,
                    left: -width / 2,
                    top: -height / 2,
                    transform: `translate3d(${x}px, ${y}px, ${z}px)`,
                    opacity: fade,
                    zIndex: Math.round(worldZ + 2000),
                  }}
                >
                  <ScatterFace
                    kind={node.kind}
                    photoIndex={photoIndex}
                    title={node.title}
                    priority={layer === 0 && index < 4}
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>
      <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.22em] text-cream/60">
        Scroll or drag to move through
      </p>
    </section>
  );
}
