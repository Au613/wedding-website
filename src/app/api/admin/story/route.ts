import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ablyEvents } from "@/lib/ably-events";
import { publishAbly } from "@/lib/ably-server";
import { replaceStory } from "@/lib/db";
import type { StoryMilestone } from "@/data/story";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as { milestones?: StoryMilestone[] } | null;
  if (!Array.isArray(body?.milestones)) {
    return NextResponse.json({ error: "milestones is required" }, { status: 400 });
  }

  const cleaned = body.milestones
    .filter((item) => item && typeof item === "object")
    .map((item, index) => ({
      id: typeof item.id === "string" && item.id ? item.id : `story-${index + 1}`,
      date: String(item.date ?? ""),
      title: String(item.title ?? ""),
      caption: String(item.caption ?? ""),
      photo: String(item.photo ?? "/photos/walking.jpg"),
    }));

  try {
    const milestones = await replaceStory(cleaned);
    try {
      await publishAbly(ablyEvents.storyChanged, { milestones });
    } catch (error) {
      console.error(error);
    }
    return NextResponse.json({ milestones });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not save story" }, { status: 500 });
  }
}
