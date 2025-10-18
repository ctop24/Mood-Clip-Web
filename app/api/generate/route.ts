import { NextResponse } from "next/server";
import { z } from "zod";

import { styles } from "@/lib/constants";

const requestSchema = z.object({
  prompt: z.string().min(4),
  style: z.string(),
  background: z.string(),
  intensity: z.number().int().min(1).max(9),
  caption: z.string().max(120).optional().or(z.literal(""))
});

export async function POST(request: Request) {
  const body = await request.json();
  const result = requestSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: "Invalid request", details: result.error.flatten() }, { status: 400 });
  }

  // Mock sticker payload for the MVP scaffold.
  const { prompt, style } = result.data;
  const slug = prompt.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
  const stickerId = `${slug || "mood"}-${Date.now()}`;
  const styleDefinition = styles.find((entry) => entry.id === style) ?? styles[0];

  return NextResponse.json({
    stickerId,
    gifUrl: null,
    pngUrl: null,
    width: 512,
    height: 512,
    sizeBytes: 120_000,
    variant: styleDefinition?.variant ?? "sunrise"
  });
}
