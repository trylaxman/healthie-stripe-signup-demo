import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Mock bulk billing run", body);
  return NextResponse.json({ ok: true, mutation: "createBillingItem", mode: "bulk", run_id: `run_${Date.now()}` });
}
