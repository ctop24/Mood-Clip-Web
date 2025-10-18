import { NextResponse } from "next/server";

import { backgrounds, styles } from "@/lib/constants";

export async function GET() {
  return NextResponse.json({ styles, backgrounds });
}
