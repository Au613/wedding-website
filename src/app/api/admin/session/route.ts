import { NextResponse } from "next/server";
import { adminCookieHeader, isAdminRequest, pinMatches } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ ok: await isAdminRequest() });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { pin?: string } | null;
  if (!pinMatches(body?.pin ?? "")) {
    return NextResponse.json({ error: "Wrong PIN" }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.headers.set("Set-Cookie", adminCookieHeader());
  return response;
}
