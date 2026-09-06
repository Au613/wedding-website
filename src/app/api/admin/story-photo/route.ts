import { NextResponse } from "next/server";
import sharp from "sharp";
import { isAdminRequest } from "@/lib/admin-auth";
import { insertStoryPhoto } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData().catch(() => null);
  const file = form?.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "A photo file is required" }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: "That photo is too large" }, { status: 413 });
  }

  const input = Buffer.from(await file.arrayBuffer());
  try {
    const jpeg = await sharp(input)
      .rotate()
      .resize({ width: 1400, height: 1400, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 78 })
      .toBuffer();
    const id = crypto.randomUUID();
    await insertStoryPhoto(id, "image/jpeg", jpeg.toString("base64"));
    return NextResponse.json({ url: `/api/story-photo/${id}` });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save that photo" }, { status: 500 });
  }
}
