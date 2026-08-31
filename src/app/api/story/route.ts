import { NextResponse } from "next/server";
import { readStory } from "@/lib/db";
import { storyMilestones } from "@/data/story";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const milestones = await readStory();
    return NextResponse.json({ milestones });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ milestones: storyMilestones });
  }
}
