import { NextResponse } from "next/server";
import { authenticateAdmin, clearAdminSession, createAdminSession } from "@/lib/admin-auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const result = await authenticateAdmin(email, password);

    if (result.ok) {
      await createAdminSession(email);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    return NextResponse.json({ error: result.error }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}

export async function DELETE() {
  await clearAdminSession();
  return NextResponse.json({ success: true }, { status: 200 });
}
