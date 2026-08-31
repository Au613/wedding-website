import { NextResponse } from "next/server";
import { isAdminRequest } from "@/lib/admin-auth";
import { ablyEvents } from "@/lib/ably-events";
import { publishAbly } from "@/lib/ably-server";
import { updateCurrentStep, updateLiveMode } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdminRequest())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json().catch(() => null)) as
    | { currentStep?: string; liveMode?: boolean }
    | null;

  try {
    if (typeof body?.liveMode === "boolean") {
      const snapshot = await updateLiveMode(body.liveMode);
      try {
        await publishAbly(ablyEvents.weddingStateChanged, {
          liveMode: snapshot.liveMode,
          currentStep: snapshot.currentStep,
          changedAt: snapshot.updatedAt,
        });
      } catch (error) {
        console.error(error);
      }
      return NextResponse.json(snapshot);
    }

    if (!body?.currentStep) {
      return NextResponse.json({ error: "currentStep is required" }, { status: 400 });
    }

    const { previousStep, snapshot } = await updateCurrentStep(body.currentStep);
    try {
      await publishAbly(ablyEvents.weddingStateChanged, {
        currentStep: snapshot.currentStep,
        previousStep,
        liveMode: snapshot.liveMode,
        changedAt: snapshot.updatedAt,
      });
    } catch (error) {
      console.error(error);
    }
    return NextResponse.json(snapshot);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Could not update wedding state" }, { status: 500 });
  }
}
