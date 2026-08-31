"use client";

import { useRef, type PointerEvent } from "react";
import { useRouter } from "next/navigation";
import { Monogram } from "@/components/site/Monogram";
import { useAdmin } from "./AdminProvider";

const HOLD_MS = 5000;
const MOVE_PX = 12;

export function SecretAdminHotspot({ light = false }: { light?: boolean }) {
  const router = useRouter();
  const { setOpen, setStoryOpen } = useAdmin();
  const timer = useRef<number | null>(null);
  const start = useRef<{ x: number; y: number } | null>(null);
  const unlocked = useRef(false);

  function clearTimer() {
    if (timer.current != null) {
      window.clearTimeout(timer.current);
      timer.current = null;
    }
  }

  function onPointerDown(event: PointerEvent<HTMLButtonElement>) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    unlocked.current = false;
    start.current = { x: event.clientX, y: event.clientY };
    clearTimer();
    timer.current = window.setTimeout(() => {
      unlocked.current = true;
      timer.current = null;
      setStoryOpen(false);
      setOpen(true);
      if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(25);
    }, HOLD_MS);
  }

  function onPointerMove(event: PointerEvent<HTMLButtonElement>) {
    if (!start.current) return;
    const dx = event.clientX - start.current.x;
    const dy = event.clientY - start.current.y;
    if (dx * dx + dy * dy > MOVE_PX * MOVE_PX) clearTimer();
  }

  function onPointerUp() {
    const shouldGoHome = !unlocked.current && timer.current != null;
    clearTimer();
    start.current = null;
    if (shouldGoHome) router.push("/");
  }

  return (
    <button
      type="button"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={clearTimer}
      onContextMenu={(event) => event.preventDefault()}
      className="select-none touch-manipulation [-webkit-touch-callout:none]"
      aria-label="Austin and Alexa home"
    >
      <Monogram size="sm" light={light} />
    </button>
  );
}
