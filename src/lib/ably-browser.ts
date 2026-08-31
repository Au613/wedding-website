import type { RealtimeClient } from "ably";

type AblyGlobal = {
  Realtime: new (options: { authUrl: string }) => RealtimeClient;
};

declare global {
  interface Window {
    Ably?: AblyGlobal;
  }
}

let loading: Promise<AblyGlobal> | null = null;

export function loadAbly(): Promise<AblyGlobal> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Ably is browser-only"));
  }
  if (window.Ably?.Realtime) return Promise.resolve(window.Ably);
  if (!loading) {
    loading = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "/vendor/ably.min.js";
      script.async = true;
      script.onload = () => {
        if (window.Ably?.Realtime) resolve(window.Ably);
        else reject(new Error("Ably loaded without Realtime"));
      };
      script.onerror = () => reject(new Error("Ably failed to load"));
      document.head.appendChild(script);
    });
  }
  return loading;
}
