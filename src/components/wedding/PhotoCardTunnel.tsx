"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { galleryPhotos } from "@/data/galleryPhotos";
import { GalleryFace } from "@/components/wedding/GalleryFace";
import { cn } from "@/lib/utils";

type Wall = "left" | "right" | "top" | "bottom";

const WALLS: Wall[] = ["left", "right", "top", "bottom"];
const RING_COPIES = 6;

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

function wallTransform(wall: Wall, tunnelW: number, tunnelH: number) {
  const hx = tunnelW / 2;
  const hy = tunnelH / 2;
  switch (wall) {
    case "left":
      return `translate3d(${-hx}px, 0, 0) rotateY(90deg)`;
    case "right":
      return `translate3d(${hx}px, 0, 0) rotateY(-90deg)`;
    case "top":
      return `translate3d(0, ${-hy}px, 0) rotateX(-90deg)`;
    case "bottom":
      return `translate3d(0, ${hy}px, 0) rotateX(90deg)`;
  }
}

export function PhotoCardTunnel({
  variant = "section",
}: {
  variant?: "section" | "full";
}) {
  const reduced = usePrefersReducedMotion();
  const labelId = useId();
  const sceneRef = useRef<HTMLDivElement>(null);
  const travel = useRef(280);
  const velocity = useRef(1.15);
  const dragging = useRef(false);
  const dragOrigin = useRef({ y: 0, start: 0 });
  const [renderTravel, setRenderTravel] = useState(0);
  const [scene, setScene] = useState({ w: 900, h: 640 });

  const uniqueRings = Math.ceil(galleryPhotos.length / 4);
  const pitch = Math.max(240, Math.min(scene.w, scene.h) * 0.48);
  const cycle = uniqueRings * pitch;
  const tunnelW = scene.w * 0.99;
  const tunnelH = scene.h * 0.99;
  const gap = Math.max(18, Math.min(tunnelW, tunnelH) * 0.045);

  useEffect(() => {
    const node = sceneRef.current;
    if (!node) return;
    const measure = () => {
      const rect = node.getBoundingClientRect();
      setScene({ w: Math.max(320, rect.width), h: Math.max(320, rect.height) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let frame = 0;
    const tick = () => {
      if (!dragging.current) {
        travel.current += velocity.current;
      }
      travel.current = wrap(travel.current, cycle);
      setRenderTravel(travel.current);
      frame = window.requestAnimationFrame(tick);
    };
    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [cycle, reduced]);

  const nudge = useCallback(
    (delta: number) => {
      travel.current = wrap(travel.current + delta, cycle);
      setRenderTravel(travel.current);
    },
    [cycle],
  );

  useEffect(() => {
    const node = sceneRef.current;
    if (!node || reduced) return;
    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      velocity.current = 0.28;
      nudge(event.deltaY * 0.85);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [nudge, reduced]);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    dragging.current = true;
    velocity.current = 0.2;
    dragOrigin.current = { y: event.clientY, start: travel.current };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    const next = dragOrigin.current.start + (event.clientY - dragOrigin.current.y) * 1.35;
    travel.current = wrap(next, cycle);
    setRenderTravel(travel.current);
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
      nudge(pitch);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
      event.preventDefault();
      nudge(-pitch);
    }
  };

  const rings = Array.from({ length: uniqueRings * RING_COPIES }, (_, index) => index);
  const nearIndex = Math.round(renderTravel / pitch);

  return (
    <section
      className={cn(
        "relative overflow-hidden bg-black",
        variant === "full" ? "flex min-h-0 flex-1 flex-col" : "h-[min(80vh,46rem)]",
        variant === "section" && "rounded-card",
      )}
    >
      <p id={labelId} className="sr-only">
        Photo card tunnel. Scroll or swipe to move through photos of Austin and Alexa.
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
        style={{ perspective: "720px", perspectiveOrigin: "50% 50%" }}
      >
        {reduced ? (
          <div className="grid h-full grid-cols-2 gap-2 p-3">
            {galleryPhotos.slice(0, 4).map((photo) => (
              <div key={photo.src + photo.caption} className="relative overflow-hidden rounded-2xl bg-cream-deep">
                <Image src={photo.src} alt={photo.alt} fill className="object-cover" sizes="50vw" />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="absolute left-1/2 top-1/2 h-0 w-0"
            style={{
              transformStyle: "preserve-3d",
              transform: `translateZ(${renderTravel}px)`,
            }}
          >
            <div
              aria-hidden
              className="absolute bg-black"
              style={{
                width: tunnelW,
                height: tunnelH,
                left: -tunnelW / 2,
                top: -tunnelH / 2,
                transform: `translateZ(${-(uniqueRings * RING_COPIES) * pitch}px)`,
              }}
            />
            {rings.map((ring) => {
              const z = -ring * pitch;
              const worldZ = z + renderTravel;
              if (worldZ > 90 || worldZ < -pitch * 9) return null;
              return (
                <div
                  key={ring}
                  className="absolute left-0 top-0 h-0 w-0"
                  style={{ transform: `translateZ(${z}px)`, transformStyle: "preserve-3d" }}
                >
                  {WALLS.map((wall, wallIndex) => {
                    const photo = galleryPhotos[(((ring % uniqueRings) * 4) + wallIndex) % galleryPhotos.length];
                    const side = wall === "left" || wall === "right";
                    const width = side ? pitch - 10 : tunnelW - gap * 2;
                    const height = side ? tunnelH - gap * 2 : pitch - 10;
                    return (
                      <article
                        key={wall}
                        className="absolute overflow-hidden rounded-[1.25rem] bg-cream shadow-[0_0_0_1px_rgba(196,163,106,0.25)]"
                        style={{
                          width,
                          height,
                          left: -width / 2,
                          top: -height / 2,
                          transform: wallTransform(wall, tunnelW, tunnelH),
                          backfaceVisibility: "hidden",
                        }}
                      >
                        <GalleryFace photo={photo} priority={ring < 2} />
                      </article>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_12%,rgba(0,0,0,0.12)_36%,rgba(0,0,0,0.72)_100%)]" />
      </div>
      <p className="pointer-events-none absolute bottom-4 left-1/2 z-10 -translate-x-1/2 text-[0.65rem] uppercase tracking-[0.22em] text-cream/70">
        {wrap(nearIndex, uniqueRings) + 1} / {uniqueRings}
      </p>
    </section>
  );
}
