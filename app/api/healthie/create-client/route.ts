import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  console.log("Mock Healthie createClient mutation", {
    mutation: "createClient",
    dont_send_welcome: body.dont_send_welcome,
    parentEmail: body.parentEmail
  });
  return NextResponse.json({
    ok: true,
    user_id: `USR-${Math.floor(Math.random() * 900000 + 100000)}`,
    healthie_response: {
      createClient: {
        user: { id: "mock-user-id" },
        messages: []
      }
    }
  });
}
