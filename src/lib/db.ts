import { neon } from "@neondatabase/serverless";
import { sitePages } from "@/data/sitePages";
import { ABLY_CHANNEL } from "@/lib/ably-events";
import { storyMilestones, type StoryMilestone } from "@/data/story";
import { mergePages, type WeddingSnapshot } from "@/lib/wedding-state";

function connectionString() {
  const url = process.env.NEON_DB;
  if (!url) throw new Error("NEON_DB is not set");
  return url;
}

export function sql() {
  return neon(connectionString());
}

let schemaReady: Promise<void> | null = null;

export async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const db = sql();
      await db`
        CREATE TABLE IF NOT EXISTS wedding_state (
          id TEXT PRIMARY KEY,
          live_mode BOOLEAN NOT NULL DEFAULT TRUE,
          current_step TEXT NOT NULL DEFAULT 'pre',
          updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
        )
      `;
      await db`
        CREATE TABLE IF NOT EXISTS page_config (
          slug TEXT PRIMARY KEY,
          visible BOOLEAN NOT NULL DEFAULT TRUE,
          sort_order INTEGER NOT NULL DEFAULT 0
        )
      `;
      await db`
        INSERT INTO wedding_state (id, live_mode, current_step)
        VALUES ('default', TRUE, 'pre')
        ON CONFLICT (id) DO NOTHING
      `;
      await db`
        CREATE TABLE IF NOT EXISTS story_milestones (
          id TEXT PRIMARY KEY,
          sort_order INTEGER NOT NULL,
          date_label TEXT NOT NULL,
          title TEXT NOT NULL,
          caption TEXT NOT NULL,
          photo TEXT NOT NULL DEFAULT '/photos/walking.jpg'
        )
      `;
      const existingStory = await db`SELECT id FROM story_milestones LIMIT 1`;
      if (existingStory.length === 0) {
        for (const [index, item] of storyMilestones.entries()) {
          await db`
            INSERT INTO story_milestones (id, sort_order, date_label, title, caption, photo)
            VALUES (${item.id}, ${index}, ${item.date}, ${item.title}, ${item.caption}, ${item.photo})
          `;
        }
      }
      for (const [index, page] of sitePages.entries()) {
        await db`
          INSERT INTO page_config (slug, visible, sort_order)
          VALUES (${page.href}, ${true}, ${index})
          ON CONFLICT (slug) DO NOTHING
        `;
      }
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  await schemaReady;
}

export async function readWeddingSnapshot(): Promise<WeddingSnapshot> {
  await ensureSchema();
  const db = sql();
  const stateRows = await db`
    SELECT live_mode, current_step, updated_at
    FROM wedding_state
    WHERE id = 'default'
    LIMIT 1
  `;
  const pageRows = await db`
    SELECT slug, visible
    FROM page_config
    ORDER BY sort_order ASC
  `;
  const row = stateRows[0] as
    | { live_mode: boolean; current_step: string; updated_at: string }
    | undefined;
  return {
    liveMode: row?.live_mode ?? true,
    currentStep: (row?.current_step ?? "pre") as WeddingSnapshot["currentStep"],
    pages: mergePages((pageRows as Array<{ slug: string; visible: boolean }>) ?? []),
    updatedAt: row?.updated_at ? new Date(row.updated_at).toISOString() : new Date().toISOString(),
    channel: process.env.ABLY_CHANNEL || ABLY_CHANNEL,
  };
}

export async function updateCurrentStep(currentStep: string) {
  await ensureSchema();
  const db = sql();
  const previous = await db`
    SELECT current_step FROM wedding_state WHERE id = 'default' LIMIT 1
  `;
  await db`
    UPDATE wedding_state
    SET current_step = ${currentStep}, live_mode = TRUE, updated_at = NOW()
    WHERE id = 'default'
  `;
  return {
    previousStep: (previous[0] as { current_step?: string } | undefined)?.current_step ?? "pre",
    snapshot: await readWeddingSnapshot(),
  };
}

export async function updateLiveMode(liveMode: boolean) {
  await ensureSchema();
  const db = sql();
  await db`
    UPDATE wedding_state
    SET live_mode = ${liveMode}, updated_at = NOW()
    WHERE id = 'default'
  `;
  return readWeddingSnapshot();
}

export async function updatePageVisibility(slug: string, visible: boolean) {
  await ensureSchema();
  const db = sql();
  await db`
    INSERT INTO page_config (slug, visible, sort_order)
    VALUES (${slug}, ${visible}, ${0})
    ON CONFLICT (slug) DO UPDATE SET visible = ${visible}
  `;
  return readWeddingSnapshot();
}

export async function readStory(): Promise<StoryMilestone[]> {
  await ensureSchema();
  const db = sql();
  const rows = await db`
    SELECT id, date_label, title, caption, photo
    FROM story_milestones
    ORDER BY sort_order ASC
  `;
  if (rows.length === 0) return storyMilestones;
  return (rows as Array<{ id: string; date_label: string; title: string; caption: string; photo: string }>).map(
    (row) => ({
      id: row.id,
      date: row.date_label,
      title: row.title,
      caption: row.caption,
      photo: row.photo,
    }),
  );
}

export async function replaceStory(items: StoryMilestone[]) {
  await ensureSchema();
  const db = sql();
  await db`DELETE FROM story_milestones`;
  for (const [index, item] of items.entries()) {
    const id = item.id || `story-${index + 1}-${Date.now()}`;
    await db`
      INSERT INTO story_milestones (id, sort_order, date_label, title, caption, photo)
      VALUES (
        ${id},
        ${index},
        ${item.date.trim() || "Date"},
        ${item.title.trim() || "Untitled"},
        ${item.caption.trim()},
        ${item.photo.trim() || "/photos/walking.jpg"}
      )
    `;
  }
  return readStory();
}
