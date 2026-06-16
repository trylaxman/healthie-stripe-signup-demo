import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Mock Healthie membership tag", body);
  return NextResponse.json({ ok: true, user_id: body.user_id, tier: body.tier, mutation: "updateClient / applyTag" });
}
