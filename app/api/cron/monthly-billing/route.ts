import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    ok: true,
    message: "Mock Vercel Cron endpoint. Production would validate CRON_SECRET and execute scheduled Healthie createBillingItem charges.",
    run_id: `cron_${Date.now()}`
  });
}
