import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ablyEvents } from "@/lib/ably-events";
import { publishAbly } from "@/lib/ably-server";
import { updatePageVisibility } from "@/lib/db";
import { sitePages } from "@/data/sitePages";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { slug?: string; visible?: boolean } | null;
  const page = sitePages.find((item) => item.href === body?.slug);
  if (!page || page.locked || typeof body?.visible !== "boolean") {
    return NextResponse.json({ error: "Invalid page update" }, { status: 400 });
  }

  try {
    const snapshot = await updatePageVisibility(page.href, body.visible);
    try {
      await publishAbly(ablyEvents.pageVisibilityChanged, {
        slug: page.href,
        visible: body.visible,
      });
    } catch (error) {
      console.error(error);
    }
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not update page" }, { status: 500 });
  }
}
