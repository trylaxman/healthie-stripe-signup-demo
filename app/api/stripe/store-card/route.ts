import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Mock Healthie createStripeCustomerDetail", body);
  return NextResponse.json({ ok: true, stripe_customer_id: `cus_mock_${String(body.user_id).toLowerCase()}`, mutation: "createStripeCustomerDetail" });
}
