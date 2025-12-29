import redis from "@/lib/redis";
import { v4 as uuidv4 } from "uuid";
import { NextRequest, NextResponse } from "next/server";
import CONFIG from "@/config/CONFIG";

type PastBody = {
  content: string;
  ttl_seconds: number;
  max_views: number;
};

type PastResponse = {
  id: string;
  url: string;
};

export async function POST(req: NextRequest) {
  try {
    const uniqueKey = uuidv4(); // uniquid
    const { content, max_views, ttl_seconds }: Partial<PastBody> =
      await req.json();

    if (!content)
      // validate content
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });


    const payload: DbContent = {
      content,
      expires_at: null,
      remaining_views: max_views || null,
    };

    if (ttl_seconds) {
      //expire date handling
      payload.expires_at = new Date();
      payload.expires_at.setSeconds(
        payload.expires_at.getSeconds() + ttl_seconds
      );

      const resp = await redis.set(
        uniqueKey,
        JSON.stringify(payload),
        "EX",
        ttl_seconds
      );
    } else {
      const resp = await redis.set(uniqueKey, JSON.stringify(payload));
    }

    const url = `${CONFIG.SERVER_URL}/p/${uniqueKey}`;

    return NextResponse.json<PastResponse>(
      { id: uniqueKey, url },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
