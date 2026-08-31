import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "aa_admin";

function secret() {
  return process.env.ADMIN_SECRET ?? "";
}

export function adminCookieValue() {
  const value = secret();
  if (!value) return "";
  return createHmac("sha256", value).update("wedding-admin").digest("hex");
}

export function pinMatches(pin: string) {
  const expected = secret();
  if (!expected || !pin) return false;
  const a = Buffer.from(pin);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function isAdminRequest() {
  const expected = adminCookieValue();
  if (!expected) return process.env.NODE_ENV !== "production";
  const store = await cookies();
  const got = store.get(COOKIE)?.value ?? "";
  if (!got || got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(got), Buffer.from(expected));
}

export function adminCookieHeader() {
  const value = adminCookieValue();
  const parts = [
    `${COOKIE}=${value}`,
    "Path=/",
    "HttpOnly",
    "SameSite=Lax",
    "Max-Age=604800",
  ];
  if (process.env.NODE_ENV === "production") parts.push("Secure");
  return parts.join("; ");
}
