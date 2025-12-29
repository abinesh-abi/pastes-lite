import { NextRequest, NextResponse } from "next/server";

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
    const { content, max_views, ttl_seconds }: Partial<PastBody> =
      await req.json();
    console.log({ content, max_views, ttl_seconds });

    return NextResponse.json({ s: "done" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Invalid request data" },
      { status: 400 }
    );
  }
}
