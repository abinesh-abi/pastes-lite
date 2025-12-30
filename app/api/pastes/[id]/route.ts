import redis from "@/lib/redis";
import { DbContent } from "@/types/global";
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
  try {
    const { id } = await ctx.params;

    // retrieving data
    const data = await redis.get(id);
    if (!data) {
      // data existence validate
      return NextResponse.json({ error: "page not found" }, { status: 404 });
    }
    const content: DbContent = JSON.parse(data);

    // remaining views validation
    if (content.remaining_views === 1) {
      redis.del(id);
      content.remaining_views = content.remaining_views - 1;
    }
    if (content.remaining_views && content.remaining_views > 1) {
      const newContent: DbContent = {
        ...content,
        remaining_views: content.remaining_views - 1,
      };
      redis.set(id, JSON.stringify(newContent));
      content.remaining_views = content.remaining_views - 1;
    }

    return NextResponse.json(content);
  } catch (error) {
    return NextResponse.json({}, { status: 404 });
  }
}
