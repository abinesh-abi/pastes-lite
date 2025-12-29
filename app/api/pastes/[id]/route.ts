import { NextRequest, NextResponse } from "next/server";

type Response = {
  content: string;
  remaining_views: number;
  expires_at: string;
};

export async function GET(
  req: NextRequest,
  ctx: RouteContext<"/api/pastes/[id]">
) {
  const { id } = await ctx.params;
  return NextResponse.json({ ok: true, id });
}
