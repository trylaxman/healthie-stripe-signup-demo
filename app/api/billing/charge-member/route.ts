import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Mock Healthie createBillingItem single", body);
  return NextResponse.json({ ok: true, mutation: "createBillingItem", billing_item_id: `bi_${Date.now()}` });
}
