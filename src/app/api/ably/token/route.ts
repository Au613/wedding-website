import { NextResponse } from "next/server";
import { mintGuestTokenRequest } from "@/lib/ably-server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const clientId = new URL(request.url).searchParams.get("clientId") ?? undefined;
    const tokenRequest = await mintGuestTokenRequest(clientId);
    return NextResponse.json(tokenRequest);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not mint a guest Ably token" }, { status: 500 });
  }
}
