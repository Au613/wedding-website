import { NextResponse } from "next/server";
import { readStoryPhoto } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!id || !/^[0-9a-f-]{36}$/i.test(id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  try {
    const photo = await readStoryPhoto(id);
    if (!photo) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    return new NextResponse(new Uint8Array(photo.data), {
      headers: {
        "Content-Type": photo.mime,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not load photo" }, { status: 500 });
  }
}
