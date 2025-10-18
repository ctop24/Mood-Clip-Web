import { NextResponse } from "next/server";

const sampleStickers = [
  {
    id: "1",
    prompt: "Deadline panic but hopeful",
    style: "paperclipish",
    background: "confetti",
    intensity: 7,
    caption: "We'll make it",
    gifUrl: null,
    pngUrl: null,
    variant: "sunrise" as const,
    width: 512,
    height: 512,
    sizeBytes: 110_000,
    renderMs: 4200,
    createdAt: new Date().toISOString()
  }
];

export async function GET() {
  return NextResponse.json({ stickers: sampleStickers, hasMore: false });
}
