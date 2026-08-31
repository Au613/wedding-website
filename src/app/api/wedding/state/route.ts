import { NextResponse } from "next/server";
import { readWeddingSnapshot } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const state = await readWeddingSnapshot();
    return NextResponse.json(state);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load wedding state" }, { status: 500 });
  }
}
